import { useEffect, useState } from "react";
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
  width: 95%;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const SelectBox = styled.select`
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

interface Academy {
  id: number;
  name: string;
}

interface Staff {
  id: number;
  name: string;
}

function ExtraClassFormPopup({ onClose, onRefresh, initialData }: Props) {
  const isEdit = !!initialData;

  const [academyId, setAcademyId] = useState(initialData?.academyId || 0);
  const [academyName, setAcademyName] = useState(initialData?.academyName || "");
  const [staffId, setStaffId] = useState(initialData?.staffId || 0);
  const [staffName, setStaffName] = useState(initialData?.staffName || "");
  const [days, setDays] = useState(initialData?.days || "MONDAY");
  const [startTime, setStartTime] = useState(initialData?.startTime || "18:00:00");
  const [endTime, setEndTime] = useState(initialData?.endTime || "20:00:00");

  const [academies, setAcademies] = useState<Academy[]>([]);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const fetchAcademies = async () => {
    const res = await axios.get(API.ACADEMY, { withCredentials: true });
    setAcademies(res.data);
  };

  const fetchStaffs = async () => {
    const res = await axios.get(API.STAFFS, { withCredentials: true });
    setStaffs(res.data);
  };

  useEffect(() => {
    fetchAcademies();
    fetchStaffs();
  }, []);

  const handleSubmit = async () => {
    const data = {
      academyId,
      staffId,
      days,
      startTime,
      endTime,
    };

    try {
      if (isEdit) {
        await axios.put(`${API.EXTRA_CLASSES}/${initialData!.id}`, data, { withCredentials: true });
      } else {
        await axios.post(API.EXTRA_CLASSES, data, { withCredentials: true });
      }
      onRefresh();
      onClose();
    } catch (e) {
      console.error("보충수업 저장 실패", e);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <h3>{isEdit ? "보충수업 수정" : "보충수업 생성"}</h3>

        {/* 학원 선택 */}
        <SelectBox
          value={academyId}
          onChange={(e) => {
            const id = Number(e.target.value);
            const selected = academies.find((a) => a.id === id);
            setAcademyId(id);
            setAcademyName(selected?.name || "");
          }}
        >
          <option value={0}>학원을 선택하세요</option>
          {academies.map((a) => (
            <option key={a.id} value={a.id}>
              {a.id}. {a.name}
            </option>
          ))}
        </SelectBox>

        {/* 조교 선택 */}
        <SelectBox
          value={staffId}
          onChange={(e) => {
            const id = Number(e.target.value);
            const selected = staffs.find((s) => s.id === id);
            setStaffId(id);
            setStaffName(selected?.name || "");
          }}
        >
          <option value={0}>조교를 선택하세요</option>
          {staffs.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id}. {s.name}
            </option>
          ))}
        </SelectBox>

        {/* 요일 선택 */}
        <SelectBox value={days} onChange={(e) => setDays(e.target.value)}>
          {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            )
          )}
        </SelectBox>

        <Input
          type="time"
          value={startTime.slice(0, 5)}
          onChange={(e) => setStartTime(e.target.value + ":00")}
        />
        <Input
          type="time"
          value={endTime.slice(0, 5)}
          onChange={(e) => setEndTime(e.target.value + ":00")}
        />

        <Button onClick={handleSubmit}>{isEdit ? "수정하기" : "생성하기"}</Button>
      </Popup>
    </Overlay>
  );
}

export default ExtraClassFormPopup;
