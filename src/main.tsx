import ReactDOM from "react-dom/client";
import { App } from "./app";
import { AppProvider } from "./context-api/app-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
