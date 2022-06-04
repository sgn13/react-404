export const printFormData = (formData) => {
  for (var pair of formData.entries()) {
    console.info(pair[0] + ' = ' + pair[1]);
  }
};
