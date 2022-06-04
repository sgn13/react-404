type QueryType = { [key: string]: string | number };

export const defaultQuery: QueryType = {
  order: "DESC",
  order_by: "id",
  search: "",
  page: 1,
  perPage: 10,
};

export const host = "http://";
