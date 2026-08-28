import Image from "next/image";
import Link from "next/link";

export function SocialBadge({
  href,
  icon,
  name,
}: {
  href: string;
  icon: string;
  name: string;
}) {
  return (
    <Link href={href} target="_blank" rel="noreferrer" className="social-badge">
      <Image src={icon} alt="" width={14} height={14} unoptimized aria-hidden />
      {name}
    </Link>
  );
}
