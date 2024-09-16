export function formatAmountWithCommas(amount: number | string) {
  let strAmount = typeof amount === "number" ? amount.toString() : amount;
  return strAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatNumberInFours(amount: number | string) {
  let strNumber = typeof amount === "number" ? amount.toString() : amount;
  return strNumber.replace(/(\d)(?=(\d{4})+(?!\d))/g, "$1 ");
}

export function formatNumberWithThreesAndFours(amount: string): string {
  const strAmount = amount;

  const firstThreeDigits = strAmount.slice(0, 3);
  const restOfDigits = strAmount.slice(3);
  const groupedRest = restOfDigits.match(/.{1,4}/g)?.join(" ") || "";

  return `${firstThreeDigits} ${groupedRest}`.trim();
}

export function unformatNumberWithThreesAndFours(
  formattedNumber: string
): string {
  const trimmedNumber = formattedNumber.replace(/\s+/g, "");
  return trimmedNumber;
}
