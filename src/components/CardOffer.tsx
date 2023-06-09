import { formatCurrency } from "~/utils/fomatCurrency";

interface Props {
  offer: OfferProps;
  key?: number;
  installmentSelected?: string;
  setInstallmentSelected?: any;
}

export default function CardOffer({
  offer,
  installmentSelected,
  setInstallmentSelected,
}: Props) {
  return (
    <div>
      <input
        type="radio"
        id={offer.installments.toString()}
        name="fav_language"
        value={offer.installments}
        onChange={(e) => setInstallmentSelected(e.target.value)}
        className="hidden"
      />
      <label
        htmlFor={offer.installments.toString()}
        className="Card border-[1px] rounded-[15px] border-peb-primary p-5 flex w-full justify-between cursor-pointer"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-base text-peb-primary font-bold">
              {`${offer.title} | ${offer.description}`}
            </span>
            <span className="text-sm text-peb-primary">
              {`De ${formatCurrency(offer.fullPrice)} | Por ${formatCurrency(
                offer.fullPrice - offer.discountAmmount
              )}`}
            </span>
            <span className="text-xs text-peb-secondary">
              {`${offer.installments}x de ${formatCurrency(
                offer.fullPrice - offer.discountAmmount
              )}/${offer.periodLabel}`}
            </span>
          </div>
          <div className="self-start sm:self-center">
            <span className="bg-peb-secondary text-white text-xs h-4 w-10 flex items-center justify-center rounded-[9px]">
              {`-${offer.discountPercentage * 100}%`}
            </span>
          </div>
        </div>
        <div
          className={`self-center w-4 h-4 rounded-full border-2 flex justify-center items-center ${
            installmentSelected === offer.installments.toString()
              ? "border-peb-gray-3"
              : "border-peb-gray-1"
          }`}
        >
          <div
            className={`${
              installmentSelected === offer.installments.toString()
                ? "block"
                : "hidden"
            } w-2 h-2 bg-peb-primary rounded-full`}
          ></div>
        </div>
      </label>
    </div>
  );
}
