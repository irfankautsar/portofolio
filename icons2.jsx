/* Lucide-style stroke icons — minimal set for v2 */
function Icon({ name, size = 16, stroke = 1.6, style }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  const I = {
    'arrow-right':   <svg {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    'arrow-up-right':<svg {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
    'arrow-down':    <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
    'plus':          <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    'close':         <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    'menu':          <svg {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    'mail':          <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>,
    'pin':           <svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    'briefcase':     <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    'graduation':    <svg {...p}><path d="M22 10L12 4 2 10l10 6 10-6z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>,
    'users':         <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    'message':       <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    'sparkles':      <svg {...p}><path d="M12 3l1.6 4.8L18 9.5l-4.4 1.7L12 16l-1.6-4.8L6 9.5l4.4-1.7z"/><path d="M19 14l.7 2.1 2 .7-2 .7L19 19.6l-.7-2.1-2-.7 2-.7z"/></svg>,
    'star':          <svg {...p}><polygon points="12 2 15.1 8.6 22 9.6 17 14.5 18.2 21.5 12 18.2 5.8 21.5 7 14.5 2 9.6 8.9 8.6"/></svg>,
    'shield':        <svg {...p}><path d="M12 2l8 4v6c0 5-3.5 8.7-8 10-4.5-1.3-8-5-8-10V6z"/></svg>,
    'target':        <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>,
    'calendar':      <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>,
    'clock':         <svg {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>,
    'camera':        <svg {...p}><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/></svg>,
    'eye':           <svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>,
    'doc':           <svg {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/></svg>,
    'megaphone':     <svg {...p}><path d="M3 11v2l11 5V6z"/><path d="M16 8a3 3 0 0 1 0 8"/></svg>,
    'check':         <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    'download':      <svg {...p}><path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><line x1="4" y1="21" x2="20" y2="21"/></svg>,
    'play':          <svg {...p}><polygon points="6 4 20 12 6 20 6 4" fill="currentColor"/></svg>,
    'pause':         <svg {...p}><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>,
    'lightning':     <svg {...p}><polygon points="13 2 4 14 12 14 11 22 20 10 12 10 13 2"/></svg>,
    'linkedin':      <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="10" x2="8" y2="17"/><circle cx="8" cy="7" r="1" fill="currentColor" stroke="none"/><path d="M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>,
    'whatsapp':      <svg {...p}><path d="M3 21l1.6-5A8.5 8.5 0 1 1 8 19.4z"/><path d="M8.5 9.5c.5 2 2 3.5 4 4l1-1c.3-.3.7-.4 1-.2l1.5.7c.4.2.5.6.4 1l-.3 1c-.2.5-.8.8-1.4.7-3-.4-5.5-2.9-5.9-5.9-.1-.6.2-1.2.7-1.4l1-.3c.4-.1.8 0 1 .4l.7 1.5c.2.3.1.7-.2 1z"/></svg>,
    'feather':       <svg {...p}><path d="M20 4c2 6-3 12-9 14l-3 3-1-1 3-3c2-6 8-11 14-9-3 2-5 5-5 8 0 2-1 4-3 5l-4-2"/></svg>,
    'compass':       <svg {...p}><circle cx="12" cy="12" r="9"/><polygon points="16.2 7.8 13.4 13.4 7.8 16.2 10.6 10.6 16.2 7.8"/></svg>,
    'quote':         <svg {...p}><path d="M7 7c-2 0-3 2-3 4v6h6v-6H7c0-2 1-3 3-3zM17 7c-2 0-3 2-3 4v6h6v-6h-3c0-2 1-3 3-3z" fill="currentColor" stroke="none"/></svg>,
    'sun':           <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
    'moon':          <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>,
  };
  return I[name] || null;
}
window.Icon2 = Icon;
