// ============================================
// server.js — 배포용 진입점
// Glitch, Render 등에서 GitHub import 시 이 파일이 실행됩니다.
// Step 3 (Supabase) 코드를 그대로 사용합니다.
// ============================================

// Step 3 코드의 경로를 설정합니다
const path = require('path');
const STEP3_DIR = path.join(__dirname, 'code', 'step3-supabase');

// Step 3의 .env 파일 또는 루트 .env 파일에서 환경변수를 읽습니다
require('dotenv').config(); // 루트 .env
require('dotenv').config({ path: path.join(STEP3_DIR, '.env') }); // Step 3 .env

// 필요한 도구들을 가져옵니다
const express = require('express');
const cors = require('cors');

// 환경변수 확인
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('');
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다!');
  console.error('');
  console.error('   💡 해결 방법:');
  console.error('   1. .env.example 파일을 .env로 복사하세요');
  console.error('   2. Supabase 대시보드 → Settings → Data API 에서 값을 복사하세요');
  console.error('      SUPABASE_URL=https://xxxxx.supabase.co');
  console.error('      SUPABASE_ANON_KEY=eyJhbGciOi...');
  console.error('');
  process.exit(1);
}

// Step 3의 db.js를 사용합니다
const db = require(path.join(STEP3_DIR, 'db'));

// Express 앱 생성
const app = express();

app.use(cors());
app.use(express.json());

// Step 3의 public 폴더에서 프론트엔드를 제공합니다
app.use(express.static(path.join(STEP3_DIR, 'public')));

// API 엔드포인트 — Step 3 server.js와 동일
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

app.post('/api/cards', async (req, res) => {
  try {
    const { title, content, color, boardId } = req.body;
    if (!title) return res.status(400).json({ error: '카드 제목을 입력해주세요.' });
    const card = await db.createCard({ title, content: content || '', color, boardId });
    res.status(201).json(card);
  } catch (error) {
    console.error('❌ 카드 생성 실패:', error.message);
    res.status(500).json({ error: '카드를 만드는데 실패했습니다.' });
  }
});

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

app.get('/api/boards', async (req, res) => {
  try {
    const boards = await db.getBoards();
    res.json(boards);
  } catch (error) {
    console.error('❌ 보드 목록 조회 실패:', error.message);
    res.status(500).json({ error: '보드 목록을 가져오는데 실패했습니다.' });
  }
});

// 서버 시작 — Glitch/Render는 PORT 환경변수를 사용
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.initialize();
    app.listen(PORT, () => {
      console.log('');
      console.log('✅ 서버가 시작되었습니다! (Supabase 모드)');
      console.log(`   http://localhost:${PORT}`);
      console.log('   ☁️  데이터는 Supabase 클라우드에 저장됩니다');
      console.log('');
    });
  } catch (error) {
    console.error('');
    console.error('❌ 서버 시작 실패:', error.message);
    console.error('');
    process.exit(1);
  }
}

startServer();
