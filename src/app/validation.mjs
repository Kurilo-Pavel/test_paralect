const validate = (a, b, mark) => {
  if (mark) {
    return (
      a === "" ||
      a * 1 >= 0 &&
      a * 1 <= 10 &&
      (b === "" || a * 1 < b * 1) ? null : "Invalid number"
    );
  }else{
    return (
      a === "" ||
      a * 1 >= 0 &&
      a * 1 <= 10 &&
      (b === "" || a * 1 > b * 1) ? null : "Invalid number"
    );
  }
};

export default validate;