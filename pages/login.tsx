import { useEffect, useState } from "react";

export async function getServerSideProps() { return { props: {} }; }

export default function LoginPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try { setToken(localStorage.getItem("token")); } catch {}
    }
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <p>Token: {token ?? ""}</p>
    </main>
  );
}
