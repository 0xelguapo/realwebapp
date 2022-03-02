const prepareArray = (arr) => {
  return arr.map((el) => {
    if (typeof el === "object" && el !== null) {
      return JSON.stringify(el);
    } else {
      return el;
    }
  });
};

