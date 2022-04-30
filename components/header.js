import Image from "next/image";

export default function Header() {
  return (
    <nav className="flex flex-row w-screen items-center justify-center mix-blend-difference fixed h-fit top-[15px] xl:top-[30px] z-50 px-4 xl:px-32 pointer-events-none">
      <div className="relative w-[70px] xl:w-[100px] pointer-events-auto nav-logo aspect-[361/179] h-auto scale-100 ">
        <Image src="/static/images/logotype.svg" layout="fill" />
      </div>
    </nav>
  );
}
