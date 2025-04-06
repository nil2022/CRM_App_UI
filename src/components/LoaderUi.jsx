// Import React - Necessary for JSX transformation, even if implicit in some setups.
// Resolves: 'React' must be in scope when using JSX
import React from "react";
// Import PropTypes for props validation
// Resolves: 'minHeight' is missing in props validation
import PropTypes from "prop-types";
// Import necessary components from Material UI
import { Box, CircularProgress } from "@mui/material";

/**
 * A simple Loader UI component that displays a centered CircularProgress indicator.
 * @param {object} props - The component props.
 * @param {string} [props.minHeight='100vh'] - The minimum height for the loader container.
 * @param {'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'} [props.color='primary'] - The color of the CircularProgress indicator.
 */
const LoaderUi = ({ minHeight, color }) => {
  return (
    // Box component used as a flexible container
    <Box
      sx={{
        display: "flex", // Enable flex layout
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        minHeight: minHeight, // Apply the minimum height
      }}
    >
      {/* Material UI CircularProgress component */}
      {/* Corrected syntax: Pass the color prop correctly */}
      <CircularProgress color={color} />
    </Box>
  );
};

// Define PropTypes for type checking and validation
LoaderUi.propTypes = {
  /**
   * Minimum height for the loader container.
   */
  minHeight: PropTypes.string,
  /**
   * The color of the CircularProgress component.
   * Accepts standard Material UI color options or 'inherit'.
   */
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
    "inherit",
  ]),
};

// Define default props for the component
LoaderUi.defaultProps = {
  minHeight: "100vh", // Default height if not provided
  color: "primary", // Default color if not provided
};

// Export the component for use in other parts of the application
export default LoaderUi;

// Removed the extra closing curly brace '}' that was present in the original image.
