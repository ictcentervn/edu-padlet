# Notion API 키 발급 상세 가이드

학생용 단계별 안내 (스크린샷 설명 포함).

---

## 1단계: Notion 계정 만들기

**아직 계정이 없다면:**
1. notion.so 접속
2. "Get Notion free" 클릭
3. 이메일 입력 → 무료 플랜 선택
4. 이메일 인증 완료

**이미 계정이 있다면:** 2단계로 이동

---

## 2단계: Integration(연동) 만들기

> 💡 **Integration이란?** 외부 프로그램(우리가 만드는 앱)이 Notion에 접근할 수 있도록 허가증을 발급하는 것입니다.

1. notion.so 로그인 후 이 주소 접속:
   **https://www.notion.so/my-integrations**

2. **"+ New integration"** 버튼 클릭

3. 설정 입력:
   - **Name:** `우리반 패들렛` (아무 이름이나 가능)
   - **Associated workspace:** 본인 워크스페이스 선택
   - **Type:** Internal (기본값 유지)

4. **"Submit"** 클릭

5. **"Internal Integration Secret"** 항목의 키 복사
   - `secret_` 으로 시작하는 긴 문자열
   - **눈 아이콘** 클릭해서 표시 → **복사** 버튼 클릭
   - ⚠️ 이 키는 절대 다른 사람에게 공유하지 않기!

6. `.env` 파일에 붙여넣기:
   ```
   NOTION_API_KEY=secret_여기에_방금_복사한_키_붙여넣기
   ```

---

## 3단계: Notion 데이터베이스 만들기

1. Notion 왼쪽 사이드바 **"+ Add a page"** 클릭

2. 페이지 제목: `패들렛 DB`

3. 본문 클릭 → `/database` 입력 → **"Table view"** 선택

4. 아래 컬럼 추가 (기존 "Name" 컬럼은 유지):

   | 컬럼 추가 방법 | 컬럼명 | 타입 |
   |--------------|-------|------|
   | + 클릭 | Content | Text |
   | + 클릭 | Color | Select |
   | + 클릭 | BoardId | Text |

5. Color 컬럼 Options 추가: `yellow`, `blue`, `green`, `pink`

---

## 4단계: Integration과 DB 연결하기

> 💡 Integration을 만들었어도, 어떤 DB에 접근할지 **직접 허용**해줘야 합니다.

1. 방금 만든 `패들렛 DB` 페이지 열기

2. 우측 상단 **"..."** (더보기) 버튼 클릭

3. **"Connections"** 클릭

4. **"우리반 패들렛"** (아까 만든 Integration 이름) 선택 → **"Confirm"**

---

## 5단계: 데이터베이스 ID 찾기

1. `패들렛 DB` 페이지가 열린 상태에서 브라우저 주소창 확인

2. URL 형식:
   ```
   https://www.notion.so/[워크스페이스]/[데이터베이스ID]?v=[뷰ID]
   ```

3. `[데이터베이스ID]` 부분 복사 (32자리 문자열, 하이픈 없음)
   - 예: `abc123def456abc123def456abc12345`

4. `.env` 파일에 붙여넣기:
   ```
   NOTION_DATABASE_ID=abc123def456abc123def456abc12345
   ```

---

## 최종 .env 파일 예시

```
NOTION_API_KEY=secret_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
NOTION_DATABASE_ID=abc123def456abc123def456abc12345
```

---

## 자주 겪는 문제

### ❌ "object_not_found" 에러
→ **4단계를 빠뜨렸을 가능성!** Integration과 DB를 연결했는지 확인

### ❌ "unauthorized" 에러
→ `NOTION_API_KEY`가 잘못되었거나 `.env` 파일에 저장 안 됨

### ❌ DB ID를 잘못 복사한 경우
→ URL에서 `?v=` 앞부분만 복사했는지 확인. `?` 뒤는 포함하지 않음

### ❌ 한 명이 Integration을 만들었는데 다른 학생은 사용 못함
→ Notion Integration은 계정별로 따로 만들어야 함. 각자 2~5단계 수행
