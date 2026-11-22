import json
import re

with open(r'G:\BTP-Launchpad\docs\reference\parsed_syllabus.json', 'r', encoding='utf-8') as f:
    phases_raw = json.load(f)

# Read existing chapters from module0..module4
existing_chapters = {}

for mod_num in range(5):
    path = f'G:\\BTP-Launchpad\\src\\data\\chapters\\module{mod_num}.ts'
    try:
        with open(path, 'r', encoding='utf-8') as cf:
            content = cf.read()
            # Extract chapter IDs
            ch_ids = re.findall(r"id:\s*'([^']+)'", content)
            for ch_id in ch_ids:
                # Find start and approximate end of chapter object
                c_start = content.find(f"id: '{ch_id}'")
                # find the closing of that chapter object
                # approximate
                existing_chapters[ch_id] = path
    except Exception as e:
        print(f"Error reading module{mod_num}: {e}")

print(f"Found {len(existing_chapters)} existing chapter definitions across module 0-4.")
