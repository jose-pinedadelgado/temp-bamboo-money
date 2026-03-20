import { describe, it, expect } from "vitest";
import { cn, formatCurrency, getProgressColor, getProgressPercentage } from "@/lib/utils";

// ── cn ──────────────────────────────────────────────────

describe("cn", () => {
  it("joins multiple class strings", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("filters out false values", () => {
    expect(cn("foo", false, "bar")).toBe("foo bar");
  });

  it("filters out null and undefined", () => {
    expect(cn("foo", null, undefined, "bar")).toBe("foo bar");
  });

  it("returns empty string when all values are falsy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });

  it("handles a single class", () => {
    expect(cn("solo")).toBe("solo");
  });
});

// ── formatCurrency ──────────────────────────────────────

describe("formatCurrency", () => {
  it("formats a positive whole number without sign by default", () => {
    expect(formatCurrency(1500)).toBe("$1,500");
  });

  it("formats a positive number with decimals", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("formats a negative number with a minus sign", () => {
    expect(formatCurrency(-250)).toBe("-$250");
  });

  it("shows a plus sign for positive amounts when showSign is true", () => {
    expect(formatCurrency(100, true)).toBe("+$100");
  });

  it("shows a minus sign for negative amounts regardless of showSign", () => {
    expect(formatCurrency(-100, true)).toBe("-$100");
  });

  it("formats zero without a sign", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats zero without a plus sign even when showSign is true", () => {
    expect(formatCurrency(0, true)).toBe("$0");
  });

  it("formats large numbers with commas", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000");
  });

  it("rounds to 2 decimal places", () => {
    expect(formatCurrency(99.999)).toBe("$100.00");
  });
});

// ── getProgressColor ────────────────────────────────────

describe("getProgressColor", () => {
  it("returns bg-warning at 95%", () => {
    expect(getProgressColor(95)).toBe("bg-warning");
  });

  it("returns bg-warning above 95%", () => {
    expect(getProgressColor(100)).toBe("bg-warning");
    expect(getProgressColor(150)).toBe("bg-warning");
  });

  it("returns bg-caution at 75%", () => {
    expect(getProgressColor(75)).toBe("bg-caution");
  });

  it("returns bg-caution between 75% and 94%", () => {
    expect(getProgressColor(80)).toBe("bg-caution");
    expect(getProgressColor(94)).toBe("bg-caution");
  });

  it("returns bg-green-accent below 75%", () => {
    expect(getProgressColor(0)).toBe("bg-green-accent");
    expect(getProgressColor(50)).toBe("bg-green-accent");
    expect(getProgressColor(74)).toBe("bg-green-accent");
  });
});

// ── getProgressPercentage ───────────────────────────────

describe("getProgressPercentage", () => {
  it("calculates a simple percentage", () => {
    expect(getProgressPercentage(50, 100)).toBe(50);
  });

  it("caps at 100%", () => {
    expect(getProgressPercentage(150, 100)).toBe(100);
  });

  it("returns 0 when budgeted is 0", () => {
    expect(getProgressPercentage(50, 0)).toBe(0);
  });

  it("returns 0 when spent is 0", () => {
    expect(getProgressPercentage(0, 100)).toBe(0);
  });

  it("handles fractional results", () => {
    expect(getProgressPercentage(1, 3)).toBeCloseTo(33.333, 2);
  });

  it("returns 100 when spent equals budgeted", () => {
    expect(getProgressPercentage(200, 200)).toBe(100);
  });
});
