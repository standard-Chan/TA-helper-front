import styled from "styled-components";
import NoticeCard from "../components/NoticeCard";
import ShortcutButton from "../components/ShortcutButton";
import CreateButton from "../components/CreateButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../const/api";
import NoticePopup from "../components/NoticePopup";
import AcademyPopup from "../components/Academy/AcademyPopup"; 

const Container = styled.div`
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Notices = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

interface Notice {
  id: number;
  content: string;
  classId: number;
  createdAt: string;
  weekNo: number;
  academyName: string;
  classTypeName: string;
  days: string;
}

export default function MainPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isAcademyPopupOpen, setAcademyPopupOpen] = useState(false); // ⬅️ 추가

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

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <Container>
      <Header>
        <div>금주의 공지사항</div>
        <button onClick={() => setIsCreateMode(true)}>+ 새 공지사항</button>
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
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

      <Grid>
        <div>
          <ShortcutButton label="정규수업" onClick={() => navigate("/regular")} />
          <ShortcutButton label="보충수업" onClick={() => navigate("/extra")} />
        </div>
        <div>
          <CreateButton label="학생" onClick={() => navigate("/create/student")} />
          <CreateButton label="학원" onClick={() => setAcademyPopupOpen(true)} />
          <CreateButton label="수업 유형" onClick={() => navigate("/create/class-type")} />
          <CreateButton label="조교" onClick={() => navigate("/create/staff")} />
        </div>
      </Grid>

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
    </Container>
  );
}
