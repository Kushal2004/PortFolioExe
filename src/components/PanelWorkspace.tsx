import React, { lazy, Suspense, memo, useEffect, useMemo, useRef, useState } from 'react';
import GridLayout, { useContainerWidth, verticalCompactor, type Layout, type EventCallback } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import IntroductionCard from './cards/IntroductionCard';
import SocialMediaLinksCard from './cards/SocialMediaLinksCard';
import ModeCard from './cards/ModeCard';
import GetInTouchCard from './cards/GetInTouchCard';
import ResumeCard from './cards/ResumeCard';
import CommunityCard from './cards/CommunityCard';
import TimelineCard from './cards/TimelineCard';
import SkillsCard from './cards/SkillsCard';
import DinoCard from './cards/DinoCard';
import CommandPalette from './CommandPalette';
import { GridBackgroundDemo } from './ui/GridBackgroundDemo';
import { AuroraBackdrop } from './ui/aurora-background';
import { initialLayout, restoreLayout, movePanel, PANEL_GAP, ROW_HEIGHT, STORAGE_KEY, minimumPanelRows, type PanelLayouts, type PanelId } from '../utils/panel-layout';
const GithubCard = lazy(()=>import('./cards/GithubCard'));
const GlobeCard = lazy(()=>import('./cards/GlobeCard'));
const panels: {id:PanelId;title:string;component:React.ComponentType}[] = [
  {id:'intro',title:'Introduction',component:IntroductionCard},
  {id:'social',title:'Find me on',component:SocialMediaLinksCard},
  {id:'theme',title:'Appearance',component:ModeCard},
  {id:'contact',title:'Get in touch',component:GetInTouchCard},
  {id:'resume',title:'Résumé',component:ResumeCard},
  {id:'blog',title:'Blog & projects',component:CommunityCard},
  {id:'timeline',title:'Timeline',component:TimelineCard},
  {id:'skills',title:'Skills & tools',component:SkillsCard},
  {id:'github',title:'Contributions',component:GithubCard},
  {id:'globe',title:'Globe',component:GlobeCard},
  {id:'dino',title:'Dinosaur game',component:DinoCard},
];
const PanelBody = memo(function PanelBody({Card,title}:{Card:React.ComponentType;title:string}) {
  return <Suspense fallback={<p className="p-6" role="status">Loading {title.toLowerCase()}…</p>}><Card /></Suspense>;
});
export default function PanelWorkspace() {
  const {width,containerRef,mounted} = useContainerWidth({measureBeforeMount:true});
  const cols = width >= 1100 ? 12 : width >= 650 ? 6 : 1;
  const [layouts,setLayouts] = useState<PanelLayouts>({});
  const [ready,setReady] = useState(false);
  const [active,setActive] = useState<string|null>(null);
  const [message,setMessage] = useState('');
  const [touch,setTouch] = useState(false);
  const [minimums,setMinimums] = useState<Record<string,number>>({});
  const snapshot = useRef<{layout:Layout;cols:number}|null>(null);
  const [interactionEpoch,setInteractionEpoch] = useState(0);
  useEffect(()=>{
    const loaded:PanelLayouts = {};
    try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); for(const n of [1,6,12]) loaded[n] = restoreLayout(data[n],n); } catch {}
    setLayouts(loaded);setReady(true);
    const query=matchMedia('(pointer: coarse)');const update=()=>setTouch(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);
  },[]);
  const layout = useMemo(()=>(layouts[cols] || initialLayout(cols)).map(p=>{
    const floor=Math.max(minimumPanelRows(p.i),minimums[`${cols}:${p.i}`]||0);
    return {...p,minH:floor,maxH:Math.max(40,floor)};
  }),[layouts,cols,minimums]);
  // Observe intrinsic content, not the allocated panel height. Defer floor changes
  // until release so layout constraints cannot fight the pointer mid-gesture.
  useEffect(()=>{
    if(active || !ready) return;
    let timer:ReturnType<typeof setTimeout>;
    const pending:Record<string,number>={};
    const observer=new ResizeObserver(entries=>{
      for(const entry of entries){
        const id=(entry.target as HTMLElement).dataset.content!;
        if(['theme','social','globe','dino'].includes(id)) continue;
        const panel=layout.find(p=>p.i===id);
        if(!panel) continue;
        const expected=((width-PANEL_GAP*(cols-1))/cols+PANEL_GAP)*panel.w-PANEL_GAP-2;
        // Do not turn intermediate animated widths into permanent height limits.
        if(Math.abs(entry.contentRect.width-expected)>1) continue;
        const height=entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height;
        pending[`${cols}:${id}`]=Math.ceil((height+2+PANEL_GAP)/(ROW_HEIGHT+PANEL_GAP));
      }
      clearTimeout(timer);
      timer=setTimeout(()=>setMinimums(previous=>{
        const next={...previous,...pending};
        return Object.keys(next).some(id=>next[id]!==previous[id])?next:previous;
      }),220);
    });
    document.querySelectorAll('.panel-inner').forEach(el=>observer.observe(el));
    return()=>{observer.disconnect();clearTimeout(timer);};
  },[active,ready,cols,width]);
  useEffect(()=>{
    if(active || !ready || !layout.some(p=>p.h<p.minH!)) return;
    const fitted=verticalCompactor.compact(layout.map(p=>({...p,h:Math.max(p.h,p.minH!)})),cols);
    setLayouts(previous=>({...previous,[cols]:fitted}));
  },[layout,active,ready,cols]);
  const commit = (next:Layout) => {
    setLayouts(previous=>{const updated={...previous,[cols]:next};try{localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));}catch{}return updated;});
  };
  const start:EventCallback = (current,_old,item)=>{ snapshot.current={layout:current.map(p=>({...p})),cols};setActive(item?.i ?? null); };
  const stop:EventCallback = (next,_old,item)=>{commit(next);setActive(null);snapshot.current=null;setMessage(`${panels.find(p=>p.id===item?.i)?.title} placed.`);};
  useEffect(()=>{
    if (!active) return;
    const cancel = () => {
      const saved = snapshot.current;
      if(saved) setLayouts(previous=>({...previous,[saved.cols]:saved.layout}));
      snapshot.current=null;setActive(null);setInteractionEpoch(n=>n+1);setMessage("Panel change cancelled.");
    };
    const onKey = (e:KeyboardEvent)=>{if(e.key === "Escape"){e.preventDefault();cancel();}};
    if(snapshot.current?.cols !== cols) {cancel();return;}
    window.addEventListener("keydown",onKey);window.addEventListener("blur",cancel);
    return()=>{window.removeEventListener("keydown",onKey);window.removeEventListener("blur",cancel);};
  },[active,cols]);
  const reset = ()=>{commit(initialLayout(cols));setMessage('Default layout restored for this screen size.');};
  return <main className={`panel-workspace ${active ? 'is-interacting' : ''}`} style={{'--panel-gap':`${PANEL_GAP}px`} as React.CSSProperties}>
    <div className="workspace-toolbar">
      <p id="panel-help">Make yourself at home. {touch ? "Drag a card’s grip to move it." : "Drag a card to move it."} Pull an edge to resize.</p>
      <div className="workspace-actions"><CommandPalette destinations={panels} onReset={reset} disabled={!!active} /><button type="button" onClick={reset}>Reset layout</button></div>
    </div>
    <div ref={node=>{(containerRef as React.MutableRefObject<HTMLDivElement|null>).current=node;}}>
      {mounted && ready && <GridLayout key={interactionEpoch} width={width} layout={layout} gridConfig={{cols,rowHeight:ROW_HEIGHT,margin:[PANEL_GAP,PANEL_GAP],containerPadding:[0,0]}}
        compactor={verticalCompactor} dragConfig={{bounded:true,threshold:5,handle:touch ? '.panel-grip' : undefined,allowMobileScroll:true,cancel:'a,button:not(.panel-grip),input,textarea,select,label,iframe,canvas,[data-no-drag]'}}
        resizeConfig={{handles:['n','ne','e','se','s','sw','w','nw']}}
        onDragStart={start} onDragStop={stop} onResizeStart={start} onResizeStop={stop}>
        {panels.map(({id,title,component:Card})=><div key={id} className="workspace-panel" data-panel={id} tabIndex={-1} aria-label={`${title} panel`}>
          <div className="panel-surface">
            {["intro","timeline","contact"].includes(id) && <div className="panel-backdrop" aria-hidden="true">{id === "contact" ? <AuroraBackdrop /> : <GridBackgroundDemo />}</div>}
            <div className="panel-corner"><button type="button" className="panel-grip" aria-label={`Move or resize ${title}`} aria-describedby="panel-help" title="Drag to move. Arrow keys move; Shift + arrows resize." onKeyDown={e=>{
              const directions:Record<string,[number,number]>={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
              if(directions[e.key]){e.preventDefault();const [dx,dy]=directions[e.key];commit(movePanel(layout,id,dx,dy,e.shiftKey,cols));setMessage(`${title} ${e.shiftKey?'resized':'moved'}.`);}
            }}>⠿</button></div>
            <div className="panel-content"><div className="panel-inner" data-content={id}><PanelBody Card={Card} title={title} /></div></div>
          </div>
        </div>)}
      </GridLayout>}
    </div>
    <p className="sr-only" role="status" aria-live="polite">{message}</p>
  </main>;
}
