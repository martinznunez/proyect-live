export const formatPricesAR = (value: number) => {
  const formatter = Intl.NumberFormat("es-AR", {
    style: "currency",
    minimumIntegerDigits: 2,
    currency: "ARS",
  });

  return formatter.format(value);
};
