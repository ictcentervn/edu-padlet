# Step 2: SQLite — 우리 반 패들렛

## Step 1에서 뭐가 바뀌었나요?

**db.js 딱 하나만 바뀌었습니다!**

| 파일 | 변경 여부 | 설명 |
|------|-----------|------|
| `db.js` | **교체** | Notion API -> SQLite (SQL로 직접 데이터 저장) |
| `server.js` | 거의 동일 | 환경변수 검증 부분만 제거 (API 키 불필요) |
| `public/index.html` | 동일 | 변경 없음 |
| `public/style.css` | 동일 | 변경 없음 |
| `public/app.js` | 동일 | 변경 없음 |
| `package.json` | 패키지 변경 | `@notionhq/client` 제거, `better-sqlite3` 추가 |

이것이 이번 단계의 핵심 포인트입니다:
> **서버와 프론트엔드는 그대로인데, 데이터 저장 방식만 바꿨더니 앱이 그대로 동작한다!**

## 실행 방법

```bash
# 1. 패키지 설치
npm install

# 2. 서버 실행 (API 키가 필요 없습니다!)
node server.js

# 3. 브라우저에서 열기
# http://localhost:3000
```

Step 1과 달리 `.env` 파일이나 API 키 설정이 필요 없습니다. 바로 실행됩니다!

## 데이터는 어디에 저장되나요?

서버를 실행하면 프로젝트 폴더에 `padlet.db` 파일이 자동으로 생성됩니다.
이 파일 하나가 우리의 데이터베이스입니다!

### padlet.db 파일 확인하기

**VS Code에서 확인하는 방법:**
1. VS Code 확장 프로그램에서 "SQLite Viewer" 검색 후 설치
2. `padlet.db` 파일을 클릭하면 Excel처럼 데이터를 볼 수 있습니다

**터미널에서 확인하는 방법:**
```bash
npx better-sqlite3-cli padlet.db
```

## Step 1(Notion)과 Step 2(SQLite) 비교

| | Step 1: Notion | Step 2: SQLite |
|---|---|---|
| 데이터 저장 위치 | Notion 서버 (인터넷) | 내 컴퓨터 파일 (padlet.db) |
| 필요한 설정 | API 키, 데이터베이스 ID | 없음 (자동 생성) |
| 인터넷 필요? | 필요 | 불필요 |
| 데이터 확인 | Notion 웹에서 확인 | VS Code SQLite Viewer로 확인 |
| 데이터 조작 방법 | Notion API 호출 | SQL 문법 (SELECT, INSERT, DELETE) |

## API 엔드포인트 (Step 1과 동일)

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/cards?boardId=default` | 카드 목록 조회 |
| POST | `/api/cards` | 카드 생성 |
| PATCH | `/api/cards/:id` | 카드 수정 |
| DELETE | `/api/cards/:id` | 카드 삭제 |
| GET | `/api/boards` | 보드 목록 조회 |

## 이번 단계에서 배운 SQL

```sql
-- 테이블 만들기
CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  color TEXT DEFAULT 'yellow'
);

-- 데이터 조회
SELECT * FROM cards ORDER BY created_at DESC;

-- 데이터 추가
INSERT INTO cards (id, title, content, color) VALUES (?, ?, ?, ?);

-- 데이터 수정
UPDATE cards SET title = ? WHERE id = ?;

-- 데이터 삭제
DELETE FROM cards WHERE id = ?;
```
