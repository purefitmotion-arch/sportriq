
import { useState } from "react";

const LEGAL_CONTENT = {
  fr: {
    cgu: {
      title: "Conditions Générales d'Utilisation",
      lastUpdate: "Dernière mise à jour : Avril 2026",
      content: `
1. PRÉSENTATION DE SPORTRIQ

Sportriq est une plateforme de mise en relation entre coachs sportifs indépendants et clients particuliers. Sportriq agit en qualité d'intermédiaire technique et ne fournit pas directement de prestations de coaching sportif.

2. ACCEPTATION DES CGU

L'utilisation de la plateforme Sportriq implique l'acceptation pleine et entière des présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.

3. INSCRIPTION ET COMPTE UTILISATEUR

L'inscription est gratuite pour les coachs et les clients. Vous devez avoir au moins 18 ans pour vous inscrire. Vous êtes responsable de la confidentialité de vos identifiants de connexion. Sportriq se réserve le droit de suspendre tout compte en cas de non-respect des présentes CGU.

4. RESPONSABILITÉ DE SPORTRIQ

Sportriq est une plateforme de mise en relation. À ce titre :
- Sportriq ne garantit pas la qualité des prestations délivrées par les coachs
- Sportriq n'est pas responsable des accidents survenant lors des séances
- Sportriq ne vérifie pas les certifications des coachs
- Les coachs déclarent sur l'honneur être qualifiés pour exercer leur activité

5. RESPONSABILITÉ DES COACHS

Les coachs s'engagent à :
- Fournir des informations exactes sur leur profil
- Honorer les réservations confirmées
- Disposer des assurances nécessaires à leur activité
- Respecter la législation en vigueur concernant leur activité professionnelle

6. PAIEMENTS ET COMMISSIONS

Les paiements sont traités via Stripe. Sportriq prélève une commission de 5% sur le montant payé par le coach et 3% sur le montant payé par le client. Les virements aux coachs sont effectués selon les délais Stripe en vigueur.

7. ANNULATION ET REMBOURSEMENT

Les conditions d'annulation sont définies par chaque coach sur son profil. En cas de litige, contactez hello@sportriq.com.

8. PROPRIÉTÉ INTELLECTUELLE

Le contenu de la plateforme Sportriq (logo, design, textes) est protégé par le droit de la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable.

9. DROIT APPLICABLE

Les présentes CGU sont soumises au droit luxembourgeois. Tout litige sera soumis aux tribunaux compétents du Luxembourg.

10. CONTACT

Pour toute question : hello@sportriq.com
      `
    },
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdate: "Dernière mise à jour : Avril 2026",
      content: `
1. RESPONSABLE DU TRAITEMENT

Sportriq, basé au Luxembourg, est responsable du traitement de vos données personnelles. Contact : hello@sportriq.com

2. DONNÉES COLLECTÉES

Nous collectons les données suivantes :
- Prénom, nom, pseudo
- Adresse email
- Date de naissance (clients)
- Informations de profil (sport, tarif, bio, localisation)
- Données de paiement (traitées par Stripe, non stockées par Sportriq)
- Historique des réservations

3. FINALITÉ DU TRAITEMENT

Vos données sont utilisées pour :
- Gérer votre compte et votre profil
- Faciliter la mise en relation coach/client
- Traiter les paiements
- Envoyer des communications liées au service
- Améliorer la plateforme

4. BASE LÉGALE

Le traitement de vos données est basé sur :
- L'exécution du contrat (CGU acceptées)
- Votre consentement explicite
- Le respect de nos obligations légales

5. CONSERVATION DES DONNÉES

Vos données sont conservées pendant la durée de votre inscription et 3 ans après la clôture de votre compte, conformément aux obligations légales.

6. VOS DROITS (RGPD)

Conformément au RGPD, vous disposez des droits suivants :
- Droit d'accès à vos données
- Droit de rectification
- Droit à l'effacement ("droit à l'oubli")
- Droit à la portabilité
- Droit d'opposition

Pour exercer ces droits : hello@sportriq.com

7. COOKIES

Sportriq utilise des cookies techniques nécessaires au fonctionnement de la plateforme et des cookies analytiques pour améliorer le service. Vous pouvez gérer vos préférences via le bandeau cookies.

8. SÉCURITÉ

Vos données sont protégées par des mesures de sécurité techniques et organisationnelles appropriées, incluant le chiffrement SSL et l'authentification sécurisée via Supabase.

9. PARTAGE DES DONNÉES

Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
- Stripe (paiements)
- Supabase (hébergement base de données)
- Vercel (hébergement plateforme)

10. CONTACT DPO

Pour toute question relative à vos données : hello@sportriq.com
      `
    },
    mentions: {
      title: "Mentions Légales",
      lastUpdate: "Avril 2026",
      content: `
ÉDITEUR DU SITE

Nom de la plateforme : Sportriq
Localisation : Luxembourg
Contact : hello@sportriq.com

HÉBERGEMENT

Hébergeur : Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723, USA
https://vercel.com

BASE DE DONNÉES

Supabase Inc.
970 Toa Payoh North, #07-04
Singapore 318992
https://supabase.com

PAIEMENTS

Les paiements sont sécurisés et traités par Stripe Inc.
510 Townsend Street
San Francisco, CA 94103, USA
https://stripe.com

PROPRIÉTÉ INTELLECTUELLE

L'ensemble du contenu de la plateforme Sportriq est protégé par le droit de la propriété intellectuelle luxembourgeois et européen.

RESPONSABILITÉ

Sportriq est une plateforme de mise en relation. Sportriq ne peut être tenu responsable des prestations délivrées par les coachs inscrits sur la plateforme.

CONTACT

Pour toute question : hello@sportriq.com
      `
    }
  },
  en: {
    cgu: {
      title: "Terms of Service",
      lastUpdate: "Last updated: April 2026",
      content: `
1. ABOUT SPORTRIQ

Sportriq is a platform connecting independent sports coaches with individual clients. Sportriq acts as a technical intermediary and does not directly provide sports coaching services.

2. ACCEPTANCE OF TERMS

Using the Sportriq platform implies full acceptance of these Terms of Service. If you do not accept these terms, please do not use the platform.

3. REGISTRATION AND USER ACCOUNT

Registration is free for coaches and clients. You must be at least 18 years old to register. You are responsible for the confidentiality of your login credentials. Sportriq reserves the right to suspend any account that violates these Terms.

4. SPORTRIQ LIABILITY

Sportriq is a matchmaking platform. As such:
- Sportriq does not guarantee the quality of services provided by coaches
- Sportriq is not responsible for accidents occurring during sessions
- Sportriq does not verify coach certifications
- Coaches declare on their honor that they are qualified to practice

5. COACH RESPONSIBILITIES

Coaches agree to:
- Provide accurate information on their profile
- Honor confirmed bookings
- Hold necessary insurance for their activity
- Comply with applicable legislation regarding their professional activity

6. PAYMENTS AND COMMISSIONS

Payments are processed via Stripe. Sportriq charges a 5% commission on the amount paid by the coach and 3% on the amount paid by the client. Payouts to coaches are made according to current Stripe timelines.

7. CANCELLATION AND REFUNDS

Cancellation terms are set by each coach on their profile. In case of dispute, contact hello@sportriq.com.

8. INTELLECTUAL PROPERTY

Sportriq platform content (logo, design, texts) is protected by intellectual property law. Any reproduction is prohibited without prior authorization.

9. APPLICABLE LAW

These Terms are governed by Luxembourg law. Any dispute will be submitted to the competent courts of Luxembourg.

10. CONTACT

For any questions: hello@sportriq.com
      `
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdate: "Last updated: April 2026",
      content: `
1. DATA CONTROLLER

Sportriq, based in Luxembourg, is the controller of your personal data. Contact: hello@sportriq.com

2. DATA COLLECTED

We collect the following data:
- First name, last name, username
- Email address
- Date of birth (clients)
- Profile information (sport, rate, bio, location)
- Payment data (processed by Stripe, not stored by Sportriq)
- Booking history

3. PURPOSE OF PROCESSING

Your data is used to:
- Manage your account and profile
- Facilitate coach/client matching
- Process payments
- Send service-related communications
- Improve the platform

4. LEGAL BASIS

Processing of your data is based on:
- Contract performance (accepted Terms)
- Your explicit consent
- Compliance with our legal obligations

5. DATA RETENTION

Your data is kept for the duration of your registration and 3 years after account closure, in accordance with legal obligations.

6. YOUR RIGHTS (GDPR)

Under GDPR, you have the following rights:
- Right of access to your data
- Right of rectification
- Right to erasure ("right to be forgotten")
- Right to data portability
- Right to object

To exercise these rights: hello@sportriq.com

7. COOKIES

Sportriq uses technical cookies necessary for platform operation and analytical cookies to improve the service. You can manage your preferences via the cookie banner.

8. SECURITY

Your data is protected by appropriate technical and organizational security measures, including SSL encryption and secure authentication via Supabase.

9. DATA SHARING

Your data is never sold to third parties. It may be shared with:
- Stripe (payments)
- Supabase (database hosting)
- Vercel (platform hosting)

10. DPO CONTACT

For any questions about your data: hello@sportriq.com
      `
    },
    mentions: {
      title: "Legal Notice",
      lastUpdate: "April 2026",
      content: `
SITE PUBLISHER

Platform name: Sportriq
Location: Luxembourg
Contact: hello@sportriq.com

HOSTING

Host: Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723, USA
https://vercel.com

DATABASE

Supabase Inc.
970 Toa Payoh North, #07-04
Singapore 318992
https://supabase.com

PAYMENTS

Payments are secured and processed by Stripe Inc.
510 Townsend Street
San Francisco, CA 94103, USA
https://stripe.com

INTELLECTUAL PROPERTY

All content on the Sportriq platform is protected by Luxembourg and European intellectual property law.

LIABILITY

Sportriq is a matchmaking platform. Sportriq cannot be held liable for services provided by coaches registered on the platform.

CONTACT

For any questions: hello@sportriq.com
      `
    }
  }
};

export default function Legal({ lang, C, onClose }) {
  const [tab, setTab] = useState("cgu");
  const T = LEGAL_CONTENT[lang] || LEGAL_CONTENT.fr;
  const content = T[tab];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(4px)" }} onClick={onClose}>
      <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, width:"90%", maxWidth:700, maxHeight:"85vh", overflow:"hidden", display:"flex", flexDirection:"column" }} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", gap:8 }}>
            {["cgu","privacy","mentions"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ padding:"6px 12px", borderRadius:8, border:"none", background:tab===t?`${C.accent}22`:"transparent", color:tab===t?C.accent:C.muted, cursor:"pointer", fontSize:13, fontWeight:tab===t?700:400 }}>
                {t==="cgu"?(lang==="fr"?"CGU":"Terms"):t==="privacy"?(lang==="fr"?"Confidentialité":"Privacy"):(lang==="fr"?"Mentions":"Legal")}
              </button>
            ))}
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:20 }}>✕</button>
        </div>
        {/* Content */}
        <div style={{ padding:"20px", overflowY:"auto", flex:1 }}>
          <h2 style={{ fontWeight:700, fontSize:18, marginBottom:4, color:C.txt }}>{content.title}</h2>
          <p style={{ fontSize:12, color:C.muted, marginBottom:16 }}>{content.lastUpdate}</p>
          <pre style={{ fontSize:13, color:C.muted, lineHeight:1.8, whiteSpace:"pre-wrap", fontFamily:"sans-serif" }}>{content.content}</pre>
        </div>
      </div>
    </div>
  );
}