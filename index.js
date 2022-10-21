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

  if (typeof romanNumerals === "string") { // Convert to number.
    const parts = [];

    // Break the roman numeral string into parts and convert them to integers.
    for (let i = romanNumerals.length, part = 0, value = 0, last = 0; i; i--, last = value) {
      if (value = romanValues.get(romanNumerals[i - 1])) {
        part += last > value ? ~value + 1 : value;
      } else return "Invalid";

      if (last < part || !(i - 1)) part = parts.push(part) - parts.length;
    }

    // Add it all up.
    total = parts.reduce((a,b) => a + b);

    if (!reduce) return total;
  // Convert to roman numeral string.
  } else if (typeof romanNumerals === "number") total = romanNumerals;

  let optimize = "";

  // Produces an array for a more effecient loop.
  const romanArray = Array.from(romanValues.entries());

  for (let i = 0, sum = 0; i < romanArray.length; i++) {
    let amount = (total - sum) / romanArray[i][1];

    // Stop when no amount is remaining.
    if (amount <= 0) break;

    // Only allow the roman numeral character to be used 3 times in a row, no floating needed.
    amount = Math.trunc(Math.min(amount, 3));

    sum += romanArray[i][1] * amount;
    optimize += romanArray[i][0].repeat(amount);

    // This loop is for reduces characters, effecient lookup to the roman numeral and next 2 lower values.
    for (let j = i + 1, len = Math.max(j + 2, romanArray.length); j < len; j++) {      
      // If a roman numeral index is even, you can not minus a negative index roman numeral, for example VX should always be just V.
      // Uses bitwise operator & as no roman numeral can be bigger then a 32bit integer and its faster.
      if (!(i & 1) && j & 1) continue;

      const newValue = romanArray[i][1] - romanArray[j][1];
      // If the total value is larger then it should be, don't.
      if (sum + newValue > total) continue;
      sum += newValue;
      optimize += romanArray[j][0] + romanArray[i][0];
    }
  }

  return optimize || "No Output";
};
