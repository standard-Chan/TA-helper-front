import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { API } from "../../const/api";
import axiosInstance from "../../util/axiosInstance";

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
  position: relative;
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

const Input = styled.input`
  width: 100px;
  padding: 0.4rem;
  font-size: 0.95rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

interface Props {
  classId: number;
  onClose: () => void;
}

export default function WeeklySelectorPopup({ classId, onClose }: Props) {
  const navigate = useNavigate();
  const [weekList, setWeekList] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [newWeekNo, setNewWeekNo] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchWeeks = async () => {
    const res = await axiosInstance.get(`${API.WEEKLY_RECORDS}/class/${classId}/week`, {
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

  const handleCreate = () => {
    const max = weekList.length > 0 ? Math.max(...weekList) : 0;
    setNewWeekNo(max + 1);
    setCreating(true);
    setErrorMsg("");
  };

  const handleConfirmCreate = () => {
    if (weekList.includes(newWeekNo)) {
      setErrorMsg(`${newWeekNo}주차는 이미 존재합니다.`);
      return;
    }
    navigate(`/class/${classId}/week/${newWeekNo}`);
  };

  return (
    <Overlay onClick={onClose}>
      <Popup onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
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

          {creating ? (
            <>
              <Input
                type="text"
                inputMode="numeric"
                value={newWeekNo === 0 ? "" : newWeekNo.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const val = e.target.value;
                  const parsed = Number(val);
                  if (val === "") {
                    setNewWeekNo(0); // 비워두면 0으로 간주
                  } else if (!isNaN(parsed)) {
                    setNewWeekNo(parsed);
                  }
                }}
              />
              <Button
                onClick={handleConfirmCreate}
                style={{ background: "#28a745" }}
              >
                생성
              </Button>
            </>
          ) : (
            <Button onClick={handleCreate} style={{ background: "#28a745" }}>
              + 신규 주차
            </Button>
          )}
        </ButtonRow>

        {errorMsg && (
          <div
            style={{ color: "red", marginTop: "0.5rem", fontSize: "0.9rem" }}
          >
            {errorMsg}
          </div>
        )}
      </Popup>
    </Overlay>
  );
}
