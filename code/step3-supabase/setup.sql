-- ============================================
-- Supabase SQL Editor에서 이 쿼리를 실행하세요
-- Supabase 대시보드 → 좌측 "SQL Editor" → "New query"
-- ============================================

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
