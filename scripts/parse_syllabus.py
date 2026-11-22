import json
import re

with open(r'G:\BTP-Launchpad\docs\reference\syllabus_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

phase_pattern = r'Phase (\d+): ([^\n]+)'
phase_matches = list(re.finditer(phase_pattern, text))

phases_data = []

for idx, pm in enumerate(phase_matches):
    num = int(pm.group(1))
    title = pm.group(2).strip()
    start_pos = pm.start()
    end_pos = phase_matches[idx+1].start() if idx+1 < len(phase_matches) else (text.find('Deferred Topics') if 'Deferred Topics' in text else len(text))
    p_text = text[start_pos:end_pos]
    
    # Core objective
    core_obj_m = re.search(r'Core Objective:\s*([^\n]+(?:\n(?!(?:Estimated Time|Module|\bPhase\b))[^\n]+)*)', p_text)
    core_obj = core_obj_m.group(1).replace('\n', ' ').strip() if core_obj_m else ''
    
    # Estimated time
    est_m = re.search(r'Estimated Time:\s*([^\n]+)', p_text)
    est_time = est_m.group(1).strip() if est_m else ''
    
    hours_m = re.search(r'(\d+)(?:-(\d+))?\s*hours', est_time)
    hours = int(hours_m.group(1)) if hours_m else 25
    
    weeks_m = re.search(r'weeks?\s*([0-9-]+)', est_time)
    weeks = f'Weeks {weeks_m.group(1)}' if weeks_m else 'Weeks 1-2'
    
    # Modules in this phase
    mod_matches = list(re.finditer(r'Module (\d+\.\d+): ([^\n]+)', p_text))
    mods = []
    for mi, mm in enumerate(mod_matches):
        m_code = mm.group(1)
        m_title = mm.group(2).strip()
        m_start = mm.end()
        m_end = mod_matches[mi+1].start() if mi+1 < len(mod_matches) else (p_text.find('Phase Capstone Deliverable:') if 'Phase Capstone Deliverable:' in p_text else len(p_text))
        m_body = p_text[m_start:m_end].strip()
        
        # Subtopics
        subtopics = []
        sub_m = re.search(r'Granular Sub-topics & Mechanics:(.*?)(?=Practical Implementation:|Mastery Check:|$)', m_body, re.DOTALL)
        if sub_m:
            raw_subs = [s.strip() for s in sub_m.group(1).split('\n') if s.strip()]
            for rs in raw_subs:
                rs_clean = re.sub(r'^[•\-\*]\s*', '', rs)
                if rs_clean:
                    subtopics.append(rs_clean)
        
        # Practical
        prac_m = re.search(r'Practical Implementation:(.*?)(?=Mastery Check:|$)', m_body, re.DOTALL)
        practical = prac_m.group(1).replace('\n', ' ').strip() if prac_m else ''
        
        # Mastery
        mast_m = re.search(r'Mastery Check:(.*?)$', m_body, re.DOTALL)
        mastery = mast_m.group(1).replace('\n', ' ').strip() if mast_m else ''
        
        mods.append({
            'code': m_code,
            'title': m_title,
            'subtopics': subtopics,
            'practical': practical,
            'mastery': mastery
        })
        
    phases_data.append({
        'num': num,
        'title': title,
        'coreObjective': core_obj,
        'estTime': est_time,
        'hours': hours,
        'weeks': weeks,
        'modules': mods
    })

total_mods = sum(len(p['modules']) for p in phases_data)
print(f'Extracted {len(phases_data)} phases, total modules: {total_mods}')

with open(r'G:\BTP-Launchpad\docs\reference\parsed_syllabus.json', 'w', encoding='utf-8') as out:
    json.dump(phases_data, out, indent=2)
