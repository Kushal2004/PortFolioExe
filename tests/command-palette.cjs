const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:process.platform==='win32'?'msedge':undefined,headless:true});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  await context.route('https://rsms.me/**',r=>r.abort());
  await context.route('https://github.com/**',r=>r.fulfill({contentType:'text/html',body:'<title>Project destination</title><p>Project destination</p>'}));
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.TEST_BASE_URL||'http://127.0.0.1:4321/',{waitUntil:'domcontentloaded',timeout:90000});
  await page.locator('[data-panel="theme"]').waitFor();await page.waitForTimeout(900);
  const palette=page.getByRole('dialog',{name:'Search projects and commands'});
  const search=page.getByRole('combobox',{name:'Search projects and commands'});
  const trigger=page.getByRole('button',{name:'Open command palette'});
  await page.keyboard.press('/');await palette.waitFor();assert(await search.evaluate(el=>el===document.activeElement));
  await search.fill('get in touch');await search.press('Enter');await palette.waitFor({state:'hidden'});await page.waitForTimeout(150);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'firstname');assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
  await page.locator('#firstname').press('/');assert.equal(await page.locator('dialog[open]').count(),0);
  await page.keyboard.press('Control+k');await palette.waitFor();await page.keyboard.press('Control+k');await palette.waitFor({state:'hidden'});
  assert.equal(await page.evaluate(()=>document.activeElement.id),'firstname');console.log('PASS: shortcuts, contact focus, typing guard, shortcut toggle');
  await trigger.click();await search.fill('theme');const dark=await page.evaluate(()=>document.documentElement.classList.contains('dark'));await search.press('Enter');await palette.waitFor({state:'hidden'});await page.waitForTimeout(120);
  assert.notEqual(await page.evaluate(()=>document.documentElement.classList.contains('dark')),dark);console.log('PASS: theme action');
  await trigger.click();await search.fill('projects');const first=await search.getAttribute('aria-activedescendant');await search.press('ArrowDown');assert.notEqual(await search.getAttribute('aria-activedescendant'),first);await search.press('ArrowUp');assert.equal(await search.getAttribute('aria-activedescendant'),first);
  await search.fill('zzzz-no-project-match');assert.equal(await page.getByRole('option').count(),0);assert(await page.getByText('No results for').isVisible());await search.press('Enter');assert(await palette.isVisible());await search.press('Escape');await palette.waitFor({state:'hidden'});assert(await trigger.evaluate(el=>el===document.activeElement));console.log('PASS: arrow navigation, empty results, Escape, restored focus');
  await trigger.click();await search.fill('crowdfunding');assert.equal(await page.getByRole('option').count(),1);const popupPromise=page.waitForEvent('popup');await search.press('Enter');const popup=await popupPromise;await popup.waitForLoadState('domcontentloaded');assert.equal(popup.url(),'https://github.com/Kushal2004/crowdfunding-dapp-main');assert.equal(await popup.evaluate(()=>window.opener),null);await popup.close();console.log('PASS: real project index and safe external project link');
  await page.getByRole('button',{name:'Reset layout',exact:true}).click();await page.waitForTimeout(600);const panel=page.locator('[data-panel="theme"]');const height=(await panel.boundingBox()).height;await page.getByRole('button',{name:'Move or resize Appearance'}).focus();await page.keyboard.press('Shift+ArrowDown');await page.waitForTimeout(350);assert((await panel.boundingBox()).height>height);await page.keyboard.press('/');await search.fill('reset layout');await search.press('Enter');await palette.waitFor({state:'hidden'});await page.waitForTimeout(700);assert.equal((await panel.boundingBox()).height,height);console.log('PASS: reset action restores the current layout');
  await trigger.click();await search.fill('');await page.mouse.click(3,3);await palette.waitFor({state:'hidden'});
  await page.setViewportSize({width:375,height:700});await page.waitForTimeout(600);await trigger.click();await palette.waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),375);const bounds=await palette.boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=375);await page.keyboard.press('Tab');assert(await page.getByRole('button',{name:'Close command palette'}).evaluate(el=>el===document.activeElement));await page.keyboard.press('Escape');console.log('PASS: backdrop dismissal, mobile layout, modal focus containment');
  assert.deepEqual(errors,[]);console.log('PASS: no browser errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
