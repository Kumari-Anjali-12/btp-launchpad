import { describe, it, expect } from 'vitest';
import { SYLLABUS_PHASES } from '../data/curriculum';

describe('Phase 5 Comprehensive Curriculum Content Audit', () => {
  it('contains all 9 phases from Phase 0 to Phase 8', () => {
    expect(SYLLABUS_PHASES).toHaveLength(9);
    const phaseIds = SYLLABUS_PHASES.map((p) => p.id);
    expect(phaseIds).toEqual([
      'phase-0',
      'phase-1',
      'phase-2',
      'phase-3',
      'phase-4',
      'phase-5',
      'phase-6',
      'phase-7',
      'phase-8',
    ]);
  });

  it('contains exactly 36 modules across all 9 phases with zero missing or orphan modules', () => {
    const allModules = SYLLABUS_PHASES.flatMap((p) => p.modules);
    expect(allModules).toHaveLength(36);

    const expectedCodes = [
      '0.1', '0.2', '0.3', '0.4', '0.5', '0.6',
      '1.1', '1.2', '1.3', '1.4', '1.5',
      '2.1', '2.2',
      '3.1', '3.2', '3.3', '3.4',
      '4.1', '4.2', '4.3',
      '5.1', '5.2', '5.3', '5.4',
      '6.1', '6.2', '6.3', '6.4',
      '7.1', '7.2', '7.3', '7.4', '7.5', '7.6',
      '8.1', '8.2',
    ];

    const actualCodes = allModules.map((m) => m.code);
    expect(actualCodes).toEqual(expectedCodes);
  });

  it('verifies every module adheres to the complete 13-section instructional anatomy', () => {
    const allModules = SYLLABUS_PHASES.flatMap((p) => p.modules);

    for (const mod of allModules) {
      // 1. Objectives
      expect(mod.learningObjectives.length).toBeGreaterThanOrEqual(3);

      // 2. Analogy
      expect(mod.analogy.concept.length).toBeGreaterThan(5);
      expect(mod.analogy.analogy.length).toBeGreaterThan(10);
      expect(mod.analogy.explanation.length).toBeGreaterThan(30);
      expect(mod.analogy.transition.length).toBeGreaterThan(10);

      // 3. Technical Concept Explanation
      expect(mod.conceptExplanation.whatItIs.length).toBeGreaterThan(30);
      expect(mod.conceptExplanation.whyItExists.length).toBeGreaterThan(30);
      expect(mod.conceptExplanation.problemSolved.length).toBeGreaterThan(20);
      expect(mod.conceptExplanation.howItWorks.length).toBeGreaterThan(30);
      expect(mod.conceptExplanation.btpFit.length).toBeGreaterThan(20);

      // 4. Detailed Steps (at least 5 steps per module)
      expect(mod.steps.length).toBeGreaterThanOrEqual(5);
      for (const step of mod.steps) {
        expect(step.stepNumber).toBeGreaterThan(0);
        expect(step.title.length).toBeGreaterThan(3);
        expect(step.explanation.length).toBeGreaterThan(40);
        expect(step.keyIdea.length).toBeGreaterThan(15);
      }

      // 5. Jargon Decoder (at least 3 terms)
      expect(mod.jargonTerms.length).toBeGreaterThanOrEqual(3);
      for (const jargon of mod.jargonTerms) {
        expect(jargon.term.length).toBeGreaterThan(1);
        expect(jargon.simpleMeaning.length).toBeGreaterThan(10);
        expect(jargon.familiarEquivalent.length).toBeGreaterThan(10);
      }

      // 6. Practical Technical Example
      expect(mod.technicalExample.title.length).toBeGreaterThan(5);
      expect(mod.technicalExample.code.length).toBeGreaterThan(40);
      expect(mod.technicalExample.purpose.length).toBeGreaterThan(15);
      expect(mod.technicalExample.lineExplanations.length).toBeGreaterThanOrEqual(1);
      expect(mod.technicalExample.expectedOutput.length).toBeGreaterThan(10);
      expect(mod.technicalExample.commonMistakes.length).toBeGreaterThanOrEqual(1);

      // 7. Business Scenario
      expect(mod.businessScenario.title.length).toBeGreaterThan(5);
      expect(mod.businessScenario.context.length).toBeGreaterThan(30);
      expect(mod.businessScenario.workflowSteps.length).toBeGreaterThanOrEqual(3);
      expect(mod.businessScenario.businessImpact.length).toBeGreaterThan(15);

      // 8. Knowledge Check Quiz Questions (exactly 3 questions with 4 options each)
      expect(mod.quizQuestions).toHaveLength(3);
      for (const q of mod.quizQuestions) {
        expect(q.question.length).toBeGreaterThan(15);
        expect(q.options).toHaveLength(4);
        const correctOptions = q.options.filter((o) => o.isCorrect);
        expect(correctOptions).toHaveLength(1);
        for (const opt of q.options) {
          expect(opt.text.length).toBeGreaterThan(2);
          expect(opt.explanation.length).toBeGreaterThan(10);
        }
      }

      // 9. Key Takeaways & Practical Activity & Mastery Check
      expect(mod.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      expect(mod.practicalActivity.length).toBeGreaterThan(20);
      expect(mod.masteryCheck.length).toBeGreaterThan(20);
    }
  });

  it('guarantees zero occurrences of boilerplate placeholder strings across all 36 modules', () => {
    const jsonString = JSON.stringify(SYLLABUS_PHASES);

    const boilerplatePatterns = [
      'This step establishes the foundation for clean architecture on SAP BTP',
      'enforces strict enterprise contracts, preventing data drift and deployment regressions',
      'The core enterprise challenge addressed in this section',
      'According to the syllabus, how does',
      'in SAP BTP architecture? To establish secure, scalable, and upgrade-safe cloud extensions',
      'What is the required mastery outcome for Module',
    ];

    for (const pattern of boilerplatePatterns) {
      const matchIndex = jsonString.indexOf(pattern);
      expect(matchIndex, `Found banned boilerplate pattern: "${pattern}"`).toBe(-1);
    }
  });

  it('verifies all 18 interactive diagram types are valid and assigned', () => {
    const validDiagramTypes = [
      'erp-architecture',
      'clean-core',
      'btp-hierarchy',
      'cap-architecture',
      'odata-flow',
      'event-handlers',
      'fiori-horizon',
      'fiori-elements-annotations',
      'ui5-freestyle',
      'xsuaa-oauth',
      'cloud-connector-tunnel',
      'event-mesh-pubsub',
      'mta-lifecycle',
      'cf-deployment',
      'http-troubleshooting',
      'ai-core-rag',
      'genai-hub',
      'joule-agents',
    ];

    const allModules = SYLLABUS_PHASES.flatMap((p) => p.modules);
    for (const mod of allModules) {
      expect(validDiagramTypes).toContain(mod.diagramType);
    }
  });
});
