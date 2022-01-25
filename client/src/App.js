import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Workspace from "./pages/Workspace";

function App() {
  const [modal, setModal] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/app" element={<Workspace />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
