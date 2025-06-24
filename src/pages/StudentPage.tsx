import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../const/api";
import type { Student } from "../types/types";
import StudentFormModal from "../components/Student/StudentFormModal";

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: center;
`;

export default function StudentPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [editing, setEditing] = useState<Partial<Student> | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API.STUDENTS, { withCredentials: true });
      setStudents(res.data);
    } catch (err) {
      alert("학생 정보 불러오기 실패");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${API.STUDENTS}/${id}`, { withCredentials: true });
      fetchStudents();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      <Header>
        <Title>👨‍🎓 학생 목록</Title>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={() => setEditing({})}>+ 학생 등록</Button>
          <Button onClick={() => navigate("/main")}>🏠 메인으로</Button>
        </div>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>이름</Th>
            <Th>수업 ID</Th>
            <Th>학교</Th>
            <Th>보호자 연락처</Th>
            <Th>학생 연락처</Th>
            <Th>이메일</Th>
            <Th>나이</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <Td>{student.id}</Td>
              <Td>{student.name}</Td>
              <Td>{student.classId}</Td>
              <Td>{student.school}</Td>
              <Td>{student.parentPhoneNumber}</Td>
              <Td>{student.phoneNumber}</Td>
              <Td>{student.email}</Td>
              <Td>{student.age}</Td>
              <Td>
                <Button onClick={() => setEditing(student)}>수정</Button>{" "}
                <Button onClick={() => handleDelete(student.id)} style={{ backgroundColor: "#dc3545" }}>
                  삭제
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {editing && (
        <StudentFormModal
          initialData={editing}
          onClose={() => setEditing(null)}
          onUpdated={fetchStudents}
        />
      )}
    </Container>
  );
}
