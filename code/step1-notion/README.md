# 우리 반 패들렛 - Step 1: Notion DB

Notion 데이터베이스를 사용하는 교육용 패들렛(Padlet) 클론입니다.
카드를 추가하면 Notion 데이터베이스에 저장되고, Notion에서 직접 데이터를 확인할 수 있습니다.

## 실행 방법

### 1단계: 패키지 설치

```bash
npm install
```

### 2단계: Notion API 키 설정

#### (1) Notion 인테그레이션 만들기
1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속
2. **"+ New integration"** 클릭
3. 이름 입력 (예: "우리반 패들렛") → **Submit**
4. **"Internal Integration Secret"** 값을 복사해두세요

#### (2) Notion 데이터베이스 만들기
1. Notion에서 새 페이지를 만들고, **"Table - Full page"** 선택
2. 아래 컬럼들을 추가하세요:
   - **Title** (기본 제목 컬럼 — 이미 있음)
   - **Content** — Type: Text
   - **Color** — Type: Select (옵션: yellow, blue, green, pink)
   - **BoardId** — Type: Text
3. 페이지 우상단 **"..."** 클릭 → **"Connections"** → 방금 만든 인테그레이션 연결

#### (3) .env 파일 만들기

```bash
cp .env.example .env
```

`.env` 파일을 열고 값을 입력하세요:

```
NOTION_API_KEY=secret_여기에_복사한_키_붙여넣기
NOTION_DATABASE_ID=여기에_데이터베이스_ID_붙여넣기
```

> **데이터베이스 ID 찾기:** Notion에서 DB 페이지를 열면 URL이 `https://notion.so/abc123def456?v=...` 형태입니다. `notion.so/` 뒤의 32글자가 데이터베이스 ID입니다.

### 3단계: 서버 실행

```bash
node server.js
```

아래 메시지가 나오면 성공입니다:
```
✅ Notion DB 연결 성공!
✅ 서버가 시작되었습니다!
   브라우저에서 http://localhost:3000 을 열어보세요
```

### 4단계: 확인

1. 브라우저에서 **http://localhost:3000** 열기
2. **"카드 추가"** 버튼을 눌러 카드 만들기
3. Notion 데이터베이스 페이지를 새로고침하면 새 행이 생긴 것을 확인!

## 문제 해결

| 증상 | 해결 방법 |
|------|-----------|
| `❌ 환경변수가 설정되지 않았습니다!` | `.env` 파일이 있는지 확인, 값이 입력되었는지 확인 |
| `❌ 서버 시작 실패` | API 키와 DB ID가 올바른지 확인, 인테그레이션 연결 확인 |
| 카드가 안 보여요 | Notion DB의 BoardId 컬럼에 "default" 값이 있는지 확인 |

## 파일 구조

```
step1-notion/
├── server.js          ← Express 서버 (메인 진입점)
├── db.js              ← Notion DB 연동
├── public/
│   ├── index.html     ← 보드 UI
│   ├── style.css      ← 스타일
│   └── app.js         ← 프론트엔드 JS
├── .env.example       ← 환경변수 템플릿
├── package.json
└── README.md          ← 이 파일
```
