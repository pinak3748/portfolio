import { formatCountry, type Personal } from "@/lib/personal";

function IndiaFlag() {
  return (
    <span className="inline-flex h-3 w-4.5 shrink-0 overflow-hidden rounded-xs shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gray-1200)_12%,transparent)]">
      <svg
        viewBox="0 0 9 6"
        className="size-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="9" height="2" fill="#FF9933" />
        <rect y="2" width="9" height="2" fill="#fff" />
        <rect y="4" width="9" height="2" fill="#138808" />
        <circle
          cx="4.5"
          cy="3"
          r="0.72"
          fill="none"
          stroke="#000080"
          strokeWidth="0.28"
        />
        <circle cx="4.5" cy="3" r="0.18" fill="#000080" />
      </svg>
    </span>
  );
}

function CountryMark({ country }: { country: string }) {
  const label = formatCountry(country);
  const isIndia = country.trim().toLowerCase() === "india";

  return (
    <p className="flex items-center gap-2 text-[0.8125rem] leading-relaxed text-gray-1000">
      From
      {isIndia ? <IndiaFlag /> : null}
      {/* {label} */}
    </p>
  );
}

const linkClassName =
  "text-[0.8125rem] leading-relaxed text-gray-1000 no-underline transition-colors duration-160 ease-[var(--ease-out)] hover:text-gray-1200 focus-visible:text-gray-1200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-1200";

export function SiteFooter({ personal }: { personal: Personal }) {
  const items = [
    ...personal.links,
    { name: "Email", url: `mailto:${personal.email}` },
  ];

  return (
    <footer className="fade-in-item mt-16 border-t border-gray-400 pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
      {/* <CountryMark country={personal.country} /> */}

        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
          aria-label="Links"
        >
          {items.map((link) => {
            const external = link.url.startsWith("http");
            return (
              <a
                key={link.url}
                href={link.url}
                className={linkClassName}
                {...(external
                  ? { target: "_blank", rel: "noreferrer" }
                  : undefined)}
              >
                {link.name}
              </a>
            );
          })}
        </nav>
        <a
                key={personal["book-a-call"]}
                href={personal["book-a-call"]}
                className={linkClassName}
              >
                Book a call
              </a>
       
      </div>
    </footer>
  );
}
