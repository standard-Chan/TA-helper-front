import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../const/api";
import { dayMap } from "../../util/dayMap";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
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
  position: relative;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.8rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;

interface Props {
  studentId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WeeklyExtraRecordPopup({
  studentId,
  onClose,
  onSuccess,
}: Props) {
  const [extraClasses, setExtraClasses] = useState<any[]>([]);
  const [extraClassId, setExtraClassId] = useState<number | null>(null);
  const [weekNo, setWeekNo] = useState<number>(1);
  const [attendedTime, setAttendedTime] = useState("18:00");
  const [reason, setReason] = useState("");

  useEffect(() => {
    axios
      .get(API.EXTRA_CLASSES, { withCredentials: true })
      .then((res) => setExtraClasses(res.data))
      .catch((err) => console.error("보충수업 목록 불러오기 실패", err));
  }, []);

  const handleSubmit = async () => {
    if (!extraClassId || !weekNo) {
      alert("보충수업과 주차를 모두 입력해주세요.");
      return;
    }

    const payload = [
      {
        studentId,
        extraClassId,
        weekNo,
        reason,
        attended: true,
        attendedTime: attendedTime + ":00",
        exitTime: "20:00:00",
        testScore: 0,
      },
    ];

    try {
      await axios.post(API.WEEKLY_EXTRA_RECORDS, payload, {
        withCredentials: true,
      });
      alert("보충수업 기록이 추가되었습니다.");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("추가 실패", err);
      alert("추가 실패");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <Title>➕ 보충수업 추가</Title>

        <Label>보충수업</Label>
        <Select value={extraClassId ?? ""} onChange={(e) => setExtraClassId(Number(e.target.value))}>
          <option value="">선택하세요</option>
          {extraClasses.map((c) => (
            <option key={c.id} value={c.id}>
              {dayMap[c.days]} - {c.academyName}
            </option>
          ))}
        </Select>

        <Label>주차 (weekNo)</Label>
        <Input
          type="number"
          value={weekNo}
          onChange={(e) => setWeekNo(Number(e.target.value))}
        />

        <Label>출석 시간</Label>
        <Input
          type="time"
          value={attendedTime}
          onChange={(e) => setAttendedTime(e.target.value)}
        />

        <Label>사유</Label>
        <Textarea
          rows={3}
          placeholder="지각, 결석 등 메모"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <ButtonGroup>
          <Button onClick={handleSubmit}>추가</Button>
          <Button onClick={onClose} style={{ background: "#6c757d" }}>
            취소
          </Button>
        </ButtonGroup>
      </Popup>
    </Overlay>
  );
}
