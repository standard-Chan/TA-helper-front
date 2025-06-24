import styled from "styled-components";
import NoticeCard from "../components/Notice/NoticeCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../const/api";
import NoticePopup from "../components/Notice/NoticePopup";
import AcademyPopup from "../components/Academy/AcademyPopup";
import ClassTypePopup from "../components/ClassType/ClassTypePopup";
import StaffPopup from "../components/Staff/StaffPopup";
import type { Notice, Staff } from "../types/types";

const Container = styled.div`
  padding: 2rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 1.2rem;
`;

const Notices = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  & > div {
    scroll-snap-align: start;
    min-width: 300px;
    flex-shrink: 0;
  }
`;

const Divider = styled.hr`
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #ddd;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #333;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StyledButton = styled.button<{ color?: string }>`
  padding: 0.75rem;
  background-color: ${(props) => props.color || "#6c757d"};
  color: white;
  font-size: 0.95rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #444;
  }
`;

export default function MainPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isAcademyPopupOpen, setAcademyPopupOpen] = useState(false);
  const [isClassTypePopupOpen, setClassTypePopupOpen] = useState(false);
  const [isStaffPopupOpen, setStaffPopupOpen] = useState(false);

  const fetchNotices = async () => {
    try {
      const res = await axios.get(API.NOTICE_DETAILS, {
        withCredentials: true,
      });
      setNotices(res.data);
    } catch (err) {
      console.error("공지사항 불러오기 실패", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${API.NOTICES}/${id}`, { withCredentials: true });
      await fetchNotices();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  const handleStaffClick = async () => {
    try {
      const res = await axios.get<Staff>(API.STAFF_ROLE, {
        withCredentials: true,
      });
      if (res.data.role !== "ADMIN") {
        alert("관리자 권한이 있어야 조교를 관리할 수 있습니다.");
        return;
      }
      setStaffPopupOpen(true);
    } catch (err) {
      alert("권한 확인에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <Container>
      <Header>
        <div>금주의 공지사항</div>
        <StyledButton color="#007bff" onClick={() => setIsCreateMode(true)}>
          + 새 공지사항
        </StyledButton>
      </Header>

      <Notices>
        {notices.length === 0 ? (
          <div style={{ color: "#888", padding: "1rem" }}>
            📭 등록된 공지사항이 없습니다.
          </div>
        ) : (
          [...notices]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((notice) => (
              <NoticeCard
                key={notice.id}
                content={notice.content}
                weekNo={notice.weekNo}
                createdAt={notice.createdAt}
                academyName={notice.academyName}
                classTypeName={notice.classTypeName}
                days={notice.days}
                onClick={() => setSelectedNotice(notice)}
                onDelete={() => handleDelete(notice.id)}
              />
            ))
        )}
      </Notices>

      <Divider />

      <SectionTitle>📌 바로가기</SectionTitle>
      <ButtonGrid>
        <StyledButton color="#17a2b8" onClick={() => navigate("/regular")}>
          정규수업
        </StyledButton>
        <StyledButton color="#17a2b8" onClick={() => navigate("/extra")}>
          보충수업
        </StyledButton>
      </ButtonGrid>

      <Divider />
      
      <SectionTitle>📝 신규 등록</SectionTitle>
      <ButtonGrid>
        <StyledButton
          color="#28a745"
          onClick={() => navigate("/create/student")}
        >
          학생
        </StyledButton>
        <StyledButton color="#28a745" onClick={() => setAcademyPopupOpen(true)}>
          학원
        </StyledButton>
        <StyledButton
          color="#28a745"
          onClick={() => setClassTypePopupOpen(true)}
        >
          수업 유형
        </StyledButton>
        <StyledButton color="#28a745" onClick={handleStaffClick}>
          조교
        </StyledButton>
      </ButtonGrid>

      {selectedNotice && (
        <NoticePopup
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
          onUpdated={fetchNotices}
        />
      )}

      {isCreateMode && (
        <NoticePopup
          notice={{ id: -1, content: "", classId: 1, weekNo: 1 }}
          onClose={() => setIsCreateMode(false)}
          onUpdated={fetchNotices}
        />
      )}

      {isAcademyPopupOpen && (
        <AcademyPopup onClose={() => setAcademyPopupOpen(false)} />
      )}
      {isClassTypePopupOpen && (
        <ClassTypePopup onClose={() => setClassTypePopupOpen(false)} />
      )}
      {isStaffPopupOpen && (
        <StaffPopup onClose={() => setStaffPopupOpen(false)} />
      )}
    </Container>
  );
}
