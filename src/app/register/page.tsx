"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { register, error, clearError, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const displayError = localError || error;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (!username.trim()) { setLocalError("Username is required"); return; }
    if (password.length < 6) { setLocalError("Password must be at least 6 characters"); return; }
    if (password !== confirmPassword) { setLocalError("Passwords don't match"); return; }

    setSubmitting(true);
    const ok = await register(username.trim(), password, email.trim() || undefined);
    if (ok) {
      router.push("/app");
    }
    setSubmitting(false);
  }

  function handleChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setLocalError(null);
      clearError();
    };
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      {/* Grain texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-[400px] relative z-10">
        {/* Logo & Welcome */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-deep mb-6 shadow-elevated">
            <span className="text-2xl">🎋</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-text-primary tracking-tight">
            Start growing
          </h1>
          <p className="font-body text-sm text-text-secondary mt-2">
            Create your Bamboo Money account
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-bg-card rounded-xl border border-border-default shadow-elevated p-8">
          {displayError && (
            <div
              className="mb-6 px-4 py-3 rounded-lg border font-body text-sm animate-fade-up"
              style={{
                backgroundColor: "rgba(231, 111, 81, 0.08)",
                borderColor: "rgba(231, 111, 81, 0.2)",
                color: "#C85A3E",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">⚠</span>
                <span>{displayError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block font-body font-medium text-xs text-text-secondary uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={handleChange(setUsername)}
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-border-default
                  bg-bg-subtle font-body text-base text-text-primary placeholder:text-text-tertiary
                  focus:outline-none focus:ring-2 focus:ring-green-accent/40 focus:border-green-primary
                  transition-all duration-200"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-body font-medium text-xs text-text-secondary uppercase tracking-wider mb-2">
                Email <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleChange(setEmail)}
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-border-default
                  bg-bg-subtle font-body text-base text-text-primary placeholder:text-text-tertiary
                  focus:outline-none focus:ring-2 focus:ring-green-accent/40 focus:border-green-primary
                  transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-body font-medium text-xs text-text-secondary uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={handleChange(setPassword)}
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-border-default
                  bg-bg-subtle font-body text-base text-text-primary placeholder:text-text-tertiary
                  focus:outline-none focus:ring-2 focus:ring-green-accent/40 focus:border-green-primary
                  transition-all duration-200"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block font-body font-medium text-xs text-text-secondary uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleChange(setConfirmPassword)}
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-border-default
                  bg-bg-subtle font-body text-base text-text-primary placeholder:text-text-tertiary
                  focus:outline-none focus:ring-2 focus:ring-green-accent/40 focus:border-green-primary
                  transition-all duration-200"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || isLoading}
              className="w-full h-12 rounded-[var(--btn-radius)] font-body font-semibold text-base
                bg-btn-primary-bg text-btn-primary-text
                shadow-card hover:shadow-elevated hover:brightness-110 hover:scale-[1.01]
                active:scale-[0.99] focus-ring transition-all duration-200
                disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-sm text-text-secondary mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-primary font-medium hover:text-green-accent transition-colors focus-ring rounded-sm"
          >
            Sign in
          </Link>
        </p>

        <p className="text-center font-body text-xs text-text-tertiary mt-6 opacity-60">
          Your finances, growing naturally
        </p>
      </div>
    </div>
  );
}
