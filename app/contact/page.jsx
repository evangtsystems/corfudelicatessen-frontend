"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Σας ευχαριστούμε! Το μήνυμά σας στάλθηκε επιτυχώς.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        color: "#2c1810",
        lineHeight: 1.7,
      }}
    >
      <h1
        style={{
          color: "#1f3b2e",
          borderBottom: "2px solid #d1b76e",
          paddingBottom: "10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Επικοινωνία
      </h1>

      <p style={{ marginBottom: "20px", textAlign: "center" }}>
        Στην <strong>Corfu Delicatessen</strong>, εκτιμούμε τα σχόλια και τις
        ερωτήσεις σας. Επικοινωνήστε μαζί μας μέσω τηλεφώνου, email ή της
        παρακάτω φόρμας. Ανυπομονούμε να σας εξυπηρετήσουμε!
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN - Info */}
        <div>
          <h3 style={{ color: "#1f3b2e" }}>📍 Διεύθυνση</h3>
          <p>
            Φέλεκας Σκριπερού, 14ο χλμ Παλαιοκαστρίτσας,
            <br />
            Κέρκυρα 49083
          </p>

          <h3 style={{ color: "#1f3b2e" }}>📞 Τηλέφωνο</h3>
          <p>
            <a
              href="tel:+302663022701"
              style={{ color: "#2c1810", textDecoration: "none" }}
            >
              +30 26630 22701
            </a>
          </p>

          <h3 style={{ color: "#1f3b2e" }}>📧 E-mail</h3>
          <p>
            <a
              href="mailto:info@corfudelicatessen.com"
              style={{ color: "#2c1810", textDecoration: "none" }}
            >
              info@corfudelicatessen.com
            </a>
          </p>

          <h3 style={{ color: "#1f3b2e" }}>🕒 Ωράριο Λειτουργίας</h3>
          <p>Δευτέρα – Σάββατο: 8:00 – 16:00</p>
        </div>

        {/* RIGHT COLUMN - Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "#fafafa",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Ονοματεπώνυμο"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <textarea
            name="message"
            placeholder="Μήνυμα"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
              resize: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#1f3b2e",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Αποστολή
          </button>
          {status && (
            <p style={{ color: "#1f3b2e", marginTop: "8px" }}>{status}</p>
          )}
        </form>
      </div>

      {/* Google Map */}
      <div style={{ marginTop: "40px" }}>
        <iframe
          src="https://www.google.com/maps?q=Corfu+Delicatessen,+Φέλεκας+Σκριπερού,+Κέρκυρα&output=embed"
          width="100%"
          height="300"
          style={{
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Responsive Styles */}
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
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
