// pages/WeeklyRecordPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { API } from "../const/api";
import WeeklyRecordTable from "../components/WeeklyRecord/WeeklyRecordTable";

const Container = styled.div`
  padding: 2rem;
`;

export default function WeeklyRecordPage() {
  const { classId, weekNo } = useParams();
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    const res = await axios.get(`${API.WEEKLY_RECORDS}?class=${classId}&week=${weekNo}`, {
      withCredentials: true,
    });
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, [classId, weekNo]);

  return (
    <Container>
      <h2>📚 {weekNo}주차 수업 기록</h2>
      <WeeklyRecordTable records={records} />
    </Container>
  );
}
