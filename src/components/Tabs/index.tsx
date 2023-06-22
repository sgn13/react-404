import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import badgeTabTheme from "./badgeTabTheme";

interface BadgeTabProps {
  labels: { labels: string; count: number }[];
  activeTab: number;
  onTabChange: (v: any) => void;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BadgeTab: React.FC<BadgeTabProps> = ({ labels, onTabChange, activeTab }) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <ThemeProvider theme={badgeTabTheme}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        TabIndicatorProps={{ className: "tab-indicator" }}
      >
        {labels.map((item, index) => (
          <Tab label={<div>{item.label}</div>} key={index} {...a11yProps(index)} />
        ))}
      </Tabs>
    </ThemeProvider>
  );
};
export default BadgeTab;
