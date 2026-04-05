// ============================================
// db.js — Notion 데이터베이스 연동 모듈
// 이 파일이 Notion API와 대화하는 역할을 합니다.
// server.js는 이 파일의 함수만 호출하면 됩니다.
// ============================================

const { Client } = require('@notionhq/client');
require('dotenv').config();

// Notion API 클라이언트를 생성합니다 (API 키로 인증)
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 환경변수에서 데이터베이스 ID를 가져옵니다
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Notion 응답을 우리 앱 형식으로 변환하는 함수
// Notion은 데이터를 복잡한 형태로 보내주기 때문에, 우리가 쓰기 쉬운 형태로 바꿉니다
function notionToCard(page) {
  return {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text || '',
    content: page.properties.Content?.rich_text[0]?.plain_text || '',
    color: page.properties.color?.select?.name || page.properties.Color?.select?.name || 'yellow',
    boardId: page.properties.BoardId?.rich_text[0]?.plain_text || 'default',
    createdAt: page.created_time,
  };
}

module.exports = {
  // DB 초기화 — Notion은 이미 만들어져 있으므로 연결 테스트만 합니다
  initialize: async () => {
    await notion.databases.retrieve({ database_id: DATABASE_ID });
    console.log('✅ Notion DB 연결 성공!');
  },

  // 카드 목록을 Notion DB에서 가져옵니다
  getCards: async (boardId = 'default') => {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: boardId !== 'all' ? {
        property: 'BoardId',
        rich_text: { equals: boardId }
      } : undefined,
    });
    // Notion 응답을 우리 앱 형식으로 변환해서 돌려줍니다
    return response.results.map(notionToCard);
  },

  // 새 카드를 Notion DB에 추가합니다
  createCard: async ({ title, content, color = 'yellow', boardId = 'default' }) => {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Title: { title: [{ text: { content: title } }] },
        Content: { rich_text: [{ text: { content: content } }] },
        color: { select: { name: color } },
        BoardId: { rich_text: [{ text: { content: boardId } }] },
      },
    });
    // 생성된 카드를 변환해서 돌려줍니다
    return notionToCard(response);
  },

  // 기존 카드의 내용을 수정합니다
  updateCard: async (id, { title, content, color }) => {
    // 변경할 속성만 골라서 보냅니다
    const properties = {};
    if (title !== undefined) properties.Title = { title: [{ text: { content: title } }] };
    if (content !== undefined) properties.Content = { rich_text: [{ text: { content: content } }] };
    if (color !== undefined) properties.color = { select: { name: color } };

    const response = await notion.pages.update({ page_id: id, properties });
    return notionToCard(response);
  },

  // 카드를 삭제합니다 (Notion에서는 아카이브 처리됩니다)
  deleteCard: async (id) => {
    await notion.pages.update({ page_id: id, archived: true });
    return { success: true };
  },

  // 보드 목록을 가져옵니다 (Step 1에서는 기본 보드 1개만 사용)
  getBoards: async () => {
    return [{ id: 'default', name: '우리 반 보드' }];
  },

  // 새 보드를 만듭니다 (Step 1에서는 간단히 이름만 반환)
  createBoard: async ({ name }) => {
    return { id: name.toLowerCase(), name };
  },
};
