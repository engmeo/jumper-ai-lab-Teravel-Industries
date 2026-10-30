import React, { useEffect, useRef, useState } from 'react';
import { Home as HomeIcon, Newspaper, LogIn, LayoutDashboard, ArrowRight, ArrowUpRight, BookOpen, Building2, Users, Pause, Play, RotateCcw, Hand, Menu, X } from 'lucide-react';
import { Brand, ThemeSwitch } from './theme';

function TeraRobot({ controls, onReady }) {
  const host = useRef(null), viewer = useRef(null), pausedRef = useRef(false);
  const [ready,setReady] = useState(false), [error,setError] = useState(false), [greeting,setGreeting] = useState('Xin chào, mình là TERA!');
  const [paused,setPaused] = useState(()=>{try{return localStorage.getItem('nova-motion-paused')==='true';}catch{return false;}});
  const [claws,setClaws] = useState({LF:false,RF:false});
  pausedRef.current = paused;
  useEffect(()=>{
    let active=true, mounted=null;
    import('./robot').then(({mountRobot})=>mountRobot(host.current,{
      paused:()=>pausedRef.current,
      onReady:()=>{if(active){setReady(true);onReady(true);}},
      onError:()=>{if(active)setError(true);},
      onClaw:(side,open)=>{if(active){setClaws(v=>({...v,[side]:open}));setGreeting(`${side==='LF'?'Càng trái':'Càng phải'} đã ${open?'mở':'đóng'}.`);}}
    })).then(api=>{mounted=api;if(active)viewer.current=api;else api?.dispose();}).catch(()=>{if(active)setError(true);});
    return()=>{active=false;mounted?.dispose();viewer.current=null;controls.current=null;};
  },[]);
  function motion(next){pausedRef.current=next;setPaused(next);try{localStorage.setItem('nova-motion-paused',String(next));}catch{}viewer.current?.refresh();}
  function hello(){if(pausedRef.current)motion(false);viewer.current?.wave();setGreeting('Tera chào bạn. Cùng tạo nên điều mới!');}
  useEffect(()=>{controls.current={hello};});
  return <div className="tera-scene">
    <div className="sr-only" aria-live="polite">{greeting}</div>
    <div id="robot-view" ref={host} tabIndex={0} role="group" aria-label="Cua Tera 3D. Kéo để xoay, cuộn hoặc chụm để zoom. Bấm càng để mở đóng. Phím mũi tên để xoay, Home đặt lại, Enter để chào.">{!ready&&!error&&<span className="model-message">Đang tải cua Tera…</span>}</div>
    {error&&<p className="model-message" role="status">Chưa tải được mô hình 3D. Hãy tải lại trang để thử lại.</p>}
    <div className="tera-controls"><span>Kéo xoay · Cuộn/chụm để zoom</span><button disabled={!ready||error} className="icon-button icon-hint" data-tooltip={paused?'Tiếp tục chuyển động':'Tạm dừng chuyển động'} onClick={()=>motion(!paused)} aria-label={paused?'Tiếp tục chuyển động':'Tạm dừng chuyển động'} aria-pressed={paused}>{paused?<Play size={18}/>:<Pause size={18}/>}</button><button disabled={!ready||error} className="icon-button icon-hint" data-tooltip="Đặt lại góc nhìn" aria-label="Đặt lại góc nhìn" onClick={()=>viewer.current?.reset()}><RotateCcw size={18}/></button></div>
    <div className="tera-actions">{[['LF','Càng trái'],['RF','Càng phải']].map(([side,label])=><button key={side} className="claw-button" disabled={!ready||error} aria-pressed={claws[side]} onClick={()=>viewer.current?.toggleClaw(side)}>{label}</button>)}</div>
  </div>;
}

export default function Home({ signedIn }) {
  const [menu,setMenu] = useState(false);
  const controls=useRef(null), [robotReady,setRobotReady]=useState(false);
  const news=[
    {id:'welcome',Icon:Building2,title:'Chào mừng thành viên mới',text:'Cùng tìm hiểu Teravel Industries và cách đội ngũ làm việc.'},
    {id:'guides',Icon:Users,title:'Cập nhật tài liệu hướng dẫn',text:'Tài liệu công việc theo vai trò trong dự án Jumper AI Lab.'},
    {id:'learning',Icon:BookOpen,title:'Không gian học cho thành viên mới',text:'Bắt đầu từ hướng dẫn, thực hành và phối hợp cùng nhóm.'},
  ];
  useEffect(()=>{document.title='Teravel Industries — Trang chủ';},[]);
  return <div className="home-page">
    <a className="skip-link" href="#home-content">Đến nội dung chính</a>
    <header className="home-header"><Brand/><nav aria-label="Điều hướng chính" className={menu?'is-open':''}><a className="icon-button icon-hint" href="#/" aria-current="page" aria-label="Trang chủ" data-tooltip="Trang chủ"><HomeIcon size={21} aria-hidden="true"/></a><a className="icon-button icon-hint" aria-label="Tin công ty" data-tooltip="Tin công ty" href="#news" onClick={e=>{e.preventDefault();document.getElementById('news')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});setMenu(false);}}><Newspaper size={21} aria-hidden="true"/></a></nav><div className="header-actions"><a className="icon-button icon-hint home-login" href="#/workspace" aria-label={signedIn?'Vào không gian làm việc':'Đăng nhập'} data-tooltip={signedIn?'Vào không gian làm việc':'Đăng nhập'}>{signedIn?<LayoutDashboard size={21} aria-hidden="true"/>:<LogIn size={21} aria-hidden="true"/>}</a><ThemeSwitch/><button className="icon-button home-menu" aria-label={menu?'Đóng menu':'Mở menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
    <main id="home-content"><section className="home-hero"><div className="hero-copy"><h1>Kết nối đội ngũ.<br/>Cùng tạo nên điều mới.</h1><p>Học từng bước. Làm việc cùng nhau.</p><div className="hero-buttons"><a className="primary-btn hero-cta" href="#/workspace">Vào không gian làm việc <ArrowRight size={20}/></a><button id="say-hi" disabled={!robotReady} className="secondary-btn hero-hello" onClick={()=>controls.current?.hello()}><Hand size={18}/> Chào Tera</button></div></div><TeraRobot controls={controls} onReady={setRobotReady}/></section>
    <section id="news" className="company-news"><div className="section-title"><h2>Tin công ty</h2><span className="sample-label">NỘI DUNG MINH HỌA</span></div><div className="news-grid">{news.map(({id,Icon,title,text})=><article key={id} className="news-card"><div className={`news-art news-art-${id}`} aria-hidden="true"><Icon size={44}/></div><div><span className="news-category">TERAVEL INDUSTRIES</span><h3>{title}</h3><p>{text}</p></div></article>)}</div><p className="news-note">Thông tin công ty sẽ được cập nhật tại đây bởi người quản trị.</p></section></main>
    <footer className="home-footer"><Brand compact/><span>Teravel Industries · Jumper AI Lab</span><a href="#/workspace">Vào không gian làm việc <ArrowUpRight size={15}/></a></footer>
  </div>;
}
