const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>reveal.observe(e));
const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('nav a')];
function updateNav(){const current=[...sections].reverse().find(s=>s.getBoundingClientRect().top<=160);links.forEach(a=>a.classList.toggle('active',current&&a.hash===`#${current.id}`))}
window.addEventListener('scroll',updateNav,{passive:true});updateNav();
document.getElementById('backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const featureContent={
profiles:{label:'Profile & Group Mapping',window:'Profiles, groups & Chrome folders',title:'Keep every identity aligned with the right destination.',description:'Map a dedicated Chrome data folder, Facebook group, and image folder to each operational profile.',proofs:['One profile mapped to one intended group','Dedicated Chrome data folders prevent session overlap','Open-test status reveals login or checkpoint issues'],demo:()=>`<div class="metric-row"><div><small>Profiles</small><strong>3</strong></div><div><small>Ready</small><strong class="teal">2</strong></div><div><small>Needs attention</small><strong class="amber">1</strong></div></div><div class="table-card"><div class="table-head"><span>Profile</span><span>Destination</span><span>Browser folder</span><span>Status</span></div>${[['MH','Maya Home','Minimal Home Living','Chrome / Maya','Ready'],['AD','Alex Daily','Coffee Lovers Club','Chrome / Alex','Ready'],['SN','Studio North','Modern Interiors','Chrome / Studio','Checkpoint']].map((p,i)=>`<div class="table-row demo-step"><span class="profile-cell"><b class="avatar a${i}">${p[0]}</b><em>${p[1]}</em></span><span>${p[2]}</span><span class="mono">${p[3]}</span><span><i class="status ${p[4]==='Ready'?'ok':'warn'}">${p[4]}</i></span></div>`).join('')}</div><div class="activity"><b>Mapping check</b><div class="demo-step"><i>1</i><span>Dedicated profile folders detected</span><time>3 / 3</time></div><div class="demo-step"><i>2</i><span>Destination access verified</span><time>2 / 3</time></div></div>`},
sheets:{label:'Google Sheet Intake',window:'Content source & validation',title:'Turn a shared content plan into validated work.',description:'Import structured rows from a published Google Sheet and surface row-level errors before they reach the queue.',proofs:['Content, comments, image, date, and time fields','Duplicate-safe synchronization','Clear validation for profiles, URLs, schedules, and files'],demo:()=>`<div class="sync-flow"><span>Google Sheet <b>12 rows</b></span><i>→</i><span>Validate <b>10 passed</b></span><i>→</i><span>Review queue <b>Ready</b></span></div><div class="sheet-card"><div class="sheet-row sheet-head"><b>#</b><b>Profile</b><b>Post content</b><b>Image</b><b>Schedule</b><b>Result</b></div><div class="sheet-row demo-step"><span>2</span><span>Maya Home</span><span>Small rituals, calmer mornings…</span><span>03.jpg</span><span>Sep 12 · 09:30</span><span><i class="status ok">Valid</i></span></div><div class="sheet-row demo-step"><span>3</span><span>Alex Daily</span><span>A good cup changes the pace…</span><span>08.jpg</span><span>Sep 12 · 11:00</span><span><i class="status ok">Valid</i></span></div><div class="sheet-row demo-step error"><span>4</span><span>Studio North</span><span>Warm forms, quiet spaces…</span><span>—</span><span>Sep 12 · 14:00</span><span><i class="status warn">Fix image</i></span></div></div><div class="activity"><b>Import activity</b><div class="demo-step"><i>1</i><span>Schema and duplicate check</span><time>Passed</time></div><div class="demo-step"><i>2</i><span>Rows added to review queue</span><time>10 new</time></div></div>`},
rules:{label:'Profile-specific Image Rules',window:'Image rules & readiness',title:'Use the right images for the right profile.',description:'Define keyword rules and quality filters per profile, so the image strategy can change without changing the workflow.',proofs:['Preferred and excluded keywords per profile','Strict or assisted matching modes','Face, watermark, and text-heavy image filters'],demo:()=>`<div class="rules-grid"><div class="rule-panel"><label>Profile</label><div class="select-like"><b class="avatar a0">MH</b><span>Maya Home</span><i>⌄</i></div><label>Preferred keywords</label><div class="chips"><span>minimal interior</span><span>neutral home</span><button>+</button></div><label>Excluded keywords</label><div class="chips danger"><span>person</span><span>logo</span><span>text overlay</span></div><label>Matching mode</label><div class="toggle-line"><span><b>Strict match</b><small>Require at least one preferred keyword</small></span><i class="toggle on"></i></div></div><div class="rule-panel filters"><label>Quality filters</label><div class="filter demo-step"><span><i>◎</i><b>Reject visible faces</b></span><em>On</em></div><div class="filter demo-step"><span><i>◇</i><b>Reject watermarks</b></span><em>On</em></div><div class="filter demo-step"><span><i>≡</i><b>Reject text-heavy images</b></span><em>On</em></div><div class="rule-result demo-step"><i>✓</i><span><b>Rule set ready</b><small>3 quality filters · strict matching</small></span></div></div></div><div class="activity compact"><b>Live rule preview</b><div class="demo-step"><i>1</i><span>24 candidates scanned</span><time>0.8 sec</time></div><div class="demo-step"><i>2</i><span>8 images match this profile</span><time>Ready</time></div></div>`},
images:{label:'Pinterest & Local Library',window:'Image sourcing & library',title:'Choose automation without losing local control.',description:'Use a dedicated Pinterest browser profile for discovery or run entirely from customer-owned image folders.',proofs:['Manual Pinterest login in a separate Chrome profile','Local-folder mode with no Pinterest dependency','Duplicate detection and non-destructive image saving'],demo:()=>`<div class="source-bar"><span><i class="pin">P</i><b>Pinterest discovery</b><small>Dedicated profile · Connected</small></span><button>Local library</button></div><div class="candidate-grid"><article class="candidate accepted demo-step"><div><img src="assets/demo-coffee-approved.png" alt="Fictional approved coffee image"><span class="reason-tag">✓ Accepted</span></div><h4>Warm coffee, no face</h4><p>Keyword match · Clean image</p></article><article class="candidate rejected demo-step"><div><img src="assets/demo-coffee-face.png" alt="Fictional image rejected because of face"><span class="reason-tag">× Face detected</span></div><h4>Lifestyle portrait</h4><p>Excluded by Maya Home rule</p></article><article class="candidate rejected demo-step"><div><img src="assets/demo-coffee-watermark.png" alt="Fictional image rejected because of watermark"><span class="reason-tag">× Watermark</span></div><h4>Branded coffee image</h4><p>Quality filter triggered</p></article></div><div class="activity compact"><b>Library activity</b><div class="demo-step"><i>1</i><span>Saved without overwriting originals</span><time class="mono">Maya Home / 120926 / 03.jpg</time></div><div class="demo-step"><i>2</i><span>Duplicate fingerprint check</span><time>Passed</time></div></div>`},
queue:{label:'Review & Scheduling Queue',window:'Review, approval & schedule',title:'Put human review between content and publication.',description:'Prepare previews, approve individual or grouped tasks, schedule releases, retry failures, and pause the operation when needed.',proofs:['Explicit waiting, review, approved, and published states','Controlled retries with backoff','Global pause on checkpoint or authentication issues'],demo:()=>`<div class="queue-actions"><span><b>Today’s queue</b><small>3 fictional tasks · live actions disabled</small></span><button>Approve selected</button><button class="outline">Pause queue</button></div><div class="queue-progress"><span class="done"></span><span class="done"></span><span class="active"></span><span></span><span></span><b>2 of 5 checks complete</b></div><div class="table-card queue-table"><div class="table-head"><span>Profile & content</span><span>Media</span><span>Schedule</span><span>State</span></div>${[['MH','Maya Home','Small rituals, calmer mornings…','03.jpg','09:30','Approved','ok'],['AD','Alex Daily','A good cup changes the pace…','08.jpg','11:00','In review','review'],['SN','Studio North','Warm forms, quiet spaces…','12.jpg','14:00','Blocked','warn']].map((p,i)=>`<div class="table-row demo-step"><span class="profile-cell"><b class="avatar a${i}">${p[0]}</b><em>${p[1]}<small>${p[2]}</small></em></span><span>${p[3]}</span><span>${p[4]}</span><span><i class="status ${p[6]}">${p[5]}</i></span></div>`).join('')}</div><div class="activity compact"><b>Queue activity</b><div class="demo-step"><i>1</i><span>Maya Home passed content and image review</span><time>09:14</time></div><div class="demo-step"><i>2</i><span>Studio North paused at login checkpoint</span><time>09:16</time></div></div>`},
monitor:{label:'MuMu Comments & Live Monitor',window:'Android execution & live monitor',title:'See what the automation is doing while it runs.',description:'Coordinate comment tasks across mapped MuMu windows and keep Chrome and Android execution visible from one monitor.',proofs:['ADB-based MuMu device mapping','Per-window dry-run before live commenting','Screenshots, status messages, and operational logs'],demo:()=>`<div class="monitor-grid"><div class="device-card demo-step"><div class="phone"><span></span><b>MuMu 01</b><i>✓</i></div><div><small>Mapped profile</small><strong>Maya Home</strong><span class="status ok">Dry-run passed</span></div></div><div class="device-card demo-step"><div class="phone"><span></span><b>MuMu 02</b><i>✓</i></div><div><small>Mapped profile</small><strong>Alex Daily</strong><span class="status ok">Dry-run passed</span></div></div><div class="monitor-side"><small>Live actions</small><strong>Disabled</strong><p>Simulation mode keeps every action local and reversible.</p><div class="shield">◇ <span>Safety gate active</span></div></div></div><div class="console"><div><b>Activity stream</b><span>Simulation</span></div><p class="demo-step"><time>09:22:10</time><i class="ok-dot"></i>ADB connected to two distinct windows</p><p class="demo-step"><time>09:22:12</time><i class="ok-dot"></i>Comment field located in MuMu 01</p><p class="demo-step"><time>09:22:14</time><i class="pause-dot"></i>Stopped before submit · dry-run complete</p></div>`}
};

const demoCanvas=document.getElementById('demoCanvas'),demoStatus=document.getElementById('demoStatus'),runDemo=document.getElementById('runDemo');let currentFeature='rules',timers=[];
function clearTimers(){timers.forEach(clearTimeout);timers=[]}
function renderFeature(key){clearTimers();currentFeature=key;const f=featureContent[key];document.querySelectorAll('[data-feature]').forEach(item=>{const selected=item.dataset.feature===key;item.classList.toggle('active',selected);item.setAttribute('aria-selected',String(selected))});document.getElementById('featureLabel').textContent=f.label;document.getElementById('featureWindowLabel').textContent=f.window;document.getElementById('demoHeading').textContent=f.label;document.getElementById('featureTitle').textContent=f.title;document.getElementById('featureDescription').textContent=f.description;document.getElementById('featureProofs').innerHTML=f.proofs.map(p=>`<li>${p}</li>`).join('');demoCanvas.innerHTML=f.demo();demoStatus.textContent='Ready to run';runDemo.classList.remove('running');runDemo.innerHTML='<span>▶</span> Run demo'}
document.querySelectorAll('[data-feature]').forEach(button=>button.addEventListener('click',()=>renderFeature(button.dataset.feature)));
runDemo.addEventListener('click',()=>{clearTimers();renderFeature(currentFeature);const steps=[...demoCanvas.querySelectorAll('.demo-step')];runDemo.classList.add('running');runDemo.innerHTML='<span class="spinner"></span> Running';demoStatus.textContent='Running safe simulation…';steps.forEach((step,index)=>timers.push(setTimeout(()=>{step.classList.add('active');if(index>0)steps[index-1].classList.add('done')},180+index*260)));timers.push(setTimeout(()=>{steps.forEach(step=>step.classList.add('done'));demoStatus.textContent='Demo completed · No live action';runDemo.classList.remove('running');runDemo.innerHTML='<span>↻</span> Replay demo'},500+steps.length*260))});
renderFeature('rules');

const workflowContent={
  profiles:{image:'assets/workflow-profiles.gif',title:'Connect profiles',text:'Profile folders and destinations are checked before the workflow begins.'},
  sheets:{image:'assets/workflow-sheets.gif',title:'Import content',text:'Prepared Sheet rows are synchronized, validated, and converted into review tasks.'},
  rules:{image:'assets/workflow-rules.gif',title:'Apply image rules',text:'Each profile applies its own keywords, exclusions, and visual quality filters.'},
  queue:{image:'assets/workflow-queue.gif',title:'Review the queue',text:'Content, media, schedule, and destination stay visible before approval.'},
  checks:{image:'assets/workflow-checks.gif',title:'Run dry checks',text:'Chrome and two distinct MuMu windows are tested without submitting a live action.'},
  enable:{image:'assets/workflow-enable.gif',title:'Enable live actions',text:'Publishing controls unlock only after every required readiness condition passes.'}
};
const workflowItems=[...document.querySelectorAll('[data-workflow]')];
const workflowFrame=document.querySelector('.workflow-frame');
function selectWorkflow(item){
  const key=item.dataset.workflow,content=workflowContent[key];
  workflowItems.forEach(node=>{const selected=node===item;node.classList.toggle('active',selected);node.setAttribute('aria-pressed',String(selected))});
  document.getElementById('workflowDemoTitle').textContent=content.title;
  document.getElementById('workflowDemoText').textContent=content.text;
  const image=document.getElementById('workflowDemoImage');
  image.src='';image.src=content.image;image.alt=`Animated ${content.title} feature demonstration`;
  workflowFrame.classList.remove('playing');void workflowFrame.offsetWidth;workflowFrame.classList.add('playing');
}
workflowItems.forEach(item=>{
  item.addEventListener('click',()=>selectWorkflow(item));
  item.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectWorkflow(item)}});
});
selectWorkflow(workflowItems[0]);

/* Messenger Hub multi-account demo (fictional data) */
(function(){
const root=document.getElementById('mhAccounts');if(!root)return;
const accounts=[
 {id:'acc_01',name:'Shop Mai Linh',role:'Owner',service:'Messenger',color:'#3b82f6',unread:2,customers:148,state:'ok'},
 {id:'acc_02',name:'CSKH 01 · Thu Hà',role:'Sales staff',service:'Messenger',color:'#10b981',unread:1,customers:212,state:'ok'},
 {id:'acc_03',name:'CSKH 02 · Minh Anh',role:'Sales staff',service:'Messenger',color:'#f59e0b',unread:0,customers:97,state:'ok'},
 {id:'acc_04',name:'Kho Sỉ Hà Nội',role:'Wholesale',service:'Messenger',color:'#8b5cf6',unread:3,customers:64,state:'ok'},
 {id:'acc_05',name:'Bé Xinh Store',role:'Page inbox',service:'Facebook Web',color:'#ec4899',unread:0,customers:131,state:'check'},
 {id:'acc_06',name:'Tư Vấn 06 · Lan',role:'Night shift',service:'Messenger',color:'#06b6d4',unread:1,customers:58,state:'ok'}
];
const initial=[
 ['acc_04','Chị Hằng (sỉ)','Em lấy 50 áo size M, bên mình báo giá sỉ giúp em nhé','09:41'],
 ['acc_01','Ngọc Trâm','Mẫu váy be còn size S không shop?','09:38'],
 ['acc_02','Anh Tuấn','Mình chuyển khoản rồi nha, check giúp mình','09:35'],
 ['acc_06','Thu Phương','Ship về Đà Nẵng mất mấy ngày ạ?','09:31']
];
const incoming=[
 ['acc_03','Bảo Vy','Cho mình xin bảng size với ạ'],
 ['acc_01','Minh Châu','Shop ơi đơn của em giao chưa ạ?'],
 ['acc_04','Cửa hàng Hoa Mai','Tuần này có hàng mới không chị?'],
 ['acc_02','Quốc Huy','Đổi sang màu đen được không bạn?'],
 ['acc_06','Hải Yến','Tối nay đặt thì mai có nhận được không?'],
 ['acc_01','Kim Ngân','Mình muốn đặt thêm 2 cái nữa']
];
let feed=initial.map(x=>({acc:x[0],from:x[1],text:x[2],time:x[3]}));
let selected='acc_04',timers=[],clock=9*60+42;
const byId=id=>accounts.find(a=>a.id===id);
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function ini(n){return n.replace(/^(CSKH \d+ · |Tư Vấn \d+ · )/,'').trim().charAt(0)}
function renderRail(){
 root.innerHTML=accounts.map(a=>`<button type="button" class="mh-acc${a.id===selected?' on':''}" data-acc="${a.id}" style="--c:${a.color}" aria-label="${esc(a.name)}, ${a.unread} unread" aria-pressed="${a.id===selected}"><span>${ini(a.name)}</span>${a.unread?`<b>${a.unread}</b>`:''}${a.state==='check'?'<i title="Checkpoint">!</i>':''}</button>`).join('');
 const t=accounts.reduce((s,a)=>s+a.unread,0);const tb=document.getElementById('mhTotal');tb.textContent=t;tb.hidden=!t;
}
function renderFeed(flash){
 document.getElementById('mhFeed').innerHTML=feed.map((f,i)=>{const a=byId(f.acc);return `<li><button type="button" class="mh-item${i===0&&flash?' new':''}${f.acc===selected?' sel':''}" data-acc="${f.acc}" style="--c:${a.color}"><span class="mh-av">${esc(f.from.charAt(0))}</span><span class="mh-txt"><span class="mh-row"><b>${esc(f.from)}</b><time>${f.time}</time></span><span class="mh-msg">${esc(f.text)}</span><span class="mh-chip">${esc(a.name)}</span></span></button></li>`}).join('');
 document.getElementById('mhFeedMeta').textContent=`${feed.length} messages · ${new Set(feed.map(f=>f.acc)).size} accounts`;
}
function renderPanel(){
 const a=byId(selected),n=accounts.indexOf(a)+1;
 const st=a.state==='check'?'<span class="status warn">Checkpoint · paused</span>':'<span class="status ok">Signed in</span>';
 document.getElementById('mhPanel').innerHTML=`<div class="mh-ph" style="--c:${a.color}"><span class="mh-big">${ini(a.name)}</span><div><b>${esc(a.name)}</b><small>${a.role} · ${a.service}</small></div></div>
 <dl class="mh-dl">
 <div><dt>Session partition</dt><dd class="mono">persist:fb_account_${a.id}</dd></div>
 <div><dt>Cookies · cache · storage</dt><dd>Kept only for this account</dd></div>
 <div><dt>Status</dt><dd>${st}</dd></div>
 <div><dt>Unread right now</dt><dd>${a.unread}</dd></div>
 <div><dt>Customers in CRM</dt><dd>${a.customers}</dd></div>
 </dl>
 <p class="mh-note">${a.state==='check'?'Facebook asked this account for verification. The Hub pauses background work here only; the other 5 accounts keep running.':`Switching to account ${n} of ${accounts.length} opens its own signed-in Messenger view. The other accounts stay signed in behind it.`}</p>`;
}
function select(id){selected=id;const a=byId(id);a.unread=0;renderRail();renderFeed(false);renderPanel()}
document.querySelector('.mh-body').addEventListener('click',e=>{const b=e.target.closest('[data-acc]');if(b)select(b.dataset.acc)});
document.getElementById('mhFeedBtn').addEventListener('click',()=>{document.getElementById('mhFeed').scrollTop=0});
const run=document.getElementById('mhRun');
run.addEventListener('click',()=>{timers.forEach(clearTimeout);timers=[];run.disabled=true;run.innerHTML='<span class="spinner"></span> Receiving…';
 incoming.forEach((m,i)=>timers.push(setTimeout(()=>{clock+=1;const t=`${String(Math.floor(clock/60)).padStart(2,'0')}:${String(clock%60).padStart(2,'0')}`;
  feed.unshift({acc:m[0],from:m[1],text:m[2],time:t});if(feed.length>9)feed.pop();const a=byId(m[0]);if(a.id!==selected)a.unread++;renderRail();renderFeed(true);renderPanel();
  if(i===incoming.length-1){run.disabled=false;run.innerHTML='<span>↻</span> Simulate again'}},500+i*750)));
});
select(selected);
})();
