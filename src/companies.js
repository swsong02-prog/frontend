// 국내 주요 기업 데이터셋 — 면접 설정 화면 "지원 회사" 검색창 자동완성용
// { name: 회사명, industry: 업종, mark: 워드마크 텍스트, color: 브랜드 색, bg: 칩 배경, aliases: 검색 별칭 }
// 의존성 없는 순수 데이터 + 검색 헬퍼(searchCompanies)

export const COMPANIES = [
  // ── 전자·IT ──────────────────────────────────────────────
  { name: "삼성전자", industry: "전자·IT", mark: "SAMSUNG", color: "#1428A0", bg: "#FFFFFF", aliases: ["samsung", "삼전"] },
  { name: "SK하이닉스", industry: "전자·IT", mark: "SK hynix", color: "#EA002C", bg: "#FFFFFF", aliases: ["skhynix", "hynix", "하이닉스"] },
  { name: "LG전자", industry: "전자·IT", mark: "LG", color: "#A50034", bg: "#FFFFFF", aliases: ["lg", "lge"] },
  { name: "LG디스플레이", industry: "전자·IT", mark: "LG Display", color: "#A50034", bg: "#FFFFFF", aliases: ["lgd", "lgdisplay"] },
  { name: "삼성디스플레이", industry: "전자·IT", mark: "Samsung Display", color: "#1428A0", bg: "#FFFFFF", aliases: ["sdc", "samsungdisplay"] },
  { name: "삼성전기", industry: "전자·IT", mark: "Samsung Electro-Mechanics", color: "#1428A0", bg: "#FFFFFF", aliases: ["semco"] },
  { name: "LG이노텍", industry: "전자·IT", mark: "LG Innotek", color: "#A50034", bg: "#FFFFFF", aliases: ["innotek", "이노텍"] },
  { name: "LS일렉트릭", industry: "전자·IT", mark: "LS ELECTRIC", color: "#C9252B", bg: "#FFFFFF", aliases: ["lselectric", "ls산전"] },
  { name: "삼성SDS", industry: "전자·IT", mark: "Samsung SDS", color: "#1428A0", bg: "#FFFFFF", aliases: ["sds", "samsungsds"] },
  { name: "LG CNS", industry: "전자·IT", mark: "LG CNS", color: "#A50034", bg: "#FFFFFF", aliases: ["lgcns", "cns"] },
  { name: "포스코DX", industry: "전자·IT", mark: "POSCO DX", color: "#05507D", bg: "#FFFFFF", aliases: ["poscodx", "포스코디엑스"] },
  { name: "현대오토에버", industry: "전자·IT", mark: "HYUNDAI AutoEver", color: "#002C5F", bg: "#FFFFFF", aliases: ["autoever", "오토에버"] },
  { name: "한화시스템", industry: "전자·IT", mark: "Hanwha Systems", color: "#F37321", bg: "#FFFFFF", aliases: ["hanwhasystems"] },
  { name: "DB하이텍", industry: "전자·IT", mark: "DB HiTek", color: "#008C44", bg: "#FFFFFF", aliases: ["dbhitek", "디비하이텍"] },
  { name: "안랩", industry: "전자·IT", mark: "AhnLab", color: "#005BAA", bg: "#FFFFFF", aliases: ["ahnlab", "v3"] },
  { name: "한글과컴퓨터", industry: "전자·IT", mark: "Hancom", color: "#0056A8", bg: "#FFFFFF", aliases: ["hancom", "한컴"] },
  { name: "롯데이노베이트", industry: "전자·IT", mark: "LOTTE INNOVATE", color: "#DA291C", bg: "#FFFFFF", aliases: ["lotteinnovate", "롯데정보통신"] },
  { name: "NHN", industry: "전자·IT", mark: "NHN", color: "#00A24C", bg: "#FFFFFF", aliases: ["nhn", "엔에이치엔"] },

  // ── 플랫폼 ───────────────────────────────────────────────
  { name: "네이버", industry: "플랫폼", mark: "NAVER", color: "#03C75A", bg: "#FFFFFF", aliases: ["naver", "네웹"] },
  { name: "네이버웹툰", industry: "플랫폼", mark: "NAVER WEBTOON", color: "#03C75A", bg: "#FFFFFF", aliases: ["webtoon", "naverwebtoon"] },
  { name: "네이버클라우드", industry: "플랫폼", mark: "NAVER Cloud", color: "#03C75A", bg: "#FFFFFF", aliases: ["ncloud", "navercloud"] },
  { name: "라인플러스", industry: "플랫폼", mark: "LINE", color: "#06C755", bg: "#FFFFFF", aliases: ["line", "라인"] },
  { name: "카카오", industry: "플랫폼", mark: "kakao", color: "#000000", bg: "#FEE500", aliases: ["kakao"] },
  { name: "카카오페이", industry: "플랫폼", mark: "kakaopay", color: "#000000", bg: "#FFEB00", aliases: ["kakaopay", "카페이"] },
  { name: "카카오모빌리티", industry: "플랫폼", mark: "kakao mobility", color: "#000000", bg: "#FEE500", aliases: ["kakaomobility", "카모"] },
  { name: "카카오스타일", industry: "플랫폼", mark: "kakaostyle", color: "#000000", bg: "#FEE500", aliases: ["zigzag", "지그재그"] },
  { name: "쿠팡", industry: "플랫폼", mark: "coupang", color: "#E52528", bg: "#FFFFFF", aliases: ["coupang", "cp"] },
  { name: "우아한형제들", industry: "플랫폼", mark: "배달의민족", color: "#2AC1BC", bg: "#FFFFFF", aliases: ["baemin", "woowa", "배민"] },
  { name: "비바리퍼블리카", industry: "플랫폼", mark: "toss", color: "#0064FF", bg: "#FFFFFF", aliases: ["toss", "토스"] },
  { name: "당근", industry: "플랫폼", mark: "당근", color: "#FF6F0F", bg: "#FFFFFF", aliases: ["daangn", "karrot", "당근마켓"] },
  { name: "야놀자", industry: "플랫폼", mark: "yanolja", color: "#FF3478", bg: "#FFFFFF", aliases: ["yanolja"] },
  { name: "무신사", industry: "플랫폼", mark: "MUSINSA", color: "#000000", bg: "#FFFFFF", aliases: ["musinsa"] },
  { name: "컬리", industry: "플랫폼", mark: "Kurly", color: "#5F0080", bg: "#FFFFFF", aliases: ["kurly", "마켓컬리"] },
  { name: "직방", industry: "플랫폼", mark: "zigbang", color: "#FA6B05", bg: "#FFFFFF", aliases: ["zigbang"] },
  { name: "리디", industry: "플랫폼", mark: "RIDI", color: "#1F8CE6", bg: "#FFFFFF", aliases: ["ridi", "ridibooks", "리디북스"] },
  { name: "센드버드", industry: "플랫폼", mark: "Sendbird", color: "#742DDD", bg: "#FFFFFF", aliases: ["sendbird"] },
  { name: "두나무", industry: "플랫폼", mark: "Dunamu", color: "#093687", bg: "#FFFFFF", aliases: ["dunamu", "upbit", "업비트"] },
  { name: "빗썸", industry: "플랫폼", mark: "bithumb", color: "#F7941D", bg: "#FFFFFF", aliases: ["bithumb"] },
  { name: "버킷플레이스", industry: "플랫폼", mark: "오늘의집", color: "#35C5F0", bg: "#FFFFFF", aliases: ["bucketplace", "ohouse", "오늘의집"] },
  { name: "쏘카", industry: "플랫폼", mark: "SOCAR", color: "#00B8F1", bg: "#FFFFFF", aliases: ["socar"] },
  { name: "티맵모빌리티", industry: "플랫폼", mark: "TMAP", color: "#0064FB", bg: "#FFFFFF", aliases: ["tmap", "티맵"] },
  { name: "마이리얼트립", industry: "플랫폼", mark: "myrealtrip", color: "#1C7EF2", bg: "#FFFFFF", aliases: ["myrealtrip", "mrt"] },
  { name: "원티드랩", industry: "플랫폼", mark: "wanted", color: "#3366FF", bg: "#FFFFFF", aliases: ["wanted", "원티드"] },
  { name: "잡코리아", industry: "플랫폼", mark: "JOBKOREA", color: "#2A5CAA", bg: "#FFFFFF", aliases: ["jobkorea", "알바몬"] },
  { name: "몰로코", industry: "플랫폼", mark: "MOLOCO", color: "#4353FF", bg: "#FFFFFF", aliases: ["moloco"] },
  { name: "채널코퍼레이션", industry: "플랫폼", mark: "Channel Talk", color: "#5E56F0", bg: "#FFFFFF", aliases: ["channeltalk", "채널톡"] },

  // ── 게임 ─────────────────────────────────────────────────
  { name: "크래프톤", industry: "게임", mark: "KRAFTON", color: "#000000", bg: "#FFFFFF", aliases: ["krafton", "pubg", "배그"] },
  { name: "넥슨", industry: "게임", mark: "NEXON", color: "#000000", bg: "#FFFFFF", aliases: ["nexon", "메이플"] },
  { name: "엔씨소프트", industry: "게임", mark: "NCSOFT", color: "#000000", bg: "#FFFFFF", aliases: ["ncsoft", "nc", "엔씨"] },
  { name: "넷마블", industry: "게임", mark: "netmarble", color: "#E60012", bg: "#FFFFFF", aliases: ["netmarble"] },
  { name: "스마일게이트", industry: "게임", mark: "SMILEGATE", color: "#FF9C00", bg: "#FFFFFF", aliases: ["smilegate", "로스트아크"] },
  { name: "카카오게임즈", industry: "게임", mark: "kakao games", color: "#000000", bg: "#FEE500", aliases: ["kakaogames", "카겜"] },
  { name: "펄어비스", industry: "게임", mark: "PEARL ABYSS", color: "#1B1464", bg: "#FFFFFF", aliases: ["pearlabyss", "검은사막"] },
  { name: "컴투스", industry: "게임", mark: "Com2uS", color: "#F26B21", bg: "#FFFFFF", aliases: ["com2us"] },
  { name: "위메이드", industry: "게임", mark: "WEMADE", color: "#000000", bg: "#FFFFFF", aliases: ["wemade"] },
  { name: "네오위즈", industry: "게임", mark: "NEOWIZ", color: "#6C2BD9", bg: "#FFFFFF", aliases: ["neowiz"] },
  { name: "시프트업", industry: "게임", mark: "SHIFT UP", color: "#000000", bg: "#FFFFFF", aliases: ["shiftup", "니케"] },
  { name: "데브시스터즈", industry: "게임", mark: "Devsisters", color: "#FF5A1E", bg: "#FFFFFF", aliases: ["devsisters", "쿠키런"] },

  // ── 금융 ─────────────────────────────────────────────────
  { name: "KB국민은행", industry: "금융", mark: "KB", color: "#FFA800", bg: "#FFFFFF", aliases: ["kb", "kbbank", "국민은행"] },
  { name: "신한은행", industry: "금융", mark: "Shinhan Bank", color: "#0046FF", bg: "#FFFFFF", aliases: ["shinhan", "신한"] },
  { name: "하나은행", industry: "금융", mark: "Hana Bank", color: "#008485", bg: "#FFFFFF", aliases: ["hana", "하나"] },
  { name: "우리은행", industry: "금융", mark: "Woori Bank", color: "#0067AC", bg: "#FFFFFF", aliases: ["woori", "우리"] },
  { name: "IBK기업은행", industry: "금융", mark: "IBK", color: "#0068B7", bg: "#FFFFFF", aliases: ["ibk", "기업은행", "기은"] },
  { name: "NH농협은행", industry: "금융", mark: "NH Bank", color: "#009A44", bg: "#FFFFFF", aliases: ["nh", "농협"] },
  { name: "카카오뱅크", industry: "금융", mark: "kakaobank", color: "#000000", bg: "#FFE300", aliases: ["kakaobank", "카뱅"] },
  { name: "케이뱅크", industry: "금융", mark: "K bank", color: "#1B64DA", bg: "#FFFFFF", aliases: ["kbank", "케뱅"] },
  { name: "토스뱅크", industry: "금융", mark: "Toss Bank", color: "#0064FF", bg: "#FFFFFF", aliases: ["tossbank", "토뱅"] },
  { name: "미래에셋증권", industry: "금융", mark: "MiraeAsset", color: "#F58220", bg: "#FFFFFF", aliases: ["miraeasset", "미래에셋"] },
  { name: "한국투자증권", industry: "금융", mark: "Korea Investment", color: "#003263", bg: "#FFFFFF", aliases: ["koreainvestment", "한투"] },
  { name: "NH투자증권", industry: "금융", mark: "NH투자증권", color: "#009A44", bg: "#FFFFFF", aliases: ["namuh", "나무증권"] },
  { name: "KB증권", industry: "금융", mark: "KB증권", color: "#FFA800", bg: "#FFFFFF", aliases: ["kbsec", "kb증권"] },
  { name: "삼성증권", industry: "금융", mark: "삼성증권", color: "#1428A0", bg: "#FFFFFF", aliases: ["samsungsecurities", "삼증"] },
  { name: "키움증권", industry: "금융", mark: "키움증권", color: "#632E8E", bg: "#FFFFFF", aliases: ["kiwoom", "영웅문"] },
  { name: "신한투자증권", industry: "금융", mark: "신한투자증권", color: "#0046FF", bg: "#FFFFFF", aliases: ["shinhansec", "신한금투"] },
  { name: "메리츠증권", industry: "금융", mark: "메리츠증권", color: "#E4002B", bg: "#FFFFFF", aliases: ["meritz", "메리츠"] },
  { name: "토스증권", industry: "금융", mark: "Toss Securities", color: "#0064FF", bg: "#FFFFFF", aliases: ["tosssecurities", "토증"] },
  { name: "삼성생명", industry: "금융", mark: "삼성생명", color: "#1428A0", bg: "#FFFFFF", aliases: ["samsunglife"] },
  { name: "삼성화재", industry: "금융", mark: "삼성화재", color: "#1428A0", bg: "#FFFFFF", aliases: ["samsungfire"] },
  { name: "한화생명", industry: "금융", mark: "한화생명", color: "#F37321", bg: "#FFFFFF", aliases: ["hanwhalife"] },
  { name: "교보생명", industry: "금융", mark: "교보생명", color: "#036B3F", bg: "#FFFFFF", aliases: ["kyobo", "교보"] },
  { name: "DB손해보험", industry: "금융", mark: "DB손해보험", color: "#008C44", bg: "#FFFFFF", aliases: ["dbins", "db손보"] },
  { name: "현대해상", industry: "금융", mark: "현대해상", color: "#F26522", bg: "#FFFFFF", aliases: ["hyundaimarine", "하이카"] },
  { name: "KB손해보험", industry: "금융", mark: "KB손해보험", color: "#FFA800", bg: "#FFFFFF", aliases: ["kbins", "kb손보"] },
  { name: "메리츠화재", industry: "금융", mark: "메리츠화재", color: "#E4002B", bg: "#FFFFFF", aliases: ["meritzfire"] },
  { name: "신한카드", industry: "금융", mark: "Shinhan Card", color: "#0046FF", bg: "#FFFFFF", aliases: ["shinhancard"] },
  { name: "삼성카드", industry: "금융", mark: "Samsung Card", color: "#1428A0", bg: "#FFFFFF", aliases: ["samsungcard"] },
  { name: "현대카드", industry: "금융", mark: "Hyundai Card", color: "#000000", bg: "#FFFFFF", aliases: ["hyundaicard"] },
  { name: "KB국민카드", industry: "금융", mark: "KB국민카드", color: "#FFA800", bg: "#FFFFFF", aliases: ["kbcard", "국민카드"] },
  { name: "롯데카드", industry: "금융", mark: "LOTTE CARD", color: "#DA291C", bg: "#FFFFFF", aliases: ["lottecard", "로카"] },
  { name: "우리카드", industry: "금융", mark: "우리카드", color: "#0067AC", bg: "#FFFFFF", aliases: ["wooricard"] },
  { name: "하나카드", industry: "금융", mark: "하나카드", color: "#008485", bg: "#FFFFFF", aliases: ["hanacard"] },
  { name: "BC카드", industry: "금융", mark: "BC card", color: "#DF1F26", bg: "#FFFFFF", aliases: ["bccard", "비씨카드"] },

  // ── 화학·에너지 ──────────────────────────────────────────
  { name: "LG화학", industry: "화학·에너지", mark: "LG Chem", color: "#A50034", bg: "#FFFFFF", aliases: ["lgchem"] },
  { name: "LG에너지솔루션", industry: "화학·에너지", mark: "LG Energy Solution", color: "#A50034", bg: "#FFFFFF", aliases: ["lges", "엔솔"] },
  { name: "삼성SDI", industry: "화학·에너지", mark: "Samsung SDI", color: "#1428A0", bg: "#FFFFFF", aliases: ["sdi", "samsungsdi"] },
  { name: "SK이노베이션", industry: "화학·에너지", mark: "SK innovation", color: "#EA002C", bg: "#FFFFFF", aliases: ["skinnovation", "스이노"] },
  { name: "SK온", industry: "화학·에너지", mark: "SK on", color: "#EA002C", bg: "#FFFFFF", aliases: ["skon"] },
  { name: "S-OIL", industry: "화학·에너지", mark: "S-OIL", color: "#F2A900", bg: "#FFFFFF", aliases: ["soil", "에쓰오일"] },
  { name: "GS칼텍스", industry: "화학·에너지", mark: "GS Caltex", color: "#007A33", bg: "#FFFFFF", aliases: ["gscaltex", "칼텍스"] },
  { name: "HD현대오일뱅크", industry: "화학·에너지", mark: "HD HYUNDAI OILBANK", color: "#00A651", bg: "#FFFFFF", aliases: ["oilbank", "오일뱅크"] },
  { name: "롯데케미칼", industry: "화학·에너지", mark: "LOTTE Chemical", color: "#DA291C", bg: "#FFFFFF", aliases: ["lottechem", "롯케"] },
  { name: "한화솔루션", industry: "화학·에너지", mark: "Hanwha Solutions", color: "#F37321", bg: "#FFFFFF", aliases: ["hanwhasolutions", "qcells", "큐셀"] },
  { name: "금호석유화학", industry: "화학·에너지", mark: "Kumho Petrochemical", color: "#D71920", bg: "#FFFFFF", aliases: ["kkpc", "금호석화"] },
  { name: "코오롱인더스트리", industry: "화학·에너지", mark: "KOLON Industries", color: "#1F286F", bg: "#FFFFFF", aliases: ["kolon", "코오롱"] },
  { name: "포스코퓨처엠", industry: "화학·에너지", mark: "POSCO FUTURE M", color: "#05507D", bg: "#FFFFFF", aliases: ["poscofuturem", "퓨처엠"] },
  { name: "에코프로비엠", industry: "화학·에너지", mark: "EcoPro BM", color: "#00A88E", bg: "#FFFFFF", aliases: ["ecopro", "에코프로"] },
  { name: "SKC", industry: "화학·에너지", mark: "SKC", color: "#EA002C", bg: "#FFFFFF", aliases: ["skc"] },

  // ── 유통·식품 ────────────────────────────────────────────
  { name: "이마트", industry: "유통·식품", mark: "emart", color: "#F5A623", bg: "#FFFFFF", aliases: ["emart"] },
  { name: "신세계", industry: "유통·식품", mark: "SHINSEGAE", color: "#C8102E", bg: "#FFFFFF", aliases: ["shinsegae", "ssg"] },
  { name: "롯데쇼핑", industry: "유통·식품", mark: "LOTTE Shopping", color: "#DA291C", bg: "#FFFFFF", aliases: ["lotteshopping", "롯데백화점", "롯백"] },
  { name: "현대백화점", industry: "유통·식품", mark: "The Hyundai", color: "#000000", bg: "#FFFFFF", aliases: ["thehyundai", "더현대", "현백"] },
  { name: "GS리테일", industry: "유통·식품", mark: "GS Retail", color: "#0072BC", bg: "#FFFFFF", aliases: ["gsretail", "gs25"] },
  { name: "BGF리테일", industry: "유통·식품", mark: "BGF retail", color: "#652F8E", bg: "#FFFFFF", aliases: ["bgf", "cu", "씨유"] },
  { name: "CJ올리브영", industry: "유통·식품", mark: "OLIVE YOUNG", color: "#9BCE26", bg: "#FFFFFF", aliases: ["oliveyoung", "올영"] },
  { name: "호텔신라", industry: "유통·식품", mark: "The Shilla", color: "#8A7048", bg: "#FFFFFF", aliases: ["shilla", "신라면세점"] },
  { name: "스타벅스코리아", industry: "유통·식품", mark: "STARBUCKS", color: "#00704A", bg: "#FFFFFF", aliases: ["starbucks", "sck", "스벅"] },
  { name: "CJ제일제당", industry: "유통·식품", mark: "CJ CheilJedang", color: "#ED1C24", bg: "#FFFFFF", aliases: ["cj", "제일제당"] },
  { name: "오뚜기", industry: "유통·식품", mark: "Ottogi", color: "#F2B233", bg: "#FFFFFF", aliases: ["ottogi"] },
  { name: "농심", industry: "유통·식품", mark: "NONGSHIM", color: "#E60012", bg: "#FFFFFF", aliases: ["nongshim", "신라면"] },
  { name: "삼양식품", industry: "유통·식품", mark: "SAMYANG", color: "#E4002B", bg: "#FFFFFF", aliases: ["samyang", "불닭"] },
  { name: "오리온", industry: "유통·식품", mark: "ORION", color: "#DA1F26", bg: "#FFFFFF", aliases: ["orion", "초코파이"] },
  { name: "빙그레", industry: "유통·식품", mark: "Binggrae", color: "#F05123", bg: "#FFFFFF", aliases: ["binggrae", "바나나맛우유"] },
  { name: "동원F&B", industry: "유통·식품", mark: "Dongwon", color: "#008C95", bg: "#FFFFFF", aliases: ["dongwon", "동원참치"] },
  { name: "풀무원", industry: "유통·식품", mark: "Pulmuone", color: "#00A44F", bg: "#FFFFFF", aliases: ["pulmuone"] },
  { name: "매일유업", industry: "유통·식품", mark: "Maeil", color: "#0057A8", bg: "#FFFFFF", aliases: ["maeil"] },
  { name: "SPC삼립", industry: "유통·식품", mark: "SPC Samlip", color: "#ED1B2F", bg: "#FFFFFF", aliases: ["spc", "삼립", "파리바게뜨"] },
  { name: "롯데웰푸드", industry: "유통·식품", mark: "LOTTE Wellfood", color: "#DA291C", bg: "#FFFFFF", aliases: ["lottewellfood", "롯데제과"] },
  { name: "롯데칠성음료", industry: "유통·식품", mark: "LOTTE Chilsung", color: "#DA291C", bg: "#FFFFFF", aliases: ["lottechilsung", "칠성사이다"] },
  { name: "하이트진로", industry: "유통·식품", mark: "HITEJINRO", color: "#005BAC", bg: "#FFFFFF", aliases: ["hitejinro", "참이슬", "테라"] },
  { name: "KT&G", industry: "유통·식품", mark: "KT&G", color: "#004B93", bg: "#FFFFFF", aliases: ["ktng", "케이티앤지"] },
  { name: "아모레퍼시픽", industry: "유통·식품", mark: "AMOREPACIFIC", color: "#C2185B", bg: "#FFFFFF", aliases: ["amorepacific", "아모레"] },
  { name: "LG생활건강", industry: "유통·식품", mark: "LG H&H", color: "#A50034", bg: "#FFFFFF", aliases: ["lghnh", "엘지생건"] },

  // ── 제약·바이오 ──────────────────────────────────────────
  { name: "셀트리온", industry: "제약·바이오", mark: "CELLTRION", color: "#009A4E", bg: "#FFFFFF", aliases: ["celltrion", "셀트"] },
  { name: "삼성바이오로직스", industry: "제약·바이오", mark: "Samsung Biologics", color: "#1428A0", bg: "#FFFFFF", aliases: ["samsungbiologics", "삼바"] },
  { name: "삼성바이오에피스", industry: "제약·바이오", mark: "Samsung Bioepis", color: "#1428A0", bg: "#FFFFFF", aliases: ["bioepis", "에피스"] },
  { name: "유한양행", industry: "제약·바이오", mark: "Yuhan", color: "#0072BC", bg: "#FFFFFF", aliases: ["yuhan"] },
  { name: "GC녹십자", industry: "제약·바이오", mark: "GC Biopharma", color: "#00843D", bg: "#FFFFFF", aliases: ["greencross", "녹십자"] },
  { name: "한미약품", industry: "제약·바이오", mark: "Hanmi", color: "#F26F21", bg: "#FFFFFF", aliases: ["hanmi"] },
  { name: "종근당", industry: "제약·바이오", mark: "CKD", color: "#046A38", bg: "#FFFFFF", aliases: ["ckdpharm", "ckd"] },
  { name: "대웅제약", industry: "제약·바이오", mark: "Daewoong", color: "#F57F29", bg: "#FFFFFF", aliases: ["daewoong", "우루사"] },
  { name: "동아ST", industry: "제약·바이오", mark: "Dong-A ST", color: "#0077C8", bg: "#FFFFFF", aliases: ["dongast", "박카스"] },
  { name: "보령", industry: "제약·바이오", mark: "Boryung", color: "#00B0B9", bg: "#FFFFFF", aliases: ["boryung", "보령제약"] },
  { name: "HK이노엔", industry: "제약·바이오", mark: "HK inno.N", color: "#E8541E", bg: "#FFFFFF", aliases: ["innon", "컨디션"] },
  { name: "SK바이오팜", industry: "제약·바이오", mark: "SK biopharmaceuticals", color: "#EA002C", bg: "#FFFFFF", aliases: ["skbiopharm"] },
  { name: "SK바이오사이언스", industry: "제약·바이오", mark: "SK bioscience", color: "#EA002C", bg: "#FFFFFF", aliases: ["skbioscience", "스바사"] },
  { name: "휴젤", industry: "제약·바이오", mark: "Hugel", color: "#6A2C91", bg: "#FFFFFF", aliases: ["hugel"] },

  // ── 자동차·중공업 ────────────────────────────────────────
  { name: "현대자동차", industry: "자동차·중공업", mark: "HYUNDAI", color: "#002C5F", bg: "#FFFFFF", aliases: ["hyundai", "현차", "현대차"] },
  { name: "기아", industry: "자동차·중공업", mark: "KIA", color: "#05141F", bg: "#FFFFFF", aliases: ["kia", "기아차"] },
  { name: "현대모비스", industry: "자동차·중공업", mark: "MOBIS", color: "#002C5F", bg: "#FFFFFF", aliases: ["mobis", "모비스"] },
  { name: "현대위아", industry: "자동차·중공업", mark: "HYUNDAI WIA", color: "#002C5F", bg: "#FFFFFF", aliases: ["wia", "위아"] },
  { name: "현대트랜시스", industry: "자동차·중공업", mark: "HYUNDAI TRANSYS", color: "#002C5F", bg: "#FFFFFF", aliases: ["transys", "트랜시스"] },
  { name: "HL만도", industry: "자동차·중공업", mark: "HL Mando", color: "#00A9B5", bg: "#FFFFFF", aliases: ["mando", "만도"] },
  { name: "현대제철", industry: "자동차·중공업", mark: "HYUNDAI Steel", color: "#002C5F", bg: "#FFFFFF", aliases: ["hyundaisteel"] },
  { name: "포스코", industry: "자동차·중공업", mark: "POSCO", color: "#05507D", bg: "#FFFFFF", aliases: ["posco", "포철"] },
  { name: "고려아연", industry: "자동차·중공업", mark: "Korea Zinc", color: "#005EB8", bg: "#FFFFFF", aliases: ["koreazinc"] },
  { name: "HD현대중공업", industry: "자동차·중공업", mark: "HD HYUNDAI", color: "#00A651", bg: "#FFFFFF", aliases: ["hdhyundai", "현중"] },
  { name: "HD한국조선해양", industry: "자동차·중공업", mark: "HD KSOE", color: "#00A651", bg: "#FFFFFF", aliases: ["ksoe", "조선해양"] },
  { name: "HD현대인프라코어", industry: "자동차·중공업", mark: "HD HYUNDAI INFRACORE", color: "#00A651", bg: "#FFFFFF", aliases: ["infracore", "인프라코어"] },
  { name: "한화오션", industry: "자동차·중공업", mark: "Hanwha Ocean", color: "#F37321", bg: "#FFFFFF", aliases: ["hanwhaocean", "대우조선"] },
  { name: "삼성중공업", industry: "자동차·중공업", mark: "Samsung Heavy Industries", color: "#1428A0", bg: "#FFFFFF", aliases: ["shi", "삼중"] },
  { name: "두산에너빌리티", industry: "자동차·중공업", mark: "Doosan Enerbility", color: "#1A428A", bg: "#FFFFFF", aliases: ["doosan", "에너빌리티", "두산중공업"] },
  { name: "두산밥캣", industry: "자동차·중공업", mark: "Doosan Bobcat", color: "#FF3600", bg: "#FFFFFF", aliases: ["bobcat", "밥캣"] },
  { name: "두산로보틱스", industry: "자동차·중공업", mark: "Doosan Robotics", color: "#1A428A", bg: "#FFFFFF", aliases: ["doosanrobotics"] },
  { name: "한화에어로스페이스", industry: "자동차·중공업", mark: "Hanwha Aerospace", color: "#F37321", bg: "#FFFFFF", aliases: ["hanwhaaerospace", "한화에어로"] },
  { name: "한국항공우주산업", industry: "자동차·중공업", mark: "KAI", color: "#005BAB", bg: "#FFFFFF", aliases: ["kai", "카이"] },
  { name: "LIG넥스원", industry: "자동차·중공업", mark: "LIG Nex1", color: "#A6192E", bg: "#FFFFFF", aliases: ["lignex1", "넥스원"] },
  { name: "현대로템", industry: "자동차·중공업", mark: "HYUNDAI ROTEM", color: "#002C5F", bg: "#FFFFFF", aliases: ["rotem", "로템"] },

  // ── 건설 ─────────────────────────────────────────────────
  { name: "삼성물산", industry: "건설", mark: "Samsung C&T", color: "#1428A0", bg: "#FFFFFF", aliases: ["samsungcnt", "물산", "래미안"] },
  { name: "현대건설", industry: "건설", mark: "HYUNDAI E&C", color: "#002C5F", bg: "#FFFFFF", aliases: ["hdec", "힐스테이트"] },
  { name: "현대엔지니어링", industry: "건설", mark: "HYUNDAI Engineering", color: "#002C5F", bg: "#FFFFFF", aliases: ["hec", "현대엔지"] },
  { name: "GS건설", industry: "건설", mark: "GS E&C", color: "#0072BC", bg: "#FFFFFF", aliases: ["gsenc", "자이"] },
  { name: "대우건설", industry: "건설", mark: "DAEWOO E&C", color: "#0066B3", bg: "#FFFFFF", aliases: ["daewooenc", "푸르지오"] },
  { name: "DL이앤씨", industry: "건설", mark: "DL E&C", color: "#0E2B5C", bg: "#FFFFFF", aliases: ["dlenc", "이편한세상", "대림"] },
  { name: "포스코이앤씨", industry: "건설", mark: "POSCO E&C", color: "#05507D", bg: "#FFFFFF", aliases: ["poscoenc", "더샵"] },
  { name: "롯데건설", industry: "건설", mark: "LOTTE E&C", color: "#DA291C", bg: "#FFFFFF", aliases: ["lotteenc", "롯데캐슬"] },
  { name: "SK에코플랜트", industry: "건설", mark: "SK ecoplant", color: "#3DA32E", bg: "#FFFFFF", aliases: ["ecoplant", "sk건설"] },
  { name: "HDC현대산업개발", industry: "건설", mark: "HDC", color: "#003469", bg: "#FFFFFF", aliases: ["hdc", "아이파크"] },

  // ── 통신 ─────────────────────────────────────────────────
  { name: "SK텔레콤", industry: "통신", mark: "SK telecom", color: "#EA002C", bg: "#FFFFFF", aliases: ["skt", "에스케이텔레콤"] },
  { name: "KT", industry: "통신", mark: "kt", color: "#E4002B", bg: "#FFFFFF", aliases: ["kt", "케이티"] },
  { name: "LG유플러스", industry: "통신", mark: "LG U+", color: "#ED008C", bg: "#FFFFFF", aliases: ["lguplus", "uplus", "유플"] },
  { name: "SK브로드밴드", industry: "통신", mark: "SK broadband", color: "#EA002C", bg: "#FFFFFF", aliases: ["skb", "브로드밴드"] },

  // ── 항공·운송 ────────────────────────────────────────────
  { name: "대한항공", industry: "항공·운송", mark: "KOREAN AIR", color: "#0F4C96", bg: "#FFFFFF", aliases: ["koreanair", "kal", "대항"] },
  { name: "아시아나항공", industry: "항공·운송", mark: "ASIANA AIRLINES", color: "#D4002A", bg: "#FFFFFF", aliases: ["asiana", "oz"] },
  { name: "제주항공", industry: "항공·운송", mark: "JEJU air", color: "#FF5A00", bg: "#FFFFFF", aliases: ["jejuair", "7c"] },
  { name: "진에어", industry: "항공·운송", mark: "JIN AIR", color: "#8DC63F", bg: "#FFFFFF", aliases: ["jinair", "lj"] },
  { name: "티웨이항공", industry: "항공·운송", mark: "t'way", color: "#E51937", bg: "#FFFFFF", aliases: ["tway", "tw"] },
  { name: "HMM", industry: "항공·운송", mark: "HMM", color: "#EA1B2D", bg: "#FFFFFF", aliases: ["hmm", "현대상선"] },
  { name: "CJ대한통운", industry: "항공·운송", mark: "CJ Logistics", color: "#ED1C24", bg: "#FFFFFF", aliases: ["cjlogistics", "대한통운"] },
  { name: "한진", industry: "항공·운송", mark: "HANJIN", color: "#0054A6", bg: "#FFFFFF", aliases: ["hanjin", "한진택배"] },
  { name: "현대글로비스", industry: "항공·운송", mark: "HYUNDAI GLOVIS", color: "#002C5F", bg: "#FFFFFF", aliases: ["glovis", "글로비스"] },
  { name: "롯데글로벌로지스", industry: "항공·운송", mark: "LOTTE Global Logistics", color: "#DA291C", bg: "#FFFFFF", aliases: ["lotteglogis", "롯데택배"] },

  // ── 공기업 ───────────────────────────────────────────────
  { name: "한국전력공사", industry: "공기업", mark: "KEPCO", color: "#0055B8", bg: "#FFFFFF", aliases: ["kepco", "한전"] },
  { name: "한국수력원자력", industry: "공기업", mark: "KHNP", color: "#0066B3", bg: "#FFFFFF", aliases: ["khnp", "한수원"] },
  { name: "한국가스공사", industry: "공기업", mark: "KOGAS", color: "#0063A7", bg: "#FFFFFF", aliases: ["kogas", "가스공사"] },
  { name: "한국도로공사", industry: "공기업", mark: "ex", color: "#0075C8", bg: "#FFFFFF", aliases: ["ex", "도로공사", "도공"] },
  { name: "한국수자원공사", industry: "공기업", mark: "K-water", color: "#005EB8", bg: "#FFFFFF", aliases: ["kwater", "수자원공사", "수공"] },
  { name: "한국철도공사", industry: "공기업", mark: "KORAIL", color: "#005BAC", bg: "#FFFFFF", aliases: ["korail", "코레일"] },
  { name: "인천국제공항공사", industry: "공기업", mark: "Incheon Airport", color: "#005595", bg: "#FFFFFF", aliases: ["iiac", "인천공항"] },
  { name: "한국공항공사", industry: "공기업", mark: "KAC", color: "#0072BC", bg: "#FFFFFF", aliases: ["kac", "공항공사"] },
  { name: "한국토지주택공사", industry: "공기업", mark: "LH", color: "#00A650", bg: "#FFFFFF", aliases: ["lh", "토지주택공사"] },
  { name: "국민건강보험공단", industry: "공기업", mark: "NHIS", color: "#1D6FB8", bg: "#FFFFFF", aliases: ["nhis", "건보공단", "건보"] },
  { name: "국민연금공단", industry: "공기업", mark: "NPS", color: "#0C4DA2", bg: "#FFFFFF", aliases: ["nps", "연금공단"] },
  { name: "근로복지공단", industry: "공기업", mark: "COMWEL", color: "#2A5CAA", bg: "#FFFFFF", aliases: ["comwel", "근복"] },
  { name: "서울교통공사", industry: "공기업", mark: "Seoul Metro", color: "#00A5DE", bg: "#FFFFFF", aliases: ["seoulmetro", "교통공사"] },
  { name: "KDB산업은행", industry: "공기업", mark: "KDB", color: "#003E7E", bg: "#FFFFFF", aliases: ["kdb", "산업은행", "산은"] },
  { name: "한국수출입은행", industry: "공기업", mark: "Korea Eximbank", color: "#00529C", bg: "#FFFFFF", aliases: ["eximbank", "수출입은행", "수은"] },

  // ── 미디어 ───────────────────────────────────────────────
  { name: "CJ ENM", industry: "미디어", mark: "CJ ENM", color: "#ED1C24", bg: "#FFFFFF", aliases: ["cjenm", "tvn"] },
  { name: "스튜디오드래곤", industry: "미디어", mark: "STUDIO DRAGON", color: "#4B21A6", bg: "#FFFFFF", aliases: ["studiodragon"] },
  { name: "티빙", industry: "미디어", mark: "TVING", color: "#FF153C", bg: "#FFFFFF", aliases: ["tving"] },
  { name: "SBS", industry: "미디어", mark: "SBS", color: "#0046A0", bg: "#FFFFFF", aliases: ["sbs", "에스비에스"] },
  { name: "MBC", industry: "미디어", mark: "MBC", color: "#D6001C", bg: "#FFFFFF", aliases: ["mbc", "문화방송"] },
  { name: "KBS", industry: "미디어", mark: "KBS", color: "#144C94", bg: "#FFFFFF", aliases: ["kbs", "한국방송"] },
  { name: "JTBC", industry: "미디어", mark: "JTBC", color: "#B60028", bg: "#FFFFFF", aliases: ["jtbc", "제이티비씨"] },
  { name: "하이브", industry: "미디어", mark: "HYBE", color: "#000000", bg: "#FFFFFF", aliases: ["hybe", "빅히트"] },
  { name: "SM엔터테인먼트", industry: "미디어", mark: "SM Entertainment", color: "#ED0973", bg: "#FFFFFF", aliases: ["smtown", "sm엔터"] },
  { name: "JYP엔터테인먼트", industry: "미디어", mark: "JYP", color: "#333333", bg: "#FFFFFF", aliases: ["jyp", "제이와이피"] },
  { name: "YG엔터테인먼트", industry: "미디어", mark: "YG", color: "#000000", bg: "#FFFFFF", aliases: ["yg", "와이지"] },
  { name: "CJ CGV", industry: "미디어", mark: "CGV", color: "#E71A0F", bg: "#FFFFFF", aliases: ["cgv", "씨지비"] },
  { name: "카카오엔터테인먼트", industry: "미디어", mark: "kakao entertainment", color: "#000000", bg: "#FEE500", aliases: ["kakaoent", "카카오엔터"] },
];

// 공백 제거 + 소문자 정규화
function normalize(str) {
  return String(str || "").toLowerCase().replace(/\s+/g, "");
}

/**
 * 회사 검색 (자동완성용)
 * - name / mark / aliases에 대해 공백 제거·소문자 부분일치
 * - 우선순위: 이름 시작 일치 > mark·alias 시작 일치 > 부분 일치
 * @param {string} query 검색어
 * @param {number} limit 최대 반환 개수 (기본 8)
 * @returns {Array} 매칭된 회사 객체 배열
 */
export function searchCompanies(query, limit = 8) {
  const q = normalize(query);
  if (!q) return [];

  const nameStarts = [];
  const otherStarts = [];
  const partials = [];

  for (const company of COMPANIES) {
    const name = normalize(company.name);
    const mark = normalize(company.mark);
    const aliases = company.aliases.map(normalize);

    if (name.startsWith(q)) {
      nameStarts.push(company);
    } else if (mark.startsWith(q) || aliases.some((a) => a.startsWith(q))) {
      otherStarts.push(company);
    } else if (
      name.includes(q) ||
      mark.includes(q) ||
      aliases.some((a) => a.includes(q))
    ) {
      partials.push(company);
    }
  }

  return [...nameStarts, ...otherStarts, ...partials].slice(0, limit);
}
