"use client";
import { useEffect, useState } from "react";
import { getApiBase } from "../../src/lib/apiBase";


export default function CompanyPage() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch(`${getApiBase()}/api/assets/partners-logos`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setPartners(d.logos);
      });
  }, []);

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
