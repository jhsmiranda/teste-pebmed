import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "~/utils/fomatCurrency";

import SuccessIcon from "../../public/assets/success.svg";
import Star from "../../public/assets/star.svg";

interface Props {
  installmentSelected: string | undefined;
  offers: OfferProps[];
  cpf: string;
}

export default function Success({ installmentSelected, offers, cpf }: Props) {
  const [planSelected, setPlanSelected] = useState<OfferProps>();

  useEffect(() => {
    if (installmentSelected) {
      const filteredOffer = offers.filter(
        (offer: OfferProps) =>
          offer.installments === parseInt(installmentSelected, 10)
      )[0];
      setPlanSelected(filteredOffer);
    }
  }, [installmentSelected, offers]);

  return (
    <div className={`flex-col items-center mt-10`}>
      <Image src={SuccessIcon} alt="Icon success" className="mb-[18.2px]" />
      <span className="text-peb-primary text-xl mb-[11px]">Parabéns!</span>
      <span className="text-peb-gray-3 text-lg mb-[56.8px] max-w-[200px] text-center">
        Sua assinatura foi realizada com sucesso.
      </span>
      <div className="Card-success rounded-[15px] shadow-[0px_4px_20px_#0000000d] p-4 pb-6 min-w-[343px] mb-[86px]">
        <div className="rounded-[15px] bg-peb-gray-1 flex justify-between px-5 py-4 mb-[19px]">
          <Image src={Star} alt="Icon star" />
          <div className="flex flex-col items-end gap-2">
            <span className="text-peb-primary text-lg">{`${planSelected?.title} | ${planSelected?.description}`}</span>
            <span className="text-peb-primary text-base">
              {`${formatCurrency(
                planSelected?.fullPrice! - planSelected?.discountAmmount!
              )} | ${planSelected?.installments}x de ${formatCurrency(
                planSelected?.fullPrice! - planSelected?.discountAmmount!
              )}`}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between px-5 mb-[26px] md:flex-row md:gap-[82px]">
          <span className="text-base text-peb-gray-3">E-mail</span>
          <span className="text-base text-peb-black">
            fulano@cicrano.com.br
          </span>
        </div>
        <div className="flex flex-col justify-between px-5 md:flex-row">
          <span className="text-base text-peb-gray-3">CPF</span>
          <span className="text-base text-peb-black">{cpf}</span>
        </div>
      </div>
      <Link
        href="https://whitebook.pebmed.com.br/planos"
        className="text-peb-primary text-sm font-bold mb-6"
      >
        Gerenciar assinatura
      </Link>
      <Link
        href="https://whitebook.pebmed.com.br/planos"
        className="w-full h-[50px] flex items-center justify-center bg-peb-primary font-bold border-[1px] text-white text-base rounded-[25px] transition-colors duration-300 ease-in-out hover:bg-white hover:text-peb-primary hover:border-peb-primary"
      >
        IR PARA A HOME
      </Link>
    </div>
  );
}
