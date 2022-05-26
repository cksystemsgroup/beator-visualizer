import { Box } from "@mui/material";

export function TabPanel(props) {
  const { children, value, index, smaller = false } = props;

  return (
    <>
      {value === index && (
        <Box
          hidden={value !== index}
          sx={{ maxHeight: !smaller ? "80%" : "65%", overflow: "auto" }}>
          {children}
        </Box>
      )}
    </>
  );
}
