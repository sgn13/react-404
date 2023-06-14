function DataViewTable({ data = [] }) {
  return (
    <table className="table " style={{ textAlign: "left" }}>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index.toString()} style={{ border: "none" }}>
              <td style={{ border: "none", width: "30%", fontWeight: "900" }}>
                <strong>{item?.key}</strong>
              </td>
              <td style={{ border: "none", wordBreak: "break-all" }}>{item.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataViewTable;
