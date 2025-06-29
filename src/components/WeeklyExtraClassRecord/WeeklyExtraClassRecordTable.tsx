import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../const/api";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  table-layout: fixed;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: center;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.4rem 0.5rem;
  font-size: 0.95rem;
  border: none;
  outline: none;
  background-color: #f8f9fa;
  text-align: center;
  border-radius: 4px;

  &:focus {
    background-color: #e9f2ff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.4rem 0.5rem;
  font-size: 0.95rem;
  resize: vertical;
  border: none;
  outline: none;
  background-color: #f8f9fa;
  border-radius: 4px;

  &:focus {
    background-color: #e9f2ff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.4rem 0.5rem;
  font-size: 0.95rem;
  border: none;
  outline: none;
  background-color: #f8f9fa;
  text-align: center;
  border-radius: 4px;

  &:focus {
    background-color: #e9f2ff;
  }
`;

const SaveButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
`;

export default function WeeklyExtraClassRecordTable({
  records,
  extraClassId,
  weekNo,
}: {
  records: any[];
  extraClassId: number;
  weekNo: number;
}) {
  const [localRecords, setLocalRecords] = useState<any[]>([]);

  useEffect(() => {
    setLocalRecords(records);
  }, [records]);

  const handleChange = (idx: number, field: string, value: any) => {
    const updated = [...localRecords];
    updated[idx][field] = value;
    setLocalRecords(updated);
  };

  const handleSave = async () => {
    try {
      const payload = localRecords.map((r) => ({
        studentId: r.student.id,
        extraClassId,
        weekNo,
        attended: r.attended,
        testScore: r.testScore,
        reason: r.reason,
        attendedTime: r.attendedTime,
        exitTime: r.exitTime,
      }));

      await axios.post(`${API.WEEKLY_EXTRA_RECORDS}`, payload, {
        withCredentials: true,
      });

      alert("저장 완료!");
    } catch (err) {
      console.error(err);
      alert("저장 실패");
    }
  };

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
        <SaveButton onClick={handleSave}>💾 저장</SaveButton>
      </div>
      <Table>
        <thead>
          <tr>
            <Th>학생 이름</Th>
            <Th>학교</Th>
            <Th>나이</Th>
            <Th>출석</Th>
            <Th>출석시간</Th>
            <Th>퇴실시간</Th>
            <Th>시험점수</Th>
            <Th>비고</Th>
          </tr>
        </thead>
        <tbody>
          {localRecords.map((r, idx) => (
            <tr key={r.student.id}>
              <Td>{r.student.name}</Td>
              <Td>{r.student.school}</Td>
              <Td>{r.student.age}</Td>
              <Td>
                <Select
                  value={r.attended ? "Y" : "N"}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChange(idx, "attended", e.target.value === "Y")
                  }
                >
                  <option value="Y">✅</option>
                  <option value="N">❌</option>
                </Select>
              </Td>
              <Td>
                <Input
                  type="time"
                  value={r.attendedTime?.slice(0, 5) || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(idx, "attendedTime", e.target.value + ":00")
                  }
                />
              </Td>
              <Td>
                <Input
                  type="time"
                  value={r.exitTime?.slice(0, 5) || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(idx, "exitTime", e.target.value + ":00")
                  }
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={r.testScore || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(idx, "testScore", Number(e.target.value))
                  }
                />
              </Td>
              <Td>
                <Textarea
                  value={r.reason || ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(idx, "reason", e.target.value)}
                />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
