// ============================================
// db.js — SQLite 데이터베이스 연동 모듈
// 이 파일이 SQLite 파일(padlet.db)과 대화하는 역할을 합니다.
// server.js는 이 파일의 함수만 호출하면 됩니다.
// ============================================
// Step 1에서는 Notion API를 사용했지만,
// Step 2에서는 내 컴퓨터의 파일(padlet.db)에 직접 저장합니다.
// 함수 이름과 사용법은 Step 1과 완전히 동일합니다!
// ============================================

const Database = require('better-sqlite3');
const path = require('path');

// padlet.db 파일을 프로젝트 폴더에 생성합니다 (없으면 자동 생성)
const db = new Database(path.join(__dirname, 'padlet.db'));

module.exports = {
  // 테이블이 없으면 만들기 (서버 시작 시 한 번 실행)
  // Step 1에서는 Notion DB가 이미 있었지만, SQLite는 직접 테이블을 만들어야 합니다
  initialize: async () => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS cards (
        id         TEXT PRIMARY KEY,
        title      TEXT NOT NULL,
        content    TEXT DEFAULT '',
        color      TEXT DEFAULT 'yellow',
        board_id   TEXT DEFAULT 'default',
        created_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS boards (
        id   TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      INSERT OR IGNORE INTO boards (id, name) VALUES ('default', '우리 반 보드');
    `);
    console.log('✅ SQLite DB 초기화 완료 (padlet.db)');
  },

  // 카드 목록을 SQLite에서 가져옵니다
  // Step 1: Notion API에 query 요청 → Step 2: SQL SELECT 문 실행
  getCards: async (boardId = 'default') => {
    const stmt = boardId === 'all'
      ? db.prepare('SELECT * FROM cards ORDER BY created_at DESC')
      : db.prepare('SELECT * FROM cards WHERE board_id = ? ORDER BY created_at DESC');
    return boardId === 'all' ? stmt.all() : stmt.all(boardId);
  },

  // 새 카드를 SQLite에 추가합니다
  // Step 1: Notion에 page 생성 → Step 2: SQL INSERT 문 실행
  createCard: async ({ title, content = '', color = 'yellow', boardId = 'default' }) => {
    const id = Date.now().toString(); // 간단한 ID 생성 (현재 시간의 밀리초)
    db.prepare(
      'INSERT INTO cards (id, title, content, color, board_id) VALUES (?, ?, ?, ?, ?)'
    ).run(id, title, content, color, boardId);
    return { id, title, content, color, boardId };
  },

  // 기존 카드의 내용을 수정합니다
  // Step 1: Notion page 속성 업데이트 → Step 2: SQL UPDATE 문 실행
  updateCard: async (id, { title, content, color }) => {
    // 변경할 컬럼만 골라서 업데이트합니다
    const updates = [];
    const values = [];
    if (title !== undefined)   { updates.push('title = ?');   values.push(title); }
    if (content !== undefined) { updates.push('content = ?'); values.push(content); }
    if (color !== undefined)   { updates.push('color = ?');   values.push(color); }
    values.push(id);
    db.prepare(`UPDATE cards SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    return db.prepare('SELECT * FROM cards WHERE id = ?').get(id);
  },

  // 카드를 삭제합니다
  // Step 1: Notion에서는 아카이브 처리 → Step 2: SQL DELETE 문으로 완전 삭제
  deleteCard: async (id) => {
    db.prepare('DELETE FROM cards WHERE id = ?').run(id);
    return { success: true };
  },

  // 보드 목록을 가져옵니다
  getBoards: async () => {
    return db.prepare('SELECT * FROM boards').all();
  },

  // 새 보드를 만듭니다
  createBoard: async ({ name }) => {
    const id = name.toLowerCase().replace(/\s/g, '-');
    db.prepare('INSERT OR IGNORE INTO boards (id, name) VALUES (?, ?)').run(id, name);
    return { id, name };
  },
};
