# Glitch에서 우리 패들렛 올리기 — 5분 완성

> **대상:** 중학교 1학년 ~ 고등학교 3학년
> **준비물:** 인터넷 브라우저 (Chrome 권장), Supabase URL + API Key

---

## 시작 전 체크리스트

- [ ] 인터넷에 연결되어 있다
- [ ] 크롬(Chrome) 브라우저가 있다
- [ ] Supabase URL과 ANON KEY를 알고 있다 (Step 3에서 받은 것)

---

## 방법 A: GitHub에서 가져오기 (Step 4를 완료한 경우)

> 💡 교사 메모: Step 4에서 GitHub에 코드를 올린 학생은 이 방법이 가장 빠릅니다. GitHub 저장소가 public이어야 합니다.

### A-1. Glitch 접속 및 로그인

1. 브라우저에서 **glitch.com** 접속
2. 오른쪽 상단 **"Sign in"** 클릭
3. **"Sign in with GitHub"** 선택 (GitHub 계정으로 로그인)
   - GitHub 계정이 없으면 **"Sign in with Email"** 로 가입해도 됩니다

> ✅ 로그인하면 Glitch 대시보드가 보입니다

### A-2. GitHub에서 프로젝트 가져오기

1. 오른쪽 상단 **"New project"** 클릭
2. **"Import from GitHub"** 선택
3. 입력란에 GitHub 저장소 URL 붙여넣기:
   ```
   https://github.com/내이름/edu-padlet
   ```
4. **"OK"** 클릭

Glitch가 자동으로:
- 저장소의 모든 파일을 복사합니다
- `npm install`을 실행합니다
- 서버를 시작합니다

> ✅ 왼쪽에 파일 목록이 보이면 성공!

### A-3. 환경변수 설정 (.env)

1. 왼쪽 파일 목록에서 **".env"** 파일 클릭
2. Glitch 전용 환경변수 편집기가 열립니다
3. 아래 내용을 입력:

```
SUPABASE_URL=여기에_수파베이스_URL_붙여넣기
SUPABASE_ANON_KEY=여기에_수파베이스_키_붙여넣기
```

> ✅ Glitch의 .env는 **자동으로 비공개** 처리됩니다. 다른 사람이 프로젝트를 봐도 .env 내용은 보이지 않습니다. GitHub보다 API 키 관리가 훨씬 안전합니다!

### A-4. 앱 확인하기

1. 상단 메뉴에서 **"Preview"** 클릭
2. **"Preview in a new window"** 선택
3. 새 탭에 내 앱이 열립니다!

주소창을 확인하세요:
```
https://프로젝트명.glitch.me
```

**이 주소를 친구에게 보내면, 친구도 내 앱을 쓸 수 있습니다!**

> ✅ 카드를 추가해보세요. Supabase에 저장되는지 확인!

---

## 방법 B: 직접 파일 올리기 (Step 4를 안 한 경우)

> 💡 교사 메모: GitHub을 안 배운 학생이나 Step 4를 건너뛴 경우 이 방법을 사용합니다. 파일을 드래그&드롭으로 올립니다.

### B-1. 새 프로젝트 만들기

1. glitch.com 접속 → 로그인
2. **"New project"** → **"glitch-hello-node"** 선택
3. 기본 프로젝트가 생성됩니다

### B-2. 기존 파일 정리

1. 왼쪽 파일 목록에서 기본 파일들을 확인합니다
2. `server.js` — 나중에 내용을 덮어쓸 예정이므로 남겨둡니다
3. 나머지 불필요한 파일이 있다면 삭제합니다
   - 파일 이름 위에서 우클릭 → "Delete" 선택

### B-3. 파일 업로드

1. 왼쪽 파일 목록 영역에서 **"New File"** 버튼 클릭
2. 파일 이름을 입력해서 필요한 파일을 만듭니다:
   - `db.js`
   - `public/index.html`
   - `public/style.css`
   - `public/app.js`
3. 각 파일을 클릭해서 **내 컴퓨터에 있는 코드를 복사-붙여넣기** 합니다

> 또는: 왼쪽 하단 **"Assets"** 옆의 **"Upload"** 기능을 사용할 수도 있습니다

### B-4. package.json 수정

왼쪽에서 `package.json`을 클릭하고, dependencies 부분을 확인합니다:

```json
{
  "name": "edu-padlet",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@supabase/supabase-js": "^2.39.0",
    "dotenv": "^16.3.1"
  }
}
```

> ✅ dependencies를 수정하면 Glitch가 자동으로 `npm install`을 실행합니다

### B-5. .env 설정

방법 A의 A-3과 동일합니다.

### B-6. 앱 확인

방법 A의 A-4와 동일합니다.

---

## 포트 설정 수정 (중요!)

**이것이 Step 5에서 유일하게 바꾸는 코드 1줄입니다.**

Glitch에서는 포트 번호를 Glitch가 정해줍니다. `process.env.PORT`를 사용해야 합니다.

왼쪽에서 `server.js`를 클릭하고, 포트 설정 부분을 찾으세요:

**수정 전 (localhost용):**
```javascript
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버 시작: http://localhost:${PORT}`);
});
```

**수정 후 (Glitch + localhost 모두 호환):**
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 시작: http://localhost:${PORT}`);
});
```

`process.env.PORT || 3000`의 뜻:
- Glitch에서 실행하면 → Glitch가 정해준 포트 사용
- 내 컴퓨터에서 실행하면 → 3000번 포트 사용

**한 줄만 바꾸면 어디서든 동작합니다!**

---

## 협업: 친구 초대하기

### 편집자로 초대하기

1. 왼쪽 상단 **프로젝트 이름** 클릭
2. **"Invite Others to Edit"** 선택
3. 초대 링크가 복사됩니다
4. 이 링크를 친구에게 카카오톡이나 메시지로 보내세요

친구가 링크를 클릭하면:
- 같은 프로젝트에서 동시에 코드를 수정할 수 있습니다
- Google Docs처럼 실시간으로 커서가 보입니다
- 코드를 수정하면 즉시 반영됩니다

### 앱 사용자로 공유하기 (코드 수정 없이 앱만 사용)

```
https://프로젝트명.glitch.me
```

이 URL을 공유하면 누구나 앱을 사용할 수 있습니다. 코드는 볼 수 없습니다.

---

## 정리: Glitch 설정 전체 흐름

```
① glitch.com 로그인
     │
     ├── GitHub에서 Import (방법 A)
     │   또는
     └── 직접 파일 올리기 (방법 B)
          │
          ▼
② .env에 Supabase URL + Key 입력
          │
          ▼
③ server.js 포트 수정 (process.env.PORT || 3000)
          │
          ▼
④ Preview → 앱 동작 확인
          │
          ▼
⑤ URL 공유 → 친구가 내 앱을 사용!
```

> 💡 교사 메모: Glitch의 .env는 다른 사람이 코드를 볼 때 자동으로 숨겨집니다. GitHub에서 실수로 API 키를 공개하는 사고를 원천 차단할 수 있어서, 학생 실습에 매우 안전합니다.
