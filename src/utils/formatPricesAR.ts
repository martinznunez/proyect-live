export const formatPricesAR = (value: number) => {
  const formatter = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return formatter.format(value).replace(/\u00A0/g, "");
};
