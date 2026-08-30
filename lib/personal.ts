import personal from "@/public/data/personal.json";

export type PersonalLink = {
  name: string;
  url: string;
};

export type Personal = {
  name: string;
  email: string;
  country: string;
  links: PersonalLink[];
  "book-a-call"?: string;
};

export function getPersonal(): Personal {
  return personal as Personal;
}

export function formatCountry(country: string) {
  const trimmed = country.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}
