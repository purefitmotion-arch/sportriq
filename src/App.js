import { useState, useRef, useEffect } from "react";
import { supabase } from "./supabase";

const DARK_C = {
  accent:"#6C63FF", accent2:"#00D4AA", orange:"#FF6B35",
  dark:"#0E0E1A", card:"#16162A", card2:"#1E1E35",
  border:"rgba(255,255,255,0.08)", txt:"#F0F0FF", muted:"#8888AA",
  gold:"#FFD166", green:"#06D6A0", red:"#EF476F", pink:"#FF6B9D",
};
const LIGHT_C = {
  accent:"#5B53EE", accent2:"#00A98A", orange:"#E85D20",
  dark:"#F4F4F8", card:"#FFFFFF", card2:"#F0F0F6",
  border:"rgba(0,0,0,0.08)", txt:"#1A1A2E", muted:"#666688",
  gold:"#D4A017", green:"#009970", red:"#C0394F", pink:"#D45085",
};

const LANG = {
  fr:{
    tagline:"Trouve ton coach, vis ta performance.",
    sub:"Coachs certifiés partout dans le monde · Tous sports · Présentiel, Visio, Programme écrit",
    searchBtn:"Rechercher", sportLabel:"Sport", locationLabel:"Lieu", langLabel:"Langue",
    sports:"Sports & disciplines", featured:"Coachs en vedette", howTitle:"Comment ça marche",
    steps:[
      {i:"1",t:"Explore",d:"Filtre par sport, lieu, langue, format et budget"},
      {i:"2",t:"Réserve",d:"Présentiel, visio ou programme écrit – tu choisis"},
      {i:"3",t:"Progresse",d:"Entraîne-toi et suis tes progrès avec ton coach"},
      {i:"4",t:"Évalue",d:"Note ta session et inspire la communauté"},
    ],
    stats:[{v:"Partout",l:"dans le monde"},{v:"Tous sports",l:"& disciplines"},{v:"100%",l:"En ligne & présentiel"},{v:"Gratuit",l:"Inscription coach"}],
    formats:["Présentiel","Visio","Programme écrit","Discussion / Conseil"],
    bookBtn:"Réserver", perH:"/ h", reviews:"avis", back:"Retour", online:"En ligne",
    loginTitle:"Connexion", email:"Email", password:"Mot de passe", loginBtn:"Se connecter",
    signupTitle:"Inscription", name:"Nom complet", asCoach:"Coach", asClient:"Sportif·ve",
    certif:"Certifications", speciality:"Sport / Discipline", hourlyRate:"Tarif (€/h)", bio:"À propos",
    signupBtn:"Créer mon compte", noAccount:"Pas encore inscrit·e ?", hasAccount:"Déjà un compte ?",
    availableSlots:"Créneaux disponibles", bookWith:"Réserver avec",
    bookingConfirmed:"Réservation confirmée !", bookingConfirmedSub:"Confirmation par email.",
    leaveReview:"Laisser un avis", reviewPlaceholder:"Votre commentaire…", submitReview:"Publier",
    reviewsTitle:"Avis", noReviews:"Aucun avis pour l'instant.",
    dashTitle:"Dashboard", dashSub:"Bienvenue",
    upcoming:"Séances à venir", earnings:"Revenus (mois)", rating:"Note", sessions:"Séances",
    nextSessions:"Prochaines séances", revenueChart:"Revenus 6 mois",
    msgPlaceholder:"Message…", msgSend:"Envoyer",
    logout:"Déconnexion", nav:{coaches:"Coachs", messages:"Messages", dashboard:"Dashboard"},
    formatLabel:"Format de coaching", others:"Autres sports",
    loading:"Chargement…", error:"Une erreur est survenue.",
    emailSent:"Email de confirmation envoyé ! Vérifie ta boîte mail.",
    checkEmail:"Vérifie ton email pour confirmer ton compte.",
    confirmPassword:"Confirme ton mot de passe",
    passwordMismatch:"Les mots de passe ne correspondent pas.",
    fillAll:"Remplis tous les champs obligatoires.",
    coachRegistered:"Profil coach créé ! Vérifie ton email.",
    clientRegistered:"Compte créé ! Vérifie ton email.",
    bookingSuccess:"Réservation enregistrée !",
    noCoaches:"Aucun coach pour ce filtre.",
  },
  en:{
    tagline:"Find your coach, live your performance.",
    sub:"Certified coaches worldwide · All sports · In-person, Video, Written program",
    searchBtn:"Search", sportLabel:"Sport", locationLabel:"Location", langLabel:"Language",
    sports:"Sports & disciplines", featured:"Featured coaches", howTitle:"How it works",
    steps:[
      {i:"1",t:"Explore",d:"Filter by sport, location, language, format & budget"},
      {i:"2",t:"Book",d:"In-person, video call or written program – you choose"},
      {i:"3",t:"Train",d:"Train and track your progress with your coach"},
      {i:"4",t:"Review",d:"Rate your session and inspire the community"},
    ],
    stats:[{v:"Anywhere",l:"in the world"},{v:"All sports",l:"& disciplines"},{v:"100%",l:"Online & in-person"},{v:"Free",l:"Coach signup"}],
    formats:["In-person","Video call","Written program","Consultation"],
    bookBtn:"Book", perH:"/ h", reviews:"reviews", back:"Back", online:"Online",
    loginTitle:"Log in", email:"Email", password:"Password", loginBtn:"Log in",
    signupTitle:"Sign up", name:"Full name", asCoach:"Coach", asClient:"Athlete",
    certif:"Certifications", speciality:"Sport / Discipline", hourlyRate:"Rate (€/h)", bio:"About",
    signupBtn:"Create account", noAccount:"No account yet?", hasAccount:"Already have an account?",
    availableSlots:"Available slots", bookWith:"Book with",
    bookingConfirmed:"Booking confirmed!", bookingConfirmedSub:"Confirmation sent by email.",
    leaveReview:"Leave a review", reviewPlaceholder:"Your comment…", submitReview:"Post",
    reviewsTitle:"Reviews", noReviews:"No reviews yet.",
    dashTitle:"Dashboard", dashSub:"Welcome",
    upcoming:"Upcoming", earnings:"Earnings (month)", rating:"Rating", sessions:"Sessions",
    nextSessions:"Upcoming sessions", revenueChart:"Revenue 6 months",
    msgPlaceholder:"Message…", msgSend:"Send",
    logout:"Log out", nav:{coaches:"Coaches", messages:"Messages", dashboard:"Dashboard"},
    formatLabel:"Coaching format", others:"Other sports",
    loading:"Loading…", error:"An error occurred.",
    emailSent:"Confirmation email sent! Check your inbox.",
    checkEmail:"Check your email to confirm your account.",
    confirmPassword:"Confirm password",
    passwordMismatch:"Passwords do not match.",
    fillAll:"Please fill in all required fields.",
    coachRegistered:"Coach profile created! Check your email.",
    clientRegistered:"Account created! Check your email.",
    bookingSuccess:"Booking registered!",
    noCoaches:"No coach found for this filter.",
  }
};

const ALL_SPORTS=[
  {emoji:"🥊",fr:"Boxe",en:"Boxing"},{emoji:"🏋️",fr:"Musculation",en:"Weightlifting"},
  {emoji:"🎾",fr:"Tennis",en:"Tennis"},{emoji:"🧘",fr:"Yoga",en:"Yoga"},
  {emoji:"🏃",fr:"Course à pied",en:"Running"},{emoji:"🏸",fr:"Badminton",en:"Badminton"},
  {emoji:"🏓",fr:"Tennis de table",en:"Table Tennis"},{emoji:"🎭",fr:"Padel",en:"Padel"},
  {emoji:"⚡",fr:"HYROX",en:"HYROX"},{emoji:"💃",fr:"Danse",en:"Dance"},
  {emoji:"🏃‍♂️",fr:"Athlétisme",en:"Athletics"},{emoji:"⚽",fr:"Football",en:"Soccer"},
  {emoji:"🏊",fr:"Natation",en:"Swimming"},{emoji:"🚴",fr:"Cyclisme",en:"Cycling"},
  {emoji:"🤸",fr:"CrossFit",en:"CrossFit"},{emoji:"🥋",fr:"Arts martiaux",en:"Martial Arts"},
  {emoji:"⛷️",fr:"Ski / Snow",en:"Ski / Snow"},{emoji:"🏄",fr:"Surf / SUP",en:"Surf / SUP"},
  {emoji:"🎿",fr:"Autres",en:"Others"},
];

const FMTI={
  "Présentiel":"📍","Visio":"🎥","Programme écrit":"📋","Discussion / Conseil":"💬",
  "In-person":"📍","Video call":"🎥","Written program":"📋","Consultation":"💬"
};

const SLOTS=["Lun 09h","Lun 11h","Mar 14h","Mer 10h","Jeu 09h","Ven 11h","Sam 08h"];
const COACH_COLORS=["#FF6B35","#6C63FF","#00D4AA","#FF6B9D","#FFD166","#A78BFA","#06D6A0"];

function Pill({label,active,onClick,color,C}){
  return <button onClick={onClick} style={{padding:"6px 14px",borderRadius:999,border:`1px solid ${active?(color||C.accent):"rgba(128,128,160,0.25)"}`,background:active?`${color||C.accent}22`:"transparent",color:active?(color||C.accent):C.muted,cursor:"pointer",fontSize:13,fontWeight:active?600:400}}>{label}</button>;
}
function Tag({label,color="#A78BFA"}){
  return <span style={{fontSize:11,padding:"2px 8px",borderRadius:999,background:`${color}22`,color,fontWeight:600}}>{label}</span>;
}
function Stars({n,size=13,interactive=false,onRate,C}){
  return <span>{[1,2,3,4,5].map(i=><span key={i} onClick={()=>interactive&&onRate&&onRate(i)} style={{color:i<=Math.round(n)?C.gold:"rgba(128,128,128,0.3)",fontSize:size,cursor:interactive?"pointer":"default"}}>★</span>)}</span>;
}
function Av({initials,color,size=44}){
  return <div style={{width:size,height:size,borderRadius:"50%",background:`${color}22`,border:`2px solid ${color}55`,color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:size*.28,flexShrink:0}}>{initials}</div>;
}
function BtnPrimary({label,onClick,C,disabled=false}){
  return <button onClick={onClick} disabled={disabled} style={{width:"100%",padding:12,borderRadius:12,background:disabled?"#555":`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,fontSize:15,cursor:disabled?"not-allowed":"pointer"}}>{label}</button>;
}
function Alert({msg,type="error",C}){
  if(!msg)return null;
  const col=type==="success"?C.green:C.red;
  return <div style={{padding:"10px 14px",borderRadius:10,background:`${col}18`,border:`1px solid ${col}44`,color:col,fontSize:13,marginBottom:12}}>{msg}</div>;
}

function CoachCard({c,lang,T,C,onSelect,onBook}){
  const initials=(c.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const color=c.color||COACH_COLORS[c.id%COACH_COLORS.length]||"#6C63FF";
  const formats=c.formats||[];
  return(
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,cursor:"pointer"}} onClick={onSelect}>
      <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}}>
        <Av initials={initials} color={color} size={44}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:15,color:C.txt,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.name}</div>
          <div style={{fontSize:12,color:C.muted}}>{c.sport} · {c.location||"—"}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontWeight:800,color:C.accent,fontSize:16}}>{c.price}€</div>
          <div style={{fontSize:11,color:C.muted}}>{T.perH}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
        {formats.map(f=><span key={f} style={{fontSize:11,padding:"2px 6px",borderRadius:6,background:`${C.accent2}18`,color:C.accent2,fontWeight:600}}>{(FMTI[f]||"")+f.slice(0,10)}</span>)}
      </div>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 10px",lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{c.bio||"—"}</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <Stars n={c.avg_rating||0} size={13} C={C}/>
          <span style={{fontSize:11,color:C.muted}}>({c.review_count||0} {T.reviews})</span>
        </div>
        <button onClick={e=>{e.stopPropagation();onBook();}} style={{padding:"6px 14px",borderRadius:999,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>{T.bookBtn}</button>
      </div>
    </div>
  );
}

export default function App(){
  const [dark,setDark]=useState(true);
  const C=dark?DARK_C:LIGHT_C;
  const [lang,setLang]=useState("fr");
  const [page,setPage]=useState("home");
  const [sportFilter,setSportFilter]=useState("ALL");
  const [fmtFilter,setFmtFilter]=useState("ALL");
  const [selectedCoach,setSelectedCoach]=useState(null);
  const [coaches,setCoaches]=useState([]);
  const [loadingCoaches,setLoadingCoaches]=useState(true);
  const [bookCoach,setBookCoach]=useState(null);
  const [bookDone,setBookDone]=useState(false);
  const [bookSlot,setBookSlot]=useState(null);
  const [bookFmt,setBookFmt]=useState(null);
  const [user,setUser]=useState(null);
  const [userRole,setUserRole]=useState(null);
  const [authMode,setAuthMode]=useState("login");
  const [authLoading,setAuthLoading]=useState(false);
  const [authMsg,setAuthMsg]=useState(null);
  const [authMsgType,setAuthMsgType]=useState("error");
  const [loginEmail,setLoginEmail]=useState("");
  const [loginPass,setLoginPass]=useState("");
  const [signupRole,setSignupRole]=useState("client");
  const [signupName,setSignupName]=useState("");
  const [signupEmail,setSignupEmail]=useState("");
  const [signupPass,setSignupPass]=useState("");
  const [signupPass2,setSignupPass2]=useState("");
  const [signupSport,setSignupSport]=useState("");
  const [signupRate,setSignupRate]=useState("");
  const [signupBio,setSignupBio]=useState("");
  const [signupLoc,setSignupLoc]=useState("");
  const [signupLangs,setSignupLangs]=useState("");
  const [signupCertifs,setSignupCertifs]=useState([""]);
  const [signupFormats,setSignupFormats]=useState([]);
  const [signupBirthdate,setSignupBirthdate]=useState("");
const [signupCGU,setSignupCGU]=useState(false);
  const [reviewText,setReviewText]=useState("");
  const [reviewNote,setReviewNote]=useState(5);
  const [reviewDone,setReviewDone]=useState(false);
  const [reviews,setReviews]=useState([]);
  const [myBookings,setMyBookings]=useState([]);
  const [messages,setMessages]=useState([
    {from:"coach",text_fr:"Bonjour ! Prêt pour demain ?",text_en:"Hey! Ready for tomorrow?"},
    {from:"user",text_fr:"Oui ! À quelle heure ?",text_en:"Yes! What time?"},
    {from:"coach",text_fr:"10h. N'oublie pas tes gants 🥊",text_en:"10 AM. Don't forget your gloves 🥊"},
  ]);
  const [msgInput,setMsgInput]=useState("");
  const msgEndRef=useRef(null);
  const T=LANG[lang];

  // Auth listener
  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session){setUser(session.user);fetchUserRole(session.user.id);}
    });
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      if(session){setUser(session.user);fetchUserRole(session.user.id);}
      else{setUser(null);setUserRole(null);}
    });
    return()=>subscription.unsubscribe();
  },[]);

  // Fetch coaches
  useEffect(()=>{fetchCoaches();},[]);
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=>{if(user)fetchMyBookings();},[user]);

  useEffect(()=>{msgEndRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);

  const fetchCoaches=async()=>{
    setLoadingCoaches(true);
    const{data,error}=await supabase.from("coaches").select("*");
    if(!error&&data)setCoaches(data);
    setLoadingCoaches(false);
  };

  const fetchUserRole=async(uid)=>{
    const{data}=await supabase.from("coaches").select("id").eq("user_id",uid).single();
    setUserRole(data?"coach":"client");
  };

  const fetchReviews=async(coachId)=>{
    const{data}=await supabase.from("reviews").select("*").eq("coach_id",coachId).order("created_at",{ascending:false});
    if(data)setReviews(data);
  };

  const fetchMyBookings=async()=>{
    if(!user)return;
    const{data}=await supabase.from("bookings").select("*,coaches(name,sport)").eq("client_id",user.id).order("created_at",{ascending:false});
    if(data)setMyBookings(data);
  };

  const switchLang=l=>{setLang(l);setSportFilter("ALL");};

  const filteredCoaches=coaches.filter(c=>{
    const s=sportFilter==="ALL"||c.sport===sportFilter;
    const f=fmtFilter==="ALL"||(c.formats||[]).includes(fmtFilter);
    return s&&f;
  });

  // LOGIN
  const doLogin=async()=>{
    if(!loginEmail||!loginPass){setAuthMsg(T.fillAll);setAuthMsgType("error");return;}
    setAuthLoading(true);setAuthMsg(null);
    const{error}=await supabase.auth.signInWithPassword({email:loginEmail,password:loginPass});
    setAuthLoading(false);
    if(error){setAuthMsg(error.message);setAuthMsgType("error");}
    else{setPage("dashboard");}
  };

  // SIGNUP
  const doSignup=async()=>{
   if(!signupName||!signupEmail||!signupPass){setAuthMsg(T.fillAll);setAuthMsgType("error");return;}
if(signupRole==="client"&&!signupBirthdate){setAuthMsg(lang==="fr"?"Veuillez entrer votre date de naissance.":"Please enter your date of birth.");setAuthMsgType("error");return;}
if(signupRole==="client"&&signupBirthdate){
  const age=new Date().getFullYear()-new Date(signupBirthdate).getFullYear();
  if(age<18){setAuthMsg(lang==="fr"?"Vous devez avoir au moins 18 ans pour vous inscrire.":"You must be at least 18 years old to sign up.");setAuthMsgType("error");return;}
}
if(!signupCGU){setAuthMsg(lang==="fr"?"Vous devez accepter les CGU pour continuer.":"You must accept the Terms of Service to continue.");setAuthMsgType("error");return;}
if(signupRole==="coach"&&(!signupSport||!signupRate||!signupLoc||!signupLangs||!signupBio)){setAuthMsg(lang==="fr"?"Veuillez remplir tous les champs obligatoires.":"Please fill in all required fields.");setAuthMsgType("error");return;}
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
if(!passwordRegex.test(signupPass)){
  setAuthMsg(lang==="fr"?"Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial (!@#$%^&*).":"Password must contain at least 8 characters, one uppercase letter, one number and one special character (!@#$%^&*).");
  setAuthMsgType("error");
  return;
}
if(signupPass!==signupPass2){setAuthMsg(T.passwordMismatch);setAuthMsgType("error");return;}
    const{data,error}=await supabase.auth.signUp({
      email:signupEmail,password:signupPass,
      options:{data:{full_name:signupName,role:signupRole}}
    });
    if(error){setAuthLoading(false);setAuthMsg(error.message);setAuthMsgType("error");return;}
    if(signupRole==="coach"&&data.user){
      const sp=ALL_SPORTS.find(s=>s.fr===signupSport||s.en===signupSport)||ALL_SPORTS[0];
      const initials=signupName.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
      const color=COACH_COLORS[Math.floor(Math.random()*COACH_COLORS.length)];
      await supabase.from("coaches").insert({
        user_id:data.user.id, name:signupName, sport:`${sp.emoji} ${lang==="fr"?sp.fr:sp.en}`,
        location:signupLoc, langs:signupLangs, price:parseInt(signupRate)||60,
        bio:signupBio, certifs:signupCertifs.filter(Boolean),
        formats:signupFormats.length?signupFormats:["Présentiel","Visio"],
        avatar:initials, color
      });
      await fetchCoaches();
    }
    setAuthLoading(false);
    setAuthMsg(signupRole==="coach"?T.coachRegistered:T.clientRegistered);
    setAuthMsgType("success");
    setTimeout(()=>{setPage("home");},2000);
  };

  // BOOKING
  const doBook=async()=>{
    if(!user){setPage("auth");setAuthMode("login");setBookCoach(null);return;}
    if(!bookSlot||!bookFmt){return;}
    const{error}=await supabase.from("bookings").insert({
      client_id:user.id, coach_id:bookCoach.id,
      slot:bookSlot, format:bookFmt,
      amount:bookCoach.price, status:"pending"
    });
    if(!error){setBookDone(true);fetchMyBookings();}
  };

  // REVIEW
  const submitReview=async()=>{
    if(!reviewText.trim()||!user||!selectedCoach)return;
    await supabase.from("reviews").insert({
      coach_id:selectedCoach.id, client_id:user.id,
      note:reviewNote, text:reviewText
    });
    setReviewText("");setReviewDone(true);
    fetchReviews(selectedCoach.id);
    setTimeout(()=>setReviewDone(false),2500);
  };

  const sendMsg=()=>{
    if(!msgInput.trim())return;
    const txt=msgInput;
    setMessages(m=>[...m,{from:"user",text_fr:txt,text_en:txt}]);
    setMsgInput("");
    setTimeout(()=>setMessages(m=>[...m,{from:"coach",text_fr:"Super, à très vite !",text_en:"Great, see you soon!"}]),800);
  };

  const doLogout=async()=>{
    await supabase.auth.signOut();
    setUser(null);setUserRole(null);setPage("home");
  };

  const card={background:C.card,border:`1px solid ${C.border}`,borderRadius:16};
  const card2={background:C.card2,border:`1px solid ${C.border}`,borderRadius:16};
  const inputSt={width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:14,boxSizing:"border-box",outline:"none"};

  return(
    <div style={{fontFamily:"sans-serif",color:C.txt,minHeight:"100vh",background:C.dark,transition:"background .2s"}}>

      {/* NAV */}
      <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:`1px solid ${C.border}`,background:dark?"rgba(14,14,26,.92)":"rgba(244,244,248,.95)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:10,flexWrap:"wrap",gap:8}}>
        <div onClick={()=>setPage("home")} style={{cursor:"pointer"}}>
          <span style={{fontWeight:800,fontSize:20,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Sportriq</span>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {[["home","Home"],["coaches",T.nav.coaches],["messages",T.nav.messages]].map(([p,l])=>(
            <button key={p} onClick={()=>setPage(p)} style={{fontSize:13,padding:"5px 12px",borderRadius:8,border:"none",background:page===p?`${C.accent}18`:"transparent",cursor:"pointer",color:page===p?C.accent:C.muted,fontWeight:page===p?600:400}}>{l}</button>
          ))}
          {user&&<button onClick={()=>{setPage("dashboard");fetchMyBookings();}} style={{fontSize:13,padding:"5px 12px",borderRadius:8,border:"none",background:page==="dashboard"?`${C.accent}18`:"transparent",cursor:"pointer",color:page==="dashboard"?C.accent:C.muted,fontWeight:page==="dashboard"?600:400}}>{T.nav.dashboard}</button>}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={()=>setDark(d=>!d)} style={{fontSize:15,padding:"3px 8px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",cursor:"pointer"}}>{dark?"☀️":"🌙"}</button>
          {["fr","en"].map(l=>(
            <button key={l} onClick={()=>switchLang(l)} style={{fontSize:12,padding:"3px 9px",borderRadius:999,border:`1px solid ${lang===l?C.accent:C.border}`,background:lang===l?`${C.accent}22`:"transparent",color:lang===l?C.accent:C.muted,cursor:"pointer",fontWeight:lang===l?700:400}}>{l.toUpperCase()}</button>
          ))}
          {user?(
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:13,color:C.muted}}>👤 {(user.user_metadata?.full_name||user.email).split(" ")[0]}</span>
              <button onClick={doLogout} style={{fontSize:12,padding:"5px 10px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer"}}>{T.logout}</button>
            </div>
          ):(
            <>
              <button onClick={()=>{setAuthMode("login");setAuthMsg(null);setPage("auth");}} style={{fontSize:13,padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",cursor:"pointer",color:C.txt}}>{T.loginTitle}</button>
              <button onClick={()=>{setAuthMode("signup");setAuthMsg(null);setPage("auth");}} style={{fontSize:13,padding:"6px 14px",borderRadius:999,border:"none",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#fff",cursor:"pointer",fontWeight:700}}>{T.signupTitle}</button>
            </>
          )}
        </div>
      </nav>

      {/* AUTH */}
      {page==="auth"&&(
        <div style={{maxWidth:460,margin:"48px auto",padding:"0 20px"}}>
          <div style={{...card,padding:28}}>
            <h2 style={{fontWeight:700,fontSize:22,marginBottom:16,color:C.txt}}>{authMode==="login"?T.loginTitle:T.signupTitle}</h2>
            <Alert msg={authMsg} type={authMsgType} C={C}/>
            {authMode==="login"?(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <input placeholder={T.email} value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} style={inputSt}/>
                <input placeholder={T.password} type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={inputSt}/>

                <BtnPrimary label={authLoading?T.loading:T.loginBtn} onClick={doLogin} C={C} disabled={authLoading}/>
                <p style={{fontSize:13,color:C.muted,textAlign:"center"}}>{T.noAccount} <span onClick={()=>{setAuthMode("signup");setAuthMsg(null);}} style={{color:C.accent,cursor:"pointer"}}>{T.signupTitle}</span></p>
              </div>
            ):(
              <>
                <div style={{display:"flex",gap:8,marginBottom:14}}>
                  {[["client",T.asClient,"👤"],["coach",T.asCoach,"🏅"]].map(([r,l,ic])=>(
                    <button key={r} onClick={()=>setSignupRole(r)} style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${signupRole===r?C.accent:C.border}`,background:signupRole===r?`${C.accent}18`:"transparent",color:signupRole===r?C.accent:C.muted,cursor:"pointer",fontWeight:signupRole===r?700:400,fontSize:14}}>{ic} {l}</button>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <input placeholder={T.name} value={signupName} onChange={e=>setSignupName(e.target.value)} style={inputSt}/>
                  <input placeholder={T.email} value={signupEmail} onChange={e=>setSignupEmail(e.target.value)} style={inputSt}/>
                  <input placeholder={T.password} type="password" value={signupPass} onChange={e=>setSignupPass(e.target.value)} style={inputSt}/>
                  <input placeholder={T.confirmPassword} type="password" value={signupPass2} onChange={e=>setSignupPass2(e.target.value)} style={inputSt}/>
                  {signupRole==="coach"&&(
                    <>
                      <select value={signupSport} onChange={e=>setSignupSport(e.target.value)} style={{...inputSt,color:signupSport?C.txt:C.muted}}>
                        <option value="">{T.speciality}</option>
                        {ALL_SPORTS.map(s=><option key={s.fr} value={lang==="fr"?s.fr:s.en}>{s.emoji} {lang==="fr"?s.fr:s.en}</option>)}
                      </select>
                      <input placeholder={T.hourlyRate} type="number" value={signupRate} onChange={e=>setSignupRate(e.target.value)} style={inputSt}/>
                      <input placeholder={lang==="fr"?"Ville, Pays":"City, Country"} value={signupLoc} onChange={e=>setSignupLoc(e.target.value)} style={inputSt}/>
                      <input placeholder={lang==="fr"?"Langues (ex: FR, EN)":"Languages (e.g. FR, EN)"} value={signupLangs} onChange={e=>setSignupLangs(e.target.value)} style={inputSt}/>
                      <textarea placeholder={T.bio} value={signupBio} onChange={e=>setSignupBio(e.target.value)} rows={3} style={{...inputSt,resize:"vertical"}}/>
                      <div>
                        <div style={{fontSize:12,color:C.muted,marginBottom:6}}>{T.formatLabel}</div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          {(lang==="fr"?["Présentiel","Visio","Programme écrit","Discussion / Conseil"]:["In-person","Video call","Written program","Consultation"]).map(f=>(
                            <button key={f} onClick={()=>setSignupFormats(fs=>fs.includes(f)?fs.filter(x=>x!==f):[...fs,f])} style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${signupFormats.includes(f)?C.accent2:C.border}`,background:signupFormats.includes(f)?`${C.accent2}22`:"transparent",color:signupFormats.includes(f)?C.accent2:C.muted,cursor:"pointer",fontSize:12}}>{FMTI[f]||""} {f}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize:12,color:C.muted,marginBottom:6}}>{T.certif}</div>
                        {signupCertifs.map((cv,i)=>(
                          <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
                            <input value={cv} onChange={e=>{const nc=[...signupCertifs];nc[i]=e.target.value;setSignupCertifs(nc);}} placeholder={`${T.certif} ${i+1}`} style={inputSt}/>
                            {i===signupCertifs.length-1&&<button onClick={()=>setSignupCertifs(cs=>[...cs,""])} style={{padding:"0 12px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.accent,cursor:"pointer",fontSize:18}}>+</button>}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {signupRole==="client"&&(
  <input type="date" value={signupBirthdate} onChange={e=>setSignupBirthdate(e.target.value)} style={{...inputSt,color:signupBirthdate?C.txt:C.muted}} max={new Date(new Date().setFullYear(new Date().getFullYear()-18)).toISOString().split('T')[0]}/>
)}
<div style={{display:"flex",alignItems:"flex-start",gap:8,marginTop:4}}>
  <input type="checkbox" checked={signupCGU} onChange={e=>setSignupCGU(e.target.checked)} style={{marginTop:3,cursor:"pointer",accentColor:C.accent}}/>
  <span style={{fontSize:13,color:C.muted}}>
    {lang==="fr"?"J'accepte les ":"I accept the "}
    <span style={{color:C.accent,cursor:"pointer",textDecoration:"underline"}}>
      {lang==="fr"?"Conditions Générales d'Utilisation":"Terms of Service"}
    </span>
    {lang==="fr"?" et la ":" and the "}
    <span style={{color:C.accent,cursor:"pointer",textDecoration:"underline"}}>
      {lang==="fr"?"Politique de confidentialité":"Privacy Policy"}
    </span>
  </span>
</div>
                  <BtnPrimary label={authLoading?T.loading:T.signupBtn} onClick={doSignup} C={C} disabled={authLoading}/>
                  <p style={{fontSize:13,color:C.muted,textAlign:"center"}}>{T.hasAccount} <span onClick={()=>{setAuthMode("login");setAuthMsg(null);}} style={{color:C.accent,cursor:"pointer"}}>{T.loginTitle}</span></p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* HOME */}
      {page==="home"&&(
        <div>
          <div style={{padding:"72px 24px 52px",textAlign:"center",background:`radial-gradient(ellipse 80% 60% at 50% -10%,${C.accent}22,transparent)`}}>
            <div style={{display:"inline-block",fontSize:12,fontWeight:700,padding:"4px 14px",borderRadius:999,border:`1px solid ${C.accent}44`,color:C.accent,marginBottom:18,letterSpacing:.8}}>🌍 {lang==="fr"?"MARKETPLACE MONDIALE DU COACHING SPORTIF":"GLOBAL SPORTS COACHING MARKETPLACE"}</div>
            <h1 style={{fontSize:44,fontWeight:800,margin:"0 0 14px",lineHeight:1.1,color:C.txt}}>
                          
              {lang==="fr"?"Trouve ton coach,":"Find your coach,"}<br/>
              <span style={{background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{lang==="fr"?"vis ta performance.":"live your performance."}</span>
            </h1>
            <p style={{color:C.muted,fontSize:16,maxWidth:520,margin:"0 auto 32px"}}>{T.sub}</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",maxWidth:680,margin:"0 auto 36px",background:C.card,borderRadius:14,padding:10,border:`1px solid ${C.border}`}}>
              {[T.sportLabel,T.locationLabel,T.langLabel].map((pl,i)=>(
                <input key={i} placeholder={pl} style={{flex:"1 1 120px",padding:"9px 12px",borderRadius:10,border:"none",background:dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:14,outline:"none"}}/>
              ))}
              <button onClick={()=>setPage("coaches")} style={{padding:"9px 22px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14}}>{T.searchBtn}</button>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:36,flexWrap:"wrap"}}>
              {T.stats.map((s,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontWeight:800,fontSize:24,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.v}</div>
                  <div style={{color:C.muted,fontSize:12}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"36px 24px 0"}}>
            <h2 style={{fontWeight:700,fontSize:20,marginBottom:16,color:C.txt}}>{T.sports}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:8}}>
              {ALL_SPORTS.map((s,i)=>(
                <button key={i} onClick={()=>{setSportFilter(lang==="fr"?`${s.emoji} ${s.fr}`:`${s.emoji} ${s.en}`);setPage("coaches");}} style={{padding:"14px 8px",borderRadius:12,border:`1px solid ${C.border}`,background:C.card,cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:22,marginBottom:4}}>{s.emoji}</div>
                  <div style={{fontSize:12,color:C.muted,fontWeight:600}}>{lang==="fr"?s.fr:s.en}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{padding:"44px 24px 0"}}>
            <h2 style={{fontWeight:700,fontSize:20,marginBottom:20,color:C.txt}}>{T.howTitle}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12}}>
              {T.steps.map((s,i)=>(
                <div key={i} style={{...card2,padding:20}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:15,color:"#fff",flexShrink:0}}>{s.i}</div>
                    {i<T.steps.length-1&&<div style={{flex:1,height:2,background:`linear-gradient(to right,${C.accent}44,transparent)`}}/>}
                  </div>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:4,color:C.txt}}>{s.t}</div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.5}}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"44px 24px 52px"}}>
            <h2 style={{fontWeight:700,fontSize:20,marginBottom:16,color:C.txt}}>{T.featured}</h2>
            {loadingCoaches?<p style={{color:C.muted}}>{T.loading}</p>:coaches.length===0?<p style={{color:C.muted}}>{lang==="fr"?"Les premiers coachs arrivent bientôt !":"First coaches coming soon!"}</p>:(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:14}}>
                {coaches.slice(0,4).map(c=><CoachCard key={c.id} c={c} lang={lang} T={T} C={C} onSelect={()=>{setSelectedCoach(c);fetchReviews(c.id);setPage("coaches");}} onBook={()=>setBookCoach(c)}/>)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* COACHES */}
      {page==="coaches"&&!selectedCoach&&(
        <div style={{padding:"28px 24px"}}>
          <h2 style={{fontWeight:700,fontSize:20,marginBottom:14,color:C.txt}}>{T.nav.coaches}</h2>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
            <Pill label={lang==="fr"?"Tous":"All"} active={sportFilter==="ALL"} onClick={()=>setSportFilter("ALL")} C={C}/>
            {[...new Set(coaches.map(c=>c.sport))].filter(Boolean).map(s=>(
              <Pill key={s} label={s} active={sportFilter===s} onClick={()=>setSportFilter(s)} C={C}/>
            ))}
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
            <Pill label={lang==="fr"?"Tous formats":"All formats"} active={fmtFilter==="ALL"} onClick={()=>setFmtFilter("ALL")} color={C.accent2} C={C}/>
            {T.formats.map(f=>(
              <Pill key={f} label={`${FMTI[f]||""} ${f}`} active={fmtFilter===f} onClick={()=>setFmtFilter(f)} color={C.accent2} C={C}/>
            ))}
          </div>
          {loadingCoaches?<p style={{color:C.muted}}>{T.loading}</p>:(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:14}}>
              {filteredCoaches.map(c=><CoachCard key={c.id} c={c} lang={lang} T={T} C={C} onSelect={()=>{setSelectedCoach(c);fetchReviews(c.id);}} onBook={()=>setBookCoach(c)}/>)}
            </div>
          )}
          {!loadingCoaches&&filteredCoaches.length===0&&<p style={{color:C.muted,marginTop:24}}>{T.noCoaches}</p>}
          <div style={{marginTop:28,...card2,padding:20,textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:8}}>🎿</div>
            <div style={{fontWeight:700,fontSize:15,marginBottom:6,color:C.txt}}>{T.others}</div>
            <p style={{fontSize:13,color:C.muted,marginBottom:14}}>{lang==="fr"?"Ton sport n'est pas dans la liste ? Inscris-toi comme coach !":"Your sport isn't listed? Sign up as a coach!"}</p>
            <button onClick={()=>{setAuthMode("signup");setPage("auth");}} style={{padding:"8px 20px",borderRadius:999,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13}}>{lang==="fr"?"Devenir coach":"Become a coach"}</button>
          </div>
        </div>
      )}

      {/* COACH PROFILE */}
      {page==="coaches"&&selectedCoach&&(
        <div style={{padding:"24px",maxWidth:620,margin:"0 auto"}}>
          <button onClick={()=>setSelectedCoach(null)} style={{fontSize:13,color:C.muted,background:"none",border:"none",cursor:"pointer",marginBottom:14}}>← {T.back}</button>
          <div style={{...card,padding:24}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:14}}>
              <Av initials={(selectedCoach.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()} color={selectedCoach.color||C.accent} size={60}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:18,color:C.txt}}>{selectedCoach.name}</div>
                <div style={{color:C.muted,fontSize:14,marginBottom:6}}>{selectedCoach.sport} · {selectedCoach.location||"—"}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(selectedCoach.formats||[]).map(f=><Tag key={f} label={`${FMTI[f]||""} ${f}`} color={C.accent2}/>)}
                  {selectedCoach.langs&&<Tag label={selectedCoach.langs} color={C.muted}/>}
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,fontSize:24,color:C.accent}}>{selectedCoach.price}€</div>
                <div style={{fontSize:12,color:C.muted}}>{T.perH}</div>
              </div>
            </div>
            <p style={{fontSize:14,color:C.muted,marginBottom:14,lineHeight:1.6}}>{selectedCoach.bio||"—"}</p>
            {(selectedCoach.certifs||[]).length>0&&(
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,color:C.muted,marginBottom:6}}>{T.certif}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{selectedCoach.certifs.map((cv,i)=><Tag key={i} label={cv} color={C.accent}/>)}</div>
              </div>
            )}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:8,color:C.txt}}>{T.formatLabel}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {(selectedCoach.formats||[]).map(f=>(
                  <button key={f} onClick={()=>setBookFmt(f)} style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${bookFmt===f?C.accent2:C.border}`,background:bookFmt===f?`${C.accent2}18`:"transparent",cursor:"pointer",fontSize:13,color:bookFmt===f?C.accent2:C.muted,fontWeight:bookFmt===f?700:400}}>{FMTI[f]||""} {f}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:8,color:C.txt}}>{T.availableSlots}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {SLOTS.map(s=>(
                  <button key={s} onClick={()=>setBookSlot(s)} style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${bookSlot===s?C.accent:C.border}`,background:bookSlot===s?`${C.accent}18`:"transparent",cursor:"pointer",fontSize:13,color:bookSlot===s?C.accent:C.muted}}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:22}}>
              <button onClick={()=>setBookCoach(selectedCoach)} style={{flex:1,padding:12,borderRadius:12,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:15}}>{T.bookBtn}</button>
              <button onClick={()=>setPage("messages")} style={{flex:1,padding:12,borderRadius:12,background:"transparent",border:`1px solid ${C.border}`,cursor:"pointer",color:C.txt,fontSize:14}}>💬 Message</button>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16}}>
              <h3 style={{fontWeight:700,fontSize:15,marginBottom:14,color:C.txt}}>{T.reviewsTitle}</h3>
              {reviews.length===0?<p style={{color:C.muted,fontSize:14}}>{T.noReviews}</p>:reviews.map((r,i)=>(
                <div key={i} style={{marginBottom:12,paddingBottom:12,borderBottom:i<reviews.length-1?`1px solid ${C.border}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:`${C.accent}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.accent}}>{(r.client_id||"?")[0]}</div>
                    <Stars n={r.note} size={11} C={C}/>
                  </div>
                  <p style={{fontSize:13,color:C.muted,margin:0,paddingLeft:36}}>{r.text}</p>
                </div>
              ))}
              {user&&!reviewDone&&(
                <div style={{marginTop:10}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:8,color:C.txt}}>{T.leaveReview}</div>
                  <Stars n={reviewNote} size={24} interactive onRate={n=>setReviewNote(n)} C={C}/>
                  <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder={T.reviewPlaceholder} rows={2} style={{...inputSt,marginTop:8,resize:"vertical"}}/>
                  <button onClick={submitReview} style={{marginTop:8,padding:"8px 18px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>{T.submitReview}</button>
                </div>
              )}
              {reviewDone&&<div style={{color:C.green,fontSize:13,marginTop:8}}>✓ {lang==="fr"?"Avis publié !":"Review posted!"}</div>}
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES */}
      {page==="messages"&&(
        <div style={{padding:"24px",maxWidth:560,margin:"0 auto"}}>
          <h2 style={{fontWeight:700,fontSize:18,marginBottom:14,color:C.txt}}>💬 Messages</h2>
          <div style={{...card,overflow:"hidden"}}>
            <div style={{padding:"14px 16px",background:C.card2,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
              <Av initials="CS" color={C.accent} size={36}/>
              <div>
                <div style={{fontWeight:600,fontSize:14,color:C.txt}}>Sportriq Support</div>
                <div style={{fontSize:12,color:C.green}}>● {T.online}</div>
              </div>
            </div>
            <div style={{padding:16,minHeight:260,maxHeight:300,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,background:C.card}}>
              {messages.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"74%",padding:"9px 13px",borderRadius:14,background:m.from==="user"?`linear-gradient(135deg,${C.accent},${C.accent2})`:C.card2,color:m.from==="user"?"#fff":C.txt,fontSize:14}}>
                    {lang==="fr"?m.text_fr:m.text_en}
                  </div>
                </div>
              ))}
              <div ref={msgEndRef}/>
            </div>
            <div style={{padding:"10px 12px",borderTop:`1px solid ${C.border}`,display:"flex",gap:8}}>
              <input value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder={T.msgPlaceholder} style={{...inputSt,marginBottom:0}}/>
              <button onClick={sendMsg} style={{padding:"9px 16px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",cursor:"pointer",fontWeight:700,whiteSpace:"nowrap"}}>{T.msgSend}</button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {page==="dashboard"&&(
        <div style={{padding:"28px 24px"}}>
          {!user?(
            <div style={{textAlign:"center",paddingTop:40}}>
              <p style={{color:C.muted,marginBottom:16}}>{lang==="fr"?"Connecte-toi pour accéder au dashboard.":"Log in to access the dashboard."}</p>
              <button onClick={()=>{setAuthMode("login");setPage("auth");}} style={{padding:"10px 24px",borderRadius:999,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer"}}>{T.loginTitle}</button>
            </div>
          ):(
            <>
              <h2 style={{fontWeight:700,fontSize:22,margin:0,color:C.txt}}>{T.dashTitle}</h2>
              <p style={{color:C.muted,margin:"4px 0 20px"}}>{T.dashSub}, {(user.user_metadata?.full_name||user.email).split(" ")[0]} 👋 <Tag label={userRole==="coach"?"🏅 Coach":"👤 Sportif"} color={userRole==="coach"?C.accent:C.accent2}/></p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:24}}>
                {[
                  {l:T.upcoming,v:myBookings.filter(b=>b.status==="pending").length.toString()},
                  {l:lang==="fr"?"Réservations totales":"Total bookings",v:myBookings.length.toString()},
                ].map((s,i)=>(
                  <div key={i} style={{background:`${C.accent}${i===0?"22":"11"}`,borderRadius:12,padding:16,border:`1px solid ${C.accent}${i===0?"44":"22"}`}}>
                    <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{s.l}</div>
                    <div style={{fontSize:22,fontWeight:800,color:i===0?C.accent:C.txt}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <h3 style={{fontWeight:700,fontSize:16,marginBottom:10,color:C.txt}}>{T.nextSessions}</h3>
              {myBookings.length===0?(
                <p style={{color:C.muted,fontSize:14}}>{lang==="fr"?"Aucune réservation pour l'instant.":"No bookings yet."}</p>
              ):myBookings.map((b,i)=>(
                <div key={i} style={{...card,padding:"12px 16px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:14,color:C.txt}}>{b.coaches?.name||"Coach"} · {b.slot}</div>
                    <div style={{fontSize:12,color:C.muted}}>{b.format} · {b.amount}€</div>
                  </div>
                  <Tag label={b.status} color={b.status==="pending"?C.gold:C.green}/>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookCoach&&!bookDone&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,backdropFilter:"blur(4px)"}} onClick={()=>setBookCoach(null)}>
          <div style={{...card,padding:28,maxWidth:380,width:"90%"}} onClick={e=>e.stopPropagation()}>
            <h3 style={{fontWeight:700,fontSize:18,marginBottom:4,color:C.txt}}>{T.bookWith} {bookCoach.name}</h3>
            <p style={{color:C.muted,fontSize:14,marginBottom:18}}>{bookCoach.price}€ {T.perH} · Coach 5% + Client 3%</p>
            {!user&&<Alert msg={lang==="fr"?"Connecte-toi pour réserver.":"Log in to book."} type="error" C={C}/>}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:C.txt,marginBottom:8}}>{T.formatLabel}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {(bookCoach.formats||[]).map(f=>(
                  <button key={f} onClick={()=>setBookFmt(f)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${bookFmt===f?C.accent2:C.border}`,background:bookFmt===f?`${C.accent2}22`:"transparent",cursor:"pointer",fontSize:12,color:bookFmt===f?C.accent2:C.muted,fontWeight:bookFmt===f?700:400}}>{FMTI[f]||""} {f}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:13,fontWeight:600,color:C.txt,marginBottom:8}}>{T.availableSlots}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {SLOTS.slice(0,5).map(s=>(
                  <button key={s} onClick={()=>setBookSlot(s)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${bookSlot===s?C.accent:C.border}`,background:bookSlot===s?`${C.accent}22`:"transparent",cursor:"pointer",fontSize:12,color:bookSlot===s?C.accent:C.muted}}>{s}</button>
                ))}
              </div>
            </div>
            <BtnPrimary label={lang==="fr"?`Confirmer la réservation`:`Confirm booking`} onClick={doBook} C={C} disabled={!bookSlot||!bookFmt}/>
          </div>
        </div>
      )}
      {bookDone&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}} onClick={()=>{setBookCoach(null);setBookDone(false);setBookSlot(null);setBookFmt(null);}}>
          <div style={{...card,padding:36,maxWidth:300,width:"90%",textAlign:"center"}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:`${C.green}22`,border:`2px solid ${C.green}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}}>✓</div>
            <h3 style={{fontWeight:700,fontSize:18,marginBottom:8,color:C.txt}}>{T.bookingConfirmed}</h3>
            <p style={{color:C.muted,fontSize:14}}>{T.bookingConfirmedSub}</p>
          </div>
        </div>
      )}

      <div style={{borderTop:`1px solid ${C.border}`,padding:"14px 24px",textAlign:"center",fontSize:12,color:C.muted,marginTop:24}}>
        © 2026 <span style={{background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:700}}>Sportriq</span> · Paiements sécurisés Stripe
      </div>
    </div>
  );
}