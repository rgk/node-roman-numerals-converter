const values = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1
};

// Produces an array for a more effecient loop.
const romanArray = Object.entries(values);

export default (romanNumerals, reduce = false) => {
  let total = 0;

  if (typeof romanNumerals === "string") { // Convert to number.
    const parts = [];

    // Break the roman numeral string into parts and convert them to integers.
    for (let i = romanNumerals.length, part = 0, value = 0, last = 0; i; i--, last = value) {
      if (value = values[romanNumerals[i - 1]]) {
        part += last > value ? ~value + 1 : value;
      } else return "Invalid";

      if (last < part || !(i - 1)) part = parts.push(part) - parts.length;
    }

    // Add it all up and return if reduce is not set.
    if ((total = parts.reduce((a,b) => a + b)) && !reduce) return total;
  // Convert to roman numeral string.
  } else if (typeof romanNumerals === "number") total = romanNumerals;

  let optimize = "";

  for (let i = romanArray.findIndex(element => element[1] / 2 < total), sum = 0, amount = 0, len = (~i) ? romanArray.length : i; i < len; i++) {
    // Stop when no amount is remaining.
    if (!(amount = (total - sum) / romanArray[i][1])) break;

    // Only allow the roman numeral character to be used 3 times in a row, no float needed.
    optimize += romanArray[i][0].repeat(amount = Math.min(Math.trunc(amount), 3));
    sum += romanArray[i][1] * amount;

    // This loop is for reducing characters, effecient lookup to the roman numeral and next 2 lower values.
    for (let j = i + 1, value, len = Math.min(j + 3, romanArray.length); j < len; j++) {      
      // If a roman numeral index is even, you can not minus a odd index roman numeral, for example VX should always be just V.
      // Uses bitwise operator & as no roman numeral can be bigger then a 32bit integer and its faster.
      // If the total value is larger then it should be, don't.
      if ((!(i & 1) && j & 1) || (value = romanArray[i][1] - romanArray[j][1]) + sum > total) continue;

      sum += value;
      optimize += romanArray[j][0] + romanArray[i][0];
    }
  }

  return optimize || "No Output";
};
