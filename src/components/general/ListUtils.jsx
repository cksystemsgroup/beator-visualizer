import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export function CollapsableItem({ title, elements, childFn }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ListItemButton
        onClick={() => setOpen((x) => !x)}
        disableRipple
        sx={{ p: 0, width: "90%" }}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List disablePadding sx={{ pl: "10px" }}>
          {elements.map(childFn)}
        </List>
      </Collapse>
    </>
  );
}

export function Item({ property, value }) {
  return (
    <ListItem disablePadding>
      <ListItemText>
        <b>{property}:</b> {value}
      </ListItemText>
    </ListItem>
  );
}
