import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group"
      aria-label="Jobly — Home"
    >
      {/* Icon mark */}
      <span
        className="flex items-center justify-center w-9 h-9 rounded-xl font-bold text-lg
                   bg-terracotta text-white
                   transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        J
      </span>

      {/* Wordmark */}
      <span
        className="text-xl font-bold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        Jobly
      </span>
    </Link>
  );
}
