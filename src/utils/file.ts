export const readFileContent = (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

const fileToBlob = async (file) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
