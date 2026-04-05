# Step 3: Supabase — 교사 지침서

## 한줄 요약
로컬 DB를 클라우드 DB(Supabase)로 전환하여, 여러 사용자가 접근 가능한 앱 구조를 이해한다.

## 차시 구성
| 차시 | 핵심 활동 | 시간 |
|------|---------|------|
| 1차시 | 클라우드 DB 개념 + Supabase 설정 + Step2에서 Step3 전환 | 45분 |
| 2차시 | 동작 확인 + 두 브라우저 동시 접속 + 3단계 전체 회고 | 45분 |

## 수업 전 준비물
- [ ] GitHub 계정 사전 가입 공지 (Supabase 로그인용, 이메일 인증 필요)
- [ ] 학교 Wi-Fi 안정성 확인 (인터넷 항상 필요)
- [ ] 교사 Supabase 프로젝트 미리 생성하여 시범용 준비
- [ ] 학생에게 "기존 Supabase 프로젝트 있으면 Pause 해두기" 안내 (무료 2개 제한)

## 학생이 자주 막히는 곳 Top 3
1. **.env URL/Key 복사 오류** (공백, 따옴표, 줄바꿈) → 반드시 "복사 아이콘" 클릭으로 복사 (3분)
2. **SQL 미실행** ("relation does not exist") → SQL Editor에서 CREATE TABLE 실행 확인 (2분)
3. **GitHub 계정/인증 문제** → 수업 전 가입 완료 필수, 이메일 인증 확인 (5~10분)

## 시간 조절 팁
- 시간 부족 시 생략 가능: 2차시 심화 활동(Vercel 배포, Realtime), 교사 시연만으로 대체
- 여유 시 추가 가능: Vercel 배포 실습, Supabase Realtime 실시간 기능

## 핵심 확인 포인트
- [ ] Supabase 프로젝트 생성 완료
- [ ] SQL Editor에서 cards/boards 테이블 생성 완료
- [ ] .env에 SUPABASE_URL, SUPABASE_ANON_KEY 정확히 입력
- [ ] 카드 추가 후 Supabase Table Editor에서 데이터 확인
- [ ] 서버 재시작 후에도 데이터 유지 확인

## 실행 테스트에서 발견된 주의사항
- **API 설정 위치: `Settings > Data API`** (단순히 "API"가 아님). Supabase UI 변경으로 메뉴 위치가 다를 수 있으니 교사가 미리 확인. Project URL과 anon key 복사 시 반드시 복사 아이콘 사용.
- Supabase 프로젝트 생성 시 1~2분 대기 시간 발생. 이 시간에 개념 보충 설명 활용.
- 무료 프로젝트 2개 제한. 기존 프로젝트가 있으면 Pause 필요.
- 두 브라우저 동시 접속 테스트가 2차시 하이라이트. "SQLite에서는 안 됐지만 클라우드니까 가능" 강조.
