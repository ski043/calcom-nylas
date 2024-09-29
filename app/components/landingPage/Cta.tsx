import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-20">
      <div className="relative isolate overflow-hidden  px-6 py-20 text-center sm:rounded-3xl sm:border  sm:px-16 sm:shadow-sm">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight  sm:text-4xl">
          Start using CalMarshal Now!
        </h2>
        <h3 className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          CalMarshal makes it easy for your clients to scheduale a meeting with
          you clients.
        </h3>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Button>Get Started Today</Button>
        </div>
        {/* gradient svg */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#3b82f6" />
              <stop offset={1} stopColor="#1d4ed8" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
