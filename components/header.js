import Image from "next/image";

export default function Header() {
  return (
    <nav className="flex flex-row w-screen items-center justify-between mix-blend-difference fixed h-fit top-[15px] xl:top-[30px] z-50 px-4 xl:px-32 pointer-events-none">
      <div className="relative w-[70px] xl:w-[100px] pointer-events-auto">
        <Image src="/static/images/logotype.svg" width={361} height={179} />
      </div>
      <a className="font-DMSans font-light text-base xl:text-lg text-white border-white border-[2px] rounded-full py-1 px-4 xl:py-2 xl:px-6 tracking-wider pointer-events-auto">
        World
      </a>
    </nav>
  );
}
