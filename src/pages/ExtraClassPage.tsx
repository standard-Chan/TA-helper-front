import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { ExtraClass } from "../types/types";
import { API } from "../const/api";
import ExtraClassCard from "../components/ExtraClass/ExtraClassCard";
import ExtraClassFormPopup from "../components/ExtraClass/ExtraClassFormPopup";
import axiosInstance from "../util/axiosInstance";

// 요일 (한글 탭용 / API 필터용)
const KOREAN_DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const ENGLISH_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

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
  font-size: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  background-color: #4a6fa5;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #3e5f8a;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 1.5rem; // ✅ 요일 간격 늘림
`;

const Tab = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  font-size: 1.4rem; // ✅ 글자 크기 증가
  padding: 0.6rem 1rem;
  border-bottom: ${({ $active }) => ($active ? "3px solid #4a6fa5" : "none")};
  color: ${({ $active }) => ($active ? "#4a6fa5" : "#555")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #1d3f75; // ✅ hover 색상 진하게
    transform: translateY(-2px); // 약간 위로
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function ExtraClassPage() {
  const [extraClasses, setExtraClasses] = useState<ExtraClass[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(API.EXTRA_CLASSES, { withCredentials: true });
      setExtraClasses(res.data);
    } catch (e) {
      console.error("보충수업 조회 실패", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedDay = ENGLISH_DAYS[selectedDayIndex];

  return (
    <Container>
      <Header>
        <Title>보충수업 관리</Title>
        <ButtonGroup>
          <Button onClick={() => navigate("/main")}>홈으로</Button>
          <Button onClick={() => setIsPopupOpen(true)}>보충수업 추가</Button>
        </ButtonGroup>
      </Header>

      <Tabs>
        {KOREAN_DAYS.map((day, i) => (
          <Tab
            key={day}
            $active={i === selectedDayIndex}
            onClick={() => setSelectedDayIndex(i)}
          >
            {day}
          </Tab>
        ))}
      </Tabs>

      {extraClasses
        .filter((cls) => cls.days === selectedDay)
        .map((cls) => (
          <CardWrapper key={cls.id}>
            <ExtraClassCard extraClass={cls} onRefresh={fetchData} />
          </CardWrapper>
        ))}

      {isPopupOpen && (
        <ExtraClassFormPopup
          onClose={() => setIsPopupOpen(false)}
          onRefresh={fetchData}
        />
      )}
    </Container>
  );
}

export default ExtraClassPage;
