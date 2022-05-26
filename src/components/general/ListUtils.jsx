import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export function CollapsableItem({ title, elements, childFn, closed = false }) {
  const [open, setOpen] = useState(!closed);

  if (elements.length === 0)
    return (
      <ListItem disablePadding>
        <ListItemText>{title}</ListItemText>
      </ListItem>
    );

  return (
    <>
      <ListItemButton
        onClick={() => setOpen((x) => !x)}
        disableRipple
        sx={{ p: 0, width: "95%" }}>
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

export function Item({ property, value, unit = "" }) {
  return (
    <ListItem disablePadding>
      <ListItemText>
        <b>{property}:</b> {value} {unit}
      </ListItemText>
    </ListItem>
  );
}

export function ItemButton({ itemName, onClick, selected }) {
  return (
    <ListItemButton
      selected={selected}
      onClick={onClick}
      sx={{ p: 0 }}
      disableRipple>
      <ListItemText>{itemName}</ListItemText>
    </ListItemButton>
  );
}

export function MyList({ children }) {
  return (
    <List disablePadding sx={{ maxHeight: "100%", overflow: "auto" }}>
      {children}
    </List>
  );
}
