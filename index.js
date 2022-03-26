const romanValues = new Map([
  ["M", 1000],
  ["D", 500],
  ["C", 100],
  ["L", 50],
  ["X", 10],
  ["V", 5],
  ["I", 1]
]);

export default (romanNumerals, reduce = false) => {
  let total = 0;

  if (typeof romanNumerals === "string") {
    const parts = [];

    for (let i = romanNumerals.length, part = 0, value = 0, last = 0; i; i--, last = value) {
      if (value = romanValues.get(romanNumerals[i - 1])) {
        part += (last > value) ? value * -1 : value;
      } else return "Invalid";

      if (last < part || !(i - 1)) {
        part = parts.push(part) - parts.length;
      }
    }

    total = parts.reduce((a,b) => a + b, 0);

    if (!reduce) return total;
  } else if (typeof romanNumerals === "number") {
    total = romanNumerals;
  }

  let sum = 0;
  let optimize = "";

  romanValues.forEach((value, key, map) => {
    let amount = (total - sum) / value;
    if (amount) {
      amount = amount < 3 ? amount : 3;
      sum += value * Math.trunc(amount);
      optimize += key.repeat(amount);

      romanValues.forEach((valueMinus, keyMinus, mapMinus) => {
        const newValue = value - valueMinus;
        if (value <= valueMinus || newValue === valueMinus) return;

        if (sum + newValue <= total) {
          sum += newValue;
          optimize += keyMinus + key;
        }
      });
    }
  });

  return optimize;
};
