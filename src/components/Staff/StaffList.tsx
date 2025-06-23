import { useEffect, useState } from "react";
import axios from "axios";
import StaffItem from "./StaffItem";
import { API } from "../../const/api";
import type { Staff } from "../../types/types";
import styled from "styled-components";

const ListContainer = styled.div`
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface Props {
  onEdit: (staff: Staff) => void;
}

export default function StaffList({ onEdit }: Props) {
  const [list, setList] = useState<Staff[]>([]);

  const fetch = async () => {
    const res = await axios.get(API.STAFFS, { withCredentials: true });
    setList(res.data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("삭제할까요?")) return;
    await axios.delete(`${API.STAFFS}/${id}`, { withCredentials: true });
    await fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ListContainer>
      {list.map((s) => (
        <StaffItem key={s.id} staff={s} onEdit={onEdit} onDelete={handleDelete} />
      ))}
    </ListContainer>
  );
}
