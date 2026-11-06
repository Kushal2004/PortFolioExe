import React from 'react';
export default function DinoGame() {
  return <section className="dino-widget" aria-label="Chrome dinosaur game">
    <iframe src="/dino/index.html" title="Chrome dinosaur runner — Space or Up to jump, Down to duck" className="dino-frame" loading="lazy" />
    <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">Click or tap to play · Space to jump · ↓ to duck</p>
  </section>;
}
