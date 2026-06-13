# 코치코치 (CoachCoach) 🎤

> AI 기반 모의 면접 코칭 웹 서비스 — 자소서 맞춤 질문부터 자세·음성·내용 분석, 성장 추적까지

캡스톤디자인 2 프로젝트로 개발한 웹 서비스입니다. 사용자가 직무와 자기소개서를 입력하면 AI가 맞춤형 면접 질문을 생성하고, 웹캠 면접 영상을 분석해 자세·표정·답변 내용을 평가한 뒤, 면접 실력의 성장 곡선을 보여줍니다.

---

## ✨ 주요 기능

- **자소서 맞춤 질문 생성** — 입력한 자기소개서를 LLM이 분석해 파고드는 질문 6개 생성 (자기소개·지원동기 고정 + 직무 맞춤 4문항)
- **신입/경력 구분** — 경력 구분에 따라 질문 구성 변경
- **웹캠 모의 면접** — 브라우저에서 바로 면접 진행
- **실제 AI 분석 점수** — 자세/표정, 음성→텍스트 변환, 답변 내용 평가를 실제 모델로 산출
- **성장 곡선** — 면접 기록을 누적 저장해 점수 추이 시각화
- **회원 시스템** — JWT 기반 로그인/회원가입, 토큰 유지

---

## 🏗️ 시스템 아키텍처

비용 효율을 위해 **가벼운 작업은 클라우드, 무거운 AI 분석은 로컬 GPU**로 분리한 하이브리드 구조입니다.

```
┌──────────────┐      HTTPS       ┌─────────────────────┐
│  프론트엔드   │  ───────────────▶ │   백엔드 (FastAPI)   │
│  React/Vite  │   Cloudflare      │   AWS EC2 (t3.micro) │
│   (Vercel)   │     Tunnel        │   로그인·기록·질문생성  │
└──────────────┘                  └─────────┬───────────┘
                                            │ (분석 요청)
                                            ▼
                                  ┌─────────────────────┐
                                  │   분석 워커 (로컬 PC)  │
                                  │  YOLO·MediaPipe      │
                                  │  Whisper·Ollama (GPU)│
                                  └─────────────────────┘
```

| 구성요소 | 위치 | 역할 |
|---|---|---|
| 프론트엔드 | Vercel | 화면, 면접 UI (24시간 상시) |
| 백엔드 + DB | AWS EC2 | 로그인·기록·질문생성 (systemd 상시화) |
| 분석 워커 | 로컬 PC (GPU) | 영상 분석 (비용 절감 위해 분리) |

> 💡 **설계 의도:** GPU가 필요한 영상 분석을 클라우드에 올리면 비용이 급증하므로, 무거운 분석만 로컬 워커로 분리했습니다. 트래픽 확장 시 분석 요청을 큐(SQS)에 쌓아 순차 처리하거나 워커를 수평 확장할 수 있는 구조입니다.

---

## 🛠️ 기술 스택

**프론트엔드**
- React + Vite
- 환경변수 기반 API 주소 분리 (`VITE_API_URL`)

**백엔드**
- FastAPI + Uvicorn
- SQLAlchemy + SQLite
- JWT 인증 (python-jose), bcrypt 비밀번호 해싱

**AI 분석 (로컬 워커)**
- YOLOv8-pose + MediaPipe — 자세·표정 분석
- Whisper — 음성 → 텍스트 (STT)
- Ollama (qwen2.5) — 답변 내용 평가 및 질문 생성

**인프라 / 배포**
- AWS EC2 (Ubuntu, t3.micro)
- Vercel (프론트 호스팅)
- Cloudflare Tunnel (HTTPS 연결)
- systemd (백엔드·터널 24시간 상시화)

---

## 📂 저장소 구성

| 저장소 | 설명 |
|---|---|
| **frontend** | 프론트엔드 (React/Vite) — 본 저장소 |
| **backend-deploy** | AWS 배포용 백엔드 (FastAPI, 분석엔진 제외 경량 버전) |

---

## 🚀 로컬 실행 방법

### 프론트엔드
```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### 백엔드
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload     # http://127.0.0.1:8000
```

> 분석엔진(YOLO·Whisper·Ollama)을 사용하려면 Ollama 앱 실행 및 관련 패키지 설치가 필요합니다.

### 환경변수
프론트엔드는 백엔드 주소를 환경변수로 받습니다.
```
VITE_API_URL=http://127.0.0.1:8000     # 로컬
VITE_API_URL=https://<배포된 백엔드 주소>  # 배포 시
```

---

## 📊 데이터 모델

3개 테이블로 구성됩니다.

- `users` — 회원 정보
- `interview_sessions` — 면접 세션 (종합 점수 등)
- `question_results` — 질문별 결과 (자세/내용 점수, 답변 텍스트)

---

## 🗺️ 로드맵

- [x] 로컬 전체 기능 작동 (로그인 → 면접 → 분석 → 성장곡선)
- [x] AWS EC2 백엔드 배포 + Vercel 프론트 배포
- [x] Cloudflare Tunnel HTTPS 연결
- [x] 백엔드·터널 systemd 상시화 (24시간 가동)
- [ ] 로컬 분석 워커 ↔ 클라우드 연결 (실시간 영상 점수)
- [ ] Cloudflare 고정 주소(named tunnel) + 탄력적 IP
- [ ] 자소서 파일 업로드, 가입 제한 등 마무리

---

## 👤 개발

대전대학교 정보통신공학과 · 캡스톤디자인 2

> 이 프로젝트는 학습 목적의 캡스톤 과제로, 클라우드 배포와 AI 모델 통합 경험을 목표로 진행되었습니다.
