const parseOnlyTextMultipartFormdata = () => {
  // multipart/formdata or formdata is same. To parse it
  // you need to use multer or similar library which will parse multipart-formdata in req.body.file and other remaining data in req.body
  const multer = require("multer");
  const upload = multer();
  return upload.none();
};

export default parseOnlyTextMultipartFormdata;
