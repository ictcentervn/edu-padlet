# Supabase 프로젝트 만들기 — 클라우드 DB 5분 설정

> **대상:** 중학교 1학년 ~ 고등학교 3학년
> 이 문서를 위에서 아래로 따라하면 Supabase 클라우드 DB가 준비됩니다.

---

## Supabase 설정 vs Notion 설정 비교

먼저, Step 1에서 Notion API를 설정할 때를 떠올려보세요:

| 단계 | Step 1 (Notion) | Step 3 (Supabase) |
|------|----------------|-----------------|
| 1 | Integration 만들기 | 프로젝트 만들기 |
| 2 | Notion DB 만들기 | SQL 실행 (테이블 만들기) |
| 3 | Integration을 DB에 연결 | (자동으로 연결됨!) |
| 4 | DB ID 찾기 (URL에서 추출) | URL + Key 복사 |
| 5 | API 키 복사 | (2단계에서 이미 완료) |
| 난이도 | 꽤 복잡함 | 좀 더 단순함! |

> Step 1에서 Notion 설정이 어려웠던 분도 걱정 마세요. Supabase는 더 직관적입니다!

---

## 1단계: Supabase 접속 + 로그인

1. 브라우저에서 **https://supabase.com** 에 접속합니다
2. 오른쪽 위의 **"Start your project"** 버튼을 클릭합니다
3. **GitHub 계정으로 로그인**합니다
   - GitHub 계정이 없으면 이메일로도 가입할 수 있습니다

> GitHub 계정이 없다면? https://github.com 에서 먼저 가입하세요.
> GitHub는 개발자라면 반드시 만들어야 하는 계정이니 이 기회에!

> ✅ **여기까지 확인 포인트:** Supabase 대시보드가 보이면 성공!

---

## 2단계: 새 프로젝트 만들기

1. 대시보드에서 **"New project"** 버튼을 클릭합니다
2. 아래 내용을 입력합니다:

| 항목 | 입력값 |
|------|-------|
| **Organization** | 기본값(내 이름) 그대로 |
| **Name** | `edu-padlet` |
| **Database Password** | 기억할 수 있는 비밀번호 입력 |
| **Region** | **Northeast Asia (ap-northeast-1)** 선택 |

3. **"Create new project"** 버튼을 클릭합니다
4. 프로젝트 생성까지 **1~2분** 걸립니다. 기다려주세요!

> **비밀번호 주의!** 이 비밀번호는 나중에 필요할 수 있으니 반드시 어딘가에 적어두세요.

> **지역 선택 팁:** Northeast Asia (ap-northeast-1)은 도쿄 서버입니다. 한국에서 가장 가까운 서버를 선택해야 속도가 빠릅니다.

> ✅ **여기까지 확인 포인트:** 프로젝트 대시보드가 보이고, "Setting up project" 상태에서 "Project is ready"로 바뀌면 성공!

---

## 3단계: 테이블 만들기 (SQL 실행)

1. 좌측 메뉴에서 **"SQL Editor"** 를 클릭합니다 (번개 모양 아이콘)
2. **"New query"** 를 클릭합니다
3. 아래 SQL 코드를 **그대로** 붙여넣습니다:

```sql
-- Supabase에 테이블 만들기
CREATE TABLE cards (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT NOT NULL,
  content    TEXT DEFAULT '',
  color      TEXT DEFAULT 'yellow',
  board_id   TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE boards (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO boards (id, name) VALUES ('default', '우리 반 보드');
```

4. 오른쪽 아래의 **"Run"** 버튼을 클릭합니다 (또는 `Ctrl + Enter`)
5. "Success. No rows returned" 메시지가 나오면 성공!

> **Step 2 때 배운 SQL이죠?** CREATE TABLE, INSERT INTO... 익숙한 문법입니다!
> 다만 차이점이 있습니다:
> - `TEXT PRIMARY KEY` 대신 `UUID DEFAULT gen_random_uuid()` — 자동으로 고유 ID 생성
> - `datetime('now')` 대신 `NOW()` — PostgreSQL 문법

> ✅ **여기까지 확인 포인트:** "Success" 메시지가 나오면 성공!

---

## 4단계: 테이블 확인하기

1. 좌측 메뉴에서 **"Table Editor"** 를 클릭합니다 (표 모양 아이콘)
2. 왼쪽에 **cards**, **boards** 두 개의 테이블이 보입니다
3. **boards**를 클릭하면 "우리 반 보드" 데이터가 보입니다
4. **cards**를 클릭하면 아직 비어 있습니다 (나중에 앱에서 추가!)

> **Notion에서 데이터를 확인했던 것처럼**, Supabase Table Editor에서도 데이터를 눈으로 볼 수 있습니다. 느낌이 비슷하죠?

---

## 5단계: URL과 Key 복사하기

이제 우리 앱이 Supabase에 접속하기 위한 **주소**와 **열쇠**를 복사합니다.

1. 좌측 메뉴 맨 아래의 **"Project Settings"** (톱니바퀴 아이콘)를 클릭합니다
2. 왼쪽에서 **"API"** 를 클릭합니다
3. 두 가지를 복사합니다:

### (1) Project URL

```
https://xxxxxxxxxxxx.supabase.co
```

이것은 Supabase 프로젝트의 **주소**입니다. 우리 앱이 이 주소로 데이터를 보내고 받습니다.

### (2) anon public key

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

`eyJ`로 시작하는 아주 긴 문자열입니다. 이것은 **공개 열쇠(anon key)** 입니다.

> **Step 1과 비교:**
> - Step 1: `NOTION_API_KEY` (비밀 키, 절대 공유 금지!)
> - Step 3: `SUPABASE_ANON_KEY` (공개 키, 공유해도 괜찮음)
>
> Supabase의 anon key는 **공개용**입니다. RLS(Row Level Security)라는 보안 장치가 있어서, 이 키만으로는 허용된 작업만 할 수 있습니다.

> ✅ **여기까지 확인 포인트:** URL과 Key를 메모장 등에 임시로 복사해두면 성공!

---

## 6단계: .env 파일 만들기

프로젝트 폴더(step3-supabase)에 `.env` 파일을 만들고 아래 내용을 붙여넣습니다:

```
# Supabase 프로젝트 URL (Settings > Data API > Project URL)
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co

# Supabase anon key (Settings > Data API > anon public)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**주의사항:**
- `=` 앞뒤에 **공백을 넣지 마세요!**
- URL과 Key를 **따옴표로 감싸지 마세요!**
- 각 값은 **한 줄에 하나씩** 적어야 합니다

> **Step 1 교훈 리마인드:** .env 파일은 점(.)으로 시작하는 숨김 파일입니다.
> Finder(Mac)에서 안 보이면 `Cmd + Shift + .`을 눌러보세요.
> VS Code에서는 정상적으로 보입니다.

> ✅ **여기까지 확인 포인트:** .env 파일에 SUPABASE_URL과 SUPABASE_ANON_KEY가 올바르게 들어있으면 완료!

---

## 주의사항 모음

### 비밀번호
- 프로젝트 생성 시 입력한 비밀번호는 반드시 기억하세요
- 나중에 DB에 직접 접속할 때 필요할 수 있습니다

### 무료 플랜 제한
- 무료 계정은 **프로젝트 2개**까지만 만들 수 있습니다
- 더 필요하면 안 쓰는 프로젝트를 삭제(Pause)하세요
- Settings → General → Pause project

### anon key 보안
- anon key는 **공개용**이라 다른 사람에게 보여줘도 괜찮습니다
- 하지만 **service_role key**는 절대 공유하면 안 됩니다!
- .env에는 반드시 **anon** key만 넣으세요

---

## 설정 완료!

Supabase 설정이 끝났습니다. 이제 코드를 준비하면 앱을 실행할 수 있습니다!

**다음 단계:**
- [03_학생실습지침서.md](./03_학생실습지침서.md)의 B단계부터 이어서 진행하세요

---

> 💡 **교사 메모:**
> - Supabase 설정은 Notion보다 단순하지만, **GitHub 계정이 필요**합니다. 수업 전에 학생들이 GitHub 계정을 만들도록 안내하세요.
> - 프로젝트 생성 시 1~2분 대기 시간이 있습니다. 이 시간에 "클라우드 DB란 무엇인가" 개념 설명을 하면 자연스럽습니다.
> - SQL Editor에서 SQL을 붙여넣고 Run을 누르는 과정은 Step 2에서 배운 SQL 개념과 연결됩니다. "Step 2에서 배운 CREATE TABLE, INSERT INTO 기억나죠?"로 이어주세요.
> - URL과 Key를 복사하는 과정에서 **실수가 가장 많이 발생**합니다. "복사 버튼(아이콘)"을 클릭하도록 안내하세요. 드래그로 선택하면 앞뒤 공백이 포함될 수 있습니다.
> - 무료 플랜이 프로젝트 2개 제한이므로, 수업 전에 학생들에게 기존 프로젝트가 있는지 확인하게 하세요.
