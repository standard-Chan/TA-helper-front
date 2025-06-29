import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../const/api";
import WeeklyRecordTable from "../components/WeeklyRecord/WeeklyRecordTable";
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

export default function WeeklyRecordPage() {
  const { classId, weekNo } = useParams();
  const [records, setRecords] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const [recordRes, studentRes] = await Promise.all([
        axiosInstance.get(`${API.WEEKLY_RECORDS}?class=${classId}&week=${weekNo}`, {
          withCredentials: true,
        }),
        axiosInstance.get(`${API.STUDENTS}/class/${classId}`, {
          withCredentials: true,
        }),
      ]);

      const records = recordRes.data;
      const students = studentRes.data;

      const recordedStudentIds = records.map((r: any) => r.student.id);
      const missingStudents = students.filter(
        (s: any) => !recordedStudentIds.includes(s.id)
      );

      const emptyRecords = missingStudents.map((s: any) => ({
        id: null,
        classId: Number(classId),
        weekNo: Number(weekNo),
        attended: false,
        testScore: 0,
        homeworkScore: 0,
        note: "",
        createdById: null,
        updatedById: null,
        createdAt: null,
        updatedAt: null,
        student: s,
      }));

      setRecords([...records, ...emptyRecords]);
    } catch (err) {
      console.error("기록 또는 학생 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [classId, weekNo]);

  return (
    <Container>
      <TitleRow>
        <Title>📚 {weekNo}주차 수업 기록</Title>
        <NavButtons>
          <Button onClick={() => navigate(-1)}>← 이전 페이지</Button>
          <Button onClick={() => navigate("/main")}>🏠 메인으로</Button>
        </NavButtons>
      </TitleRow>

      <WeeklyRecordTable records={records} />
    </Container>
  );
}
