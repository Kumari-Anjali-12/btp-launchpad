import fs from 'node:fs';
import path from 'node:path';

const syllabusJsonPath = 'G:/BTP-Launchpad/docs/reference/parsed_syllabus.json';
const syllabusData = JSON.parse(fs.readFileSync(syllabusJsonPath, 'utf-8'));

console.log(`Loaded ${syllabusData.length} phases from parsed_syllabus.json`);
