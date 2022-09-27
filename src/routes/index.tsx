import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { SingIn } from "../screens/SingIn";
import { Transaction } from "../screens/Transaction";

export const AppRoutes = () => {
  const { singed } = useContext(AuthContext);

  return !singed ? (
    <Routes>
      <Route path="/*" element={<SingIn />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/dashboard/transaction" element={<Transaction />} />
    </Routes>
  );
};
