// src/pages/RegularClassPage.tsx
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../const/api";
import RegularClassCard from "../components/RegularClass/RegularClassCard";
import RegularClassPopup from "../components/RegularClass/RegularClassPopup";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

export default function RegularClassPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [popupClass, setPopupClass] = useState<Class | null>(null); // 수정용
  const [isCreateMode, setIsCreateMode] = useState(false);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const res = await axios.get(API.CLASSES, { withCredentials: true });
      setClasses(res.data);
    } catch (err) {
      console.error("수업 목록 불러오기 실패", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${API.CLASSES}/${id}`, { withCredentials: true });
      await fetchClasses();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <Container>
      <Title>📚 정규수업 목록</Title>

      <ButtonRow>
        <ActionButton onClick={() => setIsCreateMode(true)}>+ 정규수업 추가</ActionButton>
        <ActionButton onClick={() => navigate("/")}>🏠 홈으로</ActionButton>
      </ButtonRow>

      <CardGrid>
        {classes.map((cls) => (
          <RegularClassCard
            key={cls.id}
            cls={cls}
            onEdit={() => setPopupClass(cls)}
            onDelete={() => handleDelete(cls.id)}
          />
        ))}
      </CardGrid>

      {isCreateMode && (
        <RegularClassPopup
          onClose={() => setIsCreateMode(false)}
          onSuccess={() => {
            fetchClasses();
            setIsCreateMode(false);
          }}
        />
      )}
      {popupClass && (
        <RegularClassPopup
          existingClass={popupClass}
          onClose={() => setPopupClass(null)}
          onSuccess={() => {
            fetchClasses();
            setPopupClass(null);
          }}
        />
      )}
    </Container>
  );
}
