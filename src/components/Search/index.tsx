import searchIcon from "src/assets/icons/search.svg";
import styled from "src/lib/mui/styled";
import debounce from "src/utils/debounce";

const Input = styled("input")`
  height: 30px;
  border-radius: 2px;
  padding: 6px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  /* margin-left: 6px; */
  margin-right: 6px;
  width: 100%;
`;

function index({ searchField, onSearch }) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        paddingRight: 16,
      }}
    >
      <img
        style={{
          position: "absolute",
          left: 8,
          top: "25%",
        }}
        src={searchIcon}
        alt="search"
        width={18}
        height={18}
      />
      <Input
        type="search"
        style={{ margin: "5px auto", paddingLeft: 32 }}
        // onKeyDown={(e: any) => handleEnterPress(e, onEnter, value)}
        onChange={debounce((e) => {
          const { value } = e.target;
          if (value) {
            onSearch({
              query: { field: searchField, search: value },
            });
          } else {
            onSearch({});
          }
        }, 400)}
      />
    </div>
  );
}

export default index;
