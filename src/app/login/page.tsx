"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, clearError, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setSubmitting(true);
    const ok = await login(username.trim(), password);
    if (ok) {
      router.push("/app");
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      {/* Subtle grain texture overlay */}
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
            Welcome back
          </h1>
          <p className="font-body text-sm text-text-secondary mt-2">
            Sign in to your Bamboo Money account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-bg-card rounded-xl border border-border-default shadow-elevated p-8">
          {/* Error message — warm terracotta, not harsh red */}
          {error && (
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
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block font-body font-medium text-xs text-text-secondary uppercase tracking-wider mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => { setUsername(e.target.value); clearError(); }}
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-border-default
                  bg-bg-subtle font-body text-base text-text-primary
                  placeholder:text-text-tertiary
                  focus:outline-none focus:ring-2 focus:ring-green-accent/40 focus:border-green-primary
                  transition-all duration-200"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-body font-medium text-xs text-text-secondary uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-border-default
                  bg-bg-subtle font-body text-base text-text-primary
                  placeholder:text-text-tertiary
                  focus:outline-none focus:ring-2 focus:ring-green-accent/40 focus:border-green-primary
                  transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || isLoading || !username.trim() || !password.trim()}
              className="w-full h-12 rounded-[var(--btn-radius)] font-body font-semibold text-base
                bg-btn-primary-bg text-btn-primary-text
                shadow-card hover:shadow-elevated
                hover:brightness-110 hover:scale-[1.01]
                active:scale-[0.99]
                focus-ring
                transition-all duration-200
                disabled:opacity-50 disabled:pointer-events-none
                cursor-pointer"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider — for future OAuth buttons (Day 7) */}
          {/*
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border-default" />
            <span className="font-body text-xs text-text-tertiary uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-border-default" />
          </div>
          */}
        </div>

        {/* Register link */}
        <p className="text-center font-body text-sm text-text-secondary mt-8">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-green-primary font-medium hover:text-green-accent transition-colors focus-ring rounded-sm"
          >
            Create one
          </Link>
        </p>

        {/* Footer accent */}
        <p className="text-center font-body text-xs text-text-tertiary mt-6 opacity-60">
          Your finances, growing naturally
        </p>
      </div>
    </div>
  );
}
