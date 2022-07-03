const getFileExt = (fileString: any) => {
  const splittedFileIcon = String(fileString).split(".");

  if (splittedFileIcon.length) {
    return splittedFileIcon[splittedFileIcon.length - 1];
  }
  return undefined;
};

export default getFileExt;
