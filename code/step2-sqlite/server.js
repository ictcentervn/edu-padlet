// ============================================
// server.js — 우리 반 패들렛 서버
// 이 파일이 웹 서버를 만들고, API 요청을 처리합니다.
// 실행: node server.js
// ============================================

// 필요한 도구들을 가져옵니다
const express = require('express');
const cors = require('cors');
const db = require('./db');

// Express 앱을 만듭니다
const app = express();

// 미들웨어 설정
app.use(cors());                    // 다른 도메인에서도 API 호출 허용
app.use(express.json());            // JSON 요청 본문을 파싱
app.use(express.static('public'));  // public 폴더의 파일을 웹에서 접근 가능하게

// ============================================
// API 엔드포인트들
// ============================================

// 카드 목록 조회 — GET /api/cards?boardId=default
app.get('/api/cards', async (req, res) => {
  try {
    const boardId = req.query.boardId || 'default';
    const cards = await db.getCards(boardId);
    res.json(cards);
  } catch (error) {
    console.error('❌ 카드 목록 조회 실패:', error.message);
    res.status(500).json({ error: '카드 목록을 가져오는데 실패했습니다.' });
  }
});

// 카드 생성 — POST /api/cards
app.post('/api/cards', async (req, res) => {
  try {
    const { title, content, color, boardId } = req.body;

    // 제목은 반드시 있어야 합니다
    if (!title) {
      return res.status(400).json({ error: '카드 제목을 입력해주세요.' });
    }

    const card = await db.createCard({ title, content: content || '', color, boardId });
    res.status(201).json(card);
  } catch (error) {
    console.error('❌ 카드 생성 실패:', error.message);
    res.status(500).json({ error: '카드를 만드는데 실패했습니다.' });
  }
});

// 카드 수정 — PATCH /api/cards/:id
app.patch('/api/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, color } = req.body;
    const card = await db.updateCard(id, { title, content, color });
    res.json(card);
  } catch (error) {
    console.error('❌ 카드 수정 실패:', error.message);
    res.status(500).json({ error: '카드를 수정하는데 실패했습니다.' });
  }
});

// 카드 삭제 — DELETE /api/cards/:id
app.delete('/api/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.deleteCard(id);
    res.json(result);
  } catch (error) {
    console.error('❌ 카드 삭제 실패:', error.message);
    res.status(500).json({ error: '카드를 삭제하는데 실패했습니다.' });
  }
});

// 보드 목록 조회 — GET /api/boards
app.get('/api/boards', async (req, res) => {
  try {
    const boards = await db.getBoards();
    res.json(boards);
  } catch (error) {
    console.error('❌ 보드 목록 조회 실패:', error.message);
    res.status(500).json({ error: '보드 목록을 가져오는데 실패했습니다.' });
  }
});

// ============================================
// 서버 시작
// ============================================

// DB를 초기화하고, 성공하면 서버를 시작합니다
async function startServer() {
  try {
    await db.initialize();
    app.listen(3000, () => {
      console.log('');
      console.log('✅ 서버가 시작되었습니다! (SQLite 모드)');
      console.log('   브라우저에서 http://localhost:3000 을 열어보세요');
      console.log('   📁 데이터는 padlet.db 파일에 저장됩니다');
      console.log('');
    });
  } catch (error) {
    console.error('');
    console.error('❌ 서버 시작 실패:', error.message);
    console.error('');
    console.error('   💡 확인해주세요:');
    console.error('   1. npm install 을 실행했나요?');
    console.error('   2. better-sqlite3 패키지가 설치되었나요?');
    console.error('');
    process.exit(1);
  }
}

startServer();
