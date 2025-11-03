import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#A7C7E7" },       // pastel blue
    secondary: { main: "#F7CAC9" },     // pastel pink
    success: { main: "#BFD8B8" },       // pastel green
    background: { default: "#FFF8F0" }, // soft pastel cream
    text: { primary: "#1C1C1C" },       // dark headings
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h4: { fontWeight: 700, color: "#1C1C1C" },
    h5: { fontWeight: 600, color: "#1C1C1C" },
    button: { textTransform: "none" },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
