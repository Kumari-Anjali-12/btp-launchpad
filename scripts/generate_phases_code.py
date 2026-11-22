import json
import re
import sys
sys.path.insert(0, '.')

with open(r'G:\BTP-Launchpad\docs\reference\parsed_syllabus.json', 'r', encoding='utf-8') as f:
    phases_raw = json.load(f)

from scripts.build_full_phases import MODULE_META, BADGE_CATS

def escape_ts(s):
    if not s:
        return '""'
    return json.dumps(s)

output_lines = [
    "import { SyllabusPhase } from '../../types/curriculum';",
    "import { PHASE_CAPSTONES } from './capstones';",
    "",
    "export const SYLLABUS_PHASES: SyllabusPhase[] = [",
]

for p in phases_raw:
    p_num = p['num']
    p_id = f"phase-{p_num}"
    p_title = p['title']
    p_obj = p['coreObjective']
    p_hours = p['hours']
    p_weeks = p['weeks']
    p_badge = BADGE_CATS.get(p_num, 'core')
    
    output_lines.append("  {")
    output_lines.append(f"    id: '{p_id}',")
    output_lines.append(f"    number: {p_num},")
    output_lines.append(f"    title: {escape_ts(p_title)},")
    output_lines.append(f"    tagline: 'Phase {p_num} · {p_weeks} · ~{p_hours} Hours',")
    output_lines.append(f"    description: {escape_ts(p_obj)},")
    output_lines.append(f"    coreObjective: {escape_ts(p_obj)},")
    output_lines.append(f"    estimatedHours: {p_hours},")
    output_lines.append(f"    suggestedWeeks: {escape_ts(p_weeks)},")
    output_lines.append(f"    badgeCategory: '{p_badge}',")
    output_lines.append(f"    capstone: PHASE_CAPSTONES[{p_num}],")
    output_lines.append("    modules: [")
    
    for m in p['modules']:
        m_code = m['code']
        m_id = f"mod-{m_code.replace('.', '-')}"
        m_title = m['title']
        meta = MODULE_META.get(m_code, {})
        tagline = meta.get('tagline', f"Master {m_title} for SAP BTP & AI development")
        level = meta.get('level', 'Beginner')
        diagram = meta.get('diagramType', 'cap-architecture')
        subtopics = m['subtopics']
        practical = m['practical']
        mastery = m['mastery']
        
        # Build learning objectives from subtopics
        learning_objs = [s for s in subtopics[:4]] if subtopics else [
            f"Understand the core principles and enterprise importance of {m_title}.",
            f"Implement practical configurations and service code for {m_title}.",
            f"Apply best practices according to SAP Clean Core guidelines."
        ]
        
        # Build steps
        steps = []
        step_count = min(len(subtopics), 5) if len(subtopics) >= 3 else 3
        for si in range(step_count):
            s_title = subtopics[si].split(':')[0] if si < len(subtopics) else f"Step {si+1}: Execution"
            s_text = subtopics[si] if si < len(subtopics) else f"Deep dive into {m_title} mechanisms."
            steps.append({
                'stepNumber': si + 1,
                'title': s_title[:40],
                'explanation': f"{s_text} This step establishes the foundation for clean architecture on SAP BTP.",
                'keyIdea': f"{m_title} enforces strict enterprise contracts, preventing data drift and deployment regressions.",
                'taskInstruction': f"Review {s_title} and verify compliance with standard SAP recommendations.",
                'hint': f"Focus on how {s_title} decouples application logic from underlying database schemas."
            })
            
        output_lines.append("      {")
        output_lines.append(f"        id: '{m_id}',")
        output_lines.append(f"        code: '{m_code}',")
        output_lines.append(f"        phaseId: '{p_id}',")
        output_lines.append(f"        title: {escape_ts(m_title)},")
        output_lines.append(f"        tagline: {escape_ts(tagline)},")
        output_lines.append(f"        summary: {escape_ts(practical if practical else f'Learn and master {m_title} in enterprise SAP BTP environments.')},")
        output_lines.append(f"        estimatedMinutes: 35,")
        output_lines.append(f"        level: '{level}',")
        output_lines.append(f"        subtopics: {json.dumps(subtopics)},")
        output_lines.append(f"        practicalImplementation: {escape_ts(practical)},")
        output_lines.append(f"        masteryCheck: {escape_ts(mastery)},")
        output_lines.append(f"        learningObjectives: {json.dumps(learning_objs)},")
        output_lines.append(f"        steps: {json.dumps(steps, indent=10)},")
        output_lines.append(f"        diagramType: '{diagram}',")
        
        # Analogy
        output_lines.append("        analogy: {")
        output_lines.append(f"          concept: {escape_ts(m_title)},")
        output_lines.append(f"          analogy: 'The Enterprise Logistics Network',")
        output_lines.append(f"          explanation: 'Just like an international airport coordinates thousands of flights across separate terminals with strict security and common gates, {m_title} standardizes enterprise communication and data flow.',")
        output_lines.append(f"          transition: 'Without standardized {m_title}, enterprise microservices suffer from inconsistent protocols and security vulnerabilities.',")
        output_lines.append("        },")
        
        # ConceptExplanation
        output_lines.append("        conceptExplanation: {")
        output_lines.append(f"          whatItIs: {escape_ts(f'{m_title} provides core capabilities for SAP BTP applications, as defined in Module {m_code}.')},")
        output_lines.append(f"          whyItExists: 'Enterprise systems require robust, reproducible, and upgrade-safe cloud extensions without disrupting standard ERP operations.',")
        output_lines.append(f"          problemSolved: 'Eliminates brittle manual configuration, security gaps, and unmaintainable monolithic customizations.',")
        output_lines.append(f"          howItWorks: {escape_ts(practical if practical else 'Operates through standard REST/OData protocols and managed cloud platform services.')},")
        output_lines.append(f"          btpFit: {escape_ts(mastery if mastery else 'Integrated directly into SAP BTP runtimes and security infrastructure.')},")
        output_lines.append("        },")
        
        # JargonTerms
        output_lines.append("        jargonTerms: [")
        terms = [s.split(':')[0].strip() for s in subtopics[:3]] if subtopics else [m_title, 'BTP', 'Clean Core']
        for t in terms:
            output_lines.append("          {")
            output_lines.append(f"            term: {escape_ts(t[:30])},")
            output_lines.append(f"            simpleMeaning: 'Standard SAP BTP cloud technology component.',")
            output_lines.append(f"            familiarEquivalent: 'Industry standard cloud equivalent.',")
            output_lines.append("          },")
        output_lines.append("        ],")
        
        # TechnicalExample
        output_lines.append("        technicalExample: {")
        output_lines.append(f"          title: 'Practical {m_title} Code Configuration',")
        output_lines.append("          language: 'json',")
        output_lines.append(f"          code: JSON.stringify({{ module: '{m_code}', title: '{m_title}', cleanCore: true }}, null, 2),")
        output_lines.append(f"          purpose: 'Demonstrate clean configuration adhering to SAP BTP best practices.',")
        output_lines.append("          lineExplanations: [")
        output_lines.append("            { lines: '1-4', explanation: 'Defines declarative metadata according to SAP specification.' }")
        output_lines.append("          ],")
        output_lines.append("          expectedOutput: 'Clean compilation and execution with zero warnings.',")
        output_lines.append("          commonMistakes: [")
        output_lines.append("            'Hardcoding private IPs or credentials into configuration files.',")
        output_lines.append("            'Modifying standard core artifacts rather than side-by-side extension.'")
        output_lines.append("          ]")
        output_lines.append("        },")
        
        # BusinessScenario
        output_lines.append("        businessScenario: {")
        output_lines.append(f"          title: 'Global Supply Chain Implementation ({m_title})',")
        output_lines.append(f"          context: 'An international enterprise implements {m_title} to automate mission-critical operations.',")
        output_lines.append("          workflowSteps: [")
        output_lines.append("            'System receives real-time transaction event.',")
        output_lines.append(f"            'Applies business validation and security policies for {m_title}.',")
        output_lines.append("            'Persists auditable record in SAP HANA Cloud.'")
        output_lines.append("          ],")
        output_lines.append("          businessImpact: 'Guarantees 99.99% operational continuity and zero data drift across cloud regions.'")
        output_lines.append("        },")
        
        # QuizQuestions strictly 3
        m_ans_a = escape_ts(mastery[:90] if mastery else f'Verified practical implementation of {m_title}')
        output_lines.append("        quizQuestions: [")
        output_lines.append("          {")
        output_lines.append(f"            id: '{m_id}-q1',")
        output_lines.append(f"            question: 'What is the primary role of {m_title} in SAP BTP architecture?',")
        output_lines.append("            options: [")
        output_lines.append("              { id: 'a', text: 'To establish secure, scalable, and upgrade-safe cloud extensions.', isCorrect: true, explanation: 'Correct. Standard BTP architecture prioritizes clean core extensibility and secure operations.' },")
        output_lines.append("              { id: 'b', text: 'To replace the entire SAP ERP system with custom code.', isCorrect: false, explanation: 'Incorrect. BTP extends SAP S/4HANA side-by-side rather than replacing the central system of record.' },")
        output_lines.append("              { id: 'c', text: 'To store unencrypted passwords in source control repositories.', isCorrect: false, explanation: 'Incorrect. Zero credentials should ever be stored in source code.' },")
        output_lines.append("              { id: 'd', text: 'To disable automatic cloud updates permanently.', isCorrect: false, explanation: 'Incorrect. Clean core enables continuous zero-friction quarterly cloud updates.' }")
        output_lines.append("            ]")
        output_lines.append("          },")
        output_lines.append("          {")
        output_lines.append(f"            id: '{m_id}-q2',")
        output_lines.append(f"            question: 'According to the syllabus, how does {m_title} handle edge cases and validation?',")
        output_lines.append("            options: [")
        output_lines.append("              { id: 'a', text: 'By throwing unhandled exceptions that crash the server.', isCorrect: false, explanation: 'Incorrect. Unhandled throws cause 500 internal server errors without actionable diagnostics.' },")
        output_lines.append("              { id: 'b', text: 'By returning structured error codes (e.g. RFC 7807 problem details or req.reject) with actionable messages.', isCorrect: true, explanation: 'Correct. SAP CAP and modern cloud services use structured error responses so client apps display clear diagnostics.' },")
        output_lines.append("              { id: 'c', text: 'By ignoring errors silently and continuing execution.', isCorrect: false, explanation: 'Incorrect. Enterprise operations require strict integrity and transaction rollback on failure.' },")
        output_lines.append("              { id: 'd', text: 'By modifying S/4HANA core database tables directly via raw SQL.', isCorrect: false, explanation: 'Incorrect. Direct database modification violates the Clean Core rule and voids support.' }")
        output_lines.append("            ]")
        output_lines.append("          },")
        output_lines.append("          {")
        output_lines.append(f"            id: '{m_id}-q3',")
        output_lines.append(f"            question: 'What is the required mastery outcome for Module {m_code} ({m_title})?',")
        output_lines.append("            options: [")
        output_lines.append(f"              {{ id: 'a', text: {m_ans_a}, isCorrect: true, explanation: 'Correct. This is the exact mastery verification criterion defined in the syllabus.' }},")
        output_lines.append("              { id: 'b', text: 'Writing monolithic code on an outdated on-premise system.', isCorrect: false, explanation: 'Incorrect. The modern curriculum focuses exclusively on SAP BTP and cloud runtimes.' },")
        output_lines.append("              { id: 'c', text: 'Memorizing marketing acronyms without practical implementation.', isCorrect: false, explanation: 'Incorrect. BTP Launchpad prioritizes hands-on technical competence.' },")
        output_lines.append("              { id: 'd', text: 'Committing code without running automated tests.', isCorrect: false, explanation: 'Incorrect. All phase milestones mandate passing automated test suites.' }")
        output_lines.append("            ]")
        output_lines.append("          }")
        output_lines.append("        ],")
        
        # Key takeaways & activity
        output_lines.append("        keyTakeaways: [")
        output_lines.append(f"          'Module {m_code} establishes the core mechanics for {m_title}.',")
        output_lines.append("          'Clean core side-by-side design ensures seamless cloud upgrades without technical debt.',")
        output_lines.append("          'All integrations must enforce strict security token verification and destination isolation.'")
        output_lines.append("        ],")
        output_lines.append(f"        practicalActivity: {escape_ts(practical if practical else f'Implement the practical exercise for {m_title} in the practice lab.')}")
        output_lines.append("      },")
    output_lines.append("    ]")
    output_lines.append("  },")

output_lines.append("];")

final_code = '\n'.join(output_lines)
with open(r'G:\BTP-Launchpad\src\data\curriculum\phases.ts', 'w', encoding='utf-8') as f:
    f.write(final_code)

print(f"Generated src/data/curriculum/phases.ts successfully ({len(final_code)} bytes).")
