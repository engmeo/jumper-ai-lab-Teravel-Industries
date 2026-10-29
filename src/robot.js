import * as THREE from './vendor/three.module.min.js';

// Jumper geometry and topology are derived from the supplied STL/URDF.
// Copyright 2026 KingKong Robotics, Apache-2.0. See assets/jumper/NOTICE.txt.
const MODEL_URL = '/tera/assets/jumper/model.json';
const MESH_URL = '/tera/assets/jumper/meshes.bin.gz';
const clamp = THREE.MathUtils.clamp;

async function loadJumper() {
  const [manifestResponse, meshResponse] = await Promise.all([fetch(MODEL_URL), fetch(MESH_URL)]);
  if (!manifestResponse.ok || !meshResponse.ok) throw new Error('Không tải được mô hình Jumper.');
  const data = await manifestResponse.json();
  const packed = await meshResponse.arrayBuffer();
  const buffer = await new Response(new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  if (buffer.byteLength !== data.optimization.binaryBytes) throw new Error('Dữ liệu mô hình chưa đầy đủ.');
  const white = new THREE.MeshStandardMaterial({color:0xf4f2ff, roughness:.36, metalness:.18});
  const purple = new THREE.MeshStandardMaterial({color:0x6955ce, roughness:.36, metalness:.24});
  const mint = new THREE.MeshStandardMaterial({color:0x9ee3cd, roughness:.45, metalness:.1});
  const dark = new THREE.MeshStandardMaterial({color:0x242739, roughness:.32, metalness:.25});
  const screen = new THREE.MeshBasicMaterial({color:0x20243c});
  const metal = new THREE.MeshStandardMaterial({color:0xb9b7ce, roughness:.32, metalness:.55});
  const links = new Map(), joints = new Map(), meshes = [];
  function material(name) {
    if (/display/.test(name)) return screen;
    if (/camera|sensor/.test(name)) return dark;
    if (/grip_insert|foot_tip|finger_tip|palm_pad/.test(name)) return mint;
    if (/base_link|hip_link|shoulder|finger_link/.test(name)) return purple;
    if (/thigh|forearm/.test(name)) return metal;
    return white;
  }
  function origin(group, xyz, rpy) {
    group.position.fromArray(xyz);
    // URDF fixed-axis RPY = Rz(yaw) * Ry(pitch) * Rx(roll).
    group.quaternion.setFromEuler(new THREE.Euler(...rpy, 'ZYX'));
  }
  for (const l of data.links) {
    const group = new THREE.Group(); group.name = l.name; links.set(l.name, group);
    for (const v of l.visuals) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(buffer, v.positionOffset, v.vertices*3), 3));
      geometry.setAttribute('normal', new THREE.BufferAttribute(new Int16Array(buffer, v.normalOffset, v.vertices*3), 3, true));
      const Index = v.indexType === 'u16' ? Uint16Array : Uint32Array;
      geometry.setIndex(new THREE.BufferAttribute(new Index(buffer,v.indexOffset,v.indices),1));
      geometry.computeBoundingSphere();
      const mesh = new THREE.Mesh(geometry,material(l.name)); mesh.name = l.name + '_visual';
      origin(mesh,v.xyz,v.rpy); mesh.scale.fromArray(v.scale);
      if (/^(LF|RF)_(palm|finger)/.test(l.name)) mesh.userData.claw = l.name.slice(0,2);
      group.add(mesh); meshes.push(mesh);
    }
  }
  for (const j of data.joints) {
    const anchor = new THREE.Group(), pivot = new THREE.Group(); anchor.name = j.name + '_anchor'; pivot.name = j.name;
    origin(anchor,j.xyz,j.rpy); anchor.add(pivot); pivot.add(links.get(j.child)); links.get(j.parent).add(anchor);
    joints.set(j.name,{anchor,pivot,axis:new THREE.Vector3(...j.axis).normalize(),limit:j.displayLimit || j.limit,home:data.home[j.name] || 0,angle:0});
  }
  function setJoint(name, angle) {
    const j = joints.get(name); if (!j || !j.limit) return;
    j.angle = clamp(angle, ...j.limit); j.pivot.quaternion.setFromAxisAngle(j.axis,j.angle);
  }
  for (const [name,angle] of Object.entries(data.home)) setJoint(name,angle);
  // A friendly expression sits on the original display; every part is geometry.
  const display = links.get('display_module_link');
  const glow = new THREE.MeshStandardMaterial({color:0x9dffe1,emissive:0x62f0bd,emissiveIntensity:.65,roughness:.4});
  const eyes = [];
  for (const y of [-.021,.021]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(1,20,12),glow);
    eye.position.set(.0115,y,-.001); eye.scale.set(.002,.007,.0065); display.add(eye); eyes.push(eye);
  }
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(.012,-.009,-.010),new THREE.Vector3(.013,0,-.015),new THREE.Vector3(.012,.009,-.010));
  display.add(new THREE.Mesh(new THREE.TubeGeometry(curve,20,.001,6,false),glow));
  const robot = new THREE.Group(), basis = new THREE.Group();
  // Z-up, X-forward -> Three.js Y-up, Z-forward. A proper rotation (det = +1).
  basis.quaternion.setFromRotationMatrix(new THREE.Matrix4().set(0,1,0,0, 0,0,1,0, 1,0,0,0, 0,0,0,1));
  basis.add(links.get('base_link')); robot.add(basis); robot.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(robot), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
  const scale = 4 / Math.max(size.x,size.y,size.z); basis.scale.setScalar(scale); basis.position.copy(center).multiplyScalar(-scale); robot.updateMatrixWorld(true);
  return {robot,basis,links,joints,meshes,eyes,setJoint,data};
}

export async function mountRobot(container,{paused,onReady,onError,onClaw}) {
  let renderer,model,disposed=false;
  try {
    renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
    renderer.setClearColor(0x000000,0); renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.2;
    renderer.domElement.setAttribute('role','img');
    renderer.domElement.setAttribute('aria-label','Cua robot Jumper 3D màu trắng, tím và mint. Kéo để xoay mọi phía, cuộn hoặc chụm để zoom, bấm càng để mở đóng.');
    container.append(renderer.domElement);
    model = await loadJumper();
  } catch(error) { renderer?.dispose(); onError(error); return null; }
  const scene = new THREE.Scene(); scene.add(model.robot);
  scene.add(new THREE.HemisphereLight(0xf5f2ff,0x8e85b6,2.7));
  for (const [color,intensity,position] of [[0xfff9ee,3.4,[-4,6,6]],[0xb5b0ff,2,[4,3,-4]],[0xc5fff1,1.3,[-3,-3,2]]]) {
    const light=new THREE.DirectionalLight(color,intensity);light.position.set(...position);scene.add(light);
  }
  // No floor or plinth: the underside remains visible throughout orbit.
  const camera=new THREE.PerspectiveCamera(35,1,.05,100), target=new THREE.Vector3(0,.05,0);
  let yaw=.42, polar=1.03, distance=8.0, defaultDistance=8.0, userControlled=false;
  let phase=0, waveTime=null, frame=0, last=performance.now(), visible=true;
  const open={LF:false,RF:false}, clawAngles={LF:0,RF:0};
  const pointers=new Map();let gesture=null,pinchDistance=0;
  const raycaster=new THREE.Raycaster(), pointer=new THREE.Vector2();
  const mq=matchMedia('(prefers-reduced-motion: reduce)');let reduced=mq.matches;
  let interactionSerial=0;
  function updateCamera() {
    polar=clamp(polar,.025,Math.PI-.025);distance=clamp(distance,3.4,15);
    camera.position.set(target.x+distance*Math.sin(polar)*Math.sin(yaw),target.y+distance*Math.cos(polar),target.z+distance*Math.sin(polar)*Math.cos(yaw));camera.lookAt(target);camera.updateMatrixWorld();
  }
  function render(){if(disposed)return;updateCamera();renderer.render(scene,camera);}
  function setPose(dt) {
    const animated=!paused()&&!reduced;
    if(animated) {
      phase+=dt;
      model.robot.position.y=Math.sin(phase*1.35)*.018;
      if(!userControlled)yaw+=dt*.045;
    }
    if(waveTime!==null && !paused()) {
      waveTime+=dt;
      const duration=reduced?1.5:5.0;
      const t=clamp(waveTime/duration,0,1)*(model.data.wave.samples.length-1),i=Math.floor(t),j=Math.min(i+1,model.data.wave.samples.length-1);
      model.data.wave.joints.forEach((name,k)=>model.setJoint(name,THREE.MathUtils.lerp(model.data.wave.samples[i][k],model.data.wave.samples[j][k],t-i)));
      if(waveTime>=duration){waveTime=null;model.data.wave.joints.forEach(name=>model.setJoint(name,model.data.home[name]));}
    }
    if(!paused()) for(const side of ['LF','RF']) {
      const wanted=open[side]?(side==='LF'?-1.05:1.05):0;
      clawAngles[side]=reduced?wanted:THREE.MathUtils.damp(clawAngles[side],wanted,12,dt);
      if(Math.abs(clawAngles[side]-wanted)<.001)clawAngles[side]=wanted;
      model.setJoint(side+'_J4_joint',clawAngles[side]);
    }
  }
  function hasMotion(){return !paused()&&(!reduced||waveTime!==null||['LF','RF'].some(s=>Math.abs(clawAngles[s]-(open[s]?(s==='LF'?-1.05:1.05):0))>.001));}
  function tick(now){frame=0;if(disposed||!visible||document.hidden)return;const dt=Math.min((now-last)/1000,.05);last=now;setPose(dt);render();if(hasMotion())frame=requestAnimationFrame(tick);}
  function wake(){if(!frame&&!disposed&&visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}}
  function control(){userControlled=true;interactionSerial++;}
  function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();defaultDistance=camera.aspect<.9?9.3:8;if(!userControlled)distance=defaultDistance;render();}
  function pick(x,y){const r=container.getBoundingClientRect();pointer.set((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1);model.robot.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(model.meshes,false)[0];return hit?.object.userData.claw || null;}
  function toggleClaw(side){if(!model||disposed)return;open[side]=!open[side];control();if(paused()||reduced){clawAngles[side]=open[side]?(side==='LF'?-1.05:1.05):0;model.setJoint(side+'_J4_joint',clawAngles[side]);render();}onClaw?.(side,open[side]);wake();}
  function pinchLength(){const p=[...pointers.values()];return p.length>=2?Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y):0;}
  container.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    e.preventDefault();control();container.focus({preventScroll:true});container.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===1)gesture={startX:e.clientX,startY:e.clientY,maxTravel:0,multi:false,at:performance.now()};
    else{if(gesture)gesture.multi=true;pinchDistance=pinchLength();}
  });
  container.addEventListener('pointermove',e=>{
    const old=pointers.get(e.pointerId);if(!old){if(e.pointerType==='mouse')container.style.cursor=pick(e.clientX,e.clientY)?'pointer':'grab';return;}
    e.preventDefault();const dx=e.clientX-old.x,dy=e.clientY-old.y;
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(gesture)gesture.maxTravel=Math.max(gesture.maxTravel,Math.hypot(e.clientX-gesture.startX,e.clientY-gesture.startY));
    if(pointers.size>=2){const next=pinchLength();if(pinchDistance>0&&next>0)distance*=pinchDistance/next;pinchDistance=next;}
    else {yaw-=dx/container.clientWidth*Math.PI*2;polar-=dy/container.clientHeight*Math.PI;}
    render();
  });
  function end(e,cancelled=false){
    if(!pointers.has(e.pointerId))return;e.preventDefault();pointers.delete(e.pointerId);
    if(!cancelled&&pointers.size===0&&gesture&&!gesture.multi&&gesture.maxTravel<=6&&performance.now()-gesture.at<700){const side=pick(e.clientX,e.clientY);if(side)toggleClaw(side);}
    if(cancelled&&gesture)gesture.multi=true;
    if(pointers.size===0)gesture=null;
    if(container.hasPointerCapture(e.pointerId))container.releasePointerCapture(e.pointerId);
  }
  container.addEventListener('pointerup',e=>end(e));container.addEventListener('pointercancel',e=>end(e,true));
  container.addEventListener('lostpointercapture',e=>{pointers.delete(e.pointerId);if(!pointers.size)gesture=null;});
  container.addEventListener('wheel',e=>{e.preventDefault();control();const amount=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?container.clientHeight:1);distance*=Math.exp(clamp(amount,-240,240)*.0018);render();},{passive:false});
  container.addEventListener('contextmenu',e=>e.preventDefault());
  container.addEventListener('keydown',e=>{
    const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home','Enter','1','2'];if(!keys.includes(e.key))return;e.preventDefault();control();
    if(e.key==='ArrowLeft')yaw-=.2;if(e.key==='ArrowRight')yaw+=.2;if(e.key==='ArrowUp')polar-=.15;if(e.key==='ArrowDown')polar+=.15;
    if(e.key==='+'||e.key==='=')distance*=.9;if(e.key==='-')distance*=1.1;
    if(e.key==='Home')api.reset();if(e.key==='Enter')document.querySelector('#say-hi').click();if(e.key==='1')toggleClaw('LF');if(e.key==='2')toggleClaw('RF');render();
  });
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}},{threshold:0});intersection.observe(container);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};document.addEventListener('visibilitychange',visibility);
  const motionPreference=e=>{reduced=e.matches;wake();};
  mq.addEventListener('change',motionPreference);
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();disposed=true;cancelAnimationFrame(frame);onError(new Error('WebGL context lost'));});
  const api={
    wave(){if(paused())return false;waveTime=0;control();wake();return true;},
    refresh(){cancelAnimationFrame(frame);frame=0;render();wake();},
    reset(){yaw=.42;polar=1.03;distance=defaultDistance;control();render();},
    toggleClaw,
    dispose(){disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);mq.removeEventListener('change',motionPreference);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});renderer.dispose();renderer.domElement.remove();},
    // Read-only inspection for local QA, no writes to the model through this API.
    inspect(){
      model.robot.updateMatrixWorld(true);
      const r=container.getBoundingClientRect(),clawPoints={};
      for(const side of ['LF','RF']){const mesh=model.meshes.find(m=>m.name===side+'_palm_link_visual');const p=new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3()).project(camera);clawPoints[side]={x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2};}
      return {yaw,polar,distance,userControlled,phase,waveTime,open:{...open},clawAngles:{...clawAngles},interactionSerial,triangles:renderer.info.render.triangles,calls:renderer.info.render.calls,clawPoints,joints:[...model.joints].map(([name,j])=>({name,angle:j.angle,axis:j.axis.toArray(),anchor:j.anchor.position.toArray(),pivot:j.pivot.position.toArray(),limit:j.limit})),camera:camera.position.toArray(),paused:paused(),reduced};
    }
  };
  resize();render();wake();onReady();
  if(location.hostname==='127.0.0.1'||location.hostname==='localhost')container.teraViewer=api;
  return api;
}
