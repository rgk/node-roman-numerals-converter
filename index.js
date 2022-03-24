const romanValues = new Map([
  ["I", 1],
  ["V", 5],
  ["X", 10],
  ["L", 50],
  ["C", 100],
  ["D", 500],
  ["M", 1000]
]);

export default (romanNumerals, reduce = false) => {
  if (typeof romanNumerals !== "string") return "Must be a string.";

  const parts = [];

  for (let i = romanNumerals.length, part = 0, value = 0, last = 0; i; i--, last = value) {
    if (value = romanValues.get(romanNumerals[i - 1])) {
      part += (last > value) ? value * -1 : value;
    } else return "Invalid";

    if (last < part || !(i - 1)) {
      part = parts.push(part) - parts.length;
    }
  }

  const total = parts.reduce((a,b) => a + b, 0);

  if (!reduce) return total;

  const digits = Math.ceil(Math.log10(total + 1));

  const numbers = [];

  for (let i = 0, divisible = 1; i < digits; i++) {
    numbers.push(Math.trunc(total / divisible % 10));
    divisible = divisible * 10;
  }

  return numbers;
};
