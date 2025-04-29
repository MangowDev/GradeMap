import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        
        {/* Ruta por defecto que redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace/>} />
      </Routes>
    </Router>
  );
}

export default App;
