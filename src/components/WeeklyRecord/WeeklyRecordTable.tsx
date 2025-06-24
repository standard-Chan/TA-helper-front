// components/WeeklyRecord/WeeklyRecordTable.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  table-layout: fixed; // ✅ 고정 폭 테이블
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
  cursor: pointer;
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
  background-color: #f8f9fa; // 더 자연스러운 연회색
  text-align: center;
  border-radius: 4px;

  &:focus {
    background-color: #e9f2ff; // 포커스 시 은은한 블루
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
  appearance: none;

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

export default function WeeklyRecordTable({ records }: { records: any[] }) {
  const [localRecords, setLocalRecords] = useState<any[]>([]);

  useEffect(() => {
    setLocalRecords(records);
  }, [records]);

  const handleChange = (idx: number, field: string, value: string | number | boolean) => {
    const updated = [...localRecords];
    updated[idx][field] = value;
    setLocalRecords(updated);
  };

  const handleSave = () => {
    console.log("💾 저장된 값:", localRecords);
    alert("수정한 데이터가 저장되었습니다 (프론트에서만 반영됨)");
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
            <Th>시험 점수</Th>
            <Th>과제 점수</Th>
            <Th>비고</Th>
          </tr>
        </thead>
        <tbody>
          {localRecords.map((r, idx) => (
            <tr key={r.id}>
              <Td>{r.student.name}</Td>
              <Td>{r.student.school}</Td>
              <Td>{r.student.age}</Td>

              {/* 출석 */}
              <Td>
                <Select
                  value={r.attended ? "✅" : "❌"}
                  onChange={(e) =>
                    handleChange(idx, "attended", e.target.value === "✅")
                  }
                >
                  <option value="✅">✅</option>
                  <option value="❌">❌</option>
                </Select>
              </Td>

              {/* 시험 점수 */}
              <Td>
                <Input
                  type="number"
                  value={r.testScore}
                  onChange={(e) =>
                    handleChange(idx, "testScore", Number(e.target.value))
                  }
                />
              </Td>

              {/* 과제 점수 */}
              <Td>
                <Input
                  type="number"
                  value={r.homeworkScore}
                  onChange={(e) =>
                    handleChange(idx, "homeworkScore", Number(e.target.value))
                  }
                />
              </Td>

              {/* 비고 */}
              <Td>
                <Textarea
                  value={r.note}
                  onChange={(e) =>
                    handleChange(idx, "note", e.target.value)
                  }
                />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
