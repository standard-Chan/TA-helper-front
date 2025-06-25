import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../const/api";
import type { ExtraClass } from "../../types/types";

interface Props {
  onClose: () => void;
  onRefresh: () => void;
  initialData?: ExtraClass;
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Popup = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  background-color: #4a6fa5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #3e5f8a;
  }
`;

function ExtraClassFormPopup({ onClose, onRefresh, initialData }: Props) {
  const isEdit = !!initialData;
  const [academyId, setAcademyId] = useState(initialData?.academyId || 1);
  const [staffId, setStaffId] = useState(initialData?.staffId || 1);
  const [days, setDays] = useState(initialData?.days || "MONDAY");
  const [startTime, setStartTime] = useState(initialData?.startTime || "18:00:00");
  const [endTime, setEndTime] = useState(initialData?.endTime || "20:00:00");

  const handleSubmit = async () => {
    const data = { academyId, staffId, days, startTime, endTime };

    if (isEdit) {
      await axios.put(`${API.EXTRA_CLASSES}/${initialData!.id}`, data, { withCredentials: true });
    } else {
      await axios.post(API.EXTRA_CLASSES, data, { withCredentials: true });
    }

    onRefresh();
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <h3>{isEdit ? "보충수업 수정" : "보충수업 생성"}</h3>
        <Input type="number" value={academyId} onChange={(e) => setAcademyId(Number(e.target.value))} placeholder="학원 ID" />
        <Input type="number" value={staffId} onChange={(e) => setStaffId(Number(e.target.value))} placeholder="조교 ID" />
        <Select value={days} onChange={(e) => setDays(e.target.value)}>
          {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </Select>
        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value + ":00")} />
        <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value + ":00")} />
        <Button onClick={handleSubmit}>{isEdit ? "수정하기" : "생성하기"}</Button>
      </Popup>
    </Overlay>
  );
}

export default ExtraClassFormPopup;
