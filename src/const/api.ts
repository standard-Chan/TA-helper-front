const BASE_URL = "http://localhost:8080";

export const API = {
  BASE: BASE_URL,

  // 인증 관련
  LOGIN: `${BASE_URL}/api/login`,
  // 공지사항
  NOTICES: `${BASE_URL}/api/notices`,
  NOTICE_DETAILS: `${BASE_URL}/api/notices/details`,
  //학원
  ACADEMY: `${BASE_URL}/api/academies`,
  // 수업
  CLASSES: `${BASE_URL}/api/classes`,
  // 수업유형 (ClassType)
  CLASS_TYPE: `${BASE_URL}/api/class-types`,
  // 학생
  STUDENTS: `${BASE_URL}/api/students`,
  // 조교
  STAFFS: `${BASE_URL}/api/staffs`,
  STAFF_ROLE: `${BASE_URL}/api/staffs/me`,
  // 주간 기록
  WEEKLY_RECORDS: `${BASE_URL}/api/weekly-records`,
  // 보충 수업
  EXTRA_CLASSES: `${BASE_URL}/api/extra-classes`,
  // 주간 보충수업 기록
  WEEKLY_EXTRA_RECORDS: `${BASE_URL}/api/weekly-extra-records`,
};

