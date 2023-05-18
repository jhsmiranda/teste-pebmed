"use client";

import { useCallback, useEffect, useState } from "react";
import { Http } from "~/services/axiosClient";
import CardOffer from "~/components/CardOffer";
import Image from "next/image";

import AmericanExpress from "../../public/assets/americanexpress.svg";
import DinnersClub from "../../public/assets/dinnersclub.svg";
import Mastercard from "../../public/assets/mastercard.svg";
import Iugu from "../../public/assets/iugu.svg";
import Visa from "../../public/assets/visa.svg";
import Elo from "../../public/assets/elo.svg";
import Help from "../../public/assets/help.svg";
import { formatCurrency } from "~/utils/fomatCurrency";

export default function Home() {
  const [offers, setOffers] = useState<OfferProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cards = [Mastercard, DinnersClub, AmericanExpress, Visa, Elo];

  const installments = offers.map((offer) => {
    return {
      id: offer.id,
      value: offer.installments,
      label: `${offer.installments}x de ${formatCurrency(
        offer.fullPrice - offer.discountAmmount
      )}`,
    };
  });

  const getOffers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Http().get("/offer");
      setOffers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOffers();
  }, [getOffers]);

  return (
    <div className="Container w-full flexjustify-center px-[30px] lg:px-[68px] flex justify-center">
      <div
        className={`${
          loading ? "hidden" : "flex"
        } Wrapper max-w-[1140px] w-full lg:px-[100px] py-10 flex-col-reverse gap-[30px] lg:flex-row lg:justify-between`}
      >
        <div className="Form flex flex-col gap-[30px]  max-w-full lg:max-w-[330px]">
          <div className="Title">
            <span className="block mb-[9px] text-xl tracking-[-0.02em] text-peb-black">
              Estamos quase lá!
            </span>
            <span className="text-lg tracking-[-0.02em] text-peb-black">
              Insira seus dados de pagamento abaixo:
            </span>
          </div>
          <div className="Conteiner-cards flex flex-col items-center gap-[13.88px]">
            <div className="flex gap-[13.11px]">
              {cards.map((card, index) => (
                <Image key={index} src={card} alt="Icon card" />
              ))}
            </div>
            <span className="flex gap-[7px] text-xs text-peb-gray-2">
              Pagamentos por <Image src={Iugu} alt="Iugu logo" />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="card-number">Número do cartão</label>
            <input
              type="text"
              id="card-number"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="flex gap-[50px]">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="card-number">Validade</label>
              <input type="text" id="card-number" placeholder="MM/AA" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="card-number">CVV</label>
              <input type="text" id="card-number" placeholder="000" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="card-number">Nome impresso no cartão</label>
            <input type="text" id="card-number" placeholder="Seu nome" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="card-number">CPF</label>
            <input type="text" id="card-number" placeholder="000.000.000-00" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="card-number">Cupom</label>
            <input type="text" id="card-number" placeholder="Insira aqui" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="card-number">Número de parcelas</label>
            <select>
              <option hidden defaultValue="">
                Selecionar
              </option>
              {installments
                .sort((a, b) => a.value - b.value)
                .map((installment) => {
                  return (
                    <option value={installment.value} key={installment.id}>
                      {installment.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <button className="w-full h-[50px] flex items-center justify-center bg-peb-primary text-white text-base rounded-[25px]">
            Finalizar Pagamento
          </button>
        </div>

        <div className="Plans flex flex-col gap-[30px] lg:min-w-[330px]">
          <div className="Title">
            <span className="block mb-[9px] text-xl tracking-[-0.02em] text-peb-black">
              Confira o seu plano:
            </span>
            <span className="inline-block py-1 px-3 text-sm border-[1px] border-peb-gray-1 rounded-full h-6 text-peb-black">
              fulano@ciclano.com.br
            </span>
          </div>
          <div className="Cards flex flex-col gap-4">
            {offers.map((offer: any) => {
              return <CardOffer key={offer.id} offer={offer}></CardOffer>;
            })}
          </div>
          <div className="w-full flex justify-center gap-3 cursor-pointer">
            <span className="text-sm">Sobre a cobrança</span>
            <Image src={Help} alt="help button" />
          </div>
        </div>
      </div>
    </div>
  );
}
