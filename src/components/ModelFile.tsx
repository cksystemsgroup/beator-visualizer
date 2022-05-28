import { Box, Modal } from "@mui/material";
import { SetBoolean } from "../types/react-types";

const style = {
  position: "absolute",
  mt: "1vh",
  height: "98vh",
  left: "50%",
  transform: "translateX(-50%)",
  overflow: "auto",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ModelFile({
  showFile,
  setShowFile,
  text,
}: {
  showFile: boolean;
  setShowFile: SetBoolean;
  text: string;
}) {
  return (
    <Modal open={showFile} onClose={() => setShowFile(false)}>
      <Box sx={style}>
        {text.split("\n").map((x, i) => (
          <span key={i}>
            {x} <br />
          </span>
        ))}
      </Box>
    </Modal>
  );
}

export default ModelFile;
