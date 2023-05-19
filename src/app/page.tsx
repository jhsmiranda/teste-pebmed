"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import * as yup from "yup";

import { validateCPF, ValidateSuperiorDateLastMonth } from "~/utils/validates";
import { formatCurrency } from "~/utils/fomatCurrency";
import CardOffer from "~/components/CardOffer";
import { Http } from "~/services/axiosClient";
import Input from "~/components/Input";

import AmericanExpress from "../../public/assets/americanexpress.svg";
import DinnersClub from "../../public/assets/dinnersclub.svg";
import Mastercard from "../../public/assets/mastercard.svg";
import Iugu from "../../public/assets/iugu.svg";
import Help from "../../public/assets/help.svg";
import Visa from "../../public/assets/visa.svg";
import Elo from "../../public/assets/elo.svg";

interface FormData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
  cpf: string;
  coupon: string;
  installments: string;
}

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

  const schema = yup.object().shape({
    cardNumber: yup
      .string()
      .required("Campo obrigatório")
      .min(19, "Número do cartão inválido"),
    expirationDate: yup
      .string()
      .required("Campo obrigatório")
      .min(5, "Validade inválida")
      .test("teste-validade", "Validade inválida", (date) => {
        return ValidateSuperiorDateLastMonth(date);
      }),
    cvv: yup.string().required("Campo obrigatório").min(3, "CVV inválido"),
    cardHolderName: yup.string().required("Campo obrigatório"),
    cpf: yup
      .string()
      .required("Campo obrigatório")
      .min(14, "CPF inválido")
      .test("teste-cpf", "CPF inválido", (cpf) => {
        return validateCPF(cpf);
      }),
    coupon: yup.string(),
    installments: yup
      .string()
      .required("Campo obrigatório")
      .notOneOf(["Selecionar"], "Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const params = {
      couponCode: data.coupon !== "" ? data.coupon : null,
      creditCardCPF: data.cpf.replace(/[^\d]+/g, ""),
      creditCardCVV: data.cvv,
      creditCardExpirationDate: data.expirationDate,
      creditCardHolder: data.cardHolderName,
      creditCardNumber: data.cardNumber.replace(/[^\d]+/g, ""),
      gateway: "iugu",
      installments: parseInt(data.installments, 10),
      offerId: offers.filter(
        (offer) => offer.installments === parseInt(data.installments, 10)
      )[0].id,
      userId: 1,
    };

    try {
      setLoading(true);
      const res = await Http().post("/subscription", params);
      console.log("ressssss", res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  console.log(watch("cardNumber"));

  return (
    <div className="Container w-full flexjustify-center px-[30px] lg:px-[68px] flex justify-center">
      <div
        className={`${
          loading ? "hidden" : "flex"
        } Wrapper max-w-[1140px] w-full lg:px-[100px] py-10 flex-col-reverse gap-[30px] lg:flex-row lg:justify-between`}
      >
        <div className="Form flex flex-col gap-[30px] max-w-full lg:max-w-[330px]">
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
          <form
            className="flex flex-col gap-[30px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="cardNumber"
              label="Número do cartão"
              placeholder="0000 0000 0000 0000"
              register={register}
              errors={errors.cardNumber?.message}
              maxLength={19}
              mask
            />
            <div className="flex gap-[50px]">
              <Input
                name="expirationDate"
                label="Validade"
                placeholder="MM/AA"
                register={register}
                errors={errors.expirationDate?.message}
                maxLength={5}
                mask
              />
              <Input
                name="cvv"
                label="CVV"
                placeholder="000"
                register={register}
                errors={errors.cvv?.message}
                maxLength={3}
              />
            </div>
            <Input
              name="cardHolderName"
              label="Nome impresso no cartão"
              placeholder="Seu nome"
              register={register}
              errors={errors.cardHolderName?.message}
            />
            <Input
              name="cpf"
              label="CPF"
              placeholder="000.000.000-00"
              register={register}
              errors={errors.cpf?.message}
              maxLength={14}
              mask
            />
            <Input
              name="coupon"
              label="Cupom"
              placeholder="Insira aqui"
              register={register}
              errors={errors.coupon?.message}
            />
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="installmentsr"
                className={`${
                  errors.installments ? "text-peb-red" : "text-peb-gray-4"
                }`}
              >
                Número de parcelas
              </label>
              <select
                id="installments"
                {...register("installments")}
                className={`focus:text-peb-black cursor-pointer ${
                  errors.installments &&
                  "border-b-peb-red placeholder:text-peb-red text-peb-red"
                }`}
              >
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
              {errors.installments && (
                <p className="absolute -bottom-4 text-sm text-peb-red tracking-[-0.02em]">
                  {errors.installments?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full h-[50px] flex items-center justify-center bg-peb-primary border-[1px] text-white text-base rounded-[25px] transition-colors duration-300 ease-in-out hover:bg-white hover:text-peb-primary hover:border-peb-primary"
            >
              Finalizar Pagamento
            </button>
          </form>
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
