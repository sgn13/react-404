import { values } from "lodash";
import React, { ChangeEvent, useEffect, useState } from "react";
import shadows from "../../constants/css/shadows";
import { Flexbox } from "../../containers/Grid/Grid";
import styled from "../../theme/styled";
import Input from "../Input/Input";

const StyledTable = styled.div`
  overflow-x: auto;
  width: 100%;
  table {
    /* table-layout: fixed; */
    width: 100%;
    border-spacing: 0px;
    font-family: "Roboto";
  }

  td {
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background: darkblue;
    color: white;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  td,
  th {
    text-align: left;
    padding: 5px 10px;
  }
  tr:nth-child(even) {
    /* background: #cacdce86; */
  }
  tbody tr td {
    padding-top: 12px;
    padding-bottom: 12px;
    box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.14);
  }

  tbody tr td:first-child {
    background-color: #80808012;
    font-weight: 500;
    font-size: 1.2em;
  }

  /* Column widths are based on these cells */
  // Note: min-width property does not work on table cell, works only on table
  // solution 1: colgroup and colspan
  // solution 2: use max and calc with vw units to determine the size of the column width: max(200px, calc(100vw - 680px));
  .row-ID {
    width: 10%;
  }

  .row-name {
    width: 30ch;
  }
  /* .row-job {
  }
  .row-email {
  } */
`;

const toggleSuperuserPermissions = (permissionGroup, isSuperuser) => {
  if (!permissionGroup || !Object.keys(permissionGroup).length) return;
  const newPermissionGroup = {};
  Object.entries(permissionGroup).forEach(([key, values]) => {
    const newValues = values.map((item) => {
      item.hasPermission = !isSuperuser;
      return item;
    });
    newPermissionGroup[key] = newValues;
  });
  return newPermissionGroup;
};

function RoleTable({ permissionGroup, onPermissionChange }) {
  const [permisisons, setPermissions] = useState(permissionGroup);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    if (!permisisons || !Object.keys(permisisons).length) return;
    const result = Object.values(permisisons).flat(1);
    const notSuperuser = result.find((item) => item.hasPermission === false);
    if (notSuperuser) {
      if (isSuperuser) setIsSuperuser(false);
    } else {
      if (!isSuperuser) setIsSuperuser(true);
    }
  }, [permisisons, isSuperuser]);

  return (
    <StyledTable>
      <table>
        <thead>
          <tr style={{ color: "gray" }}>
            <td colSpan={2}>
              <h3>Categories</h3>{" "}
            </td>
            <td>
              <h3>Associated Permissions</h3>{" "}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ paddingLeft: "40px" }}>
              Superuser
            </td>
            <td colSpan={5}>
              <Input
                type="checkbox"
                // name={}
                label="Select All"
                style={{ margin: 0, width: "20px", height: "20px" }}
                labelStyle={{ fontWeight: 200, fontSize: "1rem" }}
                labelAndInputWrapperStyle={{
                  diaplay: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 8,
                }}
                checked={isSuperuser}
                value={isSuperuser}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPermissions(
                    toggleSuperuserPermissions(permisisons, isSuperuser)
                  );
                }}
                // errors={errors}
              />
            </td>
          </tr>
          {permisisons && Object.keys(permisisons)?.length
            ? Object.entries(permisisons).map(([key, values]) => (
                <tr key={key}>
                  <td colSpan={2}>
                    <Flexbox justifyContent="flex-start" gap="10px">
                      <div style={{ width: "20px" }}>
                        <Input
                          type="checkbox"
                          style={{
                            margin: 0,
                            width: "20px",
                            height: "20px",
                          }}
                          labelStyle={{ fontWeight: 200, fontSize: "1rem" }}
                          labelAndInputWrapperStyle={{
                            diaplay: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: 8,
                          }}
                          checked={
                            !values.some((item) => item.hasPermission === false)
                          }
                          value={
                            !values.some((item) => item.hasPermission === false)
                          }
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPermissions((prev) => {
                              const isNotAllChecked = values.some(
                                (item) => item.hasPermission === false
                              );

                              const toggledGroupList = values.map((item) => {
                                item.hasPermission = isNotAllChecked
                                  ? true
                                  : false;
                                return item;
                              });

                              const newPermissionsState = {
                                ...prev,
                                [key]: toggledGroupList,
                              };
                              onPermissionChange(newPermissionsState);
                              return newPermissionsState;
                            });
                          }}
                        />
                      </div>
                      <span>{key}</span>
                    </Flexbox>
                  </td>
                  {values && values?.length
                    ? values.map((item) => (
                        <td key={item?.permission}>
                          <Input
                            type="checkbox"
                            name={item?.permission}
                            label={item?.displayName}
                            style={{ margin: 0, width: "20px", height: "20px" }}
                            labelStyle={{ fontWeight: 200, fontSize: "1rem" }}
                            labelAndInputWrapperStyle={{
                              diaplay: "flex",
                              flexDirection: "row-reverse",
                              justifyContent: "start",
                              alignItems: "center",
                              gap: 8,
                            }}
                            checked={item.hasPermission}
                            value={item?.hasPermission}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ) => {
                              setPermissions((prev) => {
                                const toggledPermissionList = values.map(
                                  (value) =>
                                    value.permission === item.permission
                                      ? {
                                          ...value,
                                          hasPermission: !value.hasPermission,
                                        }
                                      : value
                                );
                                const newPermissionsState = {
                                  ...prev,
                                  [key]: toggledPermissionList,
                                };
                                onPermissionChange(newPermissionsState);
                                return newPermissionsState;
                              });
                            }}
                          />
                        </td>
                      ))
                    : null}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </StyledTable>
  );
}

export default RoleTable;
