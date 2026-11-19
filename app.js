const SUPA_URL="https://srzpmoisgqmqglhksnhd.supabase.co",SUPA_KEY="sb_publishable_XGh28brJVUMhwzOr66qdQw_IhjxJ1lF";
"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>(Number(n)||0).toLocaleString('fr-FR').replace(/[  ]/g,' ')+' F CFA';
const uid=()=>crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g,()=>(Math.random()*16|0).toString(16));
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const frDate=s=>s?esc(String(s).slice(0,10).split('-').reverse().join('/')):'';
const src=p=>{p=String(p||'');return (/^img\/[a-z0-9-]+\.jpg$/.test(p)||p.startsWith(SUPA_URL+'/storage/v1/object/public/produits/'))?esc(p):''};
const GLASSES='<svg viewBox="0 0 38 22" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="9.5" cy="12" rx="7.5" ry="7"/><ellipse cx="28.5" cy="12" rx="7.5" ry="7"/><path d="M17 10c1.2-1.6 2.8-1.6 4 0"/></svg>';
const ICON={eye:'<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>',
 doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h5M14 3v5h5"/>',
 spark:'<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/>',
 tool:'<path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L3 18l3 3 6.3-6.3a4 4 0 0 0 5.2-5.2l-2.7 2.7-2.2-.6-.6-2.2 2.5-2.9z"/>',
 chat:'<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9.5h8M8 12.5h5"/>',
 truck:'<path d="M2 7h11v9H2zM13 10h4.5L21 13v3h-8z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'};
const SERVICES=[
 {n:"Consultation d'opticien spécialisé",d:"Consultation et prescription avec un opticien.",m:"30 min · 5 000 F CFA",i:'doc',book:1},
 {n:"Examen de vue",d:"Un contrôle de votre vision pour trouver la bonne correction.",i:'eye',book:1},
 {n:"Nettoyage des verres",d:"Passez en boutique : on nettoie vos verres gratuitement.",i:'spark',free:1},
 {n:"Réparation de lunettes",d:"Branche cassée, vis perdue, plaquettes usées : on remet vos lunettes en état.",i:'tool',book:1},
 {n:"Conseils après-vente",d:"Ajustement, entretien et réponses à vos questions après l'achat.",i:'chat'},
 {n:"Livraison",d:"Vos lunettes vous sont livrées sans frais.",i:'truck',free:1}];
const FAQ=[
 ["Combien coûte la consultation ?","La consultation d'opticien spécialisé dure 30 minutes et coûte 5 000 F CFA."],
 ["La livraison est-elle payante ?","Non, la livraison est gratuite."],
 ["Quels sont vos horaires ?","Du lundi au vendredi de 8h à 19h, le samedi de 8h à 15h. Nous sommes fermés le dimanche."],
 ["Faites-vous les réparations ?","Oui. Apportez vos lunettes en boutique et nous regardons ce qui peut être réparé."],
 ["Comment commander une monture ?","Ajoutez la monture au panier, puis envoyez la commande sur WhatsApp. La boutique vous répond pour confirmer."]];

/* ---------- données ---------- */
function seedState(){const st={faya:0,abj2:0,int:0};const P=(name,brand,cat,price,ph,desc)=>({id:uid(),name,brand,cat,price,descr:desc,photos:ph?['img/'+ph+'.jpg']:[],stock:{...st},active:true});
 const m="Monture optique. Verres unifocaux, bifocaux ou progressifs montés par nos opticiens.";
 return {v:1,
 settings:{whatsapp:'2250768714275',email:'visioncommercial2000@gmail.com',hours:'Lun – Ven : 8h – 19h|Samedi : 8h – 15h|Dimanche : fermé'},
 shops:[{id:'faya',name:'Riviera Faya',address:'Riviera, carrefour Faya (au feu) — Cocody, Abidjan',phone:'07 68 71 42 75'},
        {id:'abj2',name:'Palmeraie',address:"Palmeraie, pharmacie Notre-Dame de l'Incarnation — Abidjan",phone:''},
        {id:'int',name:'Agboville',address:'Quartier RAN, non loin du CHR — Agboville',phone:''}],
 products:[P('Monture Louis Vuitton','Louis Vuitton','Montures',170000,'louis-vuitton',m),P('Monture Fendi','Fendi','Montures',80000,'fendi',m),
  P('Monture Versace','Versace','Montures',100000,'versace',m),P('Chanel Papillon','Chanel','Montures',70000,'chanel-papillon',m),
  P('Lunette Reese','','Montures',40000,'reese',m),P('Lunette Chanel','Chanel','Montures',40000,'',m),
  P('Cordon à lunettes coloré','','Accessoires',1500,'cordon','Cordon pour garder vos lunettes autour du cou. Plusieurs couleurs.'),
  P('Cordelette chaîne','','Accessoires',1500,'','Cordelette chaîne pour lunettes.'),
  P('AO Lens Cleaner','AO','Entretien',3500,'ao-lens-cleaner','Spray nettoyant pour verres de lunettes.')],
 orders:[],appts:[],clients:[],sales:[],repairs:[]};}
const sb=(window.supabase&&window.supabase.createClient)?window.supabase.createClient(SUPA_URL,SUPA_KEY):null;
let S=seedState(),me=null,isStaff=false,chan=null,rt=0,rtFirst=0,catState='loading';S.products=[];
const TBL=['orders','appts','clients','sales','repairs'];
const PUB_COLS='id,name,brand,cat,price,descr,photos,active,created_at';
const normP=x=>({...x,photos:Array.isArray(x.photos)?x.photos.filter(u=>typeof u==='string'):[],stock:(x.stock&&typeof x.stock==='object'&&!Array.isArray(x.stock))?x.stock:{}});
async function loadPublic(){if(!sb){catState='error';return}
 const [p,s,g]=await Promise.all([sb.from('products').select(isStaff?'*':PUB_COLS).order('created_at',{ascending:false}),sb.from('shops').select('*').order('pos'),sb.from('settings').select('*').eq('id',1)]);
 if(!p.error&&p.data){S.products=p.data.map(normP);catState='ok'}else catState='error';
 if(!s.error&&s.data&&s.data.length)S.shops=s.data;if(!g.error&&g.data&&g.data[0])S.settings=g.data[0]}
async function loadAll(k){let out=[];for(let i=0;i<10;i++){const r=await sb.from(k).select('*').order('created_at',{ascending:false}).range(i*1000,i*1000+999);if(r.error||!r.data)return i?out:null;out=out.concat(r.data);if(r.data.length<1000)break}return out}
async function loadStaff(){for(const k of TBL){const d=await loadAll(k);if(d){if(k==='sales')d.forEach(s=>{if(!Array.isArray(s.items))s.items=[]});S[k]=d}}}
const need=()=>{if(!sb)throw new Error('base de données injoignable')};
const norm=(k,r)=>k==='products'?normP(r):r;
async function ins(k,row){need();const {data,error}=await sb.from(k).insert(row).select();if(error)throw error;const r=norm(k,data[0]);S[k].unshift(r);return r}
async function upd(k,id,cols){need();const {data,error}=await sb.from(k).update(cols).eq('id',id).select();if(error)throw error;if(!data||!data.length)throw new Error("cette fiche n'existe plus, rechargez la page");const r=norm(k,data[0]),i=S[k].findIndex(x=>x.id===id);if(i>=0)S[k][i]=r;return r}
async function del(k,id){need();const {error}=await sb.from(k).delete().eq('id',id);if(error)throw error;S[k]=S[k].filter(x=>x.id!==id)}
const BUCKET=SUPA_URL+'/storage/v1/object/public/produits/';
async function rmPhotos(urls){const ps=(urls||[]).filter(u=>String(u).startsWith(BUCKET)).map(u=>decodeURIComponent(u.slice(BUCKET.length)));if(ps.length)try{await sb.storage.from('produits').remove(ps)}catch(e){}}
const typing=()=>{const a=document.activeElement;return !!a&&$('#am').contains(a)&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)};
function watch(){if(chan||!sb.channel)return;
 const run=async()=>{rt=0;rtFirst=0;if(!isStaff)return;await loadPublic();await loadStaff();if(typing())renderSite();else refresh()};
 chan=sb.channel('gestion').on('postgres_changes',{event:'*',schema:'public'},()=>{const now=Date.now();if(!rtFirst)rtFirst=now;clearTimeout(rt);rt=setTimeout(run,now-rtFirst>5000?0:700)}).subscribe()}
let locI=0,locT=0;const locLabel=s=>s.name+(/abidjan/i.test(s.address||'')&&!/abidjan/i.test(s.name)?' · Abidjan':'');
function startLoc(){const e=$('#loc');if(!e||!S.shops.length)return;clearInterval(locT);locI=0;e.textContent=locLabel(S.shops[0]);if(S.shops.length<2)return;
 locT=setInterval(()=>{e.classList.add('out');setTimeout(()=>{locI=(locI+1)%S.shops.length;e.textContent=locLabel(S.shops[locI]);e.classList.remove('out')},350)},3200)}
function purge(){ashop='';me=null;isStaff=false;TBL.forEach(k=>S[k]=[]);closeModal();$('#print').innerHTML='';if(chan){try{sb.removeChannel(chan)}catch(e){}chan=null}}
async function setUser(u){me=u||null;isStaff=false;if(!me)return;const r=await sb.from('staff').select('user_id').eq('user_id',me.id);isStaff=!r.error&&!!r.data&&r.data.length>0;if(isStaff){await loadPublic();await loadStaff();watch()}}
let loginMode='in';
function loginView(){const up=loginMode==='up';return `<form class="form panel" data-form="${up?'signup':'login'}" style="max-width:440px;margin:30px auto"><h3>${up?'Créer mon compte':'Connexion du personnel'}</h3>
 ${!sb?'<p class="sub">La base de données est injoignable. Vérifiez votre connexion internet puis rechargez la page.</p>':''}
 ${me&&!isStaff?`<p class="sub">Le compte ${esc(me.email)} existe mais n'est pas encore autorisé à gérer la boutique.</p>`:''}
 ${up?`<p class="sub" style="margin:0">Choisissez votre e-mail et un mot de passe d'au moins 10 caractères. Le compte doit ensuite être autorisé par l'administrateur du site.</p>`:''}
 <label>E-mail<input name="email" type="email" required maxlength="120" autocomplete="username"></label>
 <label>Mot de passe<input name="password" type="password" required ${up?'minlength="10" autocomplete="new-password"':'autocomplete="current-password"'}></label>
 <div class="fa" style="justify-content:space-between;align-items:center"><button type="button" class="btn sm" data-act="loginmode">${up?"J'ai déjà un compte":'Première fois ? Créer mon compte'}</button><button class="btn dark">${up?'Créer mon compte':'Se connecter'}</button></div></form>`}
/* ---------- réservation ---------- */
let ashop='';
const DAYS=['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'],JOURS=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],MONTHS=['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
const closeAt=d=>d===0?0:d===6?15:19;
const isoUTC=d=>d.toISOString().slice(0,10);
function slotsFor(iso){const d=new Date(iso+'T00:00:00Z'),c=closeAt(d.getUTCDay()),now=new Date(),isToday=iso===isoUTC(now),min=now.getUTCHours()*60+now.getUTCMinutes()+30,out=[];
 for(let m=8*60;m<=c*60-30;m+=30)if(!isToday||m>=min)out.push(String(m/60|0).padStart(2,'0')+':'+String(m%60).padStart(2,'0'));return out}
function nextDays(){const out=[],now=new Date();for(let i=0;out.length<14&&i<30;i++){const d=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()+i)),iso=isoUTC(d);if(slotsFor(iso).length)out.push({iso,d})}return out}
const longDate=iso=>{const d=new Date(iso+'T00:00:00Z');return JOURS[d.getUTCDay()]+' '+d.getUTCDate()+' '+MONTHS[d.getUTCMonth()]};
const bkVal=n=>{const r=$(`#bk input[name="${n}"]:checked`);return r?r.value:''};
const pick=(n,v)=>{const r=$$(`#bk input[name="${n}"]`).find(x=>x.value===v);if(r){r.checked=true;renderRecap()}};
function renderTimes(keep){const iso=bkVal('date'),z=$('#bktime');if(!iso){z.innerHTML='<p class="bkhint">Choisissez d\'abord un jour : les heures disponibles s\'afficheront ici.</p>';return}
 const sl=slotsFor(iso),grp=(t,l)=>l.length?`<div class="sg"><span>${t}</span><div class="slots">${l.map(x=>`<label class="opt sm"><input type="radio" name="time" value="${x}" required ${x===keep?'checked':''}><span>${x.replace(':','h')}</span></label>`).join('')}</div></div>`:'';
 z.innerHTML=grp('Matin',sl.filter(x=>x<'12:00'))+grp('Après-midi',sl.filter(x=>x>='12:00'))}
function renderRecap(){const s=bkVal('shop'),v=bkVal('service'),d=bkVal('date'),t=bkVal('time'),e=$('#bkrecap');
 e.textContent=(s&&d&&t)?`${v||'Rendez-vous'} · ${shopName(s)} · ${longDate(d)} à ${t.replace(':','h')}`:'';e.hidden=!e.textContent}
function renderBooking(){if(!$('#bk'))return;const book=SERVICES.filter(s=>s.book),k={shop:bkVal('shop'),service:bkVal('service'),date:bkVal('date'),time:bkVal('time')};
 if(!S.shops.some(s=>s.id===k.shop))k.shop=S.shops[0].id;if(!book.some(s=>s.n===k.service))k.service=book[0].n;
 $('#bkshop').innerHTML=S.shops.map(s=>`<label class="opt"><input type="radio" name="shop" value="${esc(s.id)}" required ${s.id===k.shop?'checked':''}><span>${esc(s.name)}<small>${esc(String(s.address||'').split(' — ')[0])}</small></span></label>`).join('');
 $('#bksvc').innerHTML=book.map(s=>`<label class="opt"><input type="radio" name="service" value="${esc(s.n)}" required ${s.n===k.service?'checked':''}><span>${esc(s.n)}${s.m?`<small>${s.m}</small>`:''}</span></label>`).join('');
 const days=nextDays(),t0=isoUTC(new Date());if(!days.some(x=>x.iso===k.date))k.date='';
 $('#bkday').innerHTML=days.map(({iso,d})=>`<label class="opt day"><input type="radio" name="date" value="${iso}" required ${iso===k.date?'checked':''} aria-label="${longDate(iso)}"><span><small>${iso===t0?'auj.':DAYS[d.getUTCDay()]}</small><b>${d.getUTCDate()}</b><small>${MONTHS[d.getUTCMonth()]}</small></span></label>`).join('');
 renderTimes(k.time);renderRecap()}
const shopName=id=>(S.shops.find(s=>s.id===id)||{}).name||'—';
const wa=t=>'https://wa.me/'+String(S.settings.whatsapp).replace(/\D/g,'')+'?text='+encodeURIComponent(t);
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2600)}
function openModal(h,narrow){$('#box').className='box'+(narrow?' narrow':'');$('#box').innerHTML='<button class="x" data-act="close" aria-label="Fermer">✕</button>'+h;$('#ov').classList.add('on');lastFocus=document.activeElement;const x=$('#box .x');x&&x.focus()}
let lastFocus=null;function closeModal(){$('#ov').classList.remove('on');$('#box').innerHTML='';if(lastFocus&&lastFocus.isConnected)lastFocus.focus();lastFocus=null}

/* ---------- site public ---------- */
let filt='Tout',qs='',cart=[];
const live=()=>S.products.filter(p=>p.active!==false&&p.photos.length>0);
function thumb(p,cls){return p.photos[0]?`<img ${cls?`class="${cls}"`:''} src="${src(p.photos[0])}" alt="${esc(p.name)}" loading="lazy">`:`<div class="nophoto"><div>${GLASSES}Photo à venir</div></div>`}
function renderGrid(){const cats=['Tout',...new Set(live().map(p=>p.cat).filter(Boolean))];if(!cats.includes(filt))filt='Tout';
 if(!$('#chips input'))$('#chips').innerHTML='<span id="chipl"></span><input class="search" id="qs" placeholder="Rechercher une monture, une marque…" aria-label="Rechercher">';
 $('#chipl').outerHTML='<span id="chipl" style="display:contents">'+cats.map(c=>`<button class="chip ${c===filt?'on':''}" data-act="filt" data-c="${esc(c)}">${esc(c)}</button>`).join('')+'</span>';
 const l=live().filter(p=>(filt==='Tout'||p.cat===filt)&&(!qs||(p.name+' '+p.brand+' '+p.cat).toLowerCase().includes(qs)));
 $('#grid').innerHTML=l.length?l.map(p=>`<article class="pc"><button class="ph" data-act="view" data-id="${p.id}" aria-label="Voir ${esc(p.name)}">${thumb(p)}${p.photos.length>1?`<span class="cnt">${p.photos.length} photos</span>`:''}</button>
 <div class="pi"><small>${esc(p.brand||p.cat)}</small><h3>${esc(p.name)}</h3><div class="pr"><span>${fmt(p.price)}</span><button class="plus" data-act="add" data-id="${p.id}" aria-label="Ajouter ${esc(p.name)} au panier">+</button></div></div></article>`).join(''):`<p class="sub">${catState==='loading'?'Chargement du catalogue…':catState==='error'?'Le catalogue est momentanément indisponible. Écrivez-nous sur WhatsApp pour connaître nos articles.':'Aucun article ne correspond à votre recherche.'}</p>`;}
function viewProduct(id){const p=S.products.find(x=>x.id===id);if(!p)return;const n=p.photos.length;
 openModal(`<div class="pm"><div class="gal"><div class="trk" id="trk">${n?p.photos.map(x=>`<div><img src="${src(x)}" alt="${esc(p.name)}"></div>`).join(''):`<div><div class="nophoto"><div>${GLASSES}Photo à venir</div></div></div>`}</div>
 ${n>1?`<button class="ga l" data-act="gal" data-d="-1" aria-label="Photo précédente">‹</button><button class="ga r" data-act="gal" data-d="1" aria-label="Photo suivante">›</button><div class="th">${p.photos.map((x,i)=>`<img src="${src(x)}" data-act="galto" data-i="${i}" alt="Photo ${i+1}">`).join('')}</div>`:''}</div>
 <div class="pinfo"><span class="tag" style="margin:0">${esc(p.brand||p.cat)}</span><h3>${esc(p.name)}</h3><div class="price">${fmt(p.price)}</div><p>${esc(p.descr)}</p><p>Livraison gratuite.</p>
 <button class="btn dark block" data-act="add" data-id="${p.id}">Ajouter au panier</button>
 <a class="btn wa block" target="_blank" rel="noopener" href="${wa('Bonjour Optique Vision 2000, je suis intéressé(e) par : '+p.name+' ('+fmt(p.price)+').')}">Demander sur WhatsApp</a></div></div>`)}
function cartTotal(){return cart.reduce((s,c)=>{const p=S.products.find(x=>x.id===c.id);return s+(p?p.price*c.qty:0)},0)}
function renderCart(){cart=cart.filter(c=>S.products.some(p=>p.id===c.id));$('#cc').textContent=cart.reduce((s,c)=>s+c.qty,0);
 $('#drawer').innerHTML=`<button class="x" data-act="cartx" aria-label="Fermer">✕</button><h3>Votre panier</h3><div class="dl">${cart.length?cart.map(c=>{const p=S.products.find(x=>x.id===c.id);return `<div class="ci">${p.photos[0]?`<img src="${src(p.photos[0])}" alt="${esc(p.name)}">`:'<div class="np"></div>'}<div><b>${esc(p.name)}</b><span>${fmt(p.price)}</span></div><div class="q"><button data-act="qty" data-id="${p.id}" data-d="-1" aria-label="Moins">−</button>${c.qty}<button data-act="qty" data-id="${p.id}" data-d="1" aria-label="Plus">+</button></div></div>`}).join(''):'<p class="sub">Votre panier est vide.</p>'}</div>
 ${cart.length?`<form class="df" data-form="order"><div class="tot"><span>Total</span><span>${fmt(cartTotal())}</span></div>
 <input name="name" placeholder="Votre nom" aria-label="Votre nom" required maxlength="120" autocomplete="name"><input name="phone" type="tel" placeholder="Téléphone" aria-label="Téléphone" required maxlength="40" autocomplete="tel">
 <select name="mode" aria-label="Mode de réception"><option>Livraison gratuite</option><option>Retrait en magasin</option></select>
 <input name="place" placeholder="Quartier / lieu de livraison" aria-label="Quartier ou lieu de livraison" maxlength="200"><select name="shop" aria-label="Magasin">${S.shops.map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('')}</select>
 <label class="consent"><input type="checkbox" name="ok" required><span>J'accepte que les informations saisies soient enregistrées par la boutique et utilisées pour traiter ma demande. <a href="confidentialite.html">Politique de confidentialité</a></span></label><button class="btn wa block">Commander sur WhatsApp</button></form>`:''}`}
function addCart(id){const c=cart.find(x=>x.id===id);c?c.qty++:cart.push({id,qty:1});renderCart();toast('Ajouté au panier')}
function renderSite(){
 const d=new Date(),day=d.getUTCDay(),h=d.getUTCHours()+d.getUTCMinutes()/60,r=day===0?null:day===6?[8,15]:[8,19],on=r&&h>=r[0]&&h<r[1];
 $('#openb').textContent=on?'Ouvert · ferme à '+r[1]+'h':'Fermé actuellement';$('#openb').classList.toggle('off',!on);
 const m=['Examen de vue','Nettoyage gratuit des verres','Réparation','Conseils après-vente','Livraison gratuite','Verres progressifs'].map(x=>`<span>${x}</span>`).join('');$('#marq').innerHTML=m+m;
 $('#shopimg').src='img/boutique.jpg';
 $('#sv').innerHTML=SERVICES.map(s=>`<article class="sc"><div class="ic"><svg viewBox="0 0 24 24">${ICON[s.i]}</svg></div><h3>${esc(s.n)}${s.free?'<span class="free">Gratuit</span>':''}</h3><p>${esc(s.d)}</p>${s.m?`<div class="meta">${s.m}</div>`:''}${s.book?`<button class="btn sm" data-act="book" data-s="${esc(s.n)}">Réserver</button>`:''}</article>`).join('');
 renderBooking();
 $('#shops').innerHTML=S.shops.map(s=>`<article class="shc"><h3>${esc(s.name)}</h3><p>${s.address?esc(s.address):'<span class="todo">Adresse à préciser</span>'}</p><p>${s.phone?`<a href="tel:${esc(s.phone.replace(/\s/g,''))}"><b>${esc(s.phone)}</b></a>`:'<span class="todo">Téléphone à préciser</span>'}</p><button class="btn sm" data-act="bookshop" data-id="${esc(s.id)}" style="justify-self:start">Prendre rendez-vous ici</button></article>`).join('');
 $('#hours').innerHTML=S.settings.hours.split('|').map(x=>`<span>${esc(x)}</span>`).join('');
 $('#faql').innerHTML=FAQ.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
 $('#fcontact').innerHTML=`<a href="tel:${esc(S.shops[0].phone.replace(/\s/g,''))}">${esc(S.shops[0].phone)}</a> · <a href="mailto:${esc(S.settings.email)}">${esc(S.settings.email)}</a>`;
 $('#fab').href=wa('Bonjour Optique Vision 2000,');
 renderGrid();renderRing();renderCart();startLoc();}

/* carrousel 3D */
let ang=0,R=240,drag=null,lastTouch=0;
function renderRing(){let l=live().filter(p=>p.photos.length);if(!l.length){$('#ring').innerHTML='';return}
 let items=[...l];while(items.length<7)items=items.concat(l);items=items.slice(0,Math.max(7,Math.min(l.length,10)));
 const n=items.length,w=innerWidth<900?150:190;R=Math.round((w/2)/Math.tan(Math.PI/n))+26;
 $('#ring').innerHTML=items.map((p,i)=>`<div class="rc" data-id="${p.id}" style="width:${w}px;left:${-w/2}px;transform:rotateY(${i*360/n}deg) translateZ(${R}px)"><img src="${src(p.photos[0])}" alt="${esc(p.name)}" style="height:${w<190?140:178}px"><div><b>${esc(p.name)}</b><span>${fmt(p.price)}</span></div></div>`).join('')}
(function(){const st=$('#stage'),still=matchMedia('(prefers-reduced-motion: reduce)').matches;
 st.addEventListener('pointerdown',e=>{drag={x:e.clientX,a:ang,moved:0};st.setPointerCapture&&st.setPointerCapture(e.pointerId)});
 st.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;drag.moved=Math.max(drag.moved,Math.abs(dx));ang=drag.a+dx*.35;lastTouch=performance.now()});
 st.addEventListener('pointerup',e=>{if(drag&&drag.moved<6){const c=document.elementFromPoint(e.clientX,e.clientY);const rc=c&&c.closest('.rc');if(rc)viewProduct(rc.dataset.id)}drag=null;lastTouch=performance.now()});
 st.addEventListener('pointercancel',()=>drag=null);
 (function f(t){if(!drag&&!still&&t-lastTouch>1500)ang-=.12;$('#ring').style.transform=`translateZ(${-R}px) rotateX(-6deg) rotateY(${ang.toFixed(2)}deg)`;requestAnimationFrame(f)})(0);
 addEventListener('resize',()=>{clearTimeout(renderRing.t);renderRing.t=setTimeout(renderRing,200)});})();

/* ---------- gestion ---------- */
const ST={appts:['En attente','Confirmé','Honoré','Annulé'],orders:['Nouvelle','Confirmée','Livrée','Annulée'],repairs:['Reçu','En cours','Prêt','Rendu']};
const stCls=s=>['Honoré','Livrée','Rendu','Confirmé','Confirmée','Prêt'].includes(s)?'g':['Annulé','Annulée'].includes(s)?'r':'y';
const ENT={
 orders:{label:'Commandes',one:'commande',cols:['date','name','phone','mode','summary','total','status'],def:()=>({date:today(),status:'Nouvelle',mode:'Livraison gratuite',shop:ashop||S.shops[0].id}),
  fields:[{k:'date',l:'Date',t:'date'},{k:'name',l:'Client',req:1},{k:'phone',l:'Téléphone',t:'tel'},{k:'mode',l:'Mode',t:'select',o:()=>['Livraison gratuite','Retrait en magasin']},{k:'place',l:'Lieu de livraison'},{k:'shop',l:'Magasin',t:'shop'},{k:'summary',l:'Articles',t:'area',full:1},{k:'total',l:'Total (F CFA)',t:'number'},{k:'status',l:'Statut',t:'select',o:()=>ST.orders}]},
 appts:{label:'Rendez-vous',one:'rendez-vous',cols:['date','time','name','phone','service','shop','status'],def:()=>({date:today(),status:'Confirmé',shop:ashop||S.shops[0].id}),
  fields:[{k:'date',l:'Date',t:'date',req:1},{k:'time',l:'Heure',t:'time'},{k:'name',l:'Client',req:1},{k:'phone',l:'Téléphone',t:'tel'},{k:'service',l:'Service',t:'select',o:()=>SERVICES.map(s=>s.n)},{k:'shop',l:'Magasin',t:'shop'},{k:'status',l:'Statut',t:'select',o:()=>ST.appts},{k:'note',l:'Note',t:'area',full:1}]},
 clients:{label:'Clients',one:'client',cols:['name','phone','city','rx','updated'],def:()=>({}),
  fields:[{k:'name',l:'Nom',req:1},{k:'phone',l:'Téléphone',t:'tel'},{k:'city',l:'Quartier / ville'},{k:'shop',l:'Magasin habituel',t:'shop'},
   {k:'ods',l:'Œil droit — sphère'},{k:'ogs',l:'Œil gauche — sphère'},{k:'odc',l:'Œil droit — cylindre'},{k:'ogc',l:'Œil gauche — cylindre'},{k:'oda',l:'Œil droit — axe'},{k:'oga',l:'Œil gauche — axe'},{k:'addi',l:'Addition'},{k:'ep',l:'Écart pupillaire'},{k:'note',l:'Notes',t:'area',full:1}]},
 repairs:{label:'Réparations',one:'réparation',cols:['date','name','phone','item','problem','shop','price','status'],def:()=>({date:today(),status:'Reçu',shop:ashop||S.shops[0].id}),
  fields:[{k:'date',l:'Date de dépôt',t:'date'},{k:'name',l:'Client',req:1},{k:'phone',l:'Téléphone',t:'tel'},{k:'item',l:'Lunettes déposées'},{k:'problem',l:'Problème',t:'area',full:1},{k:'shop',l:'Magasin',t:'shop'},{k:'price',l:'Prix (F CFA)',t:'number'},{k:'status',l:'Statut',t:'select',o:()=>ST.repairs}]}};
const COL={date:'Date',time:'Heure',name:'Client',phone:'Téléphone',service:'Service',shop:'Magasin',status:'Statut',mode:'Mode',summary:'Articles',total:'Total',city:'Quartier',rx:'Correction',updated:'Mis à jour',item:'Lunettes',problem:'Problème',price:'Prix'};
const TABS=[['dash','Tableau de bord'],['products','Articles'],['orders','Commandes'],['appts','Rendez-vous'],['clients','Clients'],['sales','Ventes'],['repairs','Réparations'],['settings','Magasins et réglages']];
let tab='dash',aq='';
function cell(k,r,key){const v=r[k];
 if(k==='shop')return esc(shopName(v));if(k==='date'||k==='updated')return frDate(v);if(k==='total'||k==='price')return v?fmt(v):'—';
 if(k==='status')return `<select class="bd ${stCls(v)}" data-st="${key}" data-id="${r.id}" style="width:auto;padding:3px 8px;border:0" aria-label="Statut">${(ST[key].includes(v)?[]:[v]).concat(ST[key]).map(o=>`<option ${o===v?'selected':''}>${esc(o)}</option>`).join('')}</select>`;
 if(k==='rx')return (r.ods||r.ogs)?`OD ${esc(r.ods||'—')} · OG ${esc(r.ogs||'—')}`:'—';
 return esc(String(v??'').length>60?String(v).slice(0,60)+'…':v??'')}
function entBody(k){const E=ENT[k],q=aq.toLowerCase();let rows=S[k].filter(r=>(!ashop||r.shop===ashop)&&(!q||JSON.stringify(r).toLowerCase().includes(q)));
 rows=[...rows].sort((a,b)=>k==='clients'?String(a.name).localeCompare(String(b.name)):((b.date||'')+(b.time||'')).localeCompare((a.date||'')+(a.time||'')));
 return rows.length?`<div class="tw"><table><tr>${E.cols.map(c=>`<th>${COL[c]}</th>`).join('')}</tr>${rows.map(r=>`<tr class="row" data-act="edit" data-k="${k}" data-id="${r.id}">${E.cols.map(c=>`<td>${cell(c,r,k)}</td>`).join('')}</tr>`).join('')}</table></div>`:`<div class="empty">Rien à afficher pour le moment.</div>`}
function field(f,v){const a=`name="${f.k}" ${f.req?'required':''}`,c=f.full?' class="full"':'';
 if(f.t==='area')return `<label${c}>${f.l}<textarea ${a}>${esc(v)}</textarea></label>`;
 if(f.t==='select')return `<label${c}>${f.l}<select ${a}>${(v&&!f.o().includes(v)?[v]:[]).concat(f.o()).map(o=>`<option ${o===v?'selected':''}>${esc(o)}</option>`).join('')}</select></label>`;
 if(f.t==='shop')return `<label${c}>${f.l}<select ${a}>${S.shops.some(s=>s.id===v)?'':'<option value="">— à choisir —</option>'}${S.shops.map(s=>`<option value="${esc(s.id)}" ${s.id===v?'selected':''}>${esc(s.name)}</option>`).join('')}</select></label>`;
 return `<label${c}>${f.l}<input ${a} type="${f.t||'text'}" value="${esc(v)}"></label>`}
function entForm(k,id){const E=ENT[k],r=id?S[k].find(x=>x.id===id):E.def();
 openModal(`<form class="form" data-form="ent" data-k="${k}" data-id="${id||''}"><h3>${id?'Modifier':'Ajouter'} : ${E.one}</h3><div class="fg">${E.fields.map(f=>field(f,r[f.k])).join('')}</div>
 <div class="fa">${id?`<button type="button" class="btn danger" data-act="del" data-k="${k}" data-id="${id}">Supprimer</button>`:''}${id&&r.phone?`<a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/225${esc(String(r.phone).replace(/\D/g,''))}">WhatsApp</a>`:''}<button class="btn dark">Enregistrer</button></div></form>`)}
function totalStock(p){return Object.values(p.stock||{}).reduce((a,b)=>a+(Number(b)||0),0)}
function productsBody(){const q=aq.toLowerCase(),l=S.products.filter(p=>!q||(p.name+p.brand+p.cat).toLowerCase().includes(q));
 return `<div class="tw"><table><tr><th></th><th>Article</th><th>Catégorie</th><th>Prix</th>${S.shops.map(s=>`<th>Stock ${esc(s.name.split(' ')[0])}</th>`).join('')}<th>Photos</th><th>Sur le site</th></tr>
 ${l.map(p=>`<tr class="row" data-act="pedit" data-id="${p.id}"><td>${p.photos[0]?`<img class="t" src="${src(p.photos[0])}" alt="${esc(p.name)}">`:''}</td><td><b>${esc(p.name)}</b><br><small>${esc(p.brand)}</small></td><td>${esc(p.cat)}</td><td>${fmt(p.price)}</td>${S.shops.map(s=>`<td>${Number(p.stock?.[s.id])||0}</td>`).join('')}<td>${p.photos.length}</td><td><span class="bd ${p.active===false?'r':p.photos.length?'g':'y'}">${p.active===false?'Masqué':p.photos.length?'Visible':'Masqué : sans photo'}</span></td></tr>`).join('')}</table></div>`}
let ph=[];
function phView(){return ph.length?ph.map((x,i)=>`<div class="p"><img src="${src(x)}" alt="Photo ${i+1}"><div><button type="button" data-act="phm" data-i="${i}" data-d="-1" aria-label="Avancer">◀</button><button type="button" data-act="phm" data-i="${i}" data-d="1" aria-label="Reculer">▶</button><button type="button" data-act="phx" data-i="${i}" aria-label="Retirer">✕</button></div></div>`).join(''):'<span class="sub" style="margin:0">Aucune photo pour le moment.</span>'}
function productForm(id){const p=id?S.products.find(x=>x.id===id):{name:'',brand:'',cat:'Montures',price:'',descr:'',photos:[],stock:{},active:true};ph=[...p.photos];
 const cats=[...new Set(['Montures','Solaires','Accessoires','Entretien',...S.products.map(x=>x.cat)])];
 openModal(`<form class="form" data-form="product" data-id="${id||''}"><h3>${id?'Modifier':'Nouvel'} article</h3><div class="fg">
 <label>Nom<input name="name" required value="${esc(p.name)}"></label><label>Marque<input name="brand" value="${esc(p.brand)}"></label>
 <label>Catégorie<input name="cat" list="cats" value="${esc(p.cat)}"><datalist id="cats">${cats.map(c=>`<option>${esc(c)}`).join('')}</datalist></label>
 <label>Prix (F CFA)<input name="price" type="number" min="0" required value="${esc(p.price)}"></label>
 <label class="full">Description<textarea name="desc">${esc(p.descr)}</textarea></label>
 <div class="full"><label>Photos (la première est la photo principale)</label><div class="phs" id="phs" style="margin:8px 0">${phView()}</div><input type="file" id="phin" accept="image/*" multiple></div>
 ${S.shops.map(s=>`<label>Stock — ${esc(s.name)}<input name="st_${esc(s.id)}" type="number" min="0" value="${Number(p.stock?.[s.id])||0}"></label>`).join('')}
 <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" name="active" style="width:auto" ${p.active!==false?'checked':''}> Visible sur le site</label></div>
 <div class="fa">${id?`<button type="button" class="btn danger" data-act="pdel" data-id="${id}">Supprimer</button>`:''}<button class="btn dark">Enregistrer</button></div></form>`)}
function shrink(file){return new Promise(res=>{const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const m=1000,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);c.toBlob(res,'image/jpeg',.82)};im.onerror=()=>res(null);im.src=fr.result};fr.onerror=()=>res(null);fr.readAsDataURL(file)})}
function lineRow(){return `<div class="ln"><select class="lp" aria-label="Article"><option value="">Autre (verres, prestation…)</option>${S.products.map(p=>`<option value="${p.id}" data-p="${p.price}" data-n="${esc(p.name)}">${esc(p.name)}</option>`).join('')}</select><input class="lnm" placeholder="Désignation" aria-label="Désignation"><input class="lq" type="number" min="1" value="1" aria-label="Quantité"><input class="lpr" type="number" min="0" placeholder="Prix" aria-label="Prix unitaire"><button type="button" data-act="lnx" aria-label="Retirer la ligne">✕</button></div>`}
function saleForm(){openModal(`<form class="form" data-form="sale"><h3>Nouvelle vente</h3><div class="fg">
 <label>Date<input name="date" type="date" value="${today()}" required></label><label>Magasin<select name="shop">${S.shops.map(s=>`<option value="${esc(s.id)}" ${s.id===ashop?'selected':''}>${esc(s.name)}</option>`).join('')}</select></label>
 <label>Client<input name="client" list="cls"><datalist id="cls">${S.clients.map(c=>`<option>${esc(c.name)}`).join('')}</datalist></label>
 <label>Paiement<select name="pay"><option>Espèces</option><option>Wave</option><option>Orange Money</option><option>MTN MoMo</option><option>Moov Money</option><option>Carte</option></select></label></div>
 <div id="lines">${lineRow()}</div><button type="button" class="btn sm" data-act="lnadd" style="justify-self:start">+ Ajouter une ligne</button>
 <div class="tot"><span>Total</span><span id="stot">0 F CFA</span></div><div class="fa"><button class="btn dark">Enregistrer la vente</button></div></form>`)}
function saleTotal(){let t=0;$$('#lines .ln').forEach(l=>t+=(Number($('.lq',l).value)||0)*(Number($('.lpr',l).value)||0));const e=$('#stot');if(e)e.textContent=fmt(t);return t}
function receipt(s){return `<div class="rec"><h3>Optique Vision 2000</h3><p>${esc(shopName(s.shop))} · ${frDate(s.date)}<br>Reçu n° ${esc(s.id.slice(-6).toUpperCase())}${s.client?'<br>Client : '+esc(s.client):''}</p><table><tr><th>Article</th><th>Qté</th><th>Prix</th><th>Montant</th></tr>${s.items.map(i=>`<tr><td>${esc(i.name)}</td><td>${Number(i.qty)||0}</td><td>${fmt(i.price)}</td><td>${fmt(i.price*i.qty)}</td></tr>`).join('')}</table><p><b>Total : ${fmt(s.total)}</b> · ${esc(s.pay)}</p></div>`}
function salesBody(){const l=S.sales.filter(s=>!ashop||s.shop===ashop).sort((a,b)=>b.date.localeCompare(a.date));return l.length?`<div class="tw"><table><tr><th>Date</th><th>Magasin</th><th>Client</th><th>Articles</th><th>Paiement</th><th>Total</th></tr>${l.map(s=>`<tr class="row" data-act="rec" data-id="${esc(s.id)}"><td>${frDate(s.date)}</td><td>${esc(shopName(s.shop))}</td><td>${esc(s.client||'—')}</td><td>${esc(s.items.map(i=>i.qty+'× '+i.name).join(', '))}</td><td>${esc(s.pay)}</td><td><b>${fmt(s.total)}</b></td></tr>`).join('')}</table></div>`:'<div class="empty">Aucune vente enregistrée.</div>'}
function dash(){const t=today(),mo=t.slice(0,7),sum=l=>l.reduce((a,s)=>a+s.total,0),F=l=>l.filter(x=>!ashop||x.shop===ashop),SA=F(S.sales),AP=F(S.appts),OR=F(S.orders),RE=F(S.repairs);
 const up=AP.filter(a=>a.date>=t&&a.status!=='Annulé').sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 const low=S.products.filter(p=>(ashop?Number(p.stock[ashop])||0:totalStock(p))<=1);
 return `<div class="kp"><div class="k"><small>Ventes aujourd'hui</small><b>${fmt(sum(SA.filter(s=>s.date===t)))}</b></div><div class="k"><small>Ventes ce mois</small><b>${fmt(sum(SA.filter(s=>s.date.startsWith(mo))))}</b></div>
 <div class="k"><small>Commandes à traiter</small><b>${OR.filter(o=>o.status==='Nouvelle').length}</b></div><div class="k"><small>Rendez-vous à venir</small><b>${up.length}</b></div>
 <div class="k"><small>Réparations en cours</small><b>${RE.filter(r=>r.status!=='Rendu').length}</b></div><div class="k"><small>Clients</small><b>${S.clients.length}</b></div></div>
 <div class="panel"><h3>Les trois magasins en un coup d'œil</h3><div class="tw"><table><tr><th>Magasin</th><th>Rendez-vous aujourd'hui</th><th>Commandes à traiter</th><th>Réparations en cours</th><th>Ventes du jour</th><th>Ventes du mois</th></tr>${S.shops.map(s=>{const sl=S.sales.filter(x=>x.shop===s.id);return `<tr class="row" data-act="ashop" data-id="${esc(s.id)}"><td><b>${esc(s.name)}</b></td><td>${S.appts.filter(a=>a.shop===s.id&&a.date===t&&a.status!=='Annulé').length}</td><td>${S.orders.filter(o=>o.shop===s.id&&o.status==='Nouvelle').length}</td><td>${S.repairs.filter(r=>r.shop===s.id&&r.status!=='Rendu').length}</td><td>${fmt(sum(sl.filter(x=>x.date===t)))}</td><td><b>${fmt(sum(sl.filter(x=>x.date.startsWith(mo))))}</b></td></tr>`}).join('')}</table></div></div>
 <div class="panel"><h3>Prochains rendez-vous</h3>${up.length?`<div class="tw"><table>${up.slice(0,8).map(a=>`<tr class="row" data-act="edit" data-k="appts" data-id="${a.id}"><td>${frDate(a.date)} ${esc(a.time||'')}</td><td>${esc(a.name)}</td><td>${esc(a.service||'')}</td><td>${esc(shopName(a.shop))}</td><td><span class="bd ${stCls(a.status)}">${esc(a.status)}</span></td></tr>`).join('')}</table></div>`:'<div class="empty">Aucun rendez-vous à venir.</div>'}</div>
 <div class="panel"><h3>Stock à surveiller (1 pièce ou moins, tous magasins)</h3>${low.length?low.map(p=>`<span class="bd y" style="margin:3px">${esc(p.name)} : ${totalStock(p)}</span>`).join(''):'<div class="empty">Tous les stocks sont au-dessus du seuil.</div>'}</div>`}
function settingsView(){return `<form class="form panel" data-form="settings" style="margin-top:0"><h3>Contact et horaires</h3><div class="fg">
 <label>Numéro WhatsApp (format international, sans +)<input name="whatsapp" value="${esc(S.settings.whatsapp)}" required></label><label>E-mail<input name="email" type="email" value="${esc(S.settings.email)}"></label>
 <label class="full">Horaires (séparez les lignes par | )<input name="hours" value="${esc(S.settings.hours)}"></label></div>
 ${S.shops.map((s,i)=>`<h3 style="margin-top:10px">Magasin ${i+1}</h3><div class="fg"><label>Nom<input name="n_${esc(s.id)}" value="${esc(s.name)}" required></label><label>Téléphone<input name="p_${esc(s.id)}" value="${esc(s.phone)}"></label><label class="full">Adresse<input name="a_${esc(s.id)}" value="${esc(s.address)}"></label></div>`).join('')}
 <div class="fa"><button class="btn dark">Enregistrer</button></div></form>
 <div class="panel"><h3>Sauvegarde</h3><p class="sub" style="margin:0 0 12px">Téléchargez une copie de toutes les données de la boutique.</p><div class="fa" style="justify-content:flex-start"><button class="btn sm" data-act="export">Télécharger la sauvegarde</button></div></div>`}
function listView(k,title,body,addAct,addLabel){return `<div class="tb"><h2>${title}</h2><input id="aq" placeholder="Rechercher…" value="${esc(aq)}" aria-label="Rechercher"><button class="btn dark sm" data-act="${addAct}" data-k="${k}">+ ${addLabel}</button></div><div class="panel" style="margin-top:0" id="abody">${body}</div>`}
function bodyFor(){return tab==='products'?productsBody():tab==='sales'?salesBody():entBody(tab)}
function renderAdmin(){$('#lo').hidden=!isStaff;$('#sync').textContent=isStaff?'Connecté : '+me.email+'. Les données sont partagées en direct entre les trois magasins.':'Espace réservé au personnel de la boutique.';if(!isStaff){$('#tabs').innerHTML='';$('#am').innerHTML=loginView();return}$('#tabs').innerHTML=TABS.map(t=>`<button class="${t[0]===tab?'on':''}" data-act="tab" data-t="${t[0]}">${t[1]}</button>`).join('')+`<select id="ashop" aria-label="Magasin affiché" style="width:auto;margin-left:auto;flex:none;border-radius:999px;font-weight:700;padding:8px 14px"><option value="">Tous les magasins</option>${S.shops.map(s=>`<option value="${esc(s.id)}" ${s.id===ashop?'selected':''}>${esc(s.name)}</option>`).join('')}</select>`;
 $('#am').innerHTML=tab==='dash'?dash():tab==='settings'?settingsView():tab==='products'?listView('products','Articles',productsBody(),'pnew','Nouvel article'):tab==='sales'?listView('sales','Ventes',salesBody(),'snew','Nouvelle vente'):listView(tab,ENT[tab].label,entBody(tab),'new','Ajouter')}
function refresh(){renderSite();if(!$('#admin').hidden)renderAdmin()}
function route(){const a=location.hash==='#gestion';$('#admin').hidden=!a;$('#site').hidden=a;if(a){renderAdmin();scrollTo(0,0)}}

/* ---------- actions ---------- */
const formData=f=>Object.fromEntries(new FormData(f).entries());
const fail=e=>{console.warn(e);toast('Action impossible : '+((e&&e.message)||'erreur inconnue'))};
const sure=t=>{if(t.dataset.sure)return true;t.dataset.sure=1;t.textContent='Confirmer la suppression';return false};
const ACT={
 close:closeModal,cart(){$('#drawer').classList.add('on');$('#dov').classList.add('on')},cartx(){$('#drawer').classList.remove('on');$('#dov').classList.remove('on')},
 view:t=>viewProduct(t.dataset.id),add:t=>addCart(t.dataset.id),
 filt(t){filt=t.dataset.c;renderGrid()},
 qty(t){const c=cart.find(x=>x.id===t.dataset.id);c.qty+=Number(t.dataset.d);if(c.qty<1)cart=cart.filter(x=>x!==c);renderCart()},
 gal(t){const k=$('#trk');k.scrollBy({left:Number(t.dataset.d)*k.clientWidth,behavior:'smooth'})},galto(t){const k=$('#trk');k.scrollTo({left:Number(t.dataset.i)*k.clientWidth,behavior:'smooth'})},
 book(t){pick('service',t.dataset.s);$('#rdv').scrollIntoView()},bookshop(t){pick('shop',t.dataset.id);$('#rdv').scrollIntoView()},
 ashop(t){ashop=t.dataset.id;renderAdmin()},loginmode(){loginMode=loginMode==='up'?'in':'up';renderAdmin()},
 admin(){location.hash='#gestion'},site(){location.hash='';route()},
 async logout(){try{await sb.auth.signOut()}catch(e){}purge();await loadPublic();refresh()},
 tab(t){tab=t.dataset.t;aq='';renderAdmin()},
 new:t=>entForm(t.dataset.k),edit(t,e){if(e.target.closest('select'))return;entForm(t.dataset.k,t.dataset.id)},
 async del(t){if(!sure(t))return;await del(t.dataset.k,t.dataset.id);closeModal();refresh();toast('Supprimé')},
 pnew:()=>productForm(),pedit:t=>productForm(t.dataset.id),
 async pdel(t){if(!sure(t))return;const p=S.products.find(x=>x.id===t.dataset.id);await del('products',t.dataset.id);if(p)rmPhotos(p.photos);closeModal();refresh();toast('Article supprimé')},
 phm(t){const i=Number(t.dataset.i),j=i+Number(t.dataset.d);if(j<0||j>=ph.length)return;[ph[i],ph[j]]=[ph[j],ph[i]];$('#phs').innerHTML=phView()},
 phx(t){ph.splice(Number(t.dataset.i),1);$('#phs').innerHTML=phView()},
 snew:saleForm,lnadd(){$('#lines').insertAdjacentHTML('beforeend',lineRow())},lnx(t){t.closest('.ln').remove();saleTotal()},
 rec(t){const s=S.sales.find(x=>x.id===t.dataset.id);openModal(receipt(s)+`<div class="fa"><button class="btn danger" data-act="del" data-k="sales" data-id="${esc(s.id)}">Supprimer</button><button class="btn dark" data-act="print">Imprimer le reçu</button></div>`,1)},
 print(){$('#print').innerHTML=$('#box .rec').outerHTML;print()},
 export(t){if(!t.dataset.sure){t.dataset.sure=1;t.textContent='Confirmer : le fichier contiendra les fiches clients et leurs corrections';return}delete t.dataset.sure;t.textContent='Télécharger la sauvegarde';const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='optique-vision-2000-sauvegarde-'+today()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}};
addEventListener('afterprint',()=>{$('#print').innerHTML=''});
document.addEventListener('click',e=>{if(e.target.id==='ov')return closeModal();if(e.target.id==='dov')return ACT.cartx();const t=e.target.closest('[data-act]');if(t&&ACT[t.dataset.act]){if(t.tagName==='A'&&t.dataset.act==='admin')e.preventDefault();try{const r=ACT[t.dataset.act](t,e);if(r&&r.catch)r.catch(fail)}catch(x){fail(x)}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();ACT.cartx()}});
document.addEventListener('input',e=>{const t=e.target;
 if(t.id==='qs'){qs=t.value.toLowerCase();renderGrid()}
 if(t.id==='aq'){aq=t.value;$('#abody').innerHTML=bodyFor()}
 if(t.closest('#lines'))saleTotal()});
document.addEventListener('change',async e=>{const t=e.target;try{
 if(t.classList.contains('lp')){const o=t.selectedOptions[0],l=t.closest('.ln');$('.lpr',l).value=o.dataset.p||'';$('.lnm',l).value=o.dataset.n||'';saleTotal()}
 if(t.id==='ashop'){ashop=t.value;renderAdmin()}
 if(t.closest('#bk')){if(t.name==='date')renderTimes();renderRecap()}
 if(t.dataset.st){await upd(t.dataset.st,t.dataset.id,{status:t.value,updated:today()});refresh()}
 if(t.id==='phin'){const files=[...t.files];t.value='';if(files.length)toast('Envoi des photos…');
  for(const f of files){const blob=await shrink(f);if(!blob)continue;const path=uid()+'.jpg';const {error}=await sb.storage.from('produits').upload(path,blob,{contentType:'image/jpeg'});if(error)throw error;ph.push(sb.storage.from('produits').getPublicUrl(path).data.publicUrl);const z=$('#phs');if(z)z.innerHTML=phView()}}
 }catch(x){fail(x)}});
document.addEventListener('submit',async e=>{const f=e.target,k=f.dataset.form;if(!k)return;e.preventDefault();const d=formData(f);try{
 if(k==='rdv'){if(!d.date||!d.time)return toast('Choisissez un jour et une heure');let saved=false;try{if(sb){const {error}=await sb.from('appts').insert({name:d.name,phone:d.phone,service:d.service,shop:d.shop,date:d.date,time:d.time,note:d.note});saved=!error}}catch(x){}
  f.reset();renderBooking();const msg=`Bonjour Optique Vision 2000, je souhaite un rendez-vous.\nNom : ${d.name}\nTéléphone : ${d.phone}\nService : ${d.service}\nMagasin : ${shopName(d.shop)}\nDate : ${frDate(d.date)} à ${d.time}${d.note?'\nMessage : '+d.note:''}`;
  openModal(`<h3>Dernière étape</h3><p class="sub">Votre demande pour le ${frDate(d.date)} à ${esc(d.time)} ${saved?'est enregistrée':'est prête'}. Envoyez-la à la boutique sur WhatsApp pour qu'elle soit confirmée.</p><div class="fa"><a class="btn wa" target="_blank" rel="noopener" href="${wa(msg)}" data-act="close">Envoyer sur WhatsApp</a></div>`,1)}
 if(k==='order'){const items=cart.map(c=>{const p=S.products.find(x=>x.id===c.id);return c.qty+'× '+p.name+' ('+fmt(p.price)+')'}),total=cartTotal();
  let saved=false;try{if(sb){const {error}=await sb.from('orders').insert({name:d.name,phone:d.phone,mode:d.mode,place:d.place,shop:d.shop,summary:items.join(', '),total});saved=!error}}catch(x){}
  const msg=`Bonjour Optique Vision 2000, je souhaite commander :\n- ${items.join('\n- ')}\nTotal : ${fmt(total)}\n${d.mode}${d.place?' — '+d.place:''}\nMagasin : ${shopName(d.shop)}\nNom : ${d.name}\nTéléphone : ${d.phone}`;
  cart=[];renderCart();ACT.cartx();openModal(`<h3>Dernière étape</h3><p class="sub">Votre commande de ${fmt(total)} ${saved?'est enregistrée':'est prête'}. Envoyez-la à la boutique sur WhatsApp pour la confirmer.</p><div class="fa"><a class="btn wa" target="_blank" rel="noopener" href="${wa(msg)}" data-act="close">Envoyer sur WhatsApp</a></div>`,1)}
 if(k==='login'){if(!sb)return toast('Base de données injoignable');const {data,error}=await sb.auth.signInWithPassword({email:d.email,password:d.password});
  if(error)return toast('E-mail ou mot de passe incorrect');await setUser(data.user);renderSite();renderAdmin()}
 if(k==='signup'){if(!sb)return toast('Base de données injoignable');const {data,error}=await sb.auth.signUp({email:d.email,password:d.password});if(error)return toast('Création impossible : '+error.message);loginMode='in';
  if(data&&data.session){await setUser(data.user);renderSite();renderAdmin()}else{renderAdmin();openModal(`<h3>Compte créé</h3><p class="sub">Le compte ${esc(d.email)} est enregistré. Il reste à le faire autoriser par l'administrateur du site ; vous pourrez ensuite vous connecter ici.</p>`,1)}}
 if(k==='ent'){const key=f.dataset.k,id=f.dataset.id;ENT[key].fields.forEach(x=>{if((x.t==='date'||x.t==='shop')&&!d[x.k])d[x.k]=null;if(x.t==='number')d[x.k]=Number(d[x.k])||0});d.updated=today();
  if(id)await upd(key,id,d);else await ins(key,{id:uid(),...d});closeModal();refresh();toast('Enregistré')}
 if(k==='product'){const id=f.dataset.id,stock={};S.shops.forEach(s=>stock[s.id]=Math.max(0,Number(d['st_'+s.id])||0));
  const o={name:d.name.trim(),brand:d.brand.trim(),cat:d.cat.trim()||'Montures',price:Number(d.price)||0,descr:d.desc,photos:[...ph],stock,active:!!d.active};
  const old=id?[...((S.products.find(x=>x.id===id)||{}).photos||[])]:[];if(id)await upd('products',id,o);else await ins('products',{id:uid(),...o});rmPhotos(old.filter(u=>!o.photos.includes(u)));closeModal();refresh();toast('Article enregistré')}
 if(k==='sale'){const items=$$('#lines .ln').map(l=>({pid:$('.lp',l).value,name:$('.lnm',l).value.trim()||'Article',qty:Math.max(1,Number($('.lq',l).value)||1),price:Number($('.lpr',l).value)||0})).filter(i=>i.price>0||i.pid);
  if(!items.length)return toast('Ajoutez au moins une ligne avec un prix');
  need();const {data:s,error}=await sb.rpc('record_sale',{p_shop:d.shop,p_client:d.client,p_pay:d.pay,p_date:d.date,p_items:items});if(error)throw error;
  if(!Array.isArray(s.items))s.items=[];S.sales.unshift(s);await loadPublic();
  refresh();openModal(receipt(s)+`<div class="fa"><button class="btn dark" data-act="print">Imprimer le reçu</button></div>`,1);toast('Vente enregistrée')}
 if(k==='settings'){const g={id:1,whatsapp:d.whatsapp.replace(/\D/g,''),email:d.email,hours:d.hours};const {error}=await sb.from('settings').upsert(g);if(error)throw error;S.settings=g;
  for(const s of [...S.shops])await upd('shops',s.id,{name:d['n_'+s.id],phone:d['p_'+s.id],address:d['a_'+s.id]});refresh();toast('Réglages enregistrés')}
 }catch(x){fail(x)}});
addEventListener('hashchange',route);
(async()=>{renderSite();route();
 try{await loadPublic();if(sb){const {data}=await sb.auth.getSession();await setUser(data&&data.session&&data.session.user);sb.auth.onAuthStateChange(ev=>{if(ev==='SIGNED_OUT'&&me){purge();if(!$('#admin').hidden)renderAdmin();setTimeout(()=>loadPublic().then(renderSite).catch(()=>{}),0)}})}}catch(x){console.warn(x)}
 renderSite();if(!$('#admin').hidden)renderAdmin()})();
