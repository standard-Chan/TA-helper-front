import axios from "axios";
import { API } from "../const/api";

const axiosInstance = axios.create({
  baseURL: API.BASE, // 필요하면 baseURL 세팅
  withCredentials: true,
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login"; // 401 응답 오면 로그인 페이지로 이동
    }
    return Promise.reject(error); // 에러는 그대로 넘겨야 다음 catch에서 잡을 수 있어
  }
);

export default axiosInstance;