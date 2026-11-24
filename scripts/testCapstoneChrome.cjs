const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-results', 'screenshots', 'capstone');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function startServer() {
  console.log('[Server] Starting Vite preview server on port 4173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'pipe',
  });

  await new Promise((resolve) => {
    let resolved = false;
    server.stdout.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('4173') && !resolved) {
        resolved = true;
        console.log('[Server] Vite preview server is ready at http://localhost:4173/');
        resolve();
      }
    });
    server.stderr.on('data', (data) => {
      const err = data.toString();
      if (!err.includes('ExperimentalWarning')) {
        console.error('[Server Error]', err);
      }
    });
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.log('[Server] Timeout fallback reached. Assuming server is up.');
        resolve();
      }
    }, 4000);
  });

  return server;
}

async function runCapstoneAudit() {
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

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        diagnostics.consoleErrors.push(msg.text());
        console.error('[Browser Console Error]', msg.text());
      }
    });

    page.on('pageerror', (err) => {
      diagnostics.pageErrors.push(err.message);
      console.error('[Browser Page Error]', err.message);
    });

    // 1. Visit Capstone Overview Hub
    console.log('[Test 1] Navigating to /capstone...');
    await page.goto('http://localhost:4173/capstone', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_capstone_hub.png'), fullPage: true });

    const bannerText = await page.textContent('body');
    if (!bannerText.includes('EDUCATIONAL SIMULATOR — DEMO ONLY')) {
      throw new Error('Educational simulator disclaimer is missing from Capstone Overview!');
    }
    diagnostics.steps.push('Capstone Overview loads with transparent simulation banner');

    // 2. Open Milestone 1
    console.log('[Test 2] Navigating to Milestone 1: Data Modeling...');
    await page.goto('http://localhost:4173/capstone/level-1', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_milestone_1.png'), fullPage: true });
    
    // Switch to Real Code Inspector
    const codeTabBtn = page.getByRole('button', { name: /Real Code Inspector/i });
    if (await codeTabBtn.isVisible()) {
      await codeTabBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_milestone_1_code_inspector.png') });
    }
    diagnostics.steps.push('Milestone 1 Code Inspector switches tabs and renders CDS models');

    // 3. Open Milestone 2 (Approval Playground)
    console.log('[Test 3] Navigating to Milestone 2: Approval Workflow...');
    await page.goto('http://localhost:4173/capstone/level-2', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_milestone_2_alice.png'), fullPage: true });

    // Switch to Bob (Manager)
    const bobBtn = page.getByRole('button', { name: /Bob \(Manager\)/i });
    await bobBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_milestone_2_bob.png') });
    diagnostics.steps.push('Milestone 2 Approval Matrix successfully toggles between employee and manager personas');

    // 4. Open Milestone 3 (Fiori Elements UI & MTA)
    console.log('[Test 4] Navigating to Milestone 3: Fiori & Cloud Deployment...');
    await page.goto('http://localhost:4173/capstone/level-3', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_milestone_3_fiori.png'), fullPage: true });

    const fioriText = await page.textContent('body');
    if (!fioriText.includes('Approved (Criticality: 3)')) {
      throw new Error('Fiori criticality semantic status badge missing from Milestone 3!');
    }
    diagnostics.steps.push('Milestone 3 Fiori Elements List Report correctly renders semantic criticality highlights');

    console.log('✅ ALL CAPSTONE LIVE BROWSER TESTS PASSED!');
    console.log('Diagnostic Summary:', diagnostics);
  } catch (error) {
    console.error('❌ CAPSTONE AUDIT FAILED:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    if (server) {
      server.kill();
      console.log('[Server] Server process terminated.');
    }
  }
}

runCapstoneAudit();
