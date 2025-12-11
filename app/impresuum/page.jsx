// app/impressum/page.jsx
export const metadata = {
  title: "Νομικές Πληροφορίες | Corfu Delicatessen",
};

export default function ImpressumPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Νομικές Πληροφορίες</h1>

      <h2>Στοιχεία Επιχείρησης</h2>
      <p>
        Επωνυμία: Corfu Delicatessen <br />
        Έδρα: Κέρκυρα, Ελλάδα <br />
        Τηλέφωνο: +30 26610 12345 <br />
        Email: info@corfudelicatessen.com <br />
      </p>

      <h2>Ιστότοπος</h2>
      <p>Διεύθυνση: https://corfudelicatessen.com</p>

      <h2>Πολιτικές</h2>
      <ul>
        <li>
          <a href="/privacy-policy">Πολιτική Απορρήτου</a>
        </li>
        <li>
          <a href="/cookies-policy">Πολιτική Cookies</a>
        </li>
        <li>
          <a href="/terms">Όροι &amp; Προϋποθέσεις</a>
        </li>
      </ul>

      <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "20px" }}>
        Η ιστοσελίδα και τα περιεχόμενά της προορίζονται αποκλειστικά για
        ενημερωτική και εμπορική χρήση από την «Corfu Delicatessen».
      </p>
    </div>
  );
}
