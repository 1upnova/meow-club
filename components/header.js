import Image from "next/image";

export default function Header() {
  return (
    <nav className="flex flex-row w-screen items-center justify-between lg:justify-end mix-blend-difference fixed h-fit top-[15px] xl:top-[30px] z-50 px-4 xl:px-32 pointer-events-none">
      <div className="lg:absolute lg:left-[50%] lg:translate-x-[-50%] lg:top-[50%] lg:translate-y-[-50%]">
        <div className="relative w-[70px] xl:w-[100px] nav-logo aspect-[361/179] h-auto scale-100 ">
          <Image src="/static/images/logotype.svg" layout="fill" />
        </div>
      </div>
      <a
        href="https://nftworlds.com/play"
        target="_blank"
        rel="noreferrer"
        className="text-white font-DMSans text-base lg:text-xl px-4 py-2 lg:px-8 lg:py-2 border-[2px] border-white rounded-full pointer-events-auto cursor-none uppercase"
      >
        Play now
      </a>
    </nav>
  );
}
