import React, { useEffect, useMemo, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, FileText, Search } from 'lucide-react';

// Read the tracked source documents directly; no rewritten or invented lessons.
const sources = import.meta.glob('../docs/**/*.md', { query:'?raw', import:'default', eager:true });
const documents = Object.entries(sources).map(([path,content])=>({
  id:path.replace('../',''), content, title:(content.match(/^#{1,2}\s+(.+)$/m)?.[1]||path.split('/').pop()).replace(/^\d+\.\s*/,''),
  role:path.includes('/roles/'),
})).sort((a,b)=>a.id.localeCompare(b.id));

function splitSections(content){
  const parts=content.split(/(?=^#{2,3} )/m);
  return parts.filter(s=>s.trim()).map((text,i)=>({title:i===0?'Giới thiệu':text.match(/^#{2,3} (.+)/)?.[1]||'Nội dung',text}));
}
export default function Documentation({ userId }) {
  const key=`teravel-reading:${userId}`;
  const [query,setQuery]=useState('');
  const [reading,setReading]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem(key));if(documents.some(d=>d.id===saved?.id))return saved;}catch{}return {id:null,section:0};});
  const selected=documents.find(d=>d.id===reading.id);
  const sections=useMemo(()=>selected?splitSections(selected.content):[],[selected]);
  const section=Math.max(0,Math.min(Number.isInteger(reading.section)?reading.section:0,sections.length-1));
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(reading));}catch{}},[reading,key]);
  function open(id){setReading({id,section:0});}
  function link(href){
    if(!href)return '#';
    if(href.startsWith('#'))return `https://github.com/engmeo/jumper-ai-lab-Teravel-Industries/blob/main/${selected.id}${href}`;
    if(/^(https?:|mailto:)/i.test(href))return href;
    return new URL(href,`https://github.com/engmeo/jumper-ai-lab-Teravel-Industries/blob/main/${selected.id}`).href;
  }
  if(!selected)return <section className="document-library"><div className="library-heading"><div><h2>Hướng dẫn công việc</h2><p>Nội dung từ bộ tài liệu Jumper AI Lab. Chọn tài liệu để bắt đầu đọc.</p></div><label className="searchbox"><Search size={18}/><input aria-label="Tìm hướng dẫn" placeholder="Tìm theo tên hoặc nội dung…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div><div className="docs-grid">{documents.filter(d=>(d.title+' '+d.content).toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi'))).map((d,i)=><button key={d.id} className="panel doc-card" onClick={()=>open(d.id)}><span className="doc-symbol"><BookOpen size={22}/></span><span className="doc-kind">{d.role?'HƯỚNG DẪN VAI TRÒ':'TỔNG QUAN'}</span><h3>{d.title}</h3><span className="doc-open">Đọc hướng dẫn <ArrowUpRight size={17}/></span></button>)}</div>{!documents.some(d=>(d.title+' '+d.content).toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')))&&<p className="empty-state">Không tìm thấy tài liệu phù hợp.</p>}</section>;
  return <section className="guide"><div className="guide-heading"><button className="text-btn" onClick={()=>open(null)}><ArrowLeft size={17}/> Tất cả hướng dẫn</button><h2>{selected.title}</h2></div><div className="guide-layout"><nav className="guide-toc" aria-label="Mục lục tài liệu"><h3>Các phần hướng dẫn</h3>{sections.map((s,i)=><button key={i} aria-current={i===section?'step':undefined} onClick={()=>setReading({...reading,section:i})}><span>{i+1}</span>{s.title}</button>)}</nav><article className="guide-article"><div className="guide-position">MỤC {section+1} / {sections.length}</div><div className="markdown"><Markdown remarkPlugins={[remarkGfm]} components={{a:({href,children})=><a href={link(href)} target="_blank" rel="noreferrer">{children}</a>,img:({src,alt})=><img src={link(src).replace('/blob/','/raw/')} alt={alt||''} loading="lazy"/>}}>{sections[section]?.text}</Markdown></div><div className="guide-pagination"><button className="secondary-btn" disabled={section===0} onClick={()=>setReading({...reading,section:section-1})}><ArrowLeft size={16}/> Quay lại</button><button className="primary-btn" disabled={section===sections.length-1} onClick={()=>setReading({...reading,section:section+1})}>Lưu và đọc tiếp <ArrowRight size={16}/></button></div></article><aside className="guide-support"><div className="panel"><FileText size={22}/><h3>Tài liệu gốc</h3><p>Nội dung được giữ nguyên từ repository của dự án.</p><a href={`https://github.com/engmeo/jumper-ai-lab-Teravel-Industries/blob/main/${selected.id}`} target="_blank" rel="noreferrer">Xem trên GitHub <ArrowUpRight size={15}/></a></div><div className="panel"><BookOpen size={22}/><h3>Đọc tiếp lần sau</h3><p>Vị trí đọc được lưu trên trình duyệt này cho tài khoản của bạn.</p><small>Vị trí đọc không phải kết quả nghiệm thu nhiệm vụ.</small></div></aside></div></section>;
}
