export const getFileExt = (fileString) => {
  const splittedFileIcon = String(fileString).split('.');

  if (splittedFileIcon.length) {
    return splittedFileIcon[splittedFileIcon.length - 1];
  }
};
