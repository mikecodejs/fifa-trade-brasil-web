export const currency = (value: number) =>
  value.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  });

export const sanitizeString = (str: string) => str.trim().toLowerCase();

export const converterMethodPayment = (str: string): string => {
  const methods: Record<string, unknown> = {
    credit_card: "Cartão de crédito",
  };

  return methods[str] as string;
};

export const converterDatePayment = (str: string): string => {
  const [year, mouth] = str.split("-");

  return `${mouth}-${year}`;
};

export const converterName = (str: string): string => {
  const fullName = sanitizeString(str);

  const firstName = fullName.split(" ").at(0) || "";
  const lastName = fullName.split(" ").at(-1) || "";

  const name = firstName[0].toUpperCase() + firstName.substring(1);
  const last = lastName[0].toUpperCase() + lastName.substring(1);

  return `${name} ${last}`;
};
