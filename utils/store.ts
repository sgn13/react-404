import { defaultQuery } from "constants/query";

export const updateState = ({ state, local, action, entity, key = "id" }: any) => {
  const oldData = local.find((item: any) => item[`${key}`] === action.payload[`${key}`]);
  const indexOfOldData = local.indexOf(oldData);
  const newData = {
    ...oldData,
    ...action.payload,
  };
  const excludedData = [...local.filter((item: any) => item !== oldData)];
  return {
    ...state,
    [`${entity}`]: [
      ...excludedData.slice(0, indexOfOldData),
      newData,
      ...excludedData.slice(indexOfOldData),
    ],
  };
};

export const removeState = ({ state, local, action, entity, key = "id" }: any) => {
  return {
    ...state,
    [`${entity}`]: local.filter((item: any) => item[`${key}`] !== action.payload[`${key}`]),
  };
};

export const createState = ({ state, local, action, entity }: any) => {
  return { ...state, [`${entity}`]: [action.payload, ...local] };
};

export const setSearchState = ({ state, action, local, entity }: any) => ({
  ...state,
  [`${entity}`]: action.payload,
  temp: { [`${entity}`]: local, metadata: state.metadata },
});

export const resetSearchState = ({ state }: any) => {
  return { ...state, ...state.temp, temp: undefined };
};

export const formDataGenerator = ({ data }: any) => {
  const formData = new FormData();

  Object.entries(data).forEach((item: { [key: string] }) => {
    if (item[0]) formData.append(`${item[0]}`, item[1]);
  });

  return formData;
};

export const generateMeta = ({ data, query, results }: any) => {
  let totalCount = data.count;
  const { recordsFiltered } = data;
  if (results && results.length) {
    const firstElement = results[0];
    if (firstElement && firstElement.totalFilteredCount) {
      totalCount = firstElement.totalFilteredCount;
    }
  }

  if (recordsFiltered === 0 || recordsFiltered) {
    totalCount = recordsFiltered;
  }

  return {
    totalCount,
    page: query.page,
    perPage: query.perPage,
    totalPage: query.perPage ? Math.ceil(totalCount / query.perPage) : 1,
  };
};

const getColumItem = ({ i, item, searchable = true, orderable = true, regex = false }: any) =>
  `&columns%5B${i}%5D%5Bdata%5D=${item}&columns%5B${i}%5D%5Bname%5D=&columns%5B${i}%5D%5Bsearchable%5D=${searchable}&columns%5B${i}%5D%5Borderable%5D=${orderable}&columns%5B${i}%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B${i}%5D%5Bsearch%5D%5Bregex%5D=${regex}`;

export const generateQuery = ({
  url,
  query = defaultQuery,
  length = true,
  useColumn = true,
  columns = [],
  searchable = [],
  datatables = true,
}: any) => {
  let columnGeneration = "";
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { order, order_by, page, perPage, search, ...otherQueries }: any = query;

  let finalQuery: any = {
    order,
    order_by,
    search,
    start: (page - 1) * perPage || 0,
    ...otherQueries,
  };

  if (length) {
    finalQuery = { ...finalQuery, length: perPage || 10 };
  }

  if (datatables) {
    finalQuery = { ...finalQuery, format: "datatables" };
  }

  if (columns.length) {
    columnGeneration = ``;

    // searchable.length
    //   ? columns.map((column, i) => {
    //       columnGeneration =
    //         columnGeneration +
    //         getColumItem({
    //           i: i,
    //           item: column,
    //           searchable: searchable.includes(column),
    //         });
    //     })
    //   : columns.map((column, i) => {
    //       columnGeneration = columnGeneration + getColumItem({ i: i, item: column });
    //     });
  }

  let link = `${url}?${useColumn ? columnGeneration : ""}`;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  finalQuery &&
    Object.entries(finalQuery).forEach((item) => {
      link += item[1] || item[1] === false || item[1] === 0 ? `&${item[0]}=${item[1]}` : "";
    });

  return link;
};

// export const generateDataToUpload = (values: any) => {
//   const files = {};
//   let newUpload = 0;

//   if (values.files) {
//     Object.keys(values.files).map((file) => {
//       if (values.files[file]) {
//         if (values.files[file].length && Array.isArray(values.files[file])) {
//           // eslint-disable-next-line prefer-destructuring
//           files[file] = values.files[file][0];
//           newUpload += 1;
//         }
//       } else {
//         files[file] = "";
//       }
//     });
//   }

//   return { files, newUpload };
// };
