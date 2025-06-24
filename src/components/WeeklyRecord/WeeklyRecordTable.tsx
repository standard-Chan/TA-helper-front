import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: center;
`;

export default function WeeklyRecordTable({ records }: { records: any[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>학생 ID</Th>
          <Th>출석</Th>
          <Th>시험 점수</Th>
          <Th>과제 점수</Th>
          <Th>비고</Th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id}>
            <Td>{r.studentId}</Td>
            <Td>{r.attended ? "✅" : "❌"}</Td>
            <Td>{r.testScore}</Td>
            <Td>{r.homeworkScore}</Td>
            <Td>{r.note}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
