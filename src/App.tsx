import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegularClassPage from "./pages/RegularClassPage";
import ExtraClassPage from "./pages/ExtraClassPage";
import StudentPage from "./pages/StudentPage";
import WeeklyRecordPage from "./pages/WeeklyRecordPage";
import WeeklyExtraClassRecordPage from "./pages/WeeklyExtraClassRecordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/regular" element={<RegularClassPage />} />
        <Route path="/extra" element={<ExtraClassPage />} />
        <Route path="/create/student" element={<StudentPage />} />
        <Route path="/class/:classId/week/:weekNo" element={<WeeklyRecordPage />} />
        <Route path="/extra-class/:extraClassId/week/:weekNo" element={<WeeklyExtraClassRecordPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
