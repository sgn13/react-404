export const getShortId = () => {
  try {
    const shortid = require("shortid");
    return shortid.generate();
  } catch (err) {
    throw err;
  }
};

export const deleteFile = (pathname = "") => {
  const fs = require("fs");
  // absolute path
  // const path = require("path");
  // const absolutePath = path.join(__dirname, pathname);

  // relative Path
  fs.unlink(pathname, (err: Error) => {
    if (err) {
      console.log(err?.message);
    }
  });
  //file removed
};
