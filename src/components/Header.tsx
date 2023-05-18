import React from "react";
import Image from "next/image";

import Logo from "../../public/assets/logo.svg";
import ChevronLeft from "../../public/assets/chevron-left.svg";
import Link from "next/link";

export default function Header() {
  return (
    <div className="h-[93px] w-full flex justify-center px-[30px] lg:px-[68px]">
      <div className="relative max-w-[1140px] w-full flex items-center justify-center">
        <Link
          className="absolute left-0"
          href="https://whitebook.pebmed.com.br/planos"
        >
          <Image src={ChevronLeft} alt="Icon back" />
        </Link>
        <Link href="https://whitebook.pebmed.com.br/planos">
          <Image src={Logo} alt="Logo image" />
        </Link>
      </div>
    </div>
  );
}
