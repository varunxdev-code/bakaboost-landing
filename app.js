/* BakaBoost prototype — single-file site with hash routing. All state is in memory. */
const IMG = { hero: "assets/hero.jpg", av1: "assets/av1.jpg", av2: "assets/av2.jpg", post1: "assets/post1.jpg" };

/* ---------- Icons (stroke SVG, 24 grid) ---------- */
const I = {
  cat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9 5 4l4 3h6l4-3 1 5c1 5-2 11-8 11S3 14 4 9Z"/><circle class="eye" cx="9.5" cy="12" r=".9" fill="currentColor"/><circle class="eye" cx="14.5" cy="12" r=".9" fill="currentColor"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v8h14v-8M12 8v12M12 8c-2-4-6-3-6-1s3 1 6 1zm0 0c2-4 6-3 6-1s-3 1-6 1z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4L19 7"/></svg>',
  verified: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 2.1 3.1-.5 1 3 2.9 1.3-.6 3.1L22 13.5l-2.2 2.3.3 3.1-3.1.8-1.6 2.7L12 21.3l-3.4 1.1-1.6-2.7-3.1-.8.3-3.1L2 13.5l1.2-2.5-.6-3.1L5.5 6.6l1-3 3.1.5z"/><path d="M8.5 12.2l2.3 2.3 4.7-4.7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4z"/></svg>',
  cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l2-8h14l2 8v6H3z"/><path d="M3 13h5l1.5 3h5L16 13h5"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10-10-4-4L4 16z"/><path d="M12.5 7.5l4 4"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeoff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M10 5.3A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 3.9M6.6 6.6C3.8 8.6 2 12 2 12s4 7 10 7c1.6 0 3-.4 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-4 9 4-9 4z"/><path d="M3 8v8l9 4 9-4V8M12 12v8"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  mask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8c0-1 8-3 8-3s8 2 8 3v5c0 4-4 7-8 8-4-1-8-4-8-8z"/><path d="M8 12c1-1 2-1 3 0M13 12c1-1 2-1 3 0M9 16c2 1 4 1 6 0"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 15A8 8 0 0 1 9 4a8 8 0 1 0 11 11z"/></svg>',
  repost: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V6h11M20 12v6H9"/><path d="M12 3l3 3-3 3M12 15l-3 3 3 3"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></svg>',
  shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4l4 2 4-2 5 4-3 3-1-1v10H7V10l-1 1-3-3z"/></svg>',
  cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h11v7a5 5 0 0 1-10 0z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2M4 21h13"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11h6M9 15h4"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
  brush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4l-9 9M7 21c-2 0-4-2-4-4 2 0 3-1 4-3 1 1 3 1 4 3-1 2-2 4-4 4z"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h13l-3-3M20 17H7l3 3"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-2 0-3 2-1 3-1 4 0 4-3a9 9 0 0 0-9-9z"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="7" r="1" fill="currentColor"/><circle cx="16" cy="10" r="1" fill="currentColor"/></svg>',
  crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 8l5 4 4-7 4 7 5-4-2 11H5z"/><path d="M5 21h14"/></svg>',
  medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="6"/><path d="M8.5 9L6 3h4l2 4 2-4h4l-2.5 6"/><path d="M12 11l1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 13.3l2-.3z"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c-4 0-7-3-7-7 0-3 2-5 3-7 0 2 1 3 2 3 0-4 2-7 5-9 0 3 1 5 3 7s3 4 3 6c0 4-3 7-7 7z"/></svg>',
  seedling: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12M12 12c0-5 3-8 8-8 0 5-3 8-8 8zM12 15c0-4-2-6-6-6 0 4 2 6 6 6z"/></svg>',
  hands: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V6a2 2 0 0 1 4 0v5M11 10V5a2 2 0 0 1 4 0v6M15 11V7a2 2 0 0 1 4 0v7a7 7 0 0 1-14 0v-3a2 2 0 0 1 4 0"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chevdown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-7 7"/></svg>',
  sticker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8l-6 6H6a2 2 0 0 1-2-2z"/><path d="M14 20v-6h6"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  yen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4l5 8 5-8M12 12v8M8 14h8M8 17h8"/></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 6l4-1 3 15-4 1z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6"/></svg>',
  unlock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4h3l7 4V6l-7 4z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
};
const ITEM_ICON = { headset: I.headset, pen: I.pen, camera: I.camera, shirt: I.shirt, cup: I.cup, book: I.book, box: I.box, sparkle: I.sparkle };

/* ---------- Sample data (example accounts, not real people) ---------- */
const TINTS = ["linear-gradient(135deg,#fde4ee,#fbd3e3)", "linear-gradient(135deg,#f1ecff,#e3dbfb)", "linear-gradient(135deg,#fdeaf1,#f5d9ea)", "linear-gradient(135deg,#e6f5ee,#d6eee2)", "linear-gradient(135deg,#fff0e6,#fddcc9)", "linear-gradient(135deg,#fbe7f1,#eedcf7)"];
const creators = [
  { handle: "lunaaoki", name: "Luna Aoki", tagline: "Illustrator & Streamer", theme: { accent: "pink" }, links: ["twitch.tv/lunaaoki", "x.com/lunaaoki"], verified: true, avatar: IMG.av1, tint: 0, cats: ["Art", "Streaming"], bio: "Artist & streamer. Making cute things and chasing big dreams. Wishlist is mostly studio upgrades — every gift shows up on stream ♡", followers: 12400, gifts: 318, location: "Tokyo",
    wishlist: [
      { id: "w1", title: "Wacom Cintiq 16 pen display", store: "Wacom", price: 649, icon: "pen", why: "My old tablet's screen is starting to flicker mid-stream.", raised: 410, contrib: true },
      { id: "w2", title: "Ring light 18\" with stand", store: "Amazon", price: 74, icon: "camera", why: "The pink-hour lighting on stream is all from one desk lamp." },
      { id: "w3", title: "Copic Sketch 72-set", store: "Copic", price: 289, icon: "pen", why: "For the traditional art nights I keep promising.", raised: 289, done: true },
      { id: "w4", title: "Plush cat headphone stand", store: "Etsy", price: 32, icon: "cup", why: "It matches the setup. That's the whole reason." },
      { id: "w5", title: "Sennheiser HD 560S", store: "Sweetwater", price: 199, icon: "headset", why: "Mixing stream audio on gaming cans is not it." },
      { id: "w6", title: "Oversized pink knit cardigan", store: "Uniqlo", price: 49, icon: "shirt", why: "Streaming room gets cold in winter." },
    ],
    goal: { title: "New art setup", target: 1200, raised: 985, desc: "Pen display, proper lighting, and headphones that aren't gaming cans.", unlock: "Night Drop wallpaper set for everyone who chipped in" },
    shop: [
      { id: "s1", title: "Coquette Phone Portrait", kind: "Wallpaper · PNG", price: 8.99, icon: "image", img: IMG.hero },
      { id: "s2", title: "Sticker Pack Vol.1", kind: "12 stickers · PNG", price: 4.99, icon: "sticker", img: IMG.post1 },
      { id: "s3", title: "Desktop Wallpaper Set", kind: "4K · 6 files", price: 7.99, icon: "monitor", img: IMG.hero },
      { id: "s4", title: "After Dark Set", kind: "18+ · PNG", price: 12, icon: "image", adult: true, img: IMG.av1 },
      { id: "s5", title: "Brush Pack: Soft Inks", kind: "Procreate", price: 6, icon: "brush", img: IMG.post1 },
      { id: "s6", title: "Process Video: OC Redesign", kind: "MP4 · 42 min", price: 5, icon: "camera", img: IMG.hero },
    ],
    commissions: { open: true, slots: 5, taken: 3, from: 45, deposit: 50, turnaround: "2–3 weeks", tiers: ["Bust · $45", "Half body · $80", "Full body · $140"] },
    members: [
      { id: "tier-coffee", name: "Coffee club", price: 3, perks: ["Supporter badge", "Name on the thank-you wall"], live: true },
      { id: "tier-inner", name: "Inner circle", price: 8, perks: ["Early posts", "Monthly wallpaper drop"], live: true },
      { id: "tier-studio", name: "Studio lounge", price: 18, perks: ["Custom domain look", "Collab seats", "Priority relay"], live: false, premium: true },
    ],
    boosts: [{ from: "Mika", amount: 15, msg: "Keep creating!", when: "1h" }, { from: "Anonymous", amount: 5, msg: "for coffee ♡", when: "4h" }, { from: "pixel_rin", amount: 25, msg: "for the new setup", when: "1d" }],
    posts: [
      { text: "new setup ♡ what do you think?", img: IMG.post1, likes: 1200, comments: 84, reposts: 32, when: "2h", tag: "IRL" },
      { text: "Warm-up sketches from tonight's stream. Thank you for keeping me company!", img: IMG.hero, likes: 860, comments: 41, reposts: 12, when: "1d", tag: "Art" },
      { text: "Sticker pack vol.1 is live in the shop — instant download, 0% platform cut.", img: IMG.post1, likes: 540, comments: 29, reposts: 18, when: "3d", tag: "Shop" },
    ],
    gallery: [IMG.hero, IMG.post1, IMG.av1, IMG.hero, IMG.post1, IMG.av2],
  },
  { handle: "nekochii", name: "NekoChii", tagline: "Cosplayer", theme: { accent: "violet" }, links: ["instagram.com/nekochii"], verified: true, avatar: IMG.av2, tint: 1, cats: ["Cosplay", "IRL"], bio: "Cosplayer, hoodie collector, chronic con-goer. Wishlist = next build materials.", followers: 8900, gifts: 204, location: "Osaka",
    wishlist: [
      { id: "n1", title: "Worbla thermoplastic 2-pack", store: "Cosplay Supplies", price: 58, icon: "box", why: "Armor pieces for the winter con build." },
      { id: "n2", title: "Heat gun, variable temp", store: "Amazon", price: 39, icon: "sparkle", why: "Borrowing my roommate's is getting awkward." },
      { id: "n3", title: "Pink oversized hoodie (M)", store: "Uniqlo", price: 45, icon: "shirt", why: "Pink hoodie season is a lifestyle." },
    ],
    posts: [{ text: "pink hoodie season ♡", likes: 640, comments: 22, reposts: 8, when: "5h", tag: "Cosplay" }],
  },
  { handle: "mikachu", name: "Mika", tagline: "Bedroom pop", theme: { accent: "peach" }, links: ["youtube.com/@mikachu"], verified: true, avatar: IMG.av1, tint: 2, cats: ["Music"], bio: "Bedroom pop and lo-fi covers. Trying to build a tiny studio one gift at a time.", followers: 5100, gifts: 96, location: "Seoul",
    wishlist: [
      { id: "m1", title: "Audio-Technica AT2020 mic", store: "Sweetwater", price: 99, icon: "headset", why: "Recording on a headset mic right now." },
      { id: "m2", title: "Focusrite Scarlett Solo", store: "Sweetwater", price: 129, icon: "box", why: "To actually plug the mic into something." },
    ],
    posts: [{ text: "cover of a song you all requested is up tonight ♡", likes: 410, comments: 37, reposts: 15, when: "3h", tag: "Music" }],
  },
  { handle: "reinyan", name: "Rei", tagline: "Cozy games streamer", theme: { accent: "mint" }, links: ["twitch.tv/reinyan"], verified: false, avatar: IMG.av2, tint: 3, cats: ["Games", "Streaming"], bio: "Cozy games, chaotic commentary. Wishlist helps me keep streaming on a student budget.", followers: 3300, gifts: 58, location: "Berlin",
    wishlist: [
      { id: "r1", title: "Capture card, 1080p60", store: "Elgato", price: 119, icon: "box", why: "Console streams at 30fps are hurting my soul." },
      { id: "r2", title: "Matcha latte set", store: "Ippodo", price: 38, icon: "cup", why: "Stream fuel." },
    ],
    posts: [{ text: "8-hour cozy farming stream tomorrow. bring snacks.", likes: 210, comments: 19, reposts: 4, when: "6h", tag: "Games" }],
  },
  { handle: "yumisroom", name: "yumi", tagline: "Writer", theme: { accent: "violet" }, links: ["yumisroom.substack.com"], verified: false, avatar: IMG.av1, tint: 4, cats: ["Writing", "Self care"], bio: "Writes soft fiction and journaling prompts. Gifts go toward printing the zine.", followers: 2100, gifts: 40, location: "Vancouver",
    wishlist: [
      { id: "y1", title: "Zine print run, 100 copies", store: "Mixam", price: 240, icon: "book", why: "Issue 3 is written. It just needs to exist.", raised: 96, contrib: true },
      { id: "y2", title: "Hobonichi Techo 2027", store: "Hobonichi", price: 42, icon: "book", why: "The planner that keeps the writing going." },
    ],
    goal: { title: "Print issue 3", target: 400, raised: 96, desc: "100 copies of the zine, plus mailers.", unlock: "Digital issue 3 for every contributor" },
    boosts: [{ from: "Anonymous", amount: 10, msg: "issue 2 made me cry too", when: "2d" }],
    posts: [{ text: "issue 3 draft done. crying a little.", likes: 180, comments: 24, reposts: 6, when: "1d", tag: "Writing" }],
  },
  { handle: "soradraws", name: "Sora", tagline: "Fan art & OCs", theme: { accent: "pink" }, links: ["x.com/soradraws", "ko-fi.com/soradraws"], verified: true, avatar: IMG.av2, tint: 5, cats: ["Art", "Anime"], bio: "Fan art and original characters. Commissions open. Every gifted brush pack gets a thank-you doodle.", followers: 15800, gifts: 502, location: "Manila",
    wishlist: [
      { id: "s1", title: "Procreate brush bundle", store: "Gumroad", price: 24, icon: "pen", why: "Trying textured inks for the next series." },
      { id: "s2", title: "iPad Pro 11\" (2026)", store: "Apple", price: 999, icon: "pen", why: "Current one is from 2019 and it's tired.", raised: 615, contrib: true },
      { id: "s3", title: "Desk mat, pastel pink XL", store: "Etsy", price: 29, icon: "box", why: "Aesthetic. No further questions." },
    ],
    goal: { title: "iPad upgrade", target: 999, raised: 615, desc: "Same as the wish — this is just the pooled version.", unlock: "Timelapse of the first piece drawn on it" },
    shop: [
      { id: "so1", title: "OC Redesign Print", kind: "A4 · PNG", price: 9, icon: "image" },
      { id: "so2", title: "Chibi Sticker Set", kind: "8 stickers", price: 4, icon: "sticker" },
    ],
    commissions: { open: false, slots: 4, taken: 4, from: 60, deposit: 50, turnaround: "4 weeks", tiers: ["Bust · $60", "Half body · $110", "Full body · $190"] },
    boosts: [{ from: "pixel_rin", amount: 20, msg: "for the OC redesign!!", when: "6h" }],
    posts: [{ text: "new art piece! ♡ OC redesign finally done", likes: 1100, comments: 46, reposts: 28, when: "1d", tag: "Art" }],
  },
];
const ACCENTS = { pink: { a: "#e9498b", d: "#d43679", soft: "#fde9f0" }, violet: { a: "#6f55e3", d: "#5a41cc", soft: "#efebff" }, mint: { a: "#2f9a70", d: "#237a58", soft: "#e3f4ec" }, peach: { a: "#e8743b", d: "#c85c28", soft: "#fdece2" } };
const CATS = ["All", "Art", "Cosplay", "Games", "Music", "Streaming", "Writing", "Anime", "IRL", "Self care"];

/* The signed-in creator's dashboard uses Luna's account as the example. */
const state = {
  user: { name: "Luna Aoki", handle: "lunaaoki", role: "creator", avatar: IMG.av1 },
  following: new Set(["nekochii", "soradraws"]),
  liked: new Set(),
  gifts: [
    { id: "g1", from: "kindstranger", anon: true, item: "Ring light 18\" with stand", amount: 74, msg: "For the pink-hour lighting. Keep streaming ♡", when: "Today", status: "Shipped", thanked: false },
    { id: "g2", from: "moon_moth", anon: false, item: "Wacom Cintiq 16 (contribution)", amount: 60, msg: "Toward the tablet! Can't wait to see it on stream.", when: "Yesterday", status: "Contribution", thanked: false },
    { id: "g3", from: "Anonymous", anon: true, item: "Copic Sketch 72-set", amount: 289, msg: "", when: "3 days ago", status: "Delivered", thanked: true },
    { id: "g4", from: "pixel_rin", anon: false, item: "Wacom Cintiq 16 (contribution)", amount: 100, msg: "The stream is my favorite part of the week.", when: "4 days ago", status: "Contribution", thanked: true },
    { id: "g5", from: "Anonymous", anon: true, item: "Oversized pink knit cardigan", amount: 49, msg: "Stay warm!!", when: "Last week", status: "Delivered", thanked: true },
  ],
  thanks: [
    { gift: "Copic Sketch 72-set", text: "The Copics arrived!! Traditional art night is officially happening Friday. Thank you, mystery person ♡", when: "2 days ago" },
  ],
  settings: { showNsfw: false, publicWishlist: true, relay: true },
  wishVisibility: {},
};
state.role = "creator";
state.supporter = { name: "misa", handle: "misaluvr", avatar: IMG.av2, bio: "Sends ring lights to people who make me smile.", anonDefault: true,
  saved: new Set(["w1", "s2", "n3"]),
  sent: [
    { to: "lunaaoki", kind: "gift", item: "Ring light 18\" with stand", amount: 74, anon: true, msg: "For the pink-hour lighting. Keep streaming ♡", when: "Today", step: 1, thanked: false },
    { to: "soradraws", kind: "boost", item: "Boost", amount: 20, anon: false, msg: "for the OC redesign!!", when: "6h ago", step: 2, thanked: true },
    { to: "yumisroom", kind: "contribution", item: "Zine print run, 100 copies", amount: 25, anon: true, msg: "issue 2 made me cry", when: "2 days ago", step: 0, thanked: false },
    { to: "nekochii", kind: "gift", item: "Pink oversized hoodie (M)", amount: 45, anon: false, msg: "pink hoodie season is real", when: "Last week", step: 2, thanked: true },
    { to: "lunaaoki", kind: "shop", item: "Sticker Pack Vol.1", amount: 4.99, anon: false, msg: "", when: "Last week", step: 1, thanked: false },
  ] };
state.supporter.shoutout = true;
const FEE_RATE = 0.029, FEE_FIXED = 0.30; // payment processing only — 0% platform cut
const procFee = (amt) => Math.round((amt * FEE_RATE + FEE_FIXED) * 100) / 100;


/* ---------- Badges ---------- */
const TIER = { bronze: { c: "#b8733a", bg: "#fbe9dc", line: "#e9c3a4", label: "bronze" }, silver: { c: "#6f7a8c", bg: "#eceff4", line: "#c5ccd8", label: "silver" }, gold: { c: "#c9931a", bg: "#fff3cf", line: "#ecd27f", label: "gold" }, pink: { c: "#e0407d", bg: "#ffe1ec", line: "#f7b6cd", label: "special" }, violet: { c: "#7c5cf6", bg: "#ece8ff", line: "#c9bdf5", label: "community" } };
const CREATOR_BADGES = [
  { id: "verified", name: "Verified", tier: "pink", icon: "verified", desc: "Identity confirmed by BakaBoost.", test: (c) => [c.verified ? 1 : 0, 1] },
  { id: "first-wish", name: "First wish", tier: "bronze", icon: "sparkle", desc: "Added a wish to your list.", test: (c) => [Math.min(c.wishlist.length, 1), 1] },
  { id: "unboxed-10", name: "Unboxed ×10", tier: "silver", icon: "box", desc: "Received 10 gifts.", test: (c) => [Math.min(c.gifts, 10), 10] },
  { id: "unboxed-100", name: "Unboxed ×100", tier: "gold", icon: "box", desc: "Received 100 gifts.", test: (c) => [Math.min(c.gifts, 100), 100] },
  { id: "goal-reached", name: "Goal reached", tier: "violet", icon: "target", desc: "A community goal was fully funded.", test: (c) => [c.goal ? Math.min(c.goal.raised, c.goal.target) : 0, c.goal ? c.goal.target : 1] },
  { id: "grateful", name: "Grateful", tier: "pink", icon: "heart", desc: "Posted 5 thank-yous.", test: (c) => [Math.min((c.handle === state.user.handle ? state.thanks.length + state.gifts.filter((g) => g.thanked).length : Math.round(c.gifts / 3)), 5), 5] },
  { id: "on-fire", name: "On fire", tier: "gold", icon: "flame", desc: "Gifts received 4 weeks in a row.", test: (c) => [c.gifts > 200 ? 4 : c.gifts > 80 ? 3 : 1, 4] },
  { id: "community", name: "Community", tier: "silver", icon: "hands", desc: "10,000 supporters.", test: (c) => [Math.min(c.followers, 10000), 10000] },
  { id: "og", name: "Early creator", tier: "gold", icon: "crown", desc: "Joined in the first year.", test: (c) => [c.verified ? 1 : 0, 1] },
];
const SUPPORTER_BADGES = [
  { id: "first-gift", name: "First gift", tier: "bronze", icon: "gift", desc: "Sent your first gift.", test: (s) => [Math.min(s.sent.filter((x) => x.kind === "gift").length, 1), 1] },
  { id: "generous", name: "Generous", tier: "silver", icon: "gift", desc: "Sent 5 gifts.", test: (s) => [Math.min(s.sent.filter((x) => x.kind === "gift").length, 5), 5] },
  { id: "patron", name: "Patron", tier: "gold", icon: "crown", desc: "Sent 25 gifts.", test: (s) => [Math.min(s.sent.filter((x) => x.kind === "gift").length, 25), 25] },
  { id: "boost-buddy", name: "Boost buddy", tier: "violet", icon: "zap", desc: "Sent 3 boosts.", test: (s) => [Math.min(s.sent.filter((x) => x.kind === "boost").length, 3), 3] },
  { id: "goal-hero", name: "Goal hero", tier: "violet", icon: "target", desc: "Chipped in on a community goal.", test: (s) => [Math.min(s.sent.filter((x) => x.kind === "contribution" || /^Goal:/.test(x.item)).length, 1), 1] },
  { id: "kind-note", name: "Kind note", tier: "pink", icon: "chat", desc: "Wrote a note with 3 gifts.", test: (s) => [Math.min(s.sent.filter((x) => x.msg).length, 3), 3] },
  { id: "angel", name: "Anonymous angel", tier: "pink", icon: "mask", desc: "Sent 3 anonymous gifts.", test: (s) => [Math.min(s.sent.filter((x) => x.anon).length, 3), 3] },
  { id: "regular", name: "Regular", tier: "silver", icon: "seedling", desc: "Supported the same creator 3 times.", test: (s) => { const m = {}; s.sent.forEach((x) => (m[x.to] = (m[x.to] || 0) + 1)); return [Math.min(Math.max(0, ...Object.values(m)), 3), 3]; } },
  { id: "early", name: "Early supporter", tier: "gold", icon: "medal", desc: "Joined in the first year.", test: () => [1, 1] },
];
function badgeState(defs, subject) { return defs.map((b) => { const [n, of] = b.test(subject); return { ...b, n, of, earned: n >= of }; }); }
function badgeIcon(b, size = "") { const t = TIER[b.tier]; return `<span class="bdg badge-tip ${size} ${b.earned ? "" : "locked"}" data-tip="${esc(b.name)}${b.earned ? "" : " · " + b.n + "/" + b.of}" style="--bdg:${t.c};--bdg-bg:${t.bg};--bdg-line:${t.line}">${I[b.icon] || I.star}</span>`; }
function badgeRow(list, opts = {}) { const shown = opts.all ? list : list.filter((b) => b.earned); return `<div class="badge-row">${shown.map((b) => badgeIcon(b, opts.size || "")).join("")}${opts.more && list.some((b) => !b.earned) && !opts.all ? `<a href="${opts.more}" class="muted" style="font-size:13px;font-weight:700;margin-left:4px">+${list.filter((b) => !b.earned).length} to earn</a>` : ""}</div>`; }
function badgeGrid(list) { return `<div class="badge-grid">${list.map((b) => { const t = TIER[b.tier], pct = Math.round((b.n / b.of) * 100); return `<div class="badge-card ${b.earned ? "" : "locked"}" style="--bdg:${t.c};--bdg-bg:${t.bg};--bdg-line:${t.line}">${badgeIcon(b, "lg")}<div class="info"><b>${esc(b.name)}<span class="tier">${t.label}</span></b><small>${esc(b.desc)}</small>${b.earned ? `<small style="color:${t.c};font-weight:700">Earned</small>` : `<div class="progress"><i style="width:${pct}%"></i></div><small>${b.of > 1 ? `${b.n.toLocaleString()} / ${b.of.toLocaleString()}` : "Not yet"}</small>`}</div></div>`; }).join("")}</div>`; }
function supporterBadgesFor(handle) { if (handle === state.supporter.handle || handle === "you") return badgeState(SUPPORTER_BADGES, state.supporter).filter((b) => b.earned).slice(0, 3); const seed = handle.length; return badgeState(SUPPORTER_BADGES, state.supporter).filter((b, i) => (i + seed) % 3 === 0).slice(0, 2).map((b) => ({ ...b, earned: true })); }

/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const money = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
const k = (n) => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K" : String(n);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const findCreator = (h) => creators.find((c) => c.handle === h);
const go = (path) => { location.hash = "#" + path; };
let toastTimer;
function toast(msg) { let t = $("#toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); } t.textContent = msg; t.classList.remove("hidden"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.add("hidden"), 2400); }
function thumbStyle(tint) { return `background:${TINTS[tint % TINTS.length]}`; }
function setTheme(t) { document.documentElement.setAttribute("data-theme", t || "light"); try { localStorage.setItem("bb-theme", t || ""); } catch (e) {} }
function currentTheme() { const s = document.documentElement.getAttribute("data-theme"); if (s) return s; return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
function themeBtn() { return `<button class="theme-btn" data-act="theme" title="Switch theme">${currentTheme() === "dark" ? I.sun : I.moon}</button>`; }

/* ---------- Shared chrome ---------- */
function marketingNav(active) {
  const links = [["explore", "Explore creators"], ["how", "How it works"], ["pricing", "Pricing"], ["safety", "Safety"]];
  return `<div class="navbar"><div class="wrap"><nav class="topnav">
    <a class="brand" href="#/">${I.cat}<span>Baka<span class="bb">Boost</span></span></a>
    <div class="links">${links.map(([r, l]) => `<a href="#/${r}" class="${active === r ? "active" : ""}">${l}</a>`).join("")}</div>
    <div class="actions">${themeBtn()}<a class="btn btn-text" href="#/login">Log in</a><a class="btn btn-primary" href="#/signup">Join free</a><button class="menu-btn" data-act="menu" aria-label="Menu">${I.menu}</button></div>
  </nav></div></div>
  <div class="drawer" id="drawer"><div class="bg" data-act="menu-close"></div><div class="panel"><button class="close" data-act="menu-close">${I.x}</button>${links.map(([r, l], i) => `<a href="#/${r}" style="animation-delay:${.1 + i * .06}s" data-act="menu-close">${l}</a>`).join("")}<a href="#/login" style="animation-delay:.4s" data-act="menu-close">Log in</a><a class="btn btn-primary" href="#/signup" style="animation-delay:.46s" data-act="menu-close">Join free</a><button class="btn btn-ghost" data-act="theme" style="justify-content:center;margin-top:4px">${currentTheme() === "dark" ? I.sun : I.moon}<span>Switch theme</span></button></div></div>`;
}
function footer() {
  return `<div class="wrap"><footer>
    <div class="col"><a class="brand" href="#/">${I.cat}<span>Baka<span class="bb">Boost</span></span></a><span>A safe, cute place for creators to grow their community.</span><div class="social">${I.send}${I.camera}${I.chat}</div></div>
    <div class="cols">
      <div class="col"><b>Product</b><a href="#/explore">Explore creators</a><a href="#/how">How it works</a><a href="#/pricing">Pricing</a><a href="#/how">For creators</a></div>
      <div class="col"><b>Trust</b><a href="#/safety">Safety &amp; privacy</a><a href="#/safety">Community rules</a><a href="#/safety">FAQ</a></div>
      <div class="col"><b>Account</b><a href="#/signup">Create a wishlist</a><a href="#/login">Log in</a><a href="#/dashboard">Creator dashboard</a></div>
    </div>
  </footer></div>`;
}
function marketingPage(active, body) { return `<div class="page">${marketingNav(active)}${body}${footer()}</div>`; }

function appShell(active, body) {
  const creatorNav = [["feed", "Home", I.home], ["explore", "Explore", I.search], ["dashboard", "Dashboard", I.grid], ["dashboard/page", "My page", I.palette], ["dashboard/wishlist", "My wishlist", I.list], ["dashboard/gifts", "Gifts", I.inbox, state.gifts.filter((g) => !g.thanked).length], ["dashboard/thanks", "Thank-yous", I.heart], ["dashboard/badges", "Badges", I.medal], ["dashboard/settings", "Settings", I.cog]];
  const supporterNav = [["feed", "Home", I.home], ["explore", "Explore", I.search], ["account", "My account", I.user], ["account/gifts", "Gifts I've sent", I.gift, state.supporter.sent.filter((s) => s.step < 2).length], ["account/following", "Following", I.heart], ["account/saved", "Saved wishes", I.bookmark], ["account/library", "Library", I.library], ["account/badges", "Badges", I.medal], ["account/settings", "Settings", I.cog]];
  const sup = state.role === "supporter"; const nav = sup ? supporterNav : creatorNav;
  const me = sup ? state.supporter : state.user;
  return `<div class="page app">
    <aside class="side">
      <div><a class="brand" href="#/">${I.cat}<span>Baka<span class="bb">Boost</span></span></a>
        <div class="nav">${nav.map(([r, l, ic, cnt]) => `<a href="#/${r}" class="${active === r ? "on" : ""}">${ic}<span>${l}</span>${cnt ? `<span class="cnt">${cnt}</span>` : ""}</a>`).join("")}</div>
      </div>
      <div class="bottom">
        <div style="display:flex;gap:8px;align-items:center">${sup ? `<a class="btn btn-violet" style="flex:1" href="#/explore">${I.gift}<span>Send a gift</span></a>` : `<button class="btn btn-primary" style="flex:1" data-act="add-wish">${I.plus}<span>Add wish</span></button>`}${themeBtn()}</div>
        <button class="btn btn-text btn-sm" style="justify-content:flex-start;gap:8px" data-act="switch-role">${I.swap}<span>Switch to ${sup ? "creator" : "supporter"} view</span></button>
        <a class="me" href="#/${sup ? "account" : "creator/" + state.user.handle}"><img class="avatar" src="${me.avatar}" alt=""><div><b>${esc(me.name)}</b><small>@${me.handle}</small></div></a>
      </div>
    </aside>
    <main class="main">${body}</main>
    ${sup ? `<a class="mobile-fab violet" href="#/explore" aria-label="Send a gift">${I.gift}</a>` : `<button class="mobile-fab" data-act="add-wish" aria-label="Add wish">${I.plus}</button>`}
  </div>`;
}

/* ---------- Pages: marketing ---------- */
let testiTab = "Artists";
const TESTI = {
  Artists: { q: "BakaBoost lets my community support the art they love — shop, gifts, and commissions — without giving up my privacy.", who: "Luna Aoki", role: "VTuber & illustrator", av: IMG.av1 },
  VTubers: { q: "Six viewers funded the capture card together. Unboxing it live was the best stream of the year.", who: "Rei", role: "Cozy games VTuber", av: IMG.av2 },
  Illustrators: { q: "Commission deposits land the day I accept the brief. No invoices, no chasing, no cut.", who: "Sora", role: "Fan art & OCs", av: IMG.av2 },
  Cosplayers: { q: "People gift the build materials, then get to see the finished cosplay. It closes the loop.", who: "NekoChii", role: "Cosplayer", av: IMG.av2 },
};
function petals() { const pts = [[3,8],[7,36],[2,64],[10,84],[92,6],[96,30],[90,58],[97,80],[30,2],[70,3]]; return `<div class="petals">${pts.map(([x,y],i) => `<i style="left:${x}%;top:${y}%;animation-delay:${-i * 0.9}s;transform:rotate(${i * 37}deg)"></i>`).join("")}</div>`; }
function envelopeArt() {
  return `<svg viewBox="0 0 320 300" fill="none" stroke-linejoin="round"><defs><linearGradient id="hp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb3d1"/><stop offset="1" stop-color="#ff6fa3"/></linearGradient></defs>
    <path d="M48 128l112 78 112-78v130H48z" fill="#f1ecff" stroke="#c9bdf5" stroke-width="3"/><path d="M48 128l112-70 112 70-112 78z" fill="#e4dcff" stroke="#c9bdf5" stroke-width="3"/>
    <path d="M160 206L48 258V128z" fill="#ece6ff" stroke="#c9bdf5" stroke-width="3"/><path d="M160 206l112 52V128z" fill="#ece6ff" stroke="#c9bdf5" stroke-width="3"/>
    <path d="M132 168c-16-16-8-44 16-40 10 2 14 10 14 10s4-8 14-10c24-4 32 24 16 40l-30 30z" fill="url(#hp)" stroke="#e0407d" stroke-width="2"/>
    <path d="M196 116c-12-12-6-33 12-30 8 1 10 8 10 8s3-7 10-8c18-3 24 18 12 30l-22 22z" fill="url(#hp)" stroke="#e0407d" stroke-width="2"/>
    <path d="M200 222c-6-6-3-16 6-15 4 1 5 4 5 4s1-3 5-4c9-1 12 9 6 15l-11 11z" fill="#c9bdf5"/>
    <path d="M88 84l3 8 8 3-8 3-3 8-3-8-8-3 8-3zM258 82l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffd0e2"/></svg>`;
}
function bloomArt() {
  return `<svg class="bloom" viewBox="0 0 200 200" fill="none"><g transform="translate(100 100)">${[0,72,144,216,288].map((a) => `<path d="M0 0c-28-30-30-70 0-80 30 10 28 50 0 80z" fill="#ffb3d1" stroke="#ff8db7" stroke-width="1.5" transform="rotate(${a})"/>`).join("")}<circle r="12" fill="#ffe1ec"/><circle r="4" fill="#e0407d"/></g></svg>`;
}
function pageHome() {
  const t = TESTI[testiTab];
  const star = `<span class="stars">${I.star.repeat(5)}</span>`;
  const feat = (ic, bg, col, title, txt) => `<div class="feat spot" style="--fc:${col}"><div class="ic" style="background:${bg};color:${col}">${ic}</div><b>${title}</b><p>${txt}</p></div>`;
  return marketingPage("", `
  <div class="wrap">
    <section class="hero5"><div class="mesh"></div>${petals()}<div class="wrap">
      <span class="pill"><span class="dot"></span>Free for creators · 0% platform cut</span>
      <h1>${["Share", "your", "passion,"].map((w, i) => `<span class="w" style="animation-delay:${.1 + i * .08}s">${w}</span>`).join(" ")}<br><span class="em">${["earn", "their", "hearts."].map((w, i) => `<span class="w" style="animation-delay:${.34 + i * .08}s">${w}</span>`).join(" ")}</span></h1>
      <p class="lede">Shop, commissions, wishlist &amp; gifts — built for anime artists, VTubers &amp; illustrators. <b>Stay private. Keep every yen.</b></p>
      <div class="hero-ctas"><a class="btn btn-primary btn-lg" href="#/creator/lunaaoki">See a creator page</a><a class="btn btn-ghost btn-lg" href="#/how">How it works</a></div>
      <div class="split">
        <div class="pane spot"><div class="txt"><span class="badge" style="align-self:flex-start">★ For creators</span><h2>Create your page</h2><p>Open a shop, wishlist &amp; commission slots. Fans boost you — you keep 100%.</p></div><a class="btn btn-primary" href="#/signup"><span>Start your page</span>${I.arrow}</a><div class="art"><img src="${IMG.hero}" alt=""></div></div>
        <div class="pane spot"><div class="txt"><span class="badge violet" style="align-self:flex-start">♥ For supporters</span><h2>Support a creator</h2><p>Send an anonymous boost, gift a wish, or buy digital art — private &amp; secure.</p></div><a class="btn btn-violet" href="#/explore"><span>Explore creators</span>${I.arrow}</a><div class="art">${envelopeArt()}</div></div>
      </div>
      <div class="under"><div class="popular"><span>Popular creators</span><div class="avs">${creators.slice(0, 5).map((c) => `<a href="#/creator/${c.handle}" title="${esc(c.name)}"><img class="avatar" src="${c.avatar}" alt=""></a>`).join("")}</div></div><span class="beta"><span class="dot"></span>Open beta · first creators onboarding now</span></div>
      <div class="trust">
        <div>${I.lock}<div><b>Address stays private</b><span>You stay in control.</span></div></div>
        <div>${I.shield}<div><b>Secure checkout</b><span>Your data is protected.</span></div></div>
        <div>${I.mask}<div><b>Anonymous gifting</b><span>Gifts without a name attached.</span></div></div>
      </div>
    </div></section>
    <div class="platforms"><span class="eyebrow">Built for creators on every platform</span><div class="marquee"><div class="row track">${[1, 2].map(() => ["Twitch", "YouTube", "TikTok", "X", "Instagram", "Discord", "Kick", "Bluesky", "Patreon", "Threads", "Pixiv", "Booth"].map((p) => `<span>${p}</span>`).join("")).join("")}</div></div></div>
  </div>

  <section class="section" data-hue="pink"><div class="wrap">
    <div class="section-head center"><span class="eyebrow">Why BakaBoost</span><h2>Built for the scene, not a tip jar</h2><p>Wishlist sites stop at the Amazon link. Creators here sell, get commissioned, and keep all of it.</p></div>
    <div class="why">
      <div class="why-lead rv scale"><div><div class="zero">0%<small>platform cut</small></div></div><p>Gifts, shop sales and commission deposits are yours. Only card processing, shown before anyone pays.</p><div class="vs"><span><s>Wishlist sites: take a cut</s></span><span>BakaBoost: keep every yen</span></div></div>
      <div class="why-grid">
        ${[[I.bag, "var(--accent)", "Digital shop + commissions", "Stickers, wallpapers, prints, brush packs — fans buy, not just gift.", "Wishlist sites: physical items only"],
           [I.lock, "var(--accent)", "Locked 18+ &amp; paid unlocks", "Exclusive drops, photosets, supporter packs — gated properly, in-grid.", "Wishlist sites: can't gate adult digital"],
           [I.pen, "var(--violet)", "Commission slots with deposits", "Brief → slot → 50% deposit → delivery. Fans become clients.", "Wishlist sites: no commissions"],
           [I.unlock, "var(--violet)", "Goals tied to unlocks", "Hit the goal and everyone who chipped in gets the drop. Community unlocks, not fake SKUs.", "Wishlist sites: crowdfund only"],
           [I.bolt, "var(--accent)", "Instant digital delivery", "Purchases land in the supporter's library in seconds. No shipping anxiety.", "Wishlist sites: weeks in transit"],
           [I.palette, "var(--violet)", "Creator Studio perks", "Custom domain, seasonal banners, collab seats — a home page, not a list.", "Wishlist sites: one template"],
           [I.trophy, "#c9931a", "Supporter roles &amp; badges", "Monthly badges, Explore spotlight, top booster this week. Status beats a random haul.", "Wishlist sites: anonymous receipts"],
           [I.megaphone, "var(--accent)", "Anonymous + named modes", "Fans choose: shoutout on stream, or a silent gift. Both first-class.", "Wishlist sites: anonymous by default"]].map(([ic, col, t, d, vs], i) => `<div class="why-card rv d${(i % 4) + 1}" style="--fc:${col}"><div class="ic">${ic}</div><b>${t}</b><p>${d}</p><span class="vsline">${vs} · <b>here: yes</b></span></div>`).join("")}
      </div>
    </div>
    <table class="compare-table rv"><thead><tr><th>What creators get</th><th>Wishlist-only sites</th><th>BakaBoost</th></tr></thead><tbody>
      <tr><td>Cut taken from gifts</td><td class="cut">a percentage</td><td>0%</td></tr>
      <tr><td>Digital shop &amp; instant delivery</td><td>—</td><td>✓</td></tr>
      <tr><td>Commissions with deposits</td><td>—</td><td>✓</td></tr>
      <tr><td>Gated 18+ digital goods</td><td>—</td><td>✓</td></tr>
      <tr><td>Goals with community unlocks</td><td>crowdfund only</td><td>✓</td></tr>
      <tr><td>Supporter badges &amp; spotlight</td><td>—</td><td>✓</td></tr>
      <tr><td>Private relay address</td><td>✓</td><td>✓</td></tr>
      <tr><td>Anonymous or named gifting</td><td>anonymous-leaning</td><td>fan's choice</td></tr>
    </tbody></table>
    <div class="cta-mid"><a class="btn btn-ghost" href="#/explore">See pages creators are building ${I.arrow.replace("<svg", '<svg style="width:16px;height:16px"')}</a></div>
  </div></section>

  <section class="section full band-lav" data-hue="lav"><div class="wrap">
    <div class="section-head center"><span class="eyebrow" style="color:var(--violet);background:var(--violet-soft)">How it works</span><h2>From wish to <span class="grad">wonderful.</span></h2><p>Three soft steps. Live in minutes. Keep every yen.</p></div>
    <div class="steps scrub-line"><svg class="steps-line" viewBox="0 0 1000 2" preserveAspectRatio="none"><line x1="0" y1="1" x2="1000" y2="1"></line><line class="draw" x1="0" y1="1" x2="1000" y2="1"></line></svg>
      <div class="step spot"><span class="n">1</span><h3>Create</h3><p>Claim a handle, drop a banner &amp; avatar, list shop + wishlist items and open commission slots.</p></div>
      <div class="step spot"><span class="n">2</span><h3>Share</h3><p>One link in every bio. Explore lists you for discovery, and badges bring regulars back.</p></div>
      <div class="step spot"><span class="n">3</span><h3>Receive</h3><p>Gifts, shop sales &amp; commission deposits — 0% platform cut. Parcels come through your relay, never to your door directly.</p></div>
    </div>
    <div class="cta-mid"><a class="btn btn-primary btn-lg" href="#/signup">Create your wishlist</a><small>It's free for creators ♡</small></div>
  </div></section>

  <section class="section" data-hue="mint"><div class="wrap datalist">
    <div class="from-left"><span class="eyebrow" style="color:var(--violet)">Your data?</span><h2 style="margin:10px 0 14px">Always private, fully secure.</h2><p class="muted scrub" style="max-width:44ch">The whole product exists so a fan can send you something real without either of you giving up anything personal.</p><div style="margin-top:22px"><a class="btn btn-violet" href="#/safety">How we protect you</a></div></div>
    <ul class="from-right">
      <li>${I.lock}<span><b>Address protected.</b> Stores ship to your relay; we forward to you. Supporters see a timeline, never a street.</span></li>
      <li>${I.shield}<span><b>Safe gifting.</b> Notes are screened. Decline anything, block anyone — and their gifts stop too.</span></li>
      <li>${I.mask}<span><b>Nothing shared between parties.</b> Creators never see a supporter's card; supporters never see a creator's address.</span></li>
      <li>${I.heart}<span><b>Real support.</b> Creators keep 100% of gifts and boosts. Supporters cover the small fee.</span></li>
    </ul>
  </div></section>

  <section class="section full dark" data-hue="plum"><div class="aurora" data-px="-0.1"></div><div class="stars-bg">${Array.from({ length: 26 }, (_, i) => `<i style="left:${(i * 37) % 100}%;top:${(i * 53) % 100}%;animation-delay:${-(i % 7) * .45}s"></i>`).join("")}</div><div class="wrap">
    <div class="section-head center"><span class="eyebrow" style="background:rgba(255,255,255,.08)">Features</span><h2>Why creators love BakaBoost</h2><p class="scrub">Everything a wishlist site does, plus a shop and commissions — with a kinder tip jar and a page that looks like you.</p></div>
    <div class="features">
      ${feat(I.bag, "var(--blush)", "var(--accent)", "Digital shop", "Wallpapers, stickers, brush packs, process videos — instant download, 0% cut.")}
      ${feat(I.pen, "var(--violet-soft)", "var(--violet)", "Commissions", "Slots, briefs and 50% deposits. The rest on delivery.")}
      ${feat(I.link, "var(--blush)", "var(--accent)", "Any store", "Paste a link from Amazon, Etsy, Wacom, wherever. We fetch the title and price.")}
      ${feat(I.target, "var(--violet-soft)", "var(--violet)", "Goals &amp; contributions", "Expensive wish? Let the whole community chip in until it's funded.")}
      ${feat(I.zap, "var(--violet-soft)", "var(--violet)", "Boosts", "A few dollars and a note, no shipping. The tip jar, but kinder.")}
      ${feat(I.chat, "var(--blush)", "var(--accent)", "Gift &amp; thank-you messages", "Supporters write a note; you answer with a thank-you post they get notified about.")}
      ${feat(I.mask, "var(--blush)", "var(--accent)", "Anonymous gifting", "Supporters choose signed or anonymous. You can require signed if you prefer.")}
      ${feat(I.medal, "#fff3cf", "#e9b23a", "Badges", "Regulars earn badges that show next to their name in your inbox — and you earn yours.")}
      ${feat(I.truck, "var(--blush)", "var(--accent)", "Relay shipping", "Everything ships to us first. You get parcels; nobody gets your address.")}
    </div>
  </div></section>

  <section class="section" data-hue="peach"><div class="wrap">
    <div class="section-head center"><h2>Add gifts from <span class="grad">any store</span></h2><p>All you need is a link. No partner program, no approved list — if it ships, it can be a wish.</p></div>
    <div class="marquee rev" style="margin-top:22px"><div class="stores track" style="margin-top:0">${[1, 2].map(() => ["Amazon", "Etsy", "Wacom", "Uniqlo", "Sweetwater", "Gumroad", "Apple", "Hobonichi", "Copic", "Elgato", "Ippodo", "Mixam"].map((s) => `<span>${s}</span>`).join("")).join("")}</div></div>
  </div></section>

  <section class="section" data-hue="lav"><div class="wrap storefront">
    <div class="from-left"><span class="eyebrow" style="color:var(--violet);background:var(--violet-soft)">Your storefront</span><h2 style="margin-top:10px">A page that feels like you</h2><p class="muted" style="margin-top:12px">Soft pastels, dreamy banners, and a shop that works like a real one — with commissions and a wishlist beside it.</p>
      <ul>
        <li><div class="ic">${I.bag}</div><span>Digital shop with locked 18+ cards in-grid</span></li>
        <li><div class="ic">${I.pen}</div><span>Commission briefs, slots &amp; 50% deposits</span></li>
        <li><div class="ic">${I.gift}</div><span>Gifts &amp; thanks with 0% platform cut</span></li>
        <li><div class="ic">${I.target}</div><span>Goals with community unlocks — hit it, everyone who chipped in gets the drop</span></li>
      </ul>
      <a class="btn btn-violet" href="#/creator/lunaaoki/shop">Preview Luna's page</a></div>
    <div class="mini mask from-right" data-px="-0.05">
      <div class="mb" style="${thumbStyle(0)}"><img src="${IMG.hero}" alt=""></div>
      <div class="mid"><img class="avatar" src="${IMG.av1}" alt=""><div><b>Luna Aoki</b><small>@lunaaoki</small></div><span class="btn btn-ghost btn-sm" style="margin-left:auto">Follow</span></div>
      <div class="mtabs"><span>Home</span><span class="on">Shop</span><span>Wishlist</span><span>Goals</span><span>Thanks</span></div>
      <div class="goal"><b>New art setup</b><div class="progress"><i style="width:82%"></i></div><span class="muted">82% · unlocks Night Drop</span></div>
      <div class="shopgrid">${creators[0].shop.slice(0, 3).map((s) => `<div><div class="th" style="${thumbStyle(0)}">${I[s.icon] || I.image}</div><b>${esc(s.title)}</b><span>${money(s.price)}</span></div>`).join("")}<div><div class="th" style="${thumbStyle(0)}">${I.image}</div><b>After Dark Set</b><span>$12</span><div class="lock">${I.lock}18+ · locked</div></div><div><div class="th" style="${thumbStyle(0)}">${I.brush}</div><b>Brush Pack: Soft Inks</b><span>$6</span></div><div><div class="th" style="${thumbStyle(0)}">${I.camera}</div><b>Process Video</b><span>$5</span></div></div>
    </div>
  </div></section>

  <section class="section" data-hue="peach"><div class="wrap">
    <div class="values">
      <div class="value rv"><span class="big">0%</span><b>platform cut</b><p>Gifts, shop sales and commission deposits stay yours. Only card processing fees.</p></div>
      <div class="value rv d1"><span class="big">Free</span><b>forever</b><p>Core tools free for every creator. No trial cliff, no surprise paywall.</p></div>
      <div class="value rv d2"><span class="big">✿</span><b>Anime-first</b><p>Soft pastels, locked 18+ cards, commissions &amp; wishlist tabs — built for this scene.</p></div>
    </div>
  </div></section>

  <section class="section full band-pink" data-hue="pink"><div class="wrap testimonial">
    <span class="eyebrow" style="color:var(--violet)">Loved by creators</span>
    <img class="avatar" src="${t.av}" alt="">
    <p class="q">${esc(t.q)}</p>
    <div class="who"><b>— ${esc(t.who)}</b><small>${esc(t.role)}</small></div>
    <div class="ttabs">${Object.keys(TESTI).map((k) => `<button class="${k === testiTab ? "on" : ""}" data-testi="${k}">${k}</button>`).join("")}</div>
  </div></section>

  <section class="section" data-hue="lav"><div class="wrap"><div class="studio">
    <div class="from-left"><span class="eyebrow" style="color:var(--violet);background:color-mix(in srgb,var(--surface) 70%,transparent)">Studio</span><h2 style="margin-top:10px">Level up for <span class="price">$12</span><span class="muted" style="font-size:16px">/mo</span></h2><p class="muted" style="margin-top:10px;max-width:44ch">Custom domain, seasonal banners, and collab seats — for creators ready to look like a studio. The free tier never loses features.</p>
      <ul><li>${I.check}<span>Custom domain (you.studio)</span></li><li>${I.check}<span>Seasonal banner themes</span></li><li>${I.check}<span>Collab seats for shared shops</span></li><li>${I.check}<span>Priority relay forwarding</span></li></ul>
      <div style="display:flex;gap:12px;margin-top:22px;flex-wrap:wrap"><a class="btn btn-violet" href="#/pricing">See Free vs Studio</a><a class="btn btn-ghost" href="#/signup">Start free</a></div></div>
    <div class="compare from-right"><div class="row"><b></b><span style="display:flex;gap:28px"><b>Free</b><b style="color:var(--violet)">Studio</b></span></div>${[["Shop, wishlist, goals, boosts", "y", "y"], ["0% cut on gifts & shop", "y", "y"], ["Commissions with deposits", "y", "y"], ["Relay address", "y", "y"], ["Custom domain", "n", "y"], ["Seasonal banner themes", "n", "y"], ["Collab seats", "n", "y"]].map(([l, a, b]) => `<div class="row"><span>${l}</span><span style="display:flex;gap:44px"><span class="${a}">${a === "y" ? "✓" : "—"}</span><span class="${b}">${b === "y" ? "✓" : "—"}</span></span></div>`).join("")}</div>
  </div></div></section>

  <section class="section" data-hue="white"><div class="wrap">
    <div class="section-head center" style="margin-bottom:28px"><span class="eyebrow" style="color:var(--violet);background:var(--violet-soft)">FAQ</span></div>
    <div class="faq2">
      <details><summary>Is BakaBoost really free for creators?</summary><div class="a">Yes. Shop, wishlist, goals, boosts, commissions and the relay address are free forever. Studio is an optional $12/mo for custom domains, seasonal themes and collab seats.</div></details>
      <details><summary>How is this different from a wishlist site?</summary><div class="a">A wishlist is one tab. You also get a digital shop, commission slots with deposits, pooled goals, and boosts — all on one page, all private.</div></details>
      <details><summary>Do you take a cut of commissions or gifts?</summary><div class="a">No. 0% platform cut on gifts, shop sales and commission deposits. Only card processing (2.9% + 30¢) is deducted, and it's shown before anyone pays.</div></details>
      <details><summary>Can I sell 18+ digital goods?</summary><div class="a">Yes, within our content rules. Adult items show as locked cards in your grid and only unlock for signed-in adults who opt in.</div></details>
      <details><summary>Is my address private?</summary><div class="a">Always. Stores ship to your BakaBoost relay and we forward to you. Supporters see a timeline, never a street — not even a city.</div></details>
    </div>
    <div style="text-align:center;margin-top:16px"><a href="#/safety" style="font-weight:700">More on safety &amp; privacy</a></div>
  </div></section>

  <section class="section"><div class="wrap"><div class="plum"><div><h2>Your community is ready to cheer you on.</h2><p style="color:#cbbfd8;margin-top:10px;max-width:40ch">Anime creators keep 100% of gifts, shop sales and commissions here. Open beta — claim your handle early.</p><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px"><a class="btn btn-primary" href="#/signup">Create your free page</a><a class="btn btn-ghost" style="background:transparent;color:var(--plum-ink);border-color:rgba(255,255,255,.25)" href="#/explore">Browse Explore</a></div></div><div class="glow"></div><div data-px="0.08" style="position:absolute;right:0;top:0;bottom:0;width:300px">${bloomArt()}</div></div></div></section>
  `);
}

function creatorCard(c) {
  return `<a class="ccard tilt" href="#/creator/${c.handle}">
    <div class="banner" style="${thumbStyle(c.tint)}"></div>
    <div class="body">
      <div class="row"><img class="avatar" src="${c.avatar}" width="64" height="64" alt=""><span class="meta">${c.wishlist.filter((w) => !w.done).length} open wishes</span></div>
      <div><b style="display:flex;align-items:center;gap:6px">${esc(c.name)}${c.verified ? `<span style="width:16px;height:16px;color:var(--accent);display:inline-flex">${I.verified}</span>` : ""}</b><span class="meta">@${c.handle} · ${k(c.followers)} supporters</span></div>
      <p class="meta" style="color:var(--ink-2)">${esc(c.bio.split(".")[0])}.</p>
      <div class="row"><div class="tags">${c.cats.map((t) => `<span class="tag">${t}</span>`).join("")}</div>${badgeRow(badgeState(CREATOR_BADGES, c).filter((b) => b.earned).slice(0, 3), { size: "sm" })}</div>
    </div></a>`;
}

function pageHow() {
  return marketingPage("how", `<div class="wrap">
    <section class="section" style="padding-top:40px"><div class="section-head"><span class="eyebrow">How it works</span><h1 style="font-size:clamp(36px,5vw,58px)">Gifting, with the address taken out of it</h1><p>BakaBoost sits between the store and your front door. Here is what happens on both sides.</p></div>
    <div class="tabs" id="how-tabs"><button class="on" data-how="creator">For creators</button><button data-how="supporter">For supporters</button></div>
    <div id="how-body">${howCreator()}</div>
    </section>
    <section class="section"><div class="cta-band"><div><h2>Ready when you are.</h2><p class="muted" style="margin-top:8px">Set up a wishlist in two minutes, share one link everywhere.</p></div><a class="btn btn-primary btn-lg" href="#/signup">Create your wishlist</a></div></section>
  </div>`);
}
function howCreator() {
  return `<div class="steps">
    <div class="step spot"><span class="n">1</span><h3>Claim your page</h3><p>Pick a handle, add a bio and a banner. Your page lives at bakaboost.app/you — put it in every bio you have.</p></div>
    <div class="step"><span class="n">2</span><h3>Add wishes from any store</h3><p>Paste a product link. We fetch the name and price. Write a line about why it matters — it's the thing supporters read.</p></div>
    <div class="step"><span class="n">3</span><h3>Get a relay address</h3><p>Stores ship to your BakaBoost relay. We forward to you, and the label a supporter sees never has your street on it.</p></div>
    <div class="step"><span class="n">4</span><h3>Big items get funded together</h3><p>Mark a wish as "contribute" and supporters can chip in any amount. When it's funded, we order it.</p></div>
    <div class="step"><span class="n">5</span><h3>Say thanks</h3><p>Every gift lands in your inbox with the supporter's note. Reply with a thank-you post; it shows on your page and in their feed.</p></div>
    <div class="step"><span class="n">6</span><h3>Stay in control</h3><p>Hide wishes, pause the whole list, block a supporter. Anything you don't want, you don't get.</p></div>
  </div>`;
}
function howSupporter() {
  return `<div class="steps">
    <div class="step spot"><span class="n">1</span><h3>Find a creator</h3><p>Browse by interest or follow the link in their bio. Every page shows open wishes and what's already been gifted.</p></div>
    <div class="step"><span class="n">2</span><h3>Pick a wish</h3><p>Buy the whole thing, or contribute toward something bigger. Add a note — it's the part creators screenshot.</p></div>
    <div class="step"><span class="n">3</span><h3>Choose how you appear</h3><p>Sign with your handle or gift anonymously. Either way, you never see where it's going, and they never see your card.</p></div>
    <div class="step"><span class="n">4</span><h3>Follow the box</h3><p>Ordered, shipped, delivered — you get a timeline. When they post a thank-you, you get a notification.</p></div>
  </div>`;
}

function pagePricing() {
  return marketingPage("pricing", `<div class="wrap">
    <section class="section" style="padding-top:40px"><div class="section-head"><span class="eyebrow">Pricing</span><h1 style="font-size:clamp(36px,5vw,58px)">Free forever. 0% platform cut.</h1><p>Gifts, shop sales and commission deposits are yours. Only card processing is deducted, and it's shown before anyone pays. Studio is optional polish.</p></div>
    <div class="plans">
      <div class="plan featured"><div><span class="eyebrow">Free</span><div class="price">$0<small> /month</small></div></div>
        <ul><li>${I.check}<span>Digital shop with instant downloads</span></li><li>${I.check}<span>Commission slots with 50% deposits</span></li><li>${I.check}<span>Wishlist from any store + funding goals</span></li><li>${I.check}<span>Boosts, badges, thank-you posts</span></li><li>${I.check}<span>Relay address and forwarding</span></li><li>${I.check}<span>0% platform cut, always</span></li></ul>
        <a class="btn btn-primary btn-block" href="#/signup">Create your free page</a></div>
      <div class="plan"><div><span class="eyebrow" style="color:var(--violet)">Studio</span><div class="price">$12<small> /month</small></div></div>
        <ul><li>${I.check}<span>Everything in Free</span></li><li>${I.check}<span>Custom domain (you.studio)</span></li><li>${I.check}<span>Seasonal banner themes</span></li><li>${I.check}<span>Collab seats for shared shops</span></li><li>${I.check}<span>Priority relay forwarding</span></li></ul>
        <a class="btn btn-violet btn-block" href="#/signup">Start Studio</a></div>
    </div>
    <div class="narrow" style="margin:56px 0 0; max-width:560px; width:100%">
      <h3 style="font-family:var(--sans);font-weight:700;font-size:18px;margin-bottom:6px">What a $74 gift actually costs</h3>
      <table class="fee-table"><tr><th>Line</th><th>Amount</th></tr><tr><td>Ring light 18" with stand</td><td>$74.00</td></tr><tr><td>Shipping to relay</td><td>$0.00</td></tr><tr><td>Platform cut</td><td>$0.00</td></tr><tr><td>Card processing (2.9% + 30¢)</td><td>$2.45</td></tr><tr><td><b>Supporter pays</b></td><td><b>$76.45</b></td></tr><tr><td>Creator receives</td><td>the ring light</td></tr></table>
      <h3 style="font-family:var(--sans);font-weight:700;font-size:18px;margin:28px 0 6px">And a $9 shop sale</h3>
      <table class="fee-table"><tr><th>Line</th><th>Amount</th></tr><tr><td>OC Redesign Print</td><td>$9.00</td></tr><tr><td>Platform cut</td><td>$0.00</td></tr><tr><td>Card processing</td><td>−$0.56</td></tr><tr><td><b>Creator keeps</b></td><td><b>$8.44</b></td></tr></table>
      <p class="muted" style="font-size:13px;margin-top:12px">Processing rate shown is the prototype's sample; the real rate is whatever the payment processor charges, passed through with no markup.</p>
    </div>
    </section>
  </div>`);
}

function pageSafety() {
  const faqs = [
    ["Do supporters ever see my address?", "No. Stores ship to your BakaBoost relay address. We forward the parcel to you, and the supporter's view shows only a status timeline. Not even a city."],
    ["Can I gift without giving my name?", "Yes. At checkout you choose whether to sign your handle or stay anonymous. Anonymous gifts still carry your note, if you write one."],
    ["What if someone sends something I don't want?", "Every gift goes through your inbox first. Decline it and we return it to the store. You can also block a supporter, which stops their gifts and messages together."],
    ["What can't go on a wishlist?", "Anything that needs a signature or ID at delivery (alcohol, weapons, prescriptions), gift cards or cash equivalents, and anything against the store's own terms. Our community rules have the full list."],
    ["How do contributions work for expensive items?", "Mark a wish as 'contribute together'. Supporters chip in any amount, the progress bar fills, and when it's fully funded we place the order. If you remove the wish, contributors are refunded."],
    ["Are messages moderated?", "Notes attached to gifts are screened automatically before they reach you, and you can report any message. Repeat offenders lose the ability to send notes site-wide."],
    ["Who can see my wishlist?", "By default anyone with your link. You can make it followers-only, hide individual wishes, or pause the whole list while you're away."],
  ];
  return marketingPage("safety", `<div class="wrap">
    <section class="section" style="padding-top:40px"><div class="section-head"><span class="eyebrow">Safety &amp; privacy</span><h1 style="font-size:clamp(36px,5vw,58px)">Built for people who get too many DMs</h1><p>The whole product exists so a fan can send you a real thing without either of you giving up anything personal.</p></div>
    <div class="safety-grid">
      <div class="step"><h3>${I.lock}Relay addresses</h3><p>Parcels ship to us, we ship to you. Your home address is stored encrypted and never shown to a supporter, a store, or in a thank-you post.</p></div>
      <div class="step"><h3>${I.mask}Anonymous by choice</h3><p>Supporters pick anonymous or signed at checkout. Creators can require signed gifts if they prefer.</p></div>
      <div class="step"><h3>${I.shield}Screened messages</h3><p>Notes are checked before delivery. One tap to report, one tap to block — blocking stops gifts too.</p></div>
      <div class="step"><h3>${I.eyeoff}Hide anything</h3><p>Hide a wish, pause your list, or go followers-only. Nothing about your list is public unless you want it to be.</p></div>
    </div>
    <h2 style="margin-bottom:20px">Questions people ask first</h2>
    <div class="faq">${faqs.map(([q, a]) => `<details><summary>${q}</summary><div class="a">${a}</div></details>`).join("")}</div>
    </section>
  </div>`);
}

/* ---------- Explore ---------- */
let exploreCat = "All", exploreQ = "";
function pageExplore(inApp) {
  const list = creators.filter((c) => (exploreCat === "All" || c.cats.includes(exploreCat)) && (!exploreQ || (c.name + c.handle + c.bio).toLowerCase().includes(exploreQ.toLowerCase())));
  const body = `<div class="${inApp ? "" : "wrap"}"><section class="${inApp ? "" : "section"}" style="${inApp ? "" : "padding-top:40px"}">
    <div class="main-head" style="margin-bottom:24px"><div><span class="eyebrow">Explore</span><h2>Creators with open wishes</h2></div>
      <label class="search" style="min-width:280px">${I.search}<input id="explore-q" placeholder="Search creators" value="${esc(exploreQ)}"></label></div>
    <div class="spotlight">${[["pixel_rin", "Top booster this week", "$140 across 4 creators", "gold"], ["moon_moth", "Goal hero", "Funded Luna's art setup", "violet"], ["misaluvr", "Kind note streak", "5 notes in a row", "pink"]].map(([h, t, s, tier], i) => `<div class="spot-card"><span class="rank">${i + 1}</span><span class="avatar" style="display:grid;place-items:center;color:var(--violet);background:var(--violet-soft)">${I.user}</span><div><b>@${h}</b><small>${s}</small></div><span class="badge ${tier === "gold" ? "" : tier === "violet" ? "violet" : ""}" style="${tier === "gold" ? "background:#fff3cf;color:#c9931a" : ""}">${t}</span></div>`).join("")}</div>
    <div class="filters">${CATS.map((c) => `<button class="chip ${c === exploreCat ? "on" : ""}" data-cat="${c}">${c}</button>`).join("")}</div>
    ${list.length ? `<div class="creator-grid">${list.map(creatorCard).join("")}</div>` : `<div class="empty">No creators match that yet. Try another interest.</div>`}
  </section></div>`;
  return inApp ? appShell("explore", body) : marketingPage("explore", body);
}

/* ---------- Creator profile ---------- */
function wishCard(c, w) {
  const raised = w.raised || 0, pct = Math.min(100, Math.round((raised / w.price) * 100));
  return `<div class="wish ${w.done ? "done" : ""}">
    <div class="thumb" style="${thumbStyle(c.tint)}">${ITEM_ICON[w.icon] || I.gift}${w.done ? "" : `<button class="save ${state.supporter.saved.has(w.id) ? "on" : ""}" data-save="${w.id}" title="Save">${I.bookmark}</button>`}</div>
    <div class="t"><b>${esc(w.title)}</b><span class="price">${money(w.price)}</span></div>
    <span class="store">${esc(w.store)}${w.done ? ' · <span class="badge good">Gifted</span>' : w.contrib ? ' · <span class="badge">Contribute together</span>' : ""}</span>
    <p class="why">"${esc(w.why)}"</p>
    ${w.contrib && !w.done ? `<div class="progress"><i style="width:${pct}%"></i></div><div class="pr"><span>${money(raised)} raised</span><span>${money(w.price - raised)} to go</span></div>` : ""}
    ${w.done ? `<button class="btn btn-ghost btn-sm" disabled>Already gifted</button>` : `<a class="btn btn-primary btn-sm" href="#/gift/${c.handle}/${w.id}">${I.gift}<span>${w.contrib ? "Contribute" : "Gift this"}</span></a>`}
  </div>`;
}
function postCard(c, p, i) {
  const key = c.handle + i, liked = state.liked.has(key);
  return `<article class="post">
    <div class="head"><a class="who" href="#/creator/${c.handle}"><img class="avatar" src="${c.avatar}" alt=""><div><b style="display:flex;align-items:center;gap:4px">${esc(c.name)}${c.verified ? `<span style="width:14px;height:14px;color:var(--accent);display:inline-flex">${I.verified}</span>` : ""}</b><small>@${c.handle} · ${p.when}</small></div></a>
      ${c.handle !== state.user.handle ? `<button class="btn btn-ghost btn-sm" data-follow="${c.handle}">${state.following.has(c.handle) ? "Following" : "Follow"}</button>` : ""}</div>
    <p>${esc(p.text)}</p>
    ${p.img ? `<img class="media" src="${p.img}" alt="">` : ""}
    <div class="acts"><button class="${liked ? "liked" : ""}" data-like="${key}"><span>${I.heart}${k(p.likes + (liked ? 1 : 0))}</span></button><span>${I.chat}${p.comments}</span><span>${I.repost}${p.reposts}</span>${p.tag ? `<span class="badge" style="margin-left:auto">${p.tag}</span>` : ""}</div>
  </article>`;
}
function thanksCard(c, t) {
  return `<article class="post thanks"><div class="head"><a class="who" href="#/creator/${c.handle}"><img class="avatar" src="${c.avatar}" alt=""><div><b>${esc(c.name)}</b><small>@${c.handle} · ${t.when}</small></div></a></div>
    <div class="gift-line">${I.gift}Thank-you for: ${esc(t.gift)}</div><p>${esc(t.text)}</p></article>`;
}
let profileTab = "home";
function themeVars(c) { const t = ACCENTS[(c.theme && c.theme.accent) || "pink"]; return `--accent:${t.a};--accent-deep:${t.d};--blush:${t.soft};`; }
function starField() { const pts = [[62,18],[70,62],[78,30],[88,70],[93,22],[55,80],[84,50]]; return `<div class="stars">${pts.map(([x,y],i) => `<i style="left:${x}%;top:${y}%;transform:scale(${0.6 + (i % 3) * 0.3})"></i>`).join("")}</div>`; }
function creatorHeader(c, opts = {}) {
  const isMe = c.handle === state.user.handle && state.role === "creator";
  const open = c.wishlist.filter((w) => !w.done);
  return `<div class="pro-head">
    <div class="pro-banner" style="${thumbStyle(c.tint)}"><img src="${c.gallery && c.gallery[0] ? c.gallery[0] : IMG.hero}" alt="">${starField()}</div>
    <div class="pro-id">
      <img class="avatar" src="${c.avatar}" alt="">
      <div class="pro-name">
        <b>${esc(c.name)}${c.verified ? I.verified : ""}</b>
        <span class="muted">@${c.handle} · ${esc(c.tagline || "Creator")}</span>
        <div class="pro-stats"><span><b>${k(c.followers)}</b> supporters</span><span><b>${c.gifts}</b> gifts</span><span><b>${open.length}</b> wishes</span><span>${esc(c.location || "")}</span></div>
      </div>
      <div class="pro-acts">${opts.preview ? "" : isMe ? `<a class="btn btn-ghost" href="#/dashboard/page">${I.palette}<span>Edit page</span></a>` : `<button class="btn btn-ghost" data-follow="${c.handle}">${state.following.has(c.handle) ? "Following" : "Follow"}</button><a class="btn btn-primary" href="#/boost/${c.handle}">${I.cup}<span>Buy a coffee</span></a>`}</div>
    </div>
    <p class="pro-bio">${esc(c.bio)}</p>
    <div class="pro-links">${(c.links || []).map((l) => `<a href="#/creator/${c.handle}">${I.link}${esc(l)}</a>`).join("")}<a href="#/creator/${c.handle}">bakaboost.com/${c.handle}</a></div>
  </div>`;
}
function coffeeCard(c) {
  return `<div class="coffee-card">
    <div class="ic">${I.cup}</div>
    <b>Buy ${esc(c.name.split(" ")[0])} a coffee</b>
    <p>One-time tip. No shipping, nothing to unbox. They keep 100%.</p>
    <div class="amounts">${[1, 3, 5, 10].map((a) => `<button class="chip" data-coffee="${a}" data-ch="${c.handle}">${a === 1 ? "1 coffee" : a + " coffees"} · ${money(a)}</button>`).join("")}</div>
    <a class="btn btn-primary btn-block" href="#/boost/${c.handle}">Send a boost</a>
  </div>`;
}
function membersTeaser(c) {
  const tiers = c.members || [{ id: "soon", name: "Memberships", price: 5, perks: ["Exclusive posts", "Member badge"], live: false, premium: true }];
  return `<div class="members-card">
    <div class="h"><span>Memberships</span><span class="badge violet">Premium slot</span></div>
    ${tiers.map((t) => `<div class="tier ${t.live ? "" : "soon"}"><div><b>${esc(t.name)}</b><small>${t.perks.join(" · ")}</small></div><span>${t.live ? money(t.price) + "/mo" : "Soon"}</span></div>`).join("")}
    <p class="muted" style="font-size:12px">Paid clubs, custom domains, and collab seats stay reserved for Studio — free pages keep shop, posts, and gifts.</p>
  </div>`;
}
function galleryGrid(c) {
  const pics = c.gallery || (c.posts || []).filter((p) => p.img).map((p) => p.img);
  if (!pics.length) return `<div class="empty">No gallery yet — posts with photos land here.</div>`;
  return `<div class="gal">${pics.map((src, i) => `<button class="gal-item" data-act="noop"><img src="${src}" alt="" style="object-position:${(i % 3) * 30}% ${(i % 2) * 40}%"></button>`).join("")}</div>`;
}
function pageCreator(handle, tab) {
  const c = findCreator(handle); if (!c) return marketingPage("", `<div class="wrap"><div class="empty" style="margin:60px 0">That creator doesn't exist (yet).</div></div>`);
  profileTab = tab || "home";
  const isMe = c.handle === state.user.handle && state.role === "creator";
  const open = c.wishlist.filter((w) => !w.done), done = c.wishlist.filter((w) => w.done);
  const tabs = [["home", "Home"], ["posts", "Posts"], ["shop", "Shop"], ["gallery", "Gallery"], ["wishlist", "Wishlist"], ["members", "Members"], ["about", "About"]];
  let body = "";
  if (profileTab === "home") body = `<div class="feed-col">${c.goal ? goalCard(c) : ""}${c.commissions ? commissionCard(c) : ""}${(c.posts || []).slice(0, 2).map((p, i) => postCard(c, p, i)).join("")}
    <div class="pro-block"><div class="h"><b>Shop</b><a href="#/creator/${c.handle}/shop">See all</a></div><div class="shop-grid compact">${(c.shop || []).slice(0, 3).map((s) => shopItem(c, s)).join("") || `<div class="empty">Shop coming soon.</div>`}</div></div>
    <div class="pro-block"><div class="h"><b>Gallery</b><a href="#/creator/${c.handle}/gallery">View gallery</a></div>${galleryGrid({ ...c, gallery: (c.gallery || []).slice(0, 6) })}</div></div>`;
  else if (profileTab === "posts") body = `<div class="feed-col">${(c.posts || []).length ? c.posts.map((p, i) => postCard(c, p, i)).join("") : `<div class="empty">No posts yet.</div>`}</div>`;
  else if (profileTab === "shop") body = shopTab(c);
  else if (profileTab === "gallery") body = galleryGrid(c);
  else if (profileTab === "wishlist") body = `<div class="wish-grid">${open.map((w) => wishCard(c, w)).join("")}${done.map((w) => wishCard(c, w)).join("")}</div>`;
  else if (profileTab === "members") body = `<div class="members-page">${membersTeaser(c)}<div class="empty premium-empty"><b>Studio memberships</b><p>Custom domains, seasonal banners, and collab seats will live here. The free page keeps posts, shop, and gifts.</p><a class="btn btn-violet" href="#/pricing">See Free vs Studio</a></div></div>`;
  else if (profileTab === "thanks") body = `<div class="feed-col">${(isMe ? state.thanks : [{ gift: (c.wishlist.find((w) => w.done) || { title: "a gift" }).title, text: "It arrived! Thank you so much — you'll see it in the next post ♡", when: "3d" }]).map((t) => thanksCard(c, t)).join("")}</div>`;
  else body = `<div class="about-grid">
      <div class="step"><h3>About</h3><p>${esc(c.bio)}</p></div>
      <div class="step"><h3>Gifting rules</h3><p>Anonymous gifts welcome. No food, no gift cards. Notes are screened before I see them.</p></div>
      <div class="step"><h3>Where gifts go</h3><p>Everything ships through the BakaBoost relay. ${esc(c.name.split(" ")[0])}'s address is never shown to supporters.</p></div>
      <div class="step"><h3>Badges</h3>${badgeRow(badgeState(CREATOR_BADGES, c), { all: true })}</div>
    </div>`;
  const rail = `<aside class="pro-rail">${coffeeCard(c)}${membersTeaser(c)}
    <div class="rail-block"><span class="h">Top supporters</span>${(c.boosts || []).map((b) => `<div class="sug"><div class="who"><span class="avatar" style="width:36px;height:36px;display:grid;place-items:center;color:var(--accent);border-width:0;background:var(--blush)">${I.cup}</span><div><b style="font-size:14px">${esc(b.from)}</b><small>${money(b.amount)} · ${b.when}</small></div></div></div>`).join("") || `<span class="muted" style="font-size:14px">Be the first coffee.</span>`}<a href="#/creator/${c.handle}/about" style="font-weight:700;font-size:13px">See leaderboard</a></div>
    <div class="rail-block"><span class="h">Open wishes</span>${open.slice(0, 3).map((w) => `<div class="wl-row" style="padding:10px"><div class="thumb" style="${thumbStyle(c.tint)}">${ITEM_ICON[w.icon]}</div><div class="info"><b style="font-size:14px">${esc(w.title)}</b><small>${money(w.price)}</small></div><a class="btn btn-primary btn-sm" href="#/gift/${c.handle}/${w.id}">Gift</a></div>`).join("")}<a href="#/creator/${c.handle}/wishlist" style="font-weight:700;font-size:13px">Wishlist</a></div></aside>`;
  return marketingPage("explore", `<div class="wrap pro-page" style="${themeVars(c)}">${creatorHeader(c)}
    <div class="tabs">${tabs.map(([t, l]) => `<a href="#/creator/${c.handle}/${t}" class="${profileTab === t ? "on" : ""}">${l}</a>`).join("")}</div>
    <div class="pro-layout"><div class="pro-main">${body}</div>${rail}</div></div>`);
}

/* ---------- Page editor ---------- */
function pagePageEditor() {
  const c = myCreator();
  const sw = (key, cls) => `<div class="swatches">${Object.keys(ACCENTS).map((k2) => `<button class="swatch dot ${(c.theme.accent === k2) ? "on" : ""}" style="--sw:${ACCENTS[k2].a};background:${ACCENTS[k2].soft}" data-accent="${k2}" title="${k2}"></button>`).join("")}</div>`;
  return appShell("dashboard/page", `<div class="main-head"><div><span class="eyebrow">My page</span><h2>Make it feel like you</h2></div><a class="btn btn-ghost" href="#/creator/${c.handle}">${I.eye}<span>View live page</span></a></div>
  <div class="editor">
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card"><h3>Identity</h3>
        <div class="field"><label>Display name</label><input id="pe-name" value="${esc(c.name)}"></div>
        <div class="field"><label>Tagline</label><input id="pe-tagline" value="${esc(c.tagline || "")}" placeholder="Illustrator & Streamer"></div>
        <div class="field"><label>Bio</label><textarea id="pe-bio" rows="3">${esc(c.bio)}</textarea></div>
        <div class="field"><label>Location</label><input id="pe-loc" value="${esc(c.location)}"></div></div>
      <div class="card"><h3>Look</h3>
        <div class="field"><label>Banner</label><div class="swatches">${TINTS.map((t, i) => `<button class="swatch ${c.tint === i ? "on" : ""}" style="background:${t}" data-tint="${i}" title="Banner ${i + 1}"></button>`).join("")}</div></div>
        <div class="field"><label>Accent color</label>${sw()}<span class="hint">Used for your buttons, tabs, and progress bars.</span></div></div>
      <div class="card"><h3>Links</h3>${(c.links || []).map((l, i) => `<div class="field"><input data-link="${i}" value="${esc(l)}"></div>`).join("")}<button class="btn btn-ghost btn-sm" style="align-self:flex-start" data-act="add-link">${I.plus}<span>Add link</span></button></div>
      <div class="card"><h3>Goal</h3>
        <div class="field"><label>Title</label><input id="pe-goal" value="${esc(c.goal ? c.goal.title : "")}" placeholder="New art setup"></div>
        <div class="row2"><div class="field"><label>Target (USD)</label><input id="pe-target" type="number" value="${c.goal ? c.goal.target : ""}"></div><div class="field"><label>Raised so far</label><input value="${c.goal ? money(c.goal.raised) : "$0"}" disabled></div></div>
        <div class="field"><label>What it's for</label><input id="pe-goaldesc" value="${esc(c.goal ? c.goal.desc : "")}"></div></div>
      <button class="btn btn-primary btn-lg" data-act="save-page">Save page</button>
    </div>
    <div class="preview-frame"><div class="lbl"><span>Live preview</span><span>bakaboost.app/${c.handle}</span></div>
      <div style="zoom:.78;pointer-events:none">${creatorHeader(c, { preview: true })}<div class="tabs" style="${themeVars(c)}"><span class="on" style="padding:10px 0;border-bottom:2px solid var(--accent);margin-bottom:-1px;color:var(--accent)">Home</span><span style="padding:10px 0">Wishlist</span><span style="padding:10px 0">About</span><span style="padding:10px 0">Goals</span><span style="padding:10px 0">Thanks</span></div>
      <div class="wish-grid" style="${themeVars(c)}">${c.wishlist.filter((w) => !w.done).slice(0, 3).map((w) => wishCard(c, w)).join("")}</div></div>
    </div>
  </div>`);
}
function readEditor() {
  const c = myCreator();
  const v = (id) => { const el = $(id); return el ? el.value.trim() : null; };
  if (v("#pe-name")) { c.name = v("#pe-name"); state.user.name = c.name; }
  if ($("#pe-tagline")) c.tagline = v("#pe-tagline");
  if (v("#pe-bio")) c.bio = v("#pe-bio");
  if (v("#pe-loc")) c.location = v("#pe-loc");
  const links = [...document.querySelectorAll("[data-link]")].map((i) => i.value.trim()).filter(Boolean); if ($("[data-link]")) c.links = links;
  const gt = v("#pe-goal"), tg = Number(v("#pe-target"));
  if (gt && tg > 0) c.goal = { title: gt, target: tg, raised: c.goal ? Math.min(c.goal.raised, tg) : 0, desc: v("#pe-goaldesc") || "" }; else if ($("#pe-goal") && !gt) c.goal = null;
}

/* ---------- Supporter account ---------- */
const STEPS = ["Ordered", "Shipped", "Delivered"];
function sentCard(s) {
  const c = findCreator(s.to); const isBoost = s.kind === "boost", isContrib = s.kind === "contribution";
  const isShop = s.kind === "shop";
  const steps = isShop ? ["Paid", "In your library"] : isBoost ? ["Sent", "Received"] : isContrib ? ["Contributed", "Goal reached", "Unlock delivered"] : STEPS;
  return `<div class="sent"><div class="top"><a href="#/creator/${c.handle}"><img class="avatar" src="${c.avatar}" alt=""></a><div><b>${esc(s.item)}</b><small>to ${esc(c.name)} · ${s.when} · ${s.anon ? "anonymous" : "signed @" + state.supporter.handle}</small></div><span class="amt">${money(s.amount)}</span></div>
    <div class="timeline">${steps.map((st, i) => `${i ? `<span class="bar ${i <= s.step ? "done" : ""}"></span>` : ""}<span class="${i < s.step ? "done" : i === s.step ? "now" : ""}">${st}</span>`).join("")}</div>
    ${s.msg ? `<div class="note">"${esc(s.msg)}"</div>` : ""}
    <div style="display:flex;gap:10px;align-items:center;font-size:13px">${s.thanked ? `<span class="badge good">Thanked you</span><a href="#/creator/${c.handle}/thanks">See thank-you</a>` : `<span class="muted">No thank-you yet</span>`}${isShop ? `<a href="#/account/library" style="margin-left:auto;font-weight:700">${I.library.replace("<svg", '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px"')}Open in library</a>` : `<a href="#/creator/${c.handle}" style="margin-left:auto;font-weight:700">${isBoost ? "Boost again" : "Send another"}</a>`}</div></div>`;
}
function pageAccount() {
  const s = state.supporter; const total = s.sent.reduce((a, b) => a + b.amount, 0);
  return appShell("account", `<div class="main-head"><div><span class="eyebrow" style="color:var(--violet)">Supporter</span><h2>Hi, ${esc(s.name)}</h2></div><a class="btn btn-violet" href="#/explore">${I.gift}<span>Send a gift</span></a></div>
  <div class="tiles"><div class="tile"><span>Gifts &amp; boosts sent</span><b>${s.sent.length}</b><small>to ${new Set(s.sent.map((x) => x.to)).size} creators</small></div><div class="tile"><span>Total given</span><b>${money(total)}</b><small>100% went to creators</small></div><div class="tile"><span>On the way</span><b>${s.sent.filter((x) => x.step < 2 && x.kind === "gift").length}</b><small style="color:var(--violet)">Track below</small></div><div class="tile"><span>Following</span><b>${state.following.size}</b><small>${s.saved.size} saved wishes</small></div></div>
  <div class="two-col">
    <div style="display:flex;flex-direction:column;gap:14px"><div class="main-head"><h3 style="font-family:var(--sans);font-weight:700;font-size:18px">Recent</h3><a href="#/account/gifts" style="font-weight:700;font-size:14px">See all</a></div><div class="list">${s.sent.slice(0, 2).map(sentCard).join("")}</div></div>
    <aside class="rail"><span class="h">Your badges</span>${badgeRow(badgeState(SUPPORTER_BADGES, state.supporter), { all: true })}<a href="#/account/badges" style="font-weight:700;font-size:14px">See all badges</a><span class="h" style="margin-top:8px">Saved wishes</span>${[...s.saved].slice(0, 3).map((id) => { const c = creators.find((cc) => cc.wishlist.some((w) => w.id === id)); const w = c && c.wishlist.find((w) => w.id === id); return w ? `<div class="wl-row" style="padding:10px"><div class="thumb" style="${thumbStyle(c.tint)}">${ITEM_ICON[w.icon]}</div><div class="info"><b style="font-size:14px">${esc(w.title)}</b><small>${esc(c.name)} · ${money(w.price)}</small></div><a class="btn btn-primary btn-sm" href="#/gift/${c.handle}/${w.id}">Gift</a></div>` : ""; }).join("") || `<span class="muted">Nothing saved yet.</span>`}<a href="#/account/saved" style="font-weight:700;font-size:14px">All saved</a>
      <span class="h" style="margin-top:8px">Your privacy</span><div class="note">${I.mask}<span>Gifts default to <b>${s.anonDefault ? "anonymous" : "signed"}</b>. Creators never see your card or address.</span></div></aside>
  </div>`);
}
function pageAccountGifts() {
  return appShell("account/gifts", `<div class="main-head"><div><span class="eyebrow" style="color:var(--violet)">Gifts I've sent</span><h2>Every box, tracked</h2></div></div>
  <p class="muted" style="max-width:60ch">You see the shipping timeline, never the destination. Creators can decline a gift, in which case you're refunded in full.</p>
  <div class="list">${state.supporter.sent.map(sentCard).join("")}</div>`);
}
function pageFollowing() {
  const list = creators.filter((c) => state.following.has(c.handle));
  return appShell("account/following", `<div class="main-head"><div><span class="eyebrow" style="color:var(--violet)">Following</span><h2>${list.length} creators</h2></div><a class="btn btn-ghost" href="#/explore">Find more</a></div>
  <div class="list">${list.length ? list.map((c) => `<div class="follow-row"><a href="#/creator/${c.handle}"><img class="avatar" src="${c.avatar}" alt=""></a><div class="info"><b>${esc(c.name)}</b><small>@${c.handle} · ${c.wishlist.filter((w) => !w.done).length} open wishes${c.goal ? ` · goal ${Math.round((c.goal.raised / c.goal.target) * 100)}%` : ""}</small></div><a class="btn btn-primary btn-sm" href="#/creator/${c.handle}/wishlist">Gift</a><button class="btn btn-ghost btn-sm" data-follow="${c.handle}">Unfollow</button></div>`).join("") : `<div class="empty">You're not following anyone yet.</div>`}</div>`);
}
function pageSaved() {
  const items = [...state.supporter.saved].map((id) => { const c = creators.find((cc) => cc.wishlist.some((w) => w.id === id)); return c ? { c, w: c.wishlist.find((w) => w.id === id) } : null; }).filter(Boolean);
  return appShell("account/saved", `<div class="main-head"><div><span class="eyebrow" style="color:var(--violet)">Saved wishes</span><h2>For later</h2></div></div>
  ${items.length ? `<div class="wish-grid">${items.map(({ c, w }) => `<div style="${themeVars(c)};display:contents">${wishCard(c, w)}</div>`).join("")}</div>` : `<div class="empty">Tap the bookmark on any wish to keep it here.</div>`}`);
}
function pageBadges(kind) {
  const sup = kind === "supporter"; const list = badgeState(sup ? SUPPORTER_BADGES : CREATOR_BADGES, sup ? state.supporter : myCreator()); const earned = list.filter((b) => b.earned).length;
  const next = list.filter((b) => !b.earned).sort((a, b) => b.n / b.of - a.n / a.of)[0];
  return appShell(sup ? "account/badges" : "dashboard/badges", `<div class="main-head"><div><span class="eyebrow" style="${sup ? "color:var(--violet)" : ""}">Badges</span><h2>${earned} of ${list.length} earned</h2></div>${next ? `<div class="note">${I.sparkle}<span>Closest: <b>${esc(next.name)}</b> — ${esc(next.desc)} (${next.n}/${next.of})</span></div>` : ""}</div>
  <p class="muted" style="max-width:60ch">${sup ? "Badges show next to your handle when you sign a gift, so creators know you're a regular. Anonymous gifts still count toward them." : "Badges show on your public page. They're earned by what your community does, not by paying for anything."}</p>
  ${badgeGrid(list)}`);
}
function pageLibrary() {
  const items = state.supporter.sent.filter((s) => s.kind === "shop");
  return appShell("account/library", `<div class="main-head"><div><span class="eyebrow" style="color:var(--violet)">Library</span><h2>Your digital shelf</h2></div><a class="btn btn-violet" href="#/explore">${I.bag}<span>Browse shops</span></a></div>
  <p class="muted" style="max-width:60ch">Everything you buy lands here in seconds — no shipping, no waiting. Community unlocks from goals you chipped in on show up here too.</p>
  ${items.length ? `<div class="shop-grid">${items.map((s) => { const c = findCreator(s.to); return `<div class="shop-item"><div class="th" style="${thumbStyle(c.tint)}">${I.image}</div><div class="t"><b>${esc(s.item)}</b><span class="badge good">Owned</span></div><span class="kind">by ${esc(c.name)} · ${s.when}</span><button class="btn btn-ghost btn-sm" data-act="dl">${I.library}<span>Download again</span></button></div>`; }).join("")}</div>` : `<div class="empty">Nothing here yet. Buy a sticker pack and it'll appear instantly.</div>`}`);
}
function pageAccountSettings() {
  const s = state.supporter;
  const sw = (on, key, title, sub) => `<div class="toggle"><div><b>${title}</b><small>${sub}</small></div><button class="switch ${on ? "on" : ""}" data-ssetting="${key}" aria-label="${title}"></button></div>`;
  return appShell("account/settings", `<div class="main-head"><div><span class="eyebrow" style="color:var(--violet)">Settings</span><h2>Your account</h2></div></div>
  <div class="settings-grid">
    <div class="card"><h3>Profile</h3><div class="field"><label>Display name</label><input id="sa-name" value="${esc(s.name)}"></div><div class="field"><label>Handle</label><input value="${s.handle}" disabled></div><div class="field"><label>Bio</label><textarea id="sa-bio" rows="2">${esc(s.bio)}</textarea><span class="hint">Shown to creators only when you sign a gift.</span></div><button class="btn btn-violet" data-act="save-supporter">Save changes</button></div>
    <div class="card"><h3>Privacy</h3>${sw(s.anonDefault, "anonDefault", "Gift anonymously by default", "You can still sign individual gifts at checkout.")}${sw(true, "x", "Hide my gifts from my public profile", "Only creators you gift can see what you sent.")}<div class="note">${I.lock}<span>Your card is handled by our payment partner. Creators never see it, and we never see your shipping address — gifts go to their relay.</span></div></div>
    <div class="card"><h3>Payment</h3><div class="field"><label>Saved card</label><input value="Visa ending in 4242" disabled></div><button class="btn btn-ghost btn-sm" style="align-self:flex-start">Update card</button></div>
    <div class="card"><h3>Notifications</h3>${sw(true, "n1", "When a gift ships or arrives", "Email and in-app.")}${sw(true, "n2", "When a creator posts a thank-you", "In-app.")}${sw(false, "n3", "When a creator I follow adds a wish", "Weekly digest.")}</div>
  </div>`);
}

function shopItem(c, s) {
  const locked = s.adult && !state.settings.showNsfw;
  return `<div class="shop-item">
    <div class="th" style="${s.img ? "" : thumbStyle(c.tint)}">${s.img ? `<img src="${s.img}" alt="">` : (ITEM_ICON[s.icon] || I[s.icon] || I.image)}</div>
    <div class="t"><b>${esc(s.title)}</b><span class="price">${money(s.price)}</span></div>
    <span class="kind">${esc(s.kind)}</span>
    <button class="btn btn-primary btn-sm" data-buy="${s.id}">${I.bag}<span>Buy · instant</span></button>
    ${locked ? `<div class="lock">${I.lock}<span>18+ · sign in to view</span><button class="btn btn-ghost btn-sm" data-act="unlock-nsfw">Show adult content</button></div>` : ""}
  </div>`;
}
function commissionCard(c) {
  const k = c.commissions; if (!k) return "";
  return `<div class="commission"><div style="display:flex;justify-content:space-between;align-items:center"><b>Commissions ${k.open ? '<span class="badge good">Open</span>' : '<span class="badge warn">Closed</span>'}</b><span class="muted" style="font-size:13px">from ${money(k.from)}</span></div><div class="slots">${Array.from({ length: k.slots }, (_, i) => `<i class="${i >= k.taken ? "open" : ""}"></i>`).join("")}<span class="muted" style="font-size:12px;margin-left:8px">${k.slots - k.taken} of ${k.slots} slots open</span></div><div class="filters" style="margin:0">${k.tiers.map((t) => `<span class="chip" style="cursor:default">${t}</span>`).join("")}</div><p class="muted" style="font-size:13px">${k.deposit}% deposit to book, rest on delivery · ${k.turnaround} turnaround · 0% platform cut</p>${k.open && c.handle !== state.user.handle ? `<a class="btn btn-violet btn-sm" style="align-self:flex-start" href="#/creator/${c.handle}/shop">${I.pen}<span>Request a commission</span></a>` : ""}</div>`;
}
function shopTab(c) {
  const items = c.shop || [];
  return `<div style="display:flex;flex-direction:column;gap:24px">${commissionCard(c)}${items.length ? `<div class="shop-grid">${items.map((s) => shopItem(c, s)).join("")}</div>` : `<div class="empty">${esc(c.name)} hasn't opened a shop yet.</div>`}<div class="note">${I.yen}<span>Shop sales and commission deposits go to ${esc(c.name.split(" ")[0])} at 0% platform cut — only card processing is deducted.</span></div></div>`;
}
function goalCard(c) {
  const g = c.goal, pct = Math.min(100, Math.round((g.raised / g.target) * 100));
  return `<div class="goal-card"><div style="display:flex;justify-content:space-between;align-items:center"><span class="badge violet">Goal</span><span class="muted" style="font-size:13px">${pct}% funded</span></div><h3>${esc(g.title)}</h3><p class="muted" style="font-size:14px">${esc(g.desc)}</p><div class="progress"><i style="width:${pct}%"></i></div><div class="pr"><span>${money(g.raised)} raised</span><span>${money(g.target)} goal</span></div>${g.unlock ? `<div class="unlock"><div class="ic">${I.unlock}</div><span><b>Community unlock:</b> ${esc(g.unlock)}</span></div>` : ""}${c.handle === state.user.handle ? "" : `<a class="btn btn-violet" style="align-self:flex-start" href="#/boost/${c.handle}?goal=1">Chip in</a>`}</div>`;
}
const bo = { amount: 10, msg: "", anon: false, goal: false };
function pageBoost(handle, goal) {
  const c = findCreator(handle); if (!c) return pageHome();
  bo.goal = !!goal;
  const fee = procFee(bo.amount), total = Math.round((bo.amount + fee) * 100) / 100;
  return marketingPage("explore", `<div class="wrap"><a href="#/creator/${c.handle}" class="muted" style="display:inline-flex;align-items:center;gap:6px;margin-top:24px">${I.arrow.replace("<svg", '<svg style="width:16px;height:16px;transform:rotate(180deg)"')}Back to ${esc(c.name)}</a>
  <div class="checkout">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div class="card"><h3>${bo.goal && c.goal ? "Chip in on “" + esc(c.goal.title) + "”" : "Send " + esc(c.name.split(" ")[0]) + " a boost"}</h3>
        <div class="field"><label>Amount</label><div class="amounts">${[5, 10, 15, 25, 50].map((a) => `<button class="chip ${bo.amount === a ? "on" : ""}" data-bamt="${a}">${money(a)}</button>`).join("")}</div><span class="hint">${bo.goal && c.goal ? money(c.goal.target - c.goal.raised) + " still needed." : "Boosts are money, not things — no shipping, nothing to unbox."}</span></div>
        <div class="field"><label>Note</label><textarea id="bo-msg" rows="2" placeholder="Keep creating!">${esc(bo.msg)}</textarea></div>
        <div class="toggle"><div><b>Send anonymously</b><small>${bo.anon ? "Shows as Anonymous on their page." : "Shows your handle on their page."}</small></div><button class="switch ${bo.anon ? "on" : ""}" data-act="banon" aria-label="Toggle anonymous"></button></div>
      </div>
      <div class="card"><h3>Payment</h3><div class="row2"><div class="field"><label>Card number</label><input placeholder="4242 4242 4242 4242" inputmode="numeric"></div><div class="field"><label>Expiry / CVC</label><input placeholder="MM / YY · 123"></div></div><div class="note">${I.lock}<span>Prototype: nothing is charged.</span></div></div>
    </div>
    <div class="card summary" style="position:sticky;top:24px">
      <div class="item"><div class="thumb" style="background:var(--violet-soft);color:var(--violet)">${I.zap}</div><div><b>${bo.goal && c.goal ? esc(c.goal.title) : "Boost"}</b><br><span class="muted" style="font-size:13px">for ${esc(c.name)}</span></div></div>
      <div class="line"><span>Amount</span><span>${money(bo.amount)}</span></div><div class="line"><span>Processing (2.9% + 30¢) · 0% platform cut</span><span>${money(fee)}</span></div><div class="line total"><span>Total</span><span>${money(total)}</span></div>
      <button class="btn btn-violet btn-lg btn-block" data-act="boost-pay">${I.zap}<span>Send ${money(total)}</span></button>
      <p class="muted" style="font-size:12px;text-align:center">${esc(c.name.split(" ")[0])} keeps the full ${money(bo.amount)}.</p>
    </div></div></div>`);
}

/* ---------- Checkout ---------- */
const co = { mode: "full", amount: 0, anon: false, msg: "", name: "" };
function pageGift(handle, id) {
  const c = findCreator(handle); const w = c && c.wishlist.find((x) => x.id === id);
  if (!c || !w) return marketingPage("", `<div class="wrap"><div class="empty" style="margin:60px 0">That wish isn't on the list anymore.</div></div>`);
  if (!co.item || co.item !== id) { co.item = id; co.mode = w.contrib ? "contrib" : "full"; co.amount = w.contrib ? 25 : w.price; co.anon = state.supporter.anonDefault && state.role === "supporter"; co.name = "@" + state.supporter.handle; co.msg = ""; }
  const remaining = w.price - (w.raised || 0);
  const amt = co.mode === "full" ? w.price : Math.min(co.amount, remaining);
  const fee = procFee(amt), total = Math.round((amt + fee) * 100) / 100;
  return marketingPage("explore", `<div class="wrap"><a href="#/creator/${c.handle}" class="muted" style="display:inline-flex;align-items:center;gap:6px;margin-top:24px">${I.arrow.replace("<svg", '<svg style="width:16px;height:16px;transform:rotate(180deg)"')}Back to ${esc(c.name)}</a>
  <div class="checkout">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div class="card"><h3>1. What you're sending</h3>
        ${w.contrib ? `<div class="seg"><button class="${co.mode === "contrib" ? "on" : ""}" data-mode="contrib">Contribute</button><button class="${co.mode === "full" ? "on" : ""}" data-mode="full">Cover the rest (${money(remaining)})</button></div>` : ""}
        ${co.mode === "contrib" ? `<div class="field"><label>Amount</label><div class="amounts">${[10, 25, 50, 100].map((a) => `<button class="chip ${co.amount === a ? "on" : ""}" data-amt="${a}">${money(a)}</button>`).join("")}<input id="co-custom" type="number" min="1" max="${remaining}" placeholder="Custom" style="width:110px;padding:9px 12px;border-radius:999px;border:1.5px solid var(--line-2);background:var(--surface)"></div><span class="hint">${money(remaining)} still needed. If the wish is removed, you're refunded.</span></div>` : `<div class="note">${I.box}<span>We order the ${esc(w.title)} from ${esc(w.store)} and ship it to ${esc(c.name.split(" ")[0])}'s relay address. You'll get a shipping timeline.</span></div>`}
      </div>
      <div class="card"><h3>2. A note for ${esc(c.name.split(" ")[0])}</h3>
        <div class="field"><textarea id="co-msg" rows="3" placeholder="Say why you picked this one. It's the part they read twice.">${esc(co.msg)}</textarea><span class="hint">Notes are screened before delivery. Keep it kind.</span></div>
        <div class="toggle"><div><b>Gift anonymously</b><small>${co.anon ? "They'll see 'Anonymous' and your note." : "They'll see your handle with the note."}</small></div><button class="switch ${co.anon ? "on" : ""}" data-act="anon" aria-label="Toggle anonymous"></button></div>
        ${co.anon ? "" : `<div class="field"><label>Your handle</label><input id="co-name" placeholder="@yourhandle" value="${esc(co.name)}"></div><div class="toggle"><div><b>Okay to shout me out</b><small>${co.shout === false ? "Quiet gift — no on-stream or post mention." : "They can thank you by name on stream or in a post."}</small></div><button class="switch ${co.shout === false ? "" : "on"}" data-act="shoutout" aria-label="Shoutout"></button></div>`}
      </div>
      <div class="card"><h3>3. Payment</h3>
        <div class="row2"><div class="field"><label>Card number</label><input placeholder="4242 4242 4242 4242" inputmode="numeric"></div><div class="field"><label>Name on card</label><input placeholder="As it appears on the card"></div></div>
        <div class="row2"><div class="field"><label>Expiry</label><input placeholder="MM / YY"></div><div class="field"><label>CVC</label><input placeholder="123"></div></div>
        <div class="note">${I.lock}<span>${esc(c.name.split(" ")[0])} never sees your card, and you never see their address. Prototype: nothing is charged.</span></div>
      </div>
    </div>
    <div class="card summary" style="position:sticky;top:24px">
      <div class="item"><div class="thumb" style="${thumbStyle(c.tint)}">${ITEM_ICON[w.icon] || I.gift}</div><div><b>${esc(w.title)}</b><br><span class="muted" style="font-size:13px">for ${esc(c.name)} · ${esc(w.store)}</span></div></div>
      <div class="line"><span>${co.mode === "contrib" ? "Contribution" : "Item"}</span><span>${money(amt)}</span></div>
      <div class="line"><span>Shipping to relay</span><span>$0</span></div>
      <div class="line"><span>Processing (2.9% + 30¢) · 0% platform cut</span><span>${money(fee)}</span></div>
      <div class="line total"><span>Total</span><span>${money(total)}</span></div>
      <button class="btn btn-primary btn-lg btn-block" data-act="pay">${I.heart}<span>${co.mode === "contrib" ? "Contribute " + money(total) : "Send gift · " + money(total)}</span></button>
      <p class="muted" style="font-size:12px;text-align:center">By sending, you agree to the community rules. Gifts can be declined and refunded.</p>
    </div>
  </div></div>`);
}
function pageThanks(handle) {
  const c = findCreator(handle) || creators[0];
  return marketingPage("", `<div class="wrap"><div class="thanks-page">
    <div class="ic">${I.heart}</div><h1 style="font-size:52px">Sent with love</h1>
    <p class="lede muted" style="max-width:46ch">${esc(c.name)} will see your gift in their inbox. You'll get a notification when it ships, when it arrives, and when they post a thank-you.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><a class="btn btn-primary" href="#/creator/${c.handle}">Back to ${esc(c.name.split(" ")[0])}'s page</a><a class="btn btn-ghost" href="#/explore">Find another creator</a></div>
  </div></div>`);
}

/* ---------- Auth & onboarding ---------- */
const ob = { role: "supporter", interests: new Set(["Art", "Cosplay"]), step: 1 };
function pageLogin() {
  return `<div class="page"><div class="auth"><a class="brand" href="#/">${I.cat}<span>Baka<span class="bb">Boost</span></span></a>
    <div class="card"><h3 style="font-family:var(--serif);font-weight:400;font-size:30px">Welcome back</h3>
      <div class="field"><label>Email</label><input type="email" placeholder="you@example.com"></div>
      <div class="field"><label>Password</label><input type="password" placeholder="••••••••"><span class="hint"><a href="#/login">Forgot it?</a></span></div>
      <button class="btn btn-primary btn-block" data-act="login">Log in</button>
      <div class="divider">or</div>
      <button class="btn btn-ghost btn-block" data-act="login">Continue with Google</button>
      <p class="muted" style="text-align:center;font-size:14px">New here? <a href="#/signup">Create an account</a></p>
    </div></div></div>`;
}
function pageSignup() {
  let body;
  if (ob.step === 1) body = `<div class="card"><h3 style="font-family:var(--serif);font-weight:400;font-size:30px">Create your account</h3>
      <div class="field"><label>Email</label><input type="email" placeholder="you@example.com"></div>
      <div class="field"><label>Handle</label><input placeholder="@yourhandle"><span class="hint">This becomes your page: bakaboost.app/yourhandle</span></div>
      <div class="field"><label>Password</label><input type="password" placeholder="At least 8 characters"></div>
      <button class="btn btn-primary btn-block" data-act="ob-next">Continue</button>
      <p class="muted" style="text-align:center;font-size:14px">Already have one? <a href="#/login">Log in</a></p></div>`;
  else if (ob.step === 2) body = `<div class="card"><h3 style="font-family:var(--serif);font-weight:400;font-size:30px">How will you use BakaBoost?</h3>
      <div class="roles"><button class="role ${ob.role === "supporter" ? "on" : ""}" data-role="supporter"><b>Supporter</b><span>Discover creators and send gifts.</span></button><button class="role ${ob.role === "creator" ? "on" : ""}" data-role="creator"><b>Creator</b><span>Share a wishlist and receive support.</span></button></div>
      <div><b style="font-size:15px">What are you into?</b><p class="muted" style="font-size:14px">Pick a few. You can change this anytime.</p></div>
      <div class="filters" style="margin:0">${CATS.slice(1).map((c) => `<button class="chip ${ob.interests.has(c) ? "on" : ""}" data-int="${c}">${c}</button>`).join("")}</div>
      <button class="btn btn-primary btn-block" data-act="ob-next">${ob.role === "creator" ? "Set up my wishlist" : "Go to my feed"}</button>
      <button class="btn btn-text" data-act="ob-skip">Skip for now</button></div>`;
  else body = `<div class="card" style="align-items:center;text-align:center"><div class="thanks-page" style="padding:12px 0 0;gap:14px"><div class="ic">${I.sparkle}</div><h3 style="font-family:var(--serif);font-weight:400;font-size:30px">You're all set</h3><p class="muted">${ob.role === "creator" ? "Your page is live. Add your first wish and share the link." : "Your feed is ready. Go make someone's day."}</p></div>
      <a class="btn btn-primary btn-block" href="#/${ob.role === "creator" ? "dashboard/wishlist" : "account"}" data-act="ob-finish">${ob.role === "creator" ? "Add my first wish" : "Go to my feed"}</a></div>`;
  return `<div class="page"><div class="auth"><a class="brand" href="#/">${I.cat}<span>Baka<span class="bb">Boost</span></span></a>${body}</div></div>`;
}

/* ---------- Feed ---------- */
let feedTab = "foryou";
function pageFeed() {
  const tabs = [["foryou", "For you"], ["following", "Following"], ["Art", "Art"], ["Cosplay", "Cosplay"]];
  let list = creators.flatMap((c) => c.posts.map((p, i) => ({ c, p, i })));
  if (feedTab === "following") list = list.filter((x) => state.following.has(x.c.handle));
  else if (feedTab !== "foryou") list = list.filter((x) => x.c.cats.includes(feedTab) || x.p.tag === feedTab);
  const sug = creators.filter((c) => !state.following.has(c.handle) && c.handle !== state.user.handle).slice(0, 3);
  return appShell("feed", `<div class="main-head"><h2>Home</h2><label class="search" style="min-width:300px">${I.search}<input placeholder="Search creators, posts, tags"></label></div>
  <div class="two-col">
    <div><div class="tabs" style="margin-top:0">${tabs.map(([t, l]) => `<button class="${feedTab === t ? "on" : ""}" data-feed="${t}">${l}</button>`).join("")}</div>
      <div class="feed-col">${list.length ? list.map((x) => postCard(x.c, x.p, x.i)).join("") : `<div class="empty">Nothing here yet. Follow a few creators and this fills up.</div>`}</div></div>
    <aside class="rail"><span class="h">Suggested creators</span>${sug.map((c) => `<div class="sug"><a class="who" href="#/creator/${c.handle}"><img class="avatar" src="${c.avatar}" alt=""><div><b>${esc(c.name)}</b><small>@${c.handle}</small></div></a><button class="btn btn-ghost btn-sm" data-follow="${c.handle}">Follow</button></div>`).join("")}<a href="#/explore" style="font-weight:700;font-size:14px">See all</a>
      <div class="card" style="gap:10px;margin-top:8px;background:var(--blush);border:0"><b>Make someone's day</b><p class="muted" style="font-size:14px">Pick a creator and gift one open wish.</p><a class="btn btn-primary btn-sm" href="#/explore">Browse wishes</a></div></aside>
  </div>`);
}

/* ---------- Dashboard ---------- */
function myCreator() { return findCreator(state.user.handle); }
function pageDashboard() {
  const c = myCreator(); const open = state.gifts.filter((g) => !g.thanked);
  const funded = c.wishlist.filter((w) => w.contrib && !w.done).map((w) => `<div class="wl-row"><div class="thumb" style="${thumbStyle(c.tint)}">${ITEM_ICON[w.icon]}</div><div class="info"><b>${esc(w.title)}</b><small>${money(w.raised || 0)} of ${money(w.price)} · ${Math.round(((w.raised || 0) / w.price) * 100)}%</small><div class="progress" style="margin-top:6px"><i style="width:${Math.round(((w.raised || 0) / w.price) * 100)}%"></i></div></div></div>`).join("");
  return appShell("dashboard", `<div class="main-head"><div><span class="eyebrow">Creator dashboard</span><h2>Hi, ${esc(state.user.name.split(" ")[0])}</h2></div><a class="btn btn-ghost" href="#/creator/${state.user.handle}">${I.eye}<span>View my page</span></a></div>
  <div class="tiles"><div class="tile"><span>Gifts this month</span><b class="count" data-count="${state.gifts.length}">${state.gifts.length}</b><small>+3 vs last month</small></div><div class="tile"><span>Value received</span><b>${money(state.gifts.reduce((s, g) => s + g.amount, 0))}</b><small>across ${c.wishlist.filter((w) => w.done).length + 1} wishes</small></div><div class="tile"><span>Awaiting thank-you</span><b>${open.length}</b><small style="color:var(--warn)">${open.length ? "Reply today ♡" : "All caught up"}</small></div><div class="tile"><span>Supporters</span><b>${k(c.followers)}</b><small>+180 this week</small></div></div>
  <div class="two-col">
    <div style="display:flex;flex-direction:column;gap:14px"><div class="main-head"><h3 style="font-family:var(--sans);font-weight:700;font-size:18px">Recent gifts</h3><a href="#/dashboard/gifts" style="font-weight:700;font-size:14px">See all</a></div>${giftsTable(state.gifts.slice(0, 3))}</div>
    <aside class="rail"><span class="h">Your badges</span>${badgeRow(badgeState(CREATOR_BADGES, c), { all: true })}<a href="#/dashboard/badges" style="font-weight:700;font-size:14px">See all badges</a>${c.goal ? `<span class="h" style="margin-top:8px">Your goal</span>${goalCard(c)}` : ""}<span class="h">Being funded together</span>${funded || `<div class="empty">No contribute-together wishes yet.</div>`}
      <span class="h" style="margin-top:8px">Share your page</span><div class="addr">bakaboost.app/${state.user.handle}</div><button class="btn btn-ghost btn-sm" data-act="copy">${I.link}<span>Copy link</span></button></aside>
  </div>`);
}
function giftsTable(gifts) {
  const st = (s) => s === "Delivered" ? `<span class="badge good">Delivered</span>` : s === "Shipped" ? `<span class="badge">Shipped</span>` : `<span class="badge warn">Contribution</span>`;
  return `<div class="table-wrap"><table class="table"><thead><tr><th>From</th><th>Gift</th><th>Note</th><th>Status</th><th></th></tr></thead><tbody>
    ${gifts.map((g) => `<tr><td><div class="from"><span class="avatar" style="width:32px;height:32px;display:grid;place-items:center;color:var(--accent)">${g.anon ? I.mask : I.user}</span><div><b>${g.anon ? "Anonymous" : "@" + esc(g.from)}${g.anon ? "" : `<span class="from-badges">${supporterBadgesFor(g.from).map((b) => badgeIcon(b, "sm")).join("")}</span>`}</b><br><small class="muted">${g.when}</small></div></div></td><td><b>${esc(g.item)}</b><br><small class="muted">${money(g.amount)}</small></td><td class="msg">${g.msg ? esc(g.msg) : '<span class="muted">No note</span>'}</td><td>${st(g.status)}</td><td>${g.thanked ? `<span class="muted" style="font-size:13px">Thanked</span>` : `<a class="btn btn-primary btn-sm" href="#/dashboard/thanks">Say thanks</a>`}</td></tr>`).join("")}
  </tbody></table></div>`;
}
function pageGifts() {
  return appShell("dashboard/gifts", `<div class="main-head"><div><span class="eyebrow">Inbox</span><h2>Gifts</h2></div><span class="muted">${state.gifts.filter((g) => !g.thanked).length} waiting for a thank-you</span></div>
  ${giftsTable(state.gifts)}
  <div class="note">${I.shield}<span>Don't want something? Open the gift and choose "Decline" — we return it to the store and the supporter is refunded. Blocking a supporter also stops their future gifts.</span></div>`);
}
function pageWishlist() {
  const c = myCreator();
  const rows = c.wishlist.map((w) => { const hidden = state.wishVisibility[w.id] === false; return `<div class="wl-row" style="${hidden ? "opacity:.55" : ""}"><div class="thumb" style="${thumbStyle(c.tint)}">${ITEM_ICON[w.icon] || I.gift}</div>
    <div class="info"><b>${esc(w.title)} ${w.done ? '<span class="badge good">Gifted</span>' : w.contrib ? `<span class="badge">${Math.round(((w.raised || 0) / w.price) * 100)}% funded</span>` : ""}${hidden ? '<span class="badge warn">Hidden</span>' : ""}</b><small>${esc(w.store)} · "${esc(w.why)}"</small></div>
    <span class="price">${money(w.price)}</span>
    <div class="acts"><button class="icon-btn" data-hide="${w.id}" title="${hidden ? "Show" : "Hide"}">${hidden ? I.eyeoff : I.eye}</button><button class="icon-btn" data-act="edit-wish" title="Edit">${I.edit}</button><button class="icon-btn" data-del="${w.id}" title="Remove">${I.trash}</button></div></div>`; }).join("");
  return appShell("dashboard/wishlist", `<div class="main-head"><div><span class="eyebrow">My wishlist</span><h2>${c.wishlist.filter((w) => !w.done).length} open wishes</h2></div><div style="display:flex;gap:10px"><button class="btn btn-ghost" data-act="toggle-public">${state.settings.publicWishlist ? I.eye : I.eyeoff}<span>${state.settings.publicWishlist ? "Public" : "Paused"}</span></button><button class="btn btn-primary" data-act="add-wish">${I.plus}<span>Add a wish</span></button></div></div>
  <div class="list">${rows}</div>
  <div class="note">${I.info}<span>Order matters: drag to reorder in the full app. Supporters see the top of your list first, so put the wish you want most up top.</span></div>`);
}
function pageThanksInbox() {
  const pending = state.gifts.filter((g) => !g.thanked);
  return appShell("dashboard/thanks", `<div class="main-head"><div><span class="eyebrow">Thank-yous</span><h2>Close the loop</h2></div></div>
  <p class="muted" style="max-width:60ch">A thank-you posts to your page and lands in the supporter's notifications. Anonymous supporters still get it — they just aren't named.</p>
  <div class="list">${pending.length ? pending.map((g) => `<div class="thank-item"><span class="avatar" style="display:grid;place-items:center;color:var(--accent)">${g.anon ? I.mask : I.user}</span><div class="body"><div><b>${g.anon ? "Anonymous" : "@" + esc(g.from)}</b>${g.anon ? "" : `<span class="from-badges">${supporterBadgesFor(g.from).map((b) => badgeIcon(b, "sm")).join("")}</span>`} · ${esc(g.item)} · ${money(g.amount)}<br><small>${g.msg ? '"' + esc(g.msg) + '"' : "No note"} · ${g.when}</small></div><textarea data-thanks-text="${g.id}" placeholder="Thank them. Mention what you'll do with it — that's what they came for."></textarea><div style="display:flex;gap:10px"><button class="btn btn-primary btn-sm" data-thank="${g.id}">${I.heart}<span>Post thank-you</span></button><button class="btn btn-ghost btn-sm" data-thank-later="${g.id}">Later</button></div></div></div>`).join("") : `<div class="empty">Everyone's been thanked. Go make something.</div>`}</div>
  <h3 style="font-family:var(--sans);font-weight:700;font-size:18px;margin-top:12px">Posted</h3>
  <div class="feed-col">${state.thanks.map((t) => thanksCard(myCreator(), t)).join("")}</div>`);
}
function pageSettings() {
  const s = state.settings;
  const sw = (key, title, sub) => `<div class="toggle"><div><b>${title}</b><small>${sub}</small></div><button class="switch ${s[key] ? "on" : ""}" data-setting="${key}" aria-label="${title}"></button></div>`;
  return appShell("dashboard/settings", `<div class="main-head"><div><span class="eyebrow">Settings</span><h2>Your page &amp; privacy</h2></div></div>
  <div class="settings-grid">
    <div class="card"><h3>Profile</h3><div class="field"><label>Display name</label><input value="${esc(state.user.name)}" id="set-name"></div><div class="field"><label>Handle</label><input value="${state.user.handle}" disabled></div><div class="field"><label>Bio</label><textarea rows="3">${esc(myCreator().bio)}</textarea></div><button class="btn btn-primary" data-act="save-profile">Save changes</button></div>
    <div class="card"><h3>Relay address</h3><p class="muted" style="font-size:14px">Stores ship here. We forward to your real address, which only our fulfilment team can see.</p><div class="addr">Luna Aoki · BB-4F72K<br>BakaBoost Relay, Unit 12<br>[relay street address]<br>Tokyo 100-0001</div>${sw("relay", "Forward gifts automatically", "Off means every parcel waits for your approval first.")}<div class="field"><label>Home address (private)</label><input type="password" value="hidden-from-everyone" disabled><span class="hint">Encrypted. Never shown to supporters, stores, or in posts.</span></div></div>
    <div class="card"><h3>Wishlist &amp; gifting</h3>${sw("publicWishlist", "Wishlist is public", "Paused lists still show your page, without wishes.")}${sw("showNsfw", "Show NSFW content in my feed", "Only affects what you see, not what you post.")}<div class="toggle"><div><b>Who can gift</b><small>Anyone with the link, or followers only.</small></div><select style="padding:8px 12px;border-radius:10px;border:1.5px solid var(--line-2);background:var(--surface)"><option>Anyone</option><option>Followers only</option></select></div></div>
    <div class="card"><h3>Blocked supporters</h3><p class="muted" style="font-size:14px">Blocked accounts can't gift, message, or see your wishlist.</p><div class="empty" style="padding:24px">No one blocked. Nice.</div></div>
  </div>`);
}


/* ---------- Motion enhancer (runs after every render) ---------- */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let revealObs, barObs, countObs;
function enhance() {
  const root = $("#root");
  // mark reveal targets
  root.querySelectorAll(".section .section-head, .section .steps > *, .section .features > *, .section .creator-grid > *, .section .datalist > *, .section .pagefeel > *, .section .stores > *, .section .faq2 > *, .section .plum, .section .testimonial > *, .section .cta-mid, .platforms > *, .wish-grid > .wish, .tiles > .tile, .badge-grid > *, .list > *").forEach((el, i) => { if (!el.classList.contains("rv")) { el.classList.add("rv"); const sib = [...el.parentElement.children].indexOf(el); el.classList.add("d" + Math.min(sib, 7)); } });
  if (reduceMotion) { root.querySelectorAll(".progress").forEach((p) => p.classList.remove("pending")); return; }
  // scroll reveal
  revealObs = revealObs || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  root.querySelectorAll(".rv:not(.in)").forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight * 0.9) el.classList.add("in"); else revealObs.observe(el); });
  // progress bars
  barObs = barObs || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { requestAnimationFrame(() => e.target.classList.remove("pending")); barObs.unobserve(e.target); } }), { threshold: 0.4 });
  root.querySelectorAll(".progress").forEach((p) => { if (p.dataset.seen) return; p.dataset.seen = 1; p.classList.add("pending"); barObs.observe(p); });
  // count-ups
  countObs = countObs || new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; countObs.unobserve(e.target); const el = e.target, end = Number(el.dataset.count), suf = el.dataset.suffix || "", t0 = performance.now(), dur = 1400; const step = (t) => { const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3))); el.textContent = v.toLocaleString() + suf; if (p < 1) requestAnimationFrame(step); else el.classList.add("done"); }; requestAnimationFrame(step); }), { threshold: 0.6 });
  root.querySelectorAll(".count[data-count]").forEach((el) => { if (el.dataset.seen) return; el.dataset.seen = 1; countObs.observe(el); });
  // parallax on hero stage
  const stage = root.querySelector(".hero4 .stage");
  if (stage) { const cards = [...stage.querySelectorAll(".fc")]; const orb = stage.querySelector(".orb"); stage.parentElement.addEventListener("mousemove", (e) => { const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; cards.forEach((c, i) => { const d = 10 + i * 6; c.style.transform = `translate(${x * d}px, ${y * d}px)`; }); if (orb) orb.style.transform = `translateX(-50%) translate(${x * -6}px, ${y * -6}px)`; }, { passive: true }); stage.parentElement.addEventListener("mouseleave", () => { cards.forEach((c) => (c.style.transform = "")); if (orb) orb.style.transform = ""; }); }
  // 3D tilt
  if (!matchMedia("(pointer: coarse)").matches) root.querySelectorAll(".tilt").forEach((el) => { el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`; }); el.addEventListener("mouseleave", () => (el.style.transform = "")); });
  // live notification card
  clearInterval(liveTimer); const live = root.querySelector(".fc.boost .swap");
  if (live) liveTimer = setInterval(() => { liveIdx = (liveIdx + 1) % LIVE_NOTES.length; const [a, b] = LIVE_NOTES[liveIdx]; const n = live.cloneNode(false); n.innerHTML = `<b>${a}</b><small>${b}</small>`; live.replaceWith(n); root.querySelector(".fc.boost .swap") || 0; enhanceLive(n); }, 3400);
  // steps connector
  const steps = root.querySelector(".steps"); if (steps && !steps.dataset.seen) { steps.dataset.seen = 1; new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { steps.classList.add("in-view"); o.disconnect(); } }), { threshold: 0.3 }).observe(steps); }
  // sliding tab indicator
  root.querySelectorAll(".tabs").forEach((tabs) => { const on = tabs.querySelector(".on"); if (!on || tabs.querySelector(".ind")) return; const ind = document.createElement("span"); ind.className = "ind"; tabs.appendChild(ind); const place = (el, instant) => { if (instant) ind.style.transition = "none"; ind.style.left = el.offsetLeft + "px"; ind.style.width = el.offsetWidth + "px"; if (instant) requestAnimationFrame(() => (ind.style.transition = "")); }; place(on, true); tabs.querySelectorAll("a,button").forEach((t) => t.addEventListener("mouseenter", () => place(t)) ); tabs.addEventListener("mouseleave", () => place(tabs.querySelector(".on"))); });
  // confetti on sent page
  if (root.querySelector(".thanks-page") && !root.querySelector(".thanks-page").dataset.seen) { root.querySelector(".thanks-page").dataset.seen = 1; confetti(); }
  // body hue shifts by section in view
  const hues = { pink: "var(--bg-pink)", lav: "var(--bg-lav)", mint: "var(--bg-mint)", peach: "var(--bg-peach)", plum: "var(--bg-lav)", white: "var(--bg-white)" };
  const hueSecs = root.querySelectorAll("[data-hue]");
  if (hueSecs.length) { const hueObs = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) document.body.style.backgroundColor = hues[e.target.dataset.hue] ? getComputedStyle(document.documentElement).getPropertyValue(hues[e.target.dataset.hue].slice(4, -1)).trim() : ""; }); }, { rootMargin: "-45% 0px -45% 0px" }); hueSecs.forEach((s) => hueObs.observe(s)); } else document.body.style.backgroundColor = "";
  // cursor spotlight on cards
  root.querySelectorAll(".spot").forEach((el) => el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(); el.style.setProperty("--sx", ((e.clientX - r.left) / r.width * 100) + "%"); el.style.setProperty("--sy", ((e.clientY - r.top) / r.height * 100) + "%"); }, { passive: true }));
  // plum glow follows cursor
  root.querySelectorAll(".plum").forEach((p) => p.addEventListener("mousemove", (e) => { const r = p.getBoundingClientRect(); p.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%"); p.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%"); }, { passive: true }));
}

/* ---- Motion layer 2 helpers ---- */
const LIVE_NOTES = [["Mika sent $15 ♡", "\"Keep creating!\""], ["Anonymous gifted a wish", "Ring light 18\" · shipped"], ["pixel_rin chipped in $20", "Goal: New art setup · 82%"], ["Rei earned a badge", "Boost buddy · community"], ["Sora posted a thank-you", "\"The iPad arrived!!\""]];
let liveTimer, liveIdx = 0;
function heartBurst(x, y, color) {
  if (reduceMotion) return;
  const b = document.createElement("div"); b.className = "burst"; b.style.left = x + "px"; b.style.top = y + "px";
  const heart = '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
  for (let i = 0; i < 10; i++) { const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.5, d = 40 + Math.random() * 40; const s = document.createElement("i"); s.style.setProperty("--dx", Math.cos(a) * d + "px"); s.style.setProperty("--dy", Math.sin(a) * d - 20 + "px"); s.style.setProperty("--r", (Math.random() * 60 - 30) + "deg"); s.style.animationDelay = (Math.random() * 0.1) + "s"; if (color) s.style.color = color; s.innerHTML = heart; b.appendChild(s); }
  document.body.appendChild(b); setTimeout(() => b.remove(), 1100);
}
function confetti() {
  if (reduceMotion) return;
  const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c); const ctx = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight;
  const cols = ["#e9498b", "#6f55e3", "#ffb3d1", "#c9bdf5", "#ffd27f"]; const ps = Array.from({ length: 90 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, r: 4 + Math.random() * 5, vy: 2 + Math.random() * 3, vx: Math.random() * 2 - 1, rot: Math.random() * 6, vr: Math.random() * 0.2 - 0.1, col: cols[Math.floor(Math.random() * cols.length)], heart: Math.random() < 0.4 }));
  let t0 = performance.now();
  (function frame(t) { ctx.clearRect(0, 0, c.width, c.height); ps.forEach((p) => { p.y += p.vy; p.x += p.vx + Math.sin(t / 400 + p.r) * 0.6; p.rot += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col; if (p.heart) { ctx.beginPath(); ctx.moveTo(0, p.r); ctx.bezierCurveTo(-p.r * 1.4, -p.r * 0.2, -p.r * 0.5, -p.r * 1.2, 0, -p.r * 0.4); ctx.bezierCurveTo(p.r * 0.5, -p.r * 1.2, p.r * 1.4, -p.r * 0.2, 0, p.r); ctx.fill(); } else ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore(); }); if (t - t0 < 3200) requestAnimationFrame(frame); else c.remove(); })(t0);
}
document.addEventListener("pointerdown", (e) => {
  const b = e.target.closest(".btn"); if (!b || reduceMotion) return;
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height); const i = document.createElement("span"); i.className = "ripple"; i.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`; b.appendChild(i); setTimeout(() => i.remove(), 650);
});
document.addEventListener("click", (e) => {
  const like = e.target.closest("[data-like]"); if (like && !state.liked.has(like.dataset.like)) heartBurst(e.clientX, e.clientY);
  const save = e.target.closest("[data-save]"); if (save && !state.supporter.saved.has(save.dataset.save)) heartBurst(e.clientX, e.clientY);
  const follow = e.target.closest("[data-follow]"); if (follow && !state.following.has(follow.dataset.follow)) heartBurst(e.clientX, e.clientY, "#6f55e3");
  if (e.target.closest("[data-thank]")) heartBurst(e.clientX, e.clientY);
}, true);
/* cursor sparkles + logo eyes */
(function () {
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;
  const layer = document.createElement("canvas"); layer.className = "sparkle-layer"; document.body.appendChild(layer); const ctx = layer.getContext("2d");
  const fit = () => { layer.width = innerWidth; layer.height = innerHeight; }; fit(); addEventListener("resize", fit);
  const ps = []; let last = 0;
  addEventListener("pointermove", (e) => {
    if (!$(".navbar")) return; // marketing pages only
    if (performance.now() - last < 28) return; last = performance.now();
    ps.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 1.2, vy: -0.6 - Math.random(), life: 1, r: 2 + Math.random() * 3, col: Math.random() < 0.7 ? "#e9498b" : "#6f55e3" });
    // eyes
    document.querySelectorAll(".brand svg").forEach((svg) => { const r = svg.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); const a = Math.atan2(dy, dx), m = Math.min(1.1, Math.hypot(dx, dy) / 200); svg.querySelectorAll(".eye").forEach((eye) => (eye.style.transform = `translate(${Math.cos(a) * m}px, ${Math.sin(a) * m}px)`)); });
  }, { passive: true });
  (function frame() { ctx.clearRect(0, 0, layer.width, layer.height); for (let i = ps.length - 1; i >= 0; i--) { const p = ps[i]; p.x += p.vx; p.y += p.vy; p.life -= 0.03; if (p.life <= 0) { ps.splice(i, 1); continue; } ctx.globalAlpha = p.life * 0.8; ctx.fillStyle = p.col; const s = p.r * p.life; ctx.beginPath(); ctx.moveTo(p.x, p.y - s * 2); ctx.quadraticCurveTo(p.x, p.y, p.x + s * 2, p.y); ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s * 2); ctx.quadraticCurveTo(p.x, p.y, p.x - s * 2, p.y); ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s * 2); ctx.fill(); } ctx.globalAlpha = 1; requestAnimationFrame(frame); })();
})();
/* scroll progress bar */
(function () { const bar = document.createElement("div"); bar.className = "scrollbar-top"; document.body.appendChild(bar); addEventListener("scroll", () => { const h = document.documentElement; bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 || 0) + "%"; bar.style.opacity = $(".navbar") ? 1 : 0; }, { passive: true }); })();

function enhanceLive(n) { const b = n.closest(".fc.boost"); if (b) { b.style.animation = "none"; void b.offsetWidth; b.style.animation = ""; } }

/* ---------- Scroll engine ---------- */
const SE = { els: [], scrubs: [], steps: null, lastY: 0, vel: 0, ticking: false, dots: null, secs: [] };
function scrollSetup(root) {
  SE.els = [...root.querySelectorAll("[data-px]")].map((el) => ({ el, f: parseFloat(el.dataset.px) }));
  SE.scrubs = [...root.querySelectorAll(".scrub")].map((p) => { if (!p.dataset.split) { p.dataset.split = 1; p.innerHTML = p.textContent.split(/(\s+)/).map((w) => (/\S/.test(w) ? `<span class="sw">${esc(w)}</span>` : w)).join(""); } return { el: p, words: [...p.querySelectorAll(".sw")] }; });
  SE.steps = root.querySelector(".steps.scrub-line");
  SE.secs = [...root.querySelectorAll(".section, .hero4")];
  // direction classes → reveal variants
  root.querySelectorAll(".from-left, .from-right, .mask").forEach((el) => el.classList.add("rv"));
  root.querySelectorAll(".features > .feat").forEach((el, i) => el.classList.add(i % 2 ? "flip" : "scale"));
  root.querySelectorAll(".creator-grid > .ccard").forEach((el, i) => el.classList.add(["from-left", "scale", "from-right"][i % 3]));
  root.querySelectorAll(".steps > .step").forEach((el) => el.classList.add("rot"));
  root.querySelectorAll(".faq2 > details").forEach((el, i) => el.classList.add(i % 2 ? "from-right" : "from-left"));
  // section dots + back to top
  let dots = $(".sec-progress"); if (!dots) { dots = document.createElement("div"); dots.className = "sec-progress"; document.body.appendChild(dots); }
  dots.innerHTML = SE.secs.map(() => "<i></i>").join(""); SE.dots = dots;
  let tt = $(".totop"); if (!tt) { tt = document.createElement("button"); tt.className = "totop"; tt.innerHTML = `<span class="ring"></span>${I.arrow}`; tt.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })); document.body.appendChild(tt); }
  scrollTick(true);
}
function scrollTick(force) {
  if (SE.ticking && !force) return; SE.ticking = true;
  requestAnimationFrame(() => {
    SE.ticking = false; const y = scrollY, vh = innerHeight; SE.vel = y - SE.lastY;
    const marketing = !!$(".navbar");
    // nav hide/show
    const nav = $(".navbar"); if (nav) { if (y > 240 && SE.vel > 4) nav.classList.add("hide"); else if (SE.vel < -2 || y < 240) nav.classList.remove("hide"); }
    if (reduceMotion) { SE.lastY = y; return; }
    // parallax
    SE.els.forEach(({ el, f }) => { const r = el.getBoundingClientRect(); const c = r.top + r.height / 2 - vh / 2; if (Math.abs(c) < vh * 1.5) el.style.transform = `translate3d(0, ${(-c * f).toFixed(1)}px, 0)${el.classList.contains("orb") && innerWidth > 760 ? " translateX(-50%)" : ""}`; });
    // text scrub
    SE.scrubs.forEach(({ el, words }) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35))); const n = Math.round(p * words.length); words.forEach((w, i) => w.classList.toggle("lit", i < n)); });
    // steps connector scrub
    if (SE.steps) { const r = SE.steps.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.9))); SE.steps.style.setProperty("--p", p.toFixed(3)); const ss = SE.steps.querySelectorAll(".step"); ss.forEach((s, i) => s.classList.toggle("lit", p >= (i + 0.5) / ss.length && p < (i + 1.5) / ss.length)); }
    // orb glow var
    const st = $(".hero4 .stage"); if (st) st.style.setProperty("--sp", Math.min(1, y / 600).toFixed(2));
    // marquee speed reacts to velocity
    const v = Math.min(1, Math.abs(SE.vel) / 60); document.querySelectorAll(".marquee").forEach((m) => m.style.setProperty("--mq", (28 - v * 20) + "s"));
    // section dots
    if (SE.dots) { SE.dots.classList.toggle("show", marketing && y > 300); let on = 0; SE.secs.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.5) on = i; }); [...SE.dots.children].forEach((d, i) => d.classList.toggle("on", i === on)); }
    // back to top ring
    const tt = $(".totop"); if (tt) { const h = document.documentElement; const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1); tt.classList.toggle("show", y > 600 && marketing); tt.style.setProperty("--p", (p * 100).toFixed(1) + "%"); }
    SE.lastY = y;
  });
}
addEventListener("scroll", () => scrollTick(), { passive: true });
addEventListener("resize", () => scrollTick(true));

function onScrollNav() { const n = $(".navbar"); if (n) n.classList.toggle("scrolled", scrollY > 8); }
window.addEventListener("scroll", onScrollNav, { passive: true });

/* ---------- Router ---------- */
let lastHash = null;
function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const sameView = hash === lastHash, keepY = sameView ? scrollY : 0; lastHash = hash; const [p0, p1, p2] = hash.split("/");
  let html;
  switch (p0 || "") {
    case "": html = pageHome(); break;
    case "how": html = pageHow(); break;
    case "pricing": html = pagePricing(); break;
    case "safety": html = pageSafety(); break;
    case "explore": html = pageExplore(false); break;
    case "creator": html = pageCreator(p1, p2); break;
    case "gift": html = pageGift(p1, p2); break;
    case "sent": html = pageThanks(p1); break;
    case "boost": html = pageBoost((p1 || "").split("?")[0], (p1 || "").includes("goal=1")); break;
    case "login": html = pageLogin(); break;
    case "signup": html = pageSignup(); break;
    case "feed": html = pageFeed(); break;
    case "account": html = p1 === "gifts" ? pageAccountGifts() : p1 === "following" ? pageFollowing() : p1 === "saved" ? pageSaved() : p1 === "settings" ? pageAccountSettings() : p1 === "badges" ? pageBadges("supporter") : p1 === "library" ? pageLibrary() : pageAccount(); break;
    case "dashboard": html = p1 === "badges" ? pageBadges("creator") : p1 === "page" ? pagePageEditor() : p1 === "wishlist" ? pageWishlist() : p1 === "gifts" ? pageGifts() : p1 === "thanks" ? pageThanksInbox() : p1 === "settings" ? pageSettings() : pageDashboard(); break;
    default: html = pageHome();
  }
  if (!sameView && lastHash !== null && !reduceMotion) { const f = document.createElement("div"); f.className = "route-flash"; document.body.appendChild(f); setTimeout(() => f.remove(), 400); }
  document.body.style.overflow = "";
  $("#root").innerHTML = html;
  window.scrollTo(0, keepY);
  if (sameView) $("#root").firstElementChild && $("#root").firstElementChild.style.setProperty("animation", "none");
  scrollSetup($("#root")); enhance(); onScrollNav();
}
window.addEventListener("hashchange", route);

/* ---------- Interactions (event delegation) ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-act],[data-save],[data-accent],[data-tint],[data-ssetting],[data-testi],[data-bamt],[data-coffee],[data-follow],[data-like],[data-cat],[data-feed],[data-how],[data-mode],[data-amt],[data-role],[data-int],[data-hide],[data-del],[data-thank],[data-thank-later],[data-setting]");
  if (!t) return;
  const d = t.dataset;
  if (d.act === "menu") { const dr = $("#drawer"); if (dr) { dr.classList.add("open"); document.body.style.overflow = "hidden"; } return; }
  if (d.act === "menu-close") { const dr = $("#drawer"); if (dr) { dr.classList.remove("open"); document.body.style.overflow = ""; } if (t.tagName !== "A") return; }
  if (d.act === "theme") { document.body.style.overflow = ""; setTheme(currentTheme() === "dark" ? "light" : "dark"); route(); return; }
  if (d.follow) { e.preventDefault(); state.following.has(d.follow) ? state.following.delete(d.follow) : state.following.add(d.follow); toast(state.following.has(d.follow) ? "Following " + findCreator(d.follow).name : "Unfollowed"); route(); return; }
  if (d.like) { state.liked.has(d.like) ? state.liked.delete(d.like) : state.liked.add(d.like); route(); return; }
  if (d.cat) { exploreCat = d.cat; route(); return; }
  if (d.feed) { feedTab = d.feed; route(); return; }
  if (d.how) { $("#how-body").innerHTML = d.how === "creator" ? howCreator() : howSupporter(); [...$("#how-tabs").children].forEach((b) => b.classList.toggle("on", b === t)); return; }
  if (d.mode) { co.mode = d.mode; route(); return; }
  if (d.testi) { testiTab = d.testi; route(); return; }
  if (d.coffee) { bo.amount = Number(d.coffee); go("boost/" + d.ch); return; }
  if (d.buy) { const c = creators.find((cc) => (cc.shop || []).some((s) => s.id === d.buy)); const s = c.shop.find((x) => x.id === d.buy); state.supporter.sent.unshift({ to: c.handle, kind: "shop", item: s.title, amount: s.price, anon: false, msg: "", when: "Just now", step: 1 }); heartBurst(e.clientX, e.clientY, "#6f55e3"); toast("Delivered to your library — instantly"); return; }
  if (d.act === "unlock-nsfw") { state.settings.showNsfw = true; toast("Adult content shown — change this in Settings"); route(); return; }
  if (d.save) { e.preventDefault(); const S = state.supporter.saved; S.has(d.save) ? S.delete(d.save) : S.add(d.save); toast(S.has(d.save) ? "Saved for later" : "Removed from saved"); route(); return; }
  if (d.act === "switch-role") { state.role = state.role === "supporter" ? "creator" : "supporter"; go(state.role === "supporter" ? "account" : "dashboard"); toast("Now viewing as " + (state.role === "supporter" ? "@" + state.supporter.handle : "@" + state.user.handle)); return; }
  if (d.act === "ob-finish") { state.role = ob.role === "creator" ? "creator" : "supporter"; return; }
  if (d.accent) { readEditor(); myCreator().theme.accent = d.accent; route(); return; }
  if (d.tint) { readEditor(); myCreator().tint = Number(d.tint); route(); return; }
  if (d.act === "add-link") { readEditor(); (myCreator().links = myCreator().links || []).push(""); route(); return; }
  if (d.act === "save-page") { readEditor(); toast("Page saved ♡"); route(); return; }
  if (d.ssetting) { if (d.ssetting === "anonDefault") state.supporter.anonDefault = !state.supporter.anonDefault; t.classList.toggle("on"); return; }
  if (d.act === "save-supporter") { state.supporter.name = $("#sa-name").value.trim() || state.supporter.name; state.supporter.bio = $("#sa-bio").value.trim(); toast("Saved"); route(); return; }
  if (d.bamt) { bo.amount = Number(d.bamt); route(); return; }
  if (d.act === "banon") { bo.anon = !bo.anon; route(); return; }
  if (d.act === "boost-pay") { const handle = location.hash.split("/")[2].split("?")[0]; const c = findCreator(handle); if (bo.goal && c.goal) c.goal.raised = Math.min(c.goal.target, c.goal.raised + bo.amount); (c.boosts = c.boosts || []).unshift({ from: bo.anon ? "Anonymous" : "you", amount: bo.amount, msg: bo.msg || "Keep creating!", when: "now" }); if (c.handle === state.user.handle) state.gifts.unshift({ id: "g" + Date.now(), from: bo.anon ? "Anonymous" : "you", anon: bo.anon, item: bo.goal ? "Goal: " + c.goal.title : "Boost", amount: bo.amount, msg: bo.msg, when: "Just now", status: "Contribution", thanked: false }); state.supporter.sent.unshift({ to: handle, kind: "boost", item: bo.goal && c.goal ? "Goal: " + c.goal.title : "Boost", amount: bo.amount, anon: bo.anon, msg: bo.msg, when: "Just now", step: 1, thanked: false }); bo.msg = ""; go("sent/" + handle); return; }
  if (d.amt) { co.amount = Number(d.amt); route(); return; }
  if (d.act === "anon") { co.anon = !co.anon; route(); return; }
  if (d.act === "pay") {
    const [, , handle, id] = location.hash.split("/"); const c = findCreator(handle); const w = c.wishlist.find((x) => x.id === id);
    if (co.mode === "contrib") { w.raised = Math.min(w.price, (w.raised || 0) + co.amount); if (w.raised >= w.price) w.done = true; } else { w.done = true; w.raised = w.price; }
    if (c.handle === state.user.handle) state.gifts.unshift({ id: "g" + Date.now(), from: co.anon ? "Anonymous" : (co.name || "you").replace(/^@/, ""), anon: co.anon, item: w.title + (co.mode === "contrib" ? " (contribution)" : ""), amount: co.mode === "contrib" ? co.amount : w.price, msg: co.msg, when: "Just now", status: co.mode === "contrib" ? "Contribution" : "Shipped", thanked: false });
    state.supporter.sent.unshift({ to: handle, kind: co.mode === "contrib" ? "contribution" : "gift", item: w.title, amount: co.mode === "contrib" ? co.amount : w.price, anon: co.anon, msg: co.msg, when: "Just now", step: 0, thanked: false });
    co.item = null; go("sent/" + handle); return;
  }
  if (d.act === "login") { go(state.role === "supporter" ? "account" : "feed"); toast("Welcome back, " + state.user.name.split(" ")[0]); return; }
  if (d.act === "ob-next") { ob.step += 1; route(); return; }
  if (d.act === "ob-skip") { ob.step = 3; route(); return; }
  if (d.role) { ob.role = d.role; route(); return; }
  if (d.int) { ob.interests.has(d.int) ? ob.interests.delete(d.int) : ob.interests.add(d.int); route(); return; }
  if (d.hide) { state.wishVisibility[d.hide] = state.wishVisibility[d.hide] === false ? true : false; toast(state.wishVisibility[d.hide] === false ? "Wish hidden from your page" : "Wish visible again"); route(); return; }
  if (d.del) { openModal(`<h3>Remove this wish?</h3><p class="muted">If anyone contributed toward it, they'll be refunded automatically.</p><div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-ghost" data-act="close-modal">Keep it</button><button class="btn btn-primary" data-act="confirm-del" data-id="${d.del}">Remove</button></div>`); return; }
  if (d.act === "confirm-del") { const c = myCreator(); c.wishlist = c.wishlist.filter((w) => w.id !== d.id); closeModal(); toast("Wish removed"); route(); return; }
  if (d.act === "add-wish") { openModal(`<h3>Add a wish</h3><div class="field"><label>Product link</label><input id="nw-url" placeholder="https://store.com/product"><span class="hint">We'll pull the title and price. Any store works.</span></div><div class="row2"><div class="field"><label>Title</label><input id="nw-title" placeholder="What is it?"></div><div class="field"><label>Price (USD)</label><input id="nw-price" type="number" min="1" placeholder="0"></div></div><div class="field"><label>Why you want it</label><input id="nw-why" placeholder="One honest line. Supporters read this."></div><div class="toggle" style="border:0;padding:6px 0"><div><b>Let supporters contribute together</b><small>Good for anything over about $150.</small></div><button class="switch" id="nw-contrib" onclick="this.classList.toggle('on')" aria-label="Contribute together"></button></div><div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-ghost" data-act="close-modal">Cancel</button><button class="btn btn-primary" data-act="save-wish">Add to wishlist</button></div>`); return; }
  if (d.act === "save-wish") { const title = $("#nw-title").value.trim(), price = Number($("#nw-price").value); if (!title || !price) { toast("Add a title and a price"); return; } let store = "Store"; try { store = new URL($("#nw-url").value).hostname.replace(/^www\./, "").split(".")[0]; store = store[0].toUpperCase() + store.slice(1); } catch (err) {} myCreator().wishlist.unshift({ id: "w" + Date.now(), title, store, price, icon: "sparkle", why: $("#nw-why").value.trim() || "Because.", contrib: $("#nw-contrib").classList.contains("on"), raised: 0 }); closeModal(); toast("Added to your wishlist"); route(); return; }
  if (d.act === "edit-wish") { toast("Editing opens the same form in the full app"); return; }
  if (d.act === "close-modal") { closeModal(); return; }
  if (d.act === "toggle-public") { state.settings.publicWishlist = !state.settings.publicWishlist; toast(state.settings.publicWishlist ? "Wishlist is public" : "Wishlist paused — supporters see your page without wishes"); route(); return; }
  if (d.thank) { const g = state.gifts.find((x) => x.id === d.thank); const text = $(`[data-thanks-text="${d.thank}"]`).value.trim(); if (!text) { toast("Write a line first"); return; } g.thanked = true; state.thanks.unshift({ gift: g.item, text, when: "Just now" }); toast("Posted to your page ♡"); route(); return; }
  if (d.thankLater) { toast("Kept in your inbox"); return; }
  if (d.setting) { state.settings[d.setting] = !state.settings[d.setting]; route(); return; }
  if (d.act === "save-profile") { state.user.name = $("#set-name").value.trim() || state.user.name; myCreator().name = state.user.name; toast("Saved"); route(); return; }
  if (d.act === "dl") { toast("Download started"); return; }
  if (d.act === "shoutout") { co.shout = !co.shout; route(); return; }
  if (d.act === "copy") { toast("Link copied: bakaboost.app/" + state.user.handle); return; }
  if (d.act === "new-post") { return; }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "explore-q") { exploreQ = e.target.value; const v = e.target.value; route(); const i = $("#explore-q"); i.focus(); i.setSelectionRange(v.length, v.length); }
  if (e.target.id === "co-msg") co.msg = e.target.value;
  if (/^pe-/.test(e.target.id) || e.target.dataset.link !== undefined) { clearTimeout(window._pe); window._pe = setTimeout(() => { const el = document.activeElement, id = el && el.id, pos = el && el.selectionStart; readEditor(); route(); if (id) { const n = $("#" + id); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (err) {} } } }, 400); }
  if (e.target.id === "bo-msg") bo.msg = e.target.value;
  if (e.target.id === "co-name") co.name = e.target.value;
  if (e.target.id === "co-custom") { const v = Number(e.target.value); if (v > 0) co.amount = v; }
});
document.addEventListener("change", (e) => { if (e.target.id === "co-custom") route(); });
function openModal(inner) { const m = document.createElement("div"); m.className = "modal-bg"; m.id = "modal"; m.innerHTML = `<div class="modal">${inner}</div>`; m.addEventListener("click", (e) => { if (e.target === m) closeModal(); }); document.body.appendChild(m); }
function closeModal() { const m = $("#modal"); if (m) m.remove(); }

(function () { let t = "light"; try { t = localStorage.getItem("bb-theme") || "light"; } catch (e) {} document.documentElement.setAttribute("data-theme", t); })();
route();
