import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegularClassPage from "./pages/RegularClassPage";
import ExtraClassPage from "./pages/ExtraClassPage";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/regular" element={<RegularClassPage />} />
        <Route path="/extra" element={<ExtraClassPage />} />
        <Route path="/create/student" element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
