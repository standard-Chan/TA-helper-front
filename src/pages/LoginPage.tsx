import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../const/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        API.LOGIN,
        { username, password },
        { withCredentials: true } // ✅ 쿠키 자동 저장
      );

      if (response.status === 200) {
        navigate("/main");
      }
    } catch (error) {
      alert("로그인 실패! 아이디 또는 비밀번호를 확인해주세요.");
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
        margin: "auto",
      }}
    >
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ Enter 키 처리
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ Enter 키 처리
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
