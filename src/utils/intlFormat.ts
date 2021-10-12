export function numberFormat(value: number) {
  const formatedNumber = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formatedNumber;
}
