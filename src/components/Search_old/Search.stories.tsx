import { storiesOf } from "@storybook/react";
import Search from "./Search";

storiesOf("src/components/Search", module).add("Demo", () => (
  <Search
    onEnter={(searchValue = "null") => {
      console.log("searching", searchValue);
    }}
  />
));
