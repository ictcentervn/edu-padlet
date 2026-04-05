# 교육용 Padlet 클론 — 단계별 개발 프로젝트

중등~고등학생 대상 소프트웨어 교육 프로젝트.
Padlet과 유사한 보드 앱을 3단계로 나누어 점진적으로 개발합니다.

## 3단계 로드맵

| 단계 | DB | 핵심 개념 | 대상 학년 |
|------|-----|---------|---------|
| Step 1 | Notion DB | CRUD, API, HTTP | 중1~고2 |
| Step 2 | SQLite | SQL 입문, 로컬 DB | 고1~고3 |
| Step 3 | Supabase | 클라우드, 배포 | 고2~고3 |

## 시작하기

```
"Step 1 시작해줘"
```

Claude Code에서 위 명령을 입력하면 padlet-orchestrator 스킬이 실행됩니다.

## 산출물 구조

```
edu-padlet/
├── code/
│   ├── step1-notion/     ← 실행 가능한 Step 1 코드
│   ├── step2-sqlite/     ← 실행 가능한 Step 2 코드
│   └── step3-supabase/   ← 실행 가능한 Step 3 코드
├── 교안/
│   ├── step1-notion/     ← Step 1 교안 6종
│   ├── step2-sqlite/     ← Step 2 교안 6종
│   └── step3-supabase/   ← Step 3 교안 6종
└── _workspace/           ← 에이전트 작업 중간 파일
```

## 바이브코딩 도구 추천

- **Bolt.new** — 브라우저에서 바로, 앱 뼈대 생성에 최적
- **Claude.ai** — 개념 설명 + 코드 수정에 최적
- 두 가지를 함께 사용: Bolt.new(생성) + Claude.ai(이해/수정)
