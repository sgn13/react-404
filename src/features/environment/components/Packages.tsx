import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";

function Packages({ value }) {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  return data.map((item) => (
    <Paper variant="outlined" key={item?.id}>
      {item?.name}
    </Paper>
  ));
}

export default Packages;
