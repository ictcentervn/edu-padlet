# Step 4: GitHub — 교사 지침서

## 한줄 요약
Git/GitHub를 사용하여 코드를 버전 관리하고, 원격 저장소에 올려 포트폴리오로 활용한다.

## 차시 구성
| 차시 | 핵심 활동 | 시간 |
|------|---------|------|
| 1차시 | Git 개념 + GitHub 가입 + 첫 Push (init > add > commit > push) | 45분 |
| 2차시 | 코드 수정 > 재Push + 친구 코드 Clone + README 작성 | 45분 |

## 수업 전 준비물
- [ ] 학교 네트워크에서 github.com 접속 확인
- [ ] 학생 노트북에 Git 설치 여부 확인 (`git --version`)
- [ ] Windows용 Git 설치 파일 USB 준비
- [ ] 교사 GitHub 저장소 시범용 미리 생성
- [ ] GitHub 가입을 수업 전 과제로 공지 (이메일 인증 시간 절약)

## 학생이 자주 막히는 곳 Top 3
1. **GitHub 인증 실패** (비밀번호 대신 PAT 필요) → Personal Access Token 발급 안내, Mac은 브라우저 인증 자동 (5~10분)
2. **`git init` 누락 또는 경로 오류** → `pwd`로 현재 폴더 확인, step3-supabase에서 실행 (2분)
3. **`.env` 파일 실수로 Push** → .gitignore 확인 후 `git rm --cached .env` (3분)

## 시간 조절 팁
- 시간 부족 시 생략 가능: 2차시 README 작성, 커밋 히스토리 탐색 (과제 전환)
- 여유 시 추가 가능: 브랜치 개념 소개, GitHub 프로필 꾸미기

## 핵심 확인 포인트
- [ ] GitHub 계정 가입 + 이메일 인증 완료
- [ ] `git config`로 사용자명/이메일 설정 완료
- [ ] GitHub 저장소에 코드가 push되어 보이는가
- [ ] .env 파일이 GitHub에 올라가지 **않았는지** 확인
- [ ] .gitignore에 `.env`와 `node_modules/`가 포함되어 있는가

## 실행 테스트에서 발견된 주의사항
- **.env 실수로 push 위험**: 가장 위험한 실수. `git add .` 전에 반드시 .gitignore 파일 생성 확인. 이미 올렸다면 `git rm --cached .env` + API 키 재발급 필수. "비밀번호를 인터넷에 올린 것과 같다"고 설명하면 학생이 바로 이해.
- Windows에서 Git 설치에 시간 소요. 사전 설치 강력 권장.
- Clone 실습 시 친구의 .env가 없으므로 Supabase 연결 안 됨. "코드 구조를 보는 것"이 목적임을 안내.
- 네트워크 문제가 가장 큰 변수. 핫스팟 준비 권장.
