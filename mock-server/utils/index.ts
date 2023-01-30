export const getShortId = () => {
  const shortid = require("shortid");
  return shortid.generate();
};
