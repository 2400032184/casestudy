import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#8ecae6" },   // pastel blue
    secondary: { main: "#ffb4a2" }, // pastel coral
    success: { main: "#b5e48c" },   // pastel green
    background: { default: "#fffaf0" }, // soft cream
    text: { primary: "#1b1b1b" },   // dark headings
  },
  typography: {
    fontFamily: "'Poppins', Arial, sans-serif",
    h4: { fontWeight: 700, color: "#1b1b1b" },
    h5: { fontWeight: 600, color: "#1b1b1b" },
    button: { textTransform: "none", fontWeight: 600 },
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
