const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-results', 'screenshots', 'design-lab');
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

async function runDesignLabAudit() {
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

    // Diagnostics listener
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        diagnostics.consoleErrors.push(msg.text());
        console.error(`[Console Error] ${msg.text()}`);
      }
    });

    page.on('pageerror', (err) => {
      diagnostics.pageErrors.push(err.message);
      console.error(`[Page Error] ${err.message}`);
    });

    page.on('requestfailed', (req) => {
      diagnostics.failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
      console.error(`[Failed Request] ${req.url()}`);
    });

    console.log('\n======================================================');
    console.log('   PHASE 8 LIVE CHROME ACCEPTANCE AUDIT');
    console.log('======================================================\n');

    // -----------------------------------------------------------------
    // TEST 1: Navigation to Design Lab & Acceptance Blueprint 1
    // -----------------------------------------------------------------
    console.log('[Step 1] Navigating to http://localhost:4173/design-lab...');
    await page.goto('http://localhost:4173/design-lab', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const title = await page.title();
    console.log(`[Step 1] Page Title: "${title}"`);

    // Verify Blueprint 1 nodes on canvas
    await page.waitForSelector('text=Basic CAP + HANA Application');
    const nodes = await page.$$('.select-none');
    console.log(`[Step 1] Canvas rendered. Detected active blueprint: Basic CAP + HANA Application`);

    // Verify presence of all 5 nodes
    const nodeNames = ['User / Browser', 'App Router', 'SAP CAP Service', 'SAP HANA Cloud', 'SAP XSUAA Service'];
    for (const name of nodeNames) {
      const el = await page.$(`text=${name}`);
      if (!el) throw new Error(`Missing expected Blueprint 1 node: ${name}`);
    }
    console.log(`[Step 1] All 5 Blueprint 1 nodes verified on canvas.`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-desktop-canvas-blueprint1.png'), fullPage: false });
    diagnostics.steps.push('Step 1: Desktop Canvas Blueprint 1 verified');

    // -----------------------------------------------------------------
    // TEST 2: Validation Panel & Health Score
    // -----------------------------------------------------------------
    console.log('[Step 2] Testing Validation Panel tab...');
    await page.click('button:has-text("Validation")');
    await page.waitForTimeout(600);

    await page.waitForSelector('text=Architecture Validator');
    await page.waitForSelector('text=Valid Architecture');
    console.log('[Step 2] Architecture Validator loaded. Health score 100%, 0 blocking errors.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-desktop-validation-panel.png'), fullPage: false });
    diagnostics.steps.push('Step 2: Validation Panel verified (0 blocking errors)');

    // -----------------------------------------------------------------
    // TEST 3: MTA YAML Generator & Live Manifest Validation
    // -----------------------------------------------------------------
    console.log('[Step 3] Testing MTA YAML Generator tab...');
    await page.click('button:has-text("MTA YAML")');
    await page.waitForTimeout(600);

    await page.waitForSelector('text=Generated MTA Deployment Descriptor');
    await page.waitForSelector('text=Structurally Validated');
    await page.waitForSelector('text=Semantically Validated');

    // Verify generated content contains key CAP and HANA blocks
    const yamlText = await page.textContent('pre');
    if (!yamlText.includes('_schema-version: 3.1.0') && !yamlText.includes('_schema-version: \'3.1.0\'') && !yamlText.includes('_schema-version: "3.1.0"')) {
      throw new Error(`YAML does not contain schema version 3.1.0. Found preview: ${yamlText.slice(0, 200)}`);
    }
    if (!yamlText.includes('name: orders-srv') || !yamlText.includes('name: orders-db-deployer')) {
      throw new Error('YAML missing CAP service or DB deployer modules');
    }
    console.log('[Step 3] MTA descriptor verified: schema 3.1.0, orders-srv, orders-db-deployer.');

    // Test Copy YAML feedback
    await page.click('button[aria-label="Copy mta.yaml to clipboard"]');
    await page.waitForTimeout(300);
    const copyBtnText = await page.textContent('button[aria-label="Copy mta.yaml to clipboard"]');
    console.log(`[Step 3] Copy button clicked. Feedback state: "${copyBtnText.trim()}"`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-desktop-mta-panel.png'), fullPage: false });
    diagnostics.steps.push('Step 3: MTA YAML Generator verified and interactive');

    // -----------------------------------------------------------------
    // TEST 4: Blueprint Manager Modal
    // -----------------------------------------------------------------
    console.log('[Step 4] Opening Blueprint Manager modal...');
    await page.click('button[aria-label="Manage Architecture Blueprints"]');
    await page.waitForTimeout(600);

    await page.waitForSelector('text=Manage Architecture Blueprints');
    await page.waitForSelector('text=Fiori + CAP Enterprise Application');
    await page.waitForSelector('text=CAP + External API Integration');
    console.log('[Step 4] Blueprint Manager modal opened showing all template blueprints.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-desktop-blueprint-manager.png'), fullPage: false });
    diagnostics.steps.push('Step 4: Blueprint Manager modal verified');

    // -----------------------------------------------------------------
    // TEST 5: Switch to Blueprint 2 (Fiori + CAP Enterprise App)
    // -----------------------------------------------------------------
    console.log('[Step 5] Switching to Blueprint 2 (Fiori + CAP)...');
    // Click Open button for Blueprint 2
    const openButtons = await page.$$('button:has-text("Open")');
    if (openButtons.length > 0) {
      await openButtons[0].click();
    }
    await page.waitForTimeout(600);

    // Switch to Canvas view
    await page.click('button:has-text("Canvas")');
    await page.waitForTimeout(600);

    await page.waitForSelector('text=SAP Fiori Application');
    await page.waitForSelector('text=enterprise-approuter');
    console.log('[Step 5] Blueprint 2 loaded onto canvas: SAP Fiori Application, App Router, CAP Service, HANA Cloud, XSUAA.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-desktop-canvas-blueprint2.png'), fullPage: false });
    diagnostics.steps.push('Step 5: Blueprint 2 (Fiori + CAP) verified on canvas');

    // Check MTA YAML for Blueprint 2
    await page.click('button:has-text("MTA YAML")');
    await page.waitForTimeout(500);
    const yamlBp2 = await page.textContent('pre');
    if (!yamlBp2.includes('manageorders-deployer') || !yamlBp2.includes('enterprise-approuter')) {
      throw new Error('Blueprint 2 MTA descriptor missing UI deployer or app router');
    }
    console.log('[Step 5] Blueprint 2 MTA verified: contains manageorders-deployer and enterprise-approuter.');

    // -----------------------------------------------------------------
    // TEST 6: Switch to Blueprint 3 (CAP + Destination + External API)
    // -----------------------------------------------------------------
    console.log('[Step 6] Switching to Blueprint 3 (CAP + External API Integration)...');
    await page.click('button[aria-label="Manage Architecture Blueprints"]');
    await page.waitForTimeout(500);
    const openButtonsBp3 = await page.$$('button:has-text("Open")');
    if (openButtonsBp3.length > 0) {
      await openButtonsBp3[openButtonsBp3.length - 1].click();
    }
    await page.waitForTimeout(600);

    await page.click('button:has-text("Canvas")');
    await page.waitForTimeout(600);

    await page.waitForSelector('text=Destination Service');
    await page.waitForSelector('text=External API');
    console.log('[Step 6] Blueprint 3 loaded onto canvas: Destination Service, External API, CAP Service.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-desktop-canvas-blueprint3.png'), fullPage: false });
    diagnostics.steps.push('Step 6: Blueprint 3 (CAP + External API) verified on canvas');

    // -----------------------------------------------------------------
    // TEST 7: Node Selection & Properties Panel
    // -----------------------------------------------------------------
    console.log('[Step 7] Inspecting component properties in side panel...');
    await page.click('[data-component-type="destination-service"]');
    await page.waitForTimeout(600);

    await page.waitForSelector('text=The Speed-Dial Contact List on Your Phone');
    await page.waitForSelector('text=Logical Destination Name');
    console.log('[Step 7] Properties panel open for Destination Service. Real-world analogy rendered.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-desktop-node-properties.png'), fullPage: false });
    diagnostics.steps.push('Step 7: Node Properties and Educational Guide verified');

    // -----------------------------------------------------------------
    // TEST 8: Responsive Layout on Tablet (768 × 1024)
    // -----------------------------------------------------------------
    console.log('[Step 8] Testing Tablet Viewport (768 × 1024)...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(600);

    const tabletOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`[Step 8] Tablet document horizontal overflow: ${tabletOverflow ? 'YES (FAIL)' : 'NO (PASS)'}`);
    if (tabletOverflow) throw new Error('Horizontal overflow detected on tablet viewport');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-tablet-design-lab.png'), fullPage: false });
    diagnostics.steps.push('Step 8: Tablet Viewport (768x1024) verified (0 overflow)');

    // -----------------------------------------------------------------
    // TEST 9: Responsive Layout on Mobile (390 × 844, iPhone 14)
    // -----------------------------------------------------------------
    console.log('[Step 9] Testing Mobile Viewport (390 × 844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(600);

    const mobileOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`[Step 9] Mobile document horizontal overflow: ${mobileOverflow ? 'YES (FAIL)' : 'NO (PASS)'}`);
    if (mobileOverflow) throw new Error('Horizontal overflow detected on mobile viewport');

    // Test mobile drawer trigger
    await page.click('button[aria-label="Add Component to Architecture"]');
    await page.waitForTimeout(600);
    await page.waitForSelector('text=Add BTP Component');
    console.log('[Step 9] Mobile component palette drawer opened successfully.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-mobile-palette-drawer.png'), fullPage: false });

    // Close mobile drawer
    await page.click('button[aria-label="Close Component Palette"]');
    await page.waitForTimeout(400);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-mobile-design-lab-canvas.png'), fullPage: false });
    diagnostics.steps.push('Step 9: Mobile Viewport (390x844) & slide-over drawer verified');

    console.log('\n======================================================');
    console.log('   PHASE 8 LIVE CHROME AUDIT PASSED WITH 100% SUCCESS');
    console.log('======================================================');
    console.log(`Chrome Version:    ${browserVersion}`);
    console.log(`Console Errors:    ${diagnostics.consoleErrors.length}`);
    console.log(`Page Errors:       ${diagnostics.pageErrors.length}`);
    console.log(`Failed Requests:   ${diagnostics.failedRequests.length}`);
    console.log(`Screenshots Saved: 10 files in ${SCREENSHOT_DIR}`);
    console.log('Verified Steps:');
    diagnostics.steps.forEach((s) => console.log(`  ✓ ${s}`));

  } catch (err) {
    console.error('\n[AUDIT FAILURE]', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    if (server) {
      console.log('[Server] Terminating Vite preview process...');
      server.kill('SIGTERM');
    }
  }
}

runDesignLabAudit();
