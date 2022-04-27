import Image from "next/image";

export default function Header() {
  return (
    <nav className="flex flex-row w-screen items-center justify-between mix-blend-difference fixed h-fit top-[30px] z-50 px-32">
      <div className="relative w-[100px]">
        <Image src="/static/images/logotype.svg" width={361} height={179} />
      </div>
      <a className="font-DMSans font-light text-lg text-white border-white border-[2px] rounded-full py-2 px-6 tracking-wider">
        World
      </a>
    </nav>
  );
}
