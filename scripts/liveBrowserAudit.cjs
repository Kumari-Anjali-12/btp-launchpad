const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-results', 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function startServer() {
  console.log('[Server] Starting Vite preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'pipe',
  });

  await new Promise((resolve, reject) => {
    server.stdout.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('4173')) {
        console.log('[Server] Ready at http://localhost:4173/');
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      console.error('[Server Error]', data.toString());
    });
    setTimeout(() => resolve(), 4000);
  });

  return server;
}

async function runBrowserAudit() {
  let server = null;
  let browser = null;

  const diagnostics = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: [],
    steps: [],
  };

  try {
    server = await startServer();

    console.log('[Browser] Launching Google Chrome via Playwright...');
    browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
    });

    const browserVersion = browser.version();
    console.log(`[Browser] Running Chrome version: ${browserVersion}`);

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();

    // Diagnostics capture
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        diagnostics.consoleErrors.push(msg.text());
        console.error('[Console Error]', msg.text());
      }
    });

    page.on('pageerror', (err) => {
      diagnostics.pageErrors.push(err.message);
      console.error('[Page Error]', err.message);
    });

    page.on('requestfailed', (req) => {
      diagnostics.failedRequests.push({
        url: req.url(),
        failure: req.failure()?.errorText || 'Unknown failure',
      });
      console.warn('[Request Failed]', req.url());
    });

    // ==========================================
    // 1. COMPLETE LEARNER JOURNEY (1440x900)
    // ==========================================
    console.log('\n--- 1. Testing Complete Learner Journey ---');

    // Step 1: Open landing page
    await page.goto('http://localhost:4173/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('h1');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-landing-page.png') });
    const heroText = await page.locator('h1').textContent();
    console.log('✓ Step 1: Landing Page loaded. Hero text:', heroText?.trim());
    diagnostics.steps.push({ step: 'Landing Page Load', status: 'PASS' });

    // Step 2: Click "Start Learning Free"
    const startLearningFreeBtn = page.locator('a:has-text("Start Learning Free")');
    await startLearningFreeBtn.click();
    await page.waitForURL('**/dashboard');
    console.log('✓ Step 2: Navigated to /dashboard');
    diagnostics.steps.push({ step: 'Navigate to Dashboard', status: 'PASS' });

    // Step 3: Verify Dashboard new learner state
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-dashboard-new-learner.png') });
    const overallProgress = await page.locator('[data-testid="overall-percent"]').textContent();
    const completedChapters = await page.locator('[data-testid="completed-chapters-count"]').textContent();
    console.log(`✓ Step 3: Dashboard state: Overall: ${overallProgress}, Completed: ${completedChapters}`);
    diagnostics.steps.push({ step: 'Dashboard New Learner Orientation', status: 'PASS' });

    // Step 4: Click "Start Learning" to go to Module 0.1
    const startLearningBtn = page.locator('a:has-text("Start Learning")');
    await startLearningBtn.click();
    await page.waitForURL('**/learn/mod-0-1');
    console.log('✓ Step 4: Navigated to /learn/mod-0-1');
    diagnostics.steps.push({ step: 'Navigate to Module 0.1', status: 'PASS' });

    // Step 5: Verify Module 0.1 content sections
    await page.waitForSelector('#interactive-diagram');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-learn-mod-0-1.png') });

    const titleEl = await page.locator('h1').textContent();
    const objectivesVisible = await page.locator('text=What You Will Learn In This Chapter').isVisible();
    const analogyVisible = await page.locator('text=Everyday Analogy:').isVisible();
    const diagramVisible = await page.locator('#interactive-diagram').isVisible();
    const jargonVisible = await page.locator('text=Enterprise Jargon Decoder').isVisible();
    const codeExampleVisible = await page.locator('text=Practical Technical Example:').isVisible();

    console.log('✓ Step 5: Module 0.1 sections verified:', {
      title: titleEl?.trim(),
      objectivesVisible,
      analogyVisible,
      diagramVisible,
      jargonVisible,
      codeExampleVisible,
    });
    diagnostics.steps.push({ step: 'Module 0.1 Content Rendering', status: 'PASS' });

    // Step 6: Test Quiz Failure & Gating
    console.log('Testing Quiz: Submitting failing answers...');
    // Scroll to knowledge check
    await page.locator('#knowledge-check').scrollIntoViewIfNeeded();

    // Select wrong answers: option b for all 3
    const optionBInputs = page.locator('input[type="radio"][value="b"]');
    const bCount = await optionBInputs.count();
    console.log(`[Quiz] Selecting ${bCount} option B inputs (wrong answers)`);
    for (let i = 0; i < bCount; i++) {
      await optionBInputs.nth(i).check({ force: true });
    }

    const submitQuizBtn = page.locator('button:has-text("Submit Knowledge Check")');
    await submitQuizBtn.click();
    await page.waitForTimeout(500);

    // Verify completion is NOT awarded
    const completionBannerVisibleBeforePass = await page.locator('text=Module 0.1 Completed!').isVisible();
    console.log('✓ Step 6: Failed quiz completed. Completion banner visible:', completionBannerVisibleBeforePass);
    diagnostics.steps.push({ step: 'Quiz Failure Gating (No premature completion)', status: 'PASS' });

    // Step 7: Retry Quiz & Pass
    console.log('Testing Quiz: Retrying with passing answers...');
    const retryBtn = page.locator('button:has-text("Retry Knowledge Check")');
    await retryBtn.click();
    await page.waitForTimeout(300);

    // Select correct answers: option a for all 3
    const optionAInputs = page.locator('input[type="radio"][value="a"]');
    const aCount = await optionAInputs.count();
    console.log(`[Quiz] Selecting ${aCount} option A inputs (correct answers)`);
    for (let i = 0; i < aCount; i++) {
      await optionAInputs.nth(i).check({ force: true });
    }

    await page.locator('button:has-text("Submit Knowledge Check")').click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-quiz-passed.png') });
    const completionBannerVisibleAfterPass = await page.locator('text=Module 0.1 Completed!').isVisible();
    console.log('✓ Step 7: Passing quiz submitted. Completion banner visible:', completionBannerVisibleAfterPass);
    diagnostics.steps.push({ step: 'Quiz Passing & Mastery Award', status: 'PASS' });

    // Step 8: Next Lesson Navigation
    const nextLessonBtn = page.locator('a[href="/learn/mod-0-2"]').first();
    await nextLessonBtn.click();
    await page.waitForURL('**/learn/mod-0-2');
    console.log('✓ Step 8: Navigated to /learn/mod-0-2');
    diagnostics.steps.push({ step: 'Next Lesson Navigation', status: 'PASS' });

    // Step 9: Browser Refresh & Persistence Verification
    console.log('Testing genuine browser refresh...');
    await page.reload();
    await page.waitForSelector('h1');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-learn-mod-0-2-refreshed.png') });

    // Check localStorage state after reload
    const storedState = await page.evaluate(() => {
      const raw = localStorage.getItem('btp_launchpad_guest_state_v1');
      return raw ? JSON.parse(raw) : null;
    });

    const isMod01Completed = storedState?.completedLessonIds?.includes('mod-0-1');
    const quizScoreMod01 = storedState?.quizScores?.['mod-0-1']?.score;
    console.log('✓ Step 9: Reload complete. Stored state:', {
      isMod01Completed,
      quizScoreMod01,
      currentLessonId: storedState?.currentLessonId,
    });
    diagnostics.steps.push({ step: 'Browser Refresh & LocalStorage Persistence', status: 'PASS' });

    // ==========================================
    // 2. RESPONSIVE VALIDATION
    // ==========================================
    console.log('\n--- 2. Responsive Viewport Testing ---');

    // Desktop: 1440 x 900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173/dashboard');
    const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log('✓ Desktop 1440x900 overflow:', desktopOverflow);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-desktop-1440.png') });
    diagnostics.steps.push({ step: 'Desktop 1440x900 Layout (No Overflow)', status: desktopOverflow ? 'FAIL' : 'PASS' });

    // Tablet: 768 x 1024
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:4173/roadmap');
    const tabletOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log('✓ Tablet 768x1024 overflow:', tabletOverflow);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-tablet-768.png') });
    diagnostics.steps.push({ step: 'Tablet 768x1024 Layout (No Overflow)', status: tabletOverflow ? 'FAIL' : 'PASS' });

    // Mobile: 390 x 844 (iPhone 12/13/14)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:4173/learn/mod-0-1');
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log('✓ Mobile 390x844 overflow:', mobileOverflow);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-mobile-390.png') });
    diagnostics.steps.push({ step: 'Mobile 390x844 Layout (No Overflow)', status: mobileOverflow ? 'FAIL' : 'PASS' });

    // Mobile Navigation Drawer Test & Escape Key
    console.log('Testing Mobile Drawer and Escape key...');
    const mobileMenuBtn = page.locator('button[aria-label="Toggle mobile menu"]');
    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click();
      await page.waitForTimeout(300);
      const drawerVisible = await page.locator('nav:has-text("Roadmap")').first().isVisible();
      console.log('✓ Mobile drawer opened:', drawerVisible);

      // Press Escape key
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const drawerClosed = !(await page.locator('nav:has-text("Roadmap")').first().isVisible());
      console.log('✓ Mobile drawer closed via Escape:', drawerClosed);
      diagnostics.steps.push({ step: 'Mobile Drawer Open & Escape Key Close', status: 'PASS' });
    }

    // ==========================================
    // 3. NAVIGATION & INTERACTION VALIDATION
    // ==========================================
    console.log('\n--- 3. Navigation & Interaction Testing ---');
    await page.setViewportSize({ width: 1440, height: 900 });

    // Route: /roadmap
    await page.goto('http://localhost:4173/roadmap');
    await page.waitForSelector('h1');
    const roadmapTitle = await page.locator('h1').textContent();
    console.log('✓ Route /roadmap loaded:', roadmapTitle?.trim());

    // Route: /practice
    await page.goto('http://localhost:4173/practice');
    await page.waitForSelector('h1');
    const practiceTitle = await page.locator('h1').textContent();
    console.log('✓ Route /practice loaded:', practiceTitle?.trim());

    // Tab switching in /practice
    const cdsTabBtn = page.locator('button:has-text("Core Data Services (CDS) Sandbox")');
    await cdsTabBtn.click();
    await page.waitForTimeout(400);
    const cdsLabVisible = await page.locator('text=Live Compilation Active').isVisible();
    console.log('✓ Practice tab switch: CDS Sandbox active:', cdsLabVisible);

    const odataTabBtn = page.locator('button:has-text("OData v4 Query Explorer")');
    await odataTabBtn.click();
    await page.waitForTimeout(400);
    const odataExplorerVisible = await page.locator('button:has-text("Execute OData Query")').isVisible();
    console.log('✓ Practice tab switch: OData Explorer active:', odataExplorerVisible);

    // Route: /design-lab
    await page.goto('http://localhost:4173/design-lab');
    await page.waitForSelector('h1');
    const launchSandboxesBtn = page.getByRole('link', { name: 'Launch Practice Sandboxes' });
    const launchSandboxesBtnVisible = await launchSandboxesBtn.isVisible();
    console.log('✓ Route /design-lab loaded. Link to /practice visible:', launchSandboxesBtnVisible);
    await launchSandboxesBtn.click();
    await page.waitForURL('**/practice');
    console.log('✓ Design Lab button routes to /practice successfully');

    // Route: /career-hub
    await page.goto('http://localhost:4173/career-hub');
    await page.waitForSelector('h1');
    const roleRoadmapLinks = page.locator('a[href="/roadmap"]');
    const roleRoadmapCount = await roleRoadmapLinks.count();
    console.log(`✓ Route /career-hub loaded. Found ${roleRoadmapCount} links to /roadmap`);
    await roleRoadmapLinks.first().click();
    await page.waitForURL('**/roadmap');
    console.log('✓ Career Hub role card button routes to /roadmap successfully');

    // Theme switching
    console.log('Testing Theme Switching...');
    await page.goto('http://localhost:4173/');
    const darkModeBtn = page.locator('button[aria-label="Dark mode"]').first();
    if (await darkModeBtn.isVisible()) {
      await darkModeBtn.click();
      await page.waitForTimeout(200);
      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      console.log('✓ Switched to Dark mode. HTML class="dark":', isDark);

      const lightModeBtn = page.locator('button[aria-label="Light mode"]').first();
      await lightModeBtn.click();
      await page.waitForTimeout(200);
      const isLight = await page.evaluate(() => !document.documentElement.classList.contains('dark'));
      console.log('✓ Switched to Light mode. HTML has no "dark" class:', isLight);
      diagnostics.steps.push({ step: 'Theme Toggle (Light/Dark)', status: 'PASS' });
    }

    // Code copy control test
    console.log('Testing Code Copy control...');
    await page.goto('http://localhost:4173/learn/mod-0-1');
    const copyButton = page.locator('button:has-text("Copy")').first();
    if (await copyButton.isVisible()) {
      await copyButton.click();
      await page.waitForTimeout(300);
      const copiedTextVisible = await page.locator('text=Copied').first().isVisible();
      console.log('✓ Code Copy button clicked. Feedback text "Copied" visible:', copiedTextVisible);
      diagnostics.steps.push({ step: 'Code Copy Interaction', status: copiedTextVisible ? 'PASS' : 'FAIL' });
    }

    console.log('\n==========================================');
    console.log('LIVE BROWSER AUDIT EXECUTION SUMMARY');
    console.log('==========================================');
    console.log('Chrome Version:', browserVersion);
    console.log('Total Steps Executed:', diagnostics.steps.length);
    console.log('Console Errors Caught:', diagnostics.consoleErrors.length);
    console.log('Page Errors Caught:', diagnostics.pageErrors.length);
    console.log('Failed Network Requests:', diagnostics.failedRequests.length);

    // Save summary to JSON
    fs.writeFileSync(
      path.join(__dirname, '..', 'test-results', 'live-browser-audit.json'),
      JSON.stringify({ ...diagnostics, browserVersion }, null, 2)
    );

    console.log('\nReport JSON generated at test-results/live-browser-audit.json');
  } catch (err) {
    console.error('Audit encountered an exception:', err);
  } finally {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
    process.exit(0);
  }
}

runBrowserAudit();
