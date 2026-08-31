/**
 * 대전대학교 학부 학과 → 주요 진로(세부 직업) → 기존 직무 엔진(job/sub) 매핑 데이터
 * - 학과 목록: 대전대학교 공식 홈페이지(www.dju.ac.kr) 단과대학/학과 메뉴 기준 (2026-08 조사)
 * - careers의 job/sub는 백엔드 /api/jobs 응답의 직군 13종·세부직무 이름과 반드시 일치해야 한다
 * - label은 학생 눈높이 진로명(면접 설정 화면 표시용). job/sub가 실제 질문 생성에 사용된다
 */
export const DEPARTMENTS = [
  /* ===== SW융합대학 ===== */
  { college: "SW융합대학", name: "컴퓨터공학과",
    careers: [
      { label: "백엔드 개발자", job: "개발", sub: "백엔드" },
      { label: "프론트엔드 개발자", job: "개발", sub: "프론트엔드" },
      { label: "모바일 앱 개발자", job: "개발", sub: "안드로이드" },
      { label: "AI 개발자", job: "데이터·AI", sub: "ML·AI" },
      { label: "IT 서비스 기획자", job: "데이터·AI", sub: "PM·기획" },
    ] },
  { college: "SW융합대학", name: "정보통신공학과",
    careers: [
      { label: "통신·네트워크 엔지니어", job: "연구·엔지니어링", sub: "전자·전기" },
      { label: "임베디드 개발자", job: "개발", sub: "임베디드" },
      { label: "백엔드 개발자", job: "개발", sub: "백엔드" },
      { label: "공기업 전산직", job: "공공·행정", sub: "공기업" },
      { label: "DevOps·인프라 엔지니어", job: "개발", sub: "DevOps" },
    ] },
  { college: "SW융합대학", name: "정보보안학과",
    careers: [
      { label: "정보보안 엔지니어", job: "개발", sub: "DevOps" },
      { label: "금융보안 담당자", job: "금융", sub: "리스크·심사" },
      { label: "공공기관 보안 담당", job: "공공·행정", sub: "공기업" },
      { label: "백엔드 개발자", job: "개발", sub: "백엔드" },
    ] },
  { college: "SW융합대학", name: "AI소프트웨어학부",
    careers: [
      { label: "AI 개발자", job: "데이터·AI", sub: "ML·AI" },
      { label: "데이터 분석가", job: "데이터·AI", sub: "데이터 분석" },
      { label: "백엔드 개발자", job: "개발", sub: "백엔드" },
      { label: "프론트엔드 개발자", job: "개발", sub: "프론트엔드" },
    ] },
  { college: "SW융합대학", name: "AI융합학과",
    careers: [
      { label: "AI 엔지니어", job: "데이터·AI", sub: "ML·AI" },
      { label: "데이터 엔지니어", job: "데이터·AI", sub: "데이터 엔지니어" },
      { label: "AI 서비스 기획자", job: "데이터·AI", sub: "PM·기획" },
    ] },
  { college: "SW융합대학", name: "빅데이터인공지능학과",
    careers: [
      { label: "데이터 분석가", job: "데이터·AI", sub: "데이터 분석" },
      { label: "데이터 엔지니어", job: "데이터·AI", sub: "데이터 엔지니어" },
      { label: "머신러닝 엔지니어", job: "데이터·AI", sub: "ML·AI" },
      { label: "데이터 프로덕트 기획자", job: "데이터·AI", sub: "PM·기획" },
    ] },
  { college: "SW융합대학", name: "핀테크학과",
    careers: [
      { label: "은행원", job: "금융", sub: "은행" },
      { label: "증권·핀테크 서비스 담당", job: "금융", sub: "증권·투자" },
      { label: "핀테크 백엔드 개발자", job: "개발", sub: "백엔드" },
      { label: "금융 데이터 분석가", job: "데이터·AI", sub: "데이터 분석" },
    ] },
  { college: "SW융합대학", name: "IT소프트웨어공학과",
    careers: [
      { label: "웹 프론트엔드 개발자", job: "개발", sub: "프론트엔드" },
      { label: "서버 개발자", job: "개발", sub: "백엔드" },
      { label: "iOS 앱 개발자", job: "개발", sub: "iOS" },
      { label: "DevOps 엔지니어", job: "개발", sub: "DevOps" },
    ] },

  /* ===== 공과대학 ===== */
  { college: "공과대학", name: "건축공학과",
    careers: [
      { label: "건설사 시공·현장 관리자", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "건축설비 엔지니어", job: "연구·엔지니어링", sub: "기계" },
      { label: "건설 공기업(LH 등)", job: "공공·행정", sub: "공기업" },
      { label: "공무원 시설직", job: "공공·행정", sub: "행정직" },
    ] },
  { college: "공과대학", name: "에너지신소재공학과",
    careers: [
      { label: "이차전지·소재 엔지니어", job: "연구·엔지니어링", sub: "화공·소재" },
      { label: "신소재 연구원", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "에너지 공기업", job: "공공·행정", sub: "공기업" },
    ] },
  { college: "공과대학", name: "소방방재학과",
    careers: [
      { label: "소방공무원", job: "공공·행정", sub: "경찰·소방" },
      { label: "산업안전 관리자", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "소방설비 엔지니어", job: "연구·엔지니어링", sub: "기계" },
      { label: "안전 관련 공기업", job: "공공·행정", sub: "공기업" },
    ] },
  { college: "공과대학", name: "반도체공학과",
    careers: [
      { label: "반도체 공정 엔지니어", job: "연구·엔지니어링", sub: "전자·전기" },
      { label: "반도체 장비 엔지니어", job: "연구·엔지니어링", sub: "기계" },
      { label: "반도체 소자 연구원", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "임베디드 개발자", job: "개발", sub: "임베디드" },
    ] },
  { college: "공과대학", name: "토목환경공학과",
    careers: [
      { label: "토목 시공·구조 엔지니어", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "환경 엔지니어", job: "연구·엔지니어링", sub: "화공·소재" },
      { label: "건설 공기업(도로·수자원·LH 등)", job: "공공·행정", sub: "공기업" },
      { label: "공무원 토목직", job: "공공·행정", sub: "행정직" },
    ] },
  { college: "공과대학", name: "건설안전공학과",
    careers: [
      { label: "건설 안전관리자", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "안전 공기업·공단", job: "공공·행정", sub: "공기업" },
      { label: "공무원 안전직", job: "공공·행정", sub: "행정직" },
    ] },

  /* ===== 보건의료과학대학 ===== */
  { college: "보건의료과학대학", name: "간호학과",
    careers: [
      { label: "임상 간호사", job: "의료·보건", sub: "간호사" },
      { label: "보건직 공무원", job: "의료·보건", sub: "보건직" },
      { label: "보건교사", job: "교육", sub: "교사" },
    ] },
  { college: "보건의료과학대학", name: "물리치료학과",
    careers: [
      { label: "물리치료사", job: "의료·보건", sub: "임상·검사" },
      { label: "보건직 공무원", job: "의료·보건", sub: "보건직" },
      { label: "스포츠 재활 트레이너", job: "교육", sub: "강사" },
    ] },
  { college: "보건의료과학대학", name: "임상병리학과",
    careers: [
      { label: "임상병리사", job: "의료·보건", sub: "임상·검사" },
      { label: "보건직 공무원", job: "의료·보건", sub: "보건직" },
      { label: "제약·바이오 연구원", job: "연구·엔지니어링", sub: "연구개발" },
    ] },
  { college: "보건의료과학대학", name: "응급구조학과",
    careers: [
      { label: "1급 응급구조사", job: "의료·보건", sub: "임상·검사" },
      { label: "소방공무원(구급대원)", job: "공공·행정", sub: "행정직" },
      { label: "보건직 공무원", job: "의료·보건", sub: "보건직" },
    ] },
  { college: "보건의료과학대학", name: "식품영양학과",
    careers: [
      { label: "영양사", job: "의료·보건", sub: "보건직" },
      { label: "식품 연구원", job: "연구·엔지니어링", sub: "화공·소재" },
      { label: "급식·외식 관리자", job: "서비스·유통", sub: "외식·식음" },
      { label: "영양교사", job: "교육", sub: "교사" },
    ] },
  { college: "보건의료과학대학", name: "보건의료경영학과",
    careers: [
      { label: "병원 행정·원무 담당자", job: "경영사무", sub: "총무" },
      { label: "보험심사 담당자", job: "금융", sub: "보험" },
      { label: "보건직 공무원", job: "의료·보건", sub: "보건직" },
      { label: "의료기관 기획 담당자", job: "경영사무", sub: "전략기획" },
    ] },
  { college: "보건의료과학대학", name: "화장품학과",
    careers: [
      { label: "화장품 연구원", job: "연구·엔지니어링", sub: "화공·소재" },
      { label: "뷰티 브랜드 마케터", job: "마케팅", sub: "브랜드" },
      { label: "화장품 품질관리 담당자", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "뷰티 MD", job: "서비스·유통", sub: "판매·MD" },
    ] },
  { college: "보건의료과학대학", name: "디지털헬스케어학과",
    careers: [
      { label: "헬스케어 서비스 기획자", job: "데이터·AI", sub: "PM·기획" },
      { label: "의료 데이터 분석가", job: "데이터·AI", sub: "데이터 분석" },
      { label: "보건직 공무원", job: "의료·보건", sub: "보건직" },
    ] },
  { college: "보건의료과학대학", name: "스포츠과학부",
    careers: [
      { label: "스포츠 지도자·트레이너", job: "교육", sub: "강사" },
      { label: "체육교사", job: "교육", sub: "교사" },
      { label: "스포츠 마케터", job: "마케팅", sub: "콘텐츠" },
    ] },

  /* ===== 한의과대학 ===== */
  { college: "한의과대학", name: "한의예과",
    careers: [
      { label: "한의사", job: "의료·보건", sub: "임상·검사" },
      { label: "한의학 연구원", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "보건직 공무원", job: "의료·보건", sub: "보건직" },
    ] },

  /* ===== 사회과학대학 ===== */
  { college: "사회과학대학", name: "군사학과",
    careers: [
      { label: "직업군인(장교)", job: "공공·행정", sub: "군인·국방" },
      { label: "군무원", job: "공공·행정", sub: "행정직" },
      { label: "군사경찰·경호 분야", job: "공공·행정", sub: "경찰·소방" },
      { label: "방위산업체 연구원", job: "연구·엔지니어링", sub: "연구개발" },
    ] },
  { college: "사회과학대학", name: "경찰학과",
    careers: [
      { label: "경찰공무원", job: "공공·행정", sub: "경찰·소방" },
      { label: "국방·수사기관 요원", job: "공공·행정", sub: "군인·국방" },
      { label: "기업 산업보안 담당자", job: "경영사무", sub: "총무" },
    ] },
  { college: "사회과학대학", name: "법·행정학부",
    careers: [
      { label: "일반행정직 공무원", job: "공공·행정", sub: "행정직" },
      { label: "공기업 사무직", job: "공공·행정", sub: "공기업" },
      { label: "법무·컴플라이언스 담당자", job: "경영사무", sub: "총무" },
      { label: "정책 연구원", job: "공공·행정", sub: "정책·기획" },
    ] },
  { college: "사회과학대학", name: "사회복지학과",
    careers: [
      { label: "사회복지사(복지관)", job: "공공·행정", sub: "행정직" },
      { label: "사회복지직 공무원", job: "공공·행정", sub: "행정직" },
      { label: "의료사회복지사", job: "의료·보건", sub: "보건직" },
      { label: "복지사업 기획자", job: "공공·행정", sub: "정책·기획" },
    ] },
  { college: "사회과학대학", name: "상담학과",
    careers: [
      { label: "전문상담교사", job: "교육", sub: "교사" },
      { label: "심리상담사", job: "의료·보건", sub: "보건직" },
      { label: "기업 HR·조직문화 담당자", job: "경영사무", sub: "인사(HR)" },
    ] },
  { college: "사회과학대학", name: "중등특수교육과",
    careers: [
      { label: "특수교사", job: "교육", sub: "교사" },
      { label: "특수교육 지원 강사", job: "교육", sub: "강사" },
      { label: "교육행정직 공무원", job: "공공·행정", sub: "행정직" },
    ] },

  /* ===== 경영대학 ===== */
  { college: "경영대학", name: "경영학부",
    careers: [
      { label: "전략기획 담당자", job: "경영사무", sub: "전략기획" },
      { label: "인사(HR) 담당자", job: "경영사무", sub: "인사(HR)" },
      { label: "재무·회계 담당자", job: "경영사무", sub: "재무·회계" },
      { label: "브랜드 마케터", job: "마케팅", sub: "브랜드" },
      { label: "B2B 영업 담당자", job: "영업", sub: "B2B 영업" },
    ] },
  { college: "경영대학", name: "비즈니스영어학과",
    careers: [
      { label: "해외영업 담당자", job: "영업", sub: "해외영업" },
      { label: "승무원", job: "서비스·유통", sub: "승무원" },
      { label: "영어 강사", job: "교육", sub: "강사" },
      { label: "무역사무 담당자", job: "영업", sub: "영업관리" },
    ] },
  { college: "경영대학", name: "비즈니스중국어학과",
    careers: [
      { label: "해외영업 담당자(중화권)", job: "영업", sub: "해외영업" },
      { label: "무역·물류 담당자", job: "영업", sub: "영업관리" },
      { label: "중국어 강사", job: "교육", sub: "강사" },
    ] },
  { college: "경영대학", name: "비즈니스일본어학과",
    careers: [
      { label: "해외영업 담당자(일본)", job: "영업", sub: "해외영업" },
      { label: "호텔리어", job: "서비스·유통", sub: "호텔" },
      { label: "일본어 강사", job: "교육", sub: "강사" },
    ] },
  { college: "경영대학", name: "물류통상학과",
    careers: [
      { label: "물류관리 전문가", job: "영업", sub: "영업관리" },
      { label: "해외영업·무역 담당자", job: "영업", sub: "해외영업" },
      { label: "물류·항만 공기업", job: "공공·행정", sub: "공기업" },
      { label: "유통 MD", job: "서비스·유통", sub: "판매·MD" },
    ] },
  { college: "경영대학", name: "산업·광고심리학과",
    careers: [
      { label: "광고기획자(AE)", job: "마케팅", sub: "브랜드" },
      { label: "HR·인재개발 담당자", job: "경영사무", sub: "인사(HR)" },
      { label: "소비자 리서치 분석가", job: "데이터·AI", sub: "데이터 분석" },
      { label: "콘텐츠 마케터", job: "마케팅", sub: "콘텐츠" },
    ] },

  /* ===== 디자인·아트대학 ===== */
  { college: "디자인·아트대학", name: "건축학과",
    careers: [
      { label: "건축 설계 디자이너", job: "디자인", sub: "제품 디자인" },
      { label: "건설사 시공·현장 관리자", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "공무원 건축직", job: "공공·행정", sub: "행정직" },
    ] },
  { college: "디자인·아트대학", name: "패션디자인·비즈니스학과",
    careers: [
      { label: "패션 디자이너", job: "디자인", sub: "제품 디자인" },
      { label: "패션 MD", job: "서비스·유통", sub: "판매·MD" },
      { label: "패션 브랜드 마케터", job: "마케팅", sub: "브랜드" },
    ] },
  { college: "디자인·아트대학", name: "뷰티디자인학과",
    careers: [
      { label: "뷰티 콘텐츠 크리에이터", job: "마케팅", sub: "SNS" },
      { label: "화장품 브랜드 마케터", job: "마케팅", sub: "브랜드" },
      { label: "뷰티 MD", job: "서비스·유통", sub: "판매·MD" },
    ] },
  { college: "디자인·아트대학", name: "커뮤니케이션디자인학과",
    careers: [
      { label: "그래픽 디자이너", job: "디자인", sub: "그래픽" },
      { label: "UI·UX 디자이너", job: "디자인", sub: "UI·UX" },
      { label: "영상·모션 디자이너", job: "디자인", sub: "영상·모션" },
      { label: "브랜드 마케터", job: "마케팅", sub: "브랜드" },
    ] },
  { college: "디자인·아트대학", name: "웹툰애니메이션학과",
    careers: [
      { label: "웹툰 작가", job: "미디어·콘텐츠", sub: "작가·기획" },
      { label: "애니메이터", job: "디자인", sub: "영상·모션" },
      { label: "콘텐츠 마케터", job: "마케팅", sub: "콘텐츠" },
    ] },
  { college: "디자인·아트대학", name: "공연예술영상콘텐츠학과",
    careers: [
      { label: "방송·공연 PD", job: "미디어·콘텐츠", sub: "PD" },
      { label: "영상 편집자", job: "미디어·콘텐츠", sub: "영상·편집" },
      { label: "공연·행사 기획자", job: "미디어·콘텐츠", sub: "작가·기획" },
    ] },

  /* ===== 혜화리버럴아츠칼리지 ===== */
  { college: "혜화리버럴아츠칼리지", name: "글로벌문화콘텐츠학전공",
    careers: [
      { label: "문화콘텐츠 기획자", job: "미디어·콘텐츠", sub: "작가·기획" },
      { label: "콘텐츠 마케터", job: "마케팅", sub: "콘텐츠" },
      { label: "문화·관광 공기업", job: "공공·행정", sub: "공기업" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "국어국문창작학전공",
    careers: [
      { label: "작가·스토리 기획자", job: "미디어·콘텐츠", sub: "작가·기획" },
      { label: "기자·에디터", job: "미디어·콘텐츠", sub: "기자·에디터" },
      { label: "국어 교사", job: "교육", sub: "교사" },
      { label: "콘텐츠 마케터", job: "마케팅", sub: "콘텐츠" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "역사문화학전공",
    careers: [
      { label: "학예사(큐레이터)", job: "공공·행정", sub: "행정직" },
      { label: "역사 교사", job: "교육", sub: "교사" },
      { label: "역사 콘텐츠 기획자", job: "미디어·콘텐츠", sub: "작가·기획" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "영미언어문화학전공",
    careers: [
      { label: "영어 교사", job: "교육", sub: "교사" },
      { label: "영어 강사", job: "교육", sub: "강사" },
      { label: "해외영업 담당자", job: "영업", sub: "해외영업" },
      { label: "승무원", job: "서비스·유통", sub: "승무원" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "경제학전공",
    careers: [
      { label: "은행원", job: "금융", sub: "은행" },
      { label: "증권 애널리스트", job: "금융", sub: "증권·투자" },
      { label: "공기업 사무직", job: "공공·행정", sub: "공기업" },
      { label: "경제 연구원", job: "교육", sub: "교수·연구" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "정치외교학전공",
    careers: [
      { label: "행정직 공무원", job: "공공·행정", sub: "행정직" },
      { label: "정책 연구원", job: "공공·행정", sub: "정책·기획" },
      { label: "기자", job: "미디어·콘텐츠", sub: "기자·에디터" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "생명과학전공",
    careers: [
      { label: "바이오 연구원", job: "연구·엔지니어링", sub: "연구개발" },
      { label: "제약회사 연구·QC", job: "연구·엔지니어링", sub: "화공·소재" },
      { label: "임상시험 코디네이터", job: "의료·보건", sub: "임상·검사" },
      { label: "생물 교사", job: "교육", sub: "교사" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "PPE(정치·경제·철학)전공",
    careers: [
      { label: "정책 기획자", job: "공공·행정", sub: "정책·기획" },
      { label: "기자·에디터", job: "미디어·콘텐츠", sub: "기자·에디터" },
      { label: "전략 컨설턴트", job: "경영사무", sub: "전략기획" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "MCS(수학·컴퓨터과학)전공",
    careers: [
      { label: "데이터 분석가", job: "데이터·AI", sub: "데이터 분석" },
      { label: "소프트웨어 개발자", job: "개발", sub: "백엔드" },
      { label: "수학 교사", job: "교육", sub: "교사" },
      { label: "금융 리스크 분석가", job: "금융", sub: "리스크·심사" },
    ] },
  { college: "혜화리버럴아츠칼리지", name: "학생설계전공",
    careers: [
      { label: "서비스 기획자", job: "데이터·AI", sub: "PM·기획" },
      { label: "창업가·스타트업 운영", job: "경영사무", sub: "전략기획" },
      { label: "콘텐츠 마케터", job: "마케팅", sub: "콘텐츠" },
    ] },

  /* ===== 미래인재융합대학 ===== */
  { college: "미래인재융합대학", name: "자유전공학부",
    careers: [
      { label: "행정직 공무원", job: "공공·행정", sub: "행정직" },
      { label: "서비스 기획자", job: "데이터·AI", sub: "PM·기획" },
      { label: "브랜드 마케터", job: "마케팅", sub: "브랜드" },
    ] },
  { college: "미래인재융합대학", name: "창업학부",
    careers: [
      { label: "창업가·스타트업 운영", job: "경영사무", sub: "전략기획" },
      { label: "온라인 셀러·MD", job: "서비스·유통", sub: "판매·MD" },
      { label: "SNS 마케터", job: "마케팅", sub: "SNS" },
    ] },
  { college: "미래인재융합대학", name: "융·복합학부",
    careers: [
      { label: "서비스 기획자", job: "데이터·AI", sub: "PM·기획" },
      { label: "경영지원 사무직", job: "경영사무", sub: "총무" },
      { label: "콘텐츠 마케터", job: "마케팅", sub: "콘텐츠" },
    ] },

  /* ===== 혜화커뮤니티칼리지 ===== */
  { college: "혜화커뮤니티칼리지", name: "케어복지학과",
    careers: [
      { label: "사회복지사", job: "공공·행정", sub: "행정직" },
      { label: "요양·케어 매니저", job: "의료·보건", sub: "보건직" },
      { label: "복지기관 행정 담당자", job: "경영사무", sub: "총무" },
    ] },
  { college: "혜화커뮤니티칼리지", name: "지식경영학과",
    careers: [
      { label: "경영지원 사무직", job: "경영사무", sub: "총무" },
      { label: "인사 담당자", job: "경영사무", sub: "인사(HR)" },
      { label: "영업관리 담당자", job: "영업", sub: "영업관리" },
    ] },
  { college: "혜화커뮤니티칼리지", name: "상담심리학과",
    careers: [
      { label: "심리상담사", job: "의료·보건", sub: "보건직" },
      { label: "상담 강사", job: "교육", sub: "강사" },
      { label: "기업 상담·HR 담당자", job: "경영사무", sub: "인사(HR)" },
    ] },
  { college: "혜화커뮤니티칼리지", name: "반려동물학과",
    careers: [
      { label: "반려동물 훈련·관리사", job: "교육", sub: "강사" },
      { label: "펫 산업 MD", job: "서비스·유통", sub: "판매·MD" },
      { label: "동물병원 스태프", job: "의료·보건", sub: "임상·검사" },
    ] },
  { college: "혜화커뮤니티칼리지", name: "스포츠과학과",
    careers: [
      { label: "퍼스널 트레이너", job: "교육", sub: "강사" },
      { label: "스포츠센터 매니저", job: "경영사무", sub: "총무" },
      { label: "스포츠 마케터", job: "마케팅", sub: "브랜드" },
    ] },
  { college: "혜화커뮤니티칼리지", name: "파크골프학과",
    careers: [
      { label: "파크골프 지도자", job: "교육", sub: "강사" },
      { label: "골프장·체육시설 운영자", job: "경영사무", sub: "총무" },
      { label: "스포츠 이벤트 기획자", job: "마케팅", sub: "콘텐츠" },
    ] },
  { college: "혜화커뮤니티칼리지", name: "서예미술학과",
    careers: [
      { label: "서예·미술 강사", job: "교육", sub: "강사" },
      { label: "작가·전시 기획자", job: "미디어·콘텐츠", sub: "작가·기획" },
      { label: "캘리그래피·그래픽 디자이너", job: "디자인", sub: "그래픽" },
    ] },
];

/* 단과대학 목록 (DEPARTMENTS 등장 순서 유지) */
export const COLLEGES = [...new Set(DEPARTMENTS.map((d) => d.college))];

// 공백 제거 + 소문자 정규화 (companies.js와 동일 규칙)
function normalize(str) {
  return String(str || "").toLowerCase().replace(/\s+/g, "");
}

/**
 * 학과 검색 (자동완성용)
 * - 학과명/단과대학명에 대해 공백 제거·소문자 부분일치
 * - 우선순위: 학과명 시작 일치 > 학과명 부분 일치 > 단과대학명 부분 일치
 * @param {string} query 검색어
 * @param {number} limit 최대 반환 개수 (기본 10)
 * @returns {Array} 매칭된 학과 객체 배열
 */
export function searchDepartments(query, limit = 10) {
  const q = normalize(query);
  if (!q) return [];

  const nameStarts = [];
  const namePartials = [];
  const collegePartials = [];

  for (const dept of DEPARTMENTS) {
    const name = normalize(dept.name);
    const college = normalize(dept.college);
    if (name.startsWith(q)) {
      nameStarts.push(dept);
    } else if (name.includes(q)) {
      namePartials.push(dept);
    } else if (college.includes(q)) {
      collegePartials.push(dept);
    }
  }

  return [...nameStarts, ...namePartials, ...collegePartials].slice(0, limit);
}
