# Step 3: Supabase (클라우드 DB)

교육용 Padlet 클론의 세 번째 단계입니다.
Step 2(SQLite)에서 **db.js 하나만 교체**하여 클라우드 데이터베이스로 전환합니다.

## Step 2와 무엇이 다른가요?

| 항목 | Step 2 (SQLite) | Step 3 (Supabase) |
|------|-----------------|-------------------|
| 데이터 저장 위치 | 내 컴퓨터 파일 (padlet.db) | 클라우드 서버 (Supabase) |
| 변경된 파일 | - | **db.js만 변경** |
| 추가된 파일 | - | .env, setup.sql |
| 패키지 | better-sqlite3 | @supabase/supabase-js, dotenv |
| 동시 접속 | 불가 (1명) | 가능 (여러 명) |
| 인터넷 필요 | 불필요 | 필요 |

**server.js, public/ 폴더는 Step 2와 완전히 동일합니다.**

## 실행 전 준비사항

### 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속 → GitHub으로 로그인
2. "New project" 클릭 → 이름: `edu-padlet`, 비밀번호 설정
3. 프로젝트 생성 대기 (1~2분)

### 2. 테이블 만들기

Supabase 대시보드 좌측 **"SQL Editor"** → **"New query"** 클릭 후 아래 SQL 실행:

```sql
-- 카드 테이블
CREATE TABLE cards (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT NOT NULL,
  content    TEXT DEFAULT '',
  color      TEXT DEFAULT 'yellow',
  board_id   TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 보드 테이블
CREATE TABLE boards (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- 기본 보드 추가
INSERT INTO boards (id, name) VALUES ('default', '우리 반 보드');
```

또는 프로젝트 폴더의 `setup.sql` 파일 내용을 복사해서 붙여넣으세요.

### 3. .env 파일 설정

1. Supabase 대시보드 → **Settings** → **Data API**
2. `.env.example` 파일을 `.env`로 복사합니다:
   ```bash
   cp .env.example .env
   ```
3. `.env` 파일을 열고 아래 값을 채워넣습니다:
   - **SUPABASE_URL**: Project URL (예: `https://abcdefg.supabase.co`)
   - **SUPABASE_ANON_KEY**: anon public 키 (예: `eyJhbGciOi...`)

## 실행 방법

```bash
# 1. 패키지 설치
npm install

# 2. 서버 실행
node server.js
```

성공하면 아래 메시지가 나옵니다:
```
✅ Supabase 연결 성공
✅ 서버가 시작되었습니다! (Supabase 모드)
   브라우저에서 http://localhost:3000 을 열어보세요
```

## 파일 구조

```
step3-supabase/
├── server.js        ← 웹 서버 (Step 2와 거의 동일)
├── db.js            ← Supabase 연동 (Step 2의 SQLite 대신)
├── package.json     ← 패키지 목록
├── .env.example     ← 환경변수 예시
├── .env             ← 실제 환경변수 (직접 만들어야 함, Git에 올리지 마세요!)
├── setup.sql        ← Supabase 테이블 생성 SQL
└── public/
    ├── index.html   ← 웹 페이지 (Step 2와 동일)
    ├── style.css    ← 스타일 (Step 2와 동일)
    └── app.js       ← 프론트엔드 JS (Step 2와 동일)
```
