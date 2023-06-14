// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const pathList = [
  "app",
  "containers",
  "components",
  "configuration",
  "constants",
  "pages",
  "store",
  "utils",
  "theme",
  "assets",
  "mock",
  "hoc",
  "lib",
  "hooks",
  "routes",
  "db",
  "widgets",
  "src",
];

// type AliasType = {
//   [key: string]: string | undefined;
// };

const alias = {};

pathList.forEach((item) => {
  alias[`${item}`] = path.resolve(process.cwd(), item);
});

module.exports = alias;
