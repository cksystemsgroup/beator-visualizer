import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { SandwichProps } from "../../../types/react-types";
import { TabPanel } from "../../general/TabUtils";
import Widget from "../../general/Widget";
import Legend from "./Legend";
import Misc from "./Misc";
import Settings from "./Settings";
import MenuIcon from "@mui/icons-material/Menu";

function Menu(props: SandwichProps) {
  const [active, setActive] = useState(0);

  return (
    <Widget
      title="Menu"
      sx={{ bottom: "10px", right: "10px" }}
      expandIcon={<MenuIcon />}
      expanded={false}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={active}
          onChange={(_, newValue) => setActive(newValue)}
          centered>
          <Tab label="Legend" disableRipple />
          <Tab label="Settings" disableRipple />
          <Tab label="Misc." disableRipple />
        </Tabs>
      </Box>
      <TabContent {...props} active={active} />
    </Widget>
  );
}

function TabContent({ active, ...props }: SandwichProps & { active: number }) {
  return (
    <>
      <TabPanel value={active} index={0}>
        <Legend />
      </TabPanel>
      <TabPanel value={active} index={1}>
        <Settings {...props} />
      </TabPanel>
      <TabPanel value={active} index={2}>
        <Misc {...props} />
      </TabPanel>
    </>
  );
}

export default Menu;
