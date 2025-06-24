import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API } from "../../const/api";
import type { RegularClass } from "../../types/types";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  existingClass?: RegularClass;
}

interface Academy {
  id: number;
  name: string;
}

interface ClassType {
  id: number;
  name: string;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.3rem;
  display: block;
`;

const Input = styled.input`
  width: 95%;
  padding: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  background-color: #007bff;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;
`;
const ListBox = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 120px; // ✅ 한 화면에 4~5개 정도
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
`;

const ListItem = styled.li<{ selected: boolean }>`
  padding: 8px 14px; // ✅ 줄임
  font-size: 0.85rem; // ✅ 줄임
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#f0f8ff" : "white")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  color: ${({ selected }) => (selected ? "#007acc" : "#333")};

  &:hover {
    background-color: #f5f5f5;
  }

  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export default function RegularClassPopup({
  onClose,
  onSuccess,
  existingClass,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    academyId: existingClass?.academyId ?? 0,
    classTypeId: existingClass?.classTypeId ?? 0,
    days: existingClass?.days ?? "MONDAY",
    startTime: existingClass?.startTime ?? "",
    endTime: existingClass?.endTime ?? "",
  });

  const [academies, setAcademies] = useState<Academy[]>([]);
  const [classTypes, setClassTypes] = useState<ClassType[]>([]);

  useEffect(() => {
    axios
      .get(API.ACADEMY, { withCredentials: true })
      .then((res) => setAcademies(res.data));
    axios
      .get(API.CLASS_TYPE, { withCredentials: true })
      .then((res) => setClassTypes(res.data));

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const method = existingClass ? axios.put : axios.post;
      const url = existingClass
        ? `${API.CLASSES}/${existingClass.id}`
        : API.CLASSES;

      await method(url, form, { withCredentials: true });
      onSuccess();
    } catch (err) {
      alert("수업 저장 실패");
    }
  };

  return (
    <Overlay>
      <Popup ref={ref}>
        <h3 style={{ marginBottom: "1.5rem" }}>
          {existingClass ? "수업 수정" : "새 수업 추가"}
        </h3>

        <FormGroup>
          <Label>학원 선택</Label>
          <ListBox>
            {academies.map((a) => (
              <ListItem
                key={a.id}
                selected={form.academyId === a.id}
                onClick={() =>
                  setForm((prev) => ({ ...prev, academyId: a.id }))
                }
              >
                {a.name}
              </ListItem>
            ))}
          </ListBox>
        </FormGroup>

        <FormGroup>
          <Label>수업 유형 선택</Label>
          <ListBox>
            {classTypes.map((t) => (
              <ListItem
                key={t.id}
                selected={form.classTypeId === t.id}
                onClick={() =>
                  setForm((prev) => ({ ...prev, classTypeId: t.id }))
                }
              >
                {t.name}
              </ListItem>
            ))}
          </ListBox>
        </FormGroup>

        <FormGroup>
          <Label>요일</Label>
          <Select name="days" value={form.days} onChange={handleChange}>
            <option value="MONDAY">월요일</option>
            <option value="TUESDAY">화요일</option>
            <option value="WEDNESDAY">수요일</option>
            <option value="THURSDAY">목요일</option>
            <option value="FRIDAY">금요일</option>
            <option value="SATURDAY">토요일</option>
            <option value="SUNDAY">일요일</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>시작 시간</Label>
          <Input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>종료 시간</Label>
          <Input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          />
        </FormGroup>

        <ButtonRow>
          <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
          <CancelButton onClick={onClose}>닫기</CancelButton>
        </ButtonRow>
      </Popup>
    </Overlay>
  );
}
