import { FormGroup, styled } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "src/components/Input";
import light from "src/theme/data/light";
import { getNanoID } from "src/utils";

export const StyledProgramTable = styled("div")`
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    vertical-align: middle;
    margin-top: 8px;
  }

  table td,
  table th {
    /* border: 1px solid #ddd; */
    padding: 8px;
    vertical-align: middle;
  }

  table th:first-child {
    border-top-left-radius: 4px;
  }

  table th:last-child {
    border-top-right-radius: 4px;
  }

  table tr:nth-child(even) {
    /* background-color: #f2f2f2; */
  }

  table tr:hover {
    background-color: #f1f1f1;
  }

  table th {
    text-align: left;
    background-color: ${light.palette.primary.dark};
    color: white;
  }

  input,
  textarea {
    width: 100%;
    height: 100%;
  }
`;

function VariableInputTable({ setFieldValue, name, errors, variables }: any) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!variables) return;
    const newItems = variables.reduce((acc, item) => {
      const tid = getNanoID();
      acc[`${tid}`] = {
        tid,
        variable: item,
        value: "",
      };
      return acc;
    }, {});
    setItems(newItems);
  }, [variables]);

  useEffect(() => {
    if (!items) return;
    const vars = Object.values(items).reduce((acc, item) => {
      acc[item.variable] = item.value;
      return acc;
    }, {});
    setFieldValue(name, vars);
  }, [items]);

  //   const selecteds = Object.values(items).map((item) => item.value);

  return (
    <StyledProgramTable>
      <table>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items
            ? Object.values(items)?.map((item, index) => {
                console.log("var", item);
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <FormGroup className="input-holder">
                        <Input
                          type="text"
                          placeholder=""
                          size="small"
                          fullWidth
                          value={item.variable}
                          disabled
                          onChange={(e: any) => {
                            setItems((prev) => ({
                              ...prev,
                              [`${item.tid}`]: {
                                ...prev[`${item.tid}`],
                                value: e.target.value,
                              },
                            }));
                          }}
                          //       error={Boolean(errors.name)}
                          //       errors={errors}
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup className="input-holder">
                        <Input
                          type="text"
                          placeholder=""
                          size="small"
                          fullWidth
                          placeholder="Enter value"
                          value={item.value}
                          onChange={(e: any) => {
                            setItems((prev) => ({
                              ...prev,
                              [`${item.tid}`]: {
                                ...prev[`${item.tid}`],
                                value: e.target.value,
                              },
                            }));
                          }}
                          //       error={Boolean(errors.name)}
                          //       errors={errors}
                        />
                      </FormGroup>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </StyledProgramTable>
  );
}

export default VariableInputTable;
