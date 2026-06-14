import Link from "next/link";

export function AuthRequired() {
  return (
    <section className="auth-card">
      <div className="eyebrow">Sign in required</div>
      <h1 className="page-title small">Connect your workspace.</h1>
      <p className="card-copy">
        Library, templates, and activity are loaded from the API with your
        session token.
      </p>
      <Link href="/api/auth/signin">Sign in</Link>
    </section>
  );
}

