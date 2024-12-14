import React, { useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

export const DarkModeToggler = () => {
  const { mode, setMode } = useColorScheme();

  const toggleMode = React.useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (mode === "system" && prefersDarkMode) {
      setMode("dark");
    }
  }, [mode, prefersDarkMode, setMode]);

  if (!mode) {
    return null;
  }

  const tooltipLabel = `Switch to ${mode === "dark" ? "Light" : "Dark"} mode`;
  return (
    <>
      <Tooltip title={tooltipLabel} enterDelay={1000}>
        <IconButton aria-label={tooltipLabel} onClick={toggleMode}>
          <React.Fragment>
            {mode !== "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </React.Fragment>
        </IconButton>
      </Tooltip>
    </>
  );
};
