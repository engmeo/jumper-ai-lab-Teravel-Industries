import React, { useState } from 'react';
import { ArrowRight, Bell, BookOpen, CalendarDays, ClipboardList, FileText, Folder, MessageCircle, Plus, Users } from 'lucide-react';

export default function WorkspaceOverview({ tasks, profile, onTask, onPage, notify }) {
  const [day, setDay] = useState(null);
  const mine = tasks.filter(t=>t.assignee_id===profile.id && t.status!=='Hoàn thành');
  const next = mine.find(t=>t.status==='Đang làm') || mine[0];
  const reviews = tasks.filter(t=>t.status==='Chờ review');
  const days = Array.from({length:7},(_,i)=>{
    const date=new Date(); date.setHours(12,0,0,0); date.setDate(date.getDate()+i);
    const key=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    return {key,label:date.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit'}),count:tasks.filter(t=>t.due_date===key).length};
  });
  const upcoming=(day?tasks.filter(t=>t.due_date===day):mine.filter(t=>t.id!==next?.id)).slice(0,4);
  return <section className="overview-start">
    <h1>Hôm nay, bắt đầu từ đâu?</h1>
    <div className="focus-task">
      <span className="focus-icon"><ClipboardList size={32}/></span>
      <div><span className="task-kicker">{next?'VIỆC ĐƯỢC GIAO':'SẴN SÀNG BẮT ĐẦU'}</span><h2>{next?.title||'Khám phá hướng dẫn công việc'}</h2><p>{next?`Trạng thái: ${next.status}`:'Bạn chưa có nhiệm vụ đang chờ. Đọc hướng dẫn để chuẩn bị.'}</p></div>
      <button className="primary-btn" onClick={()=>next?onTask({...next}):onPage('Hướng dẫn')}>{next?'Tiếp tục':'Mở hướng dẫn'} <ArrowRight size={18}/></button>
    </div>
    <div className="week-caption"><span><CalendarDays size={16}/> Hạn công việc · 7 ngày tới</span>{day&&<button className="text-btn" onClick={()=>setDay(null)}>Bỏ lọc ngày</button>}</div>
    <div className="week-strip">{days.map((d,i)=><button key={d.key} aria-pressed={day===d.key} onClick={()=>setDay(day===d.key?null:d.key)}><span>{i===0?'Hôm nay':d.label}</span><small>{d.count?`${d.count} nhiệm vụ`:'Chưa có hạn'}</small></button>)}</div>
    <div className="overview-columns"><div>
      <div className="quick-actions">
        <button className="action-tile add-tile" aria-label="Thêm tài liệu — chưa kết nối kho lưu trữ" onClick={()=>notify('Kho tải tệp chưa được kết nối. Hiện bạn có thể đọc tài liệu dự án trong mục Tài liệu.')}><Plus size={40}/><span>Thêm tài liệu</span><small>Chưa kết nối</small><span className="tile-tooltip" aria-hidden="true">Thêm tài liệu · Chưa kết nối kho tệp</span></button>
        <button className="action-tile" onClick={()=>onPage('Tài liệu')}><Folder size={32}/><span>Tài liệu</span></button>
        <button className="action-tile" aria-label="Trao đổi — chưa tích hợp chat" onClick={()=>notify('Chat nhóm chưa được tích hợp trong bản này.')}><MessageCircle size={32}/><span>Trao đổi</span><small>Chưa tích hợp</small></button>
        <button className="action-tile" onClick={()=>onPage('Các nhóm')}><Users size={32}/><span>Nhóm</span></button>
      </div>
      <h3 className="next-heading">{day?`Công việc đến hạn ${days.find(d=>d.key===day)?.label}`:'Nhiệm vụ tiếp theo'}</h3>
      <div className="next-tasks">{upcoming.length?upcoming.map(t=><button key={t.id} onClick={()=>onTask({...t})}><FileText size={21}/><span>{t.title}</span><ArrowRight size={17}/></button>):<div className="next-empty">{day?'Chưa có nhiệm vụ đến hạn trong ngày này.':'Chưa có nhiệm vụ tiếp theo.'}</div>}<button onClick={()=>onPage('Hướng dẫn')}><BookOpen size={21}/><span>Mở hướng dẫn theo vai trò</span><ArrowRight size={17}/></button></div>
    </div><aside className="attention-card"><h3><Bell size={20}/> Cần chú ý</h3><div className={reviews.length?'review-notice':'no-notice'}><FileText size={24}/><div><b>{reviews.length?`${reviews.length} nhiệm vụ chờ review`:'Chưa có việc chờ review'}</b><p>{reviews.length?'Xem kết quả và phản hồi của nhóm.':'Thông báo dựa trên nhiệm vụ thực tế của bạn.'}</p>{reviews.length>0&&<button className="text-btn" onClick={()=>onTask({...reviews[0]})}>Xem nhiệm vụ <ArrowRight size={15}/></button>}</div></div></aside></div>
  </section>;
}
