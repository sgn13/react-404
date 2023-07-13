import { FormGroup, styled } from "@mui/material";
import { useState } from "react";
import Input from "src/components/Input";
import light from "src/theme/data/light";
import { getNanoID } from "src/utils";

export const StyledProgramTable = styled("div")`
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    vertical-align: middle;
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

function CustomDynamicTable() {
  const tid = getNanoID();

  const [items, setItems] = useState({
    [`${tid}`]: {
      tid,
      package: "",
      version: "",
    },
  });

  // useEffect(() => {
  //   if (!formData) return;
  //   fetchExamCenterInstitutions({ query: { "exam-center-institution": formData?.id } });
  // }, [formData]);

  // useEffect(() => {
  //   if (!formData || !examcenterinstitutions || !examcenterinstitutions?.length) return;

  //   let newItems = examcenterinstitutions.reduce((acc, curr) => {
  //     const tid = getNanoID();
  //     acc[tid] = {
  //       tid,
  //       institute: curr.institution_details,
  //       roll_start: curr?.roll_start,
  //       roll_end: curr?.roll_end,
  //       exam_center: curr?.exam_center,
  //     };

  //     return acc;
  //   }, {});

  //   if (newItems && Object.keys(newItems).length) {
  //     newItems = Object.values(newItems)
  //       ?.filter((item) => item?.exam_center === formData?.id)
  //       ?.reduce((acc, item) => {
  //         acc[item.tid] = item;
  //         return acc;
  //       }, {});
  //   }

  //   setItems(newItems);
  //   setPreviousItems(newItems);
  // }, [examcenterinstitutions, formData]);

  return (
    <StyledProgramTable>
      <table>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Package</th>
            <th>Version</th>
            {Object.entries(items || {}).length > 1 && <th />}
          </tr>
        </thead>
        <tbody>
          {Object.values(items)?.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <FormGroup className="input-holder">
                    <Input
                      id="name"
                      type="text"
                      placeholder=""
                      size="small"
                      fullWidth
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      error={Boolean(errors.name)}
                      errors={errors}
                    />
                  </FormGroup>
                  {/* <Select
		options={institutions}
		label="Institution"
		value={item.institute}
		onChange={(val) => {
		  setItems((prev) => ({
		    ...prev,
		    [`${item.tid}`]: {
		      ...prev[`${item.tid}`],
		      institute: val,
		    },
		  }));
		}}
		errors={errors}
		keyName="name"
		// id="name"
	      /> */}
                </td>
                <td>
                  <FormGroup className="input-holder">
                    <Input
                      type="text"
                      placeholder=""
                      size="small"
                      fullWidth
                      value={item.version}
                      onChange={(e: any) => {
                        setItems((prev) => ({
                          ...prev,
                          [`${item.tid}`]: {
                            ...prev[`${item.tid}`],
                            roll_start: e.target.value,
                          },
                        }));
                      }}
                      error={Boolean(errors.name)}
                      errors={errors}
                    />
                  </FormGroup>
                </td>

                {Object.entries(items || {}).length > 1 && (
                  <td style={{ width: 30, height: 30 }}>
                    <Button type="button">
                      <HighlightOffIcon
                        style={{ width: 30, height: 30 }}
                        cursor="pointer"
                        size="sm"
                        onClick={(e) => {
                          const temp = { ...items };
                          delete temp[`${item.tid}`];
                          setItems(temp);
                        }}
                      />
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}

          <tr>
            <td style={{ width: 5 }}>
              <Button type="button">
                <AddCircleOutlineIcon
                  size="md"
                  cursor="pointer"
                  onClick={() =>
                    setItems((prev) => {
                      const tid = getNanoID();
                      return {
                        ...prev,
                        [`${tid}`]: {
                          tid,
                          institute: "",
                          roll_start: "",
                          roll_end: "",
                        },
                      };
                    })
                  }
                />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledProgramTable>
  );
}

export default CustomDynamicTable;
