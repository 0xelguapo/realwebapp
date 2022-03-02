const prepareArray = (arr) => {
  return arr.map((el) => {
    if (typeof el === "object" && el !== null) {
      return JSON.stringify(el);
    } else {
      return el;
    }
  });
};

const convertJSON = (arr) => {
  return arr.map((el) => {
    return JSON.parse(el);
  });
};

const compareArrays = (arr1, arr2) => {
  const currentArray = [...prepareArray(arr1)];
  const deletedItems = [...prepareArray(arr2)];
  const compared = currentArray.filter((el) => deletedItems.indexOf(el) === -1);
  return convertJSON(compared);
};

export { compareArrays };


//two arrays with objects
//traverse through both arrays
//go through each object, grab the ID
//compare IDs from both arrays
//remove the duplicates 