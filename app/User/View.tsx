import DataViewTable from "components/DataViewTable";
import { Col, Row } from "containers/Grid/Grid";
import styled from "theme/styled";

const Styles = styled.div``;

const View = ({ item }) => {
  return (
    <Row style={{ maxHeight: "60vh", minHeight: "200px", overflow: "auto" }}>
      <Col sm={12}>
        {(() => {
          const dataBlock = [
            // { key: 'Id', value: item.id },
            { key: "Name", value: item?.fullName },
            { key: "Email", value: item?.email },
            { key: "Branch Name", value: item?.branchName },
            { key: "Branch Code", value: item?.branchCode },
            { key: "Fuctional Title", value: item?.functionalTitle },
            { key: "Department", value: item?.department },
            { key: "Superuser", value: item?.isSuperuser ? "Yes" : "No" },
            { key: "Admin", value: item?.isAdmin ? "Yes" : "No" },
          ];

          return <DataViewTable data={dataBlock} />;
        })()}
      </Col>
    </Row>
  );
};

export default View;
