import { describe, it, expect } from 'vitest';
import { SYLLABUS_PHASES, getAdjacentChapters } from '../data/curriculum';

describe('Phase 6 Independent Curriculum Quality Audit', () => {
  const allModules = SYLLABUS_PHASES.flatMap((p) => p.modules);

  it('Audit A: verifies all 36 modules exist and have distinct non-generic content', () => {
    expect(allModules).toHaveLength(36);

    const titles = new Set<string>();
    const analogies = new Set<string>();
    const codes = new Set<string>();

    for (const mod of allModules) {
      expect(mod.title).toBeTruthy();
      expect(titles.has(mod.title), `Duplicate title found: ${mod.title}`).toBe(false);
      titles.add(mod.title);

      expect(mod.code).toBeTruthy();
      expect(codes.has(mod.code), `Duplicate code found: ${mod.code}`).toBe(false);
      codes.add(mod.code);

      expect(mod.analogy.analogy).toBeTruthy();
      expect(analogies.has(mod.analogy.analogy), `Duplicate analogy found: ${mod.analogy.analogy}`).toBe(false);
      analogies.add(mod.analogy.analogy);
    }
  });

  it('Audit B: verifies beginner comprehension elements across all 36 modules', () => {
    for (const mod of allModules) {
      // Problem before solution in concept explanation
      expect(mod.conceptExplanation.whyItExists.length).toBeGreaterThanOrEqual(40);
      expect(mod.conceptExplanation.problemSolved.length).toBeGreaterThanOrEqual(30);
      expect(mod.conceptExplanation.whatItIs.length).toBeGreaterThanOrEqual(40);
      expect(mod.conceptExplanation.howItWorks.length).toBeGreaterThanOrEqual(40);
      expect(mod.conceptExplanation.btpFit.length).toBeGreaterThanOrEqual(30);

      // Metaphor transition anchors
      expect(mod.analogy.transition.length).toBeGreaterThanOrEqual(20);

      // Step-by-step progression clarity
      expect(mod.steps.length).toBeGreaterThanOrEqual(5);
      for (const step of mod.steps) {
        expect(step.title.length).toBeGreaterThanOrEqual(4);
        expect(step.explanation.length).toBeGreaterThanOrEqual(40);
        expect(step.keyIdea.length).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it('Audit C: verifies SAP technical accuracy and key architecture terminology', () => {
    // Phase 0: Pre-learning
    const mod01 = allModules.find((m) => m.code === '0.1')!;
    expect(mod01.summary).toContain('Procure-to-Pay');
    expect(mod01.conceptExplanation.whatItIs).toContain('SAP ERP');

    // Phase 3: CAP Development
    const mod31 = allModules.find((m) => m.code === '3.1')!;
    expect(mod31.technicalExample.code).toContain('entity');
    expect(mod31.technicalExample.code).toContain('Association to');

    const mod32 = allModules.find((m) => m.code === '3.2')!;
    expect(mod32.technicalExample.code).toContain('this.before');
    expect(mod32.technicalExample.code).toContain('req.reject');

    // Phase 5: Security & Connectivity
    const mod51 = allModules.find((m) => m.code === '5.1')!;
    expect(mod51.conceptExplanation.whatItIs).toContain('XSUAA');
    expect(mod51.technicalExample.code).toContain('@sap/xssec');

    const mod53 = allModules.find((m) => m.code === '5.3')!;
    expect(mod53.conceptExplanation.whatItIs).toContain('Destination');
    expect(mod53.conceptExplanation.howItWorks).toContain('Cloud Connector');

    // Phase 6: Deploy & Operate
    const mod61 = allModules.find((m) => m.code === '6.1')!;
    expect(mod61.technicalExample.title).toContain('mta.yaml');
    expect(mod61.technicalExample.code).toContain('logistics-management-mta');
    expect(mod61.technicalExample.code).toContain('hdi-shared');

    // Phase 7: AI Layer
    const mod73 = allModules.find((m) => m.code === '7.3')!;
    expect(mod73.technicalExample.code).toContain('@sap-ai-sdk/foundation-models');

    const mod74 = allModules.find((m) => m.code === '7.4')!;
    expect(mod74.technicalExample.code).toContain('COSINE_SIMILARITY');
    expect(mod74.technicalExample.code).toContain('TO_REAL_VECTOR');

    const mod76 = allModules.find((m) => m.code === '7.6')!;
    expect(mod76.conceptExplanation.whatItIs).toContain('Clean Core');
  });

  it('Audit D: validates code examples, syntax formatting, and line explanations', () => {
    for (const mod of allModules) {
      const ex = mod.technicalExample;
      expect(ex.title.length).toBeGreaterThanOrEqual(10);
      expect(ex.code.trim().length).toBeGreaterThanOrEqual(50);
      expect(ex.purpose.length).toBeGreaterThanOrEqual(20);
      expect(ex.expectedOutput.length).toBeGreaterThanOrEqual(15);
      expect(ex.commonMistakes.length).toBeGreaterThanOrEqual(1);

      // JSON parsing test if language is json
      if (ex.language.toLowerCase() === 'json') {
        expect(() => JSON.parse(ex.code), `Invalid JSON in module ${mod.code}: ${ex.title}`).not.toThrow();
      }

      // Check that code has balanced parentheses, braces, brackets
      let openParen = 0;
      let openBrace = 0;
      let openBracket = 0;
      for (const char of ex.code) {
        if (char === '(') openParen++;
        if (char === ')') openParen--;
        if (char === '{') openBrace++;
        if (char === '}') openBrace--;
        if (char === '[') openBracket++;
        if (char === ']') openBracket--;
      }
      expect(openParen, `Unbalanced parentheses in module ${mod.code}`).toBe(0);
      expect(openBrace, `Unbalanced braces in module ${mod.code}`).toBe(0);
      expect(openBracket, `Unbalanced brackets in module ${mod.code}`).toBe(0);

      // Verify line explanations exist
      expect(ex.lineExplanations.length).toBeGreaterThanOrEqual(1);
      for (const le of ex.lineExplanations) {
        expect(le.lines).toBeTruthy();
        expect(le.explanation.length).toBeGreaterThanOrEqual(10);
      }
    }
  });

  it('Audit E: verifies quiz quality, single correct answers, and thorough explanations', () => {
    let totalQuestions = 0;

    for (const mod of allModules) {
      expect(mod.quizQuestions).toHaveLength(3);

      for (const q of mod.quizQuestions) {
        totalQuestions++;
        expect(q.id).toMatch(/^mod-\d+-\d+-q\d+$/);
        expect(q.question.length).toBeGreaterThanOrEqual(20);
        expect(q.options).toHaveLength(4);

        const correctOptions = q.options.filter((o) => o.isCorrect);
        expect(correctOptions, `Question ${q.id} in module ${mod.code} must have exactly one correct answer`).toHaveLength(1);

        for (const opt of q.options) {
          expect(opt.id).toMatch(/^[a-d]$/);
          expect(opt.text.trim().length).toBeGreaterThanOrEqual(5);
          expect(opt.explanation.trim().length).toBeGreaterThanOrEqual(20);
          expect(
            opt.explanation.startsWith('Correct.') || opt.explanation.startsWith('Incorrect.'),
            `Explanation in question ${q.id} option ${opt.id} must start with Correct. or Incorrect.`
          ).toBe(true);
        }
      }
    }

    expect(totalQuestions).toBe(108);
  });

  it('Audit F: verifies chronological sequential navigation across all 36 modules', () => {
    for (let i = 0; i < allModules.length; i++) {
      const current = allModules[i]!;
      const { prevChapter, nextChapter } = getAdjacentChapters(current.id);

      if (i > 0) {
        const prevExpected = allModules[i - 1]!;
        expect(prevChapter?.id).toBe(prevExpected.id);
      } else {
        expect(prevChapter).toBeUndefined();
      }

      if (i < allModules.length - 1) {
        const nextExpected = allModules[i + 1]!;
        expect(nextChapter?.id).toBe(nextExpected.id);
      } else {
        expect(nextChapter).toBeUndefined();
      }
    }
  });
});
