import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { API } from "../const/api";
import WeeklyExtraClassRecordTable from "../components/WeeklyExtraClassRecord/WeeklyExtraClassRecordTable";
import axiosInstance from "../util/axiosInstance";

const Container = styled.div`
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function WeeklyExtraClassRecordPage() {
  const { extraClassId, weekNo } = useParams();
  const [records, setRecords] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const res = await axiosInstance.get(
        `${API.WEEKLY_EXTRA_RECORDS}?extraClass=${extraClassId}&week=${weekNo}`,
        { withCredentials: true }
      );
      setRecords(res.data);
    } catch (err) {
      console.error("보충수업 기록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [extraClassId, weekNo]);

  return (
    <Container>
      <TitleRow>
        <Title>📚 {weekNo}주차 보충수업 기록</Title>
        <NavButtons>
          <Button onClick={() => navigate(-1)}>← 이전 페이지</Button>
          <Button onClick={() => navigate("/main")}>메인으로</Button>
        </NavButtons>
      </TitleRow>

      <WeeklyExtraClassRecordTable records={records} extraClassId={Number(extraClassId)} weekNo={Number(weekNo)} />
    </Container>
  );
}
