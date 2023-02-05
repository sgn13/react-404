import { directories } from "../constants/directories";

export const parseFormdata = () => {
  // multipart/formdata or formdata is same. To parse it
  // you need to use multer or similar library which will parse multipart-formdata in req.body.file and other remaining data in req.body
  const multer = require("multer");
  const upload = multer();
  return upload;
};

//  setup for file upload in private server
export const uploadFileToLocalStorage = (dest: string) => {
  const multer = require("multer");
  const path = require("path");

  const storageConfig = multer.diskStorage({
    destination: function (req: any, file: any, cb: Function) {
      console.log("filename", file?.originalname);
      cb(null, `${dest}`);
    },
    filename: function (req: any, file: any, cb: Function) {
      // const filename = `${req.params.userId}${path.extname(file.originalname)}`;
      const filename = `${new Date().getTime()}${path.extname(file.originalname)}`;
      req.uploadedFilename = filename;
      cb(null, filename); // renaming the imagefile before saving
    },
  });

  const limitConfig = 1024 * 1024 * 5; //we are allowing only 5 MB files
  const fileFilterConfig = (req: any, file: any, cb: Function) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      // To reject this file pass `false`, like so:
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storageConfig,
    // limits: limitConfig,
    // fileFilter: fileFilterConfig,
  });
  return upload;
  // can receive either single or multiple files depending on the options used
  // upload.single('formName') is middleware offered by the multer for single file upload
  // upload.array('formName') is middleware offered by the multer for multiple files upload
  // THE MIDDLEWARE adds a body object and a file or files object to the request object.
};
