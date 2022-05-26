import { Box } from "@mui/material";

export function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <>
      {value === index && (
        <Box
          hidden={value !== index}
          sx={{ maxHeight: index === 0 ? "85%" : "72%", overflow: "auto" }}>
          {children}
        </Box>
      )}
    </>
  );
}
