import styled from "styled-components";

const Card = styled.div`
  background-color: #f1f1f1;
  flex: 1;
  height: 150px;
  padding: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: none;
  border: none;
  color: red;
  font-size: 1rem;
  cursor: pointer;
`;

interface Props {
  content: string;
  weekNo: number;
  createdAt: string;
  academyName: string;
  classTypeName: string;
  days: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export default function NoticeCard({
  content,
  weekNo,
  createdAt,
  academyName,
  classTypeName,
  days,
  onClick,
  onDelete,
}: Props) {
  const formattedDate = new Date(createdAt).toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <Card onClick={onClick}>
      <DeleteBtn
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onDelete?.();
        }}
      >
        🗑
      </DeleteBtn>
      <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
        📌 {weekNo}주차 · {formattedDate}
        <br />
        🏫 {academyName} - {classTypeName} ({days})
      </div>
      <div>{content}</div>
    </Card>
  );
}
