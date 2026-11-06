import { verticalCompactor, type Layout, type LayoutItem } from 'react-grid-layout';
export const PANEL_GAP = 16;
export const ROW_HEIGHT = 24;
export const STORAGE_KEY = 'portfolio-panels-v1';
export const panelIds = ['intro','social','theme','contact','resume','blog','timeline','skills','github','globe','dino'] as const;
export type PanelId = typeof panelIds[number];
export function minimumPanelRows(id:string) {return id === 'contact' ? 12 : id === 'dino' ? 6 : 8;}
export type PanelLayouts = Record<string, Layout>;
export function initialLayout(cols: number): Layout {
  const desktop = [[0,0,6,10],[6,0,3,9],[9,0,3,9],[0,10,6,19],[6,10,3,9],[9,10,3,9],[6,19,3,24],[9,19,3,10],[0,35,6,10],[9,29,3,10],[0,29,6,6]];
  const tablet = [[0,9,6,10],[0,0,3,9],[3,0,3,9],[0,19,6,19],[0,43,3,9],[3,43,3,9],[0,52,3,24],[3,52,3,10],[3,62,3,10],[3,72,3,10],[0,76,3,6]];
  const heights = [12,9,9,22,9,10,22,11,11,10,6];
  let y = 0;
  return panelIds.map((i, index) => {
    const [x, top, w, h] = cols === 1 ? [0,y,1,heights[index]] : (cols === 12 ? desktop : tablet)[index];
    y += h;
    return {i,x,y:top,w,h,minW:cols === 1 ? 1 : 3,maxW:cols,minH:minimumPanelRows(i),maxH:40};
  }).sort((a,b) => cols === 1 ? (a.i === 'theme' ? -1 : b.i === 'theme' ? 1 : 0) : 0).map((item,index,items) => cols === 1 ? {...item,y:items.slice(0,index).reduce((sum,p)=>sum+p.h,0)} : item);
}
// Ignore malformed storage and re-apply constraints before allowing it into the engine.
export function restoreLayout(value: unknown, cols: number): Layout {
  const defaults = initialLayout(cols);
  if (!Array.isArray(value) || ![defaults.length,defaults.length-1].includes(value.length)) return defaults;
  const seen = new Set<string>();
  const result = defaults.map(base => {
    const p = value.find(v => v && v.i === base.i);
    if (!p || seen.has(p.i) || !['x','y','w','h'].every(k => Number.isInteger(p[k]) && p[k] >= 0)) return base;
    seen.add(p.i);
    const w = Math.min(cols, Math.max(base.minW!, p.w));
    const h = Math.min(base.maxH!, Math.max(base.minH!, p.h));
    return {...base, w, h, x:Math.min(cols-w,p.x), y:Math.min(500,p.y)};
  });
  return verticalCompactor.compact(result, cols);
}
export function movePanel(layout: Layout, id: string, dx: number, dy: number, resize: boolean, cols: number): Layout {
  const item = layout.find(p=>p.i === id)!;
  const changed: LayoutItem = resize ? {...item,w:Math.min(cols-item.x,Math.max(item.minW!,item.w+dx)),h:Math.min(item.maxH!,Math.max(item.minH!,item.h+dy))} : {...item,x:Math.min(cols-item.w,Math.max(0,item.x+dx)),y:Math.max(0,item.y+dy)};
  // Prioritize the moved panel; compact others around it without overlap.
  const fixed = {...changed,static:true};
  return verticalCompactor.compact([fixed,...layout.filter(p=>p.i!==id)],cols).map(p=>p.i===id ? {...p,static:false} : p);
}
