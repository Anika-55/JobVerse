import { SignIn } from "@clerk/nextjs";
import SiteLogo from "@/components/site-logo";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      {/* Warm atmospheric background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--terracotta) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, var(--jade) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md animate-fade-in">
        {/* Branding */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <SiteLogo />
          <div>
            <h1
              className="text-2xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-foreground-muted">
              Sign in to continue to Jobly
            </p>
          </div>
        </div>

        {/* Clerk Sign-In widget */}
        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox: "w-full shadow-none",
                card: "w-full shadow-none border border-border rounded-2xl bg-card",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
