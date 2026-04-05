# GitHub 가입하고 첫 저장소 만들기

> **대상:** 중학교 1학년 ~ 고등학교 3학년
> **소요 시간:** 약 20~30분

---

## 시작 전 체크리스트

- [ ] 이메일 주소가 있다 (학교 이메일 또는 개인 이메일)
- [ ] 노트북에 인터넷이 연결되어 있다
- [ ] VS Code가 설치되어 있다
- [ ] Step 3 코드가 `~/edu-padlet/code/step3-supabase` 폴더에 있다

---

## 1단계: GitHub 가입

1. 브라우저에서 **https://github.com** 접속
2. **Sign up** 버튼 클릭
3. 정보 입력:
   - **Email:** 자주 쓰는 이메일 입력
   - **Password:** 8자 이상, 영문+숫자 조합
   - **Username:** 영문, 숫자, 하이픈(-) 만 가능

### 사용자명(Username) 정할 때 주의사항

| 좋은 예 | 나쁜 예 | 이유 |
|---------|---------|------|
| `minsoo-kim` | `ㅋㅋ코딩왕ㅋㅋ` | 한글 안 됨, 나중에 부끄러움 |
| `suyeon-dev` | `qwerty123` | 의미 없는 이름은 포트폴리오에 불리 |
| `jiwon2026` | `admin` | 이미 다른 사람이 쓰는 이름 |

> 💡 **교사 메모:** 사용자명은 나중에 바꿀 수 있지만, 되도록 처음부터 깔끔한 이름을 정하게 하세요. 포트폴리오 URL이 `github.com/사용자명`이 됩니다.

4. 이메일 인증: 가입한 이메일로 온 인증 코드 입력
5. 가입 완료!

---

## 2단계: Git 설치 확인

터미널(VS Code 하단 터미널 또는 Mac의 Terminal 앱)을 열고 입력:

```
git --version
```

### 결과 확인

**성공 (이미 설치됨):**
```
git version 2.39.3 (Apple Git-146)
```
숫자는 달라도 괜찮습니다. `git version` 이라고 나오면 OK!

**실패 (설치 안 됨):**
```
git: command not found
```

### Git이 설치 안 되어 있다면

**Mac:**
```
xcode-select --install
```
팝업이 뜨면 "설치" 버튼을 누르세요. 몇 분 걸립니다.

**Windows:**
1. https://git-scm.com 접속
2. "Download for Windows" 클릭
3. 설치 파일 실행 → 모든 옵션 기본값으로 Next → Install
4. 설치 후 VS Code를 **껐다가 다시 열기**
5. 터미널에서 `git --version` 다시 확인

> 💡 **교사 메모:** Mac은 Xcode Command Line Tools에 Git이 포함되어 있어서 대부분 이미 설치되어 있습니다. Windows는 반드시 미리 설치해야 합니다. 수업 전에 확인하세요.

---

## 3단계: Git 초기 설정

Git에게 "나는 누구인지" 알려줘야 합니다. 터미널에 입력:

```
git config --global user.name "내 이름"
git config --global user.email "내@이메일.com"
```

예시:
```
git config --global user.name "김민수"
git config --global user.email "minsoo@email.com"
```

**확인하기:**
```
git config --global user.name
git config --global user.email
```

내가 입력한 이름과 이메일이 나오면 성공!

> 이 설정은 한 번만 하면 됩니다. 컴퓨터를 바꾸지 않는 한 다시 할 필요 없습니다.

---

## 4단계: GitHub에서 새 저장소 만들기

1. GitHub에 로그인
2. 오른쪽 위 **+** 버튼 → **New repository** 클릭
3. 정보 입력:
   - **Repository name:** `edu-padlet`
   - **Description:** `우리 반 패들렛 앱` (선택사항)
   - **Public** 선택 (누구나 볼 수 있음 = 포트폴리오)
   - **Add a README file:** 체크하지 마세요! (나중에 만듭니다)
   - **Add .gitignore:** 선택하지 마세요! (직접 만듭니다)
4. **Create repository** 버튼 클릭

빈 저장소가 만들어지고, 터미널 명령어가 안내됩니다. 우리가 직접 할 거니까 따라오세요!

---

## 5단계: .gitignore 파일 만들기

GitHub에 올리면 **안 되는** 파일들이 있습니다.

| 파일 | 올리면 안 되는 이유 |
|------|------------------|
| `node_modules/` | 용량이 너무 큼 (수천 개 파일). `npm install`로 다시 받으면 됨 |
| `.env` | API 키, 비밀번호가 들어 있음. 올리면 **전 세계에 공개됨!** |
| `padlet.db` | SQLite 데이터베이스 파일. 각자 다르니까 공유 불필요 |

`.gitignore` 파일은 "이 파일들은 무시해" 라고 Git에게 알려주는 목록입니다.

프로젝트 폴더에 `.gitignore` 파일을 만드세요:

```
node_modules/
.env
padlet.db
.DS_Store
```

VS Code에서 만드는 방법:
1. `~/edu-padlet/code/step3-supabase` 폴더 열기
2. 새 파일 만들기 → 파일명: `.gitignore` (점으로 시작!)
3. 위 내용 입력 후 저장

> ⚠️ **중요:** `.env` 파일을 GitHub에 올리면 Supabase API 키가 전 세계에 공개됩니다! 누군가 악용하면 여러분의 데이터베이스가 위험해집니다. `.gitignore`에 반드시 포함하세요.

---

## 6단계: 첫 커밋 + 푸시

터미널에서 한 줄씩 입력합니다:

```
cd ~/edu-padlet/code/step3-supabase
```
프로젝트 폴더로 이동합니다.

```
git init
```
이 폴더를 Git이 관리하게 합니다. ("세이브 시스템 켜기")

```
git add .
```
모든 파일을 세이브 대상으로 선택합니다. (.gitignore에 적힌 파일은 자동 제외!)

```
git commit -m "첫 번째 커밋: 우리 반 패들렛"
```
세이브 포인트를 만듭니다. `-m` 뒤에는 "무엇을 했는지" 메모를 적습니다.

```
git remote add origin https://github.com/내이름/edu-padlet.git
```
"내 GitHub 저장소 주소는 이거야" 라고 알려줍니다.

> ⚠️ `내이름` 부분을 **자신의 GitHub 사용자명**으로 바꾸세요!

```
git branch -M main
```
기본 브랜치 이름을 `main`으로 설정합니다.

```
git push -u origin main
```
GitHub에 업로드합니다!

### GitHub 로그인 창이 뜨는 경우

처음 push하면 로그인을 요구할 수 있습니다.

- **브라우저 창이 뜨면:** GitHub 로그인 → Authorize 버튼 클릭
- **터미널에서 비밀번호를 물어보면:** 비밀번호 대신 **Personal Access Token**을 입력해야 합니다

> 💡 **교사 메모:** 2021년 8월부터 GitHub는 터미널에서 비밀번호 로그인을 막았습니다. Mac은 보통 브라우저 인증 창이 뜨고, Windows는 Git Credential Manager가 처리합니다. 만약 토큰이 필요한 경우 05_트러블슈팅.md의 7번 항목을 참조하세요.

---

## 7단계: GitHub에서 내 코드 확인!

1. 브라우저에서 `https://github.com/내이름/edu-padlet` 접속
2. 파일 목록이 보이면 성공!

확인할 것:
- [ ] `server.js` 파일이 보인다
- [ ] `db.js` 파일이 보인다
- [ ] `public/` 폴더가 보인다
- [ ] `package.json` 파일이 보인다
- [ ] `.env` 파일은 보이지 **않는다** (정상!)
- [ ] `node_modules/` 폴더는 보이지 **않는다** (정상!)

> ✅ 축하합니다! 여러분의 코드가 인터넷에 안전하게 저장되었습니다!

---

## 전체 명령어 요약

```
cd ~/edu-padlet/code/step3-supabase    # 폴더 이동
git init                                # Git 시작
git add .                               # 파일 선택
git commit -m "첫 번째 커밋"             # 세이브
git remote add origin [저장소 URL]       # GitHub 연결
git branch -M main                      # 브랜치 설정
git push -u origin main                 # 업로드!
```

> 💡 **교사 메모:** 처음에는 명령어가 많아 보이지만, 이 과정은 프로젝트당 한 번만 합니다. 이후 코드를 수정하고 올릴 때는 `git add .` → `git commit -m "메시지"` → `git push` 세 줄이면 됩니다.
