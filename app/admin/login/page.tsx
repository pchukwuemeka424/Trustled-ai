import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Container } from "@/components/container";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <section style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
          <Container>
            <p className="lede" style={{ textAlign: "center" }}>
              Loading…
            </p>
          </Container>
        </section>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
