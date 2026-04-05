# 교육용 Padlet 클론 — 6단계 프로젝트

중등~고등학생 대상 소프트웨어 교육 프로젝트.
Padlet과 유사한 보드 앱을 6단계로 나누어 점진적으로 개발합니다.

## 6단계 로드맵

### 데이터 저장 배우기
| 단계 | DB | 핵심 개념 | 대상 학년 |
|------|-----|---------|---------|
| Step 1 | Notion DB | CRUD, API, HTTP | 중1~고2 |
| Step 2 | SQLite | SQL 입문, 로컬 DB | 고1~고3 |
| Step 3 | Supabase | 클라우드, 배포 | 고2~고3 |

### 공유와 배포 배우기
| 단계 | 도구 | 핵심 개념 | 대상 학년 |
|------|------|---------|---------|
| Step 4 | GitHub | 코드 관리, 버전 관리, 포트폴리오 | 중등~고등 |
| Step 5 | Glitch | 브라우저 코딩, 즉시 배포, 실시간 협업 | 중등~고등 |
| Step 6 | Render | 실무 배포, CI/CD | 고등 심화 |

## 빠른 시작 (Step 3 바로 실행)

```bash
npm install
cp .env.example .env
# .env 파일에 Supabase URL과 Key 입력
npm start
# → http://localhost:3000
```

## 특정 단계만 실행하기

```bash
# Step 1 (Notion)
cd code/step1-notion && npm install && node server.js

# Step 2 (SQLite)
cd code/step2-sqlite && npm install && node server.js

# Step 3 (Supabase)
cd code/step3-supabase && npm install && node server.js
```

## 프로젝트 구조

```
edu-padlet/
├── server.js              ← Glitch/Render 배포용 진입점
├── package.json           ← 배포용 설정
├── code/
│   ├── step1-notion/      ← Step 1 코드 (Notion DB)
│   ├── step2-sqlite/      ← Step 2 코드 (SQLite)
│   └── step3-supabase/    ← Step 3 코드 (Supabase) ★ 배포 대상
├── 교안/
│   ├── step1-notion/      ← Step 1 교안 6종
│   ├── step2-sqlite/      ← Step 2 교안 6종
│   ├── step3-supabase/    ← Step 3 교안 6종
│   ├── step4-github/      ← Step 4 교안 6종
│   ├── step5-glitch/      ← Step 5 교안 6종
│   └── step6-render/      ← Step 6 교안 6종
└── .claude/               ← 하네스 (교사/개발자용)
```

## 바이브코딩 도구 추천

- **Bolt.new** — 브라우저에서 바로, 앱 뼈대 생성에 최적
- **Claude.ai** — 개념 설명 + 코드 수정에 최적
- 두 가지를 함께 사용: Bolt.new(생성) + Claude.ai(이해/수정)

## 학년별 추천 경로

```
중1~중3:  Step 1 → Step 5 (Notion + Glitch = 설치 없이 완성)
고1~고2:  Step 1 → 2 → 3 → 4 → 5
고3 심화:  전체 6단계
```
