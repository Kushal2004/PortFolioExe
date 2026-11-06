const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:process.platform==='win32'?'msedge':undefined,headless:true});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://rsms.me/**',r=>r.abort());
 await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/',{waitUntil:'domcontentloaded'});
 await page.locator('[data-panel="theme"]').waitFor();await page.waitForTimeout(1200);
 assert.equal(await page.locator('.panel-bar').count(),0);
 await page.mouse.move(4,4);
 assert.equal(await page.locator('[data-panel="theme"] .panel-grip').evaluate(el=>getComputedStyle(el).opacity),'0');
 await page.locator('[data-panel="theme"] .panel-grip').hover();await page.waitForTimeout(180);
 assert.equal(await page.locator('[data-panel="theme"] .panel-grip').evaluate(el=>getComputedStyle(el).opacity),'1');
 console.log('PASS: no title bars; corner controls reveal only on hover or focus');
 assert.equal(await page.locator('[data-panel="contact"] iframe').count(),0);
 assert.equal(await page.locator('[data-panel="dino"] iframe').count(),1);
 const backgrounds=async()=>{for(const id of ['intro','timeline','contact']){const coverage=await page.locator('[data-panel="'+id+'"]').evaluate(panel=>{const surface=panel.querySelector('.panel-surface').getBoundingClientRect(),backdrop=panel.querySelector('.panel-backdrop').getBoundingClientRect();return Math.abs(surface.height-backdrop.height)<=2&&Math.abs(surface.width-backdrop.width)<=2;});assert(coverage,id+' background must cover the whole panel');}};await backgrounds();
 const fits=async()=>{await page.waitForTimeout(500);const overflow=await page.locator('.workspace-panel').evaluateAll(nodes=>nodes.filter(n=>{const c=n.querySelector('.panel-content'),i=n.querySelector('.panel-inner');return i.getBoundingClientRect().height>c.clientHeight+2 || ['auto','scroll'].includes(getComputedStyle(c).overflowY)}).map(n=>n.dataset.panel));assert.deepEqual(overflow,[],'content must fit without panel scrolling');};await fits();
 const boxes=()=>page.locator('.workspace-panel').evaluateAll(nodes=>nodes.map(n=>({id:n.dataset.panel,...n.getBoundingClientRect().toJSON()})));
 const validate=async()=>{await page.waitForTimeout(350);const b=await boxes();assert.equal(b.length,11);for(const a of b){assert(a.x>=15 && a.right<=1441,`${a.id} boundary`);for(const c of b){if(a.id===c.id)continue;const overlapX=Math.min(a.right,c.right)-Math.max(a.left,c.left);const overlapY=Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top);assert(!(overlapX>1&&overlapY>1),`overlap ${a.id}/${c.id}`);if(overlapX>1)assert(Math.max(a.top,c.top)-Math.min(a.bottom,c.bottom)>=15,`vertical gap ${a.id}/${c.id}`);if(overlapY>1)assert(Math.max(a.left,c.left)-Math.min(a.right,c.right)>=15,`horizontal gap ${a.id}/${c.id}`);}}return b;};
 await validate();
 let panel=page.locator('[data-panel="theme"]');let rect=await panel.boundingBox();
 await page.mouse.move(rect.x+80,rect.y+70);await page.mouse.down();await page.mouse.move(rect.x-340,rect.y+430,{steps:15});await page.waitForTimeout(100);assert(await page.locator('.react-grid-placeholder').count(),'drag preview');await page.mouse.up();await validate();
 assert(await page.evaluate(()=>!!localStorage.getItem('portfolio-panels-v1')));console.log('PASS: drag, preview, collision-free placement, uniform gaps, saved layout');
 await page.getByRole('button',{name:'Reset layout'}).click();await page.waitForTimeout(300);
 for(const axis of ['se','e','s','nw','n','w','ne','sw']){
  panel=page.locator('[data-panel="social"]');const handle=panel.locator('.react-resizable-handle-'+axis);await handle.scrollIntoViewIfNeeded();const r=await handle.boundingBox();await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width/2+(axis.includes('w')?-100:axis.includes('e')?100:0),r.y+r.height/2+(axis.includes('n')?-50:axis.includes('s')?70:0),{steps:12});await page.mouse.up();await validate();await fits();await backgrounds();await page.getByRole('button',{name:'Reset layout'}).click();await page.waitForTimeout(250);
 }
 console.log('PASS: all eight resize handles keep bounds and avoid overlaps');
 for(const id of ['intro','contact']){
  const target=page.locator('[data-panel="'+id+'"]');const east=target.locator('.react-resizable-handle-e');await east.scrollIntoViewIfNeeded();let r=await east.boundingBox();await page.mouse.move(r.x+4,r.y+20);await page.mouse.down();await page.mouse.move(r.x-500,r.y+20,{steps:12});await page.mouse.up();await page.waitForTimeout(900);await fits();
  const south=target.locator('.react-resizable-handle-s');await south.scrollIntoViewIfNeeded();r=await south.boundingBox();await page.mouse.move(r.x+20,r.y+4);await page.mouse.down();await page.mouse.move(r.x+20,r.y-900,{steps:12});await page.mouse.up();await page.waitForTimeout(900);await fits();await validate();await backgrounds();await page.getByRole('button',{name:'Reset layout'}).click();await page.waitForTimeout(600);
 }
 console.log('PASS: narrow and minimum-height content stays visible without scrollbars');
 const grip=page.getByRole('button',{name:'Move or resize Appearance'});await grip.focus();await grip.press('Shift+ArrowDown');await page.waitForTimeout(300);const before=await boxes();await page.reload({waitUntil:'domcontentloaded'});await page.locator('[data-panel="theme"]').waitFor();await page.waitForTimeout(1200);assert.deepEqual((await boxes()).map(n=>[n.id,n.width,n.height,n.x,n.y]),before.map(n=>[n.id,n.width,n.height,n.x,n.y]));console.log('PASS: keyboard resize and reload persistence');
 await page.getByRole('button',{name:'Reset layout'}).click();await page.waitForTimeout(300);
 const original=await boxes();rect=await page.locator('[data-panel="theme"]').boundingBox();await page.mouse.move(rect.x+75,rect.y+70);await page.mouse.down();await page.mouse.move(rect.x-200,rect.y+300,{steps:8});await page.keyboard.press('Escape');await page.mouse.up();await page.waitForTimeout(300);assert.deepEqual((await boxes()).map(n=>[n.id,n.width,n.height,n.x,n.y]),original.map(n=>[n.id,n.width,n.height,n.x,n.y]));console.log('PASS: Escape cancels without saving an intermediate layout');
 const input=page.locator('#firstname');await input.fill('Panel test');assert.equal(await page.locator('.react-grid-placeholder').count(),0);assert.equal(await input.inputValue(),'Panel test');console.log('PASS: form controls work without dragging');

 for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:1000});await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);await fits();}
 await page.setViewportSize({width:375,height:900});await page.waitForTimeout(500);console.log('PASS: responsive widths 320,375,768,1024,1440');console.log('page errors',errors);assert.equal(errors.length,0);
 const context=await browser.newContext({viewport:{width:375,height:900},isMobile:true,hasTouch:true});const mobile=await context.newPage();await mobile.route('https://rsms.me/**',r=>r.abort());await mobile.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/',{waitUntil:'domcontentloaded'});await mobile.locator('[data-panel="theme"]').waitFor();await mobile.waitForTimeout(300);const mr=await mobile.getByRole('button',{name:'Move or resize Appearance'}).boundingBox();const session=await context.newCDPSession(mobile);const touchPoint={x:mr.x+mr.width/2,y:mr.y+mr.height/2};await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touchPoint]});for(let step=1;step<=12;step++){await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:touchPoint.x,y:touchPoint.y+step*45}]});}await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(350);assert(await mobile.evaluate(()=>!!localStorage.getItem('portfolio-panels-v1')));assert((await mobile.locator('[data-panel="theme"]').boundingBox()).y>100);console.log('PASS: touch grip drag and placement');await context.close();} finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
