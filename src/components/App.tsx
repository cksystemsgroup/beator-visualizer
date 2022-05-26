import { useState } from "react";
import processModel from "../model/model-processor";
import Form from "./Form";
import Interface from "./interface/Interface";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#26a69a",
    },
    secondary: {
      main: "#f50057",
    },
  },
  shape: {
    borderRadius: 4,
  },
});

function App() {
  const [text, setText] = useState<string>();

  return (
    <ThemeProvider theme={theme}>
      {!text ? (
        <Form setText={setText} />
      ) : (
        <Interface model={processModel(text)} text={text} />
      )}
    </ThemeProvider>
  );
}

export default App;
