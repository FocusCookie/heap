const uniqueId = (length = 16): string => {
  return `ID_${parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  )}`;
};

export default uniqueId;
