"use client";

export default function CompanyPage() {
  const partners = [
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/1-aktina.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/2-aldoro.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/3-alfa.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/4-alterra.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/5-amato.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/61-molkereiammerland.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/6-arla.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/7-aroxol.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/8-aviko.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/8g-barilla.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/9-bella.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/10-bellini.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/101-vogiatzi.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/32g-bunge.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/33-gaia.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/34-giotis.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/11-cadbury.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/12-canderel.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/13-canuti.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/14-caputo.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/15-cartedor.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/16-casafiesta.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/17-caterpak.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/18-certo.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/19-ciao.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/20-coati.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/21-corfuspirit.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/22-cretafarms.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/23-dececco.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/24-debic.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/25-der-kasemeister.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/26-develey.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/25-delta.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/27-divella.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/28-elsabor.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/29-elviart.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/30-endless.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/31-fairy.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/32-fino.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/35-goldfire.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/36-gullon.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/93-thrakis.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/37-habitos.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/38-heinz.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/40-hellmanns.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/39-helios.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/41-hugli.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/42-ifantis.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/43-kalas.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/44-kanaki.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/46-knorr.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/47-kolios.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/48-kyknos.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/49-lambweston.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/49g-latteria-sorrentina.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/50-lazaris.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/50g-le-5-stagioni.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/51-lebontadelcasale.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/52-lecker.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/53-lurpak.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/54-lutece.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/55-magic.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/56-mammamaria.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/59-mebgal.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/58-meggle.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/60-molina.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/62-mpillia.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/62g-mutti.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/63-nestle.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/64-nostimost.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/65-nounou.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/66-nutella.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/67-oldenburger.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/69-oskar.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/70-panemporii.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/72-pinsaromana.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/74-president.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/75-prontalluso.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/76-provil.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/73-pitheas.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/77-quaker.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/78-quimxel.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/79-raps.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/80-riomare.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/82-roberto.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/83-rodoula.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/80-riso-pasini.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/72g-pites-xasioti.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/81-rito.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/84-rummo.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/85-saltic.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/86-sanmichele.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/87-sanitas.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/88-santamaria.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/89-scotti.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/90-seagull.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/91-select.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/91g-sellas.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/92-sisinni.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/94-tide.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/95-varvello.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/96-viakal.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/97-viander.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/98-vileda.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/99-villani.webp",
    "https://corfudelicatessen.com/wp-content/uploads/2022/03/100-viosarp.webp",
  ];

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        lineHeight: 1.7,
        color: "#2c1810",
      }}
    >
      <h1 style={{ color: "#1f3b2e", borderBottom: "2px solid #d1b76e", paddingBottom: 10, marginBottom: 20, fontSize: "2rem", textAlign: "center" }}>
        Η Εταιρεία
      </h1>

      <p>
        Η <strong>Corfu Delicatessen</strong> ιδρύθηκε το 2002 με κύρια δραστηριότητα
        την εμπορία τροφίμων με αποκλειστική διάθεση επιλεγμένων προϊόντων στην Κέρκυρα.
      </p>
      <p>
        Η εταιρεία μας αποτελεί μία πρότυπη Εταιρεία Ολικής κάλυψης των απαιτήσεων
        της Μαζικής Εστίασης (Εστιατόρια, Ψητοπωλεία, Καφέ, Snacks κ.λπ.) και ειδικεύεται
        στην επιτυχημένη διεκπεραίωση και εφαρμογή του πρώτιστης σημασίας οργανογράμματος
        της αλυσίδας εφοδιασμού.
      </p>
      <p>
        Χρόνια τώρα ασχολούμαστε με το γενικό εμπόριο σε τρόφιμα, όσπρια, θαλασσινά,
        ζυμαρικά, είδη μπακαλικής, βότανα και γαλακτοκομικά. Χρόνια τώρα φροντίζουμε να
        έχουμε πάντα πρώτης ποιότητας υλικά στις ασυναγώνιστες τιμές που φημιζόμαστε!
      </p>
      <p>
        Τα προϊόντα μας μπορούν τώρα να είναι στην πόρτα σας και με τηλεφωνικές
        παραγγελίες ή ακόμα και με ένα e-mail! Με ιδιόκτητα φορτηγά ψυγεία φροντίζουμε
        την καθημερινή διανομή σε ξενοδοχεία, ταβέρνες, εστιατόρια, super market και
        mini market, εξασφαλίζοντας άριστη εξυπηρέτηση προς τους πελάτες μας.
      </p>

      <h2 style={{ marginTop: 40, color: "#1f3b2e", borderTop: "2px solid #d1b76e", paddingTop: 10, fontSize: "1.4rem" }}>
        Οι Συνεργάτες μας
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 20,
          justifyItems: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {partners.map((url, i) => {
          const name = url.split("/").pop().replace(/\d+-|\.webp/g, "").toUpperCase();
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <img
                src={url}
                alt={name}
                loading="lazy"
                style={{
                  width: "100px",
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            margin: 20px 10px !important;
            padding: 16px !important;
          }
          h1 {
            font-size: 1.8rem !important;
          }
          p {
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </div>
  );
}
