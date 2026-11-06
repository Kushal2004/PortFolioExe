import React from 'react';
import { IconMail, IconBrandGithub, IconBrandBehance, IconBrandThreads, IconBrandLinkedin, IconBrandOnlyfans, IconBrandX, IconBrandFacebook } from '@tabler/icons-react';
const socials = [
  {name:'Email', icon:IconMail, href:'mailto:send2kushal@gmail.com'},
  {name:'GitHub', icon:IconBrandGithub, href:'https://github.com/Kushal2004'},
  {name:'Behance', icon:IconBrandBehance},
  {name:'Threads', icon:IconBrandThreads},
  {name:'LinkedIn', icon:IconBrandLinkedin, href:'https://www.linkedin.com/in/k-kushal/'},
  {name:'OnlyFans', icon:IconBrandOnlyfans},
  {name:'X', icon:IconBrandX},
  {name:'Facebook', icon:IconBrandFacebook},
];
export default function SocialMediaLinksCard() {
  return <section className="social-card ring-1 dark:ring-white/10 ring-primary/5 rounded-3xl shadow-xl dark:shadow-thick bg-white dark:bg-secondary" aria-label="Find me on">
    <h2>Find<br />me on</h2>
    <div className="social-icons">{socials.map(({name,icon:Icon,href}) => {
      const icon = <Icon size={26} stroke={.85} aria-hidden="true" />;
      return href ? <a key={name} href={href} aria-label={name} title={name}>{icon}</a> : <button key={name} type="button" aria-label={`${name} (profile coming soon)`} title={`${name}: profile coming soon`} aria-disabled="true">{icon}</button>;
    })}</div>
  </section>;
}
