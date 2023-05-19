import {
  formatCardNumber,
  formatCPF,
  formatExpirationDate,
} from "~/utils/masks";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  errors?: any;
  register?: any;
  mask?: boolean;
  maxLength?: number;
}

export default function Input({
  errors,
  register,
  label,
  name,
  placeholder,
  mask,
  maxLength,
}: Props) {
  function applyMask(input: any) {
    switch (name) {
      case "cardNumber":
        input.value = formatCardNumber(input.value);
        break;
      case "expirationDate":
        input.value = formatExpirationDate(input.value);
        break;
      case "cpf":
        input.value = formatCPF(input.value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="relative flex flex-col gap-1 w-full transition-colors duration-300 ease-in-out">
      <label
        htmlFor={name}
        className={`${label ? "block" : "hidden"} ${
          errors ? "text-peb-red" : "text-peb-gray-4"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        placeholder={placeholder ?? ""}
        {...register(name)}
        className={`${errors && "border-b-peb-red placeholder:text-peb-red"}`}
        onInput={mask ? (e: any) => applyMask(e.target) : null}
        maxLength={maxLength ?? null}
      />
      {errors && (
        <p className="absolute -bottom-4 text-sm text-peb-red tracking-[-0.02em]">
          {errors}
        </p>
      )}
    </div>
  );
}
