const romanValues = new Map([
  ["M", 1000],
  ["D", 500],
  ["C", 100],
  ["L", 50],
  ["X", 10],
  ["V", 5],
  ["I", 1]
]);

const calculateKeys = values => {
  const keyArray = [];
  values.forEach(( value, key ) => keyArray.push([ key, value ]));

  return keyArray;
}

export default (romanNumerals, reduce = false) => {
  let total = 0;

  if (typeof romanNumerals === "string") { // Convert to number.
    const parts = [];

    // Break the roman numeral string into parts and convert them to integers.
    for (let i = romanNumerals.length, part = 0, value = 0, last = 0; i; i--, last = value) {
      if (value = romanValues.get(romanNumerals[i - 1])) {
        part += (last > value) ? value * -1 : value;
      } else return "Invalid";

      if (last < part || !(i - 1)) part = parts.push(part) - parts.length;
    }

    // Add it all up.
    total = parts.reduce((a,b) => a + b, 0);

    if (!reduce) return total;
  } else if (typeof romanNumerals === "number") { // Convert to roman numeral string.
    total = romanNumerals;
  }

  let sum = 0;
  let optimize = "";

  // Produces an array for a more effecient loop.
  const romanArray = calculateKeys(romanValues);

  for (let i = 0; i < romanArray.length; i++) {
    let amount = (total - sum) / romanArray[i][1];

    // Stop when no amount is remaining.
    if (amount <= 0) break;

    // Only allow the roman numeral character to be used 3 times in a row.
    amount = amount < 3 ? Math.trunc(amount) : 3;

    sum += romanArray[i][1] * amount;
    optimize += romanArray[i][0].repeat(amount);

    // This loop is for reduces characters, effecient lookup to the roman numeral and lower only.
    for (let j = i + 1; j < romanArray.length; j++) {
      // You can only minus roman numerals that are 2 indexes above.
      if (j - i > 2) break;
      
      // If a roman numeral index is even, you can not minus a negative index roman numeral, for example VX should always be just V.
      if (!(i % 2) && j % 2) continue;

      const newValue = romanArray[i][1] - romanArray[j][1];
      // If the total value is larger then it should be, don't.
      if (sum + newValue > total) continue;
      sum += newValue;
      optimize += romanArray[j][0] + romanArray[i][0];
    }
  }

  return optimize || "No Output";
};
