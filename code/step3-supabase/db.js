// ============================================
// db.js — Supabase 데이터베이스 연동 모듈
// 이 파일이 Supabase(클라우드 PostgreSQL)와 대화하는 역할을 합니다.
// server.js는 이 파일의 함수만 호출하면 됩니다.
// ============================================
// Step 2에서는 내 컴퓨터의 파일(padlet.db)에 저장했지만,
// Step 3에서는 인터넷 어딘가에 있는 Supabase DB에 저장합니다.
// 함수 이름과 사용법은 Step 2와 완전히 동일합니다!
// ============================================

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase 클라이언트를 생성합니다 (.env 파일에서 URL과 KEY를 읽어옵니다)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = {
  // 연결 테스트 — Supabase에 접속할 수 있는지 확인합니다
  // Step 2: SQLite 파일에 테이블 생성 → Step 3: Supabase에 연결 테스트
  initialize: async () => {
    const { error } = await supabase.from('cards').select('id').limit(1);
    if (error) throw new Error(`Supabase 연결 실패: ${error.message}`);
    console.log('✅ Supabase 연결 성공');
  },

  // 카드 목록을 Supabase에서 가져옵니다
  // Step 2: SQL SELECT 문 실행 → Step 3: Supabase SDK로 조회
  getCards: async (boardId = 'default') => {
    const query = supabase.from('cards').select('*').order('created_at', { ascending: false });
    if (boardId !== 'all') query.eq('board_id', boardId);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // 새 카드를 Supabase에 추가합니다
  // Step 2: SQL INSERT 문 실행 → Step 3: Supabase SDK로 삽입
  createCard: async ({ title, content = '', color = 'yellow', boardId = 'default' }) => {
    const { data, error } = await supabase
      .from('cards')
      .insert({ title, content, color, board_id: boardId })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // 기존 카드의 내용을 수정합니다
  // Step 2: SQL UPDATE 문 실행 → Step 3: Supabase SDK로 수정
  updateCard: async (id, updates) => {
    const { data, error } = await supabase
      .from('cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // 카드를 삭제합니다
  // Step 2: SQL DELETE 문으로 완전 삭제 → Step 3: Supabase SDK로 삭제
  deleteCard: async (id) => {
    const { error } = await supabase.from('cards').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  },

  // 보드 목록을 가져옵니다
  getBoards: async () => {
    const { data, error } = await supabase.from('boards').select('*');
    if (error) throw error;
    return data;
  },

  // 새 보드를 만듭니다
  createBoard: async ({ name }) => {
    const id = name.toLowerCase().replace(/\s/g, '-');
    const { data, error } = await supabase
      .from('boards').insert({ id, name }).select().single();
    if (error) throw error;
    return data;
  },
};
