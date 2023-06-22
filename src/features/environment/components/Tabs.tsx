import React, { useState } from "react";
import BadgeTab from "src/components/Tabs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, pb: 3 }}>{children}</Box>}
    </div>
  );
}

const models = [{ label: "Vision" }, { label: "Audio" }, { label: "Machanic" }];

function Tabs() {
  const [activeTabIndexModel, setActiveTabIndexModel] = useState(0);

  return (
    <div>
      <BadgeTab
        labels={models}
        activeTab={activeTabIndexModel}
        onTabChange={(tabIndex) => setActiveTabIndexModel(tabIndex)}
      />
      {models.map((item, index) => (
        <TabPanel key={index} value={activeTabIndexModel} index={index}>
          content {index}
        </TabPanel>
      ))}
    </div>
  );
}

export default Tabs;
