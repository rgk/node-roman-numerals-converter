const romanValues = new Map([
  ["M", 1000],
  ["D", 500],
  ["C", 100],
  ["L", 50],
  ["X", 10],
  ["V", 5],
  ["I", 1]
]);

const calculateKey = () => {
  const keyArray = [];
  romanValues.forEach(( value, key ) => keyArray.push([ key, value ]));

  return keyArray;
}

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
  let location = 0;

  for (const [key, value] of romanValues) {
    let amount = (total - sum) / value;

    if (amount > 0) {
      location++;

      amount = amount < 3 ? Math.trunc(amount) : 3;

      sum += value * amount;
      optimize += key.repeat(amount);

      let distance = 0;
      for (const [keyMinus, valueMinus] of romanValues) {
        distance++;

        if (location < distance - 2) break;
        if (location >= distance || (location % 2 != 0 && distance % 2 == 0)) continue;

        const newValue = value - valueMinus;
        if (sum + newValue <= total) {
          sum += newValue;
          optimize += keyMinus + key;
        }
      }
    } else break;
  }

  return optimize ? optimize : "No Output";
};
