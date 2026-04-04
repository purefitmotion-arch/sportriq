import { useState, useEffect } from "react";

export default function CookieBanner({ lang, C, onShowLegal }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sportriq_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("sportriq_cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("sportriq_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:300, padding:"16px 24px", background:C.card, borderTop:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
      <p style={{ fontSize:13, color:C.muted, margin:0, maxWidth:600 }}>
        {lang==="fr"
          ? "Sportriq utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre "
          : "Sportriq uses cookies to improve your experience. By continuing, you accept our "}
        <span onClick={onShowLegal} style={{ color:C.accent, cursor:"pointer", textDecoration:"underline" }}>
          {lang==="fr" ? "politique de confidentialité" : "privacy policy"}
        </span>.
      </p>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={decline} style={{ padding:"7px 16px", borderRadius:8, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, cursor:"pointer", fontSize:13 }}>
          {lang==="fr" ? "Refuser" : "Decline"}
        </button>
        <button onClick={accept} style={{ padding:"7px 16px", borderRadius:8, border:"none", background:`linear-gradient(135deg,${C.accent},${C.accent2})`, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:700 }}>
          {lang==="fr" ? "Accepter" : "Accept"}
        </button>
      </div>
    </div>
  );
}