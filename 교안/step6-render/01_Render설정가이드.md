# Render로 내 앱 배포하기 — GitHub push하면 자동 배포

> **대상:** 고등학교 2학년 ~ 3학년 심화
> **소요 시간:** 약 20~30분
> **사전 준비:** GitHub 계정 (Step 4 완료), Supabase 키 (Step 3 완료)

---

## 전체 흐름 미리보기

```
1. Render 가입 (GitHub 계정)
2. Web Service 생성
3. GitHub 저장소 연결
4. 빌드/시작 명령어 설정
5. 환경변수 설정
6. 배포 완료 → URL 접속!
```

---

## Step 1: Render 가입

1. 브라우저에서 **[render.com](https://render.com)** 접속
2. 우측 상단 **"Get Started for Free"** 클릭
3. **"GitHub"** 버튼 클릭 → GitHub 계정으로 로그인
4. Render가 GitHub 접근 권한을 요청하면 **"Authorize Render"** 클릭

> 💡 교사 메모: GitHub 계정으로 로그인하면 별도 회원가입이 필요 없습니다. Step 4에서 만든 GitHub 계정을 그대로 사용합니다.

---

## Step 2: Web Service 생성

1. Render 대시보드에서 **"New +"** 버튼 클릭
2. **"Web Service"** 선택

```
┌─────────────────────────────────┐
│  New +                          │
│  ┌────────────────────────┐     │
│  │  Web Service      ✅   │     │ ← 이것을 선택
│  │  Static Site            │     │
│  │  Private Service        │     │
│  │  Cron Job               │     │
│  │  ...                    │     │
│  └────────────────────────┘     │
└─────────────────────────────────┘
```

---

## Step 3: GitHub 저장소 연결

1. "Connect a repository" 화면에서 **GitHub** 탭 선택
2. **"Configure account"** 또는 **"Connect GitHub"** 클릭
3. GitHub에서 Render 앱 설치 권한 허용
4. 저장소 목록에서 **edu-padlet** 저장소를 찾아 **"Connect"** 클릭

```
┌───────────────────────────────────────┐
│  Connect a repository                  │
│                                        │
│  🔍 Search repositories...             │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  내이름/edu-padlet          [Connect] │ ← 이것을 선택
│  │  내이름/다른-저장소                    │
│  └──────────────────────────────────┘ │
└───────────────────────────────────────┘
```

> 💡 교사 메모: 저장소가 보이지 않으면 "Configure account"를 눌러 Render에 저장소 접근 권한을 추가해야 합니다. "All repositories" 또는 특정 저장소를 선택할 수 있습니다.

---

## Step 4: 서비스 설정

아래 항목을 정확히 입력합니다:

| 항목 | 입력값 | 설명 |
|------|--------|------|
| **Name** | `내이름-padlet` | 배포 URL에 사용됩니다 |
| **Region** | `Singapore (Southeast Asia)` | 한국에서 가장 가까운 서버 |
| **Branch** | `main` | 이 브랜치에 push하면 자동 배포 |
| **Build Command** | `npm install` | 패키지 설치 명령어 |
| **Start Command** | `node server.js` | 서버 시작 명령어 |
| **Instance Type** | `Free` | 무료 플랜 선택 |

```
┌─────────────────────────────────────────┐
│  Name:          [내이름-padlet         ] │
│  Region:        [Singapore ▾           ] │
│  Branch:        [main ▾                ] │
│  Build Command: [npm install           ] │
│  Start Command: [node server.js        ] │
│  Instance Type: ○ Free  ○ Starter       │
│                  ✅                      │
└─────────────────────────────────────────┘
```

> 💡 교사 메모: Name은 URL이 되므로 영문 소문자와 하이픈(-)만 사용해야 합니다. 학생 이름이 한글인 경우 영문 이니셜을 사용하도록 안내합니다. 예: `minsoo-padlet`

---

## Step 5: 환경변수 설정 (중요!)

배포 전에 환경변수를 설정해야 합니다. 이것을 빠뜨리면 앱이 동작하지 않습니다.

1. 설정 페이지 하단 또는 좌측 메뉴에서 **"Environment"** 탭 클릭
2. **"Add Environment Variable"** 클릭
3. 아래 두 개를 추가:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | (Step 3에서 복사한 Supabase 프로젝트 URL) |
| `SUPABASE_ANON_KEY` | (Step 3에서 복사한 anon/public 키) |

```
┌─────────────────────────────────────────────────┐
│  Environment Variables                            │
│                                                   │
│  Key                 │ Value                      │
│  ────────────────────┼──────────────────────────  │
│  SUPABASE_URL        │ https://xxx.supabase.co    │
│  SUPABASE_ANON_KEY   │ eyJhbG...                  │
│                                                   │
│  [+ Add Environment Variable]                     │
└─────────────────────────────────────────────────┘
```

> 💡 교사 메모: 학생들이 Supabase 키를 잊어버린 경우, Supabase 대시보드 → Settings → API에서 다시 확인할 수 있습니다. Step 3의 설정 가이드를 참고하세요.

---

## Step 6: 배포 시작!

1. 모든 설정을 확인한 후 **"Create Web Service"** 클릭
2. 빌드가 시작됩니다 (2~3분 소요)

빌드 진행 화면:

```
┌──────────────────────────────────────────────┐
│  Deploy log                                    │
│                                                │
│  ==> Cloning from https://github.com/...       │
│  ==> Building...                               │
│  ==> Running 'npm install'                     │
│      added 45 packages in 12s                  │
│  ==> Build successful!                         │
│  ==> Starting service with 'node server.js'    │
│  ✅ 서버 시작! 포트: 10000                       │
│                                                │
│  ==> Your service is live!                     │
└──────────────────────────────────────────────┘
```

3. **"Your service is live!"** 메시지가 나오면 배포 완료!
4. 상단의 URL 클릭 → `https://내이름-padlet.onrender.com` 접속

> ✅ **축하합니다!** 우리 패들렛 앱이 전 세계에 공개되었습니다!

---

## server.js 포트 수정 (필수 확인)

Render는 `PORT` 환경변수를 자동으로 제공합니다. server.js에서 이 값을 사용해야 합니다.

**확인할 코드 (server.js 하단):**

```javascript
// ✅ 올바른 코드 — Render와 호환
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 시작! 포트: ${PORT}`);
});
```

**틀린 코드:**

```javascript
// ❌ 이렇게 하면 Render에서 작동하지 않음
app.listen(3000, () => {
  console.log('서버 시작!');
});
```

> 💡 교사 메모: Step 5(Codespaces)에서 이미 `process.env.PORT`로 수정했다면 추가 변경은 필요 없습니다. Step 5를 건너뛴 학생이 있다면 이 수정이 필수입니다.

---

## 코드 수정 → push → 자동 배포 체험

배포가 완료되었으니, 이제 **CI/CD의 핵심**을 체험해봅시다.

### 1. 코드 수정하기

VS Code에서 `public/style.css`를 열고, 배경색을 바꿔봅시다:

```css
/* 예: body 배경색 변경 */
body {
  background-color: #f0f8ff;  /* 연한 하늘색으로 변경 */
}
```

### 2. git add + commit + push

```bash
git add public/style.css
git commit -m "배경색을 하늘색으로 변경"
git push origin main
```

### 3. Render 대시보드 확인

push 하자마자 Render 대시보드에서:

```
┌──────────────────────────────────────────────┐
│  Deploys                                       │
│                                                │
│  🔵 Deploy in progress...    just now          │
│  ✅ Deploy succeeded         3 min ago         │
│  ✅ Deploy succeeded         1 hour ago        │
└──────────────────────────────────────────────┘
```

- "Deploy in progress" → 자동 빌드 중
- 2~3분 후 "Deploy succeeded" → 완료!

### 4. 브라우저에서 확인

`https://내이름-padlet.onrender.com` 새로고침 → 배경색이 바뀌어 있습니다!

```
git push 한 번 → 2~3분 후 → 전 세계에 반영!
```

**이것이 CI/CD입니다.** 실제 개발자들도 매일 이렇게 합니다.

---

## Render 무료 플랜 알아두기

- 무료로 사용 가능합니다.
- **15분 동안 아무도 접속하지 않으면** 서버가 슬립 모드에 들어갑니다.
- 누군가 접속하면 **30초~1분** 정도 후 다시 깨어납니다.
- 월 750시간 무료 — 수업용으로 충분합니다.

> 💡 교사 메모: 시연 직전에 미리 한 번 접속해서 서버를 깨워두면 수업이 매끄럽게 진행됩니다. 첫 접속에 시간이 걸린다고 당황하는 학생이 있을 수 있으니 사전 안내가 필요합니다.
