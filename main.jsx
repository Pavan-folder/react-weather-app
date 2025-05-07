import React from "react";
import ReactDOM from "react-dom/client"; // React 18+ uses this API
import App from "App.jsx"; // importing your main App component

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
