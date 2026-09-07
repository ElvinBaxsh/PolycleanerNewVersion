import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center py-1">
      <Image
        src="/images/polycleaner-logonew.png"
        alt="Poly Cleaner — From Waste to Value"
        width={2149}
        height={732}
        priority
        className="h-[52px] w-auto object-contain sm:h-[58px] lg:h-[64px] xl:h-[68px]"
      />
    </Link>
  );
}