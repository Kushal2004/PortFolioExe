import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { setTheme, useTheme } from '../utils/theme';
import projects from '../data/projects.json';

type Destination = { id:string; title:string };
type Command = { id:string; title:string; detail:string; group:string; keywords?:string; run?:()=>void; href?:string };
const normalize = (text:string) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const isTyping = (target:EventTarget|null) => target instanceof HTMLElement && (
  target.isContentEditable || !!target.closest('input, textarea, select, [role="textbox"], [role="combobox"]')
);

export default function CommandPalette({ destinations, onReset, disabled=false }:{destinations:Destination[];onReset:()=>void;disabled?:boolean}) {
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState('');
  const [selected,setSelected] = useState(0);
  const [mounted,setMounted] = useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const input=useRef<HTMLInputElement>(null);
  const list=useRef<HTMLDivElement>(null);
  const id=useId();
  const dark=useTheme();
  const close=()=>setOpen(false);
  const show=()=>{if(!disabled){setQuery('');setSelected(0);setOpen(true);}};

  useEffect(()=>setMounted(true),[]);
  useEffect(()=>{
    const shortcut=(event:KeyboardEvent)=>{
      if(event.isComposing || event.repeat || disabled) return;
      const commandK=(event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase()==='k';
      const slash=event.key==='/' && !event.ctrlKey && !event.metaKey && !event.altKey && !isTyping(event.target);
      if(commandK || slash){event.preventDefault();if(open) close();else show();}
    };
    window.addEventListener('keydown',shortcut);
    return()=>window.removeEventListener('keydown',shortcut);
  },[open,disabled]);

  useEffect(()=>{
    const element=dialog.current;
    if(!mounted || !element) return;
    if(!open){if(element.open) element.close();return;}
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    element.showModal();
    input.current?.focus();
    return()=>{
      if(element.open) element.close();
      document.body.style.overflow=previousOverflow;
      if(previous?.isConnected) previous.focus({preventScroll:true});
    };
  },[open,mounted]);

  const jump=(panelId:string)=>{
    const panel=document.querySelector<HTMLElement>(`[data-panel="${panelId}"]`);
    if(!panel) return;
    const target=panelId==='contact'?panel.querySelector<HTMLElement>('input'):panel;
    target?.focus({preventScroll:true});
    panel.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    panel.classList.remove('command-target');
    requestAnimationFrame(()=>panel.classList.add('command-target'));
    setTimeout(()=>panel.classList.remove('command-target'),1600);
  };
  const commands=useMemo<Command[]>(()=>[
    {id:'contact',title:'Get in touch',detail:'Jump to the contact form',group:'Actions',keywords:'contact email message hire freelance',run:()=>jump('contact')},
    {id:'theme',title:`Switch to ${dark?'light':'dark'} mode`,detail:'Change the site appearance',group:'Actions',keywords:'theme appearance sun moon toggle',run:()=>setTheme(!dark)},
    {id:'reset',title:'Reset layout',detail:'Restore the default arrangement for this screen',group:'Actions',keywords:'panels cards default arrange reset',run:onReset},
    {id:'resume',title:'Open résumé',detail:'View Kushal’s résumé · PDF',group:'Actions',keywords:'cv resume download',href:'/asserts/SDE.pdf'},
    {id:'blog-link',title:'Open blog & projects',detail:'kushal-blog.vercel.app',group:'Links',keywords:'articles publications writing',href:'https://kushal-blog.vercel.app/'},
    ...destinations.filter(d=>!['contact','theme'].includes(d.id)).map(d=>({id:`panel-${d.id}`,title:`Go to ${d.title}`,detail:'Find this card in your layout',group:'Cards',keywords:d.id,run:()=>jump(d.id)})),
    ...projects.map(p=>({id:`project-${p.name}`,title:p.name.replace(/[_-]/g,' '),detail:p.description || `${p.language || 'Source code'} · GitHub repository`,group:'Projects',keywords:`${p.name} ${p.language} project repository github`,href:p.url})),
  ],[dark,onReset,destinations]);
  const results=useMemo(()=>{
    const terms=normalize(query).trim().split(/\s+/).filter(Boolean);
    return commands.filter(command=>terms.every(term=>normalize(`${command.title} ${command.detail} ${command.group} ${command.keywords||''}`).includes(term)));
  },[query,commands]);
  const active=Math.min(selected,Math.max(0,results.length-1));
  useEffect(()=>{if(open) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({block:'nearest'});},[active,open,query]);
  const execute=(command:Command)=>{
    close();
    if(command.href) window.open(command.href,'_blank','noopener,noreferrer');
    else requestAnimationFrame(()=>command.run?.());
  };

  return <>
    <button type="button" className="command-trigger" onClick={show} disabled={disabled} aria-label="Open command palette" aria-haspopup="dialog" aria-expanded={open}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
      <span>Search & commands</span><kbd>/</kbd>
    </button>
    {mounted && createPortal(<dialog ref={dialog} className="command-dialog" aria-labelledby={`${id}-title`} onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===event.currentTarget) close();}}>
      <div className="command-shell" onClick={event=>event.stopPropagation()}>
        <h2 id={`${id}-title`} className="sr-only">Search projects and commands</h2>
        <div className="command-search">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
          <input ref={input} value={query} onChange={event=>{setQuery(event.target.value);setSelected(0);}} autoComplete="off" spellCheck={false} placeholder="Search projects, cards, or commands…" aria-label="Search projects and commands" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls={`${id}-results`} aria-activedescendant={results.length?`${id}-option-${active}`:undefined} onKeyDown={event=>{
            if(event.nativeEvent.isComposing) return;
            if(event.key==='ArrowDown'){event.preventDefault();setSelected((active+1)%Math.max(results.length,1));}
            if(event.key==='ArrowUp'){event.preventDefault();setSelected((active-1+results.length)%Math.max(results.length,1));}
            if(event.key==='Enter' && results[active]){event.preventDefault();execute(results[active]);}
          }}/>
          <button type="button" onClick={close} aria-label="Close command palette"><kbd>Esc</kbd></button>
        </div>
        <div ref={list} className="command-results" id={`${id}-results`} role="listbox" aria-label="Search results">
          {results.map((command,index)=><React.Fragment key={command.id}>
            {(index===0 || results[index-1].group!==command.group) && <div className="command-group" role="presentation">{command.group}</div>}
            <button type="button" role="option" id={`${id}-option-${index}`} data-index={index} tabIndex={-1} aria-selected={index===active} className="command-option" onMouseMove={()=>setSelected(index)} onMouseDown={event=>event.preventDefault()} onClick={()=>execute(command)}>
              <span className="command-option-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">{command.href?<path d="M7 17 17 7M7 7h10v10"/>:<path d="M5 8h9a4 4 0 0 1 0 8H7m3-3-3 3 3 3"/>}</svg></span>
              <span className="command-option-text"><span>{command.title}</span><small>{command.detail}</small></span>
              <span className="command-enter" aria-hidden="true">↵</span>
            </button>
          </React.Fragment>)}
        </div>
        <p className="sr-only" role="status">{results.length} {results.length===1?"result":"results"} available.</p>
        {!results.length && <div className="command-empty" role="status">No results for “{query}”. Try “contact”, “theme”, or a project name.</div>}
        <div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> select</span><span>Ctrl / ⌘ K to open</span></div>
      </div>
    </dialog>,document.body)}
  </>;
}
