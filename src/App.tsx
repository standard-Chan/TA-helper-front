import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegularClassPage from "./pages/RegularClassPage";
import ExtraClassPage from "./pages/ExtraClassPage";
import StudentCreatePage from "./pages/StudentCreatePage";
import AcademyCreatePage from "./pages/AcademyCreatePage";
import ClassTypeCreatePage from "./pages/ClassTypeCreatePage";
import StaffCreatePage from "./pages/StaffCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/regular" element={<RegularClassPage />} />
        <Route path="/extra" element={<ExtraClassPage />} />
        <Route path="/create/student" element={<StudentCreatePage />} />
        <Route path="/create/academy" element={<AcademyCreatePage />} />
        <Route path="/create/class-type" element={<ClassTypeCreatePage />} />
        <Route path="/create/staff" element={<StaffCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
