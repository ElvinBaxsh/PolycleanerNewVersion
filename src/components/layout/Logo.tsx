import Link from "next/link";
import Image from "next/image";

const SIZES = {
  default: "h-[60px] w-auto object-contain sm:h-[62px] lg:h-[64px] xl:h-[68px]",
  large: "h-[84px] w-auto object-contain sm:h-[96px] lg:h-[104px] xl:h-[112px]",
};

export default function Logo({ size = "default" }: { size?: keyof typeof SIZES }) {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/images/polycleaner-logonew.png"
        alt="Poly Cleaner — From Waste to Value"
        width={2149}
        height={732}
        priority
        className={SIZES[size]}
      />
    </Link>
  );
}