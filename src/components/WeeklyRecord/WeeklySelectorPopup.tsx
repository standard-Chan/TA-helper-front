import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { API } from "../../const/api";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  position: relative; // ✅ 이거 추가
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;

const WeekList = styled.ul`
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const WeekItem = styled.li<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  background-color: ${({ selected }) => (selected ? "#e6f0ff" : "white")};
  color: ${({ selected }) => (selected ? "#007bff" : "#333")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
`;

interface Props {
  classId: number;
  onClose: () => void;
}

export default function WeeklySelectorPopup({ classId, onClose }: Props) {
  const navigate = useNavigate();
  const [weekList, setWeekList] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const fetchWeeks = async () => {
    const res = await axios.get(`${API.WEEKLY_RECORDS}/class/${classId}/week`, {
      withCredentials: true,
    });
    setWeekList(res.data);
  };

  useEffect(() => {
    fetchWeeks();
  }, []);

  const handleMove = () => {
    if (selected !== null) navigate(`/class/${classId}/week/${selected}`);
  };

  const handleCreate = async () => {
    const max = weekList.length > 0 ? Math.max(...weekList) : 0;
    const nextWeek = max + 1;
    // 생성 없이 바로 이동만 할 수도 있음
    navigate(`/class/${classId}/week/${nextWeek}`);
  };

  return (
    <Overlay onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <h3>📅 주차 선택</h3>
        <WeekList>
          {weekList.length === 0 ? (
            <WeekItem
              selected={false}
              as="div"
              style={{ textAlign: "center", color: "#999" }}
            >
              📭 등록된 주차가 없습니다.
            </WeekItem>
          ) : (
            weekList.map((week) => (
              <WeekItem
                key={week}
                selected={week === selected}
                onClick={() => setSelected(week)}
              >
                {week}주차
              </WeekItem>
            ))
          )}
        </WeekList>
        <ButtonRow>
          <Button onClick={handleMove}>이동</Button>
          <Button onClick={handleCreate} style={{ background: "#28a745" }}>
            + 신규 주차
          </Button>
        </ButtonRow>
      </Popup>
    </Overlay>
  );
}
