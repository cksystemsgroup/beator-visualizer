import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

function Legend() {
  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#e15759" }} />
        </ListItemIcon>
        <ListItemText>Bad</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#4e79a5" }} />
        </ListItemIcon>
        <ListItemText>Next</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#bcbd3b" }} />
        </ListItemIcon>
        <ListItemText>Constant</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#59a14f" }} />
        </ListItemIcon>
        <ListItemText>Input, uninitialized State</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#76b7b2" }} />
        </ListItemIcon>
        <ListItemText>State</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#f28e2b" }} />
        </ListItemIcon>
        <ListItemText>And, Not, Equals, Less-than</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#b07aa1" }} />
        </ListItemIcon>
        <ListItemText>IfThenElse</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#ff9da7" }} />
        </ListItemIcon>
        <ListItemText>
          Addition, Subtraction, Division, Multiplication, Remainder, Extend
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#9c755f" }} />
        </ListItemIcon>
        <ListItemText>Read</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <CircleIcon sx={{ fill: "#edc948" }} />
        </ListItemIcon>
        <ListItemText>Write</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <svg width="30" height="10">
            <line stroke="#333" y2="5" x2="23" y1="5" x1="1" />
          </svg>
        </ListItemIcon>
        <ListItemText>Boolean</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <svg width="30" height="10">
            <line
              stroke="#333"
              y2="5"
              x2="24"
              y1="5"
              x1="1"
              strokeWidth="1.5"
            />
          </svg>
        </ListItemIcon>
        <ListItemText>1 to 7 Bytes</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <svg width="30" height="10">
            <line stroke="#333" y2="5" x2="24" y1="5" x1="1" strokeWidth="2" />
          </svg>
        </ListItemIcon>
        <ListItemText>Machine Word</ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: "28px" }}>
          <svg width="30" height="10">
            <line stroke="#333" y2="5" x2="24" y1="5" x1="1" strokeWidth="5" />
          </svg>
        </ListItemIcon>
        <ListItemText>Virtual Memory</ListItemText>
      </ListItem>
    </List>
  );
}

export default Legend;
