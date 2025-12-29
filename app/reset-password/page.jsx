// app/reset-password/page.jsx
import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center", marginTop: 40 }}>Loading…</p>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
