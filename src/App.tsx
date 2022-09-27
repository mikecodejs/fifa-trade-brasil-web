import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import "./index.css";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};
