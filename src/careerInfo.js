/**
 * 진로 탐색 화면 데이터
 * - CAREER_INFO: 진로 label(departments.js careers[].label) → 직무 안내
 *   does / skills / certs / projectRole / quant / qual / resumePoints / ncs / sources
 * - 내용은 NCS, 커리어넷, Q-Net 등 공식 자료 기준. 근거 없는 수치(평균 학점, 합격선)는 넣지 않는다
 * - RESUME_FORMS: 모든 직무 공통 자기소개서 양식. "[ ]" 부분은 화면에서 빈칸으로 표시된다
 */
export const CAREER_INFO = {
  "클라우드 엔지니어": {
    "does": [
      "고객사 기존 시스템 분석과 클라우드 환경 전환 기술지원",
      "클라우드 서버, 스토리지, 네트워크 서비스 설계와 구성",
      "CI/CD 설계에 따른 배포 환경 구성과 서비스 릴리즈",
      "클라우드 가상화 인프라 구축, 백업 복구, 유지보수"
    ],
    "skills": [
      "리눅스 서버 운영",
      "클라우드 서버와 스토리지 구성",
      "클라우드 네트워크 설계",
      "CI/CD 배포 환경 구성",
      "백업 복구와 보안 구성",
      "클라우드 비용 최적화 설계"
    ],
    "certs": [
      {
        "name": "AWS Certified Solutions Architect - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "공공기관 전산직 공고에서 응시자격이나 가점으로 인정되는 경우가 있어요"
      },
      {
        "name": "네트워크관리사 2급",
        "issuer": "한국정보통신자격협회(ICQA)",
        "type": "국가공인 민간자격"
      },
      {
        "name": "Certified Kubernetes Administrator (CKA)",
        "issuer": "The Linux Foundation(CNCF와 공동 개발)",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "서버 배포와 운영 담당",
      "클라우드 인프라 설계와 비용 관리 담당",
      "CI/CD 파이프라인 구성 담당"
    ],
    "quant": [
      "AWS Certified Solutions Architect - Associate 취득",
      "리눅스마스터 2급 취득",
      "정보처리기사 취득"
    ],
    "qual": [
      "클라우드에 직접 배포하고 운영한 팀 프로젝트",
      "기존 서버를 클라우드로 옮겨 본 전환 경험",
      "배포 계획서와 인프라 구성도 작성 경험",
      "장애 원인 분석과 복구 기록"
    ],
    "resumePoints": [
      "클라우드 서버, 스토리지, 네트워크를 직접 설계하고 구성한 경험",
      "CI/CD로 배포 환경을 만들고 서비스를 릴리즈한 경험",
      "기존 시스템을 분석해 클라우드 전환 문제를 해결한 과정"
    ],
    "ncs": "클라우드인프라스트럭쳐엔지니어링, 클라우드솔루션아키텍처, 클라우드플랫폼구축",
    "sources": [
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200044&ncsClCd=20010215&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=15"
      },
      {
        "label": "커리어넷 직업백과",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10031"
      },
      {
        "label": "AWS 자격 안내",
        "url": "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
      },
      {
        "label": "KAIT 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "ICQA 네트워크관리사",
        "url": "https://www.icqa.or.kr/cn/page/network"
      },
      {
        "label": "Linux Foundation CKA",
        "url": "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/"
      }
    ]
  },
  "통신·네트워크 엔지니어": {
    "does": [
      "사용 목적에 맞는 네트워크 시스템 기획, 분석, 설계, 구축",
      "네트워크 장비와 소프트웨어 설치, 기능과 성능 시험",
      "LAN, 무선LAN, 스위치 장비 구축과 네트워크 운용관리",
      "네트워크 고장 시 원인 파악과 복구"
    ],
    "skills": [
      "TCP/IP와 IP 라우팅 이해",
      "스위치와 라우터 장비 설정",
      "LAN과 무선LAN 설계",
      "패킷 분석과 장애 진단",
      "네트워크 보안 관리",
      "네트워크 품질 시험"
    ],
    "certs": [
      {
        "name": "정보통신기사",
        "issuer": "한국방송통신전파진흥원(KCA)",
        "type": "국가기술자격",
        "note": "공공기관 전산직 공고에서 응시자격이나 가점으로 인정되는 경우가 있어요"
      },
      {
        "name": "네트워크관리사 2급",
        "issuer": "한국정보통신자격협회(ICQA)",
        "type": "국가공인 민간자격"
      },
      {
        "name": "CCNA (Cisco Certified Network Associate)",
        "issuer": "Cisco",
        "type": "국제자격"
      },
      {
        "name": "무선설비기사",
        "issuer": "한국방송통신전파진흥원(KCA)",
        "type": "국가기술자격"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "공공기관 전산직 공고에서 응시자격이나 가점으로 인정되는 경우가 있어요"
      }
    ],
    "projectRole": [
      "네트워크 구성과 IP 설계 담당",
      "통신 연동과 패킷 분석 담당",
      "서버, 네트워크 장애 대응 담당"
    ],
    "quant": [
      "정보통신기사 취득",
      "네트워크관리사 2급 취득",
      "CCNA 취득"
    ],
    "qual": [
      "장비나 시뮬레이터로 소규모 망을 직접 구축한 경험",
      "패킷 캡처로 통신 문제 원인을 찾은 경험",
      "망 구성도와 품질 시험 결과 보고서 작성",
      "통신 분야 연구실이나 학부 연구생 경험"
    ],
    "resumePoints": [
      "네트워크 구조를 분석해 문제점과 개선책을 낸 경험",
      "기능성, 안정성, 확장성을 고려한 설계 근거",
      "장애 원인 파악과 신속한 복구 과정"
    ],
    "ncs": "네트워크구축, NW엔지니어링",
    "sources": [
      {
        "label": "커리어넷 직업백과",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=430"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200336&ncsClCd=20020103&ncsLclasCd=20&ncsMclasCd=02&ncsSclasCd=01&ncsSubdCd=03"
      },
      {
        "label": "KCA 국가기술자격검정",
        "url": "https://www.cq.or.kr/qh_quagm01_001.do"
      },
      {
        "label": "ICQA 네트워크관리사",
        "url": "https://www.icqa.or.kr/cn/page/network"
      },
      {
        "label": "Cisco CCNA",
        "url": "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      }
    ]
  },
  "임베디드 개발자": {
    "does": [
      "하드웨어 플랫폼 분석과 펌웨어 설계, 구현",
      "디바이스 드라이버 분석과 구현",
      "운영체제 커널 분석과 플랫폼별 이식",
      "임베디드 시스템 테스팅과 기술문서 작성"
    ],
    "skills": [
      "하드웨어 사양 분석",
      "펌웨어 구현",
      "디바이스 드라이버 구현",
      "임베디드 운영체제 이식",
      "오픈 플랫폼 활용",
      "엣지컴퓨팅 서비스 구현"
    ],
    "certs": [
      {
        "name": "임베디드기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "전자기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "펌웨어와 센서 제어 담당",
      "디바이스와 서버 통신 연동 담당",
      "하드웨어 테스트와 디버깅 담당"
    ],
    "quant": [
      "임베디드기사 취득",
      "정보처리기사 취득",
      "전자기사 취득"
    ],
    "qual": [
      "실제 보드에서 동작하는 펌웨어 프로젝트",
      "디바이스 드라이버 또는 운영체제 이식 실습",
      "IoT, 엣지 디바이스 공모전 출품",
      "하드웨어 사양서와 테스트 결과 문서화"
    ],
    "resumePoints": [
      "하드웨어 플랫폼을 이해하고 그에 맞게 소프트웨어를 최적화한 경험",
      "펌웨어, 드라이버, 애플리케이션 중 직접 구현한 계층과 근거",
      "테스팅과 기술문서로 결과를 검증한 과정"
    ],
    "ncs": "임베디드SW엔지니어링, 시스템SW엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400236&ncsClCd=20010203&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=03"
      },
      {
        "label": "커리어넷 직업백과",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=834"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1121"
      },
      {
        "label": "KAIT 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      }
    ]
  },
  "백엔드 개발자": {
    "does": [
      "요구사항 확인 후 서버 프로그램 구현",
      "외부 시스템과 주고받는 인터페이스 설계와 구현",
      "데이터 입출력 구현과 SQL 활용",
      "애플리케이션 테스트, 배포, 리팩토링"
    ],
    "skills": [
      "서버 프로그램 구현",
      "SQL과 데이터베이스 설계",
      "인터페이스 설계와 구현",
      "형상관리 도구 활용",
      "단위테스트와 디버깅",
      "웹 프레임워크 활용"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "공공기관 전산직 공고에서 응시자격이나 가점으로 인정되는 경우가 있어요"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공공기관 전산직 공고에서 응시자격이나 가점으로 인정되는 경우가 있어요"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격"
      },
      {
        "name": "AWS Certified Developer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "API 서버 설계와 구현 담당",
      "DB 모델링과 쿼리 담당",
      "배포와 버전관리 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "SQL 개발자(SQLD) 취득",
      "리눅스마스터 2급 취득"
    ],
    "qual": [
      "로그인, 데이터 저장 등 실제 기능을 갖춘 웹서비스 개발",
      "Git 기반 협업과 코드 리뷰 경험",
      "테스트 코드 작성과 리팩토링 경험",
      "배포 후 사용자 피드백 반영 경험"
    ],
    "resumePoints": [
      "산출물 완성도를 끝까지 챙긴 책임감",
      "개발 표준과 제품 품질을 지키려는 태도",
      "형상관리, 테스트 도구로 협업하고 디버깅한 경험"
    ],
    "ncs": "응용SW엔지니어링, DB엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "잡알리오 공고 원문",
        "url": "https://www.alio.go.kr/download/download.json?fileNo=3061951"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "데이터자격검정",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      },
      {
        "label": "KAIT 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      },
      {
        "label": "AWS 자격 안내",
        "url": "https://aws.amazon.com/certification/"
      }
    ]
  },
  "공기업 전산직": {
    "does": [
      "기관 정보시스템과 IT 인프라 구축, 운영",
      "업무시스템 개발과 유지보수",
      "정보화 사업 기획과 사업 관리",
      "시스템 점검, 모니터링과 장애 발생 시 조치"
    ],
    "skills": [
      "전산학 전공지식(프로그래밍, DB, OS, 자료구조 등)",
      "NCS 직업기초능력",
      "JAVA, OS, DB 실무 기술",
      "정보화 사업 관리와 사업계획서 작성",
      "계약 관련 법령과 규정 이해"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "한국전기안전공사 2026 신입 정보운영 응시자격 인정, 서류 전공자격 최고 배점(45점)"
      },
      {
        "name": "정보통신기사",
        "issuer": "한국방송통신전파진흥원(KCA)",
        "type": "국가기술자격",
        "note": "한국전기안전공사 2026 신입 정보운영 응시자격 인정, 서류 전공자격 최고 배점(45점)"
      },
      {
        "name": "정보보안기사",
        "issuer": "한국방송통신전파진흥원(KCA)",
        "type": "국가기술자격",
        "note": "한국전기안전공사 2026 신입 정보운영 45점 배점, 한국사회보장정보원 2026 공무직 전산초급(보안) 자격요건"
      },
      {
        "name": "컴퓨터시스템기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "한국전기안전공사 2026 신입 정보운영 응시자격 인정, 서류 전공자격 최고 배점(45점)"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "한국전기안전공사 2026 신입 정보운영 응시자격 인정, 서류 전공자격 30점"
      }
    ],
    "projectRole": [
      "업무시스템 기능 개발 담당",
      "서버, DB 운영과 보안 점검 담당",
      "요구사항 정리와 산출물 문서화 담당"
    ],
    "quant": [
      "정보처리기사 등 전산 기사 자격 취득(일부 기관 응시자격, 가점 자격)",
      "NCS 직업기초능력 필기 대비",
      "전공 필기 대비(프로그래밍, 소프트웨어공학, 데이터베이스, 운영체제, 네트워크 등)",
      "어학, 한국사 성적(기관별 배점 상이, 예: 한국전기안전공사 정보운영은 TOEIC 700점 이상부터 배점, 한국사능력검정시험 3급 이상 배점)"
    ],
    "qual": [
      "공공기관 체험형 인턴 수료(예: 한국전기안전공사 수료자 별도가점 5점)",
      "기관 주관 공모전 입상(예: 한국전기안전공사 대국민 공모전 장관상 이상 별도가점 5점)",
      "팀 목표 달성 과정의 갈등 극복 경험 정리",
      "전문성을 키운 교육, 프로젝트 경험 정리"
    ],
    "resumePoints": [
      "기관 핵심가치, 인재상에 맞는 구체적 경험 사례",
      "조직 내 어려움과 갈등을 극복한 본인 역할, 해결방법, 교훈",
      "전문성을 키운 노력과 입사 후 포부의 연결"
    ],
    "ncs": "IT시스템관리, IT기술지원, 응용SW엔지니어링, DB엔지니어링",
    "sources": [
      {
        "label": "잡알리오 공고 원문",
        "url": "https://job.alio.go.kr/recruitview.do?idx=298517"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202000029&ncsClCd=20010301&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=03&ncsSubdCd=01"
      },
      {
        "label": "커리어넷 직업백과",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=938"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1998"
      },
      {
        "label": "KCA 국가기술자격검정",
        "url": "https://www.cq.or.kr/qh_quagm01_001.do"
      },
      {
        "label": "데이터자격검정",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      }
    ],
    "recruitNotes": [
      "필기는 NCS 직업기초능력과 직무수행능력(전공)을 함께 보는 구성이 공식 공고에서 확인됨",
      "한국전기안전공사 2026 신입 정보운영: NCS 6개 영역 50문항과 전공(컴퓨터공학) 50문항, 시험 반영 NCS 30%와 전공 70%, 각 40점 미만 결격",
      "한국사회보장정보원 2026 제3차: 직업기초능력 50문항(PSAT, 모듈형 혼합)과 직무수행능력 50문항(사회보장지식 10, 전산학 일반 40), 한 과목이라도 40% 미만이면 불합격",
      "자격증 가점은 기관마다 인정 종목과 점수가 다르며 한국전기안전공사는 분야별 최상위 자격 1개만 인정",
      "일부 기관은 기사 자격을 응시자격으로 요구(예: 한국사회보장정보원 공무직 전산초급(일반) 기사 자격 취득자 또는 IT 경력자)"
    ]
  },
  "DevOps·인프라 엔지니어": {
    "does": [
      "CI/CD 설계에 따른 배포 환경 구성과 서비스 릴리즈",
      "개발자 환경 구축과 개발 환경 운영 지원",
      "서버, 스토리지, 네트워크 인프라 구성과 점검",
      "시스템 모니터링, 변경관리, 장애 예방과 조치"
    ],
    "skills": [
      "리눅스 서버 운영",
      "CI/CD 배포 환경 구성",
      "쿠버네티스 클러스터 운영",
      "Terraform 기반 인프라 자동화",
      "시스템 모니터링과 장애 대응",
      "변경관리와 형상관리"
    ],
    "certs": [
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격"
      },
      {
        "name": "Certified Kubernetes Administrator (CKA)",
        "issuer": "The Linux Foundation(CNCF와 공동 개발)",
        "type": "국제자격"
      },
      {
        "name": "AWS Certified CloudOps Engineer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      },
      {
        "name": "HashiCorp Terraform Associate",
        "issuer": "HashiCorp",
        "type": "국제자격"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "공공기관 전산직 공고에서 응시자격이나 가점으로 인정되는 경우가 있어요"
      }
    ],
    "projectRole": [
      "CI/CD 파이프라인 구축 담당",
      "서버, 컨테이너 운영과 모니터링 담당",
      "인프라 구성 자동화 담당"
    ],
    "quant": [
      "리눅스마스터 2급 취득",
      "CKA 취득",
      "AWS Certified CloudOps Engineer - Associate 취득"
    ],
    "qual": [
      "팀 프로젝트에 자동 배포를 직접 붙인 경험",
      "모니터링과 알림 구성 경험",
      "장애 회고 문서 작성 경험",
      "개발 팀원 개발 환경 구축을 지원한 경험"
    ],
    "resumePoints": [
      "배포 계획을 세우고 서비스를 릴리즈한 경험",
      "점검과 모니터링으로 문제를 미리 막은 사전 예방 활동",
      "개발자 환경 구축과 운영 지원으로 팀 생산성을 높인 협업"
    ],
    "ncs": "응용SW엔지니어링, 클라우드인프라스트럭쳐엔지니어링, 인프라스트럭쳐아키텍처구축, IT시스템관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "KAIT 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      },
      {
        "label": "Linux Foundation CKA",
        "url": "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/"
      },
      {
        "label": "AWS 자격 안내",
        "url": "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/"
      },
      {
        "label": "HashiCorp Terraform",
        "url": "https://developer.hashicorp.com/certifications/infrastructure-automation"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      }
    ]
  },
  "프론트엔드 개발자": {
    "does": [
      "기획서와 디자인 시안을 바탕으로 화면 설계와 화면 구현",
      "서버 API와 연결되는 인터페이스 구현과 데이터 입출력 처리",
      "UI 구현 점검, 브라우저별 테스트, 화면 오류 수정",
      "형상관리 도구로 코드 관리, 배포 후 리팩토링"
    ],
    "skills": [
      "HTML, CSS, JavaScript 기반 화면 구현",
      "UI 아키텍처와 화면 설계 이해",
      "인터페이스(API) 연동 구현",
      "애플리케이션 테스트 수행",
      "형상관리와 개발 환경 구축",
      "UI/UX 가이드 준수"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "관련부처 과학기술정보통신부, 응시자격은 Q-Net 종목 페이지 확인"
      },
      {
        "name": "정보처리산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호, 응시자격 제한 없음"
      }
    ],
    "projectRole": [
      "화면 설계와 UI 구현 담당",
      "API 연동과 상태 관리 담당",
      "UI 테스트와 반응형 점검 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "SQL 개발자(SQLD) 취득",
      "직접 만든 웹 화면 결과물을 담은 포트폴리오 사이트 1개 이상"
    ],
    "qual": [
      "로그인, 목록, 상세 화면을 갖춘 웹서비스 팀 프로젝트",
      "디자이너, 백엔드 개발자와 협업한 경험",
      "Git 기반 코드 리뷰와 배포 경험",
      "사용자 피드백을 반영해 화면을 개선한 경험"
    ],
    "resumePoints": [
      "요구사항을 화면 설계로 옮기고 구현까지 끝낸 경험",
      "UI 테스트와 구현 점검으로 품질을 지킨 과정",
      "형상관리와 협업 도구로 팀과 소통한 경험"
    ],
    "ncs": "응용SW엔지니어링, UI/UX엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 응용SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "NCS 국가직무능력표준 UI/UX엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500030&ncsClCd=20010207&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=07"
      },
      {
        "label": "커리어넷 직업백과 웹프로듀서",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=1096"
      },
      {
        "label": "Q-Net 국가기술자격 정보처리기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "한국데이터산업진흥원 SQLD",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      }
    ]
  },
  "모바일 앱 개발자": {
    "does": [
      "안드로이드 운영체제 기준으로 앱 화면과 기능 구현",
      "고객 요구사항 분석과 기술 검토, OS 버전별 변경 사항 확인",
      "서버 API 연동, 데이터 입출력, 앱 테스트와 오류 수정",
      "스토어 배포와 배포 후 수정, 사용자 안내"
    ],
    "skills": [
      "안드로이드 앱 구조와 화면 구현",
      "요구사항을 논리적으로 정리하는 수리, 논리력",
      "인터페이스(API) 연동 구현",
      "애플리케이션 테스트와 디버깅",
      "최신 모바일 기술 탐구",
      "형상관리 도구 활용"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷이 모바일앱개발자 관련 국가자격으로 제시"
      },
      {
        "name": "정보처리산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      }
    ],
    "projectRole": [
      "안드로이드 앱 화면과 기능 구현 담당",
      "서버 API 연동과 로컬 데이터 저장 담당",
      "스토어 배포와 사용자 피드백 대응 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "스토어에 실제 배포한 앱 1개 이상",
      "SQL 개발자(SQLD) 취득"
    ],
    "qual": [
      "기획부터 배포까지 마친 앱 팀 프로젝트",
      "기기별, OS 버전별 테스트와 오류 수정 경험",
      "앱 공모전이나 해커톤 참가",
      "사용자 리뷰를 반영한 업데이트 경험"
    ],
    "resumePoints": [
      "고객 요구사항을 논리적으로 정리해 앱 기능으로 구현한 경험",
      "최신 기술과 OS 변경 사항을 스스로 찾아 익힌 태도",
      "규칙에 따라 꾸준히 반복 작업을 끝내는 끈기"
    ],
    "ncs": "응용SW엔지니어링",
    "sources": [
      {
        "label": "커리어넷 직업백과 모바일앱개발자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10076"
      },
      {
        "label": "NCS 국가직무능력표준 응용SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "Q-Net 국가기술자격 정보처리기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "한국데이터산업진흥원 SQLD",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      }
    ]
  },
  "핀테크 백엔드 개발자": {
    "does": [
      "송금, 결제, 대출 같은 금융 서비스의 서버 기능 구현",
      "핀테크 요구사항 분석과 외부 금융 시스템 인터페이스 구현",
      "보안, 인증 기능 구현과 거래 데이터 입출력 처리",
      "핀테크 서비스 테스트, 배포, 운영 중 기술 문제 대응"
    ],
    "skills": [
      "서버 프로그램 구현",
      "SQL과 데이터베이스 설계",
      "핀테크 인터페이스 설계와 구현",
      "보안, 인증 설계 이해",
      "금융 서비스 흐름 이해",
      "테스트와 배포 자동화"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷이 핀테크 전문가 관련 국가자격으로 제시"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격",
        "note": "과학기술정보통신부 제2022-02호"
      },
      {
        "name": "AWS Certified Developer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "결제, 송금 API 서버 설계와 구현 담당",
      "인증, 보안 기능과 거래 DB 설계 담당",
      "외부 금융 API 연동과 테스트 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "SQL 개발자(SQLD) 취득",
      "리눅스마스터 2급 취득"
    ],
    "qual": [
      "결제나 송금 흐름을 구현한 모의 금융 서비스 프로젝트",
      "인증과 권한 관리를 직접 설계한 경험",
      "핀테크 공모전이나 금융권 IT 인턴 경험",
      "거래 오류와 장애를 분석하고 복구한 기록"
    ],
    "resumePoints": [
      "금융 서비스 요구사항을 분석해 서버 기능으로 구현한 경험",
      "보안과 인증을 고려해 설계한 과정",
      "운영 중 기술 문제를 끝까지 해결한 책임감"
    ],
    "ncs": "핀테크엔지니어링, 응용SW엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 핀테크엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202000220&ncsClCd=20010210&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=10"
      },
      {
        "label": "NCS 국가직무능력표준 응용SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "커리어넷 직업백과 핀테크 전문가",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10111"
      },
      {
        "label": "Q-Net 국가기술자격 정보처리기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "한국정보통신진흥협회 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      },
      {
        "label": "AWS 자격증 목록",
        "url": "https://aws.amazon.com/certification/"
      }
    ]
  },
  "웹 프론트엔드 개발자": {
    "does": [
      "웹사이트 화면 설계와 화면 구현, 반응형 레이아웃 작업",
      "웹 기획자, 디자이너, 서버 개발자와 협의해 기능 구현",
      "UI 구현 점검과 UI 테스트, 접속 환경별 오류 수정",
      "운영 중인 사이트 화면 갱신과 개편"
    ],
    "skills": [
      "HTML, CSS, JavaScript 기반 웹 화면 구현",
      "화면 설계서 이해와 UI 아키텍처 설계",
      "서버 인터페이스 연동",
      "UI 테스트와 디버깅",
      "새로운 웹 기술을 익히는 학습 능력",
      "형상관리 도구 활용"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "정보처리산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      }
    ],
    "projectRole": [
      "웹 화면 구현과 반응형 작업 담당",
      "API 연동과 화면 데이터 처리 담당",
      "UI 테스트와 접근성 점검 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "SQL 개발자(SQLD) 취득",
      "직접 만들어 공개한 웹사이트 1개 이상"
    ],
    "qual": [
      "인턴이나 실습으로 작은 웹사이트라도 직접 만든 경험",
      "기획자, 디자이너와 협업한 웹 팀 프로젝트",
      "Git으로 협업하고 배포까지 해 본 경험",
      "사용자 접속 환경별 문제를 찾아 고친 경험"
    ],
    "resumePoints": [
      "화면 설계부터 구현, 테스트까지 끝낸 경험",
      "여러 담당자와 의견을 조율하며 협업한 과정",
      "실무 경험으로 보여 주는 결과물 완성도"
    ],
    "ncs": "응용SW엔지니어링, UI/UX엔지니어링",
    "sources": [
      {
        "label": "커리어넷 직업백과 웹프로듀서",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=1096"
      },
      {
        "label": "NCS 국가직무능력표준 응용SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "NCS 국가직무능력표준 UI/UX엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500030&ncsClCd=20010207&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=07"
      },
      {
        "label": "Q-Net 국가기술자격 정보처리기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "한국데이터산업진흥원 SQLD",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      }
    ]
  },
  "서버 개발자": {
    "does": [
      "요구사항 확인 후 서버 프로그램 구현",
      "데이터베이스 설계와 데이터 입출력 구현",
      "외부 시스템과 연결되는 인터페이스 설계와 구현",
      "애플리케이션 테스트, 배포, 리팩토링"
    ],
    "skills": [
      "서버 프로그램 구현",
      "SQL과 데이터베이스 설계",
      "인터페이스(API) 설계와 구현",
      "리눅스 서버 환경 이해",
      "단위테스트와 디버깅",
      "형상관리와 배포 환경 구축"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격",
        "note": "과학기술정보통신부 제2022-02호"
      },
      {
        "name": "AWS Certified Developer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "API 서버 설계와 구현 담당",
      "DB 모델링과 쿼리 작성 담당",
      "서버 배포와 운영 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "SQL 개발자(SQLD) 취득",
      "리눅스마스터 2급 취득"
    ],
    "qual": [
      "회원가입, 데이터 저장 같은 실제 기능을 갖춘 서비스 개발",
      "클라우드 서버에 직접 배포하고 운영한 경험",
      "테스트 코드 작성과 리팩토링 경험",
      "장애 원인을 분석하고 기록한 경험"
    ],
    "resumePoints": [
      "요구사항을 서버 기능으로 설계하고 구현한 경험",
      "데이터 구조를 설계하고 성능 문제를 해결한 과정",
      "테스트와 배포까지 책임지고 마무리한 태도"
    ],
    "ncs": "응용SW엔지니어링, DB엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 응용SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "NCS 국가직무능력표준 DB엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202000222&ncsClCd=20010204&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=04"
      },
      {
        "label": "Q-Net 국가기술자격 정보처리기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "한국데이터산업진흥원 SQLD",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      },
      {
        "label": "한국정보통신진흥협회 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      },
      {
        "label": "AWS 자격증 목록",
        "url": "https://aws.amazon.com/certification/"
      }
    ]
  },
  "iOS 앱 개발자": {
    "does": [
      "애플 iOS 기준으로 앱 화면과 기능 구현",
      "고객 요구사항 분석, iOS 버전별 기술 변경 사항 확인",
      "서버 API 연동과 데이터 입출력, 앱 테스트와 오류 수정",
      "앱스토어 배포와 배포 후 수정"
    ],
    "skills": [
      "iOS 앱 구조와 화면 구현",
      "요구사항을 논리적으로 정리하는 수리, 논리력",
      "인터페이스(API) 연동 구현",
      "애플리케이션 테스트와 디버깅",
      "최신 모바일 기술 탐구",
      "형상관리 도구 활용"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷이 모바일앱개발자 관련 국가자격으로 제시"
      },
      {
        "name": "정보처리산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "iOS 앱 화면과 기능 구현 담당",
      "서버 API 연동과 데이터 처리 담당",
      "앱스토어 배포와 심사 대응 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "앱스토어에 실제 배포한 앱 1개 이상",
      "Swift로 만든 앱 포트폴리오"
    ],
    "qual": [
      "기획부터 배포까지 마친 iOS 앱 팀 프로젝트",
      "기기별, iOS 버전별 테스트와 오류 수정 경험",
      "앱 공모전이나 해커톤 참가",
      "사용자 리뷰를 반영한 업데이트 경험"
    ],
    "resumePoints": [
      "고객 요구사항을 논리적으로 정리해 앱 기능으로 구현한 경험",
      "최신 기술과 OS 변경 사항을 스스로 찾아 익힌 태도",
      "규칙에 따라 꾸준히 반복 작업을 끝내는 끈기"
    ],
    "ncs": "응용SW엔지니어링",
    "sources": [
      {
        "label": "커리어넷 직업백과 모바일앱개발자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10076"
      },
      {
        "label": "NCS 국가직무능력표준 응용SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "Q-Net 국가기술자격 정보처리기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      }
    ]
  },
  "소프트웨어 개발자": {
    "does": [
      "요구사항 분석과 애플리케이션 설계, 기능 모델링",
      "프로그래밍 언어와 자료구조를 활용한 모듈 구현",
      "통합 구현, 단위 테스트, 애플리케이션 테스트 수행",
      "제품 소프트웨어 패키징, 배포, 기술문서 작성"
    ],
    "skills": [
      "프로그래밍 언어 활용과 자료구조 활용",
      "소프트웨어공학과 개발 방법론 이해",
      "애플리케이션 설계(정적, 동적 모델)",
      "테스트와 디버깅",
      "리눅스 환경 이해",
      "수학적, 논리적 문제 해결력"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷이 시스템소프트웨어개발자 관련 국가자격으로 제시"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격",
        "note": "과학기술정보통신부 제2022-02호"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      }
    ],
    "projectRole": [
      "핵심 알고리즘과 모듈 구현 담당",
      "설계 문서와 테스트 계획 담당",
      "빌드, 패키징, 배포 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "리눅스마스터 2급 취득",
      "알고리즘 문제 풀이 기록(온라인 저지 풀이 수)"
    ],
    "qual": [
      "설계부터 테스트까지 거친 소프트웨어 팀 프로젝트",
      "알고리즘 경진대회나 프로그래밍 대회 참가",
      "오픈소스 기여나 코드 리뷰 경험",
      "수학 모델을 코드로 구현해 본 경험"
    ],
    "resumePoints": [
      "문제를 논리적으로 분석해 설계와 구현으로 옮긴 경험",
      "정해진 규칙과 개발 표준을 지키며 끝까지 완성한 태도",
      "새로운 기술을 스스로 탐구해 적용한 경험"
    ],
    "ncs": "응용SW엔지니어링, 시스템SW엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 응용SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300067&ncsClCd=20010202&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=02"
      },
      {
        "label": "NCS 국가직무능력표준 시스템SW엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300068&ncsClCd=20010208&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=08"
      },
      {
        "label": "커리어넷 직업백과 시스템소프트웨어개발자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=834"
      },
      {
        "label": "Q-Net 국가기술자격 정보처리기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "한국정보통신진흥협회 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      }
    ]
  },
  "AI 개발자": {
    "does": [
      "텍스트, 음성, 이미지 데이터 수집과 전처리",
      "머신러닝, 딥러닝 모델 설계와 학습, 성능 개선",
      "학습한 모델을 서비스 애플리케이션에 적용하고 인터페이스 개발",
      "AI 서비스 테스트와 모델 활용 관리"
    ],
    "skills": [
      "파이썬 기반 데이터 전처리",
      "머신러닝, 딥러닝 알고리즘 이해",
      "수학(미적분, 선형대수)과 통계 기초",
      "인공지능 모델 학습과 평가",
      "모델을 서비스에 적용하는 구현 능력",
      "데이터 품질 검증"
    ],
    "certs": [
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원(국가기술자격법에 따른 위탁 시행)",
        "type": "국가기술자격",
        "note": "대학 졸업(예정)자 등 응시자격 있음"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "데이터분석준전문가(ADsP : Advanced Data Analytics Semi-Professional)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호, 응시자격 제한 없음"
      },
      {
        "name": "AWS Certified Machine Learning Engineer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "데이터 수집, 전처리 담당",
      "모델 설계, 학습, 성능 평가 담당",
      "모델을 API로 서비스에 붙이는 담당"
    ],
    "quant": [
      "빅데이터분석기사 취득",
      "정보처리기사 취득",
      "데이터분석준전문가(ADsP) 취득",
      "AI 경진대회 참가 기록과 순위"
    ],
    "qual": [
      "알고리즘 경진대회, AI 해커톤, 데이터 사이언스 공모전 참가",
      "모델 학습부터 서비스 적용까지 마친 팀 프로젝트",
      "파이썬 동아리나 스터디 활동",
      "수학, 통계 과목을 깊이 공부한 기록"
    ],
    "resumePoints": [
      "원하는 결과가 안 나올 때 원인을 하나씩 파고든 탐구 과정",
      "경진대회 입상이나 프로젝트 포트폴리오로 보여 주는 문제 해결 역량",
      "데이터 수집, 모델 학습, 성능 개선을 직접 수행한 경험"
    ],
    "ncs": "인공지능모델링, 인공지능서비스구현",
    "sources": [
      {
        "label": "커리어넷 직업백과 인공지능 엔지니어",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10117"
      },
      {
        "label": "NCS 국가직무능력표준 인공지능모델링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300066&ncsClCd=20010703&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=03"
      },
      {
        "label": "NCS 국가직무능력표준 인공지능서비스구현",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400242&ncsClCd=20010705&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=05"
      },
      {
        "label": "한국데이터산업진흥원 빅데이터분석기사",
        "url": "https://www.dataq.or.kr/www/sub/a_07.do"
      },
      {
        "label": "한국데이터산업진흥원 ADsP",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      },
      {
        "label": "AWS 자격증 목록",
        "url": "https://aws.amazon.com/certification/"
      }
    ]
  },
  "IT 서비스 기획자": {
    "does": [
      "서비스 아이디어와 시장, 사용자 요구를 조사해 기획안 작성",
      "화면 흐름과 기능 명세 정리, 개발자와 디자이너에게 전달",
      "프로젝트 일정, 범위, 품질 관리 보조",
      "출시 후 이용 현황 분석과 개선안 도출"
    ],
    "skills": [
      "IT 비즈니스 환경분석",
      "요구사항 정리와 기능 명세 작성",
      "프로젝트 일정과 범위 관리",
      "데이터 기반 이용 현황 분석",
      "여러 담당자 의견을 조율하는 소통 능력",
      "창의력과 기획력"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷이 IT컨설턴트 관련 국가자격으로 제시"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      },
      {
        "name": "데이터분석준전문가(ADsP : Advanced Data Analytics Semi-Professional)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호"
      }
    ],
    "projectRole": [
      "서비스 기획서와 화면 설계서 작성 담당",
      "일정과 범위 관리 담당",
      "사용자 조사와 결과 분석 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "SQL 개발자(SQLD) 취득",
      "데이터분석준전문가(ADsP) 취득"
    ],
    "qual": [
      "기획자 역할로 참여한 서비스 개발 팀 프로젝트",
      "웹프로그래머나 개발 인턴으로 실무를 익힌 경험",
      "사용자 인터뷰나 설문으로 요구를 조사한 경험",
      "창업 동아리나 아이디어 공모전 참가"
    ],
    "resumePoints": [
      "사용자와 시장을 조사해 기획안으로 정리한 경험",
      "개발자, 디자이너 등 여러 담당자를 조율해 결과를 낸 경험",
      "출시 후 데이터를 보고 개선한 과정"
    ],
    "ncs": "정보기술기획, SW제품기획, IT프로젝트관리",
    "sources": [
      {
        "label": "커리어넷 직업백과 웹프로듀서",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=1096"
      },
      {
        "label": "커리어넷 직업백과 IT컨설턴트",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=450"
      },
      {
        "label": "NCS 국가직무능력표준 정보기술기획",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202000036&ncsClCd=20010103&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=03"
      },
      {
        "label": "NCS 국가직무능력표준 SW제품기획",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202000037&ncsClCd=20010104&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=04"
      },
      {
        "label": "NCS 국가직무능력표준 IT프로젝트관리",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200082&ncsClCd=20010401&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=04&ncsSubdCd=01"
      },
      {
        "label": "한국데이터산업진흥원 ADsP",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      }
    ]
  },
  "데이터 분석가": {
    "does": [
      "분석 목적에 맞게 데이터 수집과 전처리",
      "탐색적 데이터 분석과 피처 엔지니어링",
      "분석 모델링과 결과 평가",
      "분석 결과 시각화와 보고서 작성"
    ],
    "skills": [
      "통계 이론과 수리, 논리력",
      "SQL과 데이터 전처리",
      "탐색적 데이터 분석",
      "분석 결과 시각화",
      "꼼꼼한 데이터 검증",
      "분석 결과를 설명하는 글쓰기"
    ],
    "certs": [
      {
        "name": "데이터분석준전문가(ADsP : Advanced Data Analytics Semi-Professional)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호, 응시자격 제한 없음"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      },
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원(국가기술자격법에 따른 위탁 시행)",
        "type": "국가기술자격",
        "note": "대학 졸업(예정)자 등 응시자격 있음, 커리어넷 빅 데이터 전문가 관련 자격"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(관련부처 통계청)",
        "type": "국가기술자격"
      },
      {
        "name": "데이터분석전문가(ADP : Advanced Data Analytics Professional)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "학사는 실무경력 3년 등 응시자격 있어 신입은 ADsP부터"
      }
    ],
    "projectRole": [
      "데이터 수집과 전처리 담당",
      "탐색적 분석과 모델링 담당",
      "시각화 대시보드와 결과 보고서 담당"
    ],
    "quant": [
      "데이터분석준전문가(ADsP) 취득",
      "SQL 개발자(SQLD) 취득",
      "빅데이터분석기사 취득",
      "데이터 분석 공모전 참가 기록"
    ],
    "qual": [
      "공공데이터를 활용한 분석 프로젝트와 보고서",
      "데이터 분석 공모전이나 경진대회 참가",
      "통계, 컴퓨터공학, 경영 과목을 함께 공부한 기록",
      "분석 결과를 발표하고 피드백 받은 경험"
    ],
    "resumePoints": [
      "데이터의 구조를 이해하고 문제를 여러 관점에서 분석한 경험",
      "방대한 데이터를 꼼꼼하게 탐구해 오류를 찾아낸 과정",
      "분석 결과를 시각화와 글로 설득력 있게 전달한 경험"
    ],
    "ncs": "빅데이터분석",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 빅데이터분석",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200084&ncsClCd=20010105&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=05"
      },
      {
        "label": "커리어넷 직업백과 빅 데이터 전문가",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10032"
      },
      {
        "label": "커리어넷 직업백과 데이터마이너",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10051"
      },
      {
        "label": "한국데이터산업진흥원 ADsP",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      },
      {
        "label": "한국데이터산업진흥원 SQLD",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      },
      {
        "label": "한국데이터산업진흥원 빅데이터분석기사",
        "url": "https://www.dataq.or.kr/www/sub/a_07.do"
      },
      {
        "label": "한국데이터산업진흥원 ADP",
        "url": "https://www.dataq.or.kr/www/sub/a_05.do"
      }
    ]
  },
  "AI 엔지니어": {
    "does": [
      "AI 모델 학습과 서비스 운영에 필요한 플랫폼 환경 구성",
      "학습된 모델을 서비스 애플리케이션과 인터페이스에 적용",
      "생성형 AI 모델 선정, 프롬프트 구현과 최적화",
      "AI 서비스 테스트, 배포, 자원 구성과 안전성 검토"
    ],
    "skills": [
      "파이썬과 머신러닝, 딥러닝 프레임워크 활용",
      "모델 배포와 서비스 인프라 구성",
      "클라우드와 리눅스 환경 이해",
      "생성형 AI 모델 활용과 프롬프트 설계",
      "데이터 수집, 전처리",
      "성능 측정과 개선"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원(국가기술자격법에 따른 위탁 시행)",
        "type": "국가기술자격",
        "note": "대학 졸업(예정)자 등 응시자격 있음"
      },
      {
        "name": "AWS Certified AI Practitioner",
        "issuer": "Amazon Web Services",
        "type": "국제자격",
        "note": "Foundational 등급"
      },
      {
        "name": "AWS Certified Machine Learning Engineer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "모델 서빙 API와 배포 환경 구성 담당",
      "생성형 AI 기능 설계와 프롬프트 최적화 담당",
      "데이터 파이프라인과 학습 환경 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "빅데이터분석기사 취득",
      "AWS Certified AI Practitioner 취득",
      "AI 해커톤, 경진대회 참가 기록"
    ],
    "qual": [
      "모델을 실제 서비스로 배포해 본 팀 프로젝트",
      "AI 해커톤이나 데이터 사이언스 공모전 참가",
      "클라우드에서 학습 환경을 구성한 경험",
      "기업 인턴십이나 산학 프로젝트 참여"
    ],
    "resumePoints": [
      "모델 학습부터 서비스 적용까지 직접 수행한 프로젝트 경험",
      "결과가 안 나올 때 원인을 파고들어 개선한 탐구 과정",
      "빠른 기술 변화를 따라가며 스스로 학습한 태도"
    ],
    "ncs": "인공지능서비스구현, 인공지능플랫폼구축, 생성형AI엔지니어링",
    "sources": [
      {
        "label": "커리어넷 직업백과 인공지능 엔지니어",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10117"
      },
      {
        "label": "NCS 국가직무능력표준 인공지능서비스구현",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400242&ncsClCd=20010705&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=05"
      },
      {
        "label": "NCS 국가직무능력표준 인공지능플랫폼구축",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300065&ncsClCd=20010701&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=01"
      },
      {
        "label": "NCS 국가직무능력표준 생성형AI엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500069&ncsClCd=20010707&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=07"
      },
      {
        "label": "한국데이터산업진흥원 빅데이터분석기사",
        "url": "https://www.dataq.or.kr/www/sub/a_07.do"
      },
      {
        "label": "AWS 자격증 목록",
        "url": "https://aws.amazon.com/certification/"
      }
    ]
  },
  "데이터 엔지니어": {
    "does": [
      "빅데이터 수집, 저장, 처리 시스템 개발",
      "데이터 파이프라인(플로우) 구성과 운영",
      "데이터 품질 관리와 플랫폼 모니터링",
      "분석가가 쓸 수 있도록 데이터베이스 설계와 제공"
    ],
    "skills": [
      "SQL과 데이터베이스 설계",
      "리눅스 서버와 클라우드 환경 이해",
      "데이터 수집, 처리 시스템 개발",
      "데이터 플로우 관리",
      "데이터 품질 관리",
      "프로그래밍 언어 활용"
    ],
    "certs": [
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격",
        "note": "과학기술정보통신부 제2022-02호"
      },
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원(국가기술자격법에 따른 위탁 시행)",
        "type": "국가기술자격"
      },
      {
        "name": "AWS Certified Data Engineer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "데이터 수집과 저장 파이프라인 구축 담당",
      "DB 설계와 데이터 품질 점검 담당",
      "서버, 클라우드 환경 운영 담당"
    ],
    "quant": [
      "SQL 개발자(SQLD) 취득",
      "정보처리기사 취득",
      "리눅스마스터 2급 취득",
      "빅데이터분석기사 취득"
    ],
    "qual": [
      "실시간 또는 대용량 데이터를 수집해 저장하는 파이프라인 프로젝트",
      "클라우드에서 데이터 저장소를 구성하고 운영한 경험",
      "분석가, 개발자와 협업해 데이터를 제공한 경험",
      "데이터 오류를 찾아 품질을 개선한 기록"
    ],
    "resumePoints": [
      "데이터 수집부터 저장, 처리까지 시스템을 직접 만든 경험",
      "데이터 품질과 안정적인 운영을 책임진 과정",
      "새로운 데이터 기술을 수시로 파악해 적용한 태도"
    ],
    "ncs": "빅데이터플랫폼구축, 빅데이터운영·관리, DB엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 빅데이터플랫폼구축",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400237&ncsClCd=20010209&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=09"
      },
      {
        "label": "NCS 국가직무능력표준 빅데이터운영·관리",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400238&ncsClCd=20010304&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=03&ncsSubdCd=04"
      },
      {
        "label": "NCS 국가직무능력표준 DB엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202000222&ncsClCd=20010204&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=04"
      },
      {
        "label": "커리어넷 직업백과 빅 데이터 전문가",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10032"
      },
      {
        "label": "한국데이터산업진흥원 SQLD",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      },
      {
        "label": "한국정보통신진흥협회 리눅스마스터",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      },
      {
        "label": "AWS 자격증 목록",
        "url": "https://aws.amazon.com/certification/"
      }
    ]
  },
  "AI 서비스 기획자": {
    "does": [
      "AI로 해결할 문제와 서비스 목표 정의",
      "서비스 시나리오와 요건 정의서 작성, 필요한 데이터 기획",
      "AI 모델 활용 방안과 실행계획 수립",
      "서비스 성과 지표 설계와 결과 평가"
    ],
    "skills": [
      "AI 기술의 가능성과 한계 이해",
      "데이터 기획과 데이터 분석 기초",
      "서비스 시나리오와 요건 정의 작성",
      "성과 지표 설계",
      "개발자, 데이터 담당자와 소통하는 능력",
      "시장과 사용자 조사"
    ],
    "certs": [
      {
        "name": "데이터분석준전문가(ADsP : Advanced Data Analytics Semi-Professional)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호, 응시자격 제한 없음"
      },
      {
        "name": "SQL 개발자(SQLD : SQL Developer)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "AWS Certified AI Practitioner",
        "issuer": "Amazon Web Services",
        "type": "국제자격",
        "note": "Foundational 등급"
      }
    ],
    "projectRole": [
      "문제 정의와 서비스 시나리오 작성 담당",
      "학습 데이터 기획과 수집 계획 담당",
      "성과 지표 설계와 사용자 테스트 담당"
    ],
    "quant": [
      "데이터분석준전문가(ADsP) 취득",
      "SQL 개발자(SQLD) 취득",
      "AWS Certified AI Practitioner 취득"
    ],
    "qual": [
      "AI 기능이 들어간 서비스를 기획한 팀 프로젝트",
      "AI 해커톤이나 아이디어 공모전에서 기획 역할",
      "사용자 조사와 요건 정의서 작성 경험",
      "파이썬으로 간단한 모델을 직접 돌려 본 경험"
    ],
    "resumePoints": [
      "AI로 풀 문제를 정의하고 서비스 목표로 연결한 경험",
      "데이터와 모델의 한계를 이해하고 요건을 정리한 과정",
      "개발자와 협업해 기획을 결과물로 만든 경험"
    ],
    "ncs": "인공지능서비스기획, 빅데이터기획",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 인공지능서비스기획",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200394&ncsClCd=20010702&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=02"
      },
      {
        "label": "NCS 국가직무능력표준 빅데이터기획",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400235&ncsClCd=20010107&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=07"
      },
      {
        "label": "커리어넷 직업백과 인공지능 엔지니어",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10117"
      },
      {
        "label": "커리어넷 직업백과 웹프로듀서",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=1096"
      },
      {
        "label": "한국데이터산업진흥원 ADsP",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      },
      {
        "label": "AWS 자격증 목록",
        "url": "https://aws.amazon.com/certification/"
      }
    ]
  },
  "머신러닝 엔지니어": {
    "does": [
      "문제 정의에 맞는 데이터 확보, 전처리, 특징 추출",
      "머신러닝, 딥러닝 모델 학습과 모델 선정",
      "학습한 모델의 성능 평가와 활용 관리",
      "생성형 AI 모델 선정, 학습, 프롬프트 최적화"
    ],
    "skills": [
      "파이썬과 머신러닝 라이브러리 활용",
      "수학(미적분, 선형대수)과 통계",
      "데이터 전처리와 특징 추출",
      "모델 학습, 평가, 튜닝",
      "데이터 품질 검증",
      "실험 결과를 기록하고 재현하는 습관"
    ],
    "certs": [
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원(국가기술자격법에 따른 위탁 시행)",
        "type": "국가기술자격",
        "note": "대학 졸업(예정)자 등 응시자격 있음"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "AWS Certified Machine Learning Engineer - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      },
      {
        "name": "Professional Machine Learning Engineer",
        "issuer": "Google Cloud",
        "type": "국제자격",
        "note": "응시 제한은 없으나 권장 경력 3년 이상"
      }
    ],
    "projectRole": [
      "데이터 전처리와 특징 추출 담당",
      "모델 학습, 실험, 성능 비교 담당",
      "모델 결과 검증과 문서화 담당"
    ],
    "quant": [
      "빅데이터분석기사 취득",
      "정보처리기사 취득",
      "AI 경진대회 참가 기록과 순위",
      "AWS Certified Machine Learning Engineer - Associate 취득"
    ],
    "qual": [
      "알고리즘 경진대회, AI 해커톤, 데이터 사이언스 공모전 참가",
      "모델 성능을 단계적으로 개선한 실험 기록",
      "파이썬 동아리나 스터디 활동",
      "수학, 통계를 깊이 공부한 과목 이력"
    ],
    "resumePoints": [
      "데이터 확보부터 모델 학습, 성능 개선까지 직접 수행한 경험",
      "결과가 안 나올 때 원인을 하나씩 파고든 탐구 과정",
      "경진대회나 프로젝트 포트폴리오로 보여 주는 실력"
    ],
    "ncs": "인공지능모델링, 생성형AI엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 인공지능모델링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300066&ncsClCd=20010703&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=03"
      },
      {
        "label": "NCS 국가직무능력표준 생성형AI엔지니어링",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500069&ncsClCd=20010707&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=07&ncsSubdCd=07"
      },
      {
        "label": "커리어넷 직업백과 인공지능 엔지니어",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10117"
      },
      {
        "label": "한국데이터산업진흥원 빅데이터분석기사",
        "url": "https://www.dataq.or.kr/www/sub/a_07.do"
      },
      {
        "label": "AWS 자격증 목록",
        "url": "https://aws.amazon.com/certification/"
      },
      {
        "label": "Google Cloud Professional Machine Learning Engineer",
        "url": "https://cloud.google.com/learn/certification/machine-learning-engineer"
      }
    ]
  },
  "데이터 프로덕트 기획자": {
    "does": [
      "데이터 서비스 환경 분석과 서비스 기획안 작성",
      "분석 과제 정의와 필요한 데이터 요건 정리",
      "데이터 플랫폼과 운영 방안 기획 지원",
      "분석 결과를 지표와 시각화로 정리해 보고"
    ],
    "skills": [
      "빅데이터 환경 분석",
      "데이터 서비스 기획",
      "데이터 요구사항 정의",
      "SQL과 기초 데이터 분석",
      "지표 설계와 성과 관리",
      "기획 문서 작성과 커뮤니케이션"
    ],
    "certs": [
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원",
        "type": "국가기술자격",
        "note": "대학 졸업(예정)자 등 응시자격 요건 있음"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호, 응시 제한 없음"
      },
      {
        "name": "SQL 개발자(SQLD)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호, 응시 제한 없음"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "서비스 기획과 요구사항 정의 담당",
      "데이터 지표 설계와 대시보드 담당",
      "일정 관리와 발표 자료 담당"
    ],
    "quant": [
      "빅데이터분석기사 취득",
      "ADsP 또는 SQLD 취득",
      "정보처리기사 취득(졸업예정 학기 응시)"
    ],
    "qual": [
      "데이터 기반 서비스 기획서를 써 본 팀 프로젝트",
      "공공데이터 활용 공모전 참가",
      "데이터 분석 동아리에서 지표 대시보드 운영",
      "서비스 기획 직무 인턴"
    ],
    "resumePoints": [
      "문제 정의에서 데이터 요건 도출까지의 과정",
      "분석 결과를 서비스 개선으로 연결한 경험",
      "개발자와 분석가 사이에서 소통하고 조율한 경험"
    ],
    "ncs": "빅데이터기획, 빅데이터분석",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보기술전략·계획 > 빅데이터기획)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "NCS 국가직무능력표준(빅데이터분석 세분류)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200084&ncsClCd=20010105&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=05"
      },
      {
        "label": "커리어넷 직업백과(빅 데이터 전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10032"
      },
      {
        "label": "한국데이터산업진흥원 자격검정(빅데이터분석기사)",
        "url": "https://www.dataq.or.kr/www/sub/a_07.do"
      },
      {
        "label": "한국데이터산업진흥원 자격검정(ADsP, SQLD)",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      }
    ]
  },
  "금융 데이터 분석가": {
    "does": [
      "금융 거래와 고객 데이터 수집과 전처리",
      "탐색적 데이터 분석과 분석 모델링",
      "핀테크 서비스 데이터 분석과 결과 시각화",
      "분석 결과 평가와 보고서 작성"
    ],
    "skills": [
      "통계 분석과 데이터 전처리",
      "SQL과 Python 활용",
      "금융 상품과 시장 이해",
      "핀테크 환경 분석",
      "분석 결과 시각화",
      "분석 결과 해석과 보고"
    ],
    "certs": [
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원",
        "type": "국가기술자격",
        "note": "대학 졸업(예정)자 등 응시자격 요건 있음"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호"
      },
      {
        "name": "SQL 개발자(SQLD)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-04호"
      },
      {
        "name": "투자자산운용사",
        "issuer": "금융투자협회",
        "type": "민간자격",
        "note": "금융투자협회 자격시험센터 시행"
      }
    ],
    "projectRole": [
      "데이터 수집과 전처리 담당",
      "분석 모델링과 검증 담당",
      "결과 시각화와 보고서 담당"
    ],
    "quant": [
      "빅데이터분석기사 또는 ADsP 취득",
      "SQLD 취득",
      "투자자산운용사 취득(금융 도메인 보강)"
    ],
    "qual": [
      "금융 공공데이터나 공개 API로 분석한 개인 프로젝트",
      "FSI AIxData Challenge 같은 금융 데이터 경진대회 참가",
      "데이터 분석 동아리 활동",
      "핀테크 기업이나 금융회사 인턴"
    ],
    "resumePoints": [
      "분석 문제 정의와 데이터 전처리 과정",
      "모델 결과를 해석하고 평가한 경험",
      "금융 도메인 지식과 데이터 기술을 함께 쓴 사례"
    ],
    "ncs": "빅데이터분석, 핀테크기술기획",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(빅데이터분석 세분류)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200084&ncsClCd=20010105&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=05"
      },
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보기술전략·계획 > 핀테크기술기획)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(빅 데이터 전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10032"
      },
      {
        "label": "커리어넷 직업백과(핀테크 전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10111"
      },
      {
        "label": "금융투자협회 자격시험센터 시험개요",
        "url": "https://license.kofia.or.kr/examInfo/examInfo.do"
      },
      {
        "label": "한국데이터산업진흥원 자격검정(빅데이터분석기사)",
        "url": "https://www.dataq.or.kr/www/sub/a_07.do"
      }
    ]
  },
  "헬스케어 서비스 기획자": {
    "does": [
      "디지털 헬스케어 서비스 환경과 사용자 리서치",
      "서비스 콘셉트와 화면 흐름 기획",
      "보건의료 법규와 정책 조사",
      "개발과 검증 일정 관리 지원"
    ],
    "skills": [
      "사용자 리서치",
      "UI/UX 요구 분석",
      "보건의료 법규와 정책 이해",
      "건강정보 보호 이해",
      "서비스 기획 문서 작성",
      "데이터 기반 성과 관리"
    ],
    "certs": [
      {
        "name": "보건의료정보관리사",
        "issuer": "한국보건의료인국가시험원(면허 발급: 보건복지부)",
        "type": "면허",
        "note": "인증 교육과정을 이수한 대학 졸업(예정)자만 응시 가능"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "사용자 조사와 요구사항 정리 담당",
      "화면 설계와 프로토타입 담당",
      "법규 검토와 발표 자료 담당"
    ],
    "quant": [
      "보건의료정보관리사 면허(인증 교육과정 이수 시)",
      "정보처리기사 취득",
      "ADsP 취득"
    ],
    "qual": [
      "헬스케어 앱을 기획하고 사용자 테스트까지 해 본 팀 프로젝트",
      "디지털 헬스케어 관련 공모전 참가",
      "병원이나 헬스케어 스타트업 인턴",
      "의료 데이터 박람회 참관과 병원 봉사활동"
    ],
    "resumePoints": [
      "사용자 리서치로 문제를 정의한 과정",
      "의료 환경과 법규를 이해한 기획 근거",
      "기획안을 프로토타입으로 만들어 검증한 경험"
    ],
    "ncs": "UI/UX엔지니어링, 정보기술기획, 의료정보관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보기술개발 > UI/UX엔지니어링)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(디지털 헬스케어 기기 개발자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10115"
      },
      {
        "label": "커리어넷 직업백과(의료정보시스템개발자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=467"
      },
      {
        "label": "커리어넷 직업백과(UX 디자인 컨설턴트)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10003"
      },
      {
        "label": "한국보건의료인국가시험원(보건의료정보관리사 응시자격)",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2018/2/view.do?seq=7"
      }
    ]
  },
  "의료 데이터 분석가": {
    "does": [
      "진료기록과 청구 데이터 정리와 전처리",
      "병원 통계와 질환 등록 자료 생성",
      "분석 결과 시각화와 보고",
      "건강정보 보호 기준에 맞춘 데이터 관리"
    ],
    "skills": [
      "질병 및 의료행위 분류 이해",
      "보건의료 통계",
      "SQL과 데이터 분석 도구 활용",
      "의학 용어",
      "건강정보 보호 법규",
      "분석 결과 시각화"
    ],
    "certs": [
      {
        "name": "보건의료정보관리사",
        "issuer": "한국보건의료인국가시험원(면허 발급: 보건복지부)",
        "type": "면허",
        "note": "인증 교육과정을 이수한 대학 졸업(예정)자만 응시 가능"
      },
      {
        "name": "빅데이터분석기사",
        "issuer": "한국데이터산업진흥원",
        "type": "국가기술자격"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      },
      {
        "name": "SQL 개발자(SQLD)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "데이터 정제와 분류 코드 담당",
      "통계 분석과 시각화 담당",
      "개인정보 처리 기준 검토 담당"
    ],
    "quant": [
      "보건의료정보관리사 국가시험 합격(응시자격 충족 시)",
      "빅데이터분석기사 또는 ADsP 취득",
      "SQLD 취득"
    ],
    "qual": [
      "공개된 보건의료 데이터를 분석한 프로젝트",
      "병원 의무기록실이나 의료정보팀 실습",
      "의료 데이터 박람회 참관",
      "데이터 분석 동아리 활동"
    ],
    "resumePoints": [
      "의료 데이터의 분류 체계를 이해하고 적용한 경험",
      "통계 분석 결과를 의료진이나 행정 담당자에게 전달한 경험",
      "환자 정보 보호 규정을 지킨 태도"
    ],
    "ncs": "의료정보관리, 빅데이터분석",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(보건·의료 > 보건 > 의료기술지원 > 의료정보관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "NCS 국가직무능력표준(빅데이터분석 세분류)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200084&ncsClCd=20010105&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=05"
      },
      {
        "label": "커리어넷 직업백과(보건의료정보관리사)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=256"
      },
      {
        "label": "한국보건의료인국가시험원(보건의료정보관리사 응시자격)",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2018/2/view.do?seq=7"
      },
      {
        "label": "한국데이터산업진흥원 자격검정(ADsP, SQLD)",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      }
    ]
  },
  "소비자 리서치 분석가": {
    "does": [
      "조사 계획 수립과 표본 설계",
      "설문 설계와 인터뷰 정성조사",
      "실사 관리와 자료 처리",
      "통계 분석과 조사 보고서 작성"
    ],
    "skills": [
      "조사 방법론과 표본 설계",
      "설문 설계",
      "기술통계와 회귀분석",
      "소비자 심리 이해",
      "통계 소프트웨어 활용",
      "보고서 작성과 발표"
    ],
    "certs": [
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "관련부처 국가데이터처"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      },
      {
        "name": "소비자전문상담사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 시장 및 여론조사전문가 관련자격"
      }
    ],
    "projectRole": [
      "설문 설계와 데이터 수집 담당",
      "통계 분석과 인사이트 도출 담당",
      "결과 보고서와 발표 담당"
    ],
    "quant": [
      "사회조사분석사 2급 취득",
      "ADsP 취득",
      "조사방법론, 통계분석 과목 이수"
    ],
    "qual": [
      "설문조사를 직접 설계하고 분석한 수업 프로젝트",
      "광고나 마케팅 공모전에서 소비자 조사 파트 담당",
      "리서치 회사 인턴",
      "심리학 실험 연구 참여"
    ],
    "resumePoints": [
      "조사 설계부터 분석까지 전 과정을 주도한 경험",
      "통계 결과를 전략 제안으로 연결한 경험",
      "응답자 보호와 자료 처리의 정확성"
    ],
    "ncs": "통계조사, 마케팅전략기획",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 기획사무 > 마케팅 > 통계조사)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(시장 및 여론조사전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=230"
      },
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "Q-Net 국가기술자격(사회조사분석사 2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=9521"
      },
      {
        "label": "한국데이터산업진흥원 자격검정(ADsP)",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      }
    ]
  },
  "서비스 기획자": {
    "does": [
      "서비스 환경 분석과 사용자 리서치",
      "요구사항 정의와 화면 설계(와이어프레임)",
      "UI 구현 점검과 테스트",
      "프로젝트 일정과 자원 계획 지원"
    ],
    "skills": [
      "사용자 리서치",
      "요구사항 정의",
      "화면 설계와 프로토타이핑",
      "데이터 기반 지표 관리",
      "프로젝트 일정 관리",
      "문서 작성과 커뮤니케이션"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "SQL 개발자(SQLD)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "기획과 화면 설계 담당",
      "사용자 테스트와 피드백 수집 담당",
      "일정 관리와 발표 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "SQLD 취득",
      "ADsP 취득"
    ],
    "qual": [
      "앱이나 웹 서비스를 끝까지 출시해 본 팀 프로젝트",
      "창업 동아리나 해커톤 참가",
      "서비스 기획 직무 인턴",
      "자신의 서비스 이용 경로를 기록하고 개선안을 정리한 포트폴리오"
    ],
    "resumePoints": [
      "사용자 문제를 정의하고 해결안을 설계한 과정",
      "개발자, 디자이너와 협업한 경험",
      "출시 후 지표를 보고 개선한 경험"
    ],
    "ncs": "UI/UX엔지니어링, 정보기술기획, IT프로젝트관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보기술개발 > UI/UX엔지니어링)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(UX 디자인 컨설턴트)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10003"
      },
      {
        "label": "Q-Net 국가기술자격(정보처리기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "한국데이터산업진흥원 자격검정(SQLD)",
        "url": "https://www.dataq.or.kr/www/sub/a_04.do"
      }
    ]
  },
  "보안 관제 요원": {
    "does": [
      "보안 장비 로그와 이벤트 실시간 모니터링(위협탐지)",
      "탐지 로그 분석과 오탐 판별",
      "보안사고 접수와 초동 대응",
      "관제 보고서 작성과 교대 인수인계"
    ],
    "skills": [
      "네트워크와 시스템 보안 기초",
      "탐지 로그 분석",
      "보안 장비 운용(방화벽, IDS/IPS)",
      "악성코드와 공격 기법 이해",
      "리눅스 서버 운영",
      "보고서 작성"
    ],
    "certs": [
      {
        "name": "정보보안기사",
        "issuer": "한국방송통신전파진흥원",
        "type": "국가기술자격",
        "note": "필기 150분, 실기 180분"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격"
      },
      {
        "name": "네트워크관리사 2급",
        "issuer": "한국정보통신자격협회(ICQA)",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "로그 수집과 모니터링 환경 구축 담당",
      "공격 시나리오 분석과 탐지 룰 작성 담당",
      "대응 절차 문서화 담당"
    ],
    "quant": [
      "정보보안기사 취득",
      "정보처리기사 취득",
      "리눅스마스터 2급 또는 네트워크관리사 2급 취득"
    ],
    "qual": [
      "CTF나 보안 경진대회 참가",
      "개인 실습 환경에서 로그 수집과 분석 도구를 구축한 경험",
      "보안 동아리 활동",
      "보안 관제 기업 인턴"
    ],
    "resumePoints": [
      "로그에서 이상 징후를 찾아낸 분석 사례",
      "정해진 절차에 따라 침해 상황을 처리한 경험",
      "교대 근무와 협업에 맞는 책임감"
    ],
    "ncs": "보안사고분석대응, 정보보호관리·운영",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보보호 > 보안사고분석대응)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(정보보호전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=435"
      },
      {
        "label": "Q-Net 국가기술자격(정보보안기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=1325"
      },
      {
        "label": "한국방송통신전파진흥원 국가기술자격검정",
        "url": "https://www.cq.or.kr/"
      },
      {
        "label": "금융보안원 주요업무(금융부문 통합보안관제)",
        "url": "https://www.fsec.or.kr/bbs/101"
      }
    ]
  },
  "모의해킹 전문가": {
    "does": [
      "웹과 시스템 보안취약점 진단과 분석",
      "모의해킹 시나리오 수립과 공격 재현",
      "취약점 분석 보고서와 조치 권고 작성",
      "진단 사전 준비(범위, 동의, 일정 협의)"
    ],
    "skills": [
      "웹 취약점 이해",
      "네트워크와 시스템 침투 기법",
      "스크립트 작성(Python 등)",
      "취약점 진단 도구 활용",
      "진단 보고서 작성",
      "법규와 윤리 준수"
    ],
    "certs": [
      {
        "name": "정보보안기사",
        "issuer": "한국방송통신전파진흥원",
        "type": "국가기술자격"
      },
      {
        "name": "OffSec Certified Professional (OSCP)",
        "issuer": "OffSec",
        "type": "국제자격",
        "note": "24시간 감독형 실기 시험"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "취약점 진단과 공격 시나리오 담당",
      "보고서와 조치 권고 담당",
      "테스트 환경 구축 담당"
    ],
    "quant": [
      "정보보안기사 취득",
      "OSCP 취득",
      "해킹방어대회 입상(금융보안원 채용은 코드게이트, 화이트햇 콘테스트, CCE, WACON 일반부 입상자 등에 전공시험 면제)"
    ],
    "qual": [
      "CTF 참가와 문제 풀이 기록 작성",
      "버그바운티 참여(금융권 버그바운티 우수 취약점 신고자는 금융보안원 채용 우대)",
      "보안 동아리 활동",
      "모의해킹 기업 인턴"
    ],
    "resumePoints": [
      "취약점을 찾고 재현한 구체적 사례",
      "공격 기법을 방어 관점으로 설명하는 능력",
      "허가된 범위와 윤리를 지킨 태도"
    ],
    "ncs": "정보보호진단·분석",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보보호 > 정보보호진단·분석)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(정보보호전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=435"
      },
      {
        "label": "Q-Net 국가기술자격(정보보안기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=1325"
      },
      {
        "label": "OffSec PEN-200 / OSCP 공식 안내",
        "url": "https://www.offsec.com/courses/pen-200/"
      },
      {
        "label": "금융보안원 2025년도 신입직원 채용공고 원문(PDF)",
        "url": "https://cse.snu.ac.kr/api/v1/file/1724725330775_%5B%EA%B8%88%EC%9C%B5%EB%B3%B4%EC%95%88%EC%9B%90%5D%202025%EB%85%84%EB%8F%84%20%EC%8B%A0%EC%9E%85%EC%A7%81%EC%9B%90%20%EC%B1%84%EC%9A%A9%EA%B3%B5%EA%B3%A0.pdf"
      }
    ]
  },
  "클라우드 보안 엔지니어": {
    "does": [
      "클라우드 계정과 접근권한 관리",
      "클라우드 네트워크와 인프라 보안 설정",
      "클라우드 데이터 암호화와 보안 로그 모니터링",
      "클라우드 컴플라이언스 점검 지원"
    ],
    "skills": [
      "클라우드 서비스 구조 이해",
      "계정과 접근 통제",
      "클라우드 네트워크 보안",
      "데이터 암호화",
      "리눅스와 인프라 코드 기초",
      "보안 로그 분석"
    ],
    "certs": [
      {
        "name": "AWS Certified Solutions Architect - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      },
      {
        "name": "AWS Certified Security - Specialty",
        "issuer": "Amazon Web Services",
        "type": "국제자격",
        "note": "IT 보안 5년, AWS 보안 실무 2년 경력 권장(장기 목표)"
      },
      {
        "name": "정보보안기사",
        "issuer": "한국방송통신전파진흥원",
        "type": "국가기술자격"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "클라우드 인프라 구축과 접근권한 설계 담당",
      "보안 설정 점검과 로그 모니터링 담당",
      "보안 구성 문서화 담당"
    ],
    "quant": [
      "AWS Certified Solutions Architect - Associate 취득",
      "정보보안기사 취득",
      "AWS Certified Security - Specialty 취득(경력 후 장기 목표)"
    ],
    "qual": [
      "클라우드에 서비스를 배포하고 보안 설정까지 적용한 팀 프로젝트",
      "잘못된 클라우드 설정을 점검하는 스크립트 작성 경험",
      "클라우드 동아리 활동",
      "클라우드 운영 기업 인턴"
    ],
    "resumePoints": [
      "클라우드 환경에서 접근 통제와 암호화를 구성한 경험",
      "보안 사고를 가정해 로그를 분석한 경험",
      "비용과 보안을 함께 고려한 설계 근거"
    ],
    "ncs": "클라우드 보안 관리·운영, 클라우드인프라스트럭쳐엔지니어링",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보보호 > 클라우드 보안 관리·운영)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(클라우드 시스템 엔지니어)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10031"
      },
      {
        "label": "AWS Certified Security - Specialty 공식 안내",
        "url": "https://aws.amazon.com/certification/certified-security-specialty/"
      },
      {
        "label": "AWS Certified Solutions Architect - Associate 공식 안내",
        "url": "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
      },
      {
        "label": "Q-Net 국가기술자격(정보보안기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=1325"
      }
    ]
  },
  "금융보안 담당자": {
    "does": [
      "금융 IT와 정보보호 업무 기획과 운영",
      "통합보안관제와 취약점 분석, 평가",
      "악성코드 수집, 분석과 침해사고 분석, 대응",
      "금융데이터와 개인정보보호 업무 기획 지원"
    ],
    "skills": [
      "정보보호 개론과 암호학",
      "네트워크와 시스템 보안",
      "침해사고 대응과 분석",
      "금융 IT와 전자금융 서비스 이해",
      "정보보호 관련 법규 이해",
      "보고서 작성과 문제해결"
    ],
    "certs": [
      {
        "name": "정보보안기사",
        "issuer": "한국방송통신전파진흥원",
        "type": "국가기술자격",
        "note": "금융보안원 채용 시 우대, 필기 전공시험 면제 대상"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "CISSP - Certified Information Systems Security Professional",
        "issuer": "ISC2",
        "type": "국제자격",
        "note": "경력 5년 요건(장기 목표)"
      },
      {
        "name": "Certified Information Systems Auditor (CISA)",
        "issuer": "ISACA",
        "type": "국제자격",
        "note": "경력 요건 있음(장기 목표)"
      }
    ],
    "projectRole": [
      "보안 정책과 점검 체크리스트 담당",
      "취약점 진단과 보고서 담당",
      "침해 시나리오 대응 훈련 설계 담당"
    ],
    "quant": [
      "정보보안기사 취득",
      "전공시험 범위 학습(정보보호 개론, 네트워크 보안, 시스템 보안, 어플리케이션 보안, 암호학, 침해사고 대응 및 분석)",
      "NCS 직업기초능력평가 대비(의사소통능력, 문제해결능력, 수리능력)",
      "영어 성적 보유(TOEIC, TOEIC Speaking, TEPS, OPIc, TOEFL iBT 중 하나, 채용 우대)"
    ],
    "qual": [
      "FIESTA, 우리CON 같은 금융보안 대회 참가",
      "금융보안원 논문공모전 참가",
      "CTF 참가와 보안 동아리 활동",
      "금융회사나 보안 기업 인턴"
    ],
    "resumePoints": [
      "정보보호 지식을 금융 서비스 상황에 적용한 경험",
      "침해사고 분석이나 취약점 진단을 끝까지 수행한 사례",
      "자기소개서 기반 면접과 인바스켓 면접에 쓸 구체적 문제해결 사례"
    ],
    "ncs": "정보보호관리·운영, 보안사고분석대응",
    "sources": [
      {
        "label": "금융보안원 2025년도 신입직원 채용공고 원문(PDF)",
        "url": "https://cse.snu.ac.kr/api/v1/file/1724725330775_%5B%EA%B8%88%EC%9C%B5%EB%B3%B4%EC%95%88%EC%9B%90%5D%202025%EB%85%84%EB%8F%84%20%EC%8B%A0%EC%9E%85%EC%A7%81%EC%9B%90%20%EC%B1%84%EC%9A%A9%EA%B3%B5%EA%B3%A0.pdf"
      },
      {
        "label": "금융보안원 채용정보",
        "url": "https://www.fsec.or.kr/bbs/258"
      },
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보보호 > 정보보호관리·운영)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "Q-Net 국가기술자격(정보보안기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=1325"
      },
      {
        "label": "ISC2 CISSP 공식 안내",
        "url": "https://www.isc2.org/certifications/cissp"
      },
      {
        "label": "ISACA CISA 공식 안내",
        "url": "https://www.isaca.org/credentialing/cisa"
      }
    ],
    "recruitNotes": [
      "금융보안원 2025년도 신입 채용 기준: 서류전형, 필기전형, 1차 면접, 2차 면접, 채용 기본정보 검증 순",
      "필기전형은 NCS 직업기초능력평가(30점)와 전공시험(70점), IT 분야는 컴퓨터공학 또는 정보보호학 중 택1(객관식 30문항, 주관식 10문항)",
      "정보보안기사, 정보관리기술사, ISMS-P인증심사원(보) 등 자격 소지자와 지정 해킹대회 입상자는 전공시험 면제(NCS는 응시)",
      "1차 면접은 인바스켓 면접과 자기소개서 기반 질의응답, 온라인 인성검사 병행"
    ]
  },
  "공공기관 보안 담당": {
    "does": [
      "개인정보 보호 법령과 지침 분석",
      "개인정보 처리 현황 점검과 위험관리",
      "수탁자(위탁업체) 관리와 직원 교육",
      "정보보호 정책 운영과 내부 보안 점검 지원"
    ],
    "skills": [
      "개인정보 보호법 이해",
      "개인정보 생명주기 관리",
      "관리적, 물리적 보안 운영",
      "정보보호 관리체계 이해",
      "점검 결과 문서화와 보고",
      "이해관계자 소통"
    ],
    "certs": [
      {
        "name": "정보보안기사",
        "issuer": "한국방송통신전파진흥원",
        "type": "국가기술자격"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "개인정보관리사(CPPG)",
        "issuer": "한국CPO포럼",
        "type": "민간자격"
      },
      {
        "name": "Certified Information Systems Auditor (CISA)",
        "issuer": "ISACA",
        "type": "국제자격",
        "note": "경력 요건 있음(장기 목표)"
      }
    ],
    "projectRole": [
      "개인정보 처리방침과 동의 절차 설계 담당",
      "보안 점검 체크리스트 담당",
      "교육 자료와 점검 보고서 담당"
    ],
    "quant": [
      "정보보안기사 취득",
      "정보처리기사 취득",
      "개인정보관리사(CPPG) 취득",
      "공공기관 채용에 맞춘 NCS 직업기초능력평가 대비"
    ],
    "qual": [
      "서비스의 개인정보 처리 흐름을 설계하고 점검한 프로젝트",
      "공공기관 체험형 인턴(정보보호 또는 전산 부서)",
      "보안 동아리 활동",
      "ISMS-P 인증기준 스터디"
    ],
    "resumePoints": [
      "법령 기준을 실제 업무 절차로 옮긴 경험",
      "꼼꼼한 점검과 기록 습관",
      "이해관계자에게 보안 규정을 설명하고 설득한 경험"
    ],
    "ncs": "개인정보보호관리운영, 정보보호관리·운영",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 개인정보보호 > 개인정보보호관리운영)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(정보보호전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=435"
      },
      {
        "label": "Q-Net 국가기술자격(정보보안기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=1325"
      },
      {
        "label": "한국CPO포럼 개인정보관리사(CPPG) 자격검정",
        "url": "https://www.cpptest.or.kr/"
      },
      {
        "label": "개인정보 포털(개인정보보호위원회)",
        "url": "https://www.privacy.go.kr/"
      }
    ]
  },
  "은행원": {
    "does": [
      "예금 수신과 출납, 제신고 처리",
      "개인대출 상담과 세일즈",
      "펀드, 방카슈랑스, 신용카드 판매",
      "외국환 거래와 전자금융 서비스 안내, 금융소비자 보호 절차 준수"
    ],
    "skills": [
      "경제와 회계 지식",
      "고객 상담과 서비스",
      "금융 상품 이해",
      "정확한 수치 처리",
      "영업과 마케팅",
      "금융 법규 이해"
    ],
    "certs": [
      {
        "name": "펀드투자권유자문인력",
        "issuer": "금융투자협회",
        "type": "민간자격",
        "note": "투자권유 업무에 필요한 자격, 금융투자협회 자격시험센터 시행"
      },
      {
        "name": "증권투자권유자문인력",
        "issuer": "금융투자협회",
        "type": "민간자격",
        "note": "금융투자협회 자격시험센터 시행"
      },
      {
        "name": "신용분석사",
        "issuer": "한국금융연수원",
        "type": "국가공인 민간자격"
      },
      {
        "name": "전산회계운용사",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "커리어넷 은행출납사무원 관련자격"
      }
    ],
    "projectRole": [
      "예산과 회계 관리 담당",
      "고객 응대와 상담 담당",
      "금융 상품 조사와 제안 담당"
    ],
    "quant": [
      "펀드투자권유자문인력 또는 증권투자권유자문인력 취득",
      "신용분석사 취득",
      "경제, 회계 과목 이수"
    ],
    "qual": [
      "은행 체험형 인턴",
      "금융감독원 금융교육센터 온라인 금융교육 이수",
      "고객 응대 아르바이트나 봉사 경험",
      "금융 동아리에서 상품 비교나 투자 분석 활동"
    ],
    "resumePoints": [
      "고객 응대에서 신뢰를 만든 경험",
      "숫자와 규정을 정확히 다룬 경험",
      "상품을 이해하고 고객에게 제안한 경험"
    ],
    "ncs": "창구사무, 여신심사",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(금융·보험 > 금융 > 금융영업 > 창구사무)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(은행출납사무원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=255"
      },
      {
        "label": "금융투자협회 자격시험센터 시험개요",
        "url": "https://license.kofia.or.kr/examInfo/examInfo.do"
      },
      {
        "label": "한국금융연수원",
        "url": "https://www.kbi.or.kr/"
      }
    ]
  },
  "증권·핀테크 서비스 담당": {
    "does": [
      "증권거래 고객 마케팅과 투자상담 지원",
      "종목과 시장 조사분석 자료 정리",
      "핀테크 서비스 기획과 요구사항 분석",
      "모바일 증권 서비스 운영과 고객 문의 대응"
    ],
    "skills": [
      "증권과 금융상품 이해",
      "시장과 기업 분석",
      "핀테크 기술 이해",
      "서비스 기획과 데이터 분석",
      "금융 법규와 컴플라이언스",
      "고객 상담"
    ],
    "certs": [
      {
        "name": "증권투자권유자문인력",
        "issuer": "금융투자협회",
        "type": "민간자격",
        "note": "금융투자협회 자격시험센터 시행"
      },
      {
        "name": "투자자산운용사",
        "issuer": "금융투자협회",
        "type": "민간자격",
        "note": "금융투자협회 자격시험센터 시행"
      },
      {
        "name": "금융투자분석사",
        "issuer": "금융투자협회",
        "type": "민간자격",
        "note": "금융투자협회 자격시험센터 시행"
      },
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "SQL 개발자(SQLD)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "시장 분석과 리서치 담당",
      "핀테크 서비스 기획 담당",
      "데이터 분석과 발표 담당"
    ],
    "quant": [
      "증권투자권유자문인력 또는 투자자산운용사 취득",
      "금융투자분석사 취득(장기 목표)",
      "정보처리기사 또는 SQLD 취득"
    ],
    "qual": [
      "모의투자 대회나 금융 동아리 리서치 활동",
      "핀테크 서비스 기획 공모전 참가",
      "증권회사나 핀테크 기업 인턴",
      "한국거래소 홍보관, 한국예탁결제원 증권박물관 체험 프로그램"
    ],
    "resumePoints": [
      "시장 분석을 근거로 제안한 경험",
      "금융과 IT를 함께 이해한 사례",
      "고객 관점의 서비스 개선 아이디어"
    ],
    "ncs": "증권거래업무, 핀테크기술기획",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(금융·보험 > 금융 > 증권·외환 > 증권거래업무)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "NCS 국가직무능력표준(정보통신 > 정보기술 > 정보기술전략·계획 > 핀테크기술기획)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "커리어넷 직업백과(증권중개인)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=240"
      },
      {
        "label": "커리어넷 직업백과(핀테크 전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10111"
      },
      {
        "label": "금융투자협회 자격시험센터 시험개요",
        "url": "https://license.kofia.or.kr/examInfo/examInfo.do"
      }
    ]
  },
  "보험심사 담당자": {
    "does": [
      "보험계약 인수위험 평가(신체적, 환경적, 재정적)",
      "보험금 청구 서류 검토와 메디칼 심사",
      "심사 기준에 따른 지급 여부 판단과 민원 처리",
      "심사 업무 지원과 기록 관리"
    ],
    "skills": [
      "보험계약법과 보험업법 이해",
      "의학 용어와 질병 분류",
      "손해사정 기초",
      "서류 검토의 정확성",
      "고객과 의료기관 소통",
      "건강보험 청구 실무"
    ],
    "certs": [
      {
        "name": "손해사정사(신체)",
        "issuer": "금융감독원(시험 시행: 보험개발원 위탁)",
        "type": "국가전문자격",
        "note": "1차 응시 제한 없음, 2차 합격 후 실무수습과 금융감독원 등록"
      },
      {
        "name": "개인보험심사역(APIU)",
        "issuer": "보험연수원",
        "type": "국가공인 민간자격",
        "note": "국가공인 2020-3호, 응시 제한 없음"
      },
      {
        "name": "기업보험심사역(ACIU)",
        "issuer": "보험연수원",
        "type": "국가공인 민간자격",
        "note": "국가공인 2020-4호"
      },
      {
        "name": "보건의료정보관리사",
        "issuer": "한국보건의료인국가시험원(면허 발급: 보건복지부)",
        "type": "면허",
        "note": "병원 보험심사청구 업무에 활용, 인증 교육과정 졸업자만 응시"
      }
    ],
    "projectRole": [
      "약관과 규정 분석 담당",
      "사례 검토와 판단 근거 정리 담당",
      "의료 용어와 자료 조사 담당"
    ],
    "quant": [
      "손해사정사 1차 시험 과목 학습(보험업법, 보험계약법, 손해사정이론)",
      "개인보험심사역(APIU) 취득",
      "보건의료정보관리사 면허(인증 교육과정 이수 시)"
    ],
    "qual": [
      "보험회사나 손해사정법인 인턴",
      "병원 보험심사청구 부서 실습",
      "보험 약관 분석 스터디",
      "의학 용어와 질병 분류 학습 프로젝트"
    ],
    "resumePoints": [
      "규정과 약관을 근거로 판단한 경험",
      "의료 지식과 보험 지식을 함께 쓴 사례",
      "민원 상황에서의 소통과 윤리 의식"
    ],
    "ncs": "보험계약심사, 신체손해사정",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(금융·보험 > 보험 > 보험영업·계약 > 보험계약심사)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "보험개발원 보험전문인시험(손해사정사 시험제도 안내)",
        "url": "https://certi.kidi.or.kr:10443/exam/exam-guide/system/damage"
      },
      {
        "label": "보험연수원 보험심사역 시험개요",
        "url": "https://www.in.or.kr/main/certification/aiu/outline/outline.do"
      },
      {
        "label": "한국보건의료인국가시험원(보건의료정보관리사 응시자격)",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2018/2/view.do?seq=7"
      },
      {
        "label": "커리어넷 직업백과(보건의료정보관리사)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=256"
      }
    ]
  },
  "증권 애널리스트": {
    "does": [
      "거시경제 흐름과 산업별 동향 분석",
      "기업 재무제표, 실적 전망, 자금조달 여건 조사와 분석",
      "주식, 채권 등 유가증권의 가격 변동과 수익률 추세 분석",
      "분석 결과를 리포트로 정리해 투자 방향 제시"
    ],
    "skills": [
      "경제와 회계 지식",
      "재무제표 분석",
      "산업 분석과 기업 가치 평가",
      "통계와 수리 분석",
      "보고서 작성과 발표",
      "판단과 의사결정"
    ],
    "certs": [
      {
        "name": "금융투자분석사",
        "issuer": "금융투자협회(자격시험센터)",
        "type": "민간자격",
        "note": "금융투자협회 자격시험센터 시행, 시험과목은 센터 시험개요 페이지에서 확인"
      },
      {
        "name": "투자자산운용사",
        "issuer": "금융투자협회(자격시험센터)",
        "type": "민간자격"
      },
      {
        "name": "CFA Program (Chartered Financial Analyst)",
        "issuer": "CFA Institute",
        "type": "국제자격",
        "note": "Level I부터 III까지 3단계"
      }
    ],
    "projectRole": [
      "기업 분석 리포트 작성 담당",
      "산업 동향 조사와 데이터 수집 담당",
      "발표 자료 제작과 결과 발표 담당"
    ],
    "quant": [
      "금융투자분석사 시험 합격",
      "투자자산운용사 시험 합격",
      "CFA Program Level I 응시",
      "경제학, 회계학, 통계학 전공 과목 이수"
    ],
    "qual": [
      "기업 분석 리포트 작성 경험(모의투자, 대학생 리서치 공모전)",
      "증권회사, 자산운용사 인턴",
      "금융투자협회 금융투자교육원 교육 과정 수강",
      "투자 동아리에서 산업 분석 발표"
    ],
    "resumePoints": [
      "거시경제, 산업, 기업 분석을 거쳐 투자 의견을 낸 과정",
      "재무제표와 통계자료를 근거로 판단한 사례",
      "분석 결과를 글과 발표로 설득한 경험"
    ],
    "ncs": "주식·채권운용, 기업신용분석",
    "sources": [
      {
        "label": "커리어넷 직업백과(투자분석가(애널리스트))",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=950"
      },
      {
        "label": "커리어넷 직업백과(증권분석가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=239"
      },
      {
        "label": "NCS 국가직무능력표준(주식·채권운용)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC201600730&ncsClCd=03010402&ncsLclasCd=03&ncsMclasCd=01&ncsSclasCd=04&ncsSubdCd=02"
      },
      {
        "label": "금융투자협회 자격시험센터 시험개요",
        "url": "https://license.kofia.or.kr/examInfo/examInfo.do"
      },
      {
        "label": "CFA Institute CFA Program",
        "url": "https://www.cfainstitute.org/programs/cfa-program"
      }
    ]
  },
  "금융 리스크 분석가": {
    "does": [
      "시장, 신용, 운영 리스크 식별과 평가",
      "리스크 측정 모형 운용과 데이터 관리",
      "자산 건전성과 신용포트폴리오 모니터링",
      "위기상황 분석과 리스크 보고서 작성"
    ],
    "skills": [
      "확률과 통계",
      "금융상품과 파생상품 이해",
      "리스크 측정 모형 활용",
      "데이터 분석(Python, SQL, 엑셀)",
      "금융 규제와 건전성 기준 이해",
      "보고서 작성"
    ],
    "certs": [
      {
        "name": "재무위험관리사",
        "issuer": "금융투자협회(자격시험센터)",
        "type": "민간자격"
      },
      {
        "name": "Financial Risk Manager (FRM)",
        "issuer": "Global Association of Risk Professionals (GARP)",
        "type": "국제자격",
        "note": "Part I, Part II 시험 합격 후 2년 관련 실무 경력 제출"
      },
      {
        "name": "투자자산운용사",
        "issuer": "금융투자협회(자격시험센터)",
        "type": "민간자격"
      }
    ],
    "projectRole": [
      "데이터 분석과 모형 검증 담당",
      "시나리오 설계와 위기상황 분석 담당",
      "결과 보고서 작성 담당"
    ],
    "quant": [
      "재무위험관리사 시험 합격",
      "FRM Part I 응시",
      "수학, 통계, 금융공학 전공 과목 이수",
      "Python 또는 SQL 데이터 분석 역량 증빙"
    ],
    "qual": [
      "금융 데이터로 리스크 측정 모형을 만든 프로젝트",
      "금융회사 리스크관리, 심사 부서 인턴",
      "금융 데이터 분석 공모전 참여",
      "학회나 동아리에서 파생상품, 리스크 스터디"
    ],
    "resumePoints": [
      "리스크를 식별하고 측정 기준을 세운 과정",
      "데이터와 모형으로 결과를 검증한 경험",
      "분석 결과를 숫자와 보고서로 전달한 사례"
    ],
    "ncs": "리스크관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(리스크관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202000137&ncsClCd=03010503&ncsLclasCd=03&ncsMclasCd=01&ncsSclasCd=05&ncsSubdCd=03"
      },
      {
        "label": "금융투자협회 자격시험센터 시험개요",
        "url": "https://license.kofia.or.kr/examInfo/examInfo.do"
      },
      {
        "label": "GARP FRM 공식 페이지",
        "url": "https://www.garp.org/frm"
      }
    ]
  },
  "DevOps 엔지니어": {
    "does": [
      "서버, 스토리지, 네트워크 등 클라우드 인프라 구성",
      "CI/CD 파이프라인 구성과 서비스 배포",
      "시스템 모니터링, 장애 원인 파악과 복구",
      "사용자 권한, 백업, 보안 설정 관리"
    ],
    "skills": [
      "리눅스 서버 운영",
      "클라우드 서비스 구성",
      "컨테이너와 쿠버네티스",
      "CI/CD 도구 활용",
      "네트워크와 보안 기초",
      "스크립트 작성(셸, Python)"
    ],
    "certs": [
      {
        "name": "정보처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "AWS Certified Solutions Architect - Associate",
        "issuer": "Amazon Web Services",
        "type": "국제자격"
      },
      {
        "name": "Certified Kubernetes Administrator (CKA)",
        "issuer": "The Linux Foundation",
        "type": "국제자격"
      },
      {
        "name": "리눅스마스터 2급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "서버 배포와 운영 담당",
      "CI/CD 파이프라인 구성 담당",
      "모니터링과 장애 대응 담당"
    ],
    "quant": [
      "정보처리기사 취득",
      "AWS Certified Solutions Architect - Associate 취득",
      "리눅스마스터 2급 취득",
      "Certified Kubernetes Administrator (CKA) 취득"
    ],
    "qual": [
      "클라우드에 서비스를 배포하고 운영한 팀 프로젝트",
      "배포 자동화 파이프라인을 직접 만든 경험",
      "장애 기록과 복구 과정을 정리한 운영 문서",
      "오픈소스 인프라 도구 활용 경험"
    ],
    "resumePoints": [
      "인프라를 설계, 구성해 서비스를 배포한 경험",
      "배포 자동화와 테스트로 운영 효율을 높인 사례",
      "장애 원인을 찾아 복구한 과정"
    ],
    "ncs": "클라우드인프라스트럭쳐엔지니어링, PaaS엔지니어링",
    "sources": [
      {
        "label": "커리어넷 직업백과(클라우드 시스템 엔지니어)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10031"
      },
      {
        "label": "커리어넷 직업백과(정보시스템운영자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=938"
      },
      {
        "label": "NCS 국가직무능력표준(클라우드인프라스트럭쳐엔지니어링)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200044&ncsClCd=20010215&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=15"
      },
      {
        "label": "NCS 국가직무능력표준(PaaS엔지니어링)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200384&ncsClCd=20010216&ncsLclasCd=20&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=16"
      },
      {
        "label": "Q-Net 국가기술자격(정보처리기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1320"
      },
      {
        "label": "AWS 공식 자격 페이지",
        "url": "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
      },
      {
        "label": "The Linux Foundation CKA",
        "url": "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/"
      },
      {
        "label": "리눅스마스터 공식 페이지(KAIT)",
        "url": "https://www.ihd.or.kr/introducesubject1.do"
      }
    ]
  },
  "건설사 시공·현장 관리자": {
    "does": [
      "설계 도면대로 공사가 진행되는지 현장 관리와 감독",
      "공정표 작성과 진도 관리",
      "자재, 인력, 장비 투입 계획과 실행예산 관리",
      "현장 안전과 품질 점검"
    ],
    "skills": [
      "건축 시공과 구조 이해",
      "도면 해석",
      "공정 관리 도구 활용",
      "원가와 계약 관리 기초",
      "건설 관계 법규",
      "현장 소통과 리더십"
    ],
    "certs": [
      {
        "name": "건축기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 건축계획, 건축시공, 건축구조, 건축설비, 건축관계법규"
      },
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "건축설비기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "일정과 공정 관리 담당",
      "예산과 자재 관리 담당",
      "안전 점검과 현장 기록 담당"
    ],
    "quant": [
      "건축기사 취득",
      "건설안전기사 취득",
      "건축, 건축공학 전공 이수",
      "CAD, BIM 활용 능력"
    ],
    "qual": [
      "건설회사 현장 실습이나 인턴",
      "설계, 시공 팀 프로젝트에서 공정표 작성",
      "건축 공모전 참여",
      "건설 안전 교육 이수"
    ],
    "resumePoints": [
      "공정과 자원을 계획해 일정대로 완수한 경험",
      "현장 안전과 품질 문제를 발견하고 해결한 사례",
      "여러 직종과 협업하며 갈등을 조정한 경험"
    ],
    "ncs": "건설공사공정관리, 건설공사공무관리, 건설공사품질관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(건축공학기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=46"
      },
      {
        "label": "NCS 국가직무능력표준(건설공사공정관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500022&ncsClCd=14010201&ncsLclasCd=14&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=01"
      },
      {
        "label": "NCS 국가직무능력표준(건설공사공무관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500025&ncsClCd=14010204&ncsLclasCd=14&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=04"
      },
      {
        "label": "Q-Net 국가기술자격(건축기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1630"
      },
      {
        "label": "Q-Net 국가기술자격(건설안전기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1440"
      }
    ]
  },
  "건축설비 엔지니어": {
    "does": [
      "공기조화, 열원, 환기, 위생설비 설계 보조",
      "설계도서 검토와 설비 적산",
      "설비 배관, 덕트, 장비 설치 공사 관리",
      "시운전과 준공 검사 지원"
    ],
    "skills": [
      "열역학과 유체역학",
      "공조와 위생설비 이해",
      "설비 도면 작성(CAD)",
      "에너지 계획과 관련 법규",
      "설비 적산과 원가",
      "설계 검증 시뮬레이션"
    ],
    "certs": [
      {
        "name": "건축설비기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 건축설비계획, 건축설비설계, 전기설비 및 소방시설 일반, 건축설비 관련법규"
      },
      {
        "name": "소방설비기사(기계분야)",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "건축기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "설비 계통 설계 담당",
      "에너지 계산과 시뮬레이션 담당",
      "도면과 적산 자료 작성 담당"
    ],
    "quant": [
      "건축설비기사 취득",
      "소방설비기사(기계분야) 취득",
      "건축설비, 기계공학 전공 과목 이수",
      "CAD 활용 능력"
    ],
    "qual": [
      "설비 설계 팀 프로젝트",
      "설비 설계사무소나 건설사 설비팀 인턴",
      "건축 설비, 에너지 공모전 참여",
      "현장 견학과 실습"
    ],
    "resumePoints": [
      "건물 용도에 맞게 설비 시스템을 계획한 경험",
      "법규와 에너지 기준을 설계에 반영한 사례",
      "도면과 계산서로 결과를 정리한 과정"
    ],
    "ncs": "건축설비설계, 건축설비시공",
    "sources": [
      {
        "label": "커리어넷 직업백과(건축공학기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=46"
      },
      {
        "label": "NCS 국가직무능력표준(건축설비설계)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200330&ncsClCd=14030301&ncsLclasCd=14&ncsMclasCd=03&ncsSclasCd=03&ncsSubdCd=01"
      },
      {
        "label": "NCS 국가직무능력표준(건축설비시공)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200331&ncsClCd=14030302&ncsLclasCd=14&ncsMclasCd=03&ncsSclasCd=03&ncsSubdCd=02"
      },
      {
        "label": "Q-Net 국가기술자격(건축설비기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1632"
      },
      {
        "label": "Q-Net 국가기술자격(소방설비기사(기계분야))",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1900"
      }
    ]
  },
  "이차전지·소재 엔지니어": {
    "does": [
      "전극, 조립, 활성화, 팩 공정 운영과 개선",
      "활물질, 전해질, 분리막 평가",
      "셀 시제품 제작과 충전, 방전 성능 검증",
      "공정 불량 원인 분석과 품질 관리"
    ],
    "skills": [
      "전기화학 기초",
      "재료와 화학공학 지식",
      "공정 데이터 분석",
      "분석 장비 활용",
      "품질관리 기법",
      "영어 기술문서 독해"
    ],
    "certs": [
      {
        "name": "화공기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "금속재료기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "전기기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "소재 합성과 특성 평가 담당",
      "실험 데이터 분석 담당",
      "공정 조건 설계 담당"
    ],
    "quant": [
      "화공기사 또는 금속재료기사 취득",
      "전기화학, 재료공학 전공 과목 이수",
      "실험 데이터 분석 도구 활용",
      "영어 독해 역량"
    ],
    "qual": [
      "배터리 소재나 셀 관련 실험 프로젝트",
      "배터리 회사, 소재 기업 인턴",
      "학부 연구실 참여",
      "소재, 에너지 관련 공모전"
    ],
    "resumePoints": [
      "실험으로 소재나 공정 문제를 해결한 과정",
      "데이터로 품질과 성능을 검증한 사례",
      "공정 개선안을 제안하고 테스트한 경험"
    ],
    "ncs": "리튬이온전지셀개발, 리튬이온전지셀제조",
    "sources": [
      {
        "label": "커리어넷 직업백과(배터리 기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10108"
      },
      {
        "label": "NCS 국가직무능력표준(리튬이온전지셀개발)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300010&ncsClCd=19011402&ncsLclasCd=19&ncsMclasCd=01&ncsSclasCd=14&ncsSubdCd=02"
      },
      {
        "label": "NCS 국가직무능력표준(리튬이온전지셀제조)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200284&ncsClCd=19011401&ncsLclasCd=19&ncsMclasCd=01&ncsSclasCd=14&ncsSubdCd=01"
      },
      {
        "label": "Q-Net 국가기술자격(화공기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1110"
      },
      {
        "label": "Q-Net 국가기술자격(금속재료기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1104"
      }
    ]
  },
  "신소재 연구원": {
    "does": [
      "금속, 고분자, 세라믹, 복합소재 설계와 합성 실험",
      "물리적, 화학적 특성 분석",
      "실험 결과 정리와 연구 보고서 작성",
      "시제품 제작과 생산 공정 설계 지원"
    ],
    "skills": [
      "재료 조직과 물성 이해",
      "화학과 물리 기초",
      "분석 장비 활용",
      "실험 설계와 데이터 분석",
      "시뮬레이션",
      "논문 독해와 보고서 작성"
    ],
    "certs": [
      {
        "name": "금속재료기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 금속조직학, 금속재료학, 야금공학, 금속가공학, 표면공학"
      },
      {
        "name": "화공기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "소재 합성과 분석 실험 담당",
      "문헌 조사와 연구 설계 담당",
      "결과 정리와 보고서 작성 담당"
    ],
    "quant": [
      "금속재료기사 취득",
      "대학원 석사 이상 학위(커리어넷: 석사나 박사 학위 취득 필요)",
      "재료공학, 신소재공학 전공 과목 이수",
      "영어 논문 독해 역량"
    ],
    "qual": [
      "학부 연구실 참여",
      "연구소나 기업 연구개발 부서 인턴",
      "학술대회 발표나 논문 작성",
      "소재 관련 공모전"
    ],
    "resumePoints": [
      "가설을 세우고 실험으로 검증한 과정",
      "분석 장비와 데이터로 결론을 낸 경험",
      "연구 결과를 보고서와 발표로 정리한 사례"
    ],
    "ncs": "재료설계, 화학신소재개발",
    "sources": [
      {
        "label": "커리어넷 직업백과(신소재 개발 연구원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10116"
      },
      {
        "label": "커리어넷 직업백과(재료공학기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=112"
      },
      {
        "label": "NCS 국가직무능력표준(재료설계)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200067&ncsClCd=16010101&ncsLclasCd=16&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=01"
      },
      {
        "label": "NCS 국가직무능력표준(화학신소재개발)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202300090&ncsClCd=17010302&ncsLclasCd=17&ncsMclasCd=01&ncsSclasCd=03&ncsSubdCd=02"
      },
      {
        "label": "Q-Net 국가기술자격(금속재료기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1104"
      }
    ]
  },
  "산업안전 관리자": {
    "does": [
      "사업장 안전, 보건 상태 점검",
      "위험성평가와 산업재해 예방 대책 수립",
      "근로자 안전교육 실시",
      "사고 원인 조사와 개선안 작성"
    ],
    "skills": [
      "산업안전보건 관계 법규",
      "기계, 전기, 화공 안전 지식",
      "위험성평가 기법",
      "안전교육 기획",
      "사고 분석",
      "점검 문서 작성"
    ],
    "certs": [
      {
        "name": "산업안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 산업재해 예방 및 안전보건교육, 인간공학 및 위험성 평가·관리, 기계·기구 및 설비 안전 관리, 전기설비 안전 관리, 화학설비 안전 관리, 건설공사 안전 관리. 안전관리자 자격 기준은 산업안전보건법 시행령 제17조 별표 4"
      },
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "산업안전산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "안전 점검 체크리스트와 위험성평가 담당",
      "안전 교육 자료 제작 담당",
      "사고 사례 조사와 개선안 담당"
    ],
    "quant": [
      "산업안전기사 취득",
      "건설안전기사 취득",
      "안전공학 관련 전공 이수",
      "산업안전보건법령 학습"
    ],
    "qual": [
      "현장 안전 점검 실습이나 인턴",
      "안전 캠페인, 안전교육 봉사",
      "사고 사례 분석 과제",
      "안전공학 동아리나 학회 활동"
    ],
    "resumePoints": [
      "위험 요인을 찾아 대책을 세운 경험",
      "법규를 근거로 점검과 교육을 진행한 사례",
      "사고나 문제의 원인을 분석해 개선한 과정"
    ],
    "ncs": "기계안전관리, 건설안전관리, 화공안전관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(산업안전관리원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=84"
      },
      {
        "label": "NCS 국가직무능력표준(건설안전관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200053&ncsClCd=23060103&ncsLclasCd=23&ncsMclasCd=06&ncsSclasCd=01&ncsSubdCd=03"
      },
      {
        "label": "NCS 국가직무능력표준(화공안전관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200054&ncsClCd=23060104&ncsLclasCd=23&ncsMclasCd=06&ncsSclasCd=01&ncsSubdCd=04"
      },
      {
        "label": "Q-Net 국가기술자격(산업안전기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1431"
      },
      {
        "label": "국가법령정보센터 산업안전보건법 시행령 제17조(안전관리자의 자격)",
        "url": "https://www.law.go.kr/법령/산업안전보건법시행령/제17조"
      }
    ]
  },
  "소방설비 엔지니어": {
    "does": [
      "소방시설 기본설계와 실시설계(소화설비, 경보설비, 제연설비)",
      "계통도, 평면도, 장비배치도 작성과 공사비 산출",
      "소방시설 공사 시공계획 수립과 시공 관리",
      "성능평가와 감리 업무 보조"
    ],
    "skills": [
      "소방원론과 소방유체역학",
      "소방 관계 법규",
      "소방 기계, 전기 시설의 구조와 원리",
      "도면 작성(CAD)",
      "화재, 피난 시뮬레이션",
      "시공 관리"
    ],
    "certs": [
      {
        "name": "소방설비기사(기계분야)",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 소방원론, 소방유체역학, 소방관계법규, 소방기계시설의 구조 및 원리"
      },
      {
        "name": "소방설비기사(전기분야)",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 소방원론, 소방전기일반, 소방관계법규, 소방전기시설의 구조 및 원리"
      },
      {
        "name": "건축설비기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "소방설비 설계 도면 담당",
      "법규 검토와 계산서 담당",
      "시뮬레이션과 성능평가 담당"
    ],
    "quant": [
      "소방설비기사(기계분야) 취득",
      "소방설비기사(전기분야) 취득",
      "소방학, 건축설비 관련 전공 이수",
      "CAD 활용 능력"
    ],
    "qual": [
      "소방시설 설계 팀 프로젝트",
      "소방설비 설계, 시공업체 인턴",
      "방재, 안전 관련 공모전",
      "소방시설 현장 견학"
    ],
    "resumePoints": [
      "법규와 기준에 맞게 설비를 설계한 경험",
      "도면과 계산으로 결과를 입증한 사례",
      "시공과 감리 과정에서 문제를 해결한 경험"
    ],
    "ncs": "소방시설설계·감리, 소방시설공사",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(소방시설설계·감리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC201800129&ncsClCd=05020101&ncsLclasCd=05&ncsMclasCd=02&ncsSclasCd=01&ncsSubdCd=01"
      },
      {
        "label": "NCS 국가직무능력표준(소방시설공사)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202100139&ncsClCd=05020102&ncsLclasCd=05&ncsMclasCd=02&ncsSclasCd=01&ncsSubdCd=02"
      },
      {
        "label": "Q-Net 국가기술자격(소방설비기사(기계분야))",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1900"
      },
      {
        "label": "Q-Net 국가기술자격(소방설비기사(전기분야))",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1910"
      }
    ]
  },
  "반도체 공정 엔지니어": {
    "does": [
      "노광, 식각, 증착, 세정 등 단위공정 장비 운영과 조건 설정",
      "수율과 생산성 분석, 불량 원인 파악",
      "공정 데이터 모니터링과 품질 관리",
      "클린룸과 설비 안전 관리"
    ],
    "skills": [
      "반도체 소자와 공정 이해",
      "물리, 화학 기초",
      "통계와 데이터 분석",
      "장비 운영 지식",
      "문제 해결",
      "영어 기술문서 독해"
    ],
    "certs": [
      {
        "name": "반도체설계산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "화공기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "전기기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "공정 실험과 데이터 분석 담당",
      "장비 운영과 조건 최적화 담당",
      "결과 보고서 작성 담당"
    ],
    "quant": [
      "반도체공학, 전자공학 전공 과목 이수",
      "통계와 데이터 분석 도구 활용",
      "관련 기사 자격 취득(화공기사, 전기기사 등)",
      "영어 독해 역량"
    ],
    "qual": [
      "반도체 공정 실습(팹 실습, 공정 교육 과정)",
      "반도체 기업 인턴",
      "소자 제작 프로젝트",
      "반도체 학회나 동아리 활동"
    ],
    "resumePoints": [
      "공정 문제의 원인을 데이터로 찾아 개선한 경험",
      "장비와 공정 조건을 이해하고 실험한 사례",
      "협업으로 수율이나 품질을 높인 과정"
    ],
    "ncs": "반도체제조",
    "sources": [
      {
        "label": "커리어넷 직업백과(반도체공학기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=157"
      },
      {
        "label": "NCS 국가직무능력표준(반도체제조)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500010&ncsClCd=19030602&ncsLclasCd=19&ncsMclasCd=03&ncsSclasCd=06&ncsSubdCd=02"
      },
      {
        "label": "Q-Net 국가기술자격(반도체설계산업기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=2175"
      },
      {
        "label": "Q-Net 국가기술자격(화공기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1110"
      }
    ]
  },
  "반도체 장비 엔지니어": {
    "does": [
      "반도체 장비 설치, 셋업, 시운전",
      "장비 유지보수와 고장 원인 분석",
      "장비 성능 평가와 공정 성능 검증",
      "팹 고객 기술 지원"
    ],
    "skills": [
      "기계, 전기, 진공, 플라즈마 기초",
      "장비 구조와 제어(PLC) 이해",
      "유지보수와 문제 해결",
      "도면 해석",
      "데이터 분석",
      "영어 매뉴얼 독해"
    ],
    "certs": [
      {
        "name": "전기기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "일반기계기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "장치 설계와 조립 담당",
      "제어와 전장 담당",
      "성능 테스트와 유지보수 기록 담당"
    ],
    "quant": [
      "일반기계기사 또는 전기기사 취득",
      "기계, 전기전자 전공 과목 이수",
      "CAD, PLC 활용 능력",
      "영어 독해 역량"
    ],
    "qual": [
      "장비 제작, 로봇, 자동화 프로젝트",
      "반도체 장비 회사 인턴",
      "팹 실습",
      "기계, 전자 동아리 활동"
    ],
    "resumePoints": [
      "장비를 직접 조립하거나 수리해 본 경험",
      "고장 원인을 체계적으로 찾은 과정",
      "현장 대응과 고객 소통 사례"
    ],
    "ncs": "반도체장비",
    "sources": [
      {
        "label": "커리어넷 직업백과(반도체공학기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=157"
      },
      {
        "label": "NCS 국가직무능력표준(반도체장비)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500008&ncsClCd=19030603&ncsLclasCd=19&ncsMclasCd=03&ncsSclasCd=06&ncsSubdCd=03"
      },
      {
        "label": "Q-Net 국가기술자격(전기기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1150"
      },
      {
        "label": "Q-Net 국가기술자격(일반기계기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1021"
      }
    ]
  },
  "반도체 소자 연구원": {
    "does": [
      "새로운 소자 구조와 재료 연구, 특성 분석",
      "소자 시뮬레이션과 설계",
      "제조공정 개발과 시제품 평가",
      "신뢰성 시험(환경, 수명)과 결과 분석"
    ],
    "skills": [
      "반도체 물리와 소자 이론",
      "재료 과학",
      "소자 시뮬레이션",
      "측정과 분석 장비 활용",
      "데이터 해석",
      "논문 독해와 작성"
    ],
    "certs": [
      {
        "name": "반도체설계산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "Q-Net 취득방법 탭에는 반도체커스텀레이아웃산업기사로 표기"
      },
      {
        "name": "전기기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "소자 설계와 시뮬레이션 담당",
      "제작 실험과 측정 담당",
      "문헌 조사와 보고서 담당"
    ],
    "quant": [
      "대학원 석사 이상 학위(커리어넷: 연구소나 업체는 석사 이상 요구하기도 함)",
      "반도체공학, 물리 전공 과목 이수",
      "시뮬레이션 도구 활용",
      "영어 논문 독해 역량"
    ],
    "qual": [
      "학부 연구실 참여",
      "소자 제작 실습",
      "학술대회 발표나 논문",
      "기업 연구소 인턴"
    ],
    "resumePoints": [
      "가설을 세워 실험으로 검증한 과정",
      "측정 데이터로 소자 특성을 해석한 경험",
      "연구 결과를 보고서와 발표로 정리한 사례"
    ],
    "ncs": "반도체개발, 반도체재료",
    "sources": [
      {
        "label": "커리어넷 직업백과(반도체공학기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=157"
      },
      {
        "label": "NCS 국가직무능력표준(반도체개발)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500006&ncsClCd=19030601&ncsLclasCd=19&ncsMclasCd=03&ncsSclasCd=06&ncsSubdCd=01"
      },
      {
        "label": "NCS 국가직무능력표준(반도체재료)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202500009&ncsClCd=19030604&ncsLclasCd=19&ncsMclasCd=03&ncsSclasCd=06&ncsSubdCd=04"
      },
      {
        "label": "Q-Net 국가기술자격(반도체설계산업기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=2175"
      }
    ]
  },
  "토목 시공·구조 엔지니어": {
    "does": [
      "도로, 교량, 터널, 상하수도 등 토목 시설 설계와 시공 관리",
      "설계도서 검토와 구조 계산서, 도면 작성",
      "공정표 작성과 자재, 인원, 장비 투입 검토",
      "측량, 품질 시험, 준공 검사 등 행정 처리"
    ],
    "skills": [
      "응용역학과 구조 해석",
      "토질과 기초",
      "측량",
      "철근콘크리트와 강구조",
      "도면 작성과 구조 해석 프로그램",
      "공정과 원가 관리"
    ],
    "certs": [
      {
        "name": "토목기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 응용역학, 측량학, 수리학 및 수문학, 철근콘크리트 및 강구조, 토질 및 기초, 상하수도공학"
      },
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "구조 계산과 해석 담당",
      "도면과 설계도서 작성 담당",
      "공정 계획과 현장 관리 담당"
    ],
    "quant": [
      "토목기사 취득",
      "건설안전기사 취득",
      "토목공학 전공 이수",
      "CAD, 구조해석 프로그램 활용 능력"
    ],
    "qual": [
      "건설회사, 토목엔지니어링회사 인턴",
      "구조물 설계 팀 프로젝트",
      "토목, 구조 공모전 참여",
      "측량 실습과 현장 견학"
    ],
    "resumePoints": [
      "구조물을 계산과 도면으로 설계한 경험",
      "공정과 자원을 검토해 일정대로 진행한 사례",
      "현장 안전과 품질 문제를 해결한 과정"
    ],
    "ncs": "토공, 교량설계, 토목건설사업관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(토목공학기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=137"
      },
      {
        "label": "NCS 국가직무능력표준(토공)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200417&ncsClCd=14020201&ncsLclasCd=14&ncsMclasCd=02&ncsSclasCd=02&ncsSubdCd=01"
      },
      {
        "label": "NCS 국가직무능력표준(교량설계)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400189&ncsClCd=14020104&ncsLclasCd=14&ncsMclasCd=02&ncsSclasCd=01&ncsSubdCd=04"
      },
      {
        "label": "Q-Net 국가기술자격(토목기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1250"
      },
      {
        "label": "Q-Net 국가기술자격(건설안전기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1440"
      }
    ]
  },
  "환경 엔지니어": {
    "does": [
      "수질, 대기 오염물질 측정과 분석",
      "오염 방지시설 설계와 운전 관리",
      "폐수, 폐기물 처리 공정 운영과 작업 기록",
      "환경 인허가와 대관 업무 지원"
    ],
    "skills": [
      "화학과 생물 기초",
      "수질, 대기 오염 방지 기술",
      "환경 공정시험기준",
      "환경 관계 법규",
      "측정 데이터 분석",
      "설비 운전과 유지관리"
    ],
    "certs": [
      {
        "name": "수질환경기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 수질오염개론, 상하수도계획, 수질오염방지기술, 수질오염 공정시험 기준"
      },
      {
        "name": "대기환경기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "필기 과목: 대기환경관리, 연소공학, 대기오염방지기술, 대기오염공정시험기준"
      },
      {
        "name": "폐기물처리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "시료 채취와 측정, 분석 담당",
      "처리 공정 설계와 계산 담당",
      "법규 검토와 보고서 작성 담당"
    ],
    "quant": [
      "수질환경기사 취득",
      "대기환경기사 취득",
      "환경공학 전공 이수",
      "환경 관계 법규 학습"
    ],
    "qual": [
      "환경 전문용역업체, 방지시설업체 인턴",
      "수질, 대기 측정 실험 프로젝트",
      "환경 공모전이나 환경 봉사",
      "하수처리장, 방지시설 현장 견학"
    ],
    "resumePoints": [
      "측정과 분석으로 오염 원인을 찾은 경험",
      "법규와 기준에 맞게 처리 방안을 세운 사례",
      "설비 운전 문제를 점검하고 개선한 과정"
    ],
    "ncs": "수질환경관리, 대기환경관리, 폐기물관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(환경공학기술자 및 연구원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1080"
      },
      {
        "label": "커리어넷 직업백과(대기환경기술자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=61"
      },
      {
        "label": "NCS 국가직무능력표준(수질환경관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202400250&ncsClCd=23010103&ncsLclasCd=23&ncsMclasCd=01&ncsSclasCd=01&ncsSubdCd=03"
      },
      {
        "label": "NCS 국가직무능력표준(대기환경관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsResultSearch.do?dutySvcNo=SVC202200058&ncsClCd=23010201&ncsLclasCd=23&ncsMclasCd=01&ncsSclasCd=02&ncsSubdCd=01"
      },
      {
        "label": "Q-Net 국가기술자격(수질환경기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1662"
      },
      {
        "label": "Q-Net 국가기술자격(대기환경기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=1661"
      }
    ]
  },
  "건설 안전관리자": {
    "does": [
      "건설현장의 안전, 보건 상태 점검과 위험요인 확인",
      "근로자 안전교육과 훈련 실시, 보호구 착용 확인",
      "산업재해 방지 대책 수립과 사고 원인 분석",
      "안전관리 계획 수립과 점검 기록 작성"
    ],
    "skills": [
      "산업안전보건법과 건설 관련 법규 이해",
      "위험성 평가와 재해 원인 분석",
      "건설 시공 공정과 설계 도면 이해",
      "안전교육 진행과 의사소통",
      "점검 기록과 보고서 작성"
    ],
    "certs": [
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "산업안전보건법 시행령 별표 4의 안전관리자 선임 자격에 건설안전산업기사 이상 포함"
      },
      {
        "name": "산업안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "안전관리자 선임 자격에 산업안전산업기사 이상 포함"
      },
      {
        "name": "건설안전산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "산업안전지도사",
        "issuer": "한국산업인력공단",
        "type": "국가전문자격",
        "note": "안전관리자 선임 자격에 포함"
      }
    ],
    "projectRole": [
      "현장 위험성 평가와 안전 점검표 작성 담당",
      "안전교육 자료 제작과 교육 진행 담당",
      "법규 검토와 안전관리 계획 문서화 담당"
    ],
    "quant": [
      "건설안전기사 또는 산업안전기사 취득(4년제 관련 학과 졸업 예정자 응시 가능)",
      "건설안전산업기사 또는 산업안전산업기사 취득",
      "안전공학, 건설안전 관련 학과 전공 과목 이수"
    ],
    "qual": [
      "건설현장 안전관리 인턴이나 현장 실습 경험",
      "위험성 평가 실습, 안전 점검 체크리스트 작성 경험",
      "안전보건 전시회 관람, 안전 관련 진로체험 참여",
      "재해 사례 분석 보고서 작성 경험"
    ],
    "resumePoints": [
      "산업안전보건법 등 법규를 근거로 위험요인을 찾고 대책을 세운 경험",
      "현장 점검과 안전교육을 직접 수행한 경험과 그 결과",
      "사고 원인 분석과 개선 방안 제안 경험"
    ],
    "ncs": "건설안전관리",
    "sources": [
      {
        "label": "커리어넷 직업백과 산업안전관리원",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=84"
      },
      {
        "label": "국가법령정보센터 산업안전보건법 시행령 별표 4 안전관리자의 자격",
        "url": "https://www.law.go.kr/LSW/lsBylInfoPLinkR.do?lsNm=산업안전보건법 시행령&bylNo=0004&bylBrNo=00&bylCls=BE"
      },
      {
        "label": "Q-Net 국가기술자격 건설안전산업기사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=2390"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "제약·바이오 연구원": {
    "does": [
      "국내외 의약품 개발 자료와 문헌 수집, 분석",
      "후보물질의 효능과 안전성 실험 보조와 데이터 정리",
      "의약품 원료 시험, 분석과 배합 비율 조정 실험",
      "실험 기록과 연구 보고서 작성"
    ],
    "skills": [
      "생물학, 화학, 의료 지식",
      "실험 설계와 실험실 장비 운용",
      "데이터 통계 분석",
      "영어 논문과 자료 독해",
      "실험 기록과 보고서 작성"
    ],
    "certs": [
      {
        "name": "생물공학기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷은 국가자격이 꼭 필요하지는 않다고 안내"
      },
      {
        "name": "바이오화학제품제조기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "화학분석기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "실험 설계와 데이터 분석 담당",
      "선행 연구 문헌 조사와 정리 담당",
      "실험 노트와 결과 보고서 작성 담당"
    ],
    "quant": [
      "석사 이상 학위(커리어넷: 연구 분야는 보통 석사 이상 요구)",
      "생물공학기사, 화학분석기사 등 관련 국가기술자격 취득",
      "영어 공인 성적(논문과 자료 독해용)",
      "생명과학, 화학, 생명공학 전공 심화 과목 이수"
    ],
    "qual": [
      "학부 연구실 인턴이나 졸업 연구 참여",
      "정부출연연구소, 제약회사 연구보조원이나 인턴 경험",
      "실험 결과를 발표하거나 포스터로 정리한 경험",
      "실험 노트 기록 습관"
    ],
    "resumePoints": [
      "실험을 직접 설계하고 수행해 결론을 낸 경험",
      "문헌과 데이터를 분석해 문제를 해결한 과정",
      "꼼꼼한 기록과 안전 규정 준수 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 신약개발연구원",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1436"
      },
      {
        "label": "커리어넷 직업백과 유전공학연구원",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=24"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ]
  },
  "식품 연구원": {
    "does": [
      "신제품 기획과 재료 선택, 배합과 조리 방법 실험",
      "식품 성분 검사와 유해 성분, 첨가물 안전성 시험",
      "자사와 경쟁사 제품 분석, 소비자 반응 조사",
      "시험 결과 보고서 작성과 생산 공정 개선 지원"
    ],
    "skills": [
      "식품 가공과 제조 공정 지식",
      "화학, 미생물 분석 실험",
      "식품위생법 등 관련 법규 이해",
      "관능 평가와 데이터 분석",
      "보고서 작성"
    ],
    "certs": [
      {
        "name": "식품기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "식품산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "영양사",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "식품영양학과 졸업자 응시"
      },
      {
        "name": "위생사",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허"
      }
    ],
    "projectRole": [
      "제품 개발 실험과 배합 설계 담당",
      "성분 분석과 품질 검사 담당",
      "관능 평가 설계와 결과 정리 담당"
    ],
    "quant": [
      "식품기사 또는 식품산업기사 취득",
      "영양사 면허(식품영양학과 기준)",
      "연구개발 분야는 석사 이상 학위 요구 사례 있음(커리어넷)",
      "식품공학, 식품가공 전공 과목 이수"
    ],
    "qual": [
      "식품회사 연구소, 품질관리 부서 인턴 경험",
      "신제품 개발 공모전이나 레시피 개발 프로젝트",
      "실험실 분석 실습과 결과 보고서 작성 경험",
      "식품 관련 학회나 전시회 참여"
    ],
    "resumePoints": [
      "제품을 기획하고 실험해 개선한 경험",
      "성분 분석과 안전성 검사를 수행한 경험",
      "법규와 위생 기준을 지키며 일한 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 식품공학기술자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=162"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      }
    ]
  },
  "화장품 연구원": {
    "does": [
      "화장품 처방 설계와 시제품 제조 실험",
      "원료 특성 분석과 안정성, 안전성 시험",
      "제조 공정과 품질 기준 검토",
      "실험 기록과 시험 성적 보고서 작성"
    ],
    "skills": [
      "유기화학, 고분자, 계면화학 지식",
      "화장품 원료와 처방 이해",
      "분석 장비 운용과 실험 데이터 해석",
      "화장품법과 안전 기준 이해",
      "보고서 작성"
    ],
    "certs": [
      {
        "name": "맞춤형화장품조제관리사",
        "issuer": "식품의약품안전처(시험 시행 대한상공회의소)",
        "type": "국가전문자격",
        "note": "화장품법에 따른 자격시험, 책임판매관리자 자격 요건 중 하나"
      },
      {
        "name": "화학분석기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "화공기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "처방 설계와 시제품 제조 담당",
      "원료 조사와 안정성 시험 담당",
      "실험 데이터 정리와 결과 발표 담당"
    ],
    "quant": [
      "맞춤형화장품조제관리사 취득",
      "화학분석기사 또는 화공기사 취득",
      "화장품학, 화학 전공 과목 이수",
      "연구개발 직무는 석사 이상 요구 사례 있음(커리어넷 화학공학기술자 안내)"
    ],
    "qual": [
      "화장품 제조사, 연구소 인턴 경험",
      "처방 개발 프로젝트나 화장품 공모전 참여",
      "분석 장비 실습과 실험 보고서 작성 경험",
      "화장품 원료 전시회나 학회 참여"
    ],
    "resumePoints": [
      "처방을 설계하고 시제품을 만들어 개선한 경험",
      "원료 분석과 안정성 시험을 수행한 경험",
      "안전 기준과 법규를 지키며 실험한 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 화학공학기술자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=952"
      },
      {
        "label": "식품의약품안전처",
        "url": "https://www.mfds.go.kr/"
      },
      {
        "label": "대한상공회의소 자격평가사업단",
        "url": "https://license.korcham.net/"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ]
  },
  "화장품 품질관리 담당자": {
    "does": [
      "원료 입고부터 완제품 출고까지 시험과 검사 수행",
      "제품이 품질 기준을 만족하는지 확인하는 품질 통제",
      "시험 성적서 작성과 품질 기록 관리",
      "제조 공정의 품질관리 기준 운영 지원"
    ],
    "skills": [
      "화장품법과 품질관리 기준 이해",
      "분석 장비 운용과 시험법 이해",
      "미생물, 이화학 시험 지식",
      "기록 관리와 문서 작성",
      "꼼꼼함과 규정 준수"
    ],
    "certs": [
      {
        "name": "맞춤형화장품조제관리사",
        "issuer": "식품의약품안전처(시험 시행 대한상공회의소)",
        "type": "국가전문자격",
        "note": "화장품법 시행규칙상 책임판매관리자 자격 요건 중 하나"
      },
      {
        "name": "화학분석기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "품질경영기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "시험 계획 수립과 검사 담당",
      "품질 기록과 문서 관리 담당",
      "불량 원인 분석과 개선안 정리 담당"
    ],
    "quant": [
      "맞춤형화장품조제관리사 취득",
      "화학분석기사 또는 품질경영기사 취득",
      "화장품학, 화학 전공 과목 이수"
    ],
    "qual": [
      "화장품 제조사 품질관리 부서 인턴 경험",
      "분석 장비 실습과 시험 성적서 작성 경험",
      "품질 기준 문서를 읽고 체크리스트로 만든 경험",
      "실험실 안전과 기록 관리 습관"
    ],
    "resumePoints": [
      "기준에 따라 시험하고 결과를 기록한 경험",
      "불량이나 이상을 찾아 원인을 분석한 경험",
      "법규와 절차를 지키는 꼼꼼한 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 화학공학기술자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=952"
      },
      {
        "label": "국가법령정보센터 화장품법 시행규칙",
        "url": "https://www.law.go.kr/법령/화장품법시행규칙"
      },
      {
        "label": "식품의약품안전처",
        "url": "https://www.mfds.go.kr/"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ]
  },
  "한의학 연구원": {
    "does": [
      "한의 이론(경혈, 경락 등)의 과학적 규명 연구 보조",
      "한약의 안전성과 유효성 실험, 데이터 정리",
      "한의 의료기술의 임상 근거 자료 수집과 분석",
      "실험 기록과 논문, 보고서 작성"
    ],
    "skills": [
      "한의학 이론과 생명과학 기초 지식",
      "실험 설계와 분석 장비 운용",
      "통계 분석과 데이터 처리",
      "영어 논문 독해와 작성",
      "연구 윤리와 기록 관리"
    ],
    "certs": [
      {
        "name": "한의사",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "한의예과 졸업 후 국가시험. 연구직 지원 시 필수는 아니나 한의학 전공 연구에 유리"
      }
    ],
    "projectRole": [
      "문헌 조사와 연구 설계 담당",
      "실험 수행과 데이터 분석 담당",
      "결과 정리와 발표 담당"
    ],
    "quant": [
      "한의사 면허(한의예과 기준)",
      "석사 이상 학위(한국한의학연구원 연구직 공고는 석사 이상 요구 사례 있음)",
      "영어 공인 성적",
      "논문, 특허 등 연구 실적(한국한의학연구원 연구직 전형 제출 항목)"
    ],
    "qual": [
      "학부 연구실이나 한의학 연구기관 인턴 참여",
      "실험 결과 발표와 세미나 경험(연구직 1차 면접이 세미나 면접)",
      "학회 발표나 논문 작성 참여",
      "실험 노트 기록 습관"
    ],
    "resumePoints": [
      "연구 주제를 정하고 실험이나 분석을 끝까지 수행한 경험",
      "논문, 특허 등 실적과 그 과정에서의 역할",
      "협업과 발표 능력(세미나 면접, 심층 면접 대비)"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국한의학연구원 채용안내",
        "url": "https://kiom.re.kr/menu.es?mid=a10503010100"
      },
      {
        "label": "한국한의학연구원 연구분야",
        "url": "https://kiom.re.kr/menu.es?mid=a10101000000"
      },
      {
        "label": "커리어넷 직업백과 한의사",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=37"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      }
    ],
    "recruitNotes": [
      "한국한의학연구원 연구직 전형: 서류전형 → 인성검사(온라인) → 1차 면접(실기, 세미나 면접) → 2차 면접(심층 면접) → 신체검사 → 신원조회",
      "연구직은 논문(최근 3년), 특허와 기술이전 등 실적(최근 5년)을 온라인 입력하고 증빙 제출"
    ]
  },
  "방위산업체 연구원": {
    "does": [
      "무기체계 연구개발 과제의 설계, 시험 보조",
      "기술 자료와 규격 조사, 분석",
      "시험 데이터 정리와 결과 보고서 작성",
      "사업관리 지원(일정, 산출물 관리)"
    ],
    "skills": [
      "기계, 전기전자, 전산, 산업공학 등 공학 기초",
      "무기체계와 국방 획득 절차 이해",
      "시험 평가와 데이터 분석",
      "기술 문서 작성",
      "보안 규정 준수"
    ],
    "certs": [],
    "projectRole": [
      "시스템 설계와 시험 담당",
      "기술 자료 조사와 요구사항 정리 담당",
      "일정과 산출물 관리 담당"
    ],
    "quant": [
      "학사 이상 학위(국방과학연구소 2026년 2차 공개채용 기준, 분야별 석사 요구 사례 있음)",
      "군사·국방·안보, 자연계열, 공학계열 전공",
      "영어 공인 성적"
    ],
    "qual": [
      "공학 설계나 시험 평가 프로젝트 경험",
      "국방, 방산 관련 공모전이나 캡스톤 디자인 참여",
      "연구실 인턴이나 기업 인턴 경험",
      "기술 보고서 작성 경험"
    ],
    "resumePoints": [
      "공학 프로젝트에서 설계, 시험을 수행한 경험",
      "요구사항을 분석하고 문서로 정리한 경험",
      "보안과 규정을 지키는 태도, 국방 분야 관심"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국방과학연구소",
        "url": "https://www.add.re.kr/"
      },
      {
        "label": "국방과학연구소 부설 국방신속획득기술연구원 2026년도 2차 공개채용(채용정보 사이트 요약)",
        "url": "https://www.jinhakpro.com/recruit/43886"
      }
    ],
    "recruitNotes": [
      "국방과학연구소(부설 포함) 공개채용: 학사 이상(분야별 자격 요건 상이), 전공은 군사·국방·안보, 자연계열, 공학계열. 2026년 2차 공개채용은 2026.6.29~7.10 접수"
    ]
  },
  "바이오 연구원": {
    "does": [
      "생명체의 구조, 유전, 환경에 대한 실험실 연구와 현지 조사 보조",
      "과학 장비로 생물 표본 실험과 데이터 수집",
      "통계 기법으로 자료 분석과 평가",
      "의학, 농업, 약품 분야 활용을 위한 보고서 작성"
    ],
    "skills": [
      "생물학, 화학 기초 지식",
      "실험 설계와 장비 운용",
      "통계 분석",
      "영어 논문 독해",
      "실험 기록과 보고서 작성"
    ],
    "certs": [
      {
        "name": "생물공학기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷은 국가자격이 꼭 필요하지는 않다고 안내"
      },
      {
        "name": "바이오화학제품제조기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "실험 수행과 데이터 분석 담당",
      "문헌 조사와 연구 설계 담당",
      "결과 정리와 발표 담당"
    ],
    "quant": [
      "대학원 진학(커리어넷: 대학교, 대학원 졸업이 유리)",
      "생물공학기사 등 관련 국가기술자격 취득",
      "영어 공인 성적",
      "생명과학 전공 심화 과목 이수"
    ],
    "qual": [
      "학부 연구실 참여와 졸업 연구",
      "정부출연연구소, 기업부설연구소 인턴 경험",
      "학회 포스터 발표나 논문 참여",
      "실험 노트 기록 습관"
    ],
    "resumePoints": [
      "실험을 설계하고 수행해 결과를 해석한 경험",
      "데이터를 통계적으로 분석한 경험",
      "꼼꼼한 기록과 연구 윤리 준수 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 생물학연구원",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=13"
      },
      {
        "label": "커리어넷 직업백과 유전공학연구원",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=24"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ]
  },
  "제약회사 연구·QC": {
    "does": [
      "의약품 원료와 제품의 시험, 분석",
      "제품이 품질 기준을 만족하는지 확인하는 품질 통제",
      "원료 배합 비율 조정 등 제품 개량 실험 지원",
      "시험 성적서와 품질 기록 작성"
    ],
    "skills": [
      "화학, 생물학 분석 실험",
      "분석 장비(HPLC 등) 운용과 시험법 이해",
      "품질관리 기준과 기록 관리",
      "데이터 해석",
      "규정 준수와 꼼꼼함"
    ],
    "certs": [
      {
        "name": "화학분석기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "생물공학기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "품질경영기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "시험 계획과 분석 실험 담당",
      "품질 기록과 문서 관리 담당",
      "실험 데이터 정리와 결과 보고 담당"
    ],
    "quant": [
      "화학분석기사 또는 생물공학기사 취득",
      "품질경영기사 취득",
      "생명과학, 화학 전공 분석 실험 과목 이수",
      "연구직은 석사 이상 요구 사례 있음(커리어넷 신약개발연구원 안내)"
    ],
    "qual": [
      "제약회사 품질관리, 연구소 인턴 경험",
      "분석 장비 실습과 시험 성적서 작성 경험",
      "학부 연구실 참여 경험",
      "실험실 안전과 기록 관리 습관"
    ],
    "resumePoints": [
      "분석 실험을 기준에 맞게 수행하고 기록한 경험",
      "이상 결과의 원인을 찾아 해결한 경험",
      "규정과 절차를 지키는 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 신약개발연구원",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1436"
      },
      {
        "label": "커리어넷 직업백과 화학공학기술자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=952"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ]
  },
  "건설 공기업(LH 등)": {
    "does": [
      "주택, 도시 개발 사업의 건축 설계 검토와 공사 관리",
      "설계도와 시방서 검토, 인허가 관련 자료 작성",
      "공사 현장 품질, 공정, 안전 점검",
      "사업 관련 보고서와 문서 작성"
    ],
    "skills": [
      "건축 계획, 구조, 시공 지식",
      "건축 관련 법규 이해",
      "도면 해독과 설계 검토",
      "의사소통과 문서 작성",
      "NCS 직업기초능력(의사소통, 수리, 문제해결 등)"
    ],
    "certs": [
      {
        "name": "건축기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "공기업 기술직 공고에서 자격증 가점 항목으로 흔히 쓰임"
      },
      {
        "name": "건축산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "설계 검토와 도면 작성 담당",
      "공정과 예산 관리 담당",
      "법규 검토와 인허가 문서 담당"
    ],
    "quant": [
      "건축기사 취득",
      "NCS 직업기초능력평가 대비",
      "영어 공인 성적",
      "한국사능력검정시험"
    ],
    "qual": [
      "건설회사나 공공기관 건축 분야 인턴 경험",
      "건축 설계 공모전이나 캡스톤 프로젝트",
      "현장 실습과 공정 관리 경험",
      "공공 주택, 도시 개발 정책 관심과 자료 조사"
    ],
    "resumePoints": [
      "건축 전공 지식을 실제 프로젝트에 적용한 경험",
      "팀에서 맡은 역할과 문제 해결 과정",
      "공공기관 인재상과 직무 관련 경험의 연결"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "잡알리오 공공기관 채용정보",
        "url": "https://job.alio.go.kr/"
      },
      {
        "label": "LH 한국토지주택공사 채용",
        "url": "https://lh.incruit.com/"
      },
      {
        "label": "커리어넷 직업백과 건축사",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1277"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ],
    "recruitNotes": [
      "한국토지주택공사 2026년 하반기 신입사원(6급) 공채 모집 분야에 기술직 건축 포함(일반, 보훈 구분). 2026.9.22~9.29 접수(채용정보 사이트 요약)"
    ]
  },
  "공무원 시설직": {
    "does": [
      "공공 건축물의 건축 허가, 인허가 민원 처리",
      "공공시설 신축, 보수 공사의 설계 검토와 감독",
      "건축물 유지관리와 안전 점검",
      "관련 법규 검토와 행정 문서 작성"
    ],
    "skills": [
      "건축 계획과 건축 구조 지식",
      "건축법 등 관련 법규 이해",
      "도면 해독과 공사 감독",
      "민원 응대와 의사소통",
      "행정 문서 작성"
    ],
    "certs": [
      {
        "name": "건축기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "건축산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "설계 검토와 법규 검토 담당",
      "공정과 예산 관리 담당",
      "보고서와 발표 자료 작성 담당"
    ],
    "quant": [
      "9급 건축직 필기시험 과목(국어, 영어, 한국사, 건축계획, 건축구조) 학습",
      "건축기사 취득(가산점 적용 여부는 공고 확인)",
      "영어, 한국사 능력검정시험 대체 적용 여부 공고 확인"
    ],
    "qual": [
      "건축 설계, 시공 관련 현장 실습",
      "공공 건축 관련 봉사나 지자체 인턴 경험",
      "건축 법규를 다룬 프로젝트 경험",
      "민원 응대나 행정 보조 아르바이트 경험"
    ],
    "resumePoints": [
      "공직 가치와 봉사 경험(면접 시 공직관 평가)",
      "건축 전공 지식을 실제로 적용한 경험",
      "민원 응대, 협업에서의 의사소통 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "사이버국가고시센터",
        "url": "https://www.gosi.kr/"
      },
      {
        "label": "국가공무원 채용시스템 시험공고",
        "url": "https://gongmuwon.gosi.kr/oprut/RpaRpTestPbancLst.do"
      },
      {
        "label": "국가법령정보센터 공무원임용시험령",
        "url": "https://www.law.go.kr/법령/공무원임용시험령"
      },
      {
        "label": "커리어넷 직업백과 건축사",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1277"
      }
    ]
  },
  "에너지 공기업": {
    "does": [
      "발전, 송배전, 가스 등 에너지 설비의 운영과 점검",
      "설비 기술 자료 분석과 시스템 설계 지원",
      "공정 관리와 품질 관리 업무",
      "현장 안전 점검과 보고서 작성"
    ],
    "skills": [
      "전기, 화공, 에너지 공학 기초",
      "설비 운영과 안전 관리 지식",
      "데이터 분석과 보고서 작성",
      "NCS 직업기초능력(의사소통, 수리, 문제해결 등)",
      "협업과 현장 의사소통"
    ],
    "certs": [
      {
        "name": "에너지관리기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "전기기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "한국전력공사는 기술 분야 응시자격으로 해당 전공 또는 관련 자격증 요구"
      },
      {
        "name": "화공기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "원자력기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "설비 설계와 데이터 분석 담당",
      "일정과 예산 관리 담당",
      "안전 점검과 문서 작성 담당"
    ],
    "quant": [
      "영어 공인 성적(한국전력공사 2026 하반기: TOEIC 기준 700점 이상, 고급자격증 보유자는 면제)",
      "관련 기사 자격 취득(한국전력공사 서류전형 자격증 가점 기술 40점 만점)",
      "NCS 직무능력검사 대비(한국전력공사 2차 필기 100점)",
      "에너지, 전기, 화공 전공 과목 이수"
    ],
    "qual": [
      "공기업 체험형 인턴 참여(한국전력공사는 체험형 인턴 수료자 2차 전형 가점)",
      "에너지 관련 공모전, 경진대회 참여(한국전력공사 주관 대회 입상 시 가점)",
      "발전소, 설비 현장 실습 경험",
      "에너지 정책과 산업 동향 조사"
    ],
    "resumePoints": [
      "전공 지식을 설비나 프로젝트에 적용한 경험",
      "팀 프로젝트에서의 문제 해결과 협업 경험(경험면접 50점)",
      "직무 이해와 지원 동기(직무면접 50점)"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "잡알리오 한국전력공사 2026년도 하반기 4직급 대졸수준 신입사원 채용공고",
        "url": "https://job.alio.go.kr/recruitview.do?idx=304551"
      },
      {
        "label": "한국전력공사 채용",
        "url": "http://recruit.kepco.co.kr"
      },
      {
        "label": "커리어넷 직업백과 에너지공학기술자",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=995"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ],
    "recruitNotes": [
      "한국전력공사 2026년 하반기 4직급 대졸수준 신입 채용: 사무는 전공 제한 없음, 기술은 해당 분야 전공자 또는 관련 자격증 보유자. 외국어 TOEIC 기준 700점 이상(고급자격증 보유자 면제), 연령 제한 없음",
      "전형: 1차 서류(외국어 100점, 자격증 가점 사무 20점/기술 40점) → 2차 필기(직무능력검사 100점, 인성·인재상·조직적합도 적부) → 3차 면접(직무면접 50점, 경험면접 50점)",
      "우대: 비수도권 1차 1% 가점, 본사 이전지역 인재 3% 가점, 체험형 인턴 수료자 2차 3~5% 가점 등(공고 원문 기준)"
    ]
  },
  "소방공무원": {
    "does": [
      "화재 진압과 소방용수 시설 관리",
      "구조, 구급 출동과 환자 이송",
      "건축물 소방시설 점검과 화재 예방 순찰",
      "재난 피해 복구 지원"
    ],
    "skills": [
      "강인한 체력과 신체 운동 능력",
      "소방학개론, 소방관계법규 지식",
      "응급처치와 구조 기술",
      "위기 상황 판단력",
      "팀워크와 지시 이행"
    ],
    "certs": [
      {
        "name": "제1종 보통 운전면허(또는 제1종 대형면허)",
        "issuer": "경찰청(도로교통공단)",
        "type": "면허",
        "note": "필수. 공채와 소방장 이하 경채 응시자는 제1종 대형 또는 제1종 보통면허 소지(자동변속기 조건부 포함)"
      },
      {
        "name": "소방설비기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "응급구조사",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "국가전문자격",
        "note": "구급 분야 경력경쟁채용 응시 요건"
      }
    ],
    "projectRole": [
      "체력 훈련 계획과 기록 관리 담당",
      "안전 점검과 응급처치 교육 담당",
      "현장 상황 보고와 기록 담당"
    ],
    "quant": [
      "공채 필기 3과목: 소방학개론(25문항), 소방관계법규(25문항), 행정법총론(25문항), 과목당 100점 만점",
      "체력시험 6종목(악력, 배근력, 앉아윗몸앞으로굽히기, 제자리멀리뛰기, 윗몸일으키기, 왕복오래달리기) 총점 60점 중 30점 이상",
      "제1종 보통 이상 운전면허",
      "자격증 등 소지자 가점(소방업무관련분야, 사무관리분야, 한국어·외국어능력검정, 최종 환산점수의 5% 이내)"
    ],
    "qual": [
      "소방 관련 학과 전공(소방관련학과 경력경쟁채용 응시 경로)",
      "소방 안전 봉사활동, 소방서 진로체험 참여",
      "응급처치 교육 이수와 구조 훈련 경험",
      "꾸준한 체력 훈련 기록"
    ],
    "resumePoints": [
      "체력과 위기 대응 능력을 보여 주는 경험",
      "봉사와 공공 안전에 대한 태도",
      "팀 안에서 지시를 따르고 협력한 경험(면접 25% 반영)"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "소방청 공고 제2026-1호 2026년 소방공무원 채용시험 시행계획 공고(원문 PDF)",
        "url": "https://files-scs.pstatic.net/2026/01/26/LfZ232ln5R/2026년 소방공무원 채용시험 시행계획 공고.pdf"
      },
      {
        "label": "국가공무원 채용시스템(소방청 채용 공고 게시)",
        "url": "https://gongmuwon.gosi.kr/"
      },
      {
        "label": "커리어넷 직업백과 소방관",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=385"
      },
      {
        "label": "소방청",
        "url": "https://www.nfa.go.kr/"
      }
    ],
    "recruitNotes": [
      "2026년 소방공무원 채용(소방청 공고 제2026-1호): 공채 소방사 응시연령 18세 이상 40세 이하. 전형 필기시험 → 체력시험 → 서류전형 → 면접시험, 신체검사는 채용후보자 등록 시 서류 심사",
      "공채 필기: 소방학개론, 소방관계법규, 행정법총론 각 25문항(75분). 경채 일반: 소방학개론 25문항, 소방관계법규 40문항. 구급: 소방학개론, 응급처치학개론. 소방관련학과는 일반분야 과목 응시",
      "성적 반영 비율: 필기 50% + 체력 25% + 면접 25%. 체력시험 6종목 총점 60점의 50%(30점) 이상 합격",
      "소방관계법규 범위: 소방기본법, 소방의 화재조사에 관한 법률, 소방시설공사업법, 화재의 예방 및 안전관리에 관한 법률, 소방시설 설치 및 관리에 관한 법률, 위험물안전관리법과 하위법령"
    ]
  },
  "안전 관련 공기업": {
    "does": [
      "사업장 안전보건 기술 지도와 점검",
      "재해 예방 교육과 안전 자료 제작",
      "산업재해 원인 조사와 통계 분석",
      "안전 인증, 검사 업무 지원과 보고서 작성"
    ],
    "skills": [
      "산업안전보건법 등 법규 이해",
      "기계, 전기, 화공, 건설 등 전공별 안전 기술",
      "위험성 평가와 재해 분석",
      "교육 진행과 의사소통",
      "NCS 직업기초능력"
    ],
    "certs": [
      {
        "name": "산업안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "안전 분야 공기업 기술직 공고에서 응시 요건이나 가점으로 자주 쓰임"
      },
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "소방설비기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "위험물산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "위험성 평가와 안전 점검 담당",
      "안전교육 자료 제작 담당",
      "데이터 정리와 보고서 작성 담당"
    ],
    "quant": [
      "산업안전기사 등 전공별 안전 기사 자격 취득",
      "NCS 직업기초능력평가 대비",
      "영어 공인 성적",
      "소방방재, 안전공학 전공 과목 이수"
    ],
    "qual": [
      "안전 관련 공기업 체험형 인턴 참여",
      "사업장 안전 점검이나 안전교육 보조 경험",
      "재해 사례 분석 프로젝트",
      "안전 관련 공모전이나 캠페인 참여"
    ],
    "resumePoints": [
      "법규를 근거로 위험요인을 찾고 개선한 경험",
      "안전교육이나 점검을 직접 수행한 경험",
      "공공기관 인재상과 안전에 대한 책임감"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국산업안전보건공단 채용",
        "url": "https://kosha.career.co.kr/"
      },
      {
        "label": "잡알리오 공공기관 채용정보",
        "url": "https://job.alio.go.kr/"
      },
      {
        "label": "커리어넷 직업백과 산업안전관리원",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=84"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      }
    ],
    "recruitNotes": [
      "한국산업안전보건공단 2026년 상반기 채용: 신입 전문직 5급 산업안전 분야를 기계, 전기, 화공, 환경, 건축, 토목으로 나누어 모집(일반, 지역인재, 장애 구분). 2026.2.26~3.9 접수(채용정보 사이트 요약)"
    ]
  },
  "건설 공기업(도로·수자원·LH 등)": {
    "does": [
      "도로, 댐, 상하수도, 택지 등 공공 인프라 사업의 설계 검토와 공사 감독 보조",
      "시공사 공정, 품질, 안전 관리 현황 점검과 보고서 작성",
      "준공 시설물 점검, 유지관리 계획 수립 지원",
      "사업 타당성 조사와 기본계획 자료 정리"
    ],
    "skills": [
      "응용역학과 토목설계 기초",
      "설계도서와 시방서 해석",
      "공정, 품질, 안전 관리 지식",
      "시설물 점검과 유지관리 이해",
      "NCS 직업기초능력(의사소통, 수리, 문제해결)"
    ],
    "certs": [
      {
        "name": "토목기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "건설 공기업 기술직 공고에서 응시 자격이나 우대 자격으로 흔히 제시, 기관별 공고 확인"
      },
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "토목산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "구조 해석과 설계 계산 담당",
      "공정표와 안전관리 계획 작성 담당",
      "현장 조사와 측량 자료 정리 담당"
    ],
    "quant": [
      "토목기사 취득(졸업 학년에 응시 가능)",
      "NCS 직업기초능력 필기 대비(의사소통, 수리, 문제해결 등)",
      "직무역량(전공) 필기 대비: 응용역학, 토질역학, 수리학, 철근콘크리트 등 토목 전공 과목",
      "한국사능력검정시험, 공인 영어 성적(기관별 공고에서 요구 여부 확인)"
    ],
    "qual": [
      "토목 설계나 구조 해석이 들어간 캡스톤 프로젝트",
      "건설 현장 실습이나 공기업 체험형 인턴",
      "교량, 도로, 수자원 관련 공모전 참가",
      "시설물 안전점검 봉사나 견학 기록"
    ],
    "resumePoints": [
      "설계도서를 읽고 시공, 품질, 안전 관리 관점에서 문제를 찾아낸 경험",
      "타당성 조사나 기본계획처럼 사업 초기 단계의 분석 경험",
      "공공 인프라의 유지관리와 안전을 중시하는 태도"
    ],
    "ncs": "토목건설사업관리, 하천(댐)설계, 상하수도설계",
    "sources": [
      {
        "label": "NCS 공정채용 공고(한국수자원공사 2025년 상반기 신입 공채)",
        "url": "https://www.ncs.go.kr/blind/bl04/RecrtNotifDetail.do?recrtNo=20241218100110"
      },
      {
        "label": "NCS 국가직무능력표준(건설 > 토목 > 토목설계·감리 세분류)",
        "url": "https://m.ncs.go.kr/mobile/rm08/ncsField.do?ncsLclasCd=14&ncsMclasCd=02&ncsSclasCd=01"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "LH 채용 사이트",
        "url": "https://apply.lh.or.kr/"
      }
    ],
    "recruitNotes": [
      "한국수자원공사 2025년 상반기 일반직 신입 공채: 채용 분야에 건축토목(토목, 조경, 지질), 사무행정(행정), 기술(기계, 전기, 전자통신), 전산, 환경 포함",
      "같은 공고에서 토목 분야 NCS 요구능력단위로 설계기획관리, 유지관리, 상하수도설계, 하천(댐)설계, 단지설계, 토목건설사업관리를 제시",
      "전형 단계와 필기 배점은 기관별 공고 원문(잡알리오, 각 기관 채용 사이트)에서 확인"
    ]
  },
  "공무원 토목직": {
    "does": [
      "도로, 하천, 상하수도 등 공공 토목사업의 설계 검토와 공사 감독",
      "민간 건설공사 인허가 서류 검토와 현장 확인",
      "시설물 안전점검과 재해 복구 현장 조사",
      "사업 예산, 설계변경, 준공 서류 처리"
    ],
    "skills": [
      "응용역학과 토목설계 기초",
      "건설 관계 법령과 행정 절차 이해",
      "설계도서와 공사비 내역 검토",
      "현장 안전과 품질 점검",
      "민원 응대와 문서 작성"
    ],
    "certs": [
      {
        "name": "토목기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "공채 응시 요건은 아니며, 기술직 가산점 적용 여부는 해당 연도 공고 확인"
      },
      {
        "name": "토목산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "구조 해석과 설계 계산 담당",
      "현장 조사와 측량 자료 정리 담당",
      "공정과 안전 점검표 작성 담당"
    ],
    "quant": [
      "9급 토목직 필기: 국어, 영어, 한국사, 응용역학개론, 토목설계",
      "2027년부터 한국사는 한국사능력검정시험 3급 이상으로 대체, 국어, 영어, 전문과목 문항 수 25문항으로 확대",
      "토목기사 취득(가산점 적용 여부는 공고 확인)"
    ],
    "qual": [
      "토목 설계나 구조 해석 캡스톤 프로젝트",
      "지자체나 공공기관 건설 부서 실습, 인턴",
      "시설물 안전점검, 재해 복구 봉사 경험",
      "건설 관련 공모전 참가"
    ],
    "resumePoints": [
      "설계도서를 검토하고 현장을 확인해 문제를 잡아낸 경험",
      "법령과 절차에 맞게 일을 처리하는 꼼꼼함",
      "주민 안전과 공공성을 우선하는 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국가법령정보센터(임용시험 과목표 별표, 2023.12.29 개정)",
        "url": "https://www.law.go.kr/LSW//flDownload.do?gubun=&flSeq=136017543"
      },
      {
        "label": "정책브리핑(9급 공무원 시험 2027년 개편)",
        "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148945321"
      },
      {
        "label": "국가공무원 채용시스템(사이버국가고시센터)",
        "url": "https://gongmuwon.gosi.kr/oprut/indexMain.do"
      },
      {
        "label": "지방공무원 임용시험",
        "url": "https://local.gosi.go.kr/"
      }
    ],
    "recruitNotes": [
      "국가직 9급 공채 토목직 필기: 제1차(공통) 국어, 영어, 한국사 / 제2차(전문) 응용역학개론, 토목설계 (법령 별표 기준, 과목당 20문항)",
      "2027년부터 국가직과 지방직 9급 공채 한국사는 한국사능력검정시험 3급 이상 취득으로 대체, 국어, 영어, 전문과목은 과목당 25문항",
      "전형: 필기시험 → 면접시험, 원서접수는 국가공무원 채용시스템(gongmuwon.gosi.kr), 지방직은 지방공무원 임용시험 사이트"
    ]
  },
  "안전 공기업·공단": {
    "does": [
      "사업장과 건설현장 안전점검, 위험성 평가 지원",
      "시설물 안전진단 자료 정리와 보고서 작성",
      "안전 교육과 기술지도 자료 준비",
      "재해 사례 조사와 통계 정리"
    ],
    "skills": [
      "산업안전보건법과 건설기술진흥법 이해",
      "위험성 평가와 안전점검 기법",
      "건설 시공 과정 이해",
      "보고서와 통계 자료 작성",
      "NCS 직업기초능력"
    ],
    "certs": [
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "안전 분야 공공기관 기술직 공고에서 응시 자격이나 우대로 흔히 제시, 기관별 공고 확인"
      },
      {
        "name": "산업안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "건설안전산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "위험성 평가와 안전관리 계획 작성 담당",
      "현장 점검 체크리스트와 사례 조사 담당",
      "안전 교육 자료 제작 담당"
    ],
    "quant": [
      "건설안전기사 또는 산업안전기사 취득",
      "NCS 직업기초능력 필기 대비",
      "전공 필기 대비: 산업안전관리론, 건설안전기술, 건설재료 및 시공",
      "한국사능력검정시험, 공인 영어 성적(기관별 공고에서 요구 여부 확인)"
    ],
    "qual": [
      "건설현장 안전점검 실습이나 인턴",
      "위험성 평가를 적용한 팀 프로젝트",
      "안전 공모전이나 재해 예방 캠페인 참여",
      "안전 교육 봉사"
    ],
    "resumePoints": [
      "현장 위험 요인을 찾아 개선안을 낸 경험",
      "법령 기준을 근거로 점검과 보고를 한 경험",
      "사고 예방에 대한 책임감과 꾸준함"
    ],
    "ncs": "건설공사안전관리",
    "sources": [
      {
        "label": "Q-Net 국가기술자격(건설안전산업기사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=2390"
      },
      {
        "label": "NCS 국가직무능력표준(건설 > 건설공사관리)",
        "url": "https://m.ncs.go.kr/mobile/rm08/ncsField.do?ncsLclasCd=14&ncsMclasCd=01"
      },
      {
        "label": "한국산업안전보건공단",
        "url": "https://www.kosha.or.kr/"
      },
      {
        "label": "국토안전관리원",
        "url": "https://www.kalis.or.kr/"
      }
    ],
    "recruitNotes": [
      "안전 분야 공공기관(한국산업안전보건공단, 국토안전관리원, 한국가스안전공사 등) 신입 채용은 NCS 기반 공개채용이며 전형 단계와 필기 구성은 기관별 공고 원문(잡알리오) 확인"
    ]
  },
  "공무원 안전직": {
    "does": [
      "재난 예방 계획 수립과 재난 대응 훈련 지원",
      "지역 안전점검과 위험 시설 관리",
      "재난 발생 시 상황 관리와 복구 지원",
      "안전 관련 민원 처리와 통계 관리"
    ],
    "skills": [
      "재난 및 안전관리 기본법 이해",
      "재난 관리 단계(예방, 대비, 대응, 복구) 지식",
      "안전점검과 위험성 평가 기법",
      "상황 보고와 문서 작성",
      "유관기관 협업과 소통"
    ],
    "certs": [
      {
        "name": "건설안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "응시 요건 아님, 가산점 적용 여부는 해당 연도 공고 확인"
      },
      {
        "name": "산업안전기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "위험 요인 조사와 안전관리 계획 작성 담당",
      "비상 대응 매뉴얼과 훈련 시나리오 담당",
      "점검 결과 정리와 보고 담당"
    ],
    "quant": [
      "9급 방재안전직 필기: 공통 국어, 영어, 한국사 + 직류별 전문과목(해당 연도 공고에서 확인)",
      "2027년부터 한국사는 한국사능력검정시험 3급 이상으로 대체",
      "건설안전기사 또는 산업안전기사 취득"
    ],
    "qual": [
      "재난 대응 훈련이나 안전점검 봉사 참여",
      "위험성 평가를 적용한 팀 프로젝트",
      "지자체 안전 부서 실습, 인턴",
      "안전 공모전 참가"
    ],
    "resumePoints": [
      "위험 요인을 찾아 예방책을 세운 경험",
      "긴급 상황에서 침착하게 역할을 수행한 경험",
      "법령과 매뉴얼에 따라 일을 처리하는 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "정책브리핑(9급 공무원 시험 2027년 개편)",
        "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148945321"
      },
      {
        "label": "국가공무원 채용시스템(사이버국가고시센터)",
        "url": "https://gongmuwon.gosi.kr/oprut/indexMain.do"
      },
      {
        "label": "지방공무원 임용시험",
        "url": "https://local.gosi.go.kr/"
      }
    ],
    "recruitNotes": [
      "국가직, 지방직 9급 방재안전직 공채는 공통과목 국어, 영어, 한국사에 직류별 전문과목 2과목을 더해 치름. 전문과목 명칭은 해당 연도 시험 공고에서 확인",
      "2027년부터 9급 공채 한국사는 한국사능력검정시험 3급 이상으로 대체, 국어, 영어, 전문과목 과목당 25문항",
      "전형: 필기시험 → 면접시험"
    ]
  },
  "소방공무원(구급대원)": {
    "does": [
      "119 구급 출동, 현장 응급처치와 병원 이송",
      "구급차 장비와 의약품 점검, 관리",
      "구급 활동 일지 작성과 병원 인계",
      "화재, 구조 현장 지원과 교대 근무"
    ],
    "skills": [
      "전문 응급처치 지식과 술기",
      "소방 조직과 재난관리 이해",
      "체력과 교대 근무 적응력",
      "환자와 보호자 소통",
      "팀 단위 현장 대응"
    ],
    "certs": [
      {
        "name": "응급구조사 1급",
        "issuer": "보건복지부(한국보건의료인국가시험원 시행)",
        "type": "국가전문자격",
        "note": "필수. 구급 분야 경력경쟁채용 응시 자격(응급구조사 1급, 간호사, 의사 등, 해당 연도 응시자격 기준 확인)"
      },
      {
        "name": "간호사",
        "issuer": "보건복지부",
        "type": "면허",
        "note": "구급 분야 응시 자격 중 하나"
      },
      {
        "name": "제1종 운전면허(대형 또는 보통)",
        "issuer": "경찰청(도로교통공단)",
        "type": "면허",
        "note": "필수. 필기시험일까지 보유, 최종합격자 발표일까지 유효해야 함"
      }
    ],
    "projectRole": [
      "응급처치와 안전 담당",
      "현장 시뮬레이션 훈련 기획 담당",
      "체력 훈련과 장비 관리 담당"
    ],
    "quant": [
      "구급 경채 필기: 소방학개론(25문항), 응급처치학개론(40문항), 과목당 100점",
      "영어 능력검정시험 기준점수 이상(2024년 공고 기준 토익 510점 이상 등)과 한국사능력검정시험 3급 이상 사전 제출",
      "응급구조사 1급 취득, 제1종 운전면허 취득",
      "체력시험 6종목(악력, 배근력, 앉아윗몸앞으로굽히기, 제자리멀리뛰기, 윗몸일으키기, 왕복오래달리기) 총점 50% 이상"
    ],
    "qual": [
      "병원 응급실, 구급차 실습 경험",
      "응급처치 교육 봉사나 안전 캠페인",
      "체력 관리 기록과 단체 훈련 경험",
      "재난 대응 훈련, 구조 동아리 활동"
    ],
    "resumePoints": [
      "응급 상황에서 침착하게 처치한 경험(문제해결능력)",
      "환자, 보호자, 동료와 명확히 소통한 경험(의사소통능력)",
      "소방공무원으로서의 공직관과 봉사 정신"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "소방청 공고 제2024-26호 2024년 소방공무원 채용시험 시행계획(강원소방 게시)",
        "url": "https://fire.gwd.go.kr/egf/bp/board/article/download?fileSeq=1222240"
      },
      {
        "label": "국가법령정보센터(소방공무원임용령 별표5 경력경쟁채용 필기시험 과목)",
        "url": "https://law.go.kr/flDownload.do?flSeq=133629221"
      },
      {
        "label": "인천소방본부 시험과목 및 시험방법",
        "url": "https://www.incheon.go.kr/119/NE030304"
      },
      {
        "label": "강원소방본부 소방공무원 임용 안내",
        "url": "https://fire.gwd.go.kr/fire/partici/partici_news_appointment"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      }
    ],
    "recruitNotes": [
      "구급 분야 경력경쟁채용(소방사) 필기: 소방학개론 25문항, 응급처치학개론 40문항(각 100점). 한국사와 영어는 능력검정시험 성적으로 대체(2024년 기준 한국사 3급 이상, 영어 토익 510점 이상 등)",
      "응시 연령 18세 이상 40세 이하(소방사), 제1종 대형 또는 보통 운전면허 필수",
      "전형: 1단계 필기 → 2단계 체력시험 → 3단계 서류전형, 신체검사 → 4단계 종합적성검사, 면접. 최종 성적 반영 비율 필기 50%, 체력 25%, 면접 25%",
      "면접 평정요소: 문제해결능력, 의사소통능력, 소방공무원으로서의 공직관 등 5개 분야 50점"
    ]
  },
  "직업군인(장교)": {
    "does": [
      "소대장으로 병력 지휘, 교육훈련과 부대 관리",
      "작전, 교육, 인사, 군수 등 참모 업무 보조",
      "장비와 물자 관리, 안전 점검",
      "부하 상담과 복무 지도"
    ],
    "skills": [
      "리더십과 책임감",
      "체력과 기초 군사 지식",
      "상황 판단과 보고 능력",
      "문서 작성과 교육 진행",
      "국가관과 안보 의식"
    ],
    "certs": [
      {
        "name": "한국사능력검정시험",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "장교 선발에서 성적 인증서 제출로 반영(2022년 육군 군 가산복무 지원금 지급 대상자 공고 기준)"
      },
      {
        "name": "국민체력100 체력인증",
        "issuer": "국민체육진흥공단",
        "type": "민간자격",
        "note": "체력인증서 제출 서류에 포함(2022년 공고 기준)"
      }
    ],
    "projectRole": [
      "팀장으로 일정과 인원 관리 담당",
      "훈련, 행사 기획과 안전 담당",
      "발표와 보고서 작성 담당"
    ],
    "quant": [
      "1차 필기평가: KIDA 간부선발도구와 인성검사",
      "한국사능력검정시험 성적 인증서 제출",
      "대학 성적 각 학기 100분의 70 이상(군 가산복무 지원금 지급 대상자 기준)",
      "체력검정과 신체검사 기준 충족"
    ],
    "qual": [
      "군사학과 과정과 병영체험 참여",
      "학군단, 동아리 등에서 리더 역할 경험",
      "봉사활동과 단체 훈련 기록",
      "AI면접과 대면면접 대비 발표 연습"
    ],
    "resumePoints": [
      "조직을 이끌어 목표를 달성한 리더십 경험",
      "국가관과 군인으로서의 사명감",
      "체력과 자기관리 습관"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "육군 2022년 군 가산복무 지원금 지급 대상자(장교) 선발계획 공고(인천시 일자리 게시)",
        "url": "https://www.incheon.go.kr/job/JOB010201/2087783"
      },
      {
        "label": "육군모집 학사사관 안내",
        "url": "https://goarmy.mil.kr/goarmy/2678/subview.do"
      },
      {
        "label": "육군모집 모집공고",
        "url": "https://goarmy.mil.kr/goarmy/2664/subview.do"
      }
    ],
    "recruitNotes": [
      "군 가산복무 지원금 지급 대상자(장교, 2022년 육군 공고): 수업연한 4년 이상 대학 1~4학년, 임관일 기준 만 20세 이상 27세 이하, 각 학기 성적 100분의 70 이상",
      "선발 절차: 1차 필기평가(간부선발도구, 인성검사) → 2차 서류(잠재역량 증빙, 성적증명서, 체력인증서 등), 신원조사, 체력검정과 신체검사, 면접(AI면접 + 대면면접)",
      "학사사관, 학군사관(ROTC), 군 가산복무 지원금 지급 대상자 등 과정별 지원자격과 일정은 육군모집 누리집 모집공고에서 확인"
    ]
  },
  "군무원": {
    "does": [
      "군부대의 행정, 인사, 군수, 시설 등 지원 업무",
      "공문서 작성과 예산 집행 보조",
      "장비, 물자 관리 대장 정리",
      "민원 응대와 자료 통계 관리"
    ],
    "skills": [
      "행정법과 행정학 기초",
      "공문서 작성과 보안 규정 준수",
      "국어 독해와 영어 기초",
      "엑셀 등 사무 도구 활용",
      "군 조직 이해와 협업"
    ],
    "certs": [
      {
        "name": "한국사능력검정시험",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "군무원 공채 국사 과목을 검정시험 등급으로 대체(등급 기준은 국방부 군무원채용 안내 확인)"
      },
      {
        "name": "컴퓨터활용능력",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시 요건 아님, 사무 역량 보강용"
      }
    ],
    "projectRole": [
      "예산과 일정 관리 담당",
      "회의록과 문서 정리 담당",
      "물품과 자료 관리 담당"
    ],
    "quant": [
      "행정직 9급 필기: 국어, 국사, 영어, 행정법, 행정학",
      "영어는 토익 등 검정시험 점수로, 국사는 한국사능력검정시험 등급으로 대체(기준은 국방부 군무원채용 안내 확인)",
      "지원 직렬별 전공 과목 대비(토목 9급: 응용역학, 토목설계 등)"
    ],
    "qual": [
      "군사학과 과정과 병영체험",
      "행정 보조 인턴이나 학과 사무 지원 경험",
      "동아리 총무, 회계 역할",
      "보안과 규정을 지킨 조직 활동 경험"
    ],
    "resumePoints": [
      "규정과 절차에 따라 정확하게 일을 처리한 경험",
      "문서와 자료를 체계적으로 관리한 경험",
      "군 조직에 대한 이해와 보안 의식"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국방부 군무원채용관리 시험과목 안내",
        "url": "https://recruit.mnd.go.kr:470/examSubjectInfo.do?nm=5"
      },
      {
        "label": "국가법령정보센터(군무원임용시험과목 별표2)",
        "url": "https://www.law.go.kr/LSW/flDownload.do?flSeq=40607413"
      },
      {
        "label": "2026년도 국방부 및 각 군 주관 일반군무원 장애인 구분모집 채용시험 시행계획 공고(가톨릭관동대 게시)",
        "url": "https://www.cku.ac.kr/bbs/disable/981/364423/artclView.do"
      }
    ],
    "recruitNotes": [
      "군무원 공개경쟁채용 시험과목(군무원인사법 시행령 별표2): 행정 9급 국어, 국사, 영어, 행정법, 행정학 / 7급 경제학 추가 / 토목 9급 국어, 국사, 영어, 응용역학, 토목설계 / 군사정보 9급 국가정보학, 정보사회론 / 수사 9급 형법, 형사소송법",
      "영어는 공인 영어 검정시험 점수로, 국사는 한국사능력검정시험 등급으로 대체(필기시험 전날까지 발표된 성적만 인정)",
      "2026년 전형(국방부 주관 기준): 원서접수 4.23~4.29 → 필기 7.4 → 면접 9.15~9.18 → 최종합격 발표 9.30, 국방부와 각 군 중복 접수 불가"
    ]
  },
  "군사경찰·경호 분야": {
    "does": [
      "군 범인 검거, 교통 통제, 영내 질서 유지",
      "주요 인사 경호와 시설 경비",
      "사건 현장 초동 조치와 조사 보조",
      "순찰과 근무 일지 작성"
    ],
    "skills": [
      "체력과 무도 실력",
      "법 집행 절차와 군 규정 이해",
      "상황 판단과 침착한 대응",
      "경호, 경비 기본 지식",
      "보고와 의사소통"
    ],
    "certs": [
      {
        "name": "일반경비지도사",
        "issuer": "경찰청(한국산업인력공단 시행)",
        "type": "국가전문자격",
        "note": "특임군사경찰 병 모집 가산점 5점(병무청 안내)"
      },
      {
        "name": "응급구조사",
        "issuer": "보건복지부",
        "type": "국가전문자격",
        "note": "특임군사경찰 병 모집 가산점 5점"
      },
      {
        "name": "무도 단증(태권도, 유도 등)",
        "issuer": "각 무도 단체",
        "type": "민간자격",
        "note": "특임군사경찰 서류 배점 최대 15점(4단 이상 15점)"
      },
      {
        "name": "자동차운전면허",
        "issuer": "경찰청(도로교통공단)",
        "type": "면허",
        "note": "MC군사경찰 서류 배점 10점"
      }
    ],
    "projectRole": [
      "행사 안전과 질서 관리 담당",
      "체력 훈련 기획 담당",
      "현장 조사와 기록 담당"
    ],
    "quant": [
      "국민체력100 인증 1급 목표(특임군사경찰 체력 25점, MC군사경찰 40점)",
      "무도 단증 취득(특임군사경찰 최대 15점)",
      "일반경비지도사 또는 응급구조사 자격(가산점 5점)",
      "관련 학과(경찰, 소방, 무도, 경호, 스포츠) 재학, 졸업 전공 점수 최대 10점"
    ],
    "qual": [
      "군사학과, 경찰학과 과정과 병영체험",
      "무도 수련 기록과 체력 관리",
      "행사 안전 봉사, 경호 실습",
      "면접 대비 발표와 태도 훈련"
    ],
    "resumePoints": [
      "희생정신과 대인관계 역량을 보여 준 경험",
      "규율을 지키며 팀을 이끈 경험",
      "체력과 무도 실력을 꾸준히 쌓은 기록"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "병무청 육군 특임군사경찰 모집안내",
        "url": "https://www.mma.go.kr/contents.do?mc=mma0000501"
      },
      {
        "label": "병무청 육군 MC군사경찰 모집안내",
        "url": "https://www.mma.go.kr/contents.do?mc=mma0000510"
      },
      {
        "label": "육군모집",
        "url": "https://goarmy.mil.kr/"
      }
    ],
    "recruitNotes": [
      "육군 특임군사경찰(병): 만 18~28세, 신체등급 1~2급, 신장 168cm 이상, 교정시력 0.8 이상. 1차 서류(전공 10, 무도단증 15, 가산점 5) → 2차 면접 45점, 체력(국민체력100 등급) 25점, 면접 60% 미만 탈락",
      "육군 MC군사경찰(병): 신장 175cm 이상, 나안시력 0.8 이상. 서류(운전면허 10, 가산점 5) → 체력 40, 면접 45",
      "장교, 부사관 군사경찰 병과는 각 군 간부 모집 공고에서 병과 분류 기준 확인"
    ]
  },
  "경찰공무원": {
    "does": [
      "지구대, 파출소에서 112 신고 출동과 순찰",
      "교통 단속과 사고 처리",
      "사건 접수, 초동 조사와 조서 작성",
      "민원 응대와 범죄 예방 활동"
    ],
    "skills": [
      "형사법과 경찰학 지식",
      "헌법과 법치 의식",
      "체력과 상황 대응력",
      "보고서, 조서 작성",
      "시민과의 소통과 공정성"
    ],
    "certs": [
      {
        "name": "한국사능력검정시험",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "순경 공채 한국사 과목은 검정시험 등급으로 대체(기준 등급은 경찰청 공고 확인)"
      },
      {
        "name": "제1종 보통 이상 운전면허",
        "issuer": "경찰청(도로교통공단)",
        "type": "면허",
        "note": "순경 공채 응시 요건 여부와 기준은 해당 연도 경찰청 공고 확인"
      }
    ],
    "projectRole": [
      "팀 규율과 안전 관리 담당",
      "사례 조사와 보고서 작성 담당",
      "체력 훈련 기획 담당"
    ],
    "quant": [
      "순경 공채 필기 과목(헌법, 형사법, 경찰학으로 알려짐)과 영어, 한국사 검정시험 기준은 경찰청 공고에서 확인",
      "체력검사 기준 충족",
      "공인 영어 검정시험 점수 사전 준비"
    ],
    "qual": [
      "경찰학과 전공 과정과 경찰서 실습",
      "방범 순찰, 교통 안전 봉사",
      "무도 수련과 체력 관리 기록",
      "토론, 발표로 면접 대비"
    ],
    "resumePoints": [
      "공정성과 준법 의식을 보여 준 경험",
      "위기 상황에서 침착하게 대응한 경험",
      "시민과 소통하며 문제를 해결한 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "경찰청 채용공고 게시판",
        "url": "https://www.police.go.kr/user/bbs/BD_selectBbsList.do?q_bbsCode=1004"
      },
      {
        "label": "정책브리핑(경찰채용시험 필기 비중 축소, 체력과 면접 확대, 2011)",
        "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148711565"
      },
      {
        "label": "국가공무원 채용시스템(경찰 경력경쟁채용 원서접수)",
        "url": "https://gongmuwon.gosi.kr/spcsv/indexMain.do"
      }
    ],
    "recruitNotes": [
      "순경 공개경쟁채용 전형: 필기시험 → 신체, 체력검사 → 면접시험 순",
      "채용 공고 원문은 경찰청 누리집 채용공고 게시판과 경찰청 원서접수 사이트에서 확인"
    ]
  },
  "국방·수사기관 요원": {
    "does": [
      "군 관련 범죄 수사 보조, 조서와 증거 자료 정리",
      "방첩, 보안 점검과 정보 수집 지원",
      "정보 분석 보고서 작성",
      "보안 규정 교육과 점검 기록 관리"
    ],
    "skills": [
      "형법과 형사소송법 지식",
      "국가정보학과 정보 분석 기초",
      "보안 의식과 비밀 취급 규정 준수",
      "문서 작성과 분석적 사고",
      "외국어 능력"
    ],
    "certs": [
      {
        "name": "한국사능력검정시험",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "군무원 공채 국사 과목 대체"
      },
      {
        "name": "TOEIC 등 공인 영어 검정시험",
        "issuer": "각 시행기관",
        "type": "민간자격",
        "note": "군무원 공채 영어 과목 대체(기준 점수는 국방부 안내 확인)"
      }
    ],
    "projectRole": [
      "자료 조사와 분석 보고서 담당",
      "보안과 기록 관리 담당",
      "사례 연구와 발표 담당"
    ],
    "quant": [
      "군무원 수사 직렬 9급 필기: 국어, 국사, 영어, 형법, 형사소송법",
      "군무원 군사정보 직렬 9급 필기: 국어, 국사, 영어, 국가정보학, 정보사회론",
      "공인 영어 점수와 한국사능력검정시험 등급 사전 취득"
    ],
    "qual": [
      "경찰학과, 군사학과 전공 과정과 수사 관련 과목 이수",
      "정보 분석, 보안 관련 공모전이나 세미나 참여",
      "보안 규정을 지킨 조직 활동 경험",
      "외국어 학습과 독해 훈련"
    ],
    "resumePoints": [
      "자료를 분석해 결론을 낸 경험(분석력)",
      "비밀 유지와 규정 준수를 보여 준 경험(보안 의식)",
      "국가 안보에 대한 책임감"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국가법령정보센터(군무원임용시험과목 별표2)",
        "url": "https://www.law.go.kr/LSW/flDownload.do?flSeq=40607413"
      },
      {
        "label": "국방부 군무원채용관리 시험과목 안내",
        "url": "https://recruit.mnd.go.kr:470/examSubjectInfo.do?nm=5"
      },
      {
        "label": "국가정보원",
        "url": "https://www.nis.go.kr/"
      }
    ],
    "recruitNotes": [
      "군무원 공채 수사 직렬 9급: 국어, 국사, 영어, 형법, 형사소송법 / 군사정보 직렬 9급: 국어, 국사, 영어, 국가정보학, 정보사회론 (군무원인사법 시행령 별표2)",
      "영어와 국사는 검정시험 성적으로 대체, 원서접수는 국방부 군무원채용관리 누리집과 각 군 누리집",
      "국군방첩사령부, 국가정보원 등 기관별 공채는 각 기관 누리집 채용 안내에서 응시자격과 전형 확인"
    ]
  },
  "일반행정직 공무원": {
    "does": [
      "민원 접수와 처리, 각종 증명서 발급",
      "공문서 작성과 결재 문서 정리",
      "예산 집행, 지출 서류 처리",
      "행사 운영, 통계 자료 관리"
    ],
    "skills": [
      "행정법총론과 행정학개론 지식",
      "공문서 작성과 행정 절차 이해",
      "민원 응대와 소통",
      "엑셀 등 사무 도구 활용",
      "국어 독해와 영어 기초"
    ],
    "certs": [
      {
        "name": "한국사능력검정시험",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "2027년부터 9급 공채 한국사 과목을 3급 이상 취득으로 대체(유효기간 없음)"
      },
      {
        "name": "컴퓨터활용능력",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시 요건 아님, 사무 역량 보강용"
      }
    ],
    "projectRole": [
      "예산과 일정 관리 담당",
      "회의록과 문서 정리 담당",
      "대외 공문과 연락 담당"
    ],
    "quant": [
      "9급 일반행정 필기: 국어, 영어, 한국사, 행정법총론, 행정학개론(2022년부터 전문과목 필수)",
      "2027년부터 한국사는 한국사능력검정시험 3급 이상으로 대체, 국어, 영어, 전문과목 과목당 25문항(총 100문항)",
      "컴퓨터활용능력 등 사무 자격 취득"
    ],
    "qual": [
      "법, 행정학 전공 과목 이수와 스터디",
      "관공서, 공공기관 행정 인턴이나 실습",
      "학생회, 동아리 총무, 회계 역할",
      "지역사회 봉사 경험"
    ],
    "resumePoints": [
      "규정과 절차에 맞게 정확하게 처리한 경험",
      "민원이나 갈등 상황을 소통으로 해결한 경험",
      "공직 가치(공정, 책임, 봉사)를 보여 준 활동"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "정책브리핑(9급 공무원 시험 전문과목 필수화)",
        "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148861996"
      },
      {
        "label": "정책브리핑(9급 공무원 시험 2027년 개편)",
        "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148945321"
      },
      {
        "label": "국가법령정보센터(임용시험 과목표 별표, 2023.12.29 개정)",
        "url": "https://www.law.go.kr/LSW//flDownload.do?gubun=&flSeq=136017543"
      },
      {
        "label": "국가공무원 채용시스템(사이버국가고시센터)",
        "url": "https://gongmuwon.gosi.kr/oprut/indexMain.do"
      }
    ],
    "recruitNotes": [
      "국가직 9급 일반행정 공채 필기: 국어, 영어, 한국사 + 행정법총론, 행정학개론(2022년부터 행정직군 23개 직류 전문과목 필수화, 과목당 20문항)",
      "2027년부터 국가직, 지방직 9급 공채 한국사는 한국사능력검정시험 3급 이상 취득으로 대체, 국어, 영어, 전문과목은 과목당 25문항",
      "전형: 필기시험 → 면접시험. 국가직은 국가공무원 채용시스템, 지방직은 지방공무원 임용시험 사이트에서 접수"
    ]
  },
  "공기업 사무직": {
    "does": [
      "총무, 인사, 회계 등 경영지원 실무",
      "예산 편성과 집행 자료 정리",
      "경영기획 자료 조사와 보고서 작성",
      "계약, 구매 서류 처리와 민원 응대"
    ],
    "skills": [
      "경영학, 경제학, 행정학, 법학 기초",
      "회계와 예산 이해",
      "문서 작성과 데이터 정리",
      "NCS 직업기초능력(의사소통, 수리, 문제해결, 자원관리)",
      "공공기관 윤리와 규정 준수"
    ],
    "certs": [
      {
        "name": "컴퓨터활용능력",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "기관별 공고에서 우대 또는 가점 여부 확인"
      },
      {
        "name": "한국사능력검정시험",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "기관별 공고에서 요구 여부 확인"
      },
      {
        "name": "전산회계 1급",
        "issuer": "한국세무사회",
        "type": "국가공인 민간자격",
        "note": "회계 직무 지원 시 보강용"
      }
    ],
    "projectRole": [
      "예산과 정산 담당",
      "일정 관리와 회의록 작성 담당",
      "자료 조사와 발표 자료 담당"
    ],
    "quant": [
      "NCS 직업기초능력 필기 대비(의사소통, 수리, 문제해결 등)",
      "직무역량(전공) 필기 대비: 경영학, 경제학, 행정학, 법학 중 기관별 지정 과목",
      "공인 영어 성적, 한국사능력검정시험(기관별 공고 기준 확인)",
      "컴퓨터활용능력 등 사무 자격 취득"
    ],
    "qual": [
      "공공기관 체험형 인턴",
      "학생회, 동아리 총무, 회계 역할",
      "기업 분석, 정책 제안 공모전",
      "지역사회 봉사 경험"
    ],
    "resumePoints": [
      "경영기획, 총무, 인사, 예산, 회계 중 지원 직무와 맞는 실무 경험",
      "자료를 모아 분석하고 보고서로 정리한 경험",
      "공공기관의 공익성과 윤리 기준을 이해한 태도"
    ],
    "ncs": "경영기획, 사무행정, 총무",
    "sources": [
      {
        "label": "NCS 공정채용 공고(한국수자원공사 2025년 상반기 신입 공채)",
        "url": "https://www.ncs.go.kr/blind/bl04/RecrtNotifDetail.do?recrtNo=20241218100110"
      },
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 총무·인사 > 일반사무 세분류)",
        "url": "https://m.ncs.go.kr/mobile/rm08/ncsField.do?ncsLclasCd=02&ncsMclasCd=02&ncsSclasCd=03"
      },
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 기획사무)",
        "url": "https://m.ncs.go.kr/mobile/rm08/ncsField.do?ncsLclasCd=02&ncsMclasCd=01"
      },
      {
        "label": "잡알리오 공공기관 채용정보",
        "url": "https://job.alio.go.kr/"
      }
    ],
    "recruitNotes": [
      "한국수자원공사 2025년 상반기 일반직 신입 공채 사무행정(행정) 분야 NCS 요구능력단위: 경영기획, 총무, 인사·조직, 예산, 회계",
      "공공기관 채용은 NCS 기반 블라인드 공개채용. 전형 단계(서류, 필기, 면접)와 필기 배점은 기관별 공고 원문(잡알리오) 확인"
    ]
  },
  "정책 연구원": {
    "does": [
      "정책 과제의 문헌 조사와 자료 수집",
      "통계 분석과 설문 조사 설계 보조",
      "연구보고서 초안 작성과 편집",
      "세미나, 자문회의 준비와 회의록 정리"
    ],
    "skills": [
      "사회과학 연구 방법론",
      "통계 분석 도구(SPSS, R, Stata 등) 활용",
      "정책 보고서 작성 능력",
      "영어 문헌 독해",
      "행정학, 경제학, 정치학 기초"
    ],
    "certs": [
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "응시 요건 아님, 조사 설계와 통계 역량 보강용"
      },
      {
        "name": "TOEIC 등 공인 영어 검정시험",
        "issuer": "각 시행기관",
        "type": "민간자격",
        "note": "기관별 공고에서 요구 여부 확인"
      }
    ],
    "projectRole": [
      "문헌 조사와 데이터 분석 담당",
      "보고서 집필과 편집 담당",
      "설문 설계와 인터뷰 담당"
    ],
    "quant": [
      "석사 이상 학위(연구원, 위촉연구원 공고에서 흔히 요구, 부연구위원 이상은 박사)",
      "통계 분석 도구 활용 능력",
      "공인 영어 성적",
      "학부 학점 관리와 논문 실적"
    ],
    "qual": [
      "학부 연구 프로젝트, 학술 논문 작성 경험",
      "국책연구기관 연구 보조(RA), 인턴 경험",
      "정책 제안 공모전 참가",
      "대학원 진학 준비(석사, 박사)"
    ],
    "resumePoints": [
      "연구 질문을 세우고 자료로 검증한 경험",
      "통계 분석과 보고서 작성 능력",
      "지원 기관의 연구 분야와 맞는 전공 지식"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "경제·인문사회연구회 채용정보",
        "url": "https://www.nrc.re.kr/board.es?mid=a12105100000&bid=0012"
      },
      {
        "label": "경제·인문사회연구회 소관 연구기관",
        "url": "https://www.nrc.re.kr/"
      },
      {
        "label": "한국행정연구원 채용정보",
        "url": "https://www.kipa.re.kr/html/kor/cmn/bbs/cmnBbsGenList.do/319"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ],
    "recruitNotes": [
      "경제·인문사회연구회 소관 26개 국책연구기관(한국개발연구원, 한국행정연구원, 한국노동연구원 등)의 채용 공고는 연구회 채용정보 게시판에 모여 있음",
      "2026년 10~11월 게시 공고 예: 대외경제정책연구원 정규직 박사급, 한국노동연구원 연구위원 직군, 건축공간연구원 부연구위원, 산업연구원 위촉연구원(지역산업입지 연구)",
      "직급별 학위 요건과 전형(서류, 면접, 발표 등)은 각 공고 첨부문 확인"
    ]
  },
  "사회복지사(복지관)": {
    "does": [
      "이용자 상담과 욕구 조사, 사례관리",
      "노인, 아동, 장애인 대상 복지 프로그램 기획과 운영",
      "자원봉사자 모집과 관리",
      "사업 계획서, 결과 보고서와 보조금 서류 작성"
    ],
    "skills": [
      "사회복지실천 기술과 면담 기법",
      "사례관리와 자원 연계",
      "프로그램 기획과 평가",
      "사회복지 관련 법령과 행정 이해",
      "기록과 문서 작성"
    ],
    "certs": [
      {
        "name": "사회복지사 1급",
        "issuer": "보건복지부(한국산업인력공단 시험 시행, 한국사회복지사협회 자격 발급)",
        "type": "국가전문자격",
        "note": "필수. 복지관 채용에서 사회복지사 자격(2급 이상)을 요구하며 1급은 우대, 매년 1월 국가시험"
      },
      {
        "name": "사회복지사 2급",
        "issuer": "보건복지부(한국사회복지사협회 자격 발급)",
        "type": "국가전문자격",
        "note": "대학에서 사회복지 교과목 이수와 현장실습 후 무시험 취득"
      }
    ],
    "projectRole": [
      "프로그램 기획과 운영 담당",
      "참여자 모집과 상담 담당",
      "결과 보고서와 기록 담당"
    ],
    "quant": [
      "사회복지사 1급 국가시험 합격(2027년 제25회 2027.1.16 시행, 원서접수 2026.12.7~12.11)",
      "사회복지사 2급 취득에 필요한 교과목 이수와 현장실습 완료",
      "사회복지 관련 보수교육, 자격 추가(예: 요양보호사, 청소년지도사)"
    ],
    "qual": [
      "복지관 현장실습과 자원봉사",
      "복지 프로그램 기획 공모전이나 동아리 활동",
      "사례관리, 상담 실습 경험",
      "지역사회 조사 프로젝트"
    ],
    "resumePoints": [
      "이용자와 신뢰를 쌓고 욕구를 파악한 면담 경험",
      "프로그램을 기획해 운영하고 평가한 경험",
      "사회복지 가치(인권, 존중)와 윤리 의식"
    ],
    "ncs": "사회복지프로그램운영, 사회복지사례관리, 사회복지면담",
    "sources": [
      {
        "label": "Q-Net 사회복지사 1급",
        "url": "https://www.q-net.or.kr/man001.do?id=&gId=52&gSite=L"
      },
      {
        "label": "Q-Net 사회복지사 1급 시행공고",
        "url": "https://www.q-net.or.kr/crf002.do?id=crf00201&gSite=L&gId=52"
      },
      {
        "label": "NCS 국가직무능력표준(사회복지·종교 > 사회복지 > 사회복지서비스 세분류)",
        "url": "https://m.ncs.go.kr/mobile/rm08/ncsField.do?ncsLclasCd=07&ncsMclasCd=01&ncsSclasCd=02"
      },
      {
        "label": "한국사회복지사협회",
        "url": "https://www.welfare.net/"
      }
    ],
    "recruitNotes": [
      "사회복지사 1급 국가시험: 사회복지사업법 시행령 제3조에 따라 보건복지부장관이 한국산업인력공단에 시행 위탁, 2027년도 제25회 시험계획 공고(한국산업인력공단 공고 제2026-163호). 시험 영역은 사회복지기초, 사회복지실천, 사회복지정책과 제도 3교시(세부 과목과 문항수는 시행공고 첨부 확인)",
      "합격예정자는 한국사회복지사협회 자격심사를 거쳐 최종 확정"
    ]
  },
  "사회복지직 공무원": {
    "does": [
      "주민센터, 구청 복지부서에서 기초생활보장, 긴급복지 등 급여 대상자 상담과 선정",
      "복지 급여 지급, 사례관리, 생활 지도와 관련 서류 처리",
      "지역 복지시설, 민간기관과 연계한 복지 사업 운영 지원",
      "복지 정책 집행 과정의 자료 수집과 보고"
    ],
    "skills": [
      "사회복지 제도와 급여 기준 이해",
      "상담과 대인관계 능력",
      "행정법 기초와 공문서 처리",
      "상대 욕구에 맞춘 문제해결력",
      "인간존중과 사회정의에 대한 사명감"
    ],
    "certs": [
      {
        "name": "사회복지사 2급",
        "issuer": "한국사회복지사협회(보건복지부 위탁)",
        "type": "국가전문자격",
        "note": "사회복지직 응시 요건으로 사회복지사 자격증이 요구됨"
      },
      {
        "name": "사회복지사 1급",
        "issuer": "한국산업인력공단(시험 시행), 한국사회복지사협회(자격 발급)",
        "type": "국가전문자격",
        "note": "국가시험 합격 필요, 관련부처 보건복지부"
      }
    ],
    "projectRole": [
      "복지 대상자 욕구조사와 설문 분석 담당",
      "지역 복지기관 연계와 봉사 프로그램 운영 담당",
      "사업 결과 보고서와 행정 문서 작성 담당"
    ],
    "quant": [
      "사회복지사 2급 취득(응시 요건)",
      "한국사능력검정시험 3급 이상(2027년부터 9급 공채 한국사 과목 대체, 지방공무원 임용령 개정 기준)",
      "필기시험 과목 학습: 국어, 영어, 한국사, 사회복지학개론, 행정법총론"
    ],
    "qual": [
      "사회복지관, 노인복지관 등 현장 실습과 봉사 경험",
      "복지 대상자 상담 기록과 사례관리 경험",
      "지역 복지 문제를 조사한 팀 프로젝트",
      "공공기관 행정 보조 인턴 경험"
    ],
    "resumePoints": [
      "대상자 욕구를 파악하고 해결 대안을 제시한 경험",
      "봉사정신과 사회정의에 대한 사명감이 드러나는 활동",
      "규정과 절차를 지키며 꼼꼼하게 서류를 처리한 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "인사혁신처 채용제도 소개",
        "url": "https://www.mpm.go.kr/mpm/info/infoJobs/HrProcedures"
      },
      {
        "label": "사이버국가고시센터 공고",
        "url": "https://gongmuwon.gosi.kr/oprut/RpaRpTestPbancLst.do"
      },
      {
        "label": "서울시 2026년 공무원 채용 보도자료",
        "url": "https://www.seoul.go.kr/news/news_report.do?bbsNo=158&nttNo=452259&cntPerPage=10&curPage=1"
      },
      {
        "label": "국가법령정보센터 지방공무원 임용령 개정이유",
        "url": "https://www.law.go.kr/LSW/lsRvsRsnListP.do?lsId=005050&chrClsCd=010102"
      },
      {
        "label": "커리어넷 직업백과 사회복지사",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=379"
      },
      {
        "label": "Q-Net 사회복지사 1급",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=52"
      }
    ],
    "recruitNotes": [
      "국가직은 인사혁신처(사이버국가고시센터), 지방직은 각 시도 인사위원회가 공고, 사회복지직은 사회복지사 자격증 소지자만 응시",
      "전형: 필기시험(객관식) 후 면접시험(인사혁신처 채용제도 기준)"
    ]
  },
  "복지사업 기획자": {
    "does": [
      "복지 대상자 욕구 조사와 자료 분석",
      "복지 프로그램 기획안 작성과 예산 편성 보조",
      "프로그램 시행 지원과 결과 평가, 보고서 작성",
      "후원, 공모사업 신청서 작성과 유관기관 협력"
    ],
    "skills": [
      "욕구조사와 자료 분석",
      "사업 기획서와 보고서 작성",
      "예산 편성과 집행 관리",
      "협상과 설득 능력",
      "대인관계와 네트워킹"
    ],
    "certs": [
      {
        "name": "사회복지사 2급",
        "issuer": "한국사회복지사협회(보건복지부 위탁)",
        "type": "국가전문자격",
        "note": "복지기관 채용 시 기본 요건으로 요구되는 경우가 많음"
      },
      {
        "name": "사회복지사 1급",
        "issuer": "한국산업인력공단(시험 시행), 한국사회복지사협회(자격 발급)",
        "type": "국가전문자격",
        "note": "국가시험 합격 필요"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "욕구조사, 설문 분석 역량 증빙용"
      }
    ],
    "projectRole": [
      "사업 기획서와 예산안 작성 담당",
      "설문 설계와 결과 분석 담당",
      "공모전 제안서와 발표 자료 담당"
    ],
    "quant": [
      "사회복지사 2급 취득",
      "사회조사분석사 2급 취득",
      "복지 공모사업 제안서 제출 실적"
    ],
    "qual": [
      "복지관 프로그램 기획과 운영 실습",
      "지역 문제 해결형 공모전 참여",
      "복지 대상자 설문조사와 분석 보고서 작성",
      "비영리단체 인턴이나 후원사업 보조 경험"
    ],
    "resumePoints": [
      "복지 프로그램을 기획하고 시행, 평가까지 해 본 경험",
      "자료를 수집하고 분석해 대안을 제시한 과정",
      "협상과 설득으로 유관기관 협력을 끌어낸 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 사회복지사",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=379"
      },
      {
        "label": "한국사회복지사협회 자격관리센터",
        "url": "https://www.welfare.net/lic/"
      },
      {
        "label": "Q-Net 사회복지사 1급",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=52"
      },
      {
        "label": "NCS 국가직무능력표준 분류검색",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "교육행정직 공무원": {
    "does": [
      "교육청, 교육지원청, 학교 행정실에서 예산, 회계, 급여 업무 처리",
      "학교 시설 관리와 물품 구매, 계약 서류 처리",
      "교직원 인사 서류와 복무 관리 보조",
      "민원 응대와 공문서 작성, 기록 관리"
    ],
    "skills": [
      "교육학 기초와 교육 제도 이해",
      "행정법 기초와 공문서 처리",
      "예산과 회계 처리",
      "민원 응대와 소통 능력",
      "꼼꼼한 서류 관리"
    ],
    "certs": [
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시 요건 아님, 행정실 실무용(가산점 여부는 공고 확인)"
      }
    ],
    "projectRole": [
      "예산과 일정 관리 담당",
      "회의록과 문서 정리 담당",
      "대외 공문과 민원 응대 담당"
    ],
    "quant": [
      "필기시험 과목 학습: 국어, 영어, 한국사, 교육학개론, 행정법총론",
      "한국사능력검정시험 3급 이상(2027년부터 9급 공채 한국사 과목 대체)",
      "컴퓨터활용능력 1급 취득"
    ],
    "qual": [
      "학교, 교육청 행정 보조 아르바이트나 인턴",
      "학생회, 동아리 회계와 예산 집행 경험",
      "교육 봉사나 특수교육 현장 경험",
      "공공기관 민원 응대 경험"
    ],
    "resumePoints": [
      "규정에 따라 예산과 서류를 정확하게 처리한 경험",
      "교육 현장을 이해하고 교직원, 학생과 소통한 경험",
      "민원을 끝까지 책임지고 해결한 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "인사혁신처 채용제도 소개",
        "url": "https://www.mpm.go.kr/mpm/info/infoJobs/HrProcedures"
      },
      {
        "label": "사이버국가고시센터 공고",
        "url": "https://gongmuwon.gosi.kr/oprut/RpaRpTestPbancLst.do"
      },
      {
        "label": "국가법령정보센터 지방공무원 임용령 개정이유",
        "url": "https://www.law.go.kr/LSW/lsRvsRsnListP.do?lsId=005050&chrClsCd=010102"
      }
    ],
    "recruitNotes": [
      "국가직 교육행정(교육부)은 인사혁신처, 시도교육청 교육행정직은 각 교육청이 공고",
      "전형: 필기시험(객관식) 후 면접시험"
    ]
  },
  "물류·항만 공기업": {
    "does": [
      "항만시설 임대, 사용료 관리와 항만 운영 지원",
      "경영기획, 예산, 재무, 인사 등 사무 업무",
      "물류 통계 관리와 항만 물동량 분석 보조",
      "홍보, 마케팅과 항만 안전관리 현장 지원"
    ],
    "skills": [
      "물류와 항만 운영 이해",
      "NCS 직업기초능력(의사소통, 수리, 문제해결, 자원관리)",
      "경영, 회계 기초",
      "영어 문서 독해",
      "데이터 정리와 보고서 작성"
    ],
    "certs": [
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격",
        "note": "물류 직무 우대 자격으로 흔히 제시, 기관별 공고 확인"
      },
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격"
      },
      {
        "name": "한국사능력검정시험 3급 이상",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "부산항만공사 2026년 신입 공고에서 응시 요건(시험이라 자격 유형은 편의상 분류)"
      }
    ],
    "projectRole": [
      "데이터 분석과 보고서 작성 담당",
      "예산과 일정 관리 담당",
      "대외 협력과 발표 담당"
    ],
    "quant": [
      "공인 영어성적: TOEIC 700 이상 등(부산항만공사 2026년 공고 기준, 기관별 상이)",
      "한국사능력검정시험 3급 이상(부산항만공사 2026년 공고 기준)",
      "물류관리사 취득",
      "NCS 직업기초능력평가 대비"
    ],
    "qual": [
      "항만, 물류기업 인턴이나 현장 견학",
      "물류 공모전이나 무역 관련 팀 프로젝트",
      "공공기관 체험형 인턴 경험",
      "토론면접 대비 시사 토론 활동"
    ],
    "resumePoints": [
      "기관 인재상과 지원 동기의 연결(부산항만공사 자소서 항목 기준)",
      "직무기술서의 수행 직무(경영기획, 물류, 항만시설 관리)와 맞는 경험",
      "안전과 공공성을 우선한 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "부산항만공사 2026년 정규직(신입) 채용 공고",
        "url": "https://www.busanpa.com/board/view.bpa?boardId=BBS_0000046&menuCd=DOM_000000107001001000&paging=ok&startPage=1&dataSid=36095"
      },
      {
        "label": "인천항만공사 채용안내",
        "url": "https://www.icpa.or.kr/recruit/content/view.do?menuKey=2090&contentKey=551"
      },
      {
        "label": "잡알리오 인천항만공사 채용공고",
        "url": "https://job.alio.go.kr/mobile2021/recruit/recruitView.do?idx=300321"
      },
      {
        "label": "잡알리오 공공기관 채용정보",
        "url": "https://job.alio.go.kr/recruit.do"
      }
    ],
    "recruitNotes": [
      "부산항만공사 2026년 정규직 신입: 온라인 입사지원 → 필기(AI 인성검사, 직업기초능력평가, 직무수행능력평가) 고득점 5배수 중 서류 적합자 → 면접(토론, 역량) 1배수 → 신체검사, 신원조사 후 임용",
      "응시자격: 학력, 전공 제한 없음(블라인드), 한국사능력검정시험 3급 이상, 공인 영어성적(TOEIC 700, TEPS 340, TOEFL iBT 71 등)",
      "인천항만공사 채용안내: 서류전형 → 인적성검사 및 NCS 시험 → 면접전형 → 최종발표",
      "기관별 공고는 잡알리오(job.alio.go.kr)와 각 공사 채용 페이지에서 확인"
    ]
  },
  "공무원 건축직": {
    "does": [
      "건축 인허가 신청서 검토와 현장 확인",
      "공공건축물 설계, 공사 발주와 감독 보조",
      "불법 건축물 단속과 민원 처리",
      "건축 관련 법규 검토와 행정 문서 작성"
    ],
    "skills": [
      "건축계획과 건축구조 이해",
      "건축법과 인허가 절차 이해",
      "도면 판독과 현장 점검",
      "민원 응대와 소통",
      "공문서 작성"
    ],
    "certs": [
      {
        "name": "건축기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "기술직 자격증 가산점 대상(가산 비율은 공고 원문 확인)"
      },
      {
        "name": "건축산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "가산점 대상(비율은 공고 확인)"
      },
      {
        "name": "건축사",
        "issuer": "국토교통부(대한건축사협회 시험 위탁)",
        "type": "국가전문자격",
        "note": "실무 경력 후 응시, 신입 단계 필수 아님"
      }
    ],
    "projectRole": [
      "설계 도면과 법규 검토 담당",
      "일정과 예산 관리 담당",
      "현장 조사와 보고서 작성 담당"
    ],
    "quant": [
      "필기시험 과목 학습: 국어, 영어, 한국사, 건축계획, 건축구조",
      "건축기사 또는 건축산업기사 취득(가산점)",
      "한국사능력검정시험 3급 이상(2027년부터 9급 공채 한국사 과목 대체)"
    ],
    "qual": [
      "건축 설계 스튜디오와 공모전 경험",
      "건축사사무소, 시공사 현장 인턴",
      "공공건축이나 도시재생 관련 팀 프로젝트",
      "건축법규 검토 경험"
    ],
    "resumePoints": [
      "건축계획과 구조 지식을 설계나 현장에 적용한 경험",
      "법규와 절차를 지키며 꼼꼼하게 검토한 태도",
      "민원인, 시공사와 소통하며 문제를 해결한 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "인사혁신처 채용제도 소개",
        "url": "https://www.mpm.go.kr/mpm/info/infoJobs/HrProcedures"
      },
      {
        "label": "사이버국가고시센터 공고",
        "url": "https://gongmuwon.gosi.kr/oprut/RpaRpTestPbancLst.do"
      },
      {
        "label": "서울시 2026년 공무원 채용 보도자료",
        "url": "https://www.seoul.go.kr/news/news_report.do?bbsNo=158&nttNo=452259&cntPerPage=10&curPage=1"
      }
    ],
    "recruitNotes": [
      "국가직 시설직렬 건축 직류(인사혁신처 채용제도 기준)와 지방직 건축직으로 선발",
      "전형: 필기시험(객관식) 후 면접시험",
      "기술직 자격증 가산점은 인사혁신처 가산점 적용 안내와 공고 확인"
    ]
  },
  "문화·관광 공기업": {
    "does": [
      "관광, 문화콘텐츠 사업 기획과 홍보 마케팅 지원",
      "축제, 전시, 박람회 등 행사 운영 보조",
      "지역 관광자원 조사와 콘텐츠 개발 지원",
      "경영기획, 예산, 회계 등 사무 업무"
    ],
    "skills": [
      "관광, 문화산업 트렌드 이해",
      "NCS 직업기초능력(의사소통, 문제해결, 자원관리)",
      "외국어 소통 능력",
      "홍보 콘텐츠 기획과 제작",
      "행사 운영과 일정 관리"
    ],
    "certs": [
      {
        "name": "관광통역안내사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가전문자격",
        "note": "관광 분야 우대 자격으로 흔히 제시, 기관별 공고 확인"
      },
      {
        "name": "국내여행안내사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가전문자격"
      },
      {
        "name": "컨벤션기획사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "행사, 전시 기획 역량 증빙용"
      }
    ],
    "projectRole": [
      "행사 기획과 현장 운영 담당",
      "홍보 콘텐츠 제작과 SNS 운영 담당",
      "예산과 일정 관리 담당"
    ],
    "quant": [
      "공인 영어성적 확보(기관별 기준은 공고 확인)",
      "관광통역안내사 또는 컨벤션기획사 2급 취득",
      "NCS 직업기초능력평가 대비",
      "한국사능력검정시험(공공기관 공고에서 요구하는 경우 있음, 기관별 확인)"
    ],
    "qual": [
      "지역 축제, 문화행사 운영 스태프 경험",
      "관광 콘텐츠 기획 공모전 참여",
      "문화재단, 관광공사 체험형 인턴",
      "외국인 대상 안내나 통역 봉사"
    ],
    "resumePoints": [
      "기관 인재상과 사업 방향에 맞는 지원 동기",
      "행사나 콘텐츠를 기획해 실행하고 성과를 낸 경험",
      "공공성과 고객 지향 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국관광공사 채용공고",
        "url": "https://knto.or.kr/recruitInfo"
      },
      {
        "label": "잡알리오 공공기관 채용정보",
        "url": "https://job.alio.go.kr/recruit.do"
      },
      {
        "label": "부산항만공사 2026년 신입 채용 공고(공공기관 NCS 전형 예시)",
        "url": "https://www.busanpa.com/board/view.bpa?boardId=BBS_0000046&menuCd=DOM_000000107001001000&paging=ok&startPage=1&dataSid=36095"
      }
    ],
    "recruitNotes": [
      "한국관광공사 등 공공기관은 잡알리오(job.alio.go.kr)와 기관 채용 페이지에 공고, NCS 기반 블라인드 채용",
      "일반적인 전형: 서류 → 필기(직업기초능력평가, 직무수행능력평가) → 면접 → 신체검사(기관별 상이, 공고 원문 확인)"
    ]
  },
  "학예사(큐레이터)": {
    "does": [
      "소장품 조사, 등록과 수장고 관리 보조",
      "전시 기획안 작성과 전시 설치, 운영 지원",
      "교육 프로그램 운영과 관람객 안내",
      "도록, 해설 자료 작성과 자료 조사"
    ],
    "skills": [
      "역사, 미술사 등 전공 지식",
      "박물관학과 소장품 관리 이해",
      "자료 조사와 글쓰기",
      "전시 기획과 공간 구성 감각",
      "외국어 자료 독해"
    ],
    "certs": [
      {
        "name": "박물관 및 미술관 준학예사",
        "issuer": "문화체육관광부(시험 시행 한국산업인력공단)",
        "type": "국가전문자격",
        "note": "시험 합격 후 학사학위자는 실무경력 1년(1,000시간) 이상 충족 시 자격 부여"
      },
      {
        "name": "3급 정학예사",
        "issuer": "문화체육관광부",
        "type": "국가전문자격",
        "note": "석사 취득 후 실무경력 2년 또는 준학예사 취득 후 재직 4년 등"
      }
    ],
    "projectRole": [
      "자료 조사와 해설문 작성 담당",
      "전시 기획과 공간 구성 담당",
      "교육 프로그램 운영 담당"
    ],
    "quant": [
      "준학예사 시험 합격(시행 한국산업인력공단, 과목은 Q-Net 시행공고 확인)",
      "경력인정대상기관 실무경력 1년, 1,000시간 이상(학사 기준)",
      "석사 진학 시 3급 정학예사 경로 단축(실무경력 2년)"
    ],
    "qual": [
      "박물관, 미술관 실습과 인턴(실무경력 산정 가능 여부 확인)",
      "전시 기획 공모전이나 학내 전시 경험",
      "유물, 작품 자료 조사와 도록 작성 경험",
      "문화해설, 도슨트 봉사"
    ],
    "resumePoints": [
      "소장품이나 자료를 직접 조사하고 정리한 경험",
      "전시를 기획해 관람객 반응까지 확인한 경험",
      "전공 지식을 쉽게 풀어 전달한 글쓰기와 해설 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국립중앙박물관 학예사 자격제도 안내",
        "url": "https://www.museum.go.kr/MUSEUM/contents/M0705010000.do"
      },
      {
        "label": "Q-Net 박물관및미술관준학예사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=35"
      },
      {
        "label": "Q-Net 준학예사 시행공고",
        "url": "https://www.q-net.or.kr/crf002.do?id=crf00201&gSite=L&gId=35"
      }
    ]
  },
  "행정직 공무원": {
    "does": [
      "중앙부처, 지자체 부서의 민원 접수와 처리",
      "예산 집행, 회계 서류와 공문서 작성",
      "정책 사업 집행 지원과 자료 정리",
      "각종 통계와 보고 자료 작성"
    ],
    "skills": [
      "행정학과 행정법 기초",
      "공문서 작성과 기록 관리",
      "민원 응대와 소통",
      "예산과 회계 처리",
      "법령 해석과 적용"
    ],
    "certs": [
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시 요건 아님, 실무용"
      }
    ],
    "projectRole": [
      "예산과 일정 관리 담당",
      "회의록과 문서 정리 담당",
      "대외 협력과 민원 응대 담당"
    ],
    "quant": [
      "필기시험 과목 학습: 국어, 영어, 한국사, 행정법총론, 행정학개론",
      "한국사능력검정시험 3급 이상(2027년부터 9급 공채 한국사 과목 대체)",
      "컴퓨터활용능력 1급 취득"
    ],
    "qual": [
      "공공기관 행정 인턴이나 아르바이트",
      "학생회, 동아리 운영과 예산 집행 경험",
      "지역사회 봉사와 민원 응대 경험",
      "정책 토론이나 모의 의회 활동"
    ],
    "resumePoints": [
      "규정과 절차를 지키며 정확하게 일을 처리한 경험",
      "민원인과 소통하며 문제를 끝까지 해결한 태도",
      "공직 가치와 봉사 정신이 드러나는 활동"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "인사혁신처 채용제도 소개",
        "url": "https://www.mpm.go.kr/mpm/info/infoJobs/HrProcedures"
      },
      {
        "label": "사이버국가고시센터 공고",
        "url": "https://gongmuwon.gosi.kr/oprut/RpaRpTestPbancLst.do"
      },
      {
        "label": "서울시 2026년 공무원 채용 보도자료",
        "url": "https://www.seoul.go.kr/news/news_report.do?bbsNo=158&nttNo=452259&cntPerPage=10&curPage=1"
      },
      {
        "label": "국가법령정보센터 지방공무원 임용령 개정이유",
        "url": "https://www.law.go.kr/LSW/lsRvsRsnListP.do?lsId=005050&chrClsCd=010102"
      }
    ],
    "recruitNotes": [
      "국가직은 인사혁신처(사이버국가고시센터), 지방직은 각 시도 공고(2026년 서울시 8, 9급 필기 6월 20일)",
      "전형: 필기시험(객관식, 7급은 2차 포함) 후 면접시험(인사혁신처 채용제도 기준)",
      "2027년부터 한국사는 한국사능력검정시험 3급 이상 성적으로 대체(지방공무원 임용령 개정 기준)"
    ]
  },
  "정책 기획자": {
    "does": [
      "정책 현안 자료 수집과 국내외 사례 조사",
      "통계 분석과 정책 보고서 초안 작성",
      "이해관계자 의견 수렴과 회의 자료 준비",
      "정책 제안서, 발표 자료 작성 지원"
    ],
    "skills": [
      "정치, 경제, 철학 등 사회과학 기초",
      "자료 조사와 통계 분석",
      "논리적 글쓰기와 보고서 작성",
      "토론과 설득 능력",
      "외국어 자료 독해"
    ],
    "certs": [
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "조사 설계와 통계 분석 역량 증빙용, 필수 아님"
      }
    ],
    "projectRole": [
      "자료 조사와 보고서 작성 담당",
      "설문 설계와 데이터 분석 담당",
      "발표와 토론 담당"
    ],
    "quant": [
      "사회조사분석사 2급 취득",
      "정책 제안 공모전 수상이나 제출 실적",
      "공인 영어성적 확보(기관별 기준 확인)"
    ],
    "qual": [
      "국회, 정당, 연구원, 시민단체 인턴",
      "정책 제안 공모전과 모의 국회 활동",
      "학술 논문이나 정책 보고서 작성 경험",
      "토론 동아리 활동"
    ],
    "resumePoints": [
      "사회 문제를 자료로 분석하고 대안을 제시한 경험",
      "논리적인 글쓰기와 보고서 작성 역량",
      "다양한 이해관계자 의견을 조율한 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업정보",
        "url": "https://www.career.go.kr/cnet/app/base/job/realmJobList.m?pageGubun=100102"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503"
      }
    ]
  },
  "사회복지사": {
    "does": [
      "청소년, 노인, 장애인 등 대상자 문제 평가와 상담",
      "복지 프로그램 기획, 시행과 평가",
      "대상자 선정, 급여 지급과 생활 지도",
      "관련 자료 수집, 분석과 대안 제시"
    ],
    "skills": [
      "언어능력과 대인관계능력",
      "상대 욕구에 맞춘 문제해결력",
      "협상과 설득 능력",
      "인간존중과 사회정의에 대한 사명감",
      "배려와 협동심"
    ],
    "certs": [
      {
        "name": "사회복지사 2급",
        "issuer": "한국사회복지사협회(보건복지부 위탁)",
        "type": "국가전문자격",
        "note": "필수. 관련 학과 졸업 등 자격 요건을 갖추면 취득"
      },
      {
        "name": "사회복지사 1급",
        "issuer": "한국산업인력공단(시험 시행), 한국사회복지사협회(자격 발급)",
        "type": "국가전문자격",
        "note": "국가시험 합격 필요, 관련부처 보건복지부, 근거 사회복지사업법 시행령 제3조"
      }
    ],
    "projectRole": [
      "대상자 욕구조사와 상담 담당",
      "복지 프로그램 기획과 운영 담당",
      "지역 기관 연계와 봉사 조직 담당"
    ],
    "quant": [
      "사회복지사 2급 취득(필수)",
      "사회복지사 1급 국가시험 합격(필기 3교시, 연 1회, 교시별 과목명은 Q-Net 시행공고 확인)",
      "사회복지 현장실습 이수(자격 요건)"
    ],
    "qual": [
      "사회복지관, 노인복지관, 장애인복지관 실습",
      "지역아동센터 등 봉사 활동",
      "복지 프로그램 기획과 운영 경험",
      "대상자 상담 기록과 사례관리 경험"
    ],
    "resumePoints": [
      "대상자 문제를 평가하고 해결을 지원한 경험",
      "봉사정신과 사회정의에 대한 사명감이 드러나는 활동",
      "협상과 설득으로 대상자와 기관을 조율한 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 사회복지사",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=379"
      },
      {
        "label": "Q-Net 사회복지사 1급",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=52"
      },
      {
        "label": "Q-Net 사회복지사 1급 시행공고",
        "url": "https://www.q-net.or.kr/crf002.do?id=crf00201&gSite=L&gId=52"
      },
      {
        "label": "한국사회복지사협회 자격관리센터",
        "url": "https://www.welfare.net/lic/"
      }
    ]
  },
  "임상 간호사": {
    "does": [
      "환자 활력징후 측정과 상태 관찰, 간호 기록",
      "의사 처방에 따른 투약, 주사, 검사 준비",
      "환자와 보호자 교육과 입퇴원 안내",
      "병동 물품 관리와 다른 직종과의 협업"
    ],
    "skills": [
      "성인, 아동, 모성, 정신 간호학 지식",
      "기본간호 술기와 정확한 투약",
      "환자 상태 관찰과 판단력",
      "환자, 보호자와의 소통",
      "보건의약관계법규 이해",
      "체력과 스트레스 관리"
    ],
    "certs": [
      {
        "name": "간호사 면허",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수. 평가인증 간호학 전공 대학 졸업 후 국가시험 합격"
      },
      {
        "name": "전문간호사",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "실무경력 3년 이상과 2년 교육과정 이수 후 응시, 신입 단계 필수 아님"
      }
    ],
    "projectRole": [
      "환자 안전 교육 자료 제작 담당",
      "건강 캠페인 기획과 운영 담당",
      "시뮬레이션 실습 팀의 기록과 평가 담당"
    ],
    "quant": [
      "간호사 국가시험 합격: 8과목 295문항(성인간호학 70, 모성간호학 35, 아동간호학 35, 지역사회간호학 35, 정신간호학 35, 간호관리학 35, 기본간호학 30, 보건의약관계법규 20)",
      "합격 기준: 전 과목 총점 60% 이상, 매 과목 40% 이상(국시원 공고 기준)",
      "병원별 요구 어학성적이나 학점 기준은 채용 공고 확인"
    ],
    "qual": [
      "임상실습에서 담당한 환자 사례와 간호 과정 기록",
      "병원 봉사나 보건소 실습 경험",
      "간호학과 시뮬레이션 실습과 술기 경진대회",
      "환자 교육 자료 제작 경험"
    ],
    "resumePoints": [
      "실습에서 환자 상태를 관찰하고 간호 문제를 해결한 경험",
      "환자, 보호자와 신뢰를 쌓은 소통 경험",
      "다른 직종과 협업하며 책임감 있게 일한 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국보건의료인국가시험원 간호사 시험시간표",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2005/7/view.do?seq=7&itm_seq=05"
      },
      {
        "label": "한국보건의료인국가시험원 간호사 응시자격",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2005/2/view.do?seq=7&itm_seq=05"
      },
      {
        "label": "한국보건의료인국가시험원 직종별 시험정보",
        "url": "https://www.kuksiwon.or.kr/cnt/c_1/view.do?seq=7"
      }
    ]
  },
  "보건직 공무원": {
    "does": [
      "보건소, 시군구 보건부서에서 감염병 예방과 방역 업무",
      "건강증진 사업과 보건교육 운영",
      "식품, 공중위생 업소 지도 점검",
      "보건 통계 관리와 행정 문서 작성"
    ],
    "skills": [
      "공중보건학과 보건행정 지식",
      "감염병 관리와 방역 절차 이해",
      "보건교육과 주민 소통",
      "행정 문서 작성",
      "통계 자료 정리"
    ],
    "certs": [
      {
        "name": "위생사",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "응시 요건 아님, 가산점 여부는 해당 연도 공고 확인"
      },
      {
        "name": "보건교육사",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "국가전문자격",
        "note": "응시 요건 아님"
      }
    ],
    "projectRole": [
      "건강 캠페인 기획과 운영 담당",
      "보건 통계 조사와 분석 담당",
      "보건교육 자료 제작 담당"
    ],
    "quant": [
      "필기시험 과목 학습: 국어, 영어, 한국사, 공중보건, 보건행정",
      "한국사능력검정시험 3급 이상(2027년부터 9급 공채 한국사 과목 대체)",
      "위생사 등 관련 면허 취득(가산점 여부 공고 확인)"
    ],
    "qual": [
      "보건소 실습이나 지역사회 보건 봉사",
      "건강증진 캠페인 기획 경험",
      "감염병 예방 교육 봉사",
      "보건의료 관련 공모전 참여"
    ],
    "resumePoints": [
      "지역 주민 건강 문제를 조사하고 개선 활동을 한 경험",
      "규정에 따라 꼼꼼하게 점검과 기록을 한 태도",
      "주민과 소통하며 보건교육을 한 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "서울시 2026년 공무원 채용 보도자료",
        "url": "https://www.seoul.go.kr/news/news_report.do?bbsNo=158&nttNo=452259&cntPerPage=10&curPage=1"
      },
      {
        "label": "인사혁신처 채용제도 소개",
        "url": "https://www.mpm.go.kr/mpm/info/infoJobs/HrProcedures"
      },
      {
        "label": "한국보건의료인국가시험원 직종별 시험정보",
        "url": "https://www.kuksiwon.or.kr/cnt/c_1/view.do?seq=7"
      },
      {
        "label": "국가법령정보센터 지방공무원 임용령 개정이유",
        "url": "https://www.law.go.kr/LSW/lsRvsRsnListP.do?lsId=005050&chrClsCd=010102"
      }
    ],
    "recruitNotes": [
      "전형: 필기시험(객관식) 후 면접시험",
      "간호직(간호사 면허 필요)과는 별도 직렬, 보건직 응시 자격 요건은 공고 원문 확인"
    ]
  },
  "물리치료사": {
    "does": [
      "의사 처방에 따라 온열, 전기, 광선, 수치료 등 물리요법 시행",
      "근골격계, 신경계 검사와 평가",
      "치료적 운동, 도수치료와 보조기구 지원",
      "환자 교육과 의사와의 치료 방향 협의"
    ],
    "skills": [
      "물리치료 기초와 진단평가 지식",
      "물리치료 중재 술기",
      "환자 이해와 소통 능력",
      "봉사정신과 배려심",
      "적절한 치료기구 선택",
      "의료관계법규 이해"
    ],
    "certs": [
      {
        "name": "물리치료사 면허",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수. 물리치료학 전공과 법정 현장실습 이수 후 국가시험 합격"
      }
    ],
    "projectRole": [
      "운동 프로그램 설계와 자세 평가 담당",
      "재활 보조기구나 운동 앱 기획 담당",
      "건강 캠페인 운영 담당"
    ],
    "quant": [
      "물리치료사 국가시험 합격: 필기 190문항(물리치료 기초 60, 물리치료 진단평가 45, 물리치료 중재 65, 의료관계법규 20)과 실기 70문항",
      "보건복지부령 현장실습과목 이수(응시자격)",
      "병원별 어학, 학점 기준은 채용 공고 확인"
    ],
    "qual": [
      "병원, 재활센터 임상실습 사례 기록",
      "스포츠팀 트레이너 보조나 재활 봉사",
      "노인, 장애인 복지시설 봉사",
      "운동 처방 프로젝트나 학술 발표"
    ],
    "resumePoints": [
      "실습에서 환자를 평가하고 치료 계획에 참여한 경험",
      "환자와 소통하며 치료 참여를 끌어낸 경험",
      "봉사정신과 친절한 서비스 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 물리치료사",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=369"
      },
      {
        "label": "한국보건의료인국가시험원 물리치료사 시험시간표",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2014/7/view.do?seq=7&itm_seq=11"
      },
      {
        "label": "한국보건의료인국가시험원 물리치료사 응시자격",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2014/2/view.do?seq=7&itm_seq=11"
      }
    ]
  },
  "임상병리사": {
    "does": [
      "혈액, 소변, 체액, 조직 검체 검사와 결과 분석",
      "검사 시약 조제와 장비 운용, 정도관리",
      "검사 과정 기록과 의사에게 결과 보고",
      "검체 접수와 검사실 물품 관리"
    ],
    "skills": [
      "임상검사 이론 지식",
      "첨단 의료장비 운용 능력",
      "세밀한 관찰력과 정상 색각",
      "섬세하고 꼼꼼한 성격",
      "반복 업무를 해내는 끈기",
      "의료관계법규 이해"
    ],
    "certs": [
      {
        "name": "임상병리사 면허",
        "issuer": "보건복지부(시험 시행 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수. 임상병리학 전공과 법정 현장실습 이수 후 국가시험 합격"
      }
    ],
    "projectRole": [
      "실험 설계와 검체 분석 담당",
      "데이터 정리와 통계 분석 담당",
      "실험 기록과 정도관리 담당"
    ],
    "quant": [
      "임상병리사 국가시험 합격: 필기 215문항(의료관계법규 20, 임상검사이론 I 80, 임상검사이론 II 115)과 실기 65문항",
      "보건복지부령 현장실습과목 이수(응시자격)",
      "병원별 어학, 학점 기준은 채용 공고 확인"
    ],
    "qual": [
      "병원 진단검사의학과 임상실습 기록",
      "연구실 실험 보조나 학부 연구 참여",
      "학술제 실험 발표",
      "헌혈, 보건 봉사 활동"
    ],
    "resumePoints": [
      "실습에서 검사를 정확하게 수행하고 기록한 경험",
      "장비를 다루며 오류를 찾아 개선한 경험",
      "꼼꼼함과 끈기가 드러나는 반복 실험 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 주니어 직업정보 임상병리사",
        "url": "https://www.career.go.kr/cnet/app/base/job/junior/juniorJobView64.m"
      },
      {
        "label": "한국보건의료인국가시험원 임상병리사 시험시간표",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2012/7/view.do?seq=7&itm_seq=08"
      },
      {
        "label": "한국보건의료인국가시험원 임상병리사 응시자격",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2012/2/view.do?seq=7&itm_seq=08"
      }
    ]
  },
  "1급 응급구조사": {
    "does": [
      "구급차, 응급실에서 응급환자 상태 평가와 현장 응급처치",
      "기도 확보, 심폐소생술, 출혈 처치, 고정과 이송 중 환자 관찰",
      "의료지도 아래 약물 투여 등 1급 업무 범위의 응급처치",
      "출동 기록, 응급처치 기록지 작성과 장비 점검"
    ],
    "skills": [
      "응급환자 평가와 중증도 분류",
      "심폐소생술과 전문 기도 관리",
      "응급의료 관련 법규 이해",
      "현장 상황 판단과 팀 소통",
      "체력과 스트레스 관리"
    ],
    "certs": [
      {
        "name": "1급 응급구조사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "국가전문자격",
        "note": "필수. 응급의료에 관한 법률에 따른 자격, 응급구조학 전공 대학(전문대학) 졸업(예정)자 응시"
      },
      {
        "name": "BLS Provider",
        "issuer": "American Heart Association(국내 교육: 대한심폐소생협회 등)",
        "type": "국제자격",
        "note": "병원, 소방 채용에서 요구 여부는 공고별로 다름"
      }
    ],
    "projectRole": [
      "응급상황 시나리오 훈련 기획과 진행 담당",
      "안전관리와 응급처치 담당",
      "교육 자료 제작과 캠페인 담당"
    ],
    "quant": [
      "1급 응급구조사 국가시험 합격(응급구조학과 졸업예정자 응시)",
      "BLS Provider 등 소생술 교육 이수",
      "소방공무원 구급 분야 채용 대비 체력검정 준비",
      "운전면허(구급차 운행 업무 대비)"
    ],
    "qual": [
      "병원 응급실, 소방서 구급대 임상실습 경험",
      "응급처치 교육 봉사와 캠페인 활동",
      "대회, 축제 등 현장 의료지원 봉사",
      "시뮬레이션 훈련과 팀 단위 상황 대응 경험"
    ],
    "resumePoints": [
      "실습에서 환자 평가와 응급처치를 실제로 수행한 경험",
      "긴박한 상황에서 침착하게 판단하고 팀과 소통한 사례",
      "법적 업무 범위와 윤리를 지키려는 태도"
    ],
    "ncs": "응급구조",
    "sources": [
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/"
      },
      {
        "label": "국가법령정보센터 응급의료에 관한 법률",
        "url": "https://www.law.go.kr/법령/응급의료에관한법률"
      },
      {
        "label": "소방청 채용 안내",
        "url": "https://www.nfa.go.kr/"
      }
    ],
    "recruitNotes": [
      "소",
      "방",
      "공",
      "무",
      "원",
      "구",
      "급",
      "분",
      "야",
      "는",
      "경",
      "력",
      "경",
      "쟁",
      "채",
      "용",
      "으",
      "로",
      "1",
      "급",
      "응",
      "급",
      "구",
      "조",
      "사",
      "자",
      "격",
      "등",
      "소",
      "방",
      "청",
      "공",
      "고",
      "의",
      "응",
      "시",
      "요",
      "건",
      "을",
      "확",
      "인",
      ".",
      "병",
      "원",
      "응",
      "급",
      "실",
      "의",
      "료",
      "기",
      "관",
      "은",
      "기",
      "관",
      "별",
      "채",
      "용",
      "공",
      "고",
      "기",
      "준",
      "."
    ]
  },
  "영양사": {
    "does": [
      "학교, 병원, 산업체 급식 식단 작성과 영양 관리",
      "식재료 검수, 발주, 재고와 원가 관리",
      "조리 과정 위생 점검과 HACCP 기준 관리",
      "급식 대상자 영양 상담과 교육, 기록 관리"
    ],
    "skills": [
      "영양 판정과 식단 설계",
      "식품위생과 HACCP 이해",
      "식재료 원가와 재고 관리",
      "조리 인력 관리와 소통",
      "영양 교육과 상담 능력"
    ],
    "certs": [
      {
        "name": "영양사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수. 국민영양관리법에 따라 지정 교과목 이수와 관련 학과 졸업(예정)자 응시, 현장실습 이수 필요"
      },
      {
        "name": "위생사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "국가전문자격",
        "note": "식품위생 분야 채용에서 우대하는 경우가 있음"
      },
      {
        "name": "식품기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "임상영양사",
        "issuer": "보건복지부",
        "type": "국가전문자격",
        "note": "영양사 면허 취득 후 임상영양사 교육과정(석사) 이수와 자격시험 합격 필요, 병원 임상영양 분야"
      }
    ],
    "projectRole": [
      "식단 설계와 영양 분석 담당",
      "위생 점검과 품질관리 담당",
      "영양 교육 자료 제작 담당"
    ],
    "quant": [
      "영양사 국가시험 합격(지정 교과목 이수, 현장실습 이수)",
      "위생사 또는 식품기사 취득",
      "HACCP 관련 교육 이수",
      "병원 영양사 지망 시 임상영양사 교육과정 진학 계획"
    ],
    "qual": [
      "학교, 병원, 산업체 급식소 현장실습 경험",
      "영양 교육 봉사와 지역사회 영양 캠페인",
      "식단 설계, 레시피 개발 공모전 참여",
      "급식 위생 점검 보조와 기록 작성 경험"
    ],
    "resumePoints": [
      "실습에서 식단 작성과 급식 운영에 참여한 구체적 경험",
      "위생 기준을 지키며 문제를 발견하고 개선한 사례",
      "대상자 특성에 맞춰 영양 교육을 설계한 경험"
    ],
    "ncs": "급식관리",
    "sources": [
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      },
      {
        "label": "국가법령정보센터 국민영양관리법 시행규칙",
        "url": "https://www.law.go.kr/법령/국민영양관리법시행규칙"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/"
      }
    ]
  },
  "한의사": {
    "does": [
      "환자 진찰(망문문절)과 변증 진단",
      "침, 뜸, 부항, 추나 등 한방 치료 시행",
      "한약 처방과 복약 지도",
      "진료 기록 작성, 건강보험 청구 관련 서류 관리"
    ],
    "skills": [
      "한의학 이론과 변증 진단 능력",
      "침구와 수기 치료 기술",
      "본초와 방제 지식",
      "환자 상담과 설명 능력",
      "의료 법규와 보험 제도 이해"
    ],
    "certs": [
      {
        "name": "한의사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수. 한의과대학 또는 한의학전문대학원 졸업(예정)자 응시"
      },
      {
        "name": "한의사 전문의",
        "issuer": "보건복지부",
        "type": "면허",
        "note": "면허 취득 후 수련한의사(인턴, 레지던트) 과정 이수와 전문의 자격시험 합격"
      }
    ],
    "projectRole": [
      "건강 상담과 의료 봉사 진료 보조 담당",
      "한의학 연구 자료 조사와 분석 담당",
      "건강 교육 콘텐츠 제작 담당"
    ],
    "quant": [
      "한의사 국가시험 합격(한의예과 2년, 한의학과 4년 과정 이수)",
      "전문의 지망 시 수련한의사 과정 지원 준비",
      "의학 논문 독해를 위한 영어 능력"
    ],
    "qual": [
      "한방병원 임상실습 경험",
      "의료 봉사 동아리 활동",
      "한의학 학술 동아리, 연구실 참여",
      "환자 소통 경험(봉사, 상담 보조)"
    ],
    "resumePoints": [
      "임상실습에서 진단과 치료 과정을 관찰하고 참여한 경험",
      "환자의 말을 끝까지 듣고 설명하는 태도",
      "근거를 찾아 한의학 치료를 설명하려는 학습 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      },
      {
        "label": "국가법령정보센터 의료법",
        "url": "https://www.law.go.kr/법령/의료법"
      },
      {
        "label": "대한한의사협회",
        "url": "https://www.akom.org/"
      }
    ]
  },
  "의료사회복지사": {
    "does": [
      "입원 환자와 가족의 심리사회적 문제 상담",
      "진료비 지원, 후원 연계 등 경제적 문제 상담",
      "퇴원 계획 수립과 지역사회 자원 연계",
      "의료진과 협력해 환자 사례 관리, 기록 작성"
    ],
    "skills": [
      "사례 관리와 상담 기술",
      "사회복지 제도와 의료급여 이해",
      "지역사회 자원 발굴과 연계",
      "다직종 협업과 소통",
      "기록 작성과 윤리 준수"
    ],
    "certs": [
      {
        "name": "사회복지사 1급",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원, 자격증 발급: 한국사회복지사협회)",
        "type": "국가전문자격",
        "note": "사회복지사업법에 따른 국가시험, 의료사회복지사 수련 응시의 전제"
      },
      {
        "name": "의료사회복지사",
        "issuer": "보건복지부",
        "type": "국가전문자격",
        "note": "사회복지사업법 제11조에 따른 법정 자격, 사회복지사 1급 취득 후 지정 수련기관에서 1년 수련"
      },
      {
        "name": "사회복지사 2급",
        "issuer": "한국사회복지사협회(보건복지부 위탁)",
        "type": "국가전문자격",
        "note": "사회복지학 전공 교과목 이수와 실습으로 취득"
      }
    ],
    "projectRole": [
      "대상자 인터뷰와 욕구 조사 담당",
      "지역 자원 조사와 연계 담당",
      "사례 기록과 보고서 작성 담당"
    ],
    "quant": [
      "사회복지사 2급 취득(전공 교과목 이수, 현장실습)",
      "사회복지사 1급 국가시험 합격",
      "병원 수련기관 의료사회복지사 수련 1년",
      "사회복지 현장실습 시간 이수"
    ],
    "qual": [
      "병원 사회사업실(의료사회복지팀) 실습 경험",
      "환자, 노인, 장애인 대상 봉사 활동",
      "지역사회 복지관 실습과 사례관리 보조",
      "다직종 팀 프로젝트 참여 경험"
    ],
    "resumePoints": [
      "실습에서 대상자 상담과 자원 연계를 직접 해 본 경험",
      "환자와 가족의 입장을 이해하고 기록한 태도",
      "의료진 등 다른 직종과 협력한 사례"
    ],
    "ncs": "의료사회복지",
    "sources": [
      {
        "label": "국가법령정보센터 사회복지사업법",
        "url": "https://www.law.go.kr/법령/사회복지사업법"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      },
      {
        "label": "한국사회복지사협회 자격관리센터",
        "url": "https://lic.welfare.net/"
      },
      {
        "label": "대한의료사회복지사협회",
        "url": "https://www.kamsw.or.kr/"
      }
    ]
  },
  "심리상담사": {
    "does": [
      "접수면접과 심리검사 실시, 결과 해석",
      "개인상담, 집단상담 진행과 회기 기록",
      "수퍼비전 받으며 사례 개념화와 상담 계획 수립",
      "위기 상황 대응과 외부 기관 연계"
    ],
    "skills": [
      "상담 이론과 기법 이해",
      "심리검사 실시와 해석",
      "경청과 공감적 소통",
      "사례 개념화와 기록",
      "상담 윤리와 비밀보장 준수"
    ],
    "certs": [
      {
        "name": "청소년상담사 3급",
        "issuer": "성평등가족부(시험 시행: 한국산업인력공단, 연수: 한국청소년상담복지개발원)",
        "type": "국가전문자격",
        "note": "청소년기본법에 따른 국가자격, 청소년상담복지센터 등 채용에서 요구"
      },
      {
        "name": "임상심리사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "실습 수련 또는 실무 경력이 응시 요건"
      },
      {
        "name": "상담심리사 2급",
        "issuer": "한국상담심리학회",
        "type": "민간자격",
        "note": "학회 준회원 가입, 지정 과목 이수, 자격시험(5과목)과 수련(개인상담, 수퍼비전, 집단상담 등) 필요"
      },
      {
        "name": "전문상담사 2급",
        "issuer": "한국상담학회",
        "type": "민간자격"
      }
    ],
    "projectRole": [
      "설문과 인터뷰 설계, 분석 담당",
      "또래상담, 멘토링 프로그램 운영 담당",
      "프로그램 효과 평가와 보고서 작성 담당"
    ],
    "quant": [
      "청소년상담사 3급 국가시험 합격",
      "상담심리사 2급 자격시험(상담심리학, 발달심리학, 이상심리학, 학습심리학, 심리검사) 준비",
      "학회 수련 요건(접수면접, 개인상담 회기, 수퍼비전 횟수) 누적",
      "상담 관련 대학원 진학 준비(2급 응시 요건과 연계)"
    ],
    "qual": [
      "상담센터, 청소년상담복지센터 실습과 인턴",
      "또래상담, 위기상담 전화 봉사",
      "집단상담 참여와 공개사례발표 경험",
      "상담 사례 연구 모임과 학술 활동 참여"
    ],
    "resumePoints": [
      "상담 실습에서 내담자와 관계를 맺고 회기를 이어 간 경험",
      "수퍼비전을 받아 자신의 상담을 돌아본 태도",
      "상담 윤리와 비밀보장을 지킨 사례"
    ],
    "ncs": "심리상담, 청소년상담복지",
    "sources": [
      {
        "label": "Q-Net 전문자격 청소년상담사",
        "url": "https://www.q-net.or.kr/man001.do?id=&gId=67&gSite=L"
      },
      {
        "label": "한국상담심리학회 상담심리사 2급 과정",
        "url": "https://krcpa.or.kr/user/new/sub03_3.asp"
      },
      {
        "label": "Q-Net 국가기술자격",
        "url": "https://www.q-net.or.kr/"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/"
      }
    ]
  },
  "임상시험 코디네이터": {
    "does": [
      "임상시험 대상자 모집, 동의 설명 보조와 방문 일정 관리",
      "증례기록서(CRF) 작성과 원자료 정리",
      "시험책임자, 의뢰사 모니터요원(CRA), IRB 사이 자료 전달",
      "임상시험용 의약품 관리와 이상반응 기록 보조"
    ],
    "skills": [
      "임상시험 관리기준(GCP) 이해",
      "의학 용어와 검사 결과 이해",
      "문서 작성과 데이터 정확성",
      "대상자 응대와 일정 관리",
      "영어 문서 독해"
    ],
    "certs": [
      {
        "name": "간호사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수는 아니며 병원 CRC 채용에서 요구 여부는 공고별로 다름"
      },
      {
        "name": "Certified Clinical Research Coordinator (CCRC)",
        "issuer": "Association of Clinical Research Professionals (ACRP)",
        "type": "국제자격",
        "note": "실무 경력 후 응시 가능"
      }
    ],
    "projectRole": [
      "실험 설계와 데이터 기록 관리 담당",
      "연구 윤리 심의 서류와 일정 관리 담당",
      "참가자 모집과 안내 담당"
    ],
    "quant": [
      "식약처 지정 교육실시기관 임상시험 종사자 교육(신규자 교육) 이수",
      "생명과학, 간호, 약학 등 관련 전공 학위",
      "영어 독해 능력(어학 성적)",
      "실험실 데이터 관리 도구(엑셀 등) 활용 능력"
    ],
    "qual": [
      "대학병원 임상시험센터 인턴, 연구 보조 경험",
      "연구실 실험 기록과 데이터 정리 경험",
      "IRB 심의 서류 작성 참여 경험",
      "학회, 공모전에서 연구 발표 경험"
    ],
    "resumePoints": [
      "연구 자료를 규정대로 정확히 기록하고 관리한 경험",
      "연구자, 참가자, 외부 기관 사이에서 조율한 사례",
      "GCP와 연구 윤리를 지키려는 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국가임상시험지원재단(KoNECT)",
        "url": "https://www.konect.or.kr/"
      },
      {
        "label": "식품의약품안전처",
        "url": "https://www.mfds.go.kr/"
      },
      {
        "label": "국가법령정보센터 의약품 등의 안전에 관한 규칙",
        "url": "https://www.law.go.kr/법령/의약품등의안전에관한규칙"
      },
      {
        "label": "ACRP Certification",
        "url": "https://acrpnet.org/certifications"
      }
    ]
  },
  "요양·케어 매니저": {
    "does": [
      "장기요양 수급자 상담과 욕구 사정, 급여 제공 계획 수립",
      "요양보호사 배치와 일정 관리, 서비스 모니터링",
      "장기요양급여 청구와 기록 관리",
      "가족 상담과 보호자 소통, 의료기관 연계"
    ],
    "skills": [
      "노인장기요양보험 제도 이해",
      "사례 관리와 서비스 계획 수립",
      "요양 인력 관리와 소통",
      "급여 청구와 행정 문서 처리",
      "노인 질환과 돌봄 기본 지식"
    ],
    "certs": [
      {
        "name": "사회복지사 2급",
        "issuer": "한국사회복지사협회(보건복지부 위탁)",
        "type": "국가전문자격",
        "note": "장기요양기관 사회복지사 배치 기준 자격"
      },
      {
        "name": "요양보호사",
        "issuer": "시도지사(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "국가전문자격",
        "note": "노인복지법에 따른 자격, 교육기관 교육 이수 후 시험 응시"
      },
      {
        "name": "사회복지사 1급",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "국가전문자격"
      }
    ],
    "projectRole": [
      "대상자 조사와 서비스 설계 담당",
      "일정, 인력 배치와 운영 관리 담당",
      "기록과 보고서 작성 담당"
    ],
    "quant": [
      "사회복지사 2급 취득(전공 과목 이수, 현장실습)",
      "요양보호사 자격 취득",
      "사회복지사 1급 국가시험 합격",
      "장기요양기관 종사자 교육 이수"
    ],
    "qual": [
      "노인복지관, 요양시설 실습 경험",
      "노인 돌봄 봉사 활동",
      "재가 서비스 동행과 사례 기록 경험",
      "보호자 상담 참관 경험"
    ],
    "resumePoints": [
      "실습에서 어르신과 보호자를 상담하고 기록한 경험",
      "여러 돌봄 인력과 일정을 조율한 사례",
      "돌봄 대상자의 존엄과 안전을 지키려는 태도"
    ],
    "ncs": "노인복지",
    "sources": [
      {
        "label": "국민건강보험공단 노인장기요양보험",
        "url": "https://www.longtermcare.or.kr/"
      },
      {
        "label": "국가법령정보센터 노인장기요양보험법",
        "url": "https://www.law.go.kr/법령/노인장기요양보험법"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/"
      }
    ]
  },
  "동물병원 스태프": {
    "does": [
      "진료 보조, 동물 보정과 처치 준비",
      "입원 동물 간호와 투약, 상태 관찰",
      "수술 준비와 기구 소독, 영상 촬영 보조",
      "접수, 보호자 응대와 진료 기록 관리"
    ],
    "skills": [
      "동물 해부생리와 질병 기초 지식",
      "동물 간호와 응급 처치",
      "의약품 관리와 임상병리 검사 보조",
      "보호자 응대와 설명 능력",
      "수의사법, 동물보호법 이해"
    ],
    "certs": [
      {
        "name": "동물보건사",
        "issuer": "농림축산식품부(시험 관리: 대한수의사회 동물보건사 자격시험 관리시스템)",
        "type": "국가전문자격",
        "note": "수의사법에 따른 국가자격, 농림축산식품부 평가인증 양성기관 졸업(예정)자 응시"
      },
      {
        "name": "반려동물행동지도사",
        "issuer": "농림축산식품부",
        "type": "국가전문자격",
        "note": "동물보호법에 따른 국가자격, 행동 교정 분야"
      }
    ],
    "projectRole": [
      "동물 관찰 기록과 데이터 정리 담당",
      "보호자 교육 자료 제작 담당",
      "실습 일정과 물품 관리 담당"
    ],
    "quant": [
      "동물보건사 국가시험 합격(기초 동물보건학, 예방 동물보건학, 임상 동물보건학 각 60문항, 법규 20문항)",
      "합격 기준: 과목별 40점 이상, 전 과목 평균 60점 이상",
      "평가인증 양성기관 졸업",
      "동물 관련 실습 시간 이수"
    ],
    "qual": [
      "동물병원 실습과 아르바이트 경험",
      "유기동물 보호소 봉사",
      "반려동물 교육 캠페인 참여",
      "실습 중 입원 동물 간호 기록 경험"
    ],
    "resumePoints": [
      "동물병원 실습에서 진료 보조와 간호를 수행한 경험",
      "보호자에게 상황을 차분히 설명한 사례",
      "동물 복지와 법규를 지키려는 태도"
    ],
    "ncs": "애완동물관리",
    "sources": [
      {
        "label": "동물보건사 자격시험 관리시스템 시험소개",
        "url": "https://vt-exam.or.kr/1011"
      },
      {
        "label": "동물보건사 자격시험 관리시스템 응시안내",
        "url": "https://vt-exam.or.kr/1012"
      },
      {
        "label": "국가법령정보센터 수의사법",
        "url": "https://www.law.go.kr/법령/수의사법"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/"
      }
    ]
  },
  "보건교사": {
    "does": [
      "학생 건강 상담과 응급처치, 보건실 운영",
      "보건교육 수업과 성교육, 약물 오남용 예방 교육",
      "건강검진, 감염병 예방과 학교 보건 행정",
      "건강 취약 학생 관리와 의료기관 연계"
    ],
    "skills": [
      "간호 지식과 응급처치",
      "보건교육 수업 설계",
      "학생 상담과 소통",
      "감염병 관리와 보건 행정",
      "학교 구성원과 협업"
    ],
    "certs": [
      {
        "name": "간호사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수. 보건교사 2급 자격 취득의 전제"
      },
      {
        "name": "보건교사 2급",
        "issuer": "교육부(대학 교직과정 이수 후 검정)",
        "type": "면허",
        "note": "필수. 간호학과 재학 중 교직과정 이수와 간호사 면허 소지(교원자격검정령 기준)"
      },
      {
        "name": "한국사능력검정시험 3급 이상",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "교사 임용시험 응시 요건"
      }
    ],
    "projectRole": [
      "건강 교육 프로그램 기획과 수업 담당",
      "안전관리와 응급처치 담당",
      "캠페인 자료 제작 담당"
    ],
    "quant": [
      "간호사 국가시험 합격",
      "교직과정 이수(보건교사 2급 자격)",
      "한국사능력검정시험 3급 이상",
      "중등교사 임용시험 1차(교육학 20점, 전공 80점) 준비"
    ],
    "qual": [
      "학교 보건실 교육실습 경험",
      "병원 임상실습 경험",
      "청소년 대상 보건교육 봉사",
      "응급처치 교육 봉사와 캠페인 활동"
    ],
    "resumePoints": [
      "교육실습에서 보건 수업과 학생 상담을 해 본 경험",
      "임상실습에서 응급 상황을 판단하고 처치한 사례",
      "학생을 이해하고 돌보려는 교육자 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "교육부 교원자격 안내",
        "url": "https://www.moe.go.kr/"
      },
      {
        "label": "국가법령정보센터 교원자격검정령",
        "url": "https://www.law.go.kr/법령/교원자격검정령"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      }
    ],
    "recruitNotes": [
      "공",
      "립",
      "은",
      "시",
      "도",
      "교",
      "육",
      "청",
      "이",
      "시",
      "행",
      "하",
      "는",
      "중",
      "등",
      "교",
      "사",
      "임",
      "용",
      "시",
      "험",
      "(",
      "비",
      "교",
      "과",
      "보",
      "건",
      ")",
      "응",
      "시",
      ".",
      "1",
      "차",
      ":",
      "교",
      "육",
      "학",
      "논",
      "술",
      "1",
      "문",
      "항",
      "2",
      "0",
      "점",
      "전",
      "공",
      "A",
      "4",
      "0",
      "점",
      "전",
      "공",
      "B",
      "4",
      "0",
      "점",
      "(",
      "단",
      "답",
      "형",
      "서",
      "술",
      "형",
      ")",
      ".",
      "2",
      "차",
      ":",
      "교",
      "직",
      "적",
      "성",
      "심",
      "층",
      "면",
      "접",
      "교",
      "수",
      "학",
      "습",
      "지",
      "도",
      "안",
      "작",
      "성",
      "수",
      "업",
      "실",
      "연",
      "등",
      "(",
      "시",
      "도",
      "별",
      "상",
      "이",
      ")",
      ".",
      "응",
      "시",
      "자",
      "격",
      ":",
      "보",
      "건",
      "교",
      "사",
      "자",
      "격",
      "증",
      "소",
      "지",
      "(",
      "예",
      "정",
      ")",
      "자",
      "한",
      "국",
      "사",
      "능",
      "력",
      "검",
      "정",
      "시",
      "험",
      "3",
      "급",
      "(",
      "심",
      "화",
      "3",
      "급",
      ")",
      "이",
      "상",
      ".",
      "출",
      "제",
      "와",
      "채",
      "점",
      "은",
      "한",
      "국",
      "교",
      "육",
      "과",
      "정",
      "평",
      "가",
      "원",
      "."
    ]
  },
  "스포츠 재활 트레이너": {
    "does": [
      "부상 후 운동 기능 평가와 재활 운동 프로그램 설계",
      "근력, 유연성, 밸런스 운동 지도와 기록",
      "물리치료사, 의사와 협력해 복귀 단계 관리",
      "부상 예방 교육과 운동 자세 교정"
    ],
    "skills": [
      "기능해부학과 운동생리학",
      "운동상해 평가와 재활 운동 처방",
      "트레이닝 원리와 프로그램 설계",
      "고객 소통과 동기 부여",
      "안전 관리와 기록"
    ],
    "certs": [
      {
        "name": "물리치료사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "의료기관 재활 치료 업무에 필수, 트레이너 업무 자체에는 면허 불요"
      },
      {
        "name": "건강운동관리사",
        "issuer": "문화체육관광부(자격검정, 연수: 국민체육진흥공단)",
        "type": "국가전문자격",
        "note": "국민체육진흥법에 따른 자격, 필기 필수 8과목 후 실기구술과 연수"
      },
      {
        "name": "2급 생활스포츠지도사",
        "issuer": "문화체육관광부(자격검정, 연수: 국민체육진흥공단)",
        "type": "국가전문자격",
        "note": "필기 선택 5과목 후 실기구술과 연수"
      }
    ],
    "projectRole": [
      "운동 프로그램 설계와 측정 담당",
      "부상 예방 교육과 안전 관리 담당",
      "운동 효과 데이터 기록과 분석 담당"
    ],
    "quant": [
      "건강운동관리사 필기(필수 8과목)와 실기구술, 연수 이수",
      "2급 생활스포츠지도사 필기(선택 5과목)와 실기구술, 연수 이수",
      "물리치료사 국가시험 합격(물리치료학과 재학 시)",
      "응급처치, 심폐소생술 교육 이수"
    ],
    "qual": [
      "병원 재활센터, 스포츠 재활 클리닉 실습",
      "운동부 트레이너 보조와 선수 관리 경험",
      "운동 처방 프로그램 운영 경험(동아리, 지역 주민)",
      "운동 측정 데이터 기록과 분석 프로젝트"
    ],
    "resumePoints": [
      "대상자 상태를 평가하고 운동 프로그램을 설계해 본 경험",
      "부상 위험을 관리하며 안전하게 지도한 사례",
      "의료진과 협력하며 배우려는 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국민체육진흥공단 체육지도자 자격제도안내",
        "url": "https://sqms.kspo.or.kr/info/licenseInfoPsc1.kspo"
      },
      {
        "label": "국민체육진흥공단 체육지도자 필기시험과목 총괄표",
        "url": "https://sqms.kspo.or.kr/exam/wrTotal.kspo"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      },
      {
        "label": "국가법령정보센터 국민체육진흥법",
        "url": "https://www.law.go.kr/법령/국민체육진흥법"
      }
    ]
  },
  "영양교사": {
    "does": [
      "학교급식 식단 작성과 영양 관리",
      "식재료 검수, 조리 과정 위생과 HACCP 관리",
      "학생 영양 교육 수업과 영양 상담",
      "급식 운영 행정과 학교급식위원회 업무"
    ],
    "skills": [
      "식단 설계와 영양 판정",
      "학교급식 위생 관리",
      "영양 교육 수업 설계",
      "조리 인력 관리와 소통",
      "급식 행정과 예산 관리"
    ],
    "certs": [
      {
        "name": "영양사",
        "issuer": "보건복지부(국가시험 시행: 한국보건의료인국가시험원)",
        "type": "면허",
        "note": "필수. 영양교사 2급 자격 취득의 전제"
      },
      {
        "name": "영양교사 2급",
        "issuer": "교육부(대학 교직과정 이수 후 검정)",
        "type": "면허",
        "note": "필수. 식품영양 관련 학과 교직과정 이수와 영양사 면허 소지(교원자격검정령 기준)"
      },
      {
        "name": "한국사능력검정시험 3급 이상",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "교사 임용시험 응시 요건"
      }
    ],
    "projectRole": [
      "식단 설계와 영양 분석 담당",
      "영양 교육 자료 제작과 수업 담당",
      "위생 점검과 운영 관리 담당"
    ],
    "quant": [
      "영양사 국가시험 합격",
      "교직과정 이수(영양교사 2급 자격)",
      "한국사능력검정시험 3급 이상",
      "중등교사 임용시험 1차(교육학 20점, 전공 80점) 준비"
    ],
    "qual": [
      "학교 급식소 교육실습 경험",
      "급식 현장실습(학교, 병원, 산업체)",
      "어린이 영양 교육 봉사",
      "식단 설계, 레시피 개발 공모전 참여"
    ],
    "resumePoints": [
      "교육실습에서 급식 운영과 영양 수업을 해 본 경험",
      "위생 기준을 지키며 급식 문제를 개선한 사례",
      "학생 눈높이에 맞춘 영양 교육 설계 경험"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "교육부 교원자격 안내",
        "url": "https://www.moe.go.kr/"
      },
      {
        "label": "국가법령정보센터 교원자격검정령",
        "url": "https://www.law.go.kr/법령/교원자격검정령"
      },
      {
        "label": "한국보건의료인국가시험원",
        "url": "https://www.kuksiwon.or.kr/"
      }
    ],
    "recruitNotes": [
      "공",
      "립",
      "은",
      "시",
      "도",
      "교",
      "육",
      "청",
      "이",
      "시",
      "행",
      "하",
      "는",
      "중",
      "등",
      "교",
      "사",
      "임",
      "용",
      "시",
      "험",
      "(",
      "비",
      "교",
      "과",
      "영",
      "양",
      ")",
      "응",
      "시",
      ".",
      "1",
      "차",
      ":",
      "교",
      "육",
      "학",
      "논",
      "술",
      "1",
      "문",
      "항",
      "2",
      "0",
      "점",
      "전",
      "공",
      "A",
      "4",
      "0",
      "점",
      "전",
      "공",
      "B",
      "4",
      "0",
      "점",
      "(",
      "단",
      "답",
      "형",
      "서",
      "술",
      "형",
      ")",
      ".",
      "2",
      "차",
      ":",
      "교",
      "직",
      "적",
      "성",
      "심",
      "층",
      "면",
      "접",
      "교",
      "수",
      "학",
      "습",
      "지",
      "도",
      "안",
      "작",
      "성",
      "수",
      "업",
      "실",
      "연",
      "등",
      "(",
      "시",
      "도",
      "별",
      "상",
      "이",
      ")",
      ".",
      "응",
      "시",
      "자",
      "격",
      ":",
      "영",
      "양",
      "교",
      "사",
      "자",
      "격",
      "증",
      "소",
      "지",
      "(",
      "예",
      "정",
      ")",
      "자",
      "한",
      "국",
      "사",
      "능",
      "력",
      "검",
      "정",
      "시",
      "험",
      "3",
      "급",
      "(",
      "심",
      "화",
      "3",
      "급",
      ")",
      "이",
      "상",
      ".",
      "출",
      "제",
      "와",
      "채",
      "점",
      "은",
      "한",
      "국",
      "교",
      "육",
      "과",
      "정",
      "평",
      "가",
      "원",
      "."
    ]
  },
  "스포츠 지도자·트레이너": {
    "does": [
      "회원 체력 측정과 운동 목표 상담",
      "개인, 그룹 운동 프로그램 설계와 지도",
      "운동 자세 교정과 안전 관리",
      "수업 기록, 회원 관리와 시설 점검"
    ],
    "skills": [
      "운동생리학과 트레이닝 원리",
      "종목 실기 능력과 시범",
      "운동 프로그램 설계",
      "회원 소통과 동기 부여",
      "안전 관리와 응급처치"
    ],
    "certs": [
      {
        "name": "2급 생활스포츠지도사",
        "issuer": "문화체육관광부(자격검정, 연수: 국민체육진흥공단)",
        "type": "국가전문자격",
        "note": "국민체육진흥법에 따른 자격, 필기 선택 5과목 후 실기구술과 연수. 체육시설 지도자 배치 기준 자격"
      },
      {
        "name": "2급 전문스포츠지도사",
        "issuer": "문화체육관광부(자격검정, 연수: 국민체육진흥공단)",
        "type": "국가전문자격",
        "note": "선수 지도 분야, 필기 선택 5과목"
      },
      {
        "name": "건강운동관리사",
        "issuer": "문화체육관광부(자격검정, 연수: 국민체육진흥공단)",
        "type": "국가전문자격",
        "note": "운동 처방 분야, 필기 필수 8과목"
      },
      {
        "name": "노인스포츠지도사, 유소년스포츠지도사",
        "issuer": "문화체육관광부(자격검정, 연수: 국민체육진흥공단)",
        "type": "국가전문자격",
        "note": "대상별 지도 분야"
      }
    ],
    "projectRole": [
      "운동 프로그램 기획과 지도 담당",
      "체력 측정과 데이터 관리 담당",
      "행사 안전 관리와 진행 담당"
    ],
    "quant": [
      "2급 생활스포츠지도사 필기(선택 5과목), 실기구술, 연수 이수",
      "건강운동관리사 필기(필수 8과목), 실기구술, 연수 이수",
      "심폐소생술, 응급처치 교육 이수",
      "종목별 단체 지도자 자격 취득"
    ],
    "qual": [
      "스포츠센터, 피트니스센터 인턴과 아르바이트",
      "운동부 코치 보조와 생활체육 교실 지도 봉사",
      "체력 측정과 운동 처방 프로젝트",
      "스포츠 행사 운영 스태프 경험"
    ],
    "resumePoints": [
      "실제 회원이나 학생을 지도해 변화를 만든 경험",
      "안전사고를 예방하며 수업을 운영한 사례",
      "꾸준히 실기 능력과 지도 지식을 쌓은 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국민체육진흥공단 체육지도자 자격제도안내",
        "url": "https://sqms.kspo.or.kr/info/licenseInfoPsc1.kspo"
      },
      {
        "label": "국민체육진흥공단 체육지도자 필기시험과목 총괄표",
        "url": "https://sqms.kspo.or.kr/exam/wrTotal.kspo"
      },
      {
        "label": "국가법령정보센터 국민체육진흥법",
        "url": "https://www.law.go.kr/법령/국민체육진흥법"
      },
      {
        "label": "NCS 국가직무능력표준",
        "url": "https://www.ncs.go.kr/"
      }
    ]
  },
  "체육교사": {
    "does": [
      "체육 수업 설계와 실기 지도, 평가",
      "학교 운동부, 스포츠클럽 지도와 대회 인솔",
      "학생 안전 관리와 체육 시설, 용구 관리",
      "담임, 생활지도 등 학교 행정 업무"
    ],
    "skills": [
      "종목별 실기 능력과 시범",
      "체육 교육과정 이해와 수업 설계",
      "학생 안전 관리와 응급처치",
      "학생 상담과 생활지도",
      "체력 측정과 평가"
    ],
    "certs": [
      {
        "name": "중등학교 정교사 2급(체육)",
        "issuer": "교육부(사범대학 또는 교직과정, 교육대학원 이수 후 검정)",
        "type": "면허",
        "note": "필수. 체육교육과 졸업, 체육 관련 학과 교직과정 이수, 교육대학원 체육교육 전공 중 하나"
      },
      {
        "name": "한국사능력검정시험 3급 이상",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "교사 임용시험 응시 요건"
      },
      {
        "name": "2급 생활스포츠지도사",
        "issuer": "문화체육관광부(자격검정, 연수: 국민체육진흥공단)",
        "type": "국가전문자격",
        "note": "필수는 아니며 지도 역량 증빙용"
      }
    ],
    "projectRole": [
      "운동 프로그램 기획과 지도 담당",
      "행사 안전 관리와 진행 담당",
      "수업 자료와 영상 콘텐츠 제작 담당"
    ],
    "quant": [
      "중등 정교사 2급(체육) 자격 취득(교직과정 또는 교육대학원)",
      "한국사능력검정시험 3급 이상",
      "중등교사 임용시험 1차(교육학 20점, 전공 80점) 준비",
      "2차 수업실연과 실기 평가 대비 종목 실기 연습"
    ],
    "qual": [
      "교육실습(교생) 경험",
      "학교 스포츠클럽, 방과후 체육 지도 봉사",
      "운동부 코치 보조와 대회 운영 스태프",
      "수업 지도안 작성과 모의 수업 경험"
    ],
    "resumePoints": [
      "교육실습에서 수업을 설계하고 실기를 지도한 경험",
      "학생 안전을 지키며 활동을 운영한 사례",
      "학생을 이해하고 성장시키려는 교육자 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "교육부 교원자격 안내",
        "url": "https://www.moe.go.kr/"
      },
      {
        "label": "국가법령정보센터 교원자격검정령",
        "url": "https://www.law.go.kr/법령/교원자격검정령"
      },
      {
        "label": "국민체육진흥공단 체육지도자 자격제도안내",
        "url": "https://sqms.kspo.or.kr/info/licenseInfoPsc1.kspo"
      }
    ],
    "recruitNotes": [
      "공",
      "립",
      "은",
      "시",
      "도",
      "교",
      "육",
      "청",
      "이",
      "시",
      "행",
      "하",
      "는",
      "중",
      "등",
      "교",
      "사",
      "임",
      "용",
      "시",
      "험",
      "(",
      "체",
      "육",
      ")",
      "응",
      "시",
      ".",
      "1",
      "차",
      ":",
      "교",
      "육",
      "학",
      "논",
      "술",
      "1",
      "문",
      "항",
      "2",
      "0",
      "점",
      "전",
      "공",
      "A",
      "4",
      "0",
      "점",
      "전",
      "공",
      "B",
      "4",
      "0",
      "점",
      "(",
      "단",
      "답",
      "형",
      "서",
      "술",
      "형",
      ")",
      ".",
      "2",
      "차",
      ":",
      "교",
      "직",
      "적",
      "성",
      "심",
      "층",
      "면",
      "접",
      "교",
      "수",
      "학",
      "습",
      "지",
      "도",
      "안",
      "작",
      "성",
      "수",
      "업",
      "실",
      "연",
      "과",
      "실",
      "기",
      "평",
      "가",
      "(",
      "시",
      "도",
      "별",
      "상",
      "이",
      ")",
      ".",
      "응",
      "시",
      "자",
      "격",
      ":",
      "중",
      "등",
      "정",
      "교",
      "사",
      "(",
      "체",
      "육",
      ")",
      "자",
      "격",
      "증",
      "소",
      "지",
      "(",
      "예",
      "정",
      ")",
      "자",
      "한",
      "국",
      "사",
      "능",
      "력",
      "검",
      "정",
      "시",
      "험",
      "3",
      "급",
      "(",
      "심",
      "화",
      "3",
      "급",
      ")",
      "이",
      "상",
      ".",
      "출",
      "제",
      "와",
      "채",
      "점",
      "은",
      "한",
      "국",
      "교",
      "육",
      "과",
      "정",
      "평",
      "가",
      "원",
      "."
    ]
  },
  "전문상담교사": {
    "does": [
      "학생 개인상담, 집단상담과 심리검사 실시",
      "Wee클래스 운영과 학교폭력, 위기 학생 관리",
      "학부모, 담임교사 자문과 외부 기관 연계",
      "상담 기록 관리와 예방 교육 프로그램 운영"
    ],
    "skills": [
      "상담 이론과 기법",
      "심리검사 실시와 해석",
      "위기 개입과 학교폭력 대응",
      "학생, 학부모, 교사와 소통",
      "상담 윤리와 기록 관리"
    ],
    "certs": [
      {
        "name": "전문상담교사 2급",
        "issuer": "교육부(상담 관련 학과 교직과정 또는 교육대학원 이수 후 검정)",
        "type": "면허",
        "note": "필수. 상담, 심리 관련 학과 교직과정 이수 또는 교육대학원 상담 전공 석사(교원자격검정령 기준)"
      },
      {
        "name": "한국사능력검정시험 3급 이상",
        "issuer": "국사편찬위원회",
        "type": "국가공인 민간자격",
        "note": "교사 임용시험 응시 요건"
      },
      {
        "name": "청소년상담사 3급",
        "issuer": "성평등가족부(시험 시행: 한국산업인력공단)",
        "type": "국가전문자격",
        "note": "필수는 아니며 상담 역량 증빙용"
      }
    ],
    "projectRole": [
      "또래상담, 멘토링 프로그램 기획과 운영 담당",
      "설문과 심리검사 분석 담당",
      "예방 교육 자료 제작 담당"
    ],
    "quant": [
      "전문상담교사 2급 자격 취득(교직과정 또는 교육대학원)",
      "한국사능력검정시험 3급 이상",
      "중등교사 임용시험 1차(교육학 20점, 전공 80점) 준비",
      "청소년상담사 3급 등 상담 자격 취득"
    ],
    "qual": [
      "학교 Wee클래스 교육실습, 상담 실습",
      "청소년상담복지센터 인턴과 봉사",
      "또래상담, 멘토링 운영 경험",
      "집단상담 참여와 사례 연구 모임"
    ],
    "resumePoints": [
      "상담 실습에서 학생과 관계를 맺고 회기를 이어 간 경험",
      "위기 상황에서 절차에 따라 대응하고 연계한 사례",
      "상담 윤리와 비밀보장을 지킨 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "교육부 교원자격 안내",
        "url": "https://www.moe.go.kr/"
      },
      {
        "label": "국가법령정보센터 교원자격검정령",
        "url": "https://www.law.go.kr/법령/교원자격검정령"
      },
      {
        "label": "Q-Net 전문자격 청소년상담사",
        "url": "https://www.q-net.or.kr/man001.do?id=&gId=67&gSite=L"
      }
    ],
    "recruitNotes": [
      "공",
      "립",
      "은",
      "시",
      "도",
      "교",
      "육",
      "청",
      "이",
      "시",
      "행",
      "하",
      "는",
      "중",
      "등",
      "교",
      "사",
      "임",
      "용",
      "시",
      "험",
      "(",
      "비",
      "교",
      "과",
      "전",
      "문",
      "상",
      "담",
      ")",
      "응",
      "시",
      ".",
      "1",
      "차",
      ":",
      "교",
      "육",
      "학",
      "논",
      "술",
      "1",
      "문",
      "항",
      "2",
      "0",
      "점",
      "전",
      "공",
      "A",
      "4",
      "0",
      "점",
      "전",
      "공",
      "B",
      "4",
      "0",
      "점",
      "(",
      "단",
      "답",
      "형",
      "서",
      "술",
      "형",
      ")",
      ".",
      "2",
      "차",
      ":",
      "교",
      "직",
      "적",
      "성",
      "심",
      "층",
      "면",
      "접",
      "교",
      "수",
      "학",
      "습",
      "지",
      "도",
      "안",
      "작",
      "성",
      "수",
      "업",
      "실",
      "연",
      "(",
      "상",
      "담",
      "실",
      "연",
      ")",
      "등",
      "(",
      "시",
      "도",
      "별",
      "상",
      "이",
      ")",
      ".",
      "응",
      "시",
      "자",
      "격",
      ":",
      "전",
      "문",
      "상",
      "담",
      "교",
      "사",
      "자",
      "격",
      "증",
      "소",
      "지",
      "(",
      "예",
      "정",
      ")",
      "자",
      "한",
      "국",
      "사",
      "능",
      "력",
      "검",
      "정",
      "시",
      "험",
      "3",
      "급",
      "(",
      "심",
      "화",
      "3",
      "급",
      ")",
      "이",
      "상",
      ".",
      "출",
      "제",
      "와",
      "채",
      "점",
      "은",
      "한",
      "국",
      "교",
      "육",
      "과",
      "정",
      "평",
      "가",
      "원",
      "."
    ]
  },
  "특수교사": {
    "does": [
      "특수교육대상 학생의 개별화교육계획(IEP) 작성과 개별화교육지원팀 참여",
      "장애 유형과 정도에 맞춘 교과 수업과 생활지도",
      "통합학급 교사, 특수교육지도사, 보호자와 협력해 학교 적응 지원",
      "진로와 직업교육, 특수교육 관련서비스 연계"
    ],
    "skills": [
      "장애 유형별 교수법 이해",
      "개별화교육계획 수립",
      "행동 지원과 문제행동 관리",
      "보호자, 동료 교사와 협력 소통",
      "보조공학기기와 학습보조기기 활용"
    ],
    "certs": [
      {
        "name": "특수학교 정교사(2급)",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "필수. 교원자격검정령에 따른 교원자격증, 임용시험 응시 요건"
      }
    ],
    "projectRole": [
      "장애학생 멘토링이나 교육봉사 프로그램 기획 담당",
      "교재와 학습자료 제작 담당",
      "활동 기록과 개별 지원 계획 정리 담당"
    ],
    "quant": [
      "특수학교 정교사(2급) 자격 취득(전공, 교직 학점과 성적 기준 충족)",
      "교직 적성 및 인성검사 적격 판정 2회 이상, 응급처치 및 심폐소생술 실습 2회 이상",
      "한국사능력검정시험 취득(임용 1차 한국사 과목 대체, 등급 기준은 시도교육청 공고 확인)",
      "임용 1차 시험(교육학 논술, 전공A, 전공B) 대비"
    ],
    "qual": [
      "특수학교, 특수학급 교육실습",
      "장애학생 대상 교육봉사나 방과후 지원 활동",
      "통합교육 환경에서 협력 수업을 경험한 사례 정리",
      "수업실연과 심층면접 연습"
    ],
    "resumePoints": [
      "장애학생 개개인의 요구에 맞춰 수업과 지원을 설계한 경험",
      "보호자, 동료 교사, 지원인력과 협력해 문제를 해결한 과정",
      "교직 윤리와 학생 인권 보호에 대한 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "경기도교육청 2027학년도 중등 임용시험 공고 보도자료",
        "url": "https://www.goe.go.kr/goe/na/ntt/selectNttInfo.do?nttSn=2375830"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      },
      {
        "label": "경기도교육청 2026학년도 특수교육지도사 운영계획(특수교육법 조항 인용)",
        "url": "https://www.goe.go.kr/resource/goe/na/bbs_2675/2026/03/5eb10400-8999-4ee6-aa40-e873884291e7.pdf"
      }
    ],
    "recruitNotes": [
      "공립 중등학교(특수 포함) 교사 임용후보자 선정경쟁시험: 시도교육청이 시행 공고와 원서접수, 시험 실시를 맡고 한국교육과정평가원이 1차 출제와 채점, 2차 출제를 담당",
      "1차: 교육학 논술형 1문항 20점(60분), 전공A 단답형 4문항과 서술형 8문항 40점(90분), 전공B 단답형 2문항과 서술형 9문항 40점(90분), 한국사는 한국사능력검정시험으로 대체",
      "1차 합격자는 선발 예정 인원의 1.5배수 선정(경기도교육청 2027학년도 공고 기준)",
      "2차: 교직적성 심층면접, 교수학습 지도안 작성, 수업실연 등(시도별, 과목별로 다름)"
    ]
  },
  "특수교육 지원 강사": {
    "does": [
      "특수교육대상 학생의 교수학습 활동 지원(학습자료 준비, 이동 지원, 교실과 운동장 활동 지원)",
      "용변, 식사 지도, 보조기 착용 등 개인 욕구 지원",
      "적응행동 촉진, 또래 관계 형성 지원 등 학교 적응 지원",
      "개별화교육계획에 따른 지원 역할 수행"
    ],
    "skills": [
      "장애 유형별 특성 이해",
      "행동 지원과 안전사고 예방",
      "신변처리와 건강 보호 지원",
      "특수교사, 담임교사와 협력",
      "학생 인권 보호 의식"
    ],
    "certs": [
      {
        "name": "특수학교 정교사(2급)",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "지원인력 채용 필수 요건은 아님. 특수교사 진로로 이어갈 때 필요"
      }
    ],
    "projectRole": [
      "장애학생 교육봉사나 캠프 활동 지원 담당",
      "활동 안전 관리와 기록 담당",
      "학습자료 제작 담당"
    ],
    "quant": [
      "특수교육 관련 전공 과목 이수",
      "장애인 등에 대한 특수교육법 시행규칙 제5조 제2항 자격 요건 확인",
      "신규 채용 시 직무연수 30시간 이상 이수(경기도교육청 운영계획 기준)"
    ],
    "qual": [
      "장애학생 대상 교육봉사, 방과후 프로그램 지원 경험",
      "특수학급, 특수학교 참관이나 실습",
      "응급처치와 안전 교육 이수",
      "점자, 수어, 보조기기 활용 연수 참여"
    ],
    "resumePoints": [
      "장애학생의 일상과 학습을 곁에서 지원한 구체적 경험",
      "교사, 보호자와 역할을 나누어 협력한 태도",
      "학생 인권과 안전을 우선한 판단 사례"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "경기도교육청 2026학년도 특수교육지도사 운영계획",
        "url": "https://www.goe.go.kr/resource/goe/na/bbs_2675/2026/03/5eb10400-8999-4ee6-aa40-e873884291e7.pdf"
      },
      {
        "label": "경기도교육청 교육공무직원 채용 공고",
        "url": "https://www.goe.go.kr/recruit/ad/func/pb/hnfpPbancInfoView.do?pbancSn=62860"
      }
    ],
    "recruitNotes": [
      "교육청 교육공무직원(특수교육지도사) 채용: 근거는 초중등교육법 제59조, 장애인 등에 대한 특수교육법 제21조, 제22조, 제28조와 같은 법 시행령 제25조, 시행규칙 제5조",
      "채용 자격 기준은 특수교육법 시행규칙 제5조 제2항의 자격을 가진 자(경기도교육청 2026학년도 운영계획), 세부 전형은 시도교육청별 교육공무직원 채용 공고 확인",
      "1일 8시간, 방학 중 비근무(경기도교육청 기준)"
    ]
  },
  "영어 강사": {
    "does": [
      "학원, 교육기관에서 레벨별 영어 수업 진행",
      "교재 선정, 수업안 작성, 평가 문항 출제",
      "학생 진도 관리와 학습 상담, 보호자 소통",
      "어학시험 대비반 운영"
    ],
    "skills": [
      "영어 4기능(듣기, 말하기, 읽기, 쓰기) 운용",
      "영어 교수법과 수업 설계",
      "학습자 수준 진단과 피드백",
      "교재와 평가 도구 개발",
      "학습 동기 부여와 상담"
    ],
    "certs": [
      {
        "name": "중등학교 정교사(2급) 영어",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "학원 강사 필수 요건은 아님. 교직과정 이수자만 취득 가능"
      },
      {
        "name": "TESOL 과정 수료증",
        "issuer": "국내외 교육기관(단일 공식 발급기관 없음)",
        "type": "민간자격"
      }
    ],
    "projectRole": [
      "영어 학습 콘텐츠나 교재 제작 담당",
      "스터디 운영과 튜터링 담당",
      "영어 발표와 통번역 담당"
    ],
    "quant": [
      "공인 영어시험 점수(TOEIC, TEPS, TOEFL, IELTS 등) 확보",
      "영어 관련 전공 이수, 교직과정 이수 시 중등 영어 정교사(2급)",
      "학원 강사 자격 기준(학원의 설립, 운영 및 과외교습에 관한 법률 시행령 별표) 충족 여부 확인"
    ],
    "qual": [
      "영어 튜터링, 교육봉사, 멘토링 경험",
      "수업 시연 영상이나 강의안 포트폴리오",
      "어학연수, 교환학생 등 영어 사용 환경 경험",
      "학생 수준별 피드백을 준 사례 정리"
    ],
    "resumePoints": [
      "학습자 수준에 맞게 수업을 설계하고 운영한 경험",
      "영어 실력을 숫자로 보여 주는 공인 점수와 활용 사례",
      "학생과 보호자와 소통하며 성과를 낸 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      },
      {
        "label": "찾기쉬운 생활법령정보 학원의 설립, 운영 및 과외교습",
        "url": "https://m.easylaw.go.kr/MOB/NtcInfoRetrieve.laf?ntcSeq=780"
      }
    ]
  },
  "중국어 강사": {
    "does": [
      "학원, 교육기관에서 레벨별 중국어 수업 진행",
      "HSK 등 어학시험 대비반 운영과 문제 풀이 지도",
      "교재 선정, 수업안 작성, 회화 연습 지도",
      "학생 진도 관리와 학습 상담"
    ],
    "skills": [
      "중국어 회화와 독해, 작문 능력",
      "한어병음과 성조, 어법 지도",
      "중국어 교수법과 수업 설계",
      "학습자 수준 진단과 피드백",
      "중국 문화 이해"
    ],
    "certs": [
      {
        "name": "HSK(汉语水平考试)",
        "issuer": "HSK한국사무국(한국 시행)",
        "type": "국제자격",
        "note": "자격이 아닌 어학시험. 1급부터 6급, 7-9급 운영"
      },
      {
        "name": "CTCSOL(国际中文教师证书, 국제중문교사증서)",
        "issuer": "중외언어교류합작센터(CLEC), 한국은 HSK한국사무국 접수",
        "type": "국제자격"
      },
      {
        "name": "중등학교 정교사(2급) 중국어",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "학원 강사 필수 요건은 아님. 교직과정 이수자만 취득 가능"
      }
    ],
    "projectRole": [
      "중국어 학습 콘텐츠나 교재 제작 담당",
      "중국어 스터디 운영과 튜터링 담당",
      "중국 자료 번역과 발표 담당"
    ],
    "quant": [
      "HSK 급수(가능하면 6급 이상)와 HSKK(회화) 등급",
      "중국어 관련 전공 이수, 교직과정 이수 시 중등 중국어 정교사(2급)",
      "CTCSOL 필기와 면접 합격",
      "학원 강사 자격 기준(학원법 시행령 별표) 충족 여부 확인"
    ],
    "qual": [
      "중국어 튜터링, 교육봉사 경험",
      "수업 시연 영상이나 강의안 포트폴리오",
      "중국 어학연수, 교환학생 경험",
      "HSK 대비 지도 사례 정리"
    ],
    "resumePoints": [
      "학습자 수준에 맞는 수업 설계와 운영 경험",
      "HSK 등 공인 급수로 보여 주는 어학 실력",
      "학생 성과를 끌어낸 상담과 피드백 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "HSK한국사무국 공식 사이트(HSK, HSKK, CTCSOL 시행)",
        "url": "https://www.hsk.or.kr/"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ]
  },
  "일본어 강사": {
    "does": [
      "학원, 교육기관에서 레벨별 일본어 수업 진행",
      "JLPT 등 어학시험 대비반 운영과 문제 풀이 지도",
      "교재 선정, 수업안 작성, 회화 연습 지도",
      "학생 진도 관리와 학습 상담"
    ],
    "skills": [
      "일본어 회화와 독해, 작문 능력",
      "문자와 어휘, 문법 지도",
      "일본어 교수법과 수업 설계",
      "학습자 수준 진단과 피드백",
      "일본 문화 이해"
    ],
    "certs": [
      {
        "name": "JLPT(일본어능력시험)",
        "issuer": "국제교류기금, 일본국제교육지원협회(JEES), 한국은 JLPT 한국 시행처",
        "type": "국제자격",
        "note": "자격이 아닌 어학시험. N1부터 N5"
      },
      {
        "name": "일본어교육능력검정시험(日本語教育能力検定試験)",
        "issuer": "일본국제교육지원협회(JEES)",
        "type": "민간자격",
        "note": "일본 민간 검정. 일본 내 등록일본어교원 국가자격(일본어교원시험)과는 별개"
      },
      {
        "name": "중등학교 정교사(2급) 일본어",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "학원 강사 필수 요건은 아님. 교직과정 이수자만 취득 가능"
      }
    ],
    "projectRole": [
      "일본어 학습 콘텐츠나 교재 제작 담당",
      "일본어 스터디 운영과 튜터링 담당",
      "일본 자료 번역과 발표 담당"
    ],
    "quant": [
      "JLPT N1 취득",
      "일본어 관련 전공 이수, 교직과정 이수 시 중등 일본어 정교사(2급)",
      "일본어교육능력검정시험 합격",
      "학원 강사 자격 기준(학원법 시행령 별표) 충족 여부 확인"
    ],
    "qual": [
      "일본어 튜터링, 교육봉사 경험",
      "수업 시연 영상이나 강의안 포트폴리오",
      "일본 어학연수, 교환학생 경험",
      "JLPT 대비 지도 사례 정리"
    ],
    "resumePoints": [
      "학습자 수준에 맞는 수업 설계와 운영 경험",
      "JLPT 등 공인 급수로 보여 주는 어학 실력",
      "학생 성과를 끌어낸 상담과 피드백 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "JLPT 한국 공식 사이트",
        "url": "https://www.jlpt.or.kr/"
      },
      {
        "label": "일본 문부과학성 일본어교육 안내(등록일본어교원 제도)",
        "url": "https://www.mext.go.jp/a_menu/nihongo_kyoiku/mext_00004.html"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ]
  },
  "국어 교사": {
    "does": [
      "중고등학교 국어 교과 수업 설계와 진행(화법, 독서, 문학, 문법, 작문)",
      "수행평가와 지필평가 출제, 채점, 성적 처리",
      "학급 담임 업무와 생활지도, 진로 상담",
      "학교 교육과정 운영과 교과 협의회 참여"
    ],
    "skills": [
      "국어학과 국문학 교과 지식",
      "교수학습 지도안 작성과 수업 실연",
      "평가 문항 개발과 피드백",
      "학생 생활지도와 상담",
      "학부모, 동료 교사와 소통"
    ],
    "certs": [
      {
        "name": "중등학교 정교사(2급) 국어",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "필수. 교직과정 설치 학과 입학자만 이수 가능"
      }
    ],
    "projectRole": [
      "글쓰기, 독서 멘토링 프로그램 기획 담당",
      "교재나 학습자료 제작 담당",
      "발표 원고와 보고서 편집 담당"
    ],
    "quant": [
      "중등 국어 정교사(2급): 전공 50학점 이상(기본이수 21학점, 교과교육 8학점 포함), 교직 22학점(교직이론 12, 교직소양 6, 교육실습 4), 전공 평균 75점, 교직 평균 80점 이상",
      "교직 적성 및 인성검사 적격 판정 2회 이상, 응급처치 및 심폐소생술 실습 2회 이상",
      "한국사능력검정시험 취득(임용 1차 한국사 대체, 등급 기준은 교육청 공고 확인)",
      "임용 1차 시험(교육학 논술 20점, 전공A 40점, 전공B 40점) 대비"
    ],
    "qual": [
      "학교 현장 교육실습",
      "학생 대상 교육봉사, 멘토링",
      "수업실연과 심층면접 연습",
      "독서, 글쓰기 지도 경험 정리"
    ],
    "resumePoints": [
      "교과 지식을 학생 수준에 맞게 풀어낸 수업 설계 경험",
      "학생 생활지도와 상담에서 보여 준 교직 태도",
      "동료와 협력해 교육 활동을 운영한 과정"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "경기도교육청 2027학년도 중등 임용시험 공고 보도자료",
        "url": "https://www.goe.go.kr/goe/na/ntt/selectNttInfo.do?nttSn=2375830"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ],
    "recruitNotes": [
      "공립 중등학교 교사 임용후보자 선정경쟁시험: 근거는 교육공무원법, 교육공무원임용령, 교육공무원 임용후보자 선정경쟁시험규칙. 시도교육청 시행, 한국교육과정평가원 출제",
      "1차: 교육학 논술형 1문항 20점(60분), 전공A 단답형 4문항과 서술형 8문항 40점(90분), 전공B 단답형 2문항과 서술형 9문항 40점(90분), 한국사는 한국사능력검정시험으로 대체",
      "1차 합격자는 선발 예정 인원의 1.5배수 선정(경기도교육청 2027학년도 공고 기준)",
      "2차: 교직적성 심층면접, 교수학습 지도안 작성, 수업실연(시도별, 과목별로 다름)"
    ]
  },
  "역사 교사": {
    "does": [
      "중고등학교 역사 교과 수업 설계와 진행(한국사, 동아시아사, 세계사)",
      "수행평가와 지필평가 출제, 채점, 성적 처리",
      "학급 담임 업무와 생활지도, 진로 상담",
      "답사, 체험학습 등 교과 연계 활동 기획"
    ],
    "skills": [
      "한국사, 세계사 교과 지식과 사료 해석",
      "교수학습 지도안 작성과 수업 실연",
      "평가 문항 개발과 피드백",
      "학생 생활지도와 상담",
      "학부모, 동료 교사와 소통"
    ],
    "certs": [
      {
        "name": "중등학교 정교사(2급) 역사",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "필수. 교직과정 설치 학과 입학자만 이수 가능"
      }
    ],
    "projectRole": [
      "역사 답사나 전시 해설 프로그램 기획 담당",
      "교재나 학습자료, 사료집 제작 담당",
      "발표 자료 조사와 정리 담당"
    ],
    "quant": [
      "중등 역사 정교사(2급): 전공 50학점 이상(기본이수 21학점, 교과교육 8학점 포함), 교직 22학점, 전공 평균 75점, 교직 평균 80점 이상",
      "교직 적성 및 인성검사 적격 판정 2회 이상, 응급처치 및 심폐소생술 실습 2회 이상",
      "한국사능력검정시험 취득(임용 1차 한국사 대체, 등급 기준은 교육청 공고 확인)",
      "임용 1차 시험(교육학 논술 20점, 전공A 40점, 전공B 40점) 대비"
    ],
    "qual": [
      "학교 현장 교육실습",
      "학생 대상 교육봉사, 멘토링",
      "수업실연과 심층면접 연습",
      "박물관, 유적지 교육 프로그램 참여 경험"
    ],
    "resumePoints": [
      "사료와 교과 지식을 학생 수준에 맞게 풀어낸 수업 설계 경험",
      "학생 생활지도와 상담에서 보여 준 교직 태도",
      "동료와 협력해 교육 활동을 운영한 과정"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "경기도교육청 2027학년도 중등 임용시험 공고 보도자료",
        "url": "https://www.goe.go.kr/goe/na/ntt/selectNttInfo.do?nttSn=2375830"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ],
    "recruitNotes": [
      "공립 중등학교 교사 임용후보자 선정경쟁시험: 시도교육청 시행, 한국교육과정평가원 출제",
      "1차: 교육학 논술형 1문항 20점(60분), 전공A 40점(90분), 전공B 40점(90분), 한국사는 한국사능력검정시험으로 대체",
      "1차 합격자는 선발 예정 인원의 1.5배수 선정(경기도교육청 2027학년도 공고 기준)",
      "2차: 교직적성 심층면접, 교수학습 지도안 작성, 수업실연(시도별, 과목별로 다름)"
    ]
  },
  "영어 교사": {
    "does": [
      "중고등학교 영어 교과 수업 설계와 진행(듣기, 말하기, 읽기, 쓰기)",
      "수행평가와 지필평가 출제, 채점, 성적 처리",
      "학급 담임 업무와 생활지도, 진로 상담",
      "원어민 보조교사 협력 수업과 영어 교과 활동 운영"
    ],
    "skills": [
      "영어 4기능과 영어학, 영문학 교과 지식",
      "교수학습 지도안 작성과 영어 수업 실연",
      "평가 문항 개발과 피드백",
      "학생 생활지도와 상담",
      "학부모, 동료 교사와 소통"
    ],
    "certs": [
      {
        "name": "중등학교 정교사(2급) 영어",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "필수. 교직과정 설치 학과 입학자만 이수 가능"
      }
    ],
    "projectRole": [
      "영어 멘토링, 교육봉사 프로그램 기획 담당",
      "영어 교재나 학습자료 제작 담당",
      "영어 발표와 통번역 담당"
    ],
    "quant": [
      "중등 영어 정교사(2급): 전공 50학점 이상(기본이수 21학점, 교과교육 8학점 포함), 교직 22학점, 전공 평균 75점, 교직 평균 80점 이상",
      "교직 적성 및 인성검사 적격 판정 2회 이상, 응급처치 및 심폐소생술 실습 2회 이상",
      "한국사능력검정시험 취득(임용 1차 한국사 대체, 등급 기준은 교육청 공고 확인)",
      "임용 1차 시험(교육학 논술 20점, 전공A 40점, 전공B 40점) 대비, 공인 영어시험 점수"
    ],
    "qual": [
      "학교 현장 교육실습",
      "학생 대상 영어 교육봉사, 멘토링",
      "영어 수업실연과 심층면접 연습",
      "어학연수, 교환학생 등 영어 사용 환경 경험"
    ],
    "resumePoints": [
      "영어 실력과 교과 지식을 학생 수준에 맞게 풀어낸 수업 설계 경험",
      "학생 생활지도와 상담에서 보여 준 교직 태도",
      "동료와 협력해 교육 활동을 운영한 과정"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "경기도교육청 2027학년도 중등 임용시험 공고 보도자료",
        "url": "https://www.goe.go.kr/goe/na/ntt/selectNttInfo.do?nttSn=2375830"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ],
    "recruitNotes": [
      "공립 중등학교 교사 임용후보자 선정경쟁시험: 시도교육청 시행, 한국교육과정평가원 출제",
      "1차: 교육학 논술형 1문항 20점(60분), 전공A 40점(90분), 전공B 40점(90분), 한국사는 한국사능력검정시험으로 대체",
      "1차 합격자는 선발 예정 인원의 1.5배수 선정(경기도교육청 2027학년도 공고 기준)",
      "2차: 교직적성 심층면접, 교수학습 지도안 작성, 수업실연(시도별, 과목별로 다름)"
    ]
  },
  "경제 연구원": {
    "does": [
      "경제 통계와 자료 수집, 정리, 데이터베이스 구축",
      "통계 프로그램으로 실증분석과 추정 보조",
      "정책 동향 조사와 연구보고서 초안 작성",
      "연구 책임자 보조와 세미나, 발표 자료 준비"
    ],
    "skills": [
      "미시경제학, 거시경제학, 계량경제학 이해",
      "통계 분석 도구 활용(STATA, R, Python 등)",
      "경제 통계 데이터 처리",
      "보고서 작성과 논리적 글쓰기",
      "영어 논문과 자료 독해"
    ],
    "certs": [
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "조사 설계와 통계 분석 역량 증빙용"
      },
      {
        "name": "데이터분석 준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격"
      }
    ],
    "projectRole": [
      "데이터 수집과 통계 분석 담당",
      "선행연구 조사와 보고서 집필 담당",
      "발표 자료와 그래프 제작 담당"
    ],
    "quant": [
      "경제학 전공 학점과 계량경제학, 통계학 과목 이수",
      "석사 이상 학위(연구기관 연구직 공고에서 석사 또는 박사 요구가 많음, 공고별 확인)",
      "공인 영어 성적(연구기관 공고에서 요구 시)",
      "사회조사분석사 2급, ADsP 등 분석 자격"
    ],
    "qual": [
      "경제 데이터 분석 프로젝트나 논문 경진대회 참여",
      "연구기관, 경제 관련 기관 인턴이나 연구보조(RA)",
      "경제 학회, 스터디에서 보고서를 작성한 경험",
      "통계 프로그램으로 실증분석을 끝까지 수행한 경험"
    ],
    "resumePoints": [
      "데이터를 모아 분석하고 결론을 보고서로 정리한 경험",
      "경제 이론을 현실 문제에 적용해 본 사례",
      "꼼꼼한 자료 검증과 성실한 연구 태도"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "Q-Net 국가기술자격(사회조사분석사)",
        "url": "https://www.q-net.or.kr/"
      },
      {
        "label": "한국데이터산업진흥원 데이터자격검정(ADsP)",
        "url": "https://www.dataq.or.kr/"
      }
    ]
  },
  "생물 교사": {
    "does": [
      "중고등학교 생명과학 교과 수업 설계와 진행",
      "실험 수업 준비, 실험실 안전 관리, 실험 기구 관리",
      "수행평가와 지필평가 출제, 채점, 성적 처리",
      "학급 담임 업무와 생활지도, 진로 상담"
    ],
    "skills": [
      "생명과학 교과 지식과 실험 설계",
      "교수학습 지도안 작성과 수업 실연",
      "실험실 안전 관리",
      "평가 문항 개발과 피드백",
      "학생 생활지도와 상담"
    ],
    "certs": [
      {
        "name": "중등학교 정교사(2급) 생물",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "필수. 교직과정 설치 학과 입학자만 이수 가능. 표시과목 명칭은 대학 교직과 확인"
      }
    ],
    "projectRole": [
      "실험 설계와 안전 관리 담당",
      "과학 교육봉사, 실험 캠프 기획 담당",
      "실험 결과 정리와 발표 자료 담당"
    ],
    "quant": [
      "중등 생물 정교사(2급): 전공 50학점 이상(기본이수 21학점, 교과교육 8학점 포함), 교직 22학점, 전공 평균 75점, 교직 평균 80점 이상",
      "교직 적성 및 인성검사 적격 판정 2회 이상, 응급처치 및 심폐소생술 실습 2회 이상",
      "한국사능력검정시험 취득(임용 1차 한국사 대체, 등급 기준은 교육청 공고 확인)",
      "임용 1차 시험(교육학 논술 20점, 전공A 40점, 전공B 40점) 대비"
    ],
    "qual": [
      "학교 현장 교육실습",
      "과학 교육봉사, 실험 멘토링",
      "수업실연과 심층면접 연습",
      "실험 수업 지도안과 실험 결과 포트폴리오"
    ],
    "resumePoints": [
      "실험과 탐구 중심으로 수업을 설계한 경험",
      "학생 안전과 생활지도에서 보여 준 교직 태도",
      "동료와 협력해 교육 활동을 운영한 과정"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "경기도교육청 2027학년도 중등 임용시험 공고 보도자료",
        "url": "https://www.goe.go.kr/goe/na/ntt/selectNttInfo.do?nttSn=2375830"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ],
    "recruitNotes": [
      "공립 중등학교 교사 임용후보자 선정경쟁시험: 시도교육청 시행, 한국교육과정평가원 출제",
      "1차: 교육학 논술형 1문항 20점(60분), 전공A 40점(90분), 전공B 40점(90분), 한국사는 한국사능력검정시험으로 대체",
      "1차 합격자는 선발 예정 인원의 1.5배수 선정(경기도교육청 2027학년도 공고 기준)",
      "2차: 교직적성 심층면접, 교수학습 지도안 작성, 수업능력 평가(수업실연, 실기와 실험 포함 가능, 시도별 상이)"
    ]
  },
  "수학 교사": {
    "does": [
      "중고등학교 수학 교과 수업 설계와 진행",
      "수준별 수업과 보충 지도, 학습 부진 학생 지원",
      "수행평가와 지필평가 출제, 채점, 성적 처리",
      "학급 담임 업무와 생활지도, 진로 상담"
    ],
    "skills": [
      "대수, 해석, 기하, 확률통계 교과 지식",
      "교수학습 지도안 작성과 수업 실연",
      "평가 문항 개발과 피드백",
      "공학 도구 활용 수업 설계",
      "학생 생활지도와 상담"
    ],
    "certs": [
      {
        "name": "중등학교 정교사(2급) 수학",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "필수. 교직과정 설치 학과 입학자만 이수 가능"
      }
    ],
    "projectRole": [
      "수학 멘토링, 교육봉사 프로그램 기획 담당",
      "문제집, 학습자료 제작 담당",
      "데이터 분석과 통계 처리 담당"
    ],
    "quant": [
      "중등 수학 정교사(2급): 전공 50학점 이상(기본이수 21학점, 교과교육 8학점 포함), 교직 22학점, 전공 평균 75점, 교직 평균 80점 이상",
      "교직 적성 및 인성검사 적격 판정 2회 이상, 응급처치 및 심폐소생술 실습 2회 이상",
      "한국사능력검정시험 취득(임용 1차 한국사 대체, 등급 기준은 교육청 공고 확인)",
      "임용 1차 시험(교육학 논술 20점, 전공A 40점, 전공B 40점) 대비"
    ],
    "qual": [
      "학교 현장 교육실습",
      "수학 교육봉사, 멘토링",
      "수업실연과 심층면접 연습",
      "공학 도구(기하 소프트웨어, 통계 도구) 활용 수업 자료"
    ],
    "resumePoints": [
      "수학 개념을 학생 수준에 맞게 풀어낸 수업 설계 경험",
      "학습 부진 학생을 끝까지 지도한 교직 태도",
      "동료와 협력해 교육 활동을 운영한 과정"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "한국교육과정평가원 중등교사 임용시험 안내",
        "url": "https://www.kice.re.kr/sub/info.do?m=010602&s=kice"
      },
      {
        "label": "경기도교육청 2027학년도 중등 임용시험 공고 보도자료",
        "url": "https://www.goe.go.kr/goe/na/ntt/selectNttInfo.do?nttSn=2375830"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ],
    "recruitNotes": [
      "공립 중등학교 교사 임용후보자 선정경쟁시험: 시도교육청 시행, 한국교육과정평가원 출제",
      "1차: 교육학 논술형 1문항 20점(60분), 전공A 40점(90분), 전공B 40점(90분), 한국사는 한국사능력검정시험으로 대체",
      "1차 합격자는 선발 예정 인원의 1.5배수 선정(경기도교육청 2027학년도 공고 기준)",
      "2차: 교직적성 심층면접, 교수학습 지도안 작성, 수업실연(시도별, 과목별로 다름)"
    ]
  },
  "상담 강사": {
    "does": [
      "학교, 청소년기관, 교육기관에서 심리교육과 집단상담 프로그램 진행",
      "접수상담과 개인상담 보조, 상담 기록 작성",
      "심리검사 실시와 결과 해석 보조",
      "부모교육, 또래상담 등 교육 프로그램 운영"
    ],
    "skills": [
      "상담이론과 발달심리 이해",
      "집단상담 운영",
      "심리측정과 평가 해석",
      "위기 상황 대응과 의뢰",
      "상담 윤리와 비밀 보장"
    ],
    "certs": [
      {
        "name": "청소년상담사 3급",
        "issuer": "여성가족부(한국산업인력공단 시험 시행)",
        "type": "국가전문자격",
        "note": "청소년기본법에 따른 국가자격, 필기와 면접 후 자격연수"
      },
      {
        "name": "임상심리사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "전문상담교사(2급)",
        "issuer": "교육부(대학의 무시험검정으로 취득)",
        "type": "국가전문자격",
        "note": "학교 전문상담교사 임용에 필요한 교원자격증, 교직과정 이수자만 취득 가능"
      }
    ],
    "projectRole": [
      "심리교육 프로그램 기획과 진행 담당",
      "설문과 심리검사 결과 분석 담당",
      "또래상담, 멘토링 운영 담당"
    ],
    "quant": [
      "청소년상담사 3급 취득(응시자격 학력 요건과 시험과목은 Q-Net 확인)",
      "상담심리 전공 학점 이수(상담이론, 발달심리, 심리측정 등)",
      "임상심리사 2급 필기와 실기 합격",
      "교직과정 이수 시 전문상담교사(2급)"
    ],
    "qual": [
      "청소년상담복지센터, Wee센터 등 상담기관 실습이나 자원봉사",
      "또래상담, 심리교육 프로그램 운영 경험",
      "상담 사례 기록과 수퍼비전 경험",
      "집단상담 프로그램을 직접 설계해 본 경험"
    ],
    "resumePoints": [
      "상담 이론을 실제 프로그램 운영에 적용한 경험",
      "내담자 보호와 비밀 보장 등 상담 윤리 태도",
      "위기 상황에서 침착하게 대응하고 연계한 사례"
    ],
    "ncs": "심리상담, 청소년상담복지",
    "sources": [
      {
        "label": "Q-Net 국가자격(청소년상담사, 임상심리사)",
        "url": "https://www.q-net.or.kr/"
      },
      {
        "label": "한국청소년상담복지개발원",
        "url": "https://www.kyci.or.kr/"
      },
      {
        "label": "서울대학교 교원자격 취득 안내(교원자격검정령 기준)",
        "url": "https://www.snu.ac.kr/academics/resources/enrollment/teacher"
      }
    ]
  },
  "반려동물 훈련·관리사": {
    "does": [
      "반려견 행동 분석과 평가, 기본 훈련 지도",
      "보호자 교육과 상담(문제행동 예방, 관리 방법 안내)",
      "훈련소, 유치원, 호텔 등에서 반려동물 관리와 위생 유지",
      "훈련 기록 작성과 보호자 피드백"
    ],
    "skills": [
      "반려동물 행동학과 훈련학 이해",
      "보호자 교육과 상담",
      "동물보호법 등 관련 법률과 직업윤리",
      "반려동물 관리와 건강 관찰",
      "안전 관리와 사고 예방"
    ],
    "certs": [
      {
        "name": "반려동물행동지도사 2급",
        "issuer": "농림축산식품부(농림수산식품교육문화정보원 시험 운영)",
        "type": "국가전문자격",
        "note": "2024년 도입 국가자격. 18세 이상 응시, 필기 5과목과 실기(본인 또는 직계가족 소유 반려견 동행)"
      },
      {
        "name": "반려동물행동지도사 1급",
        "issuer": "농림축산식품부(농림수산식품교육문화정보원 시험 운영)",
        "type": "국가전문자격",
        "note": "2급 취득 후 관련 분야 실무경력 3년 이상 또는 관련 분야 실무경력 10년 이상"
      }
    ],
    "projectRole": [
      "반려동물 행동 관찰과 기록 담당",
      "보호자 교육 자료와 안내문 제작 담당",
      "동물 복지 캠페인이나 봉사 활동 기획 담당"
    ],
    "quant": [
      "반려동물행동지도사 2급: 필기 5과목(반려동물 행동학, 관리학, 훈련학, 직업윤리 및 법률, 보호자 교육 및 상담) 평균 60점 이상, 과목별 40점 이상",
      "실기 60점 이상(2급은 기본 지도능력 10개 항목)",
      "반려동물학과 전공 과목 이수(행동학, 훈련학, 관리학)"
    ],
    "qual": [
      "유기동물 보호소, 동물병원, 훈련소 봉사나 실습",
      "본인 반려견과 기본 훈련을 꾸준히 기록한 경험",
      "보호자 대상 교육이나 상담을 해 본 경험",
      "반려동물 관련 공모전, 동아리 활동"
    ],
    "resumePoints": [
      "반려동물 행동을 관찰하고 분석해 훈련 계획을 세운 경험",
      "보호자와 소통하며 교육한 태도",
      "동물 복지와 안전을 우선한 판단 사례"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "농림축산식품부 제3회 반려동물행동지도사 자격시험 시행 공고",
        "url": "https://www.mafra.go.kr/bbs/home/792/578043/artclView.do"
      },
      {
        "label": "대한민국 정책브리핑 반려동물행동지도사 첫 국가자격시험 안내",
        "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148929570"
      },
      {
        "label": "반려동물행동지도사 자격정보시스템",
        "url": "https://apms.epis.or.kr/pet"
      }
    ]
  },
  "퍼스널 트레이너": {
    "does": [
      "회원 체력 측정과 상담, 목표 설정",
      "개인별 운동 프로그램 설계와 1:1 지도",
      "운동 자세 교정과 부상 예방 지도",
      "식단과 생활습관 상담, 회원 관리"
    ],
    "skills": [
      "운동생리학, 기능해부학, 트레이닝론 이해",
      "체력 평가와 운동처방",
      "운동 상해 예방과 응급처치",
      "회원 상담과 동기 부여",
      "스포츠 윤리와 안전 관리"
    ],
    "certs": [
      {
        "name": "2급 생활스포츠지도사(보디빌딩)",
        "issuer": "문화체육관광부(국민체육진흥공단 자격검정 시행)",
        "type": "국가전문자격",
        "note": "국민체육진흥법 제11조에 따른 체육지도자 자격. 필기(선택 5과목), 실기와 구술, 연수"
      },
      {
        "name": "건강운동관리사",
        "issuer": "문화체육관광부(국민체육진흥공단 자격검정 시행)",
        "type": "국가전문자격",
        "note": "필기 필수 8과목, 응시자격은 체육지도자 사이트 확인"
      },
      {
        "name": "NSCA-CPT(Certified Personal Trainer)",
        "issuer": "National Strength and Conditioning Association",
        "type": "국제자격"
      }
    ],
    "projectRole": [
      "운동 프로그램 설계와 시연 담당",
      "체력 측정과 데이터 기록 담당",
      "안전 관리와 응급처치 담당"
    ],
    "quant": [
      "2급 생활스포츠지도사(보디빌딩) 취득: 필기 선택 5과목, 실기와 구술, 연수",
      "건강운동관리사 취득(필기 필수 8과목)",
      "스포츠과학 전공 학점(운동생리학, 기능해부학, 운동처방론 등)",
      "응급처치와 심폐소생술 교육 이수"
    ],
    "qual": [
      "헬스장, 운동센터 실습이나 보조 트레이너 경험",
      "체력 측정과 운동처방 프로젝트",
      "본인 운동 기록과 대회 참가 경험",
      "운동 지도 영상이나 프로그램 포트폴리오"
    ],
    "resumePoints": [
      "회원 목표에 맞춰 운동 프로그램을 설계하고 성과를 낸 경험",
      "안전과 부상 예방을 우선한 지도 태도",
      "회원과 소통하며 동기를 유지시킨 사례"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "국민체육진흥공단 체육지도자 자격검정 및 연수 자격제도 안내",
        "url": "https://sqms.kspo.or.kr/info/licenseInfoPsc1.kspo"
      },
      {
        "label": "국민체육진흥공단 체육지도자 필기시험 과목 총괄표",
        "url": "https://sqms.kspo.or.kr/exam/wrTotal.kspo"
      },
      {
        "label": "국민체육진흥공단 체육지도자 자격등급별 연수기관",
        "url": "https://sqms.kspo.or.kr/info/gradeOrgInfo.kspo"
      }
    ]
  },
  "파크골프 지도자": {
    "does": [
      "공공, 민간 체육시설에서 파크골프 기본 동작과 응용 동작 지도",
      "회원 수준별 운동 프로그램 개발과 수업 운영",
      "준비운동, 안전 교육과 안전사고 발생 시 응급조치",
      "구장 예약, 용품 관리와 동호회 행사 지원"
    ],
    "skills": [
      "파크골프 기술과 규칙 이해",
      "가르치기와 학습전략",
      "기초체력과 신체 운동능력",
      "고객서비스와 상담",
      "안전관리와 응급처치"
    ],
    "certs": [
      {
        "name": "2급 생활스포츠지도사",
        "issuer": "국민체육진흥공단(문화체육관광부)",
        "type": "국가전문자격"
      },
      {
        "name": "노인스포츠지도사",
        "issuer": "국민체육진흥공단(문화체육관광부)",
        "type": "국가전문자격",
        "note": "노인 대상 생활체육 지도 자격, 파크골프 이용층과 맞닿음"
      }
    ],
    "projectRole": [
      "운동 프로그램 설계와 수업 진행 담당",
      "안전관리와 응급대응 매뉴얼 담당",
      "대회나 체험 행사 운영 담당"
    ],
    "quant": [
      "2급 생활스포츠지도사 필기(선택 5과목, 스포츠교육학, 스포츠심리학, 운동생리학 등 21개 중 선택)와 실기구술 합격 후 연수 이수",
      "응급처치 교육 이수 기록",
      "파크골프 대회 출전과 입상 기록"
    ],
    "qual": [
      "지역 파크골프장, 체육센터 보조강사나 아르바이트 경험",
      "노인복지관, 생활체육 동호회 지도 봉사",
      "체육 관련 학과 수업에서 지도안 작성과 시연 경험",
      "대회 운영 스태프 참여"
    ],
    "resumePoints": [
      "종목 기술을 대상자 수준에 맞게 가르친 경험",
      "안전사고 예방과 대처 경험",
      "회원과 신뢰를 쌓아 지속 참여를 이끈 서비스 태도"
    ],
    "ncs": "일반인스포츠지도",
    "sources": [
      {
        "label": "커리어넷 직업백과(스포츠강사)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=421"
      },
      {
        "label": "체육지도자 자격검정 및 연수(국민체육진흥공단) 자격제도안내",
        "url": "https://sqms.kspo.or.kr/info/licenseInfoPsc1.kspo"
      },
      {
        "label": "체육지도자 필기시험과목 총괄표",
        "url": "https://sqms.kspo.or.kr/exam/wrTotal.kspo"
      },
      {
        "label": "NCS 국가직무능력표준 분류(일반인스포츠지도 12040302)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "서예·미술 강사": {
    "does": [
      "문화센터, 학원, 학교 방과후 수업에서 서예와 미술 기초 지도",
      "수준별 수업 계획과 교재, 교구 준비",
      "작품 첨삭과 전시회, 공모전 출품 지도",
      "수강생 관리와 수업 홍보"
    ],
    "skills": [
      "서예와 회화 실기 능력",
      "예술시각능력과 창의력",
      "가르치기와 학습전략",
      "수업 설계와 교재 구성",
      "수강생 응대와 상담"
    ],
    "certs": [
      {
        "name": "중등학교 정교사(2급) 미술",
        "issuer": "교육부(교원자격검정령)",
        "type": "국가전문자격",
        "note": "사범계열 졸업이나 교직과정 이수로 취득, 학교 수업과 방과후 강사 채용에서 유리"
      },
      {
        "name": "문화예술교육사",
        "issuer": "문화체육관광부(한국문화예술교육진흥원)",
        "type": "국가전문자격",
        "note": "문화예술교육 지원법 근거 국가자격, 교육과정 이수 후 신청"
      }
    ],
    "projectRole": [
      "전시나 체험 부스에서 실기 시연과 지도 담당",
      "교안과 교재 제작 담당",
      "작품 기획과 전시 구성 담당"
    ],
    "quant": [
      "서예, 미술 공모전 입상 기록",
      "교직과정 이수와 교원자격 취득",
      "문화예술교육사 교육과정 이수",
      "개인전이나 단체전 참여 횟수"
    ],
    "qual": [
      "문화센터, 학원, 방과후학교 보조강사 경험",
      "복지관이나 지역 아동센터 미술 교육 봉사",
      "서예 전시 기획과 작품 출품 경험",
      "교육 실습과 수업 시연 경험"
    ],
    "resumePoints": [
      "작품 활동으로 보여 주는 실기 역량",
      "대상자 수준에 맞춰 가르친 교육 경험",
      "수강생과 관계를 이어 간 소통 태도"
    ],
    "ncs": "문화·예술기획",
    "sources": [
      {
        "label": "커리어넷 직업백과(서예가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1109"
      },
      {
        "label": "커리어넷 직업백과(스포츠강사)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=421"
      },
      {
        "label": "NCS 국가직무능력표준 분류(문화·예술기획 08010101)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "급식·외식 관리자": {
    "does": [
      "식단 작성, 검식과 배식 관리",
      "구매 식품 검수와 재고, 원가 관리",
      "급식시설 위생 관리와 종업원 위생 교육",
      "집단급식소 운영일지 작성, 매장 매출과 인력 관리"
    ],
    "skills": [
      "식품과 영양 지식",
      "위생과 안전 관리",
      "재정 관리와 원가 계산",
      "물적자원 관리와 품질관리 분석",
      "조리 종사자와 소통하는 대인관계능력"
    ],
    "certs": [
      {
        "name": "영양사",
        "issuer": "보건복지부(한국보건의료인국가시험원 시행)",
        "type": "면허",
        "note": "집단급식소 영양사 근무에 필수. 식품학 또는 영양학 전공과 관련 학점 이수 후 국가시험 합격"
      },
      {
        "name": "위생사",
        "issuer": "보건복지부(한국보건의료인국가시험원 시행)",
        "type": "면허"
      },
      {
        "name": "한식조리기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "식품산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "예산과 식재료 원가 관리 담당",
      "위생 점검표와 안전 매뉴얼 담당",
      "메뉴 기획과 행사 급식 운영 담당"
    ],
    "quant": [
      "영양사 국가시험 합격과 면허 취득",
      "위생사 면허나 조리기능사 취득",
      "식품위생 관련 교육 이수 기록",
      "HACCP 교육 이수 기록"
    ],
    "qual": [
      "학교, 병원, 산업체 급식소 실습과 인턴",
      "외식 매장 아르바이트에서 재고와 위생 관리 경험",
      "메뉴 개발 공모전이나 급식 개선 프로젝트",
      "영양 상담이나 식생활 교육 봉사"
    ],
    "resumePoints": [
      "식단과 급식 운영을 직접 관리한 경험",
      "위생과 안전 기준을 지키고 개선한 사례",
      "조리 인력과 협업하며 문제를 해결한 과정"
    ],
    "ncs": "외식운영관리, 식음료접객",
    "sources": [
      {
        "label": "커리어넷 직업백과(영양사)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=169"
      },
      {
        "label": "한국보건의료인국가시험원 영양사 시험정보",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2020/1/view.do?seq=7&itm_seq=07"
      },
      {
        "label": "NCS 국가직무능력표준 분류(외식운영관리 13010301)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "뷰티 MD": {
    "does": [
      "화장품 브랜드와 유통 채널의 상품 구색 기획과 발주",
      "매출, 재고 데이터 분석과 판매 전략 수립",
      "협력사 상담, 가격과 프로모션 협상",
      "매장이나 온라인몰 진열, 상품 상세 정보 관리"
    ],
    "skills": [
      "화장품 성분과 트렌드 이해",
      "영업과 마케팅 지식",
      "수리 논리력과 데이터 분석",
      "협상과 설득",
      "고객서비스와 소비자 행동 이해"
    ],
    "certs": [
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소(산업통상자원부)",
        "type": "국가전문자격",
        "note": "응시 제한 없음, 과목은 유통물류일반관리, 상권분석, 유통마케팅, 유통정보"
      },
      {
        "name": "맞춤형화장품조제관리사",
        "issuer": "식품의약품안전처",
        "type": "국가전문자격"
      }
    ],
    "projectRole": [
      "시장 조사와 상품 기획 담당",
      "매출과 재고 데이터 분석 담당",
      "판매 채널 운영과 프로모션 담당"
    ],
    "quant": [
      "유통관리사 2급 취득",
      "맞춤형화장품조제관리사 취득",
      "엑셀과 데이터 분석 자격(컴퓨터활용능력 등) 취득",
      "토익 등 공인 어학 점수(해외 브랜드 상담용)"
    ],
    "qual": [
      "화장품 매장이나 올리브영형 매장 판매 아르바이트",
      "뷰티 브랜드 서포터즈, 체험단 운영 경험",
      "화장품 상품 기획 공모전 참여",
      "소비자 조사나 트렌드 리포트 작성 경험"
    ],
    "resumePoints": [
      "시장과 소비자를 분석해 판매 전략으로 연결한 경험",
      "협력사나 고객과 협상하며 합의를 끌어낸 경험",
      "숫자를 근거로 상품 기획안을 설득한 과정"
    ],
    "ncs": "유통관리, 매장판매",
    "sources": [
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "대한상공회의소 자격평가사업단 유통관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=31&cd=0201"
      },
      {
        "label": "NCS 국가직무능력표준 분류(유통관리 02010304, 매장판매 10030201)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "승무원": {
    "does": [
      "탑승 전 비상장비, 기내시설, 기내용품, 의료장비, 청결 상태 점검",
      "승객 좌석 안내와 안전벨트, 휴대수하물 고정 확인",
      "이륙 후 식사, 음료 제공과 기내면세품 판매",
      "비상 상황 대처와 승객 안전 안내"
    ],
    "skills": [
      "외국어 능력",
      "위기 상황 대처 순발력",
      "봉사정신과 친절한 서비스 태도",
      "장시간 비행을 견디는 체력",
      "배려와 스트레스 감내, 자기통제"
    ],
    "certs": [],
    "projectRole": [
      "행사 안내와 고객 응대 담당",
      "안전 점검과 비상 대응 매뉴얼 담당",
      "외국인 참가자 통역과 의전 담당"
    ],
    "quant": [
      "토익, 토익스피킹 등 공인 영어 점수(항공사별 지원 기준 확인)",
      "제2외국어 점수(JLPT, HSK 등)",
      "수영 테스트 대비 수영 실력",
      "항공사 채용에서 요구하는 학력(전문대졸 이상 등) 충족"
    ],
    "qual": [
      "호텔, 외식, 항공 관련 서비스직 아르바이트와 인턴",
      "국제 행사 의전과 안내 봉사",
      "응급처치 교육 이수",
      "영어 회화 동아리나 교환학생 경험"
    ],
    "resumePoints": [
      "고객을 배려하며 서비스한 구체적 경험",
      "돌발 상황을 침착하게 처리한 사례",
      "팀 안에서 협력하고 규정을 지킨 태도"
    ],
    "ncs": "항공객실서비스",
    "sources": [
      {
        "label": "커리어넷 직업백과(비행기승무원, 항공기객실승무원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=418"
      },
      {
        "label": "NCS 국가직무능력표준 분류(항공객실서비스 12030105)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ],
    "recruitNotes": [
      "커리어넷 기준 국내 항공사는 서류전형, 면접, 인성적성검사, 신체검사, 수영테스트 등을 거쳐 인턴 과정 후 정규직 전환",
      "반드시 요구되는 국가자격증은 없음. 항공사마다 시력 등 신체 조건과 어학 기준이 다르므로 공고 원문 확인"
    ]
  },
  "호텔리어": {
    "does": [
      "프런트에서 체크인, 체크아웃과 객실 예약 처리",
      "투숙객 안내, 컨시어지 요청과 불편 사항 처리",
      "식음료, 룸서비스 등 호텔 서비스 수행",
      "객실 상태 점검과 부서 간 업무 연락"
    ],
    "skills": [
      "영어와 일본어 등 외국어 회화",
      "고객서비스와 서비스 지향",
      "대인관계능력과 봉사정신",
      "객실 관리와 예약 시스템 활용",
      "문제 해결과 행동조정"
    ],
    "certs": [
      {
        "name": "호텔서비스사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가전문자격",
        "note": "관광진흥법 근거, 신입 단계에서 응시 가능"
      },
      {
        "name": "호텔관리사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가전문자격",
        "note": "호텔서비스사나 조리사 취득 후 관광숙박업소 3년 이상 경력 필요"
      },
      {
        "name": "호텔경영사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가전문자격",
        "note": "호텔관리사 취득 후 관광호텔 3년 이상 경력 등 필요"
      }
    ],
    "projectRole": [
      "행사 접객과 의전 담당",
      "예약과 일정 조율 담당",
      "외국인 참가자 안내와 통역 담당"
    ],
    "quant": [
      "호텔서비스사 취득",
      "JLPT, JPT 등 일본어 공인 점수",
      "토익, 토익스피킹 등 영어 공인 점수",
      "서비스 관련 교육 이수 기록"
    ],
    "qual": [
      "호텔 인턴십이나 프런트, 식음료 아르바이트",
      "국제 행사와 관광 안내 봉사",
      "호텔 서비스 개선 아이디어 공모전 참여",
      "일본어 회화 동아리와 교환학생 경험"
    ],
    "resumePoints": [
      "고객 요구를 조율하고 처리한 서비스 경험",
      "외국어로 고객을 응대한 사례",
      "불편 사항을 끝까지 해결한 태도"
    ],
    "ncs": "접객서비스, 객실관리, 연회관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(호텔지배인)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=795"
      },
      {
        "label": "Q-Net 호텔관리사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=9663"
      },
      {
        "label": "Q-Net 호텔서비스사",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&jmCd=9665"
      },
      {
        "label": "NCS 국가직무능력표준 분류(접객서비스 12030205, 객실관리 12030202)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "유통 MD": {
    "does": [
      "담당 카테고리 상품 구색 기획과 발주, 재고 관리",
      "매출과 소비자 동향 분석, 판매 전략 수립",
      "협력사 상담과 가격, 납기, 프로모션 협상",
      "매장 진열과 행사 기획, 물류 일정 조율"
    ],
    "skills": [
      "유통과 물류 흐름 이해",
      "상권분석과 유통마케팅",
      "수리 논리력과 데이터 분석",
      "협상과 설득",
      "경제와 회계 기초"
    ],
    "certs": [
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소(산업통상자원부)",
        "type": "국가전문자격",
        "note": "응시 제한 없음, 과목은 유통물류일반관리, 상권분석, 유통마케팅, 유통정보"
      },
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격"
      },
      {
        "name": "전자상거래관리사 2급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "온라인 채널 MD 지원 시 유리"
      }
    ],
    "projectRole": [
      "시장 조사와 상품 기획 담당",
      "예산, 원가와 재고 관리 담당",
      "협력 업체 섭외와 협상 담당"
    ],
    "quant": [
      "유통관리사 2급 취득",
      "물류관리사 취득",
      "엑셀, 데이터 분석 자격 취득",
      "토익 등 공인 어학 점수"
    ],
    "qual": [
      "대형마트, 편의점, 온라인몰 판매와 발주 아르바이트",
      "유통 기업 인턴이나 서포터즈",
      "상품 기획 공모전과 창업 동아리 활동",
      "소비자 조사와 매출 데이터 분석 프로젝트"
    ],
    "resumePoints": [
      "시장 분석으로 상품 기획이나 판매 전략을 세운 경험",
      "협력사, 고객과 협상해 합의를 만든 경험",
      "숫자를 근거로 판단하고 설득한 과정"
    ],
    "ncs": "유통관리, 매장판매, 물류기획",
    "sources": [
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "대한상공회의소 자격평가사업단 유통관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=31&cd=0201"
      },
      {
        "label": "대한상공회의소 자격평가사업단 전자상거래관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=33&cd=0101"
      },
      {
        "label": "NCS 국가직무능력표준 분류(유통관리 02010304, 매장판매 10030201)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "패션 MD": {
    "does": [
      "시즌 트렌드와 판매 데이터 분석으로 상품 기획 보조",
      "디자인실, 생산처와 일정, 수량, 원가 조율",
      "매장과 온라인몰 상품 구성, 진열(VMD) 지원",
      "판매 추이 점검과 재고 소진, 할인 전략 보조"
    ],
    "skills": [
      "패션 트렌드와 소재 이해",
      "상품 기획과 머천다이징",
      "매출과 재고 데이터 분석",
      "생산처, 매장과 소통하는 협상력",
      "비주얼머천다이징 감각"
    ],
    "certs": [
      {
        "name": "패션머천다이징산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "관련 학과 졸업(예정)자 응시 가능, 세부 요건은 Q-Net 확인"
      },
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소(산업통상자원부)",
        "type": "국가전문자격"
      },
      {
        "name": "전자상거래관리사 2급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "온라인 패션몰 MD 지원 시 유리"
      }
    ],
    "projectRole": [
      "시장 조사와 상품 기획 담당",
      "원가, 일정 관리 담당",
      "룩북, 진열과 판매 채널 운영 담당"
    ],
    "quant": [
      "패션머천다이징산업기사 취득",
      "유통관리사 2급 취득",
      "엑셀과 데이터 분석 자격 취득",
      "토익 등 공인 어학 점수(해외 소싱 대비)"
    ],
    "qual": [
      "패션 브랜드 매장 판매와 재고 관리 아르바이트",
      "패션 기업 인턴, 서포터즈, 쇼룸 지원",
      "패션 상품 기획 공모전과 졸업 작품 상품화",
      "온라인 패션몰 운영이나 SNS 판매 경험"
    ],
    "resumePoints": [
      "트렌드와 판매 데이터를 근거로 상품을 기획한 경험",
      "디자인, 생산, 영업 부서 사이를 조율한 경험",
      "원가와 재고를 숫자로 관리한 과정"
    ],
    "ncs": "패션기획, 의류유통관리, 비주얼머천다이징",
    "sources": [
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "대한상공회의소 자격평가사업단 유통관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=31&cd=0201"
      },
      {
        "label": "NCS 국가직무능력표준 분류(패션기획 18020101, 의류유통관리 18020301)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "온라인 셀러·MD": {
    "does": [
      "온라인몰, 오픈마켓 상품 등록과 상세페이지 관리",
      "상품 소싱, 가격 책정과 재고, 배송 관리",
      "판매 데이터 분석과 광고, 프로모션 운영",
      "고객 문의와 반품 처리, 리뷰 관리"
    ],
    "skills": [
      "영업과 마케팅 지식",
      "전자상거래 플랫폼 운영",
      "데이터 분석과 전산 활용",
      "글쓰기와 상품 콘텐츠 제작",
      "고객 응대와 설득"
    ],
    "certs": [
      {
        "name": "전자상거래관리사 2급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시 제한 없음, 필기(전자상거래 기획, 운영 및 관리, 시스템 운영 및 관리, 관련 법규)와 실기"
      },
      {
        "name": "전자상거래운용사",
        "issuer": "대한상공회의소",
        "type": "국가기술자격"
      },
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소(산업통상자원부)",
        "type": "국가전문자격"
      }
    ],
    "projectRole": [
      "판매 채널 구축과 상품 등록 담당",
      "광고, SNS 마케팅과 성과 분석 담당",
      "수익 구조와 원가 계산 담당"
    ],
    "quant": [
      "전자상거래관리사 2급 취득",
      "유통관리사 2급 취득",
      "컴퓨터활용능력 등 전산 자격 취득",
      "실제 판매 매출과 전환율 기록"
    ],
    "qual": [
      "스마트스토어, 오픈마켓 직접 판매 경험",
      "창업 동아리와 창업 경진대회 참여",
      "온라인몰 운영 인턴이나 아르바이트",
      "상세페이지 제작과 광고 운영 프로젝트"
    ],
    "resumePoints": [
      "직접 판매하며 매출을 만든 구체적 과정",
      "데이터를 보고 가격, 광고, 상품을 바꾼 경험",
      "고객 문의와 문제를 끝까지 처리한 태도"
    ],
    "ncs": "전자상거래, 통신판매",
    "sources": [
      {
        "label": "커리어넷 직업백과(전자상거래전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=470"
      },
      {
        "label": "대한상공회의소 자격평가사업단 전자상거래관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=33&cd=0101"
      },
      {
        "label": "대한상공회의소 자격평가사업단 유통관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=31&cd=0201"
      },
      {
        "label": "NCS 국가직무능력표준 분류(전자상거래 10030102, 통신판매 10030101)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "펫 산업 MD": {
    "does": [
      "반려동물 사료, 용품 상품 구색 기획과 발주",
      "매출, 재고 데이터 분석과 판매 전략 수립",
      "협력사 상담과 가격, 프로모션 협상",
      "매장과 온라인몰 진열, 상품 정보 관리"
    ],
    "skills": [
      "반려동물 영양, 행동, 보건 기초 지식",
      "영업과 마케팅 지식",
      "데이터 분석과 재고 관리",
      "협상과 설득",
      "고객서비스와 상담"
    ],
    "certs": [
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소(산업통상자원부)",
        "type": "국가전문자격"
      },
      {
        "name": "반려동물행동지도사",
        "issuer": "농림축산식품부",
        "type": "국가전문자격"
      },
      {
        "name": "전자상거래관리사 2급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "온라인 펫용품몰 MD 지원 시 유리"
      }
    ],
    "projectRole": [
      "반려인 대상 시장 조사와 상품 기획 담당",
      "매출과 재고 데이터 분석 담당",
      "펫 박람회, 체험 행사 운영 담당"
    ],
    "quant": [
      "유통관리사 2급 취득",
      "반려동물행동지도사 등 반려동물 국가자격 취득",
      "엑셀과 데이터 분석 자격 취득",
      "토익 등 공인 어학 점수(수입 용품 상담 대비)"
    ],
    "qual": [
      "펫샵, 동물병원, 펫용품몰 판매와 재고 관리 아르바이트",
      "반려동물 기업 인턴이나 서포터즈",
      "유기동물 보호소 봉사로 쌓은 반려동물 이해",
      "펫용품 기획 공모전이나 창업 동아리 활동"
    ],
    "resumePoints": [
      "반려동물과 반려인을 이해하고 상품으로 연결한 경험",
      "시장과 판매 데이터를 근거로 기획한 경험",
      "협력사와 협상하고 고객 문의를 처리한 태도"
    ],
    "ncs": "유통관리, 매장판매, 반려동물행동교정",
    "sources": [
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "대한상공회의소 자격평가사업단 유통관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=31&cd=0201"
      },
      {
        "label": "NCS 국가직무능력표준 분류(유통관리 02010304, 반려동물행동교정 24020108)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "B2B 영업 담당자": {
    "does": [
      "기업 고객 발굴과 전화, 이메일, 방문 상담",
      "제품과 서비스 제안서, 견적서 작성",
      "계약 조건 협의와 계약 체결, 납품 일정 관리",
      "거래처 관리와 구매 후 문제 해결 지원"
    ],
    "skills": [
      "영업과 마케팅 지식",
      "사람 파악과 말하기",
      "설득과 협상",
      "경제와 회계 기초",
      "문제 해결과 서비스 지향"
    ],
    "certs": [
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소(산업통상자원부)",
        "type": "국가전문자격"
      },
      {
        "name": "전자상거래관리사 2급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "커리어넷 IT기술영업원 관련 자격"
      },
      {
        "name": "컴퓨터활용능력",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "제안서와 견적 작업용 사무 능력"
      }
    ],
    "projectRole": [
      "외부 기관 섭외와 협상 담당",
      "제안서, 발표 자료 작성과 발표 담당",
      "예산과 일정 관리 담당"
    ],
    "quant": [
      "유통관리사 2급 취득",
      "컴퓨터활용능력 취득",
      "토익, 토익스피킹 등 공인 어학 점수",
      "기업마다 학력 조건이 달라 지원 기업 채용 공고 기준 확인"
    ],
    "qual": [
      "영업, 판매 직무 인턴과 아르바이트",
      "공모전에서 후원 기업 섭외와 협상 경험",
      "창업 동아리에서 고객 발굴과 제안 경험",
      "발표와 토론 동아리로 쌓은 설득 경험"
    ],
    "resumePoints": [
      "고객을 설득해 계약이나 합의를 끌어낸 경험",
      "고객 문제를 끝까지 해결한 서비스 태도",
      "숫자와 근거로 제안한 과정"
    ],
    "ncs": "일반영업",
    "sources": [
      {
        "label": "커리어넷 직업백과(영업원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=928"
      },
      {
        "label": "커리어넷 직업백과(아이티(IT)기술영업원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=474"
      },
      {
        "label": "대한상공회의소 자격평가사업단 유통관리사",
        "url": "https://license.korcham.net/co/examguide.do?mm=31&cd=0201"
      },
      {
        "label": "NCS 국가직무능력표준 분류(일반영업 10010101)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "해외영업 담당자": {
    "does": [
      "해외 바이어 발굴과 이메일, 화상, 전시회 상담",
      "견적, 제안서 작성과 가격, 납기 협상",
      "수출 계약 체결과 선적, 결제 일정 관리",
      "해외 시장 조사와 국내외 법규, 절차 파악"
    ],
    "skills": [
      "영어 등 외국어 협상 능력",
      "영업과 마케팅 지식",
      "무역 실무와 수출입 절차 이해",
      "설득과 협상",
      "국제 감각과 대인관계능력"
    ],
    "certs": [
      {
        "name": "무역영어",
        "issuer": "대한상공회의소",
        "type": "국가공인 민간자격",
        "note": "산업통상부 제2025-1호 공인, 영문해석, 영작문, 무역실무 3과목"
      },
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격"
      },
      {
        "name": "국제무역사 1급",
        "issuer": "한국무역협회",
        "type": "민간자격"
      }
    ],
    "projectRole": [
      "해외 기관, 외국인 참가자 섭외와 통역 담당",
      "제안서, 발표 자료 영문 작성 담당",
      "협상과 계약 조건 조율 담당"
    ],
    "quant": [
      "토익, 토익스피킹, OPIc 등 공인 영어 점수",
      "무역영어 1급 또는 2급 취득",
      "물류관리사, 국제무역사 취득",
      "제2외국어 공인 점수"
    ],
    "qual": [
      "무역회사, 수출 기업 인턴과 해외 전시회 지원",
      "교환학생, 해외 봉사 등 해외 경험",
      "영어 발표, 토론 동아리 활동",
      "모의 무역 대회나 수출 기획 공모전 참여"
    ],
    "resumePoints": [
      "외국어로 상대를 설득하고 협상한 경험",
      "무역 절차와 서류를 다뤄 본 경험",
      "해외 경험에서 얻은 국제 감각과 적응력"
    ],
    "ncs": "해외영업, 수출입관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(영업원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=928"
      },
      {
        "label": "커리어넷 직업백과(국제무역사무원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=208"
      },
      {
        "label": "대한상공회의소 자격평가사업단 무역영어",
        "url": "https://license.korcham.net/co/examguide.do?mm=51&cd=0301"
      },
      {
        "label": "NCS 국가직무능력표준 분류(해외영업 10010102, 수출입관리 02040302)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "무역사무 담당자": {
    "does": [
      "수출입 거래 자료 정리와 계약서 서식 작성",
      "수출입허가서, 신용장 등 세관 신고 서류 작성과 통관 진행",
      "선적, 운송, 보험 일정 관리와 거래처 연락",
      "외국환 결제 처리와 대금 회수 관리"
    ],
    "skills": [
      "무역 계약, 결제, 법규 지식",
      "영어 무역 서류 작성",
      "꼼꼼한 사무 처리와 컴퓨터 활용",
      "논리적 의사소통",
      "해외영업원, 바이어와 협업하는 대인관계능력"
    ],
    "certs": [
      {
        "name": "무역영어",
        "issuer": "대한상공회의소",
        "type": "국가공인 민간자격",
        "note": "영문해석, 영작문, 무역실무 3과목, 응시 제한 없음"
      },
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격"
      },
      {
        "name": "국제무역사 1급",
        "issuer": "한국무역협회",
        "type": "민간자격"
      },
      {
        "name": "컴퓨터활용능력",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "커리어넷이 컴퓨터 활용 자격 보유를 유리하다고 안내"
      }
    ],
    "projectRole": [
      "문서와 계약서 작성, 서류 관리 담당",
      "예산 집행과 정산 담당",
      "일정 관리와 외부 기관 연락 담당"
    ],
    "quant": [
      "무역영어 취득",
      "토익 등 공인 영어 점수",
      "물류관리사, 국제무역사 취득",
      "컴퓨터활용능력 취득"
    ],
    "qual": [
      "무역회사, 포워더, 관세사무소 인턴과 아르바이트",
      "한국무역협회 등 무역 실무 교육 이수",
      "수출입 서류 작성 실습 프로젝트",
      "영어 문서 작성 동아리나 교환학생 경험"
    ],
    "resumePoints": [
      "무역 서류와 절차를 정확하게 처리한 경험",
      "영어로 문서를 작성하고 소통한 경험",
      "여러 거래처와 일정을 조율한 꼼꼼함"
    ],
    "ncs": "수출입관리, 원산지관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(국제무역사무원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=208"
      },
      {
        "label": "대한상공회의소 자격평가사업단 무역영어",
        "url": "https://license.korcham.net/co/examguide.do?mm=51&cd=0301"
      },
      {
        "label": "NCS 국가직무능력표준 분류(수출입관리 02040302, 원산지관리 02040303)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "해외영업 담당자(중화권)": {
    "does": [
      "중국, 대만, 홍콩 바이어 발굴과 중국어 상담",
      "견적, 제안서 작성과 가격, 납기 협상",
      "수출 계약 체결과 선적, 결제 일정 관리",
      "중화권 시장 조사와 현지 법규, 유통 구조 파악"
    ],
    "skills": [
      "중국어 비즈니스 회화와 문서 작성",
      "영업과 마케팅 지식",
      "무역 실무와 수출입 절차 이해",
      "설득과 협상",
      "중화권 문화 이해와 국제 감각"
    ],
    "certs": [
      {
        "name": "무역영어",
        "issuer": "대한상공회의소",
        "type": "국가공인 민간자격",
        "note": "영문 무역 서류 능력 증명, 중화권 거래도 계약서는 영문이 많음"
      },
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격"
      },
      {
        "name": "국제무역사 1급",
        "issuer": "한국무역협회",
        "type": "민간자격"
      }
    ],
    "projectRole": [
      "중국어 통역과 중화권 기관 섭외 담당",
      "제안서, 발표 자료 중국어 작성 담당",
      "협상과 계약 조건 조율 담당"
    ],
    "quant": [
      "HSK, TSC 등 중국어 공인 점수",
      "토익 등 영어 공인 점수",
      "무역영어, 물류관리사, 국제무역사 취득",
      "중국어 비즈니스 문서 작성 교육 이수"
    ],
    "qual": [
      "중국 교환학생, 어학연수 등 현지 경험",
      "중화권 바이어 상담회, 전시회 통역 지원",
      "무역회사나 중국 진출 기업 인턴",
      "중국어 발표, 토론 동아리 활동"
    ],
    "resumePoints": [
      "중국어로 상대를 설득하고 협상한 경험",
      "무역 절차와 서류를 다뤄 본 경험",
      "현지 경험에서 얻은 문화 이해와 적응력"
    ],
    "ncs": "해외영업, 수출입관리",
    "sources": [
      {
        "label": "커리어넷 직업백과(영업원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=928"
      },
      {
        "label": "커리어넷 직업백과(국제무역사무원)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=208"
      },
      {
        "label": "대한상공회의소 자격평가사업단 무역영어",
        "url": "https://license.korcham.net/co/examguide.do?mm=51&cd=0301"
      },
      {
        "label": "NCS 국가직무능력표준 분류(해외영업 10010102, 수출입관리 02040302)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      }
    ]
  },
  "무역·물류 담당자": {
    "does": [
      "수출입 계약 조건에 맞춘 선적 서류(인보이스, 패킹리스트, B/L) 작성과 검토",
      "포워더, 관세사와 연락하며 운송 수배와 통관 진행 상황 확인",
      "신용장, 송금 등 무역 결제 서류 확인과 입금 관리",
      "해외 거래처와 영문 이메일로 납기, 수량, 가격 조율"
    ],
    "skills": [
      "무역 계약과 인코텀즈 이해",
      "수출입 통관 절차와 관세 지식",
      "선적 서류 작성과 무역 결제 실무",
      "비즈니스 외국어(영어, 중국어) 서신",
      "엑셀과 ERP를 이용한 주문, 재고 관리",
      "거래처 소통과 일정 조율"
    ],
    "certs": [
      {
        "name": "국제무역사 1급",
        "issuer": "한국무역협회",
        "type": "민간자격",
        "note": "등록 민간자격(2008-0013), 국가공인 아님. 응시 제한 없음, 과목은 무역규범, 무역결제, 무역계약, 무역영어"
      },
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격"
      },
      {
        "name": "관세사",
        "issuer": "한국산업인력공단(관세청)",
        "type": "국가전문자격",
        "note": "통관 전문 자격, 취득 난도가 높아 장기 목표로"
      }
    ],
    "projectRole": [
      "해외 거래처 조사와 영문 제안서 작성 담당",
      "원가, 운임 계산과 견적 산출 담당",
      "일정과 납기 관리 담당"
    ],
    "quant": [
      "국제무역사 1급 취득",
      "물류관리사 취득",
      "영어 공인 성적(TOEIC, TOEIC Speaking) 또는 중국어 HSK 성적 확보",
      "컴퓨터활용능력, 엑셀 실무 능력"
    ],
    "qual": [
      "무역 실무 시뮬레이션이나 수출 지원 사업 참여 경험",
      "해외 교환학생, 어학연수 등 외국어 실사용 경험",
      "무역회사, 포워더, 관세사무소 인턴이나 아르바이트",
      "KITA 무역아카데미 등 무역 실무 교육 수료"
    ],
    "resumePoints": [
      "외국어로 거래처와 소통하며 문제를 해결한 구체적 사례",
      "서류 작성과 일정 관리에서 꼼꼼함을 보여 준 경험",
      "무역 절차(계약, 운송, 통관, 결제)를 이해하고 있음을 드러내는 학습, 자격 준비 과정"
    ],
    "ncs": "수출입관리, 물류관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 생산·품질관리 > 무역·유통관리 > 수출입관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "한국무역협회 무역아카데미 국제무역사 1급 시험 안내",
        "url": "https://newtradecampus.kita.net/page/user_certificate_exam1"
      },
      {
        "label": "Q-Net 물류관리사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=61"
      },
      {
        "label": "Q-Net 관세사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=24"
      }
    ]
  },
  "해외영업 담당자(일본)": {
    "does": [
      "일본 거래처 대상 견적서, 제안서 작성과 일본어 이메일, 전화 응대",
      "주문 접수부터 출하, 납품까지 진행 상황 관리",
      "전시회, 출장 때 바이어 미팅 지원과 상담 기록 정리",
      "매출, 수주 실적 집계와 영업 보고서 작성"
    ],
    "skills": [
      "비즈니스 일본어(경어, 상담 메일) 구사",
      "제품 지식과 시장 조사",
      "수출입 절차와 무역 결제 이해",
      "협상과 관계 관리",
      "엑셀을 이용한 실적 관리와 보고"
    ],
    "certs": [
      {
        "name": "JLPT N1",
        "issuer": "일본국제교류기금, 일본국제교육지원협회",
        "type": "국제자격",
        "note": "일본어 능력 증빙으로 채용 공고에서 자주 요구"
      },
      {
        "name": "국제무역사 1급",
        "issuer": "한국무역협회",
        "type": "민간자격",
        "note": "등록 민간자격, 국가공인 아님"
      },
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격"
      }
    ],
    "projectRole": [
      "일본 시장 조사와 경쟁사 분석 담당",
      "일본어 제안서, 발표 자료 작성 담당",
      "거래처 역할의 모의 협상 진행 담당"
    ],
    "quant": [
      "JLPT N1 또는 JPT 고득점",
      "영어 공인 성적(TOEIC) 추가 확보",
      "국제무역사 1급 취득",
      "컴퓨터활용능력, 엑셀 실무 능력"
    ],
    "qual": [
      "일본 교환학생, 워킹홀리데이, 어학연수 경험",
      "일본 기업 대상 인턴이나 통역, 전시회 지원 경험",
      "무역 실무 교육 수료와 모의 수출 프로젝트",
      "영업, 판매 아르바이트에서 고객 응대 경험"
    ],
    "resumePoints": [
      "일본어로 실제 업무나 협상을 해 본 구체적 경험",
      "목표를 세우고 설득해 성과를 낸 경험(판매, 섭외, 공모전)",
      "거절이나 갈등 상황에서 끈기 있게 관계를 이어간 사례"
    ],
    "ncs": "수출입관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 생산·품질관리 > 무역·유통관리 > 수출입관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "한국무역협회 무역아카데미 국제무역사 1급 시험 안내",
        "url": "https://newtradecampus.kita.net/page/user_certificate_exam1"
      },
      {
        "label": "JLPT 공식 사이트",
        "url": "https://www.jlpt.jp/"
      },
      {
        "label": "Q-Net 물류관리사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=61"
      }
    ]
  },
  "물류관리 전문가": {
    "does": [
      "입출고, 재고 현황 집계와 창고관리시스템(WMS) 데이터 관리",
      "운송사 배차 요청과 배송 일정, 운임 확인",
      "재고 실사와 오차 원인 분석",
      "물류비, 납기 준수율 등 지표 정리와 보고"
    ],
    "skills": [
      "운송, 보관, 하역 등 물류 기능 이해",
      "재고 관리와 수요 예측 기초",
      "WMS, TMS, ERP 등 물류 정보시스템 활용",
      "엑셀 기반 데이터 집계와 분석",
      "물류 관련 법규 이해",
      "현장과 협력사 소통"
    ],
    "certs": [
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격",
        "note": "물류 직무 대표 자격, 공공기관 물류 직렬 공고에서 우대 자격으로 자주 제시"
      },
      {
        "name": "국제무역사 1급",
        "issuer": "한국무역협회",
        "type": "민간자격",
        "note": "등록 민간자격, 국가공인 아님"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호, 응시 제한 없음"
      }
    ],
    "projectRole": [
      "재고, 배송 데이터 수집과 분석 담당",
      "공정이나 동선 개선안 설계 담당",
      "일정과 자원 배분 관리 담당"
    ],
    "quant": [
      "물류관리사 취득",
      "데이터분석준전문가(ADsP) 또는 컴퓨터활용능력 취득",
      "영어 공인 성적(TOEIC) 확보",
      "물류, 유통 관련 전공 과목 이수"
    ],
    "qual": [
      "물류센터, 운송사, 유통사 현장 인턴이나 아르바이트",
      "재고나 배송 데이터를 분석해 개선안을 낸 팀 프로젝트",
      "물류 공모전(물류산업 아이디어 공모 등) 참가",
      "SCM, 물류 관련 학회나 동아리 활동"
    ],
    "resumePoints": [
      "데이터를 근거로 비용이나 시간을 줄인 개선 경험",
      "현장 사람들과 협력해 문제를 해결한 경험",
      "물류 흐름(조달, 운송, 보관, 배송)을 이해하고 있음을 보여 주는 학습과 자격 준비"
    ],
    "ncs": "물류관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 생산·품질관리 > 무역·유통관리 > 물류관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "Q-Net 물류관리사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=61"
      },
      {
        "label": "Q-Net 물류관리사 시험정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=61&gbnn=gbnSubtab1"
      },
      {
        "label": "한국데이터산업진흥원 데이터분석준전문가",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      }
    ]
  },
  "해외영업·무역 담당자": {
    "does": [
      "해외 바이어 발굴을 위한 시장 조사와 영문 제안서 작성",
      "견적, 계약 조건 협의와 주문 접수, 납기 관리",
      "선적 서류 준비와 포워더, 관세사 연락으로 수출 진행",
      "전시회, 화상 미팅 준비와 상담 결과 정리"
    ],
    "skills": [
      "비즈니스 영어 서신과 회화",
      "무역 계약, 인코텀즈, 결제 조건 이해",
      "수출입 통관과 운송 절차 지식",
      "시장 조사와 제품 설명 능력",
      "협상과 거래처 관리",
      "엑셀 기반 실적 관리"
    ],
    "certs": [
      {
        "name": "국제무역사 1급",
        "issuer": "한국무역협회",
        "type": "민간자격",
        "note": "등록 민간자격(2008-0013), 국가공인 아님"
      },
      {
        "name": "물류관리사",
        "issuer": "한국산업인력공단(국토교통부)",
        "type": "국가전문자격"
      },
      {
        "name": "관세사",
        "issuer": "한국산업인력공단(관세청)",
        "type": "국가전문자격",
        "note": "장기 목표용 전문 자격"
      }
    ],
    "projectRole": [
      "해외 시장 조사와 타깃 국가 분석 담당",
      "영문 제안서, 발표 자료 작성 담당",
      "모의 수출 프로젝트의 계약, 운송 일정 관리 담당"
    ],
    "quant": [
      "영어 공인 성적(TOEIC, TOEIC Speaking, OPIc) 확보",
      "국제무역사 1급 취득",
      "물류관리사 취득",
      "제2외국어 공인 성적(HSK, JLPT 등) 추가"
    ],
    "qual": [
      "해외 교환학생, 어학연수, 해외 봉사 경험",
      "수출 기업, 무역협회, KOTRA 관련 인턴이나 지원 사업 참여",
      "무역 실무 교육 수료와 모의 무역 경진대회 참가",
      "영업이나 고객 응대 경험"
    ],
    "resumePoints": [
      "외국어로 실제 거래나 협상을 해 본 구체적 경험",
      "목표 수치를 정하고 설득해 성과를 낸 경험",
      "무역 절차를 이해하고 서류를 정확히 다룬 경험"
    ],
    "ncs": "수출입관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 생산·품질관리 > 무역·유통관리 > 수출입관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "한국무역협회 무역아카데미 국제무역사 1급 시험 안내",
        "url": "https://newtradecampus.kita.net/page/user_certificate_exam1"
      },
      {
        "label": "Q-Net 물류관리사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=61"
      },
      {
        "label": "Q-Net 관세사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=24"
      }
    ]
  },
  "영업관리 담당자": {
    "does": [
      "영업 실적, 매출, 채권 현황 집계와 주간, 월간 보고서 작성",
      "거래처별 주문, 출고, 반품 처리와 영업사원 지원",
      "판촉 행사와 가격 정책 실행 지원",
      "거래처 방문과 상담 기록 관리, 고객 불만 처리"
    ],
    "skills": [
      "매출, 수익 지표 이해와 데이터 집계",
      "거래처 관계 관리와 협상",
      "유통 채널과 시장 구조 이해",
      "엑셀, ERP, CRM 활용",
      "보고서 작성과 발표",
      "설득과 소통"
    ],
    "certs": [
      {
        "name": "경영지도사(마케팅)",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "지도분야 인적자원관리, 재무관리, 생산관리, 마케팅 중 택일"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호"
      },
      {
        "name": "유통관리사 2급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "판매 전략과 타깃 고객 설정 담당",
      "매출, 고객 데이터 분석 담당",
      "협찬, 섭외 등 대외 교섭 담당"
    ],
    "quant": [
      "유통관리사 2급 취득",
      "데이터분석준전문가(ADsP) 또는 컴퓨터활용능력 취득",
      "영어 공인 성적(TOEIC) 확보",
      "경영, 마케팅 관련 전공 과목 이수"
    ],
    "qual": [
      "판매, 영업 아르바이트나 인턴에서 실적을 낸 경험",
      "마케팅, 창업 공모전 참가",
      "동아리나 학회에서 섭외, 협찬 교섭 경험",
      "고객 설문이나 매출 데이터를 분석한 프로젝트"
    ],
    "resumePoints": [
      "목표를 세우고 설득해 성과를 낸 구체적 경험",
      "거절이나 갈등을 관계 유지로 풀어낸 사례",
      "데이터로 현황을 파악하고 개선안을 낸 경험"
    ],
    "ncs": "일반영업",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(영업판매 대분류)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "Q-Net 경영지도사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=49"
      },
      {
        "label": "한국데이터산업진흥원 데이터분석준전문가",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      },
      {
        "label": "대한상공회의소 자격평가사업단",
        "url": "https://license.korcham.net/"
      }
    ]
  },
  "병원 행정·원무 담당자": {
    "does": [
      "외래 접수, 입퇴원 수속과 진료비 수납, 영수증 발급",
      "건강보험 자격 확인과 진료비 계산, 심사청구 자료 준비",
      "진단서 등 증명서 발급과 환자 안내, 민원 응대",
      "병원 총무, 구매, 인사 업무 보조"
    ],
    "skills": [
      "국민건강보험 제도와 수가 체계 이해",
      "의료법, 의료 관련 법규 기초",
      "병원정보시스템(OCS, EMR) 사용",
      "환자 응대와 민원 처리",
      "엑셀 기반 통계와 문서 작성",
      "정확성과 개인정보 보호 의식"
    ],
    "certs": [
      {
        "name": "병원행정사",
        "issuer": "대한병원행정관리자협회",
        "type": "국가공인 민간자격",
        "note": "민간자격정보서비스 기준 공인, 등록번호 2008-0033"
      },
      {
        "name": "보건의료정보관리사",
        "issuer": "한국보건의료인국가시험원(보건복지부)",
        "type": "면허"
      },
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "예산과 일정 관리 담당",
      "설문, 통계 자료 정리와 보고서 작성 담당",
      "행사 접수, 안내 등 운영 지원 담당"
    ],
    "quant": [
      "병원행정사 취득",
      "보건의료정보관리사 국가시험 응시 자격(인증 학과) 확인 후 준비",
      "컴퓨터활용능력, 엑셀 실무 능력",
      "건강보험, 의료법 관련 전공 과목 이수"
    ],
    "qual": [
      "병원 원무과, 보험심사팀 실습이나 인턴",
      "병원이나 보건소 봉사로 환자 응대 경험",
      "의료기관 서비스 개선 아이디어 공모전 참가",
      "병원 행정 관련 학회나 동아리 활동"
    ],
    "resumePoints": [
      "환자, 고객을 응대하며 민원을 해결한 경험",
      "규정과 절차를 정확히 지키며 서류를 처리한 경험",
      "건강보험 제도와 병원 운영 구조에 대한 이해"
    ],
    "ncs": "병원행정",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(보건·의료 > 보건 > 보건지원 > 병원행정)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "민간자격정보서비스 병원행정사 검색",
        "url": "https://www.pqi.or.kr/inf/qul/infQulList.do?searchQulNm=%EB%B3%91%EC%9B%90%ED%96%89%EC%A0%95%EC%82%AC"
      },
      {
        "label": "한국보건의료인국가시험원 보건의료정보관리사",
        "url": "https://www.kuksiwon.or.kr/subcnt/c_2018/1/view.do?seq=7&itm_seq=14"
      }
    ]
  },
  "의료기관 기획 담당자": {
    "does": [
      "진료 실적, 병상 가동률 등 경영 지표 집계와 보고서 작성",
      "병원 사업계획, 예산 편성 자료 준비",
      "의료기관 인증평가, 적정성 평가 대응 자료 정리",
      "신규 센터 개설이나 수가 정책 변화에 따른 영향 분석 보조"
    ],
    "skills": [
      "병원 경영 지표와 재무제표 이해",
      "건강보험 수가와 보건의료 정책 이해",
      "엑셀, 통계 도구를 이용한 데이터 분석",
      "보고서와 발표 자료 작성",
      "부서 간 협업과 조정",
      "의료기관 인증 기준 이해"
    ],
    "certs": [
      {
        "name": "병원행정사",
        "issuer": "대한병원행정관리자협회",
        "type": "국가공인 민간자격",
        "note": "민간자격정보서비스 기준 공인, 등록번호 2008-0033"
      },
      {
        "name": "보건의료정보관리사",
        "issuer": "한국보건의료인국가시험원(보건복지부)",
        "type": "면허"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호"
      }
    ],
    "projectRole": [
      "자료 조사와 데이터 분석 담당",
      "기획서, 발표 자료 작성 담당",
      "예산과 일정 관리 담당"
    ],
    "quant": [
      "병원행정사 취득",
      "데이터분석준전문가(ADsP) 또는 컴퓨터활용능력 취득",
      "영어 공인 성적(TOEIC) 확보",
      "보건의료정책, 병원경영 관련 전공 과목 이수"
    ],
    "qual": [
      "병원 기획실, 경영지원 부서 실습이나 인턴",
      "의료기관 경영 사례 분석 팀 프로젝트",
      "보건의료 정책 공모전이나 학술대회 참가",
      "병원 데이터를 다룬 분석 과제"
    ],
    "resumePoints": [
      "데이터를 근거로 문제를 정의하고 대안을 제시한 경험",
      "여러 이해관계자와 조율해 과제를 마무리한 경험",
      "보건의료 제도와 병원 운영 구조에 대한 이해"
    ],
    "ncs": "병원행정, 경영기획",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(보건·의료 > 보건 > 보건지원 > 병원행정, 경영·회계·사무 > 기획사무 > 경영기획)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "민간자격정보서비스 병원행정사 검색",
        "url": "https://www.pqi.or.kr/inf/qul/infQulList.do?searchQulNm=%EB%B3%91%EC%9B%90%ED%96%89%EC%A0%95%EC%82%AC"
      },
      {
        "label": "한국데이터산업진흥원 데이터분석준전문가",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      }
    ]
  },
  "기업 산업보안 담당자": {
    "does": [
      "출입 통제, CCTV, 반출입 관리 등 물리보안 운영과 점검",
      "임직원 보안 교육과 보안 서약, 비밀 관리 절차 운영",
      "영업비밀, 산업기술 자료 등급 분류와 반출 승인 관리",
      "보안 점검, 사고 조사와 결과 보고서 작성"
    ],
    "skills": [
      "산업기술보호법, 부정경쟁방지법 등 관련 법규 이해",
      "물리보안과 관리적 보안 체계 이해",
      "정보보안 기초(접근 통제, 매체 관리)",
      "보안 사고 조사와 보고서 작성",
      "규정 준수 의식과 비밀 유지",
      "임직원 교육과 소통"
    ],
    "certs": [
      {
        "name": "산업보안관리사",
        "issuer": "한국산업기술보호협회",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 공인 제2021-02호, 응시 제한 없음, 과목은 관리적보안, 물리적보안, 기술적보안, 보안사고대응, 보안지식경영"
      },
      {
        "name": "개인정보관리사(CPPG)",
        "issuer": "한국CPO포럼",
        "type": "민간자격"
      },
      {
        "name": "정보보안기사",
        "issuer": "한국방송통신전파진흥원",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "보안 정책과 규정 초안 작성 담당",
      "위험 요소 점검과 체크리스트 설계 담당",
      "사고 시나리오 분석과 대응 절차 정리 담당"
    ],
    "quant": [
      "산업보안관리사 취득",
      "정보보안기사 또는 개인정보관리사(CPPG) 취득",
      "영어 공인 성적(TOEIC) 확보",
      "산업보안, 정보보호, 형사법 관련 전공 과목 이수"
    ],
    "qual": [
      "보안 관련 공모전(산업보안 논문, 아이디어 공모 등) 참가",
      "기업 보안팀, 경비업체, 공공기관 보안 부서 인턴",
      "보안 동아리에서 모의 점검, 교육 자료 제작 경험",
      "경찰학, 범죄학 지식을 기업 보안 사례에 적용한 과제"
    ],
    "resumePoints": [
      "규정을 지키며 책임감 있게 임무를 수행한 경험",
      "위험을 미리 찾아내고 예방 조치를 제안한 사례",
      "산업기술보호 제도와 보안 체계에 대한 이해"
    ],
    "ncs": "총무",
    "sources": [
      {
        "label": "한국산업기술보호협회 산업보안관리사 자격제도",
        "url": "https://www.kaits.or.kr/web/content.do?menu_cd=000053"
      },
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 총무·인사 > 총무)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "개인정보관리사(CPPG) 시험 사이트",
        "url": "https://www.cpptest.or.kr/"
      }
    ]
  },
  "법무·컴플라이언스 담당자": {
    "does": [
      "계약서 초안 검토와 법적 쟁점 정리, 표준계약서 관리",
      "관련 법령 개정 사항 모니터링과 사내 공지",
      "준법 교육 자료 작성과 임직원 교육 운영",
      "내부 점검, 소송과 분쟁 대응 자료 정리, 외부 로펌 연락"
    ],
    "skills": [
      "민법, 상법, 공정거래법, 개인정보보호법 등 기업 관련 법 지식",
      "계약서 검토와 법률 문서 작성",
      "법령, 판례 조사와 요약",
      "내부통제와 준법 프로그램 이해",
      "꼼꼼함과 비밀 유지",
      "부서 간 소통과 설명 능력"
    ],
    "certs": [
      {
        "name": "변호사",
        "issuer": "법무부",
        "type": "국가전문자격",
        "note": "법학전문대학원 졸업 후 변호사시험 합격 필요, 사내변호사 채용 때 요구"
      },
      {
        "name": "법무사",
        "issuer": "대한법무사협회(법원행정처)",
        "type": "국가전문자격"
      },
      {
        "name": "개인정보관리사(CPPG)",
        "issuer": "한국CPO포럼",
        "type": "민간자격"
      }
    ],
    "projectRole": [
      "규정, 약관, 계약서 초안 작성 담당",
      "법률 쟁점 조사와 리스크 검토 담당",
      "회의록과 공식 문서 관리 담당"
    ],
    "quant": [
      "민법, 상법, 행정법 등 법학 전공 과목 이수와 학점 관리",
      "영어 공인 성적(TOEIC, TEPS) 확보",
      "개인정보관리사(CPPG) 취득",
      "법학적성시험(LEET) 또는 법무사 시험 준비(장기 목표)"
    ],
    "qual": [
      "법률 사무소, 기업 법무팀, 공공기관 법무 부서 인턴",
      "모의재판, 법률 상담 봉사, 법학회 활동",
      "계약서나 약관을 분석한 팀 프로젝트",
      "준법, 윤리 관련 공모전이나 논문 활동"
    ],
    "resumePoints": [
      "법령과 판례를 조사해 쟁점을 정리한 구체적 경험",
      "규정을 지키며 책임감 있게 일을 처리한 사례",
      "어려운 법률 내용을 다른 사람에게 쉽게 설명한 경험"
    ],
    "ncs": "총무",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 총무·인사 > 총무)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "법무부 변호사시험",
        "url": "https://www.moj.go.kr/lstexam/index.do"
      },
      {
        "label": "개인정보관리사(CPPG) 시험 사이트",
        "url": "https://www.cpptest.or.kr/"
      }
    ]
  },
  "기업 HR·조직문화 담당자": {
    "does": [
      "채용 공고 작성, 지원자 응대, 면접 일정 조율",
      "임직원 만족도 조사, 조직문화 진단 설문 운영과 결과 정리",
      "사내 소통 행사, 온보딩 프로그램 기획과 운영 지원",
      "인사 기록 관리와 근태, 복리후생 업무 보조"
    ],
    "skills": [
      "조직심리, 상담 이론의 실무 적용",
      "설문 설계와 통계 분석 기초",
      "근로기준법 등 노동 관련 법 기초",
      "경청과 상담, 갈등 조정",
      "프로그램 기획과 운영",
      "엑셀, 설문 도구 활용"
    ],
    "certs": [
      {
        "name": "직업상담사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "공인노무사",
        "issuer": "한국산업인력공단(고용노동부)",
        "type": "국가전문자격",
        "note": "장기 목표용 전문 자격"
      },
      {
        "name": "경영지도사(인적자원관리)",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격"
      },
      {
        "name": "SHRM-CP",
        "issuer": "SHRM",
        "type": "국제자격",
        "note": "학위, 경력 요건 없음"
      }
    ],
    "projectRole": [
      "팀원 역할 배분과 갈등 조정 담당",
      "설문 설계와 결과 분석 담당",
      "팀 빌딩, 워크숍 기획 담당"
    ],
    "quant": [
      "직업상담사 2급 취득",
      "영어 공인 성적(TOEIC) 확보",
      "컴퓨터활용능력 또는 데이터분석준전문가(ADsP) 취득",
      "조직심리, 노동법 관련 과목 이수"
    ],
    "qual": [
      "기업 인사팀, HR 컨설팅사 인턴",
      "동아리, 학생회에서 모집과 팀 운영을 맡은 경험",
      "조직문화나 구성원 만족도를 조사한 프로젝트",
      "상담 실습, 또래 상담 봉사 경험"
    ],
    "resumePoints": [
      "사람들의 의견을 듣고 갈등을 조정해 본 구체적 경험",
      "설문이나 데이터를 근거로 개선안을 제안한 경험",
      "노동법과 인사 제도에 대한 기본 이해"
    ],
    "ncs": "인사",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 총무·인사 > 인사·조직 > 인사)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "Q-Net 공인노무사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=05"
      },
      {
        "label": "Q-Net 경영지도사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=49"
      },
      {
        "label": "SHRM Certification",
        "url": "https://www.shrm.org/credentials/certification"
      }
    ]
  },
  "전략기획 담당자": {
    "does": [
      "시장, 경쟁사, 산업 동향 자료 조사와 요약 보고",
      "연간 사업계획과 중장기 전략 수립 자료 작성 지원",
      "부서별 KPI, 실적 데이터 취합과 경영회의 자료 준비",
      "신규 사업 검토를 위한 사업성 분석 보조"
    ],
    "skills": [
      "경영 전략 프레임워크(SWOT, 3C 등) 활용",
      "재무제표와 손익 구조 이해",
      "데이터 분석과 시각화",
      "보고서, 발표 자료 작성",
      "논리적 사고와 문제 해결",
      "부서 간 조율과 소통"
    ],
    "certs": [
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "지도분야 인적자원관리, 재무관리, 생산관리, 마케팅 중 택일"
      },
      {
        "name": "데이터분석준전문가(ADsP)",
        "issuer": "한국데이터산업진흥원",
        "type": "국가공인 민간자격",
        "note": "공인자격 제2022-05호, 응시 제한 없음"
      },
      {
        "name": "재경관리사",
        "issuer": "삼일회계법인",
        "type": "국가공인 민간자격",
        "note": "민간자격정보서비스 기준 공인, 등록번호 2008-0106"
      }
    ],
    "projectRole": [
      "시장 조사와 경쟁 분석 담당",
      "사업 기획서, 발표 자료 작성 담당",
      "예산과 일정 관리 담당"
    ],
    "quant": [
      "데이터분석준전문가(ADsP) 취득",
      "재경관리사 또는 전산회계 1급 취득",
      "영어 공인 성적(TOEIC, OPIc) 확보",
      "경영전략, 재무관리, 통계 관련 과목 이수"
    ],
    "qual": [
      "경영 전략, 창업 아이디어 공모전 참가",
      "기업 기획 부서, 컨설팅사 인턴",
      "산업 분석 보고서를 작성한 학회나 팀 프로젝트",
      "케이스 스터디 경진대회 참가"
    ],
    "resumePoints": [
      "자료를 분석해 문제를 정의하고 대안을 제시한 경험",
      "여러 부서나 팀원을 설득해 계획을 실행한 경험",
      "숫자와 논리로 보고서를 작성한 구체적 사례"
    ],
    "ncs": "경영기획, 경영평가",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 기획사무 > 경영기획 > 경영기획, 경영평가)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "Q-Net 경영지도사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=49"
      },
      {
        "label": "한국데이터산업진흥원 데이터분석준전문가",
        "url": "https://www.dataq.or.kr/www/sub/a_06.do"
      },
      {
        "label": "민간자격정보서비스 재경관리사 검색",
        "url": "https://www.pqi.or.kr/inf/qul/infQulList.do?searchQulNm=%EC%9E%AC%EA%B2%BD%EA%B4%80%EB%A6%AC%EC%82%AC"
      }
    ]
  },
  "인사(HR) 담당자": {
    "does": [
      "채용 공고 등록, 서류 접수, 면접 일정 조율과 합격자 안내",
      "입퇴사 처리, 4대보험 신고, 근태와 급여 자료 정리",
      "인사평가, 승진, 보상 자료 취합과 인사 기록 관리",
      "교육 운영 지원과 노무 관련 문의 1차 응대"
    ],
    "skills": [
      "근로기준법 등 노동 관련 법 지식",
      "채용, 평가, 보상 등 인사 제도 이해",
      "급여, 4대보험 실무",
      "엑셀과 인사정보시스템 활용",
      "비밀 유지와 공정성",
      "소통과 조정"
    ],
    "certs": [
      {
        "name": "공인노무사",
        "issuer": "한국산업인력공단(고용노동부)",
        "type": "국가전문자격",
        "note": "1차, 2차, 3차 시험. 장기 목표용 전문 자격"
      },
      {
        "name": "경영지도사(인적자원관리)",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격"
      },
      {
        "name": "직업상담사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "SHRM-CP",
        "issuer": "SHRM",
        "type": "국제자격",
        "note": "학위, 경력 요건 없음"
      }
    ],
    "projectRole": [
      "팀원 모집과 역할 배분 담당",
      "회의 운영과 일정, 출결 관리 담당",
      "팀원 피드백과 갈등 조정 담당"
    ],
    "quant": [
      "영어 공인 성적(TOEIC) 확보",
      "컴퓨터활용능력 또는 데이터분석준전문가(ADsP) 취득",
      "직업상담사 2급 취득",
      "인사관리, 노동법, 조직행동 관련 과목 이수"
    ],
    "qual": [
      "기업 인사팀, 채용 플랫폼 인턴",
      "학생회, 동아리에서 모집과 운영을 맡은 경험",
      "채용 박람회, 멘토링 프로그램 운영 봉사",
      "조직 제도를 분석한 팀 프로젝트"
    ],
    "resumePoints": [
      "사람을 모으고 역할을 나누어 팀을 운영한 구체적 경험",
      "규정과 공정성을 지키며 민감한 정보를 다룬 사례",
      "노동법과 인사 제도에 대한 이해를 보여 주는 학습과 자격 준비"
    ],
    "ncs": "인사, 노무관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 총무·인사 > 인사·조직 > 인사, 노무관리)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "Q-Net 공인노무사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=05"
      },
      {
        "label": "Q-Net 공인노무사 시험정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=05&gbnn=gbnSubtab1"
      },
      {
        "label": "Q-Net 경영지도사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=49"
      },
      {
        "label": "SHRM Certification",
        "url": "https://www.shrm.org/credentials/certification"
      }
    ]
  },
  "재무·회계 담당자": {
    "does": [
      "전표 입력, 증빙 정리와 계정 과목 분류",
      "매입매출 세금계산서 발행과 부가가치세 신고 자료 준비",
      "자금 입출금 관리, 법인카드와 경비 정산",
      "월 결산 자료 취합과 재무제표 작성 보조"
    ],
    "skills": [
      "회계 원리와 기업회계기준 이해",
      "부가가치세, 법인세 등 세법 기초",
      "회계 프로그램과 ERP 사용",
      "엑셀 함수와 데이터 정리",
      "정확성과 책임감",
      "재무제표 읽기와 자금 흐름 이해"
    ],
    "certs": [
      {
        "name": "전산회계 1급",
        "issuer": "한국세무사회",
        "type": "국가공인 민간자격",
        "note": "민간자격정보서비스에 전산세무회계(등록번호 2008-0259)로 공인 등록. 회계 직무 채용에서 자주 우대"
      },
      {
        "name": "재경관리사",
        "issuer": "삼일회계법인",
        "type": "국가공인 민간자격",
        "note": "민간자격정보서비스 기준 공인, 등록번호 2008-0106"
      },
      {
        "name": "공인회계사",
        "issuer": "금융감독원(금융위원회)",
        "type": "국가전문자격",
        "note": "응시 전 회계, 세무 12학점, 경영 6학점, 경제 3학점, IT 3학점 이수와 공인영어 성적 필요(2025년 이후 학점인정 신청 기준)"
      },
      {
        "name": "세무사",
        "issuer": "한국산업인력공단(국세청)",
        "type": "국가전문자격",
        "note": "장기 목표용 전문 자격"
      }
    ],
    "projectRole": [
      "예산 편성과 지출 정산 담당",
      "회계 장부와 증빙 관리 담당",
      "사업성 분석과 손익 추정 담당"
    ],
    "quant": [
      "전산회계 1급 또는 전산세무 2급 취득",
      "재경관리사 취득",
      "회계원리, 중급회계, 세법 과목 이수와 학점 관리",
      "영어 공인 성적(TOEIC) 확보"
    ],
    "qual": [
      "회계법인, 세무사무소, 기업 재무팀 인턴",
      "동아리, 학생회 회계 담당으로 예산과 결산을 맡은 경험",
      "기업 재무제표 분석 팀 프로젝트",
      "회계, 세무 관련 학회 활동과 경진대회 참가"
    ],
    "resumePoints": [
      "숫자를 정확하게 다루고 오류를 찾아낸 구체적 경험",
      "규정을 지키며 돈을 관리한 책임감 있는 사례",
      "회계 기준과 세법에 대한 이해를 보여 주는 학습과 자격 준비"
    ],
    "ncs": "회계·감사, 세무, 자금",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 재무·회계 > 회계 > 회계·감사, 세무 / 재무 > 자금)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "민간자격정보서비스 전산세무회계 검색",
        "url": "https://www.pqi.or.kr/inf/qul/infQulList.do?searchQulNm=%EC%A0%84%EC%82%B0%EC%84%B8%EB%AC%B4%ED%9A%8C%EA%B3%84"
      },
      {
        "label": "민간자격정보서비스 재경관리사 검색",
        "url": "https://www.pqi.or.kr/inf/qul/infQulList.do?searchQulNm=%EC%9E%AC%EA%B2%BD%EA%B4%80%EB%A6%AC%EC%82%AC"
      },
      {
        "label": "금융감독원 공인회계사시험 응시자격",
        "url": "https://cpa.fss.or.kr/cpa/main/contents.do?menuNo=1200018"
      },
      {
        "label": "금융감독원 공인회계사시험 시험방법 및 과목",
        "url": "https://cpa.fss.or.kr/cpa/main/contents.do?menuNo=1200019"
      }
    ]
  },
  "HR·인재개발 담당자": {
    "does": [
      "신입사원 교육, 직무 교육 과정 기획과 운영(장소, 강사, 교재 준비)",
      "교육 수요 조사와 만족도 설문 설계, 결과 분석",
      "온라인 학습 시스템(LMS) 콘텐츠 등록과 수강 관리",
      "역량 모델, 경력 개발 제도 운영 자료 정리"
    ],
    "skills": [
      "교육 과정 설계(요구 분석, 설계, 평가) 이해",
      "산업심리, 학습 이론의 실무 적용",
      "설문 설계와 통계 분석",
      "발표와 퍼실리테이션",
      "프로그램 기획과 운영",
      "LMS, 엑셀, 프레젠테이션 도구 활용"
    ],
    "certs": [
      {
        "name": "평생교육사 2급",
        "issuer": "국가평생교육진흥원(교육부)",
        "type": "국가전문자격"
      },
      {
        "name": "직업상담사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "경영지도사(인적자원관리)",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격"
      },
      {
        "name": "SHRM-CP",
        "issuer": "SHRM",
        "type": "국제자격",
        "note": "학위, 경력 요건 없음"
      }
    ],
    "projectRole": [
      "팀원 교육, 스터디 운영 담당",
      "설문 설계와 결과 분석 담당",
      "워크숍, 발표 진행 담당"
    ],
    "quant": [
      "평생교육사 2급 이수 과목과 학점 확보",
      "직업상담사 2급 취득",
      "영어 공인 성적(TOEIC) 확보",
      "통계, 산업심리, 교육공학 관련 과목 이수"
    ],
    "qual": [
      "기업 교육팀, HRD 컨설팅사, 교육 기관 인턴",
      "교육 프로그램을 직접 기획해 운영한 동아리나 봉사 경험",
      "역량 진단이나 교육 효과를 분석한 심리학 프로젝트",
      "강의, 멘토링, 퍼실리테이션 경험"
    ],
    "resumePoints": [
      "다른 사람을 가르치거나 프로그램을 기획해 운영한 구체적 경험",
      "설문과 데이터를 근거로 개선안을 낸 사례",
      "사람의 성장과 조직 학습에 대한 관심을 뒷받침하는 학습과 활동"
    ],
    "ncs": "인사",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(경영·회계·사무 > 총무·인사 > 인사·조직 > 인사)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do"
      },
      {
        "label": "국가평생교육진흥원 평생교육사 등급별 자격요건",
        "url": "https://lledu.nile.or.kr/system/class/"
      },
      {
        "label": "Q-Net 경영지도사",
        "url": "https://www.q-net.or.kr/man001.do?gSite=L&gId=49"
      },
      {
        "label": "SHRM Certification",
        "url": "https://www.shrm.org/credentials/certification"
      }
    ]
  },
  "전략 컨설턴트": {
    "does": [
      "기업 경영 문제 분석과 대책 연구, 사업 추진 상담과 자문",
      "인사, 조직, 재무, 생산, 유통, 판매 영역 진단 지원",
      "프로젝트 제안서 작성과 발표 보조, 자료 조사와 분석",
      "사업환경 분석, 경영계획 수립 자료 정리"
    ],
    "skills": [
      "수리논리력과 자료 분석",
      "논리적 말하기와 문서 작성",
      "경영과 경제 지식",
      "사업환경 분석",
      "제안서 작성",
      "대인관계와 설득"
    ],
    "certs": [
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "2차 분야: 인적자원관리, 재무관리, 생산관리, 마케팅"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      },
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시자격 제한 없음, 스프레드시트와 데이터베이스 실무 평가"
      }
    ],
    "projectRole": [
      "시장과 경쟁 환경 분석 담당",
      "사업계획서와 제안서 작성 담당",
      "발표와 질의응답 담당"
    ],
    "quant": [
      "경영지도사 1차 시험 준비(공통 과목)",
      "사회조사분석사 2급 취득",
      "컴퓨터활용능력 1급 취득",
      "경영, 경제, 통계 관련 과목 이수"
    ],
    "qual": [
      "기업 문제 해결형 공모전이나 케이스 경진대회 참가",
      "컨설팅 학회나 동아리에서 산업 분석 보고서 작성",
      "경영 진단 또는 사업계획 수립을 돕는 인턴 경험",
      "제안서 작성과 발표 경험"
    ],
    "resumePoints": [
      "다양한 정보를 근거로 결론을 끌어낸 분석 경험",
      "경영 문제를 정의하고 대책을 제안한 과정",
      "논리적으로 설명하고 상대를 설득한 사례"
    ],
    "ncs": "경영기획, 경영평가",
    "sources": [
      {
        "label": "커리어넷 직업백과(경영컨설턴트)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=202"
      },
      {
        "label": "NCS 국가직무능력표준(경영기획 02010101, 경영평가 02010102)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 경영지도사 자격상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=49&gbnn=gbnSubtab2"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(사회조사분석사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "대한상공회의소 자격평가사업단(컴퓨터활용능력)",
        "url": "https://license.korcham.net/co/examguide.do?mm=21&cd=0103"
      }
    ]
  },
  "창업가·스타트업 운영": {
    "does": [
      "업종, 비용, 수익성 분석으로 창업 아이템 선정",
      "사업계획서 작성, 창업지원사업 공고 확인과 지원",
      "경영방침과 경영계획 수립, 예산 관리",
      "초기 고객 확보를 위한 마케팅과 제품 검증"
    ],
    "skills": [
      "사업환경 분석",
      "사업계획서 작성",
      "예산과 자금 관리",
      "마케팅 전략 수립",
      "팀 운영과 소통",
      "실행력과 문제 해결"
    ],
    "certs": [
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "2차 분야: 인적자원관리, 재무관리, 생산관리, 마케팅"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "팀 대표(기획과 일정 총괄)",
      "사업계획서와 발표 자료 작성 담당",
      "시장조사와 고객 검증 담당"
    ],
    "quant": [
      "창업경진대회 수상 실적",
      "사업계획서 제출 건수와 창업지원사업 선정 이력",
      "창업 관련 교과목 이수",
      "사회조사분석사 2급 취득"
    ],
    "qual": [
      "창업 동아리에서 아이템 검증과 시제품 제작",
      "K-Startup 창업지원사업 지원 경험",
      "교내 창업경진대회 참가",
      "소규모 판매나 서비스 운영 경험"
    ],
    "resumePoints": [
      "문제를 발견해 아이템으로 만든 과정",
      "실패와 수정을 거친 실행 경험",
      "팀을 모으고 역할을 나눠 끝까지 운영한 경험"
    ],
    "ncs": "경영기획, 마케팅전략기획",
    "sources": [
      {
        "label": "커리어넷 통합검색(창업컨설턴트)",
        "url": "https://www.career.go.kr/cloud/w/search/intro?text=%EC%B0%BD%EC%97%85%EC%BB%A8%EC%84%A4%ED%84%B4%ED%8A%B8"
      },
      {
        "label": "NCS 국가직무능력표준(경영기획 02010101, 마케팅전략기획 02010301)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "K-Startup 창업지원포털(창업진흥원)",
        "url": "https://www.k-startup.go.kr/"
      },
      {
        "label": "Q-Net 경영지도사 자격상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=49&gbnn=gbnSubtab2"
      }
    ]
  },
  "경영지원 사무직": {
    "does": [
      "비품, 차량, 부동산, 용역 관리와 행사 지원",
      "문서 작성과 관리, 자료 관리, 회의 운영",
      "복리후생 지원과 사무환경 조성",
      "사무자동화 프로그램과 그룹웨어 활용"
    ],
    "skills": [
      "문서 작성과 관리",
      "스프레드시트 활용",
      "비품과 자산 관리",
      "일정과 행사 운영",
      "꼼꼼함과 책임감",
      "부서 간 소통"
    ],
    "certs": [
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시자격 제한 없음, 스프레드시트와 데이터베이스 실무 평가"
      },
      {
        "name": "비서 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격"
      },
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "2차 분야: 인적자원관리, 재무관리, 생산관리, 마케팅"
      }
    ],
    "projectRole": [
      "예산과 일정 관리 담당",
      "회의록과 문서 정리 담당",
      "행사 준비와 물품 관리 담당"
    ],
    "quant": [
      "컴퓨터활용능력 1급 취득",
      "비서 1급 취득",
      "경영, 회계 기초 과목 이수"
    ],
    "qual": [
      "동아리나 학생회 총무 경험",
      "행사 기획과 운영 지원 경험",
      "사무 보조 아르바이트나 인턴",
      "문서 양식과 자료 정리 체계를 만든 경험"
    ],
    "resumePoints": [
      "자원을 관리하고 기록을 남긴 경험",
      "여러 부서 요청을 조율한 경험",
      "정확하고 빠른 문서 처리 사례"
    ],
    "ncs": "총무, 사무행정",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(총무 02020101, 사무행정 02020302)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "대한상공회의소 자격평가사업단(컴퓨터활용능력)",
        "url": "https://license.korcham.net/co/examguide.do?mm=21&cd=0103"
      },
      {
        "label": "대한상공회의소 자격평가사업단 메인(시행 종목)",
        "url": "https://license.korcham.net/indexmain.jsp"
      }
    ]
  },
  "복지기관 행정 담당자": {
    "does": [
      "사회복지조직 운영기획, 사무관리, 문서와 회계 처리",
      "복지 프로그램 기획, 시행, 평가 지원",
      "후원 자원 개발과 기관 홍보",
      "대상자 선정, 급여, 복지 조치 행정 지원"
    ],
    "skills": [
      "사회복지 제도 이해",
      "문서와 회계 처리",
      "프로그램 기획과 평가",
      "자원 개발과 홍보",
      "배려심과 책임감",
      "자기 감정 조절"
    ],
    "certs": [
      {
        "name": "사회복지사 1급",
        "issuer": "한국산업인력공단(보건복지부)",
        "type": "국가전문자격"
      },
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시자격 제한 없음, 스프레드시트와 데이터베이스 실무 평가"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "프로그램 기획과 예산 담당",
      "홍보와 후원 연계 담당",
      "기록과 보고서 작성 담당"
    ],
    "quant": [
      "사회복지사 자격 취득(2급은 학점 이수, 1급은 국가시험)",
      "컴퓨터활용능력 1급 취득",
      "사회복지 현장실습 이수"
    ],
    "qual": [
      "복지기관 봉사와 현장실습",
      "프로그램 기획서와 결과 보고서 작성 경험",
      "후원 행사나 홍보 콘텐츠 제작 경험",
      "사례 기록과 행정 서류 처리 경험"
    ],
    "resumePoints": [
      "복지 대상자를 돕는 봉사 정신과 책임감",
      "프로그램을 기획하고 평가한 경험",
      "자원을 연결하고 기관을 알린 경험"
    ],
    "ncs": "사회복지조직운영, 공공복지",
    "sources": [
      {
        "label": "커리어넷 직업백과(사회복지사)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=379"
      },
      {
        "label": "NCS 국가직무능력표준(사회복지조직운영 07010102, 공공복지 07010103)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 사회복지사1급",
        "url": "https://www.q-net.or.kr/man001.do?id=&gId=52&gSite=L"
      },
      {
        "label": "대한상공회의소 자격평가사업단(컴퓨터활용능력)",
        "url": "https://license.korcham.net/co/examguide.do?mm=21&cd=0103"
      }
    ]
  },
  "인사 담당자": {
    "does": [
      "인력채용 공고, 서류 접수, 면접 운영 지원",
      "교육훈련 운영, 인사평가 자료 정리",
      "급여지급, 임금관리, 복리후생 관리 보조",
      "인사 규정과 노동 관련 법규 적용 확인"
    ],
    "skills": [
      "노동 관련 법규 이해",
      "채용과 평가 제도 이해",
      "급여와 데이터 처리",
      "교육 운영",
      "소통과 비밀 유지",
      "문서 작성"
    ],
    "certs": [
      {
        "name": "공인노무사",
        "issuer": "한국산업인력공단(고용노동부)",
        "type": "국가전문자격",
        "note": "1차, 2차, 3차 시험"
      },
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "2차 분야: 인적자원관리, 재무관리, 생산관리, 마케팅"
      },
      {
        "name": "직업상담사 2급",
        "issuer": "한국산업인력공단(고용노동부)",
        "type": "국가기술자격"
      },
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시자격 제한 없음, 스프레드시트와 데이터베이스 실무 평가"
      }
    ],
    "projectRole": [
      "팀원 모집과 역할 배분 담당",
      "일정과 성과 관리 담당",
      "교육 세션 운영 담당"
    ],
    "quant": [
      "컴퓨터활용능력 1급 취득",
      "직업상담사 2급 취득",
      "경영지도사(인적자원관리) 준비",
      "노동법, 인사관리 과목 이수"
    ],
    "qual": [
      "동아리 신입 모집과 면접 운영 경험",
      "교육 프로그램 기획과 운영 경험",
      "인사팀 인턴이나 채용 박람회 운영 지원",
      "조직문화 개선 활동 경험"
    ],
    "resumePoints": [
      "사람을 선발하고 배치해 본 경험",
      "규정을 지키며 공정하게 처리한 사례",
      "구성원 의견을 듣고 조직에 반영한 경험"
    ],
    "ncs": "인사, 노무관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(인사 02020201, 노무관리 02020202)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 공인노무사",
        "url": "https://www.q-net.or.kr/man001.do?id=&gId=05&gSite=L"
      },
      {
        "label": "Q-Net 경영지도사 자격상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=49&gbnn=gbnSubtab2"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(직업상담사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "대한상공회의소 자격평가사업단(컴퓨터활용능력)",
        "url": "https://license.korcham.net/co/examguide.do?mm=21&cd=0103"
      }
    ]
  },
  "기업 상담·HR 담당자": {
    "does": [
      "직원 교육훈련 운영과 핵심인재 관리 지원",
      "조직문화 관리, 구성원 고충 상담과 전직지원",
      "인사평가와 채용 면접 운영 보조",
      "심리검사와 상담 기법을 활용한 조직 진단 지원"
    ],
    "skills": [
      "상담 이론과 면접 기법",
      "심리검사 이해",
      "조직문화와 인사 제도 이해",
      "교육 운영",
      "비밀 유지와 윤리",
      "데이터 정리"
    ],
    "certs": [
      {
        "name": "직업상담사 2급",
        "issuer": "한국산업인력공단(고용노동부)",
        "type": "국가기술자격"
      },
      {
        "name": "공인노무사",
        "issuer": "한국산업인력공단(고용노동부)",
        "type": "국가전문자격",
        "note": "1차, 2차, 3차 시험"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      },
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "2차 분야: 인적자원관리, 재무관리, 생산관리, 마케팅"
      }
    ],
    "projectRole": [
      "팀원 면담과 갈등 조정 담당",
      "교육과 워크숍 진행 담당",
      "설문 설계와 결과 분석 담당"
    ],
    "quant": [
      "직업상담사 2급 취득",
      "사회조사분석사 2급 취득",
      "상담, 심리검사, 인사관리 과목 이수"
    ],
    "qual": [
      "또래 상담이나 멘토링 활동",
      "조직 진단 설문 설계와 분석 경험",
      "인사팀 또는 상담센터 인턴",
      "교육 프로그램 기획과 진행 경험"
    ],
    "resumePoints": [
      "사람의 말을 듣고 문제를 정리한 경험",
      "조직 안에서 갈등을 조정한 사례",
      "교육이나 워크숍을 설계해 운영한 경험"
    ],
    "ncs": "인사, 직업상담, 심리상담",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(인사 02020201, 직업상담 04020101, 심리상담)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(직업상담사2급, 사회조사분석사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "Q-Net 공인노무사",
        "url": "https://www.q-net.or.kr/man001.do?id=&gId=05&gSite=L"
      }
    ]
  },
  "스포츠센터 매니저": {
    "does": [
      "회원 등록, 상담, 고객관리와 서비스 운영",
      "운동 프로그램 편성과 강사 일정 관리",
      "시설물 운용관리와 안전관리 점검",
      "시설 마케팅과 매출, 재무 자료 정리"
    ],
    "skills": [
      "스포츠시설 경영과 마케팅",
      "회원 응대와 고객관리",
      "시설 안전관리",
      "프로그램 기획",
      "재무 기초",
      "대인관계능력"
    ],
    "certs": [
      {
        "name": "스포츠경영관리사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가기술자격"
      },
      {
        "name": "2급 생활스포츠지도사",
        "issuer": "국민체육진흥공단(문화체육관광부)",
        "type": "국가전문자격",
        "note": "국민체육진흥법에 따른 체육지도자 자격, 필기와 실기구술, 연수 이수"
      },
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시자격 제한 없음, 스프레드시트와 데이터베이스 실무 평가"
      }
    ],
    "projectRole": [
      "운동 프로그램 기획과 운영 담당",
      "회원 모집과 홍보 담당",
      "시설과 안전 점검 담당"
    ],
    "quant": [
      "스포츠경영관리사 취득",
      "2급 생활스포츠지도사 취득",
      "컴퓨터활용능력 1급 취득",
      "스포츠경영, 마케팅 과목 이수"
    ],
    "qual": [
      "스포츠센터나 체육시설 아르바이트, 인턴",
      "교내 체육 행사나 대회 운영 경험",
      "운동 프로그램 지도 경험",
      "회원 설문과 만족도 개선 활동"
    ],
    "resumePoints": [
      "회원과 고객을 응대해 문제를 해결한 경험",
      "프로그램이나 행사를 기획해 운영한 경험",
      "안전 점검과 시설 관리 책임을 맡은 사례"
    ],
    "ncs": "스포츠시설운영관리",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(스포츠시설운영관리 12040202)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 국가기술자격(스포츠경영관리사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=9546"
      },
      {
        "label": "국민체육진흥공단 체육지도자 자격제도 안내",
        "url": "https://sqms.kspo.or.kr/info/licenseInfo.kspo"
      },
      {
        "label": "대한상공회의소 자격평가사업단(컴퓨터활용능력)",
        "url": "https://license.korcham.net/co/examguide.do?mm=21&cd=0103"
      }
    ]
  },
  "골프장·체육시설 운영자": {
    "does": [
      "코스와 시설물 운용관리, 안전관리",
      "예약, 회원 관리와 고객 서비스 운영",
      "시설 마케팅, 대회와 행사 운영 지원",
      "시설 재무관리와 법률 관련 지원"
    ],
    "skills": [
      "스포츠시설 경영기획",
      "고객관리와 서비스",
      "안전관리와 시설 유지",
      "행사 운영",
      "마케팅",
      "재무 기초"
    ],
    "certs": [
      {
        "name": "스포츠경영관리사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가기술자격"
      },
      {
        "name": "2급 생활스포츠지도사",
        "issuer": "국민체육진흥공단(문화체육관광부)",
        "type": "국가전문자격",
        "note": "국민체육진흥법에 따른 체육지도자 자격, 필기와 실기구술, 연수 이수"
      },
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시자격 제한 없음, 스프레드시트와 데이터베이스 실무 평가"
      }
    ],
    "projectRole": [
      "행사와 대회 운영 담당",
      "시설 점검과 안전 담당",
      "홍보와 참가자 모집 담당"
    ],
    "quant": [
      "스포츠경영관리사 취득",
      "2급 생활스포츠지도사 취득",
      "컴퓨터활용능력 1급 취득"
    ],
    "qual": [
      "골프장, 파크골프장, 체육시설 현장 실습이나 아르바이트",
      "교내외 대회 운영 스태프 경험",
      "지역 생활체육 행사 지원",
      "시설 이용자 만족도 조사 경험"
    ],
    "resumePoints": [
      "시설 안전과 이용자 서비스 책임을 맡은 경험",
      "행사를 기획하고 운영한 경험",
      "현장 문제를 해결한 사례"
    ],
    "ncs": "스포츠시설운영관리, 스포츠시설개발",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(스포츠시설운영관리 12040202, 스포츠시설개발 12040201)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 국가기술자격(스포츠경영관리사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=9546"
      },
      {
        "label": "국민체육진흥공단 체육지도자 자격제도 안내",
        "url": "https://sqms.kspo.or.kr/info/licenseInfo.kspo"
      },
      {
        "label": "대한상공회의소 자격평가사업단(컴퓨터활용능력)",
        "url": "https://license.korcham.net/co/examguide.do?mm=21&cd=0103"
      }
    ]
  },
  "뷰티 브랜드 마케터": {
    "does": [
      "화장품 시장과 소비자 취향 조사, 경쟁 제품 분석",
      "브랜드 기획과 관리, 신상품 기획 자료 작성",
      "STP와 마케팅 믹스 전략 수립 보조",
      "온라인 PR과 콘텐츠 운영, 마케팅 성과 관리"
    ],
    "skills": [
      "시장조사와 통계 이해",
      "브랜드 기획과 관리",
      "화장품 성분과 제품 이해",
      "콘텐츠 기획",
      "트렌드 분석",
      "설득과 보고서 작성"
    ],
    "certs": [
      {
        "name": "맞춤형화장품조제관리사",
        "issuer": "대한상공회의소(식품의약품안전처)",
        "type": "국가전문자격",
        "note": "화장품법 제3조의4에 따른 국가자격, 응시자격 제한 없음, 합격 시 화장품 책임판매관리자 자격기준 충족"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      },
      {
        "name": "검색광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2012-1136), 국가공인 아님"
      },
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "2차 분야: 인적자원관리, 재무관리, 생산관리, 마케팅"
      }
    ],
    "projectRole": [
      "브랜드 콘셉트와 타깃 설정 담당",
      "시장조사와 소비자 설문 담당",
      "SNS 콘텐츠 제작과 성과 분석 담당"
    ],
    "quant": [
      "맞춤형화장품조제관리사 취득",
      "사회조사분석사 2급 취득",
      "검색광고마케터 1급 취득",
      "마케팅, 소비자행동 과목 이수"
    ],
    "qual": [
      "화장품 브랜드 마케팅 공모전 참가",
      "SNS 계정 운영과 콘텐츠 제작 경험",
      "뷰티 기업 인턴이나 서포터즈",
      "제품 리뷰 분석과 소비자 조사 경험"
    ],
    "resumePoints": [
      "시장 자료를 분석해 전략으로 연결한 경험",
      "브랜드 메시지를 콘텐츠로 만든 사례",
      "다른 사람을 설득해 결과를 낸 경험"
    ],
    "ncs": "마케팅전략기획, 광고",
    "sources": [
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "NCS 국가직무능력표준(마케팅전략기획 02010301, 광고 02010202)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "대한상공회의소 자격평가사업단(맞춤형화장품조제관리사)",
        "url": "https://license.korcham.net/co/examguide.do?mm=34&cd=0202"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(사회조사분석사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "한국정보통신진흥협회 자격검정(검색광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject5.do"
      }
    ]
  },
  "스포츠 마케터": {
    "does": [
      "스포츠이벤트 전략기획과 경기운영 지원",
      "스폰서십, 라이선싱 제안서 작성과 협상 지원",
      "구단, 선수, 대회 홍보 콘텐츠 제작",
      "이벤트 결과보고와 사후평가"
    ],
    "skills": [
      "스포츠 산업 이해",
      "이벤트 기획과 운영",
      "제안서 작성과 협상",
      "콘텐츠 제작",
      "대인관계능력",
      "리더십과 사전 준비"
    ],
    "certs": [
      {
        "name": "스포츠경영관리사",
        "issuer": "한국산업인력공단(문화체육관광부)",
        "type": "국가기술자격"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      },
      {
        "name": "SNS광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2022-001160), 국가공인 아님"
      }
    ],
    "projectRole": [
      "대회와 이벤트 기획 담당",
      "후원 제안서와 협력 섭외 담당",
      "홍보 콘텐츠 제작 담당"
    ],
    "quant": [
      "스포츠경영관리사 취득",
      "사회조사분석사 2급 취득",
      "SNS광고마케터 1급 취득",
      "스포츠마케팅, 스포츠경영 과목 이수"
    ],
    "qual": [
      "교내외 스포츠 대회 운영 스태프",
      "구단이나 스포츠 기업 서포터즈, 인턴",
      "스포츠 콘텐츠 채널 운영 경험",
      "후원 유치나 협찬 제안 경험"
    ],
    "resumePoints": [
      "이벤트를 기획해 끝까지 운영한 경험",
      "협력 상대를 설득하고 계약이나 협찬을 끌어낸 사례",
      "팀을 이끌고 미리 준비해 문제를 막은 경험"
    ],
    "ncs": "스포츠이벤트, 스포츠라이선싱, 마케팅전략기획",
    "sources": [
      {
        "label": "커리어넷 직업백과(스포츠에이전트)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1088"
      },
      {
        "label": "NCS 국가직무능력표준(스포츠이벤트 12040401, 스포츠라이선싱 12040402)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 국가기술자격(스포츠경영관리사)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=9546"
      },
      {
        "label": "한국정보통신진흥협회 자격검정(SNS광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject10.do"
      }
    ]
  },
  "브랜드 마케터": {
    "does": [
      "시장과 소비자 조사, 경쟁 브랜드 분석",
      "브랜드 기획, 관리, 평가 자료 작성",
      "STP와 마케팅 믹스 전략 수립 보조",
      "마케팅 성과 관리와 보고서 작성"
    ],
    "skills": [
      "통계자료 이해와 수리논리력",
      "브랜드 기획과 관리",
      "마케팅 전략 기획",
      "시장 환경 분석",
      "설득과 토론",
      "보고서 작성"
    ],
    "certs": [
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      },
      {
        "name": "경영지도사",
        "issuer": "한국산업인력공단(중소벤처기업부)",
        "type": "국가전문자격",
        "note": "2차 분야: 인적자원관리, 재무관리, 생산관리, 마케팅"
      },
      {
        "name": "검색광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2012-1136), 국가공인 아님"
      },
      {
        "name": "컴퓨터활용능력 1급",
        "issuer": "대한상공회의소",
        "type": "국가기술자격",
        "note": "응시자격 제한 없음, 스프레드시트와 데이터베이스 실무 평가"
      }
    ],
    "projectRole": [
      "브랜드 전략과 포지셔닝 담당",
      "시장조사와 데이터 분석 담당",
      "발표 자료와 보고서 작성 담당"
    ],
    "quant": [
      "사회조사분석사 2급 취득",
      "검색광고마케터 1급 취득",
      "컴퓨터활용능력 1급 취득",
      "마케팅, 통계 과목 이수"
    ],
    "qual": [
      "브랜드 마케팅 공모전 참가",
      "마케팅 학회나 동아리 활동",
      "기업 마케팅팀 인턴이나 서포터즈",
      "브랜드 분석 보고서 작성 경험"
    ],
    "resumePoints": [
      "시장 분석 자료로 기획안을 쓴 경험",
      "브랜드 메시지를 정해 실행한 사례",
      "다른 사람을 설득해 결과를 낸 경험"
    ],
    "ncs": "마케팅전략기획, 광고",
    "sources": [
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "NCS 국가직무능력표준(마케팅전략기획 02010301, 광고 02010202)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(사회조사분석사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "Q-Net 경영지도사 자격상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=L&gId=49&gbnn=gbnSubtab2"
      },
      {
        "label": "한국정보통신진흥협회 자격검정(검색광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject5.do"
      }
    ]
  },
  "광고기획자(AE)": {
    "does": [
      "판매 자료, 시장조사 자료로 소비자 성향 분석",
      "광고 전략 수립과 제작 회의 준비, 광고주 의견 수렴",
      "광고 집행 관리와 제작 진행 상황 정리",
      "광고 효과 평가 자료 작성"
    ],
    "skills": [
      "창의력과 아이디어 발상",
      "예술시각능력",
      "소비자와 시장 분석",
      "설득과 프레젠테이션",
      "일정과 예산 관리",
      "커뮤니케이션"
    ],
    "certs": [
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      },
      {
        "name": "검색광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2012-1136), 국가공인 아님"
      },
      {
        "name": "SNS광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2022-001160), 국가공인 아님"
      }
    ],
    "projectRole": [
      "기획안 작성과 발표 담당",
      "소비자 조사와 인사이트 도출 담당",
      "제작 일정과 협업 조율 담당"
    ],
    "quant": [
      "사회조사분석사 2급 취득",
      "검색광고마케터 1급 취득",
      "광고, 심리, 커뮤니케이션 과목 이수"
    ],
    "qual": [
      "광고 공모전 참가와 수상",
      "광고 동아리나 학회에서 기획안 작성",
      "광고대행사 인턴",
      "포트폴리오 제작"
    ],
    "resumePoints": [
      "틀에 박히지 않은 아이디어를 낸 경험",
      "광고주나 심사위원을 설득한 사례",
      "소비자 변화를 읽어 기획에 반영한 경험"
    ],
    "ncs": "광고, 홍보",
    "sources": [
      {
        "label": "커리어넷 직업백과(광고기획자)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=283"
      },
      {
        "label": "NCS 국가직무능력표준(광고 02010202, 홍보 02010201)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(사회조사분석사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "한국정보통신진흥협회 자격검정(검색광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject5.do"
      },
      {
        "label": "한국정보통신진흥협회 자격검정(SNS광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject10.do"
      }
    ]
  },
  "콘텐츠 마케터": {
    "does": [
      "SNS, 블로그, 영상 채널 콘텐츠 기획과 제작",
      "온라인 PR과 검색광고, SNS 광고 운영",
      "조회수, 반응 데이터 분석과 성과 보고",
      "브랜드 메시지에 맞는 카피 작성"
    ],
    "skills": [
      "콘텐츠 기획과 카피라이팅",
      "채널별 특성 이해",
      "기본 디자인과 영상 편집",
      "데이터 분석",
      "트렌드 관찰력",
      "꾸준한 실행"
    ],
    "certs": [
      {
        "name": "검색광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2012-1136), 국가공인 아님"
      },
      {
        "name": "SNS광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2022-001160), 국가공인 아님"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "SNS 채널 운영과 콘텐츠 제작 담당",
      "카피와 스토리 작성 담당",
      "반응 데이터 분석과 개선 담당"
    ],
    "quant": [
      "검색광고마케터 1급 취득",
      "SNS광고마케터 1급 취득",
      "사회조사분석사 2급 취득",
      "운영 채널 팔로워와 콘텐츠 성과 기록"
    ],
    "qual": [
      "개인 또는 동아리 SNS 채널 운영",
      "콘텐츠 공모전 참가",
      "기업 서포터즈나 마케팅 인턴",
      "포트폴리오(콘텐츠 기획안과 결과물) 제작"
    ],
    "resumePoints": [
      "직접 콘텐츠를 만들어 반응을 얻은 경험",
      "데이터를 보고 다음 콘텐츠에 반영한 과정",
      "브랜드 메시지를 일관되게 전달한 사례"
    ],
    "ncs": "마케팅전략기획, 홍보",
    "sources": [
      {
        "label": "NCS 국가직무능력표준(마케팅전략기획 02010301, 홍보 02010201)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "한국정보통신진흥협회 자격검정(검색광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject5.do"
      },
      {
        "label": "한국정보통신진흥협회 자격검정(SNS광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject10.do"
      },
      {
        "label": "커리어넷 통합검색(디지털 마케팅, SNS 마케터 인터뷰)",
        "url": "https://www.career.go.kr/cloud/w/search/intro?text=%EB%94%94%EC%A7%80%ED%84%B8%20%EB%A7%88%EC%BC%80%ED%8C%85"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(사회조사분석사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "패션 브랜드 마케터": {
    "does": [
      "패션 시장과 소비자 조사, 경쟁 브랜드 분석",
      "시즌 상품 기획과 브랜드 콘셉트 기획 지원",
      "콘텐츠 기획, 촬영과 광고 자료 제작 협업",
      "판매 촉진 전략 실행과 성과 관리"
    ],
    "skills": [
      "패션 트렌드 분석",
      "브랜드 기획과 관리",
      "상품기획(머천다이징) 이해",
      "콘텐츠 기획",
      "영업, 디자인 부서와 협업",
      "데이터 분석"
    ],
    "certs": [
      {
        "name": "패션머천다이징산업기사",
        "issuer": "한국산업인력공단(산업통상부)",
        "type": "국가기술자격"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단(국가데이터처)",
        "type": "국가기술자격"
      },
      {
        "name": "검색광고마케터 1급",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격",
        "note": "등록 민간자격(등록번호 2012-1136), 국가공인 아님"
      }
    ],
    "projectRole": [
      "브랜드 콘셉트와 시즌 기획 담당",
      "소비자 조사와 트렌드 분석 담당",
      "룩북과 SNS 콘텐츠 제작 담당"
    ],
    "quant": [
      "패션머천다이징산업기사 취득",
      "사회조사분석사 2급 취득",
      "검색광고마케터 1급 취득",
      "패션마케팅, 머천다이징 과목 이수"
    ],
    "qual": [
      "패션 브랜드 마케팅 공모전 참가",
      "패션 기업 인턴이나 서포터즈",
      "매장 판매 경험으로 소비자 반응 관찰",
      "브랜드 SNS 콘텐츠 제작 포트폴리오"
    ],
    "resumePoints": [
      "소비자 조사로 메시지를 찾아낸 경험",
      "디자이너, 영업 등 다른 부서와 협업한 사례",
      "브랜드 콘셉트를 콘텐츠로 구현한 경험"
    ],
    "ncs": "마케팅전략기획, 광고",
    "sources": [
      {
        "label": "커리어넷 직업백과(마케팅전문가)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=1068"
      },
      {
        "label": "커리어넷 통합검색(패션, 의류 마케터 인터뷰)",
        "url": "https://www.career.go.kr/cloud/w/search/intro?text=%ED%8C%A8%EC%85%98"
      },
      {
        "label": "NCS 국가직무능력표준(마케팅전략기획 02010301, 광고 02010202)",
        "url": "https://www.ncs.go.kr/unity/th03/ncsSearchMain.do?tabNo=1"
      },
      {
        "label": "Q-Net 국가기술자격 종목별 상세정보(패션머천다이징산업기사, 사회조사분석사2급)",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      },
      {
        "label": "한국정보통신진흥협회 자격검정(검색광고마케터)",
        "url": "https://www.ihd.or.kr/introducesubject5.do"
      }
    ]
  },
  "뷰티 콘텐츠 크리에이터": {
    "does": [
      "유튜브, 트위치 등 플랫폼에 올릴 영상과 오디오 콘텐츠 제작",
      "콘텐츠 주제 자료 조사와 기획, 연출, 촬영",
      "촬영 영상 편집과 썸네일, 그래픽 제작 후 채널 업로드",
      "라이브 방송 운용과 채널 운영, 콘텐츠 반응 분석"
    ],
    "skills": [
      "영상 기획과 스토리텔링",
      "촬영과 영상 편집",
      "소셜미디어 채널 운영",
      "콘텐츠 반응 데이터 분석",
      "뷰티 트렌드 이해",
      "창의력과 예술시각능력"
    ],
    "certs": [
      {
        "name": "멀티미디어콘텐츠제작전문가",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 크리에이터 항목의 관련 자격"
      },
      {
        "name": "GTQ(그래픽기술자격) 1급",
        "issuer": "한국생산성본부(KPC)",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 제2024-1호 공인(1급, 2급), Photoshop 실기"
      }
    ],
    "projectRole": [
      "채널 콘텐츠 기획과 촬영 담당",
      "영상 편집과 썸네일 제작 담당",
      "업로드 후 조회수와 반응 분석 담당"
    ],
    "quant": [
      "멀티미디어콘텐츠제작전문가 취득",
      "GTQ 1급 취득",
      "직접 운영한 채널의 업로드 편수와 구독자 추이 기록"
    ],
    "qual": [
      "뷰티 주제로 꾸준히 운영한 개인 채널",
      "기획부터 편집까지 혼자 완성한 영상 포트폴리오",
      "라이브 방송이나 협업 콘텐츠 진행 경험",
      "뷰티 브랜드 체험단, 서포터즈 활동"
    ],
    "resumePoints": [
      "주제 선정부터 촬영, 편집, 업로드까지 혼자 완성한 과정",
      "구독자나 조회수 반응을 분석해 다음 콘텐츠에 반영한 경험",
      "꾸준한 업로드로 채널을 운영한 기록과 창의적인 기획 사례"
    ],
    "ncs": "소셜미디어방송서비스, 영상연출, 영상편집",
    "sources": [
      {
        "label": "커리어넷 직업백과 개인미디어 콘텐츠제작자(크리에이터)",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10021"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "한국생산성본부 GTQ 소개",
        "url": "https://license.kpc.or.kr/nasec/qlfint/qlfint/selectGtqinfomg.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "화장품 브랜드 마케터": {
    "does": [
      "시장 환경과 소비자 행동 분석, 경쟁 브랜드 조사",
      "브랜드 콘셉트 기획과 신상품 기획 지원",
      "온라인, 오프라인 광고와 프로모션 기획, 집행 관리",
      "광고 효과와 판매 성과 분석, 보고서 작성"
    ],
    "skills": [
      "마케팅 시장 환경 분석",
      "STP와 마케팅 믹스 이해",
      "브랜드 기획과 관리",
      "광고 효과와 매출 데이터 분석",
      "기획서 작성과 설득력 있는 발표",
      "화장품 성분과 뷰티 트렌드 이해"
    ],
    "certs": [
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "시장조사와 소비자 조사 역량 증빙용"
      },
      {
        "name": "AI광고마케팅전문가(구 검색광고마케터)",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격"
      }
    ],
    "projectRole": [
      "시장 조사와 타깃 소비자 분석 담당",
      "브랜드 콘셉트와 홍보 전략 기획 담당",
      "광고 집행 결과 분석과 성과 보고 담당"
    ],
    "quant": [
      "사회조사분석사 2급 취득",
      "마케팅 공모전 입상 실적",
      "공인 영어 성적(해외 브랜드 자료 분석용)"
    ],
    "qual": [
      "화장품 브랜드 마케팅 공모전 참가",
      "뷰티 브랜드 서포터즈, 체험단 활동",
      "마케팅 관련 업체 인턴 경험",
      "SNS로 직접 제품을 홍보해 본 경험"
    ],
    "resumePoints": [
      "시장과 소비자를 분석해 마케팅 전략을 세운 과정",
      "광고나 프로모션을 실행하고 결과를 숫자로 검증한 경험",
      "팀에서 기획안을 쓰고 설득해 본 경험과 소비자를 읽는 통찰력"
    ],
    "ncs": "마케팅전략기획, 광고",
    "sources": [
      {
        "label": "커리어넷 직업백과 마케팅전문가",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=1068"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "KAIT 자격검정",
        "url": "https://www.ihd.or.kr/main.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "SNS 마케터": {
    "does": [
      "상품에 맞는 SNS 채널과 타깃 소비자층 설정, 마케팅 계획 수립",
      "SNS 게시물, 영상, 이미지 콘텐츠 기획과 제작",
      "온라인 광고 집행과 채널 운영, 댓글과 문의 대응",
      "판매와 소비자 반응 데이터 분석, 결과 보고"
    ],
    "skills": [
      "SNS 채널별 특성 이해",
      "콘텐츠 기획과 카피 작성",
      "이미지와 짧은 영상 제작",
      "온라인 광고 집행과 성과 분석",
      "소비자 반응 데이터 해석",
      "대인관계능력과 상황 파악"
    ],
    "certs": [
      {
        "name": "AI광고마케팅전문가(구 검색광고마케터)",
        "issuer": "한국정보통신진흥협회(KAIT)",
        "type": "민간자격"
      },
      {
        "name": "GTQ(그래픽기술자격) 1급",
        "issuer": "한국생산성본부(KPC)",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 제2024-1호 공인(1급, 2급), 콘텐츠 이미지 제작용"
      },
      {
        "name": "사회조사분석사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "SNS 채널 개설과 콘텐츠 운영 담당",
      "홍보 이미지와 카드뉴스 제작 담당",
      "도달과 반응 지표 분석 담당"
    ],
    "quant": [
      "GTQ 1급 취득",
      "사회조사분석사 2급 취득",
      "직접 운영한 SNS 계정의 게시물 수와 팔로워 추이 기록"
    ],
    "qual": [
      "창업 아이템이나 동아리 SNS 계정 운영 경험",
      "기업 서포터즈, 기자단 활동",
      "SNS 마케팅 공모전 참가",
      "소상공인 홍보 콘텐츠 제작 봉사"
    ],
    "resumePoints": [
      "채널과 타깃을 정해 콘텐츠를 기획하고 운영한 경험",
      "반응 데이터를 보고 콘텐츠를 바꿔 성과를 낸 사례",
      "상품 소개와 소비자 소통에 대한 책임감과 실제적인 태도"
    ],
    "ncs": "마케팅전략기획, 광고, PR",
    "sources": [
      {
        "label": "커리어넷 직업백과 SNS 마케터",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10077"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "KAIT 자격검정",
        "url": "https://www.ihd.or.kr/main.do"
      },
      {
        "label": "한국생산성본부 GTQ 소개",
        "url": "https://license.kpc.or.kr/nasec/qlfint/qlfint/selectGtqinfomg.do"
      }
    ]
  },
  "스포츠 이벤트 기획자": {
    "does": [
      "스포츠 대회, 행사의 기획안과 예산안 작성",
      "장소, 출연진, 협력사 섭외와 협상, 후원 유치 지원",
      "경기 운영 지원과 현장 인력, 안전 관리",
      "행사 홍보와 참가자 모집, 결과 보고와 사후 평가"
    ],
    "skills": [
      "이벤트 기획과 제안서 작성",
      "예산 관리와 일정 관리",
      "섭외와 협상, 대인관계능력",
      "현장 연출과 운영 순발력",
      "스포츠 마케팅 이해",
      "안전 관리 지식"
    ],
    "certs": [
      {
        "name": "컨벤션기획사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 행사기획자 항목의 관련 자격, 문화체육관광부 주관"
      }
    ],
    "projectRole": [
      "행사 기획안과 예산 관리 담당",
      "장소 섭외와 협력사 연락 담당",
      "현장 운영과 안전 관리 담당"
    ],
    "quant": [
      "컨벤션기획사 2급 취득",
      "직접 운영한 대회나 행사 횟수와 참가 인원 기록",
      "공인 영어 성적(국제 대회 대비)"
    ],
    "qual": [
      "교내외 스포츠 대회 운영 스태프 경험",
      "파크골프 등 생활체육 대회 기획 봉사",
      "축제나 행사 자원봉사, 인턴",
      "스포츠 구단이나 단체 서포터즈 활동"
    ],
    "resumePoints": [
      "기획부터 현장 운영까지 행사를 끝까지 책임진 경험",
      "예산과 일정 안에서 섭외와 협상을 해낸 사례",
      "돌발 상황에 대처한 순발력과 추진력"
    ],
    "ncs": "스포츠이벤트, 이벤트기획",
    "sources": [
      {
        "label": "커리어넷 직업백과 행사기획자",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=951"
      },
      {
        "label": "커리어넷 직업백과 스포츠에이전트",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=1088"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "건축 설계 디자이너": {
    "does": [
      "건축주 요구와 대지, 법규 조사, 설계 기획 보조",
      "평면, 입면, 단면 계획과 배치 계획 도면 작성",
      "2D 도면 작성과 3D 모델링, BIM 설계 참여",
      "설계 프레젠테이션 자료 제작, 관계사 협력설계 지원"
    ],
    "skills": [
      "건축 계획과 조형 감각",
      "CAD 2D 도면 작성",
      "3D 모델링과 BIM 활용",
      "건축 법규와 재료 이해",
      "공간지각력과 수리논리력",
      "프레젠테이션과 협업"
    ],
    "certs": [
      {
        "name": "건축사",
        "issuer": "국토교통부(대한건축사협회 시행)",
        "type": "국가전문자격",
        "note": "설계와 감리 책임, 건축사사무소 개설에 필요, 응시 요건은 대한건축사협회 공고 기준 확인"
      },
      {
        "name": "건축기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "건축산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "실내건축기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "설계 콘셉트와 배치 계획 담당",
      "도면 작성과 3D 모델링 담당",
      "패널과 프레젠테이션 제작 담당"
    ],
    "quant": [
      "건축기사 취득",
      "건축 설계 공모전 입상 실적",
      "건축학 인증 교육과정 이수",
      "CAD, BIM 프로그램 활용 능력 증빙"
    ],
    "qual": [
      "설계 스튜디오 작품 포트폴리오",
      "건축 설계 공모전 참가",
      "건축사사무소 인턴 경험",
      "답사와 모형 제작 경험"
    ],
    "resumePoints": [
      "대지와 요구 조건을 분석해 설계안으로 풀어낸 과정",
      "도면과 모델링으로 설계를 정확히 표현한 역량",
      "팀 설계에서 협업하고 마감일을 지킨 책임감"
    ],
    "ncs": "건축설계, 실내건축설계",
    "sources": [
      {
        "label": "커리어넷 직업백과 건축사",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=1277"
      },
      {
        "label": "커리어넷 직업백과 건축공학기술자",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=46"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "패션 디자이너": {
    "does": [
      "시즌 트렌드, 소재, 색상 자료 수집과 분석",
      "디자인 기획과 일러스트 작성, 샘플 제작서 작성",
      "시제품 개발과 피팅, 품평 후 수정",
      "생산 준비 지원과 테크니컬 디자인 자료 작성"
    ],
    "skills": [
      "패션 트렌드 분석",
      "디자인 발상과 일러스트",
      "소재와 봉제 지식",
      "패턴과 테크니컬 디자인 이해",
      "색채 감각과 조형미",
      "협동심과 인내심"
    ],
    "certs": [
      {
        "name": "패션디자인산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 패션디자이너 항목의 관련 자격"
      },
      {
        "name": "섬유디자인산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 패션디자이너 항목의 관련 자격"
      },
      {
        "name": "패션머천다이징산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "컬러리스트산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "컬렉션 콘셉트와 디자인 기획 담당",
      "샘플 제작과 피팅 수정 담당",
      "소재 조사와 생산 일정 관리 담당"
    ],
    "quant": [
      "패션디자인산업기사 취득",
      "컬러리스트산업기사 취득",
      "패션 디자인 공모전 입상 실적",
      "일러스트, 패턴 CAD 프로그램 활용 능력 증빙"
    ],
    "qual": [
      "졸업 패션쇼, 전시 작품 포트폴리오",
      "패션 디자인 공모전 참가",
      "의류 브랜드 인턴 경험",
      "개인 브랜드나 소규모 제작 판매 경험"
    ],
    "resumePoints": [
      "트렌드 분석에서 시제품까지 디자인 과정을 완성한 경험",
      "소재와 봉제를 이해하고 실제 옷으로 구현한 역량",
      "팀 작업에서 협동심과 인내심을 보여준 사례"
    ],
    "ncs": "패션디자인",
    "sources": [
      {
        "label": "커리어넷 직업백과 패션디자이너",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=344"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "그래픽 디자이너": {
    "does": [
      "의뢰 내용 파악과 디자인 콘셉트, 작업 방향 설정",
      "레이아웃 구성과 사진, 그림, 텍스트 배치로 시안 제작",
      "내부 검토와 의뢰자 피드백 반영, 수정",
      "인쇄와 제작 공정 점검, 디자인 자료화"
    ],
    "skills": [
      "색채와 조형 감각",
      "타이포그래피와 레이아웃",
      "Photoshop, Illustrator 등 그래픽 도구 활용",
      "시각디자인 리서치와 전략 수립",
      "인쇄와 제작 공정 이해",
      "의뢰자와 팀원 소통"
    ],
    "certs": [
      {
        "name": "시각디자인산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 시각디자이너 항목의 관련 자격"
      },
      {
        "name": "시각디자인기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "컴퓨터그래픽스운용기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 시각디자이너 항목의 관련 자격"
      },
      {
        "name": "GTQ(그래픽기술자격) 1급",
        "issuer": "한국생산성본부(KPC)",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 제2024-1호 공인(1급, 2급), Photoshop 실기"
      },
      {
        "name": "컬러리스트산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "포스터, 카드뉴스 등 시각물 제작 담당",
      "로고와 브랜드 아이덴티티 디자인 담당",
      "발표 자료와 보고서 레이아웃 담당"
    ],
    "quant": [
      "시각디자인산업기사 취득",
      "컴퓨터그래픽스운용기능사 취득",
      "GTQ 1급 취득",
      "디자인 공모전 입상 실적"
    ],
    "qual": [
      "작업 과정이 보이는 디자인 포트폴리오",
      "디자인 공모전 참가",
      "디자인 에이전시, 기업 디자인팀 인턴",
      "학교 행사나 동아리 홍보물 제작 경험"
    ],
    "resumePoints": [
      "정보를 보는 사람이 이해하기 쉽게 시각화한 사례",
      "의뢰자 피드백을 받아 시안을 수정하며 완성한 과정",
      "마감과 제작 공정을 지키며 협업한 태도"
    ],
    "ncs": "시각디자인",
    "sources": [
      {
        "label": "커리어넷 직업백과 시각디자이너",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=937"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "한국생산성본부 GTQ 소개",
        "url": "https://license.kpc.or.kr/nasec/qlfint/qlfint/selectGtqinfomg.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "UI·UX 디자이너": {
    "does": [
      "사용자 리서치와 요구 분석, 서비스 문제점 파악",
      "정보 구조와 화면 흐름 설계, 와이어프레임 작성",
      "GUI 상세 디자인과 프로토타입 제작, 사용성 테스트",
      "디자인 가이드 제작과 개발 구현 결과 점검"
    ],
    "skills": [
      "사용자 리서치와 요구 분석",
      "UI 아키텍처와 화면 설계",
      "프로토타이핑 도구 활용",
      "사용성 테스트와 결과 분석",
      "디자인 시스템과 가이드 이해",
      "개발자, 기획자와의 협업"
    ],
    "certs": [
      {
        "name": "웹디자인기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "시각디자인산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "컴퓨터그래픽스운용기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "GTQ(그래픽기술자격) 1급",
        "issuer": "한국생산성본부(KPC)",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 제2024-1호 공인(1급, 2급)"
      }
    ],
    "projectRole": [
      "사용자 조사와 요구 정리 담당",
      "화면 설계와 프로토타입 제작 담당",
      "사용성 테스트와 개선안 정리 담당"
    ],
    "quant": [
      "웹디자인기능사 취득",
      "시각디자인산업기사 취득",
      "앱, 웹 서비스 공모전 입상 실적",
      "프로토타이핑 도구 활용 능력 증빙"
    ],
    "qual": [
      "실제 사용자 테스트를 거친 앱, 웹 디자인 프로젝트",
      "개발자와 협업해 배포까지 간 팀 프로젝트",
      "서비스 디자인, 앱 공모전 참가",
      "IT 기업 디자인 인턴"
    ],
    "resumePoints": [
      "사용자 조사로 문제를 찾고 해결책을 설계한 과정",
      "프로토타입과 테스트로 디자인을 검증하고 개선한 경험",
      "논리적 사고와 창의력으로 새로운 방식을 제안한 사례"
    ],
    "ncs": "디지털디자인, UI/UX엔지니어링",
    "sources": [
      {
        "label": "커리어넷 직업백과 UX 디자인 컨설턴트",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10003"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "한국생산성본부 GTQ 소개",
        "url": "https://license.kpc.or.kr/nasec/qlfint/qlfint/selectGtqinfomg.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "영상·모션 디자이너": {
    "does": [
      "광고, 방송, 영화용 영상 그래픽 제작 기획과 사전제작",
      "자막, 도형, 3D 입체 영상, 특수효과 디자인",
      "모델링, 애니메이션, 이펙트, 라이팅 작업",
      "컴포지팅과 최종 합성, 제작 후 관리"
    ],
    "skills": [
      "모션그래픽 도구 활용",
      "3D 모델링과 애니메이션",
      "이펙트와 컴포지팅",
      "타이포그래피와 색채 감각",
      "영상 연출 흐름 이해",
      "창의력과 예술시각능력"
    ],
    "certs": [
      {
        "name": "멀티미디어콘텐츠제작전문가",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "컴퓨터그래픽스운용기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷 광고디자이너 항목의 관련 자격"
      },
      {
        "name": "시각디자인산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "GTQ(그래픽기술자격) 1급",
        "issuer": "한국생산성본부(KPC)",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 제2024-1호 공인(1급, 2급)"
      }
    ],
    "projectRole": [
      "인트로, 자막, 모션그래픽 제작 담당",
      "3D 그래픽과 특수효과 담당",
      "홍보 영상 편집과 합성 담당"
    ],
    "quant": [
      "멀티미디어콘텐츠제작전문가 취득",
      "컴퓨터그래픽스운용기능사 취득",
      "영상 공모전 입상 실적",
      "After Effects, Cinema 4D 등 도구 활용 능력 증빙"
    ],
    "qual": [
      "모션그래픽 쇼릴 포트폴리오",
      "영상 공모전, 광고 공모전 참가",
      "방송사나 프로덕션 그래픽 인턴",
      "학교 행사 영상과 홍보 모션그래픽 제작 경험"
    ],
    "resumePoints": [
      "기획 의도를 움직이는 그래픽으로 표현한 사례",
      "모델링부터 컴포지팅까지 제작 과정을 완성한 역량",
      "연출자와 협의하며 수정을 반영한 협업 태도"
    ],
    "ncs": "영상그래픽, 디지털디자인",
    "sources": [
      {
        "label": "커리어넷 직업백과 광고디자이너",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=285"
      },
      {
        "label": "커리어넷 통합검색 컴퓨터그래픽디자이너",
        "url": "https://www.career.go.kr/cloud/w/search/intro?text=%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B7%B8%EB%9E%98%ED%94%BD%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "한국생산성본부 GTQ 소개",
        "url": "https://license.kpc.or.kr/nasec/qlfint/qlfint/selectGtqinfomg.do"
      }
    ]
  },
  "애니메이터": {
    "does": [
      "시나리오 기반 콘티와 스토리보드 제작",
      "캐릭터, 배경, 소품 디자인과 색채 디자인",
      "2D 레이아웃과 애니메이팅, 채색",
      "3D 캐릭터 제작, 애니메이팅, 렌더링과 후반제작"
    ],
    "skills": [
      "드로잉과 동작 관찰력",
      "2D, 3D 애니메이팅",
      "Photoshop, Maya, 3ds Max 등 도구 활용",
      "스토리보드와 연출 이해",
      "상상력과 창의성",
      "팀 제작 공정 이해"
    ],
    "certs": [
      {
        "name": "컴퓨터그래픽스운용기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷은 애니메이터에 요구되는 국가공인 자격증이 없다고 안내, 보조 증빙용"
      },
      {
        "name": "멀티미디어콘텐츠제작전문가",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "캐릭터와 배경 디자인 담당",
      "스토리보드와 애니메이팅 담당",
      "후반 합성과 사운드 작업 담당"
    ],
    "quant": [
      "컴퓨터그래픽스운용기능사 취득",
      "애니메이션 공모전, 영화제 출품 실적",
      "2D, 3D 애니메이션 도구 활용 능력 증빙"
    ],
    "qual": [
      "단편 애니메이션 완성 포트폴리오",
      "애니메이션 공모전, 학생 영화제 참가",
      "애니메이션 제작사 인턴",
      "팀 제작에서 맡은 공정을 끝까지 책임진 경험"
    ],
    "resumePoints": [
      "시나리오를 콘티와 움직임으로 구현한 과정",
      "캐릭터의 동작을 관찰하고 생생하게 표현한 역량",
      "제작 공정에서 팀과 협업하고 일정을 지킨 태도"
    ],
    "ncs": "애니메이션콘텐츠제작",
    "sources": [
      {
        "label": "커리어넷 직업백과 애니메이터",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=441"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "캘리그래피·그래픽 디자이너": {
    "does": [
      "로고, 타이틀, 패키지, 광고용 손글씨 작업",
      "붓, 펜 글씨를 스캔해 디지털 보정과 벡터화",
      "글씨와 이미지, 레이아웃을 결합한 시각물 제작",
      "의뢰자 피드백 반영과 인쇄, 제작 공정 점검"
    ],
    "skills": [
      "서예와 손글씨 표현력",
      "타이포그래피와 레이아웃",
      "Photoshop, Illustrator 활용",
      "색채와 조형 감각",
      "디자인 시안 개발과 수정",
      "의뢰자 소통"
    ],
    "certs": [
      {
        "name": "시각디자인산업기사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "컴퓨터그래픽스운용기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "GTQ(그래픽기술자격) 1급",
        "issuer": "한국생산성본부(KPC)",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 제2024-1호 공인(1급, 2급)"
      }
    ],
    "projectRole": [
      "행사 타이틀과 로고 손글씨 제작 담당",
      "포스터, 굿즈 시각 디자인 담당",
      "전시, 공모전 출품작 디지털 보정 담당"
    ],
    "quant": [
      "컴퓨터그래픽스운용기능사 취득",
      "GTQ 1급 취득",
      "서예, 캘리그라피 공모전 입상 실적",
      "시각디자인산업기사 취득"
    ],
    "qual": [
      "손글씨와 디지털 작업을 함께 담은 포트폴리오",
      "서예, 캘리그라피 전시와 공모전 참가",
      "상업 의뢰 작업이나 굿즈 제작 판매 경험",
      "디자인 스튜디오 인턴"
    ],
    "resumePoints": [
      "손글씨를 상업 시각물로 완성한 사례",
      "의뢰 의도를 글씨와 레이아웃으로 표현하고 수정한 과정",
      "서예 기반기와 디지털 도구를 함께 다루는 역량"
    ],
    "ncs": "시각디자인",
    "sources": [
      {
        "label": "커리어넷 직업백과 시각디자이너",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=937"
      },
      {
        "label": "커리어넷 통합검색 캘리그라피(직업인 인터뷰)",
        "url": "https://www.career.go.kr/cloud/w/search/intro?text=%EC%BA%98%EB%A6%AC%EA%B7%B8%EB%9D%BC%ED%94%BC"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "한국생산성본부 GTQ 소개",
        "url": "https://license.kpc.or.kr/nasec/qlfint/qlfint/selectGtqinfomg.do"
      }
    ]
  },
  "웹툰 작가": {
    "does": [
      "소재 발굴과 취재, 작품 기획과 세계관, 캐릭터 설정",
      "스토리 구성과 콘티(스토리전개도) 작업",
      "태블릿과 프로그램으로 스케치, 데생, 채색, 효과 작업",
      "편집자 회의와 수정 후 웹툰 플랫폼 연재"
    ],
    "skills": [
      "스토리 구성과 연출력",
      "캐릭터와 배경 작화",
      "디지털 드로잉 도구 활용",
      "콘티와 장면 연출",
      "연재 일정 관리와 지구력",
      "저작권 기본 이해"
    ],
    "certs": [],
    "projectRole": [
      "스토리와 콘티 담당",
      "캐릭터 디자인과 작화 담당",
      "채색과 편집, 플랫폼 업로드 담당"
    ],
    "quant": [
      "완결 또는 연재 중인 작품 수와 회차 기록",
      "웹툰 공모전, 플랫폼 신인 공모 입상 실적",
      "디지털 드로잉 도구 활용 능력 증빙"
    ],
    "qual": [
      "플랫폼 도전 연재나 개인 SNS 연재 경험",
      "웹툰 공모전 참가",
      "기성 작가 어시스턴트 경험",
      "동아리 합작 단편 제작"
    ],
    "resumePoints": [
      "독창적인 이야기와 캐릭터를 만든 기획력",
      "콘티부터 완성 원고까지 혼자 완성한 제작 역량",
      "연재 일정을 지키며 꾸준히 작업한 지구력"
    ],
    "ncs": "만화콘텐츠제작",
    "sources": [
      {
        "label": "커리어넷 직업백과 웹툰작가",
        "url": "https://www.career.go.kr/cloud/w/job/view?seq=10072"
      },
      {
        "label": "커리어넷 직업백과 만화가",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=291"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      }
    ]
  },
  "방송·공연 PD": {
    "does": [
      "아이템 선정과 자료 조사, 프로그램 기획과 구성",
      "작가, 출연자, 제작진 캐스팅과 섭외",
      "촬영 일정, 장소, 무대, 소품 준비와 리허설, 촬영 지휘",
      "제작비 검토와 조정, 편집과 종합편집 점검"
    ],
    "skills": [
      "기획력과 독창적 아이디어",
      "통솔력과 위기 대처 능력",
      "촬영과 편집 흐름 이해",
      "예산과 일정 관리",
      "섭외와 대인관계능력",
      "폭넓은 문화 사회 관심"
    ],
    "certs": [
      {
        "name": "컨벤션기획사 2급",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "공연, 행사 기획 쪽 증빙용, 커리어넷 행사기획자 항목의 관련 자격"
      },
      {
        "name": "멀티미디어콘텐츠제작전문가",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      }
    ],
    "projectRole": [
      "기획안 작성과 제작 총괄 담당",
      "출연진 섭외와 일정 관리 담당",
      "촬영 현장 지휘와 편집 점검 담당"
    ],
    "quant": [
      "공인 영어 성적(TOEIC 등, 방송사 채용 요구 사례)",
      "KBS한국어능력시험 성적(KBS 지원 시 필수)",
      "영상, 공연 공모전 입상 실적",
      "직접 제작한 프로그램과 공연 편수 기록"
    ],
    "qual": [
      "학교 방송국, 영상 동아리에서 연출 경험",
      "단편 영상이나 공연을 기획부터 완성까지 이끈 경험",
      "방송사, 프로덕션, 공연 기획사 인턴이나 FD 경험",
      "축제와 행사 자원봉사"
    ],
    "resumePoints": [
      "기획 의도를 세우고 팀을 이끌어 작품을 완성한 과정",
      "예산과 일정 안에서 섭외와 현장 돌발 상황을 해결한 사례",
      "사회와 문화 전반에 대한 관심과 독창적 아이디어"
    ],
    "ncs": "방송콘텐츠제작, 영상연출, 문화콘텐츠기획",
    "sources": [
      {
        "label": "커리어넷 직업백과 방송연출가",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=301"
      },
      {
        "label": "커리어넷 직업백과 행사기획자",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=951"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "영상 편집자": {
    "does": [
      "대본과 촬영본 분석, 편집 순서와 흐름 검토",
      "편집 환경 구성과 컷 편집, 효과 편집",
      "자막, 오디오 작업, 색보정",
      "종합편집과 후반작업 관리, 수정 반영"
    ],
    "skills": [
      "편집 도구 활용(Premiere Pro 등)",
      "극 구성과 리듬 감각",
      "자막과 모션그래픽 기초",
      "오디오 작업과 색보정",
      "촬영, 연출, 음향 등 제작 전반 이해",
      "꼼꼼함과 야간 작업을 버틸 체력"
    ],
    "certs": [
      {
        "name": "멀티미디어콘텐츠제작전문가",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격",
        "note": "커리어넷은 편집기사에 요구되는 국가공인 자격증이 없다고 안내, 보조 증빙용"
      },
      {
        "name": "컴퓨터그래픽스운용기능사",
        "issuer": "한국산업인력공단",
        "type": "국가기술자격"
      },
      {
        "name": "GTQ(그래픽기술자격) 1급",
        "issuer": "한국생산성본부(KPC)",
        "type": "국가공인 민간자격",
        "note": "산업통상자원부 제2024-1호 공인(1급, 2급), 썸네일과 자막 이미지 제작용"
      }
    ],
    "projectRole": [
      "촬영본 정리와 컷 편집 담당",
      "자막, 효과, 색보정 담당",
      "최종 출력과 플랫폼별 포맷 변환 담당"
    ],
    "quant": [
      "멀티미디어콘텐츠제작전문가 취득",
      "GTQ 1급 취득",
      "편집한 영상 편수와 공모전 입상 실적",
      "공인 영어 성적(방송사 공채 제출 사례)"
    ],
    "qual": [
      "편집 전후 비교가 보이는 쇼릴 포트폴리오",
      "학교 방송국, 영상 동아리 편집 담당 경험",
      "유튜브 채널이나 행사 영상 편집 경험",
      "방송사, 프로덕션 편집 보조 인턴"
    ],
    "resumePoints": [
      "대본과 연출 의도를 이해해 흐름 있게 편집한 사례",
      "효과, 오디오, 색보정까지 완성도를 높인 역량",
      "긴 작업 시간과 수정 요청을 꼼꼼하게 소화한 태도"
    ],
    "ncs": "영상편집",
    "sources": [
      {
        "label": "커리어넷 직업백과 편집기사",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=346"
      },
      {
        "label": "NCS 국가직무능력표준 능력단위 목록",
        "url": "https://www.ncs.go.kr/unity/th03/excelDownLoad.do"
      },
      {
        "label": "한국생산성본부 GTQ 소개",
        "url": "https://license.kpc.or.kr/nasec/qlfint/qlfint/selectGtqinfomg.do"
      },
      {
        "label": "Q-Net 국가자격 종목별 상세정보",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId="
      }
    ]
  },
  "공연·행사 기획자": {
    "does": [
      "공연, 축제, 전시회, 국제회의 같은 행사의 틀 잡기와 섭외, 현장 실행",
      "설문과 시장조사 자료 정리, 팀 회의용 기획안 작성",
      "예산안 작성, 인력 구성, 홍보자료 준비와 참가자 모집",
      "숙박, 운송, 음향과 영상 장비, 인쇄물, 보안 같은 행사 서비스 조율"
    ],
    "skills": [
      "기획서 작성",
      "예산안 작성과 분석",
      "공연, 전시, 축제에 대한 지식",
      "문화예술 트렌드 파악",
      "섭외와 대인관계",
      "현장 안전점검과 위기 대처"
    ],
    "certs": [
      {
        "name": "컨벤션기획사 2급",
        "issuer": "한국산업인력공단(관련부처 문화체육관광부)",
        "type": "국가기술자격",
        "note": "커리어넷 행사기획자 관련 자격, 과정평가형 취득 가능 종목"
      },
      {
        "name": "문화예술교육사 2급",
        "issuer": "한국문화예술교육진흥원(문화체육관광부)",
        "type": "국가전문자격",
        "note": "예술 전공자는 직무역량 5과목(10학점) 이수, 비전공자는 예술전문성 10과목(30학점) 추가"
      }
    ],
    "projectRole": [
      "행사 총괄 기획과 일정 관리 담당",
      "예산과 섭외 담당",
      "홍보와 참가자 모집 담당"
    ],
    "quant": [
      "컨벤션기획사 2급 취득",
      "문화예술교육사 2급 교육과정 이수",
      "학력 요건 확인: 커리어넷 기준 전문대졸 이상, 전공 제한 없음",
      "공공 문화재단 채용 전형 파악: 서류접수, 필기전형, 서류전형, 면접전형 순(경기문화재단, 한국도자재단 직무설명자료)"
    ],
    "qual": [
      "공연이나 축제 자원봉사, 인턴으로 현장 경험 쌓기",
      "교내 공연, 축제를 직접 기획하고 운영한 경험",
      "기획서와 예산안을 실제로 써서 제출한 공모전 경험",
      "행사 사후 결과 보고서와 관객 반응 정리 경험"
    ],
    "resumePoints": [
      "기획 의도를 정확히 전달하고 예산을 적정하게 세운 경험(NCS 문화예술기획 직무수행태도)",
      "스태프와 예술가를 섭외하고 적극적으로 소통한 과정",
      "참가자 안전을 최우선으로 두고 위기 상황에 유연하게 대처한 사례"
    ],
    "ncs": "문화·예술기획, 이벤트기획, 회의기획",
    "sources": [
      {
        "label": "커리어넷 직업백과 행사기획자",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=951"
      },
      {
        "label": "NCS 직업정보 행사 기획자(연계 NCS 분류)",
        "url": "https://www.ncs.go.kr/blind/hbr01/hbr0102/selectJobInfoDetail.do?jobCd=0244"
      },
      {
        "label": "Q-Net 국가자격 컨벤션기획사2급",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=9536"
      },
      {
        "label": "문화예술교육사 자격요건(한국문화예술교육진흥원)",
        "url": "https://acei.arte.or.kr/contents/requirements.do"
      },
      {
        "label": "경기문화재단 직무설명자료 문화행정직(NCS 문화·예술기획)",
        "url": "https://ggcf.kr/attachment/1295/download"
      }
    ]
  },
  "문화콘텐츠 기획자": {
    "does": [
      "문화예술 트렌드와 사회 환경 자료 조사, 기획 전략 초안 작성",
      "콘텐츠와 프로그램 기획서, 예산안 작성",
      "작품과 콘텐츠 선정, 실행 일정과 장소 계획 수립",
      "홍보 관리와 실행 후 정산, 사후관리"
    ],
    "skills": [
      "기획서 작성",
      "문헌자료와 통계 검색, 분석",
      "예산안 작성과 분석",
      "문화예술 트렌드와 시장 이해",
      "일정과 장소 조율",
      "콘셉트와 메시지 개발"
    ],
    "certs": [
      {
        "name": "문화예술교육사 2급",
        "issuer": "한국문화예술교육진흥원(문화체육관광부)",
        "type": "국가전문자격",
        "note": "문화예술 교육 프로그램 기획 쪽으로 갈 때 유리"
      },
      {
        "name": "컨벤션기획사 2급",
        "issuer": "한국산업인력공단(관련부처 문화체육관광부)",
        "type": "국가기술자격",
        "note": "행사, 전시형 콘텐츠 기획 쪽"
      }
    ],
    "projectRole": [
      "콘텐츠 기획과 기획서 작성 담당",
      "자료 조사와 트렌드 분석 담당",
      "홍보와 사후 정산 담당"
    ],
    "quant": [
      "문화예술교육사 2급 교육과정 이수",
      "컨벤션기획사 2급 취득",
      "공공 문화재단 채용 전형 파악: 서류접수, 필기전형, 서류전형, 면접전형 순(경기문화재단, 한국도자재단 직무설명자료)",
      "기초 외국어 능력: 한국문화예술위원회 학예 채용은 어학성적을 평가에 포함"
    ],
    "qual": [
      "문화예술 공모지원사업이나 축제에 기획서를 내 본 경험",
      "콘텐츠 기획 공모전 참여와 기획서 포트폴리오",
      "문화재단, 콘텐츠 기관 인턴이나 서포터즈",
      "자료 조사부터 정산까지 한 사이클을 맡은 프로젝트"
    ],
    "resumePoints": [
      "정확한 데이터 수집과 기존 공모 분석으로 기획을 세운 과정(NCS 문화예술기획 직무수행태도)",
      "적극적이고 창의적인 사고로 콘셉트를 개발하고 끝까지 추진한 사례",
      "기획 의도를 정확히 전달하고 예산 항목 전체를 파악한 경험"
    ],
    "ncs": "문화콘텐츠기획, 문화·예술기획",
    "sources": [
      {
        "label": "NCS 국가직무능력표준 분야별 검색(08 문화콘텐츠 > 01 문화콘텐츠기획)",
        "url": "https://m.ncs.go.kr/mobile/rm08/ncsField.do?ncsLclasCd=08&ncsMclasCd=03&ncsSclasCd=01"
      },
      {
        "label": "NCS 국가직무능력표준 분야별 검색(08 문화·예술 > 01 문화예술경영)",
        "url": "https://m.ncs.go.kr/mobile/rm08/ncsField.do?ncsLclasCd=08&ncsMclasCd=01&ncsSclasCd=01"
      },
      {
        "label": "경기문화재단 직무설명자료 문화행정직(NCS 문화·예술기획 필요지식, 기술, 태도)",
        "url": "https://ggcf.kr/attachment/1295/download"
      },
      {
        "label": "한국도자재단 직무설명자료 일반직 도자문화기획(채용공고 첨부)",
        "url": "https://dym-upload.saramin.co.kr/upload/dym2_5/130/1683/filedown/2020-04-13/kocef_200413_02.pdf"
      },
      {
        "label": "문화예술교육사 자격요건(한국문화예술교육진흥원)",
        "url": "https://acei.arte.or.kr/contents/requirements.do"
      }
    ]
  },
  "작가·스토리 기획자": {
    "does": [
      "주제 선정, 소재와 자료 수집, 줄거리와 등장인물 구상",
      "소설, 시나리오, 방송 대본 집필과 기존 작품 각색",
      "방송 프로그램의 기획과 구성, 자료조사와 출연진 섭외(구성작가 막내 단계)",
      "연출자, 제작진과 협의해 원고 수정"
    ],
    "skills": [
      "사람과 사물을 세밀하게 관찰하는 힘",
      "문장력과 언어감각",
      "논리와 감성을 갖춘 문장 구성",
      "영상 감각(시나리오 분야)",
      "아이디어를 계속 내는 인내심과 스트레스 대처",
      "출연자, 연출자와의 원만한 관계"
    ],
    "certs": [
      {
        "name": "게임기획전문가",
        "issuer": "한국콘텐츠진흥원",
        "type": "국가기술자격",
        "note": "게임 시나리오, 게임 기획 분야로 갈 때만 해당"
      }
    ],
    "projectRole": [
      "시나리오와 스토리 집필 담당",
      "자료조사와 섭외 담당",
      "기획안과 구성안 작성 담당"
    ],
    "quant": [
      "신춘문예, 문학잡지 추천 등 공식 등단 경로 도전(소설가)",
      "한국방송작가협회 연수 프로그램, 방송사 아카데미 구성작가 과정 이수(구성작가)",
      "학력 제한 없음, 문학 관련 학과 졸업이 유리(커리어넷)"
    ],
    "qual": [
      "완결된 작품 포트폴리오(단편, 시나리오, 대본)",
      "교내 방송국이나 영상 동아리에서 대본 집필 경험",
      "공모전 출품과 문학 창작 동아리 활동",
      "리서처(막내작가)처럼 자료조사와 섭외를 맡은 경험"
    ],
    "resumePoints": [
      "관찰한 내용을 글로 표현한 구체적 작품 사례",
      "새 아이디어를 꾸준히 내고 수정 과정을 견딘 경험",
      "연출자, 출연자 등 많은 사람과 협업해 원고를 완성한 과정"
    ],
    "ncs": "방송콘텐츠제작, 영화콘텐츠제작, 문화콘텐츠기획",
    "sources": [
      {
        "label": "커리어넷 직업백과 소설가",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=973"
      },
      {
        "label": "커리어넷 직업백과 영화시나리오작가",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=914"
      },
      {
        "label": "커리어넷 직업백과 구성작가",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=260"
      },
      {
        "label": "NCS 직업정보 작가(연계 NCS 분류)",
        "url": "https://www.ncs.go.kr/blind/hbr01/hbr0102/selectJobInfoDetail.do?jobCd=4111"
      },
      {
        "label": "커리어넷 직업백과 게임기획자(게임기획전문가 자격)",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=923"
      }
    ]
  },
  "기자·에디터": {
    "does": [
      "사건, 사고 현장 취재와 기사 작성, 제목과 소제목 뽑기",
      "원고 교정, 편집 방향 협의, 기사 배치",
      "출판물 시장 동향 조사와 세부 기획안 작성(에디터)",
      "작가 섭외와 원고 검토, 삽화와 사진 작업 요청(에디터)"
    ],
    "skills": [
      "독자가 이해하기 쉽고 편견 없는 글쓰기",
      "사회현상의 객관적 분석",
      "폭넓은 분야 지식",
      "다양한 계층과의 의사소통",
      "시장 흐름과 독자 요구 파악",
      "원고 교열과 편집"
    ],
    "certs": [],
    "projectRole": [
      "취재와 기사 작성 담당",
      "교정, 교열과 편집 담당",
      "기획안과 콘텐츠 구성 담당"
    ],
    "quant": [
      "언론사 채용 전형 대비: 서류심사, 필기시험, 면접(커리어넷)",
      "학력 요건 확인: 전문대졸 이상, 방송사와 신문사는 대졸 이상 요구가 많음(커리어넷)",
      "출판 분야는 보통 대학교 졸업 이상 학력 필요(커리어넷 출판물기획전문가)"
    ],
    "qual": [
      "학교 신문, 교지, 학생 언론 활동으로 취재부터 편집까지 경험",
      "교열과 편집 등 책 제작 공정 실무 경험(출판 인턴)",
      "꾸준한 기사, 칼럼 포트폴리오",
      "다양한 분야 독서와 사회 이슈 분석 글쓰기"
    ],
    "resumePoints": [
      "편견 없이 사실을 전달한 글쓰기 사례와 공정성에 대한 태도",
      "불규칙한 일정을 견디며 적극적으로 취재한 경험",
      "독자 요구를 분석해 기획과 편집에 반영한 과정"
    ],
    "ncs": "출판기획, 편집",
    "sources": [
      {
        "label": "커리어넷 직업백과 기자",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=262"
      },
      {
        "label": "커리어넷 직업백과 출판물기획전문가",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=10023"
      },
      {
        "label": "NCS 직업정보 출판물 전문가(연계 NCS 분류)",
        "url": "https://www.ncs.go.kr/blind/hbr01/hbr0102/selectJobInfoDetail.do?jobCd=4113"
      },
      {
        "label": "커리어넷 주니어 직업정보 기자",
        "url": "https://www.career.go.kr/cnet/app/base/job/junior/juniorJobView19.m"
      }
    ]
  },
  "역사 콘텐츠 기획자": {
    "does": [
      "역사, 문화재 관련 소장자료 조사와 연구, 문헌자료 검색",
      "전시와 교육 프로그램 기획안 작성, 콘텐츠 선정",
      "리플렛, 도록, 설명패널 등 제작물 관리",
      "웹사이트, SNS로 역사 콘텐츠 홍보와 관객 개발"
    ],
    "skills": [
      "역사와 문화이론, 정책 기본 지식",
      "문헌자료 조사와 분석",
      "전시기획서와 사업계획서 작성",
      "교육 대상별 특성 이해",
      "국외 자료를 읽는 외국어 능력",
      "웹사이트, SNS 운영"
    ],
    "certs": [
      {
        "name": "박물관 및 미술관 준학예사",
        "issuer": "문화체육관광부(시험 시행 한국산업인력공단)",
        "type": "국가전문자격",
        "note": "시험 합격 후 학사는 경력인정대상기관 실무경력 1년 이상 필요"
      },
      {
        "name": "문화예술교육사 2급",
        "issuer": "한국문화예술교육진흥원(문화체육관광부)",
        "type": "국가전문자격",
        "note": "역사, 문화 교육 프로그램 기획 쪽"
      }
    ],
    "projectRole": [
      "역사 자료 조사와 고증 담당",
      "전시, 교육 콘텐츠 기획서 작성 담당",
      "홍보물과 SNS 콘텐츠 담당"
    ],
    "quant": [
      "박물관 및 미술관 준학예사 시험 합격",
      "문화예술교육사 2급 교육과정 이수",
      "어학성적 준비: 한국문화예술위원회 학예 채용은 전공과 어학성적을 평가에 포함",
      "박물관, 미술관 채용은 4년제 관련 전공자나 학예사 자격 소지자로 제한하는 경우가 많음(커리어넷)"
    ],
    "qual": [
      "박물관, 미술관 인턴십이나 학예 분야 자원봉사(준학예사 실무경력에 일부 인정)",
      "지역 역사 자료로 전시나 답사 프로그램을 직접 기획한 경험",
      "역사 콘텐츠 공모전, 역사 동아리 활동",
      "도록이나 설명패널, 카드뉴스 형태의 제작물 포트폴리오"
    ],
    "resumePoints": [
      "문화유산에 대한 윤리의식과 학문적 태도(한국문화예술위원회 학예 직무기술서)",
      "전시 목적에 맞게 자료를 선별하고 전문가와 협력한 과정",
      "해당 분야에 대한 지속적 관심과 조사연구 경험"
    ],
    "ncs": "학예, 문화콘텐츠기획, 문화·예술기획",
    "sources": [
      {
        "label": "커리어넷 직업백과 학예사(큐레이터)",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=348"
      },
      {
        "label": "국립중앙박물관 학예사 자격제도(준학예사 취득 요건)",
        "url": "https://www.museum.go.kr/MUSEUM/contents/M0705010000.do"
      },
      {
        "label": "한국문화예술위원회 직무기술서 학예(NCS 학예, 전시기획)",
        "url": "https://www.arko.or.kr/board/download/d13130a3e1764a24b50a7168b9d21185"
      },
      {
        "label": "NCS 직업정보 학예사 및 문화재 보존원(연계 NCS 분류)",
        "url": "https://www.ncs.go.kr/blind/hbr01/hbr0102/selectJobInfoDetail.do?jobCd=4131"
      },
      {
        "label": "문화예술교육사 자격요건(한국문화예술교육진흥원)",
        "url": "https://acei.arte.or.kr/contents/requirements.do"
      }
    ]
  },
  "기자": {
    "does": [
      "사건, 사고 현장 취재와 정치, 경제, 사회 현상 분석",
      "취재 내용으로 기사와 사건 보고서 작성",
      "핵심 정보 중심으로 제목과 소제목 뽑기",
      "원고 교정과 편집국 협의에 따른 기사 배치"
    ],
    "skills": [
      "독자가 이해하기 쉽고 편견 없는 글쓰기",
      "사회현상의 객관적 분석",
      "정치, 경제, 사회, 문화 전반의 폭넓은 지식",
      "다양한 계층과의 의사소통",
      "불규칙한 생활을 견디는 체력",
      "정의감과 공정성"
    ],
    "certs": [],
    "projectRole": [
      "취재와 인터뷰 담당",
      "기사 작성과 팩트체크 담당",
      "편집과 기사 배치 담당"
    ],
    "quant": [
      "언론사 채용 전형 대비: 서류심사, 필기시험, 면접, 방송기자는 카메라테스트(커리어넷)",
      "학력 요건 확인: 전문대졸 이상, 방송사와 신문사는 대졸 이상 요구가 많음(커리어넷)",
      "의학, 법학 등 전문 분야 기자는 관련 자격이나 전공을 요구하기도 함(커리어넷)"
    ],
    "qual": [
      "학교 신문이나 지역 학생 신문 참여로 취재, 글쓰기, 편집 과정 익히기",
      "정치, 사회 이슈를 분석한 기사와 칼럼 포트폴리오",
      "방송아카데미 등 방송 관련 전문기관 교육",
      "사람을 많이 만나는 활동(인터뷰, 토론 동아리)"
    ],
    "resumePoints": [
      "편견 없이 사실을 전달한 글쓰기 사례와 공정성에 대한 태도",
      "사회현상을 객관적으로 분석한 경험",
      "불규칙한 일정을 견디며 적극적으로 취재한 사례"
    ],
    "ncs": "",
    "sources": [
      {
        "label": "커리어넷 직업백과 기자",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=262"
      },
      {
        "label": "커리어넷 주니어 직업정보 기자",
        "url": "https://www.career.go.kr/cnet/app/base/job/junior/juniorJobView19.m"
      },
      {
        "label": "NCS 직업정보 목록(KECO-NCS 연계자료)",
        "url": "http://www.ncs.go.kr/blind/bl04/jobList.do"
      }
    ]
  },
  "작가·전시 기획자": {
    "does": [
      "전시 주제 구상, 작가 연구와 작품 선정",
      "전시기획서 작성, 전시 공간 연출과 작품 진열",
      "리플렛, 도록, 포스터, 설명패널 제작 관리",
      "전시 홍보, 보도자료 작성, 관객 개발"
    ],
    "skills": [
      "예술적 안목과 창의성",
      "전시기획과 전시공간연출 지식",
      "전시기획서와 보도자료 작성",
      "작가, 협력업체와의 조율",
      "소장자료 보존과 관리 기본 지식",
      "관객과 소비자 분석"
    ],
    "certs": [
      {
        "name": "박물관 및 미술관 준학예사",
        "issuer": "문화체육관광부(시험 시행 한국산업인력공단)",
        "type": "국가전문자격",
        "note": "시험 합격 후 학사는 경력인정대상기관 실무경력 1년 이상 필요"
      },
      {
        "name": "문화예술교육사 2급",
        "issuer": "한국문화예술교육진흥원(문화체육관광부)",
        "type": "국가전문자격",
        "note": "미술 전공자는 직무역량 5과목(10학점)만 이수"
      },
      {
        "name": "컨벤션기획사 2급",
        "issuer": "한국산업인력공단(관련부처 문화체육관광부)",
        "type": "국가기술자격",
        "note": "전시회, 행사형 전시 기획 쪽"
      }
    ],
    "projectRole": [
      "전시 기획과 작품 선정 담당",
      "전시 공간 연출과 설치 담당",
      "도록, 포스터 등 제작물과 홍보 담당"
    ],
    "quant": [
      "박물관 및 미술관 준학예사 시험 합격",
      "문화예술교육사 2급 교육과정 이수",
      "컨벤션기획사 2급 취득",
      "어학성적 준비: 한국문화예술위원회 학예 채용은 전공과 어학성적을 평가에 포함"
    ],
    "qual": [
      "미술관, 갤러리 인턴십이나 학예 분야 자원봉사(준학예사 실무경력에 일부 인정)",
      "교내 전시나 졸업전시를 직접 기획하고 운영한 경험",
      "개인 작품 포트폴리오와 작가 활동 기록",
      "도록, 리플렛, 설명패널을 만들어 본 제작물 포트폴리오"
    ],
    "resumePoints": [
      "전시 목적에 맞게 자료를 선별하고 전시 주제와 공간의 조화를 꾀한 경험",
      "전시 관련 전문가, 협력 기관과 유기적으로 협력한 과정",
      "전시 의도를 관람객에게 잘 전달하도록 기획한 창의성(커리어넷 학예사 적성)"
    ],
    "ncs": "학예, 전시기획, 문화·예술기획",
    "sources": [
      {
        "label": "커리어넷 직업백과 학예사(큐레이터)",
        "url": "https://www.career.go.kr/cnet/app/base/job/jobView.m?SEQ=348"
      },
      {
        "label": "한국문화예술위원회 직무기술서 학예(NCS 학예, 전시기획 필요지식, 기술, 태도)",
        "url": "https://www.arko.or.kr/board/download/d13130a3e1764a24b50a7168b9d21185"
      },
      {
        "label": "국립중앙박물관 학예사 자격제도(준학예사 취득 요건)",
        "url": "https://www.museum.go.kr/MUSEUM/contents/M0705010000.do"
      },
      {
        "label": "NCS 직업정보 학예사 및 문화재 보존원(연계 NCS 분류)",
        "url": "https://www.ncs.go.kr/blind/hbr01/hbr0102/selectJobInfoDetail.do?jobCd=4131"
      },
      {
        "label": "Q-Net 국가자격 컨벤션기획사2급",
        "url": "https://www.q-net.or.kr/crf005.do?id=crf00505&jmCd=9536"
      }
    ]
  }
};

