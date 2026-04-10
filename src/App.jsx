import { useState, useRef, useEffect } from "react";
import Legal from "./Legal";
import { supabase } from "./supabase";
import StripePayment from "./StripePayment";

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
    sub:"Coachs certifiés en Europe · Tous sports · Présentiel, Visio, Programme écrit",
    searchBtn:"Rechercher", sportLabel:"Sport", locationLabel:"Ville ou pays", langLabel:"Langue",
    searchPlaceholder:"Coach, sport, ville…",
    sports:"Sports populaires", seeMore:"Voir tous les sports", seeLess:"Voir moins",
    featured:"Coachs en vedette", howTitle:"Comment ça marche",
    steps:[
      {i:"1",t:"Explore",d:"Recherche par sport, ville, langue et budget"},
      {i:"2",t:"Réserve",d:"Présentiel, visio, programme ou discussion"},
      {i:"3",t:"Progresse",d:"Entraîne-toi avec ton coach certifié"},
      {i:"4",t:"Évalue",d:"Note ta session et inspire la communauté"},
    ],
    stats:[{v:"Europe",l:"& bientôt mondial"},{v:"Tous sports",l:"& disciplines"},{v:"100%",l:"En ligne & présentiel"},{v:"Gratuit",l:"Inscription coach"}],
    formats:["Présentiel","Visio","Programme écrit","Discussion / Conseil"],
    bookBtn:"Réserver", perH:"/ h", reviews:"avis", back:"Retour", online:"En ligne",
    loginTitle:"Connexion", email:"Email", password:"Mot de passe", loginBtn:"Se connecter",
    signupTitle:"Inscription", asCoach:"Coach", asClient:"Sportif·ve",
    certif:"Certifications", speciality:"Sport / Discipline", hourlyRate:"Tarif (€/h)", bio:"À propos",
    signupBtn:"Créer mon compte", noAccount:"Pas encore inscrit·e ?", hasAccount:"Déjà un compte ?",
    bookingConfirmed:"Réservation confirmée !", bookingConfirmedSub:"Confirmation par email.",
    leaveReview:"Laisser un avis", reviewPlaceholder:"Votre commentaire…", submitReview:"Publier",
    reviewsTitle:"Avis", noReviews:"Aucun avis pour l'instant.",
    reviewOnlyBooked:"Seuls les clients ayant réservé peuvent laisser un avis.",
    dashTitle:"Dashboard", dashSub:"Bienvenue",
    upcoming:"Séances à venir", nextSessions:"Prochaines séances",
    msgPlaceholder:"Message…", msgSend:"Envoyer",
    logout:"Déconnexion", nav:{coaches:"Coachs", messages:"Messages", dashboard:"Dashboard"},
    formatLabel:"Format de coaching", others:"Autres sports",
    loading:"Chargement…", confirmPassword:"Confirme ton mot de passe",
    passwordMismatch:"Les mots de passe ne correspondent pas.",
    fillAll:"Remplis tous les champs obligatoires.",
    coachRegistered:"Profil coach créé ! Bienvenue sur Sportriq 🎉",
    clientRegistered:"Compte créé ! Bienvenue sur Sportriq 🎉",
    noCoaches:"Aucun coach trouvé. Essaie un autre filtre.",
    cookieText:"Sportriq utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre ",
    cookiePrivacy:"politique de confidentialité",
    cookieAccept:"Accepter", cookieDecline:"Refuser",
    cguLink:"Conditions Générales d'Utilisation",
    privacyLink:"Politique de confidentialité",
    cguAccept:"J'accepte les ", cguAnd:" et la ",
    chooseSlotFirst:"Choisis d'abord un créneau",
    proceedPayment:"Procéder au paiement",
    packages:"Packages disponibles",
    selectPackage:"Sélectionne un package",
    delivery:"Livraison en", days:"jours",
    discussionInfo:"Envoie un message au coach. Si vous vous mettez d'accord, il t'enverra une demande de paiement directement.",
    sendMessage:"Envoyer un message",
    paymentRequests:"Demandes de paiement en attente",
    payNow:"Payer",
    requestPayment:"Demande de paiement",
    requestDesc:"Description de la prestation",
    requestAmount:"Montant (€)",
    sendRequest:"Envoyer la demande",
    myAvailabilities:"Mes disponibilités",
    addSlot:"Ajouter un créneau",
    myPackages:"Mes packages",
    addPackage:"Ajouter un package",
    packageName:"Nom du package",
    packageDesc:"Description",
    packagePrice:"Prix (€)",
    packageDays:"Délai (jours)",
    save:"Enregistrer",
    noAvailabilities:"Aucun créneau. Ajoutez vos disponibilités ci-dessus.",
    noPackages:"Aucun package. Créez votre première offre.",
    days_list:["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"],
    bookSession:"Réserver une séance",
    orderProgram:"Commander un programme",
    contactCoach:"Contacter",
    bookWith:"Réserver avec",
    uploadPhoto:"Changer la photo",
    profilePhoto:"Photo de profil",
    onboarding:{
      title:"Bienvenue sur Sportriq ! 🎉",
      sub:"Complète ton profil en 3 étapes pour commencer à recevoir des clients.",
      step1:"Photo & Bio",
      step2:"Disponibilités",
      step3:"Packages",
      step1desc:"Ajoute une photo et présente-toi en quelques mots.",
      step2desc:"Définis tes créneaux pour les séances en présentiel et visio.",
      step3desc:"Crée tes offres de programmes écrits.",
      skip:"Passer cette étape",
      next:"Étape suivante",
      finish:"Accéder à mon dashboard",
      progress:"Profil complété à",
    },
    faq:"FAQ Coachs",
    noResults:"Aucun résultat pour",
    newConversation:"Nouvelle conversation",
    selectCoach:"Sélectionne un coach pour démarrer",
    noConversations:"Aucune conversation pour l'instant.",
    startConversation:"Démarrer une conversation",
    chooseHour:"Choisir une heure :",
    forgotPassword:"Mot de passe oublié ?",
    resetTitle:"Réinitialiser le mot de passe",
    resetBtn:"Envoyer le lien",
    resetSuccess:"Email envoyé ! Vérifie ta boîte mail.",
    backToLogin:"Retour à la connexion",
  },
  en:{
    sub:"Certified coaches across Europe · All sports · In-person, Video, Written program",
    searchBtn:"Search", sportLabel:"Sport", locationLabel:"City or country", langLabel:"Language",
    searchPlaceholder:"Coach, sport, city…",
    sports:"Popular sports", seeMore:"See all sports", seeLess:"See less",
    featured:"Featured coaches", howTitle:"How it works",
    steps:[
      {i:"1",t:"Explore",d:"Search by sport, city, language and budget"},
      {i:"2",t:"Book",d:"In-person, video, program or discussion"},
      {i:"3",t:"Train",d:"Train with your certified coach"},
      {i:"4",t:"Review",d:"Rate your session and inspire the community"},
    ],
    stats:[{v:"Europe",l:"& soon worldwide"},{v:"All sports",l:"& disciplines"},{v:"100%",l:"Online & in-person"},{v:"Free",l:"Coach signup"}],
    formats:["In-person","Video call","Written program","Consultation"],
    bookBtn:"Book", perH:"/ h", reviews:"reviews", back:"Back", online:"Online",
    loginTitle:"Log in", email:"Email", password:"Password", loginBtn:"Log in",
    signupTitle:"Sign up", asCoach:"Coach", asClient:"Athlete",
    certif:"Certifications", speciality:"Sport / Discipline", hourlyRate:"Rate (€/h)", bio:"About",
    signupBtn:"Create account", noAccount:"No account yet?", hasAccount:"Already have an account?",
    bookingConfirmed:"Booking confirmed!", bookingConfirmedSub:"Confirmation sent by email.",
    leaveReview:"Leave a review", reviewPlaceholder:"Your comment…", submitReview:"Post",
    reviewsTitle:"Reviews", noReviews:"No reviews yet.",
    reviewOnlyBooked:"Only clients who have booked can leave a review.",
    dashTitle:"Dashboard", dashSub:"Welcome",
    upcoming:"Upcoming", nextSessions:"Upcoming sessions",
    msgPlaceholder:"Message…", msgSend:"Send",
    logout:"Log out", nav:{coaches:"Coaches", messages:"Messages", dashboard:"Dashboard"},
    formatLabel:"Coaching format", others:"Other sports",
    loading:"Loading…", confirmPassword:"Confirm password",
    passwordMismatch:"Passwords do not match.",
    fillAll:"Please fill in all required fields.",
    coachRegistered:"Coach profile created! Welcome to Sportriq 🎉",
    clientRegistered:"Account created! Welcome to Sportriq 🎉",
    noCoaches:"No coach found. Try another filter.",
    cookieText:"Sportriq uses cookies to improve your experience. By continuing, you accept our ",
    cookiePrivacy:"privacy policy",
    cookieAccept:"Accept", cookieDecline:"Decline",
    cguLink:"Terms of Service",
    privacyLink:"Privacy Policy",
    cguAccept:"I accept the ", cguAnd:" and the ",
    chooseSlotFirst:"Choose a slot first",
    proceedPayment:"Proceed to payment",
    packages:"Available packages",
    selectPackage:"Select a package",
    delivery:"Delivery in", days:"days",
    discussionInfo:"Send a message to the coach. If you agree, they'll send you a payment request.",
    sendMessage:"Send a message",
    paymentRequests:"Pending payment requests",
    payNow:"Pay",
    requestPayment:"Payment request",
    requestDesc:"Service description",
    requestAmount:"Amount (€)",
    sendRequest:"Send request",
    myAvailabilities:"My availabilities",
    addSlot:"Add a slot",
    myPackages:"My packages",
    addPackage:"Add a package",
    packageName:"Package name",
    packageDesc:"Description",
    packagePrice:"Price (€)",
    packageDays:"Delivery days",
    save:"Save",
    noAvailabilities:"No slots. Add your availabilities above.",
    noPackages:"No packages. Create your first offer.",
    days_list:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    bookSession:"Book a session",
    orderProgram:"Order a program",
    contactCoach:"Contact",
    bookWith:"Book with",
    uploadPhoto:"Change photo",
    profilePhoto:"Profile photo",
    onboarding:{
      title:"Welcome to Sportriq! 🎉",
      sub:"Complete your profile in 3 steps to start receiving clients.",
      step1:"Photo & Bio",
      step2:"Availabilities",
      step3:"Packages",
      step1desc:"Add a photo and introduce yourself.",
      step2desc:"Set your slots for in-person and video sessions.",
      step3desc:"Create your written program offers.",
      skip:"Skip this step",
      next:"Next step",
      finish:"Go to my dashboard",
      progress:"Profile",
    },
    faq:"Coach FAQ",
    noResults:"No results for",
    newConversation:"New conversation",
    selectCoach:"Select a coach to start",
    noConversations:"No conversations yet.",
    startConversation:"Start a conversation",
    chooseHour:"Choose a time:",
    forgotPassword:"Forgot password?",
    resetTitle:"Reset password",
    resetBtn:"Send reset link",
    resetSuccess:"Email sent! Check your inbox.",
    backToLogin:"Back to login",
  }
};

const ALL_SPORTS=[
  {emoji:"🥊",fr:"Boxe",en:"Boxing"},
  {emoji:"🏋️",fr:"Musculation",en:"Weightlifting"},
  {emoji:"🎭",fr:"Padel",en:"Padel"},
  {emoji:"⚡",fr:"HYROX",en:"HYROX"},
  {emoji:"🏃",fr:"Course à pied",en:"Running"},
  {emoji:"🤸",fr:"CrossFit",en:"CrossFit"},
  {emoji:"🎾",fr:"Tennis",en:"Tennis"},
  {emoji:"🧘",fr:"Yoga",en:"Yoga"},
  {emoji:"🏸",fr:"Badminton",en:"Badminton"},
  {emoji:"🏓",fr:"Tennis de table",en:"Table Tennis"},
  {emoji:"💃",fr:"Danse",en:"Dance"},
  {emoji:"🏃‍♂️",fr:"Athlétisme",en:"Athletics"},
  {emoji:"⚽",fr:"Football",en:"Soccer"},
  {emoji:"🏊",fr:"Natation",en:"Swimming"},
  {emoji:"🚴",fr:"Cyclisme",en:"Cycling"},
  {emoji:"🥋",fr:"Arts martiaux",en:"Martial Arts"},
  {emoji:"⛷️",fr:"Ski / Snow",en:"Ski / Snow"},
  {emoji:"🏄",fr:"Surf / SUP",en:"Surf / SUP"},
  {emoji:"🏒",fr:"Hockey",en:"Hockey"},
  {emoji:"🏀",fr:"Basketball",en:"Basketball"},
  {emoji:"🎿",fr:"Autres",en:"Others"},
];

const FEATURED_SPORTS_COUNT = 8;
const FMTI={"Présentiel":"📍","Visio":"🎥","Programme écrit":"📋","Discussion / Conseil":"💬","In-person":"📍","Video call":"🎥","Written program":"📋","Consultation":"💬"};
const COACH_COLORS=["#FF6B35","#6C63FF","#00D4AA","#FF6B9D","#FFD166","#A78BFA","#06D6A0"];
const HOURS=["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

const FAQ_DATA = [
  {q_fr:"Combien prend Sportriq sur mes revenus ?",a_fr:"Sportriq prélève 5% sur chaque paiement reçu. Le client paie 3% de frais de service en plus. Vous gardez 95% de vos revenus.",q_en:"How much does Sportriq take from my earnings?",a_en:"Sportriq takes 5% on each payment. The client pays 3% service fee on top. You keep 95% of your earnings."},
  {q_fr:"Quand suis-je payé ?",a_fr:"Les paiements sont traités par Stripe. Les virements sont effectués selon les délais Stripe standard (2-7 jours ouvrables selon votre pays).",q_en:"When do I get paid?",a_en:"Payments are processed by Stripe. Payouts follow standard Stripe timelines (2-7 business days depending on your country)."},
  {q_fr:"Dois-je payer pour m'inscrire ?",a_fr:"Non, l'inscription est totalement gratuite. Sportriq ne prend une commission que sur les transactions réelles.",q_en:"Do I need to pay to register?",a_en:"No, registration is completely free. Sportriq only takes a commission on actual transactions."},
  {q_fr:"Puis-je proposer plusieurs formats ?",a_fr:"Oui ! Vous pouvez proposer présentiel, visio, programme écrit et discussion/conseil simultanément. Chaque format a son propre système de réservation.",q_en:"Can I offer multiple formats?",a_en:"Yes! You can offer in-person, video, written program and consultation simultaneously. Each format has its own booking system."},
  {q_fr:"Comment fonctionne le programme écrit ?",a_fr:"Créez vos packages depuis votre dashboard (basique, standard, premium). Le client choisit et paie. Vous livrez le programme dans le délai indiqué.",q_en:"How does the written program work?",a_en:"Create your packages in your dashboard (basic, standard, premium). The client chooses and pays. You deliver the program within the specified timeframe."},
  {q_fr:"Que se passe-t-il si un client annule ?",a_fr:"La politique d'annulation est définie par chaque coach sur son profil. En cas de litige, contactez hello@sportriq.com.",q_en:"What happens if a client cancels?",a_en:"Cancellation policy is set by each coach on their profile. For disputes, contact hello@sportriq.com."},
];

function generateHourSlots(startTime, endTime) {
  const slots = [];
  const [startH] = startTime.split(":").map(Number);
  const [endH] = endTime.split(":").map(Number);
  for (let h = startH; h < endH; h++) {
    const hStr = h.toString().padStart(2, "0");
    const hNext = (h + 1).toString().padStart(2, "0");
    slots.push(`${hStr}:00 – ${hNext}:00`);
  }
  return slots;
}

function Pill({label,active,onClick,color,C}){
  return <button onClick={onClick} style={{padding:"6px 14px",borderRadius:999,border:`1px solid ${active?(color||C.accent):"rgba(128,128,160,0.25)"}`,background:active?`${color||C.accent}22`:"transparent",color:active?(color||C.accent):C.muted,cursor:"pointer",fontSize:13,fontWeight:active?600:400}}>{label}</button>;
}
function Tag({label,color="#A78BFA"}){
  return <span style={{fontSize:11,padding:"2px 8px",borderRadius:999,background:`${color}22`,color,fontWeight:600}}>{label}</span>;
}
function Stars({n,size=13,interactive=false,onRate,C}){
  return <span>{[1,2,3,4,5].map(i=><span key={i} onClick={()=>interactive&&onRate&&onRate(i)} style={{color:i<=Math.round(n)?C.gold:"rgba(128,128,128,0.3)",fontSize:size,cursor:interactive?"pointer":"default"}}>★</span>)}</span>;
}
function Av({src,initials,color,size=44}){
  if(src)return <img src={src} alt={initials} style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",border:`2px solid ${color}55`,flexShrink:0}}/>;
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

function CookieBanner({lang,C,onShowLegal}){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{if(!localStorage.getItem("sportriq_cookie_consent"))setVisible(true);},[]);
  const T=LANG[lang];
  if(!visible)return null;
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:300,padding:"16px 24px",background:C.card,borderTop:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
      <p style={{fontSize:13,color:C.muted,margin:0,maxWidth:600}}>{T.cookieText}<span onClick={onShowLegal} style={{color:C.accent,cursor:"pointer",textDecoration:"underline"}}>{T.cookiePrivacy}</span>.</p>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{localStorage.setItem("sportriq_cookie_consent","declined");setVisible(false);}} style={{padding:"7px 16px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer",fontSize:13}}>{T.cookieDecline}</button>
        <button onClick={()=>{localStorage.setItem("sportriq_cookie_consent","accepted");setVisible(false);}} style={{padding:"7px 16px",borderRadius:8,border:"none",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>{T.cookieAccept}</button>
      </div>
    </div>
  );
}

function CoachCard({c,lang,T,C,onSelect,onBook}){
  const initials=(c.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const color=c.color||COACH_COLORS[0];
  return(
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,cursor:"pointer",transition:"border-color .15s"}} onClick={onSelect}>
      <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}}>
        <Av src={c.photo_url} initials={initials} color={color} size={48}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:15,color:C.txt,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.pseudo?`@${c.pseudo}`:c.name}</div>
          <div style={{fontSize:12,color:C.muted}}>{c.sport} · {c.location||"—"}</div>
          {c.langs&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>🗣 {c.langs}</div>}
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontWeight:800,color:C.accent,fontSize:16}}>{c.price}€</div>
          <div style={{fontSize:11,color:C.muted}}>{T.perH}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
        {(c.formats||[]).map(f=><span key={f} style={{fontSize:11,padding:"2px 6px",borderRadius:6,background:`${C.accent2}18`,color:C.accent2,fontWeight:600}}>{(FMTI[f]||"")} {f.slice(0,12)}</span>)}
      </div>
      <p style={{fontSize:13,color:C.muted,margin:"0 0 12px",lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{c.bio||"—"}</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <Stars n={c.avg_rating||0} size={13} C={C}/>
          <span style={{fontSize:11,color:C.muted}}>({c.review_count||0} {T.reviews})</span>
        </div>
        <button onClick={e=>{e.stopPropagation();onBook();}} style={{padding:"7px 16px",borderRadius:999,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>{T.bookBtn}</button>
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
  const [searchQuery,setSearchQuery]=useState("");
  const [showAllSports,setShowAllSports]=useState(false);
  const [selectedCoach,setSelectedCoach]=useState(null);
  const [coaches,setCoaches]=useState([]);
  const [loadingCoaches,setLoadingCoaches]=useState(true);
  const [user,setUser]=useState(null);
  const [userRole,setUserRole]=useState(null);
  const [myCoachId,setMyCoachId]=useState(null);
  const [myCoachData,setMyCoachData]=useState(null);

  const [showOnboarding,setShowOnboarding]=useState(false);
  const [onboardStep,setOnboardStep]=useState(1);

  const [bookCoach,setBookCoach]=useState(null);
  const [bookFormat,setBookFormat]=useState(null);
  const [bookDone,setBookDone]=useState(false);
  const [bookStep,setBookStep]=useState("select");
  const [bookSlot,setBookSlot]=useState(null);
  const [bookHour,setBookHour]=useState(null);
  const [bookPackage,setBookPackage]=useState(null);
  const [bookError,setBookError]=useState(null);
  const [coachAvails,setCoachAvails]=useState([]);
  const [coachPackages,setCoachPackages]=useState([]);

  const [authMode,setAuthMode]=useState("login");
  const [authLoading,setAuthLoading]=useState(false);
  const [authMsg,setAuthMsg]=useState(null);
  const [authMsgType,setAuthMsgType]=useState("error");
  const [loginEmail,setLoginEmail]=useState("");
  const [loginPass,setLoginPass]=useState("");
  const [resetEmail,setResetEmail]=useState("");
  const [signupRole,setSignupRole]=useState("client");
  const [signupFirstName,setSignupFirstName]=useState("");
  const [signupLastName,setSignupLastName]=useState("");
  const [signupPseudo,setSignupPseudo]=useState("");
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
  const [hasBooked,setHasBooked]=useState(false);

  const [myBookings,setMyBookings]=useState([]);
  const [myAvails,setMyAvails]=useState([]);
  const [myPackages,setMyPackages]=useState([]);
  const [paymentRequests,setPaymentRequests]=useState([]);
  const [dashTab,setDashTab]=useState("overview");
  const [newDay,setNewDay]=useState("");
  const [newStart,setNewStart]=useState("");
  const [newEnd,setNewEnd]=useState("");
  const [newPkgName,setNewPkgName]=useState("");
  const [newPkgDesc,setNewPkgDesc]=useState("");
  const [newPkgPrice,setNewPkgPrice]=useState("");
  const [newPkgDays,setNewPkgDays]=useState("");
  const [reqDesc,setReqDesc]=useState("");
  const [reqAmount,setReqAmount]=useState("");
  const [reqClientSearch,setReqClientSearch]=useState("");
  const [reqClientFound,setReqClientFound]=useState(null);
  const [reqClientMsg,setReqClientMsg]=useState(null);

  const [uploadingPhoto,setUploadingPhoto]=useState(false);
  const fileInputRef=useRef(null);

  const [conversations,setConversations]=useState([]);
  const [activeConv,setActiveConv]=useState(null);
  const [convMessages,setConvMessages]=useState([]);
  const [msgInput,setMsgInput]=useState("");
  const msgEndRef=useRef(null);

  const [openFaq,setOpenFaq]=useState(null);
  const [showLegal,setShowLegal]=useState(false);

  const T=LANG[lang];

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session){setUser(session.user);fetchUserRole(session.user.id);}
    });
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      if(session){setUser(session.user);fetchUserRole(session.user.id);}
      else{setUser(null);setUserRole(null);setMyCoachId(null);setMyCoachData(null);}
    });
    return()=>subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{fetchCoaches();},[]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{if(user){fetchMyBookings();fetchPaymentRequests();fetchConversations();}},[user]);
  useEffect(()=>{msgEndRef.current?.scrollIntoView({behavior:"smooth"});},[convMessages]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{if(myCoachId){fetchMyAvails();fetchMyPackages();}},[myCoachId]);
  useEffect(()=>{
    if(!activeConv)return;
    const interval=setInterval(()=>loadMessages(activeConv.coachId),5000);
    return()=>clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeConv]);

  const fetchCoaches=async()=>{
    setLoadingCoaches(true);
    const{data,error}=await supabase.from("coaches").select("*");
    if(!error&&data)setCoaches(data);
    setLoadingCoaches(false);
  };
  const fetchUserRole=async(uid)=>{
    const{data}=await supabase.from("coaches").select("*").eq("user_id",uid).single();
    if(data){setUserRole("coach");setMyCoachId(data.id);setMyCoachData(data);}
    else setUserRole("client");
  };
  const fetchReviews=async(coachId)=>{
    const{data}=await supabase.from("reviews").select("*").eq("coach_id",coachId).order("created_at",{ascending:false});
    if(data)setReviews(data);
  };
  const checkHasBooked=async(coachId)=>{
    if(!user)return;
    const{data}=await supabase.from("bookings").select("id").eq("coach_id",coachId).eq("client_id",user.id).limit(1);
    setHasBooked(!!(data&&data.length>0));
  };
  const fetchMyBookings=async()=>{
    if(!user)return;
    const{data}=await supabase.from("bookings").select("*,coaches(name,sport,pseudo,photo_url)").eq("client_id",user.id).order("created_at",{ascending:false});
    if(data)setMyBookings(data);
  };
  const fetchMyAvails=async()=>{
    if(!myCoachId)return;
    const{data}=await supabase.from("availabilities").select("*").eq("coach_id",myCoachId).order("day");
    if(data)setMyAvails(data);
  };
  const fetchMyPackages=async()=>{
    if(!myCoachId)return;
    const{data}=await supabase.from("packages").select("*").eq("coach_id",myCoachId);
    if(data)setMyPackages(data);
  };
  const fetchCoachAvails=async(coachId)=>{
    const{data}=await supabase.from("availabilities").select("*").eq("coach_id",coachId).eq("is_booked",false);
    if(data)setCoachAvails(data);
  };
  const fetchCoachPackages=async(coachId)=>{
    const{data}=await supabase.from("packages").select("*").eq("coach_id",coachId);
    if(data)setCoachPackages(data);
  };
  const fetchPaymentRequests=async()=>{
    if(!user)return;
    const{data}=await supabase.from("payment_requests").select("*,coaches(name,pseudo)").eq("client_id",user.id).eq("status","pending");
    if(data)setPaymentRequests(data);
  };
  const fetchConversations=async()=>{
    if(!user)return;
    const{data}=await supabase.from("messages").select("coach_id,coaches(id,name,pseudo,photo_url,color,user_id)")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at",{ascending:false});
    if(!data)return;
    const seen=new Set();
    const convs=[];
    for(const m of data){
      if(!seen.has(m.coach_id)){
        seen.add(m.coach_id);
        const c=m.coaches;
        convs.push({id:m.coach_id,coachId:m.coach_id,coachUserId:c?.user_id,coachName:c?.pseudo?`@${c.pseudo}`:c?.name||"Coach",coachPhoto:c?.photo_url,coachColor:c?.color||"#6C63FF"});
      }
    }
    setConversations(convs);
  };
  const loadMessages=async(coachId)=>{
    if(!user)return;
    const{data}=await supabase.from("messages").select("*").eq("coach_id",coachId).or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order("created_at",{ascending:true});
    if(data){setConvMessages(data.map(m=>({from:m.sender_id===user.id?"user":"coach",text:m.text,time:new Date(m.created_at).toLocaleTimeString("fr",{hour:"2-digit",minute:"2-digit"})})));}
  };

  const switchLang=l=>{setLang(l);setSportFilter("ALL");};
  const isSessionFormat=f=>f==="Présentiel"||f==="Visio"||f==="In-person"||f==="Video call";
  const isProgramFormat=f=>f==="Programme écrit"||f==="Written program";
  const isDiscussionFormat=f=>f==="Discussion / Conseil"||f==="Consultation";

  const filteredCoaches=coaches.filter(c=>{
    const s=sportFilter==="ALL"||c.sport===sportFilter;
    const f=fmtFilter==="ALL"||(c.formats||[]).includes(fmtFilter);
    const q=!searchQuery||c.name?.toLowerCase().includes(searchQuery.toLowerCase())||c.pseudo?.toLowerCase().includes(searchQuery.toLowerCase())||c.sport?.toLowerCase().includes(searchQuery.toLowerCase())||c.location?.toLowerCase().includes(searchQuery.toLowerCase())||c.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    return s&&f&&q;
  });

  const doLogin=async()=>{
    if(!loginEmail||!loginPass){setAuthMsg(T.fillAll);setAuthMsgType("error");return;}
    setAuthLoading(true);setAuthMsg(null);
    const{error}=await supabase.auth.signInWithPassword({email:loginEmail,password:loginPass});
    setAuthLoading(false);
    if(error){setAuthMsg(error.message);setAuthMsgType("error");}
    else setPage("dashboard");
  };

  // ✅ NOUVEAU: réinitialisation mot de passe
  const doResetPassword=async()=>{
    if(!resetEmail){setAuthMsg(T.fillAll);setAuthMsgType("error");return;}
    setAuthLoading(true);setAuthMsg(null);
    const{error}=await supabase.auth.resetPasswordForEmail(resetEmail,{
      redirectTo:`${window.location.origin}/reset-password`,
    });
    setAuthLoading(false);
    if(error){setAuthMsg(error.message);setAuthMsgType("error");}
    else{setAuthMsg(T.resetSuccess);setAuthMsgType("success");}
  };

  const doSignup=async()=>{
    if(!signupFirstName||!signupLastName||!signupPseudo||!signupEmail||!signupPass){setAuthMsg(T.fillAll);setAuthMsgType("error");return;}
    if(signupRole==="client"&&!signupBirthdate){setAuthMsg(lang==="fr"?"Entrez votre date de naissance.":"Enter your date of birth.");setAuthMsgType("error");return;}
    if(signupRole==="client"&&signupBirthdate){
      const age=new Date().getFullYear()-new Date(signupBirthdate).getFullYear();
      if(age<18){setAuthMsg(lang==="fr"?"18 ans minimum requis.":"Must be at least 18.");setAuthMsgType("error");return;}
    }
    if(!signupCGU){setAuthMsg(lang==="fr"?"Acceptez les CGU pour continuer.":"Accept the Terms to continue.");setAuthMsgType("error");return;}
    if(signupRole==="coach"&&(!signupSport||!signupRate||!signupLoc||!signupLangs||!signupBio)){setAuthMsg(T.fillAll);setAuthMsgType("error");return;}
    const{data:ep}=await supabase.from("coaches").select("id").eq("pseudo",signupPseudo).single();
    if(ep){setAuthMsg(lang==="fr"?"Ce pseudo est déjà pris.":"This pseudo is already taken.");setAuthMsgType("error");return;}
    const pwRx=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
    if(!pwRx.test(signupPass)){setAuthMsg(lang==="fr"?"8 car. min, 1 majuscule, 1 chiffre, 1 symbole.":"8+ chars, 1 uppercase, 1 number, 1 symbol.");setAuthMsgType("error");return;}
    if(signupPass!==signupPass2){setAuthMsg(T.passwordMismatch);setAuthMsgType("error");return;}
    setAuthLoading(true);setAuthMsg(null);
    const{data,error}=await supabase.auth.signUp({email:signupEmail,password:signupPass,options:{data:{first_name:signupFirstName,last_name:signupLastName,pseudo:signupPseudo,role:signupRole}}});
    if(error){setAuthLoading(false);setAuthMsg(error.message);setAuthMsgType("error");return;}
    if(signupRole==="coach"&&data.user){
      const color=COACH_COLORS[Math.floor(Math.random()*COACH_COLORS.length)];
      await supabase.from("coaches").insert({user_id:data.user.id,name:`${signupFirstName} ${signupLastName}`,pseudo:signupPseudo,sport:signupSport,location:signupLoc,langs:signupLangs,price:parseInt(signupRate)||60,bio:signupBio,certifs:signupCertifs.filter(Boolean),formats:signupFormats.length?signupFormats:["Présentiel","Visio"],avatar:(signupFirstName[0]||"")+(signupLastName[0]||""),color});
      await fetchCoaches();setAuthLoading(false);setAuthMsg(T.coachRegistered);setAuthMsgType("success");
      setTimeout(()=>{setPage("home");setShowOnboarding(true);},1500);return;
    }
    // Profil client créé en base
    if(signupRole==="client"&&data.user){
      await supabase.from("clients").insert({user_id:data.user.id,pseudo:signupPseudo,first_name:signupFirstName,last_name:signupLastName,email:signupEmail});
    }
    setAuthLoading(false);setAuthMsg(T.clientRegistered);setAuthMsgType("success");
    setTimeout(()=>setPage("home"),1500);
  };

  const doLogout=async()=>{
    await supabase.auth.signOut();
    setUser(null);setUserRole(null);setMyCoachId(null);setMyCoachData(null);
    setConversations([]);setActiveConv(null);setConvMessages([]);setPage("home");
  };

  const uploadPhoto=async(file)=>{
    if(!file||!myCoachId||!user)return;
    setUploadingPhoto(true);
    const ext=file.name.split('.').pop();
    const path=`${user.id}/avatar.${ext}`;
    const{error:upErr}=await supabase.storage.from("avatars").upload(path,file,{upsert:true});
    if(upErr){setUploadingPhoto(false);return;}
    const{data}=supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("coaches").update({photo_url:data.publicUrl}).eq("id",myCoachId);
    setMyCoachData(d=>({...d,photo_url:data.publicUrl}));await fetchCoaches();setUploadingPhoto(false);
  };

  const openBooking=async(coach,format)=>{
    if(!user){setAuthMode("login");setPage("auth");return;}
    setBookCoach(coach);setBookFormat(format);setBookStep("select");
    setBookSlot(null);setBookHour(null);setBookPackage(null);setBookError(null);setBookDone(false);
    if(isSessionFormat(format))await fetchCoachAvails(coach.id);
    if(isProgramFormat(format))await fetchCoachPackages(coach.id);
  };
  const closeBooking=()=>{setBookCoach(null);setBookDone(false);setBookSlot(null);setBookHour(null);setBookPackage(null);setBookStep("select");setBookError(null);setBookFormat(null);};

  const handlePaymentSuccess=async(paymentIntent)=>{
    const bookingData={client_id:user.id,coach_id:bookCoach.id,format:bookFormat,amount:bookPackage?bookPackage.price:bookCoach.price,status:"paid",stripe_payment_id:paymentIntent.id};
    if(bookSlot&&bookHour)bookingData.slot=`${bookSlot.day} ${bookHour}`;
    if(bookPackage)bookingData.slot=`Package: ${bookPackage.name}`;
    await supabase.from("bookings").insert(bookingData);
    // Email de confirmation client
    supabase.functions.invoke("send-booking-email",{
      body:{
        clientEmail:user.email,
        clientName:user.user_metadata?.first_name||user.email,
        coachName:bookCoach.pseudo?`@${bookCoach.pseudo}`:bookCoach.name,
        format:bookFormat||"—",
        slot:bookSlot&&bookHour?`${bookSlot.day} ${bookHour}`:bookPackage?.name||"",
        amount:bookPackage?bookPackage.price:bookCoach.price,
      },
    });
    if(bookSlot)await supabase.from("availabilities").update({is_booked:true}).eq("id",bookSlot.id);
    fetchMyBookings();setBookDone(true);setBookStep("select");
  };

  const addAvailability=async()=>{
    if(!newDay||!newStart||!newEnd||!myCoachId)return;
    await supabase.from("availabilities").insert({coach_id:myCoachId,day:newDay,start_time:newStart,end_time:newEnd});
    setNewDay("");setNewStart("");setNewEnd("");fetchMyAvails();
  };
  const addPackage=async()=>{
    if(!newPkgName||!newPkgPrice||!myCoachId)return;
    await supabase.from("packages").insert({coach_id:myCoachId,name:newPkgName,description:newPkgDesc,price:parseInt(newPkgPrice),delivery_days:parseInt(newPkgDays)||7});
    setNewPkgName("");setNewPkgDesc("");setNewPkgPrice("");setNewPkgDays("");fetchMyPackages();
  };

  const searchClient=async()=>{
    if(!reqClientSearch.trim())return;
    setReqClientMsg(null);setReqClientFound(null);
    const pseudo=reqClientSearch.trim().replace(/^@/,"");
    const{data}=await supabase.from("clients").select("user_id,pseudo,first_name,last_name").eq("pseudo",pseudo).single();
    if(data){
      setReqClientFound(data);
      setReqClientMsg(`✓ ${data.first_name||""} ${data.last_name||""} (@${data.pseudo})`.trim());
    } else {
      setReqClientMsg(lang==="fr"?"Aucun client trouvé.":"No client found.");
    }
  };

  const sendPaymentRequest=async()=>{
    if(!reqDesc||!reqAmount||!reqClientFound||!myCoachId)return;
    await supabase.from("payment_requests").insert({coach_id:myCoachId,client_id:reqClientFound.user_id,amount:parseInt(reqAmount),description:reqDesc});
    setReqDesc("");setReqAmount("");setReqClientSearch("");setReqClientFound(null);setReqClientMsg(null);
    alert(lang==="fr"?"Demande envoyée !":"Request sent!");
  };

  const submitReview=async()=>{
    if(!reviewText.trim()||!user||!selectedCoach)return;
    await supabase.from("reviews").insert({coach_id:selectedCoach.id,client_id:user.id,note:reviewNote,text:reviewText});
    setReviewText("");setReviewDone(true);fetchReviews(selectedCoach.id);
    setTimeout(()=>setReviewDone(false),2500);
  };

  const sendMsg=async()=>{
    if(!msgInput.trim()||!activeConv||!user)return;
    const txt=msgInput;setMsgInput("");
    setConvMessages(m=>[...m,{from:"user",text:txt,time:new Date().toLocaleTimeString("fr",{hour:"2-digit",minute:"2-digit"})}]);
    await supabase.from("messages").insert({sender_id:user.id,receiver_id:activeConv.coachUserId,coach_id:activeConv.coachId,text:txt});
  };

  const startConversation=async(coach)=>{
    const existing=conversations.find(c=>c.coachId===coach.id);
    if(existing){setActiveConv(existing);await loadMessages(coach.id);}
    else{
      const newConv={id:coach.id,coachId:coach.id,coachUserId:coach.user_id,coachName:coach.pseudo?`@${coach.pseudo}`:coach.name,coachPhoto:coach.photo_url,coachColor:coach.color||C.accent};
      setConversations(cs=>[newConv,...cs]);setActiveConv(newConv);setConvMessages([]);
    }
    setPage("messages");
  };

  const card={background:C.card,border:`1px solid ${C.border}`,borderRadius:16};
  const card2={background:C.card2,border:`1px solid ${C.border}`,borderRadius:16};
  const inputSt={width:"100%",padding:"10px 14px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:14,boxSizing:"border-box",outline:"none"};
  const displayedSports=showAllSports?ALL_SPORTS:ALL_SPORTS.slice(0,FEATURED_SPORTS_COUNT);
  const onboardProgress=onboardStep===1?33:onboardStep===2?66:100;
  const hourSlots=bookSlot?generateHourSlots(bookSlot.start_time,bookSlot.end_time):[];

  return(
    <div style={{fontFamily:"sans-serif",color:C.txt,minHeight:"100vh",background:C.dark,transition:"background .2s"}}>

      {/* NAV */}
      <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:`1px solid ${C.border}`,background:dark?"rgba(14,14,26,.92)":"rgba(244,244,248,.95)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:10,flexWrap:"wrap",gap:8}}>
        <div onClick={()=>setPage("home")} style={{cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <img src="/favicon.svg" alt="Sportriq" style={{width:28,height:28,borderRadius:7,objectFit:"cover"}}/>
            <span style={{fontWeight:800,fontSize:20,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Sportriq</span>
          </div>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {[["home","Home"],["coaches",T.nav.coaches],["messages",T.nav.messages]].map(([p,l])=>(
            <button key={p} onClick={()=>setPage(p)} style={{fontSize:13,padding:"5px 12px",borderRadius:8,border:"none",background:page===p?`${C.accent}18`:"transparent",cursor:"pointer",color:page===p?C.accent:C.muted,fontWeight:page===p?600:400}}>{l}</button>
          ))}
          {user&&<button onClick={()=>{setPage("dashboard");fetchMyBookings();fetchPaymentRequests();}} style={{fontSize:13,padding:"5px 12px",borderRadius:8,border:"none",background:page==="dashboard"?`${C.accent}18`:"transparent",cursor:"pointer",color:page==="dashboard"?C.accent:C.muted,fontWeight:page==="dashboard"?600:400}}>{T.nav.dashboard}</button>}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={()=>setDark(d=>!d)} style={{fontSize:15,padding:"3px 8px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",cursor:"pointer"}}>{dark?"☀️":"🌙"}</button>
          {["fr","en"].map(l=>(
            <button key={l} onClick={()=>switchLang(l)} style={{fontSize:12,padding:"3px 9px",borderRadius:999,border:`1px solid ${lang===l?C.accent:C.border}`,background:lang===l?`${C.accent}22`:"transparent",color:lang===l?C.accent:C.muted,cursor:"pointer",fontWeight:lang===l?700:400}}>{l.toUpperCase()}</button>
          ))}
          {user?(
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:13,color:C.muted}}>👤 {(user.user_metadata?.first_name||user.email).split(" ")[0]}</span>
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

      {/* ONBOARDING */}
      {showOnboarding&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,backdropFilter:"blur(4px)"}}>
          <div style={{...card,padding:28,maxWidth:480,width:"90%",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <h2 style={{fontWeight:700,fontSize:22,color:C.txt,marginBottom:8}}>{T.onboarding.title}</h2>
              <p style={{color:C.muted,fontSize:14}}>{T.onboarding.sub}</p>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:16}}>
                <div style={{flex:1,height:6,borderRadius:3,background:C.card2,overflow:"hidden"}}>
                  <div style={{width:`${onboardProgress}%`,height:"100%",background:`linear-gradient(135deg,${C.accent},${C.accent2})`,transition:"width .3s"}}/>
                </div>
                <span style={{fontSize:12,color:C.muted,flexShrink:0}}>{onboardProgress}%</span>
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
                {[1,2,3].map(s=>(
                  <div key={s} style={{display:"flex",alignItems:"center",gap:4}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:onboardStep>=s?`linear-gradient(135deg,${C.accent},${C.accent2})`:`${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:700}}>{s}</div>
                    <span style={{fontSize:12,color:onboardStep===s?C.txt:C.muted}}>{s===1?T.onboarding.step1:s===2?T.onboarding.step2:T.onboarding.step3}</span>
                  </div>
                ))}
              </div>
            </div>
            {onboardStep===1&&(
              <div>
                <p style={{fontSize:13,color:C.muted,marginBottom:16,textAlign:"center"}}>{T.onboarding.step1desc}</p>
                <div style={{textAlign:"center",marginBottom:20}}>
                  <div style={{position:"relative",display:"inline-block"}}>
                    <Av src={myCoachData?.photo_url} initials={(myCoachData?.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()} color={myCoachData?.color||C.accent} size={80}/>
                    <button onClick={()=>fileInputRef.current?.click()} style={{position:"absolute",bottom:0,right:0,width:28,height:28,borderRadius:"50%",background:C.accent,border:"none",color:"#fff",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{display:"none"}} onChange={e=>e.target.files[0]&&uploadPhoto(e.target.files[0])}/>
                  {uploadingPhoto&&<p style={{fontSize:12,color:C.muted,marginTop:8}}>{T.loading}</p>}
                </div>
                <div style={{display:"flex",gap:12,marginTop:16}}>
                  <button onClick={()=>setOnboardStep(2)} style={{flex:1,padding:10,borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer",fontSize:13}}>{T.onboarding.skip}</button>
                  <button onClick={()=>setOnboardStep(2)} style={{flex:2,padding:10,borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer"}}>{T.onboarding.next} →</button>
                </div>
              </div>
            )}
            {onboardStep===2&&(
              <div>
                <p style={{fontSize:13,color:C.muted,marginBottom:16,textAlign:"center"}}>{T.onboarding.step2desc}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
                  <select value={newDay} onChange={e=>setNewDay(e.target.value)} style={{...inputSt}}>
                    <option value="">{lang==="fr"?"Jour":"Day"}</option>
                    {T.days_list.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                  <select value={newStart} onChange={e=>setNewStart(e.target.value)} style={{...inputSt}}>
                    <option value="">{lang==="fr"?"Début":"Start"}</option>
                    {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                  <select value={newEnd} onChange={e=>setNewEnd(e.target.value)} style={{...inputSt}}>
                    <option value="">{lang==="fr"?"Fin":"End"}</option>
                    {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
                <button onClick={addAvailability} disabled={!newDay||!newStart||!newEnd} style={{width:"100%",padding:10,borderRadius:10,background:(!newDay||!newStart||!newEnd)?"#555":`${C.accent2}22`,border:`1px solid ${C.accent2}`,color:C.accent2,cursor:"pointer",marginBottom:12,fontWeight:600}}>+ {T.addSlot}</button>
                {myAvails.slice(0,3).map(a=>(
                  <div key={a.id} style={{...card2,padding:"8px 12px",marginBottom:6,display:"flex",justifyContent:"space-between",fontSize:13,color:C.txt}}>
                    <span>{a.day} · {a.start_time} – {a.end_time}</span>
                    <button onClick={()=>supabase.from("availabilities").delete().eq("id",a.id).then(fetchMyAvails)} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}>✕</button>
                  </div>
                ))}
                <div style={{display:"flex",gap:12,marginTop:16}}>
                  <button onClick={()=>setOnboardStep(3)} style={{flex:1,padding:10,borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer",fontSize:13}}>{T.onboarding.skip}</button>
                  <button onClick={()=>setOnboardStep(3)} style={{flex:2,padding:10,borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer"}}>{T.onboarding.next} →</button>
                </div>
              </div>
            )}
            {onboardStep===3&&(
              <div>
                <p style={{fontSize:13,color:C.muted,marginBottom:16,textAlign:"center"}}>{T.onboarding.step3desc}</p>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
                  <input placeholder={T.packageName} value={newPkgName} onChange={e=>setNewPkgName(e.target.value)} style={inputSt}/>
                  <textarea placeholder={T.packageDesc} value={newPkgDesc} onChange={e=>setNewPkgDesc(e.target.value)} rows={2} style={{...inputSt,resize:"vertical"}}/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <input placeholder={T.packagePrice} type="number" value={newPkgPrice} onChange={e=>setNewPkgPrice(e.target.value)} style={inputSt}/>
                    <input placeholder={T.packageDays} type="number" value={newPkgDays} onChange={e=>setNewPkgDays(e.target.value)} style={inputSt}/>
                  </div>
                  <button onClick={addPackage} disabled={!newPkgName||!newPkgPrice} style={{padding:10,borderRadius:10,background:(!newPkgName||!newPkgPrice)?"#555":`${C.accent2}22`,border:`1px solid ${C.accent2}`,color:C.accent2,cursor:"pointer",fontWeight:600}}>+ {T.addPackage}</button>
                </div>
                {myPackages.slice(0,2).map(p=>(
                  <div key={p.id} style={{...card2,padding:"10px 12px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:13,fontWeight:600,color:C.txt}}>{p.name}</div><div style={{fontSize:11,color:C.accent}}>{p.price}€ · {p.delivery_days}j</div></div>
                    <button onClick={()=>supabase.from("packages").delete().eq("id",p.id).then(fetchMyPackages)} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>{setShowOnboarding(false);setPage("dashboard");}} style={{width:"100%",padding:12,borderRadius:12,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer",marginTop:16}}>{T.onboarding.finish} 🚀</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTH */}
      {page==="auth"&&(
        <div style={{maxWidth:460,margin:"48px auto",padding:"0 20px"}}>
          <div style={{...card,padding:28}}>
            <h2 style={{fontWeight:700,fontSize:22,marginBottom:16,color:C.txt}}>
              {authMode==="login"?T.loginTitle:authMode==="reset"?T.resetTitle:T.signupTitle}
            </h2>
            <Alert msg={authMsg} type={authMsgType} C={C}/>

            {/* ✅ NOUVEAU: page reset password */}
            {authMode==="reset"&&(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <p style={{fontSize:13,color:C.muted,margin:"0 0 4px"}}>
                  {lang==="fr"?"Entre ton email pour recevoir un lien de réinitialisation.":"Enter your email to receive a reset link."}
                </p>
                <input placeholder={T.email} value={resetEmail} onChange={e=>setResetEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doResetPassword()} style={inputSt}/>
                <BtnPrimary label={authLoading?T.loading:T.resetBtn} onClick={doResetPassword} C={C} disabled={authLoading}/>
                <p style={{fontSize:13,color:C.muted,textAlign:"center"}}>
                  <span onClick={()=>{setAuthMode("login");setAuthMsg(null);}} style={{color:C.accent,cursor:"pointer"}}>← {T.backToLogin}</span>
                </p>
              </div>
            )}

            {authMode==="login"&&(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <input placeholder={T.email} value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} style={inputSt}/>
                <input placeholder={T.password} type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={inputSt}/>
                <BtnPrimary label={authLoading?T.loading:T.loginBtn} onClick={doLogin} C={C} disabled={authLoading}/>
                {/* ✅ NOUVEAU: lien mot de passe oublié */}
                <p style={{fontSize:13,color:C.muted,textAlign:"center",margin:0}}>
                  <span onClick={()=>{setAuthMode("reset");setAuthMsg(null);setResetEmail(loginEmail);}} style={{color:C.accent,cursor:"pointer"}}>{T.forgotPassword}</span>
                </p>
                <p style={{fontSize:13,color:C.muted,textAlign:"center",margin:0}}>{T.noAccount} <span onClick={()=>{setAuthMode("signup");setAuthMsg(null);}} style={{color:C.accent,cursor:"pointer"}}>{T.signupTitle}</span></p>
              </div>
            )}

            {authMode==="signup"&&(
              <>
                <div style={{display:"flex",gap:8,marginBottom:14}}>
                  {[["client",T.asClient,"👤"],["coach",T.asCoach,"🏅"]].map(([r,l,ic])=>(
                    <button key={r} onClick={()=>setSignupRole(r)} style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${signupRole===r?C.accent:C.border}`,background:signupRole===r?`${C.accent}18`:"transparent",color:signupRole===r?C.accent:C.muted,cursor:"pointer",fontWeight:signupRole===r?700:400,fontSize:14}}>{ic} {l}</button>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <input placeholder={lang==="fr"?"Prénom":"First name"} value={signupFirstName} onChange={e=>setSignupFirstName(e.target.value)} style={inputSt}/>
                  <input placeholder={lang==="fr"?"Nom":"Last name"} value={signupLastName} onChange={e=>setSignupLastName(e.target.value)} style={inputSt}/>
                  <input placeholder={signupRole==="coach"?(lang==="fr"?"Pseudo (ex: @coachkev)":"Pseudo (e.g. @coachkev)"):(lang==="fr"?"Pseudo (ex: @johndoe)":"Pseudo (e.g. @johndoe)")} value={signupPseudo} onChange={e=>setSignupPseudo(e.target.value)} style={inputSt}/>
                  <input placeholder={T.email} value={signupEmail} onChange={e=>setSignupEmail(e.target.value)} style={inputSt}/>
                  <input placeholder={T.password} type="password" value={signupPass} onChange={e=>setSignupPass(e.target.value)} style={inputSt}/>
                  <input placeholder={T.confirmPassword} type="password" value={signupPass2} onChange={e=>setSignupPass2(e.target.value)} style={inputSt}/>
                  {signupRole==="coach"&&(
                    <>
                      <select value={signupSport} onChange={e=>setSignupSport(e.target.value)} style={{...inputSt,color:signupSport?C.txt:C.muted}}>
                        <option value="">{T.speciality}</option>
                        {ALL_SPORTS.map(s=><option key={s.fr} value={lang==="fr"?`${s.emoji} ${s.fr}`:`${s.emoji} ${s.en}`}>{s.emoji} {lang==="fr"?s.fr:s.en}</option>)}
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
                      {T.cguAccept}<span onClick={()=>setShowLegal(true)} style={{color:C.accent,cursor:"pointer",textDecoration:"underline"}}>{T.cguLink}</span>
                      {T.cguAnd}<span onClick={()=>setShowLegal(true)} style={{color:C.accent,cursor:"pointer",textDecoration:"underline"}}>{T.privacyLink}</span>
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
            <div style={{display:"inline-block",fontSize:12,fontWeight:700,padding:"4px 14px",borderRadius:999,border:`1px solid ${C.accent}44`,color:C.accent,marginBottom:18,letterSpacing:.8}}>🇪🇺 {lang==="fr"?"COACHING SPORTIF EN EUROPE":"SPORTS COACHING ACROSS EUROPE"}</div>
            <h1 style={{fontSize:44,fontWeight:800,margin:"0 0 14px",lineHeight:1.1,color:C.txt}}>
              {lang==="fr"?"Trouve ton coach,":"Find your coach,"}<br/>
              <span style={{background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{lang==="fr"?"vis ta performance.":"live your performance."}</span>
            </h1>
            <p style={{color:C.muted,fontSize:16,maxWidth:520,margin:"0 auto 28px"}}>{T.sub}</p>
            <div style={{display:"flex",gap:8,justifyContent:"center",maxWidth:600,margin:"0 auto 36px",background:C.card,borderRadius:14,padding:10,border:`1px solid ${C.border}`}}>
              <input placeholder={T.searchPlaceholder} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setPage("coaches")} style={{flex:1,padding:"9px 12px",borderRadius:10,border:"none",background:dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:14,outline:"none"}}/>
              <button onClick={()=>setPage("coaches")} style={{padding:"9px 22px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14}}>{T.searchBtn}</button>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:36,flexWrap:"wrap"}}>
              {T.stats.map((s,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontWeight:800,fontSize:22,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.v}</div>
                  <div style={{color:C.muted,fontSize:12}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{padding:"36px 24px 0"}}>
            <h2 style={{fontWeight:700,fontSize:20,marginBottom:16,color:C.txt}}>{T.sports}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:8}}>
              {displayedSports.map((s,i)=>(
                <button key={i} onClick={()=>{setSportFilter(lang==="fr"?`${s.emoji} ${s.fr}`:`${s.emoji} ${s.en}`);setPage("coaches");}} style={{padding:"14px 8px",borderRadius:12,border:`1px solid ${C.border}`,background:C.card,cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:24,marginBottom:4}}>{s.emoji}</div>
                  <div style={{fontSize:11,color:C.muted,fontWeight:600}}>{lang==="fr"?s.fr:s.en}</div>
                </button>
              ))}
            </div>
            <button onClick={()=>setShowAllSports(v=>!v)} style={{marginTop:12,padding:"8px 18px",borderRadius:999,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer",fontSize:13,display:"block",margin:"12px auto 0"}}>
              {showAllSports?T.seeLess:`${T.seeMore} (${ALL_SPORTS.length-FEATURED_SPORTS_COUNT}+)`}
            </button>
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
            {loadingCoaches?<p style={{color:C.muted}}>{T.loading}</p>:coaches.length===0?(
              <p style={{color:C.muted}}>{lang==="fr"?"Les premiers coachs arrivent bientôt !":"First coaches coming soon!"}</p>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
                {coaches.slice(0,4).map(c=><CoachCard key={c.id} c={c} lang={lang} T={T} C={C}
                  onSelect={()=>{setSelectedCoach(c);fetchReviews(c.id);checkHasBooked(c.id);setPage("coaches");}}
                  onBook={()=>openBooking(c,(c.formats||[])[0])}/>)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* COACHES LIST */}
      {page==="coaches"&&!selectedCoach&&(
        <div style={{padding:"28px 24px"}}>
          <h2 style={{fontWeight:700,fontSize:20,marginBottom:14,color:C.txt}}>{T.nav.coaches}</h2>
          <div style={{display:"flex",gap:8,marginBottom:14,background:C.card,borderRadius:12,padding:8,border:`1px solid ${C.border}`}}>
            <input placeholder={T.searchPlaceholder} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} style={{flex:1,padding:"8px 12px",borderRadius:8,border:"none",background:"transparent",color:C.txt,fontSize:14,outline:"none"}}/>
            {searchQuery&&<button onClick={()=>setSearchQuery("")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:16,padding:"0 8px"}}>✕</button>}
          </div>
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
            filteredCoaches.length===0?(
              <div style={{textAlign:"center",paddingTop:40}}>
                <div style={{fontSize:40,marginBottom:12}}>🔍</div>
                <p style={{color:C.muted}}>{searchQuery?`${T.noResults} "${searchQuery}"`:T.noCoaches}</p>
                <button onClick={()=>{setSearchQuery("");setSportFilter("ALL");setFmtFilter("ALL");}} style={{marginTop:12,padding:"8px 18px",borderRadius:999,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer",fontSize:13}}>{lang==="fr"?"Réinitialiser les filtres":"Reset filters"}</button>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
                {filteredCoaches.map(c=><CoachCard key={c.id} c={c} lang={lang} T={T} C={C}
                  onSelect={()=>{setSelectedCoach(c);fetchReviews(c.id);checkHasBooked(c.id);}}
                  onBook={()=>openBooking(c,(c.formats||[])[0])}/>)}
              </div>
            )
          )}
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
        <div style={{padding:"24px",maxWidth:640,margin:"0 auto"}}>
          <button onClick={()=>setSelectedCoach(null)} style={{fontSize:13,color:C.muted,background:"none",border:"none",cursor:"pointer",marginBottom:14}}>← {T.back}</button>
          <div style={{...card,padding:24}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:16}}>
              <Av src={selectedCoach.photo_url} initials={(selectedCoach.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()} color={selectedCoach.color||C.accent} size={72}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:20,color:C.txt}}>{selectedCoach.pseudo?`@${selectedCoach.pseudo}`:selectedCoach.name}</div>
                <div style={{fontSize:13,color:C.muted}}>{selectedCoach.name}</div>
                <div style={{color:C.muted,fontSize:13,marginTop:2}}>{selectedCoach.sport} · 📍 {selectedCoach.location||"—"}</div>
                {selectedCoach.langs&&<div style={{fontSize:12,color:C.muted,marginTop:2}}>🗣 {selectedCoach.langs}</div>}
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
                  {(selectedCoach.formats||[]).map(f=><Tag key={f} label={`${FMTI[f]||""} ${f}`} color={C.accent2}/>)}
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,fontSize:26,color:C.accent}}>{selectedCoach.price}€</div>
                <div style={{fontSize:12,color:C.muted}}>{T.perH}</div>
                <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end",marginTop:4}}>
                  <Stars n={selectedCoach.avg_rating||0} size={13} C={C}/>
                  <span style={{fontSize:12,color:C.muted}}>({reviews.length})</span>
                </div>
              </div>
            </div>
            <p style={{fontSize:14,color:C.muted,marginBottom:16,lineHeight:1.7}}>{selectedCoach.bio||"—"}</p>
            {(selectedCoach.certifs||[]).length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,color:C.muted,marginBottom:6}}>{T.certif}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{selectedCoach.certifs.map((cv,i)=><Tag key={i} label={cv} color={C.accent}/>)}</div>
              </div>
            )}
            <div style={{display:"flex",gap:10,marginBottom:24}}>
              <button onClick={()=>{
                const formats=selectedCoach.formats||[];
                const sessionFmt=formats.find(f=>isSessionFormat(f));
                const progFmt=formats.find(f=>isProgramFormat(f));
                openBooking(selectedCoach,sessionFmt||progFmt||formats[0]);
              }} style={{flex:2,padding:14,borderRadius:12,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:15}}>
                {T.bookBtn} →
              </button>
              <button onClick={()=>startConversation(selectedCoach)} style={{flex:1,padding:14,borderRadius:12,background:"transparent",border:`1px solid ${C.border}`,cursor:"pointer",color:C.txt,fontSize:14}}>
                💬 {T.contactCoach}
              </button>
            </div>
            {(selectedCoach.formats||[]).length>1&&(
              <div style={{...card2,padding:14,marginBottom:20}}>
                <div style={{fontSize:12,color:C.muted,marginBottom:10}}>{lang==="fr"?"Formats disponibles :":"Available formats:"}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {(selectedCoach.formats||[]).map(f=>(
                    <button key={f} onClick={()=>openBooking(selectedCoach,f)} style={{padding:"8px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",cursor:"pointer",fontSize:12,color:C.txt}}>
                      {FMTI[f]||""} {f}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16}}>
              <h3 style={{fontWeight:700,fontSize:15,marginBottom:14,color:C.txt}}>{T.reviewsTitle} ({reviews.length})</h3>
              {reviews.length===0?<p style={{color:C.muted,fontSize:14}}>{T.noReviews}</p>:reviews.slice(0,5).map((r,i)=>(
                <div key={i} style={{marginBottom:14,paddingBottom:14,borderBottom:i<reviews.length-1?`1px solid ${C.border}`:"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <div style={{width:30,height:30,borderRadius:"50%",background:`${C.accent}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.accent}}>{(r.client_id||"?")[0].toUpperCase()}</div>
                    <Stars n={r.note} size={12} C={C}/>
                    <span style={{fontSize:11,color:C.muted}}>{new Date(r.created_at).toLocaleDateString(lang==="fr"?"fr-FR":"en-US")}</span>
                  </div>
                  <p style={{fontSize:13,color:C.muted,margin:0,paddingLeft:38,lineHeight:1.5}}>{r.text}</p>
                </div>
              ))}
              {user&&userRole!=="coach"&&!reviewDone&&(
                hasBooked?(
                  <div style={{marginTop:14,padding:14,background:C.card2,borderRadius:12}}>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:10,color:C.txt}}>{T.leaveReview}</div>
                    <Stars n={reviewNote} size={26} interactive onRate={n=>setReviewNote(n)} C={C}/>
                    <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder={T.reviewPlaceholder} rows={2} style={{...inputSt,marginTop:10,resize:"vertical"}}/>
                    <button onClick={submitReview} style={{marginTop:10,padding:"9px 20px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700}}>{T.submitReview}</button>
                  </div>
                ):(
                  <div style={{marginTop:14,padding:12,background:C.card2,borderRadius:10,fontSize:12,color:C.muted,textAlign:"center"}}>
                    🔒 {T.reviewOnlyBooked}
                  </div>
                )
              )}
              {reviewDone&&<div style={{color:C.green,fontSize:13,marginTop:8}}>✓ {lang==="fr"?"Avis publié !":"Review posted!"}</div>}
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES */}
      {page==="messages"&&(
        <div style={{padding:"24px",maxWidth:700,margin:"0 auto"}}>
          <h2 style={{fontWeight:700,fontSize:18,marginBottom:14,color:C.txt}}>💬 {T.nav.messages}</h2>
          {user&&paymentRequests.length>0&&(
            <div style={{...card,padding:16,marginBottom:16,border:`1px solid ${C.gold}44`}}>
              <h3 style={{fontWeight:600,fontSize:14,marginBottom:12,color:C.gold}}>💳 {T.paymentRequests}</h3>
              {paymentRequests.map(pr=>(
                <div key={pr.id} style={{...card2,padding:12,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:C.txt}}>{pr.coaches?.pseudo?`@${pr.coaches.pseudo}`:pr.coaches?.name}</div>
                    <div style={{fontSize:12,color:C.muted}}>{pr.description}</div>
                    <div style={{fontSize:15,fontWeight:700,color:C.accent,marginTop:2}}>{pr.amount}€</div>
                  </div>
                  <button onClick={()=>openBooking({id:pr.coach_id,price:pr.amount,name:pr.coaches?.name,pseudo:pr.coaches?.pseudo,formats:[]},null)} style={{padding:"8px 16px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>{T.payNow}</button>
                </div>
              ))}
            </div>
          )}
          <div style={{display:"flex",gap:12,height:420}}>
            <div style={{...card,width:200,flexShrink:0,display:"flex",flexDirection:"column",overflow:"hidden"}}>
              <div style={{padding:"12px",borderBottom:`1px solid ${C.border}`,fontSize:13,fontWeight:600,color:C.txt}}>{lang==="fr"?"Conversations":"Conversations"}</div>
              <div style={{flex:1,overflowY:"auto"}}>
                {conversations.length===0
                  ?<p style={{fontSize:12,color:C.muted,padding:12,textAlign:"center"}}>{T.noConversations}</p>
                  :conversations.map(cv=>(
                    <div key={cv.id} onClick={async()=>{setActiveConv(cv);await loadMessages(cv.coachId);}}
                      style={{padding:"10px 12px",cursor:"pointer",borderBottom:`1px solid ${C.border}`,background:activeConv?.id===cv.id?`${C.accent}12`:"transparent",display:"flex",alignItems:"center",gap:8}}>
                      <Av src={cv.coachPhoto} initials={(cv.coachName||"?")[0].toUpperCase()} color={cv.coachColor} size={32}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,fontWeight:600,color:C.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cv.coachName}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div style={{...card,flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
              {!activeConv?(
                <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10}}>
                  <div style={{fontSize:36}}>💬</div>
                  <p style={{color:C.muted,fontSize:13}}>{T.selectCoach}</p>
                </div>
              ):(
                <>
                  <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
                    <Av src={activeConv.coachPhoto} initials={(activeConv.coachName||"?")[0].toUpperCase()} color={activeConv.coachColor} size={34}/>
                    <span style={{fontWeight:600,fontSize:14,color:C.txt}}>{activeConv.coachName}</span>
                  </div>
                  <div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:8}}>
                    {convMessages.length===0&&<p style={{color:C.muted,fontSize:12,textAlign:"center",marginTop:20}}>{lang==="fr"?"Démarrez la conversation !":"Start the conversation!"}</p>}
                    {convMessages.map((m,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
                        <div style={{maxWidth:"75%",padding:"9px 13px",borderRadius:m.from==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.from==="user"?`linear-gradient(135deg,${C.accent},${C.accent2})`:C.card2,color:m.from==="user"?"#fff":C.txt,fontSize:13,lineHeight:1.5}}>
                          {m.text}
                          <div style={{fontSize:10,opacity:.6,marginTop:3,textAlign:"right"}}>{m.time}</div>
                        </div>
                      </div>
                    ))}
                    <div ref={msgEndRef}/>
                  </div>
                  <div style={{padding:"10px 12px",borderTop:`1px solid ${C.border}`,display:"flex",gap:8}}>
                    <input value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder={T.msgPlaceholder} style={{flex:1,padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}/>
                    <button onClick={sendMsg} style={{padding:"9px 16px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:13}}>{T.msgSend}</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {page==="dashboard"&&(
        <div style={{padding:"24px",maxWidth:820,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
            <div>
              <h2 style={{fontWeight:700,fontSize:22,color:C.txt,margin:0}}>{T.dashTitle}</h2>
              <p style={{color:C.muted,fontSize:13,margin:"4px 0 0"}}>{T.dashSub}, {user?.user_metadata?.first_name||user?.email} 👋</p>
            </div>
            {userRole==="coach"&&<button onClick={()=>setShowOnboarding(true)} style={{fontSize:12,padding:"6px 14px",borderRadius:8,border:`1px solid ${C.accent}`,background:`${C.accent}18`,color:C.accent,cursor:"pointer"}}>✏️ {lang==="fr"?"Modifier mon profil":"Edit my profile"}</button>}
          </div>
          <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
            {(userRole==="coach"?[["overview",lang==="fr"?"Vue d'ensemble":"Overview"],["avails",T.myAvailabilities],["packages",T.myPackages],["payment",T.requestPayment],["faq",T.faq]]:[["overview",lang==="fr"?"Vue d'ensemble":"Overview"]]).map(([k,l])=>(
              <button key={k} onClick={()=>setDashTab(k)} style={{fontSize:13,padding:"7px 16px",borderRadius:999,border:`1px solid ${dashTab===k?C.accent:C.border}`,background:dashTab===k?`${C.accent}18`:"transparent",color:dashTab===k?C.accent:C.muted,cursor:"pointer",fontWeight:dashTab===k?700:400}}>{l}</button>
            ))}
          </div>

          {dashTab==="overview"&&(
            <div>
              {userRole==="coach"&&myCoachData&&(
                <div style={{...card,padding:18,marginBottom:16,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
                  <Av src={myCoachData.photo_url} initials={(myCoachData.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()} color={myCoachData.color||C.accent} size={56}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:16,color:C.txt}}>{myCoachData.pseudo?`@${myCoachData.pseudo}`:myCoachData.name}</div>
                    <div style={{fontSize:13,color:C.muted}}>{myCoachData.sport} · {myCoachData.location}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>{(myCoachData.formats||[]).map(f=><Tag key={f} label={`${FMTI[f]||""} ${f}`} color={C.accent2}/>)}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontWeight:800,fontSize:22,color:C.accent}}>{myCoachData.price}€<span style={{fontSize:12,color:C.muted}}>/h</span></div>
                    <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end",marginTop:4}}>
                      <Stars n={myCoachData.avg_rating||0} size={12} C={C}/>
                      <span style={{fontSize:11,color:C.muted}}>({myCoachData.review_count||0})</span>
                    </div>
                  </div>
                </div>
              )}
              <div style={{...card,padding:18,marginBottom:16}}>
                <h3 style={{fontWeight:600,fontSize:15,marginBottom:14,color:C.txt}}>📅 {T.nextSessions}</h3>
                {myBookings.length===0?<p style={{color:C.muted,fontSize:13}}>{lang==="fr"?"Aucune réservation pour l'instant.":"No bookings yet."}</p>:myBookings.slice(0,5).map((b,i)=>(
                  <div key={i} style={{...card2,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                    <Av src={b.coaches?.photo_url} initials={(b.coaches?.name||"?")[0].toUpperCase()} color={C.accent} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13,color:C.txt}}>{b.coaches?.pseudo?`@${b.coaches.pseudo}`:b.coaches?.name}</div>
                      <div style={{fontSize:12,color:C.muted}}>{b.coaches?.sport} · {b.slot||"—"}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <Tag label={b.format||"—"} color={C.accent2}/>
                      <div style={{fontSize:12,fontWeight:700,color:C.accent,marginTop:4}}>{b.amount}€</div>
                    </div>
                  </div>
                ))}
              </div>
              {userRole==="client"&&paymentRequests.length>0&&(
                <div style={{...card,padding:18,border:`1px solid ${C.gold}44`}}>
                  <h3 style={{fontWeight:600,fontSize:15,marginBottom:14,color:C.gold}}>💳 {T.paymentRequests}</h3>
                  {paymentRequests.map(pr=>(
                    <div key={pr.id} style={{...card2,padding:"10px 14px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:C.txt}}>{pr.coaches?.pseudo?`@${pr.coaches.pseudo}`:pr.coaches?.name}</div>
                        <div style={{fontSize:12,color:C.muted}}>{pr.description}</div>
                        <div style={{fontSize:15,fontWeight:700,color:C.accent,marginTop:2}}>{pr.amount}€</div>
                      </div>
                      <button onClick={()=>openBooking({id:pr.coach_id,price:pr.amount,name:pr.coaches?.name,pseudo:pr.coaches?.pseudo,formats:[]},null)} style={{padding:"8px 16px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>{T.payNow}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {dashTab==="avails"&&userRole==="coach"&&(
            <div style={{...card,padding:20}}>
              <h3 style={{fontWeight:600,fontSize:15,marginBottom:14,color:C.txt}}>🗓 {T.myAvailabilities}</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:8,marginBottom:10}}>
                <select value={newDay} onChange={e=>setNewDay(e.target.value)} style={{padding:"9px 10px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}>
                  <option value="">{lang==="fr"?"Jour":"Day"}</option>
                  {T.days_list.map(d=><option key={d} value={d}>{d}</option>)}
                </select>
                <select value={newStart} onChange={e=>setNewStart(e.target.value)} style={{padding:"9px 10px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}>
                  <option value="">{lang==="fr"?"Début":"Start"}</option>
                  {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                </select>
                <select value={newEnd} onChange={e=>setNewEnd(e.target.value)} style={{padding:"9px 10px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}>
                  <option value="">{lang==="fr"?"Fin":"End"}</option>
                  {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                </select>
                <button onClick={addAvailability} disabled={!newDay||!newStart||!newEnd} style={{padding:"9px 16px",borderRadius:10,background:(!newDay||!newStart||!newEnd)?"#555":`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",cursor:(!newDay||!newStart||!newEnd)?"not-allowed":"pointer",fontWeight:700,fontSize:13}}>+ {T.addSlot}</button>
              </div>
              {myAvails.length===0?<p style={{color:C.muted,fontSize:13}}>{T.noAvailabilities}</p>:myAvails.map(a=>(
                <div key={a.id} style={{...card2,padding:"10px 14px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <span style={{fontWeight:600,fontSize:13,color:C.txt}}>{a.day}</span>
                    <span style={{fontSize:13,color:C.muted,marginLeft:8}}>{a.start_time} – {a.end_time}</span>
                    {a.is_booked&&<Tag label={lang==="fr"?"Réservé":"Booked"} color={C.red}/>}
                  </div>
                  <button onClick={()=>supabase.from("availabilities").delete().eq("id",a.id).then(fetchMyAvails)} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:16}}>✕</button>
                </div>
              ))}
            </div>
          )}

          {dashTab==="packages"&&userRole==="coach"&&(
            <div style={{...card,padding:20}}>
              <h3 style={{fontWeight:600,fontSize:15,marginBottom:14,color:C.txt}}>📦 {T.myPackages}</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                <input placeholder={T.packageName} value={newPkgName} onChange={e=>setNewPkgName(e.target.value)} style={{padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}/>
                <textarea placeholder={T.packageDesc} value={newPkgDesc} onChange={e=>setNewPkgDesc(e.target.value)} rows={2} style={{padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none",resize:"vertical"}}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <input placeholder={T.packagePrice} type="number" value={newPkgPrice} onChange={e=>setNewPkgPrice(e.target.value)} style={{padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}/>
                  <input placeholder={T.packageDays} type="number" value={newPkgDays} onChange={e=>setNewPkgDays(e.target.value)} style={{padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}/>
                </div>
                <button onClick={addPackage} disabled={!newPkgName||!newPkgPrice} style={{padding:"10px",borderRadius:10,background:(!newPkgName||!newPkgPrice)?"#555":`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:(!newPkgName||!newPkgPrice)?"not-allowed":"pointer"}}>+ {T.addPackage}</button>
              </div>
              {myPackages.length===0?<p style={{color:C.muted,fontSize:13}}>{T.noPackages}</p>:(
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
                  {myPackages.map(p=>(
                    <div key={p.id} style={{...card2,padding:14}}>
                      <div style={{fontWeight:700,fontSize:14,color:C.txt,marginBottom:4}}>{p.name}</div>
                      <div style={{fontSize:12,color:C.muted,marginBottom:8,lineHeight:1.5}}>{p.description}</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div><span style={{fontWeight:800,fontSize:18,color:C.accent}}>{p.price}€</span><span style={{fontSize:11,color:C.muted,marginLeft:4}}>{T.delivery} {p.delivery_days} {T.days}</span></div>
                        <button onClick={()=>supabase.from("packages").delete().eq("id",p.id).then(fetchMyPackages)} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:16}}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {dashTab==="payment"&&userRole==="coach"&&(
            <div style={{...card,padding:20}}>
              <h3 style={{fontWeight:600,fontSize:15,marginBottom:14,color:C.txt}}>💳 {T.requestPayment}</h3>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div style={{display:"flex",gap:8}}>
                  <input
                    placeholder="@pseudo du client"
                    value={reqClientSearch}
                    onChange={e=>{setReqClientSearch(e.target.value);setReqClientFound(null);setReqClientMsg(null);}}
                    style={{flex:1,padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}
                  />
                  <button onClick={searchClient} style={{padding:"9px 16px",borderRadius:10,background:`${C.accent}22`,border:`1px solid ${C.accent}`,color:C.accent,cursor:"pointer",fontSize:13,fontWeight:600,flexShrink:0}}>
                    {lang==="fr"?"Chercher":"Search"}
                  </button>
                </div>
                {reqClientMsg&&(
                  <div style={{fontSize:12,color:reqClientFound?C.green:C.red,padding:"6px 10px",borderRadius:8,background:reqClientFound?`${C.green}18`:`${C.red}18`}}>{reqClientMsg}</div>
                )}
                <input placeholder={T.requestDesc} value={reqDesc} onChange={e=>setReqDesc(e.target.value)} style={{padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}/>
                <input placeholder={T.requestAmount} type="number" value={reqAmount} onChange={e=>setReqAmount(e.target.value)} style={{padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:C.txt,fontSize:13,outline:"none"}}/>
                <button onClick={sendPaymentRequest} disabled={!reqDesc||!reqAmount||!reqClientFound} style={{padding:"11px",borderRadius:10,background:(!reqDesc||!reqAmount||!reqClientFound)?"#555":`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer"}}>{T.sendRequest}</button>
              </div>
            </div>
          )}

          {dashTab==="faq"&&(
            <div style={{...card,padding:20}}>
              <h3 style={{fontWeight:600,fontSize:15,marginBottom:14,color:C.txt}}>❓ {T.faq}</h3>
              {FAQ_DATA.map((item,i)=>(
                <div key={i} style={{...card2,marginBottom:8,borderRadius:12,overflow:"hidden"}}>
                  <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",padding:"12px 16px",background:"transparent",border:"none",color:C.txt,fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {lang==="fr"?item.q_fr:item.q_en}
                    <span style={{color:C.muted,fontSize:16,flexShrink:0,marginLeft:8}}>{openFaq===i?"▲":"▼"}</span>
                  </button>
                  {openFaq===i&&<div style={{padding:"0 16px 14px",fontSize:13,color:C.muted,lineHeight:1.6}}>{lang==="fr"?item.a_fr:item.a_en}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookCoach&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,backdropFilter:"blur(4px)",padding:16}}>
          <div style={{...card,padding:24,maxWidth:480,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
            {bookDone?(
              <div style={{textAlign:"center",padding:"30px 0"}}>
                <div style={{fontSize:52,marginBottom:14}}>🎉</div>
                <h3 style={{fontWeight:700,fontSize:20,color:C.txt,marginBottom:8}}>{T.bookingConfirmed}</h3>
                <p style={{color:C.muted,fontSize:14,marginBottom:20}}>{T.bookingConfirmedSub}</p>
                <button onClick={closeBooking} style={{padding:"10px 28px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,cursor:"pointer"}}>OK</button>
              </div>
            ):(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <Av src={bookCoach.photo_url} initials={(bookCoach.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()} color={bookCoach.color||C.accent} size={42}/>
                    <div>
                      <div style={{fontWeight:700,fontSize:15,color:C.txt}}>{bookCoach.pseudo?`@${bookCoach.pseudo}`:bookCoach.name}</div>
                      <div style={{fontSize:12,color:C.muted}}>{bookCoach.sport}</div>
                    </div>
                  </div>
                  <button onClick={closeBooking} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:20}}>✕</button>
                </div>
                {(bookCoach.formats||[]).length>0&&(
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:12,color:C.muted,marginBottom:8}}>{T.formatLabel}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {(bookCoach.formats||[]).map(f=>(
                        <button key={f} onClick={async()=>{setBookFormat(f);setBookSlot(null);setBookHour(null);setBookPackage(null);setBookError(null);if(isSessionFormat(f))await fetchCoachAvails(bookCoach.id);if(isProgramFormat(f))await fetchCoachPackages(bookCoach.id);}}
                          style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${bookFormat===f?C.accent:C.border}`,background:bookFormat===f?`${C.accent}18`:"transparent",color:bookFormat===f?C.accent:C.muted,cursor:"pointer",fontSize:12,fontWeight:bookFormat===f?700:400}}>
                          {FMTI[f]||""} {f}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {bookFormat&&isSessionFormat(bookFormat)&&(
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:12,color:C.muted,marginBottom:8}}>🗓 {lang==="fr"?"Choisir un jour :":"Choose a day:"}</div>
                    {coachAvails.length===0
                      ?<p style={{fontSize:13,color:C.muted}}>{lang==="fr"?"Aucun créneau disponible.":"No slots available."}</p>
                      :<div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:160,overflowY:"auto"}}>
                        {coachAvails.map(a=>(
                          <button key={a.id} onClick={()=>{setBookSlot(a);setBookHour(null);}}
                            style={{padding:"9px 14px",borderRadius:10,border:`1px solid ${bookSlot?.id===a.id?C.accent2:C.border}`,background:bookSlot?.id===a.id?`${C.accent2}18`:"transparent",color:bookSlot?.id===a.id?C.accent2:C.txt,cursor:"pointer",textAlign:"left",fontSize:13}}>
                            📅 {a.day} · {a.start_time} – {a.end_time}
                          </button>
                        ))}
                      </div>
                    }
                    {bookSlot&&hourSlots.length>0&&(
                      <div style={{marginTop:12}}>
                        <div style={{fontSize:12,color:C.muted,marginBottom:8}}>🕐 {T.chooseHour}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                          {hourSlots.map(h=>(
                            <button key={h} onClick={()=>setBookHour(h)}
                              style={{padding:"8px 14px",borderRadius:10,border:`1px solid ${bookHour===h?C.accent:C.border}`,background:bookHour===h?`${C.accent}18`:"transparent",color:bookHour===h?C.accent:C.txt,cursor:"pointer",fontSize:13,fontWeight:bookHour===h?700:400}}>
                              {h.split(" – ")[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {bookFormat&&isProgramFormat(bookFormat)&&(
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:12,color:C.muted,marginBottom:8}}>📦 {T.packages}</div>
                    {coachPackages.length===0?<p style={{fontSize:13,color:C.muted}}>{lang==="fr"?"Aucun package disponible.":"No packages available."}</p>:(
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {coachPackages.map(p=>(
                          <button key={p.id} onClick={()=>setBookPackage(p)} style={{padding:"11px 14px",borderRadius:10,border:`1px solid ${bookPackage?.id===p.id?C.accent2:C.border}`,background:bookPackage?.id===p.id?`${C.accent2}18`:"transparent",cursor:"pointer",textAlign:"left"}}>
                            <div style={{fontWeight:600,fontSize:13,color:C.txt}}>{p.name}</div>
                            <div style={{fontSize:12,color:C.muted,marginTop:2}}>{p.description}</div>
                            <div style={{marginTop:4,display:"flex",gap:10}}>
                              <span style={{fontWeight:700,color:C.accent,fontSize:14}}>{p.price}€</span>
                              <span style={{fontSize:12,color:C.muted}}>· {T.delivery} {p.delivery_days} {T.days}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {bookFormat&&isDiscussionFormat(bookFormat)&&(
                  <div style={{...card2,padding:14,marginBottom:16,borderRadius:12}}>
                    <p style={{fontSize:13,color:C.muted,lineHeight:1.6,margin:0}}>💬 {T.discussionInfo}</p>
                  </div>
                )}
                {bookError&&<Alert msg={bookError} C={C}/>}
                {bookFormat&&!isDiscussionFormat(bookFormat)&&(
                  bookStep==="select"?(
                    <button onClick={()=>{
                      if(isSessionFormat(bookFormat)&&!bookSlot){setBookError(T.chooseSlotFirst);return;}
                      if(isSessionFormat(bookFormat)&&!bookHour){setBookError(lang==="fr"?"Choisis une heure précise.":"Choose a specific time.");return;}
                      if(isProgramFormat(bookFormat)&&!bookPackage){setBookError(T.selectPackage);return;}
                      setBookError(null);setBookStep("pay");
                    }} style={{width:"100%",padding:13,borderRadius:12,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer"}}>
                      {T.proceedPayment} → {bookPackage?bookPackage.price:bookCoach.price}€
                    </button>
                  ):(
                    <StripePayment amount={bookPackage?bookPackage.price:bookCoach.price} coachName={bookCoach.pseudo?`@${bookCoach.pseudo}`:bookCoach.name} onSuccess={handlePaymentSuccess} onCancel={()=>setBookStep("select")} lang={lang} C={C}/>
                  )
                )}
                {bookFormat&&isDiscussionFormat(bookFormat)&&(
                  <button onClick={()=>{closeBooking();startConversation(bookCoach);}} style={{width:"100%",padding:13,borderRadius:12,background:`linear-gradient(135deg,${C.accent},${C.accent2})`,border:"none",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer"}}>
                    💬 {T.sendMessage}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
{/* FOOTER */}
<footer style={{textAlign:"center",padding:"24px",borderTop:`1px solid ${C.border}`,fontSize:12,color:C.muted,marginTop:40}}>
  © 2026 <span style={{color:C.accent,fontWeight:700}}>Sportriq</span> · Paiements sécurisés Stripe
  <span onClick={()=>setShowLegal(true)} style={{marginLeft:16,cursor:"pointer",textDecoration:"underline",color:C.muted}}>CGU</span>
  <span onClick={()=>setShowLegal(true)} style={{marginLeft:12,cursor:"pointer",textDecoration:"underline",color:C.muted}}>Confidentialité</span>
  <span onClick={()=>setShowLegal(true)} style={{marginLeft:12,cursor:"pointer",textDecoration:"underline",color:C.muted}}>Mentions légales</span>
</footer>
      {showLegal&&<Legal lang={lang} C={C} onClose={()=>setShowLegal(false)}/>}
      <CookieBanner lang={lang} C={C} onShowLegal={()=>setShowLegal(true)}/>
    </div>
  );
}