const romanValues = new Map([
  ["I", 1],
  ["V", 5],
  ["X", 10],
  ["L", 50],
  ["C", 100],
  ["D", 500],
  ["M", 1000]
]);

export default (romanText) => {
  if (typeof romanText !== "string") return "Must be a string.";

  const parts = [];

  for (let i = romanText.length, part = 0, last = 0, value = 0; i; i--) {
    if (value = romanValues.get(romanText[i - 1])) {
      if (last > value) {
        part -= value;
      } else {
        part += value;
      }

      last = value;
    }

    if (last < part || !(i - 1)) {
      parts.push(part);
      part = 0;
    }
  }

  return parts.reduce((a,b) => a + b, 0);
};
