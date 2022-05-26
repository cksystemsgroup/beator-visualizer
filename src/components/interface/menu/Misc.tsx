import { Box, Button, Link } from "@mui/material";
import { SetBoolean } from "../../../types/react-types";

function Misc({
  showFile,
  setShowFile,
}: {
  showFile: boolean;
  setShowFile: SetBoolean;
}) {
  return (
    <Box sx={{ p: "10px" }}>
      <Button
        variant="contained"
        onClick={() => setShowFile(true)}
        disableRipple>
        Show Model File
      </Button>{" "}
      <br /> <br />
      <Link
        href="https://github.com/geo-bert/beator-visualizer/blob/master/thesis.pdf"
        target="_blank">
        Link to thesis
      </Link>
    </Box>
  );
}

export default Misc;
