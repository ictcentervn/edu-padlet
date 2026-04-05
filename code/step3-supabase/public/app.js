// ============================================
// app.js — 프론트엔드 JavaScript
// 서버 API와 통신하고, 카드를 화면에 표시합니다.
// ============================================

// 서버에서 카드 목록을 가져와서 화면에 표시합니다
async function loadCards() {
  try {
    const res = await fetch('/api/cards?boardId=default');
    const cards = await res.json();
    renderCards(cards);
  } catch (error) {
    console.error('카드를 불러오는데 실패했습니다:', error);
  }
}

// 카드 배열을 받아서 HTML로 변환하고, 보드에 표시합니다
function renderCards(cards) {
  const board = document.getElementById('board');

  // 카드가 없으면 안내 메시지를 보여줍니다
  if (cards.length === 0) {
    board.innerHTML = '<p class="empty-text">아직 카드가 없어요. 위의 "카드 추가" 버튼을 눌러보세요! 🎉</p>';
    return;
  }

  // 각 카드를 HTML로 만듭니다
  board.innerHTML = cards.map(function(card) {
    return '<div class="card ' + card.color + '" data-id="' + card.id + '">' +
      '<button class="delete-btn" onclick="deleteCard(\'' + card.id + '\')" title="카드 삭제">&times;</button>' +
      '<h3>' + escapeHtml(card.title) + '</h3>' +
      '<p>' + escapeHtml(card.content) + '</p>' +
    '</div>';
  }).join('');
}

// HTML 특수문자를 이스케이프합니다 (XSS 방지)
function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 새 카드를 서버에 추가합니다
async function addCard(formData) {
  try {
    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      var errorData = await res.json();
      alert(errorData.error || '카드 추가에 실패했습니다.');
      return;
    }

    // 카드 추가 성공 → 목록 새로고침
    await loadCards();
  } catch (error) {
    console.error('카드 추가 실패:', error);
    alert('카드를 추가하는데 문제가 생겼습니다. 다시 시도해주세요.');
  }
}

// 카드를 서버에서 삭제합니다
async function deleteCard(id) {
  // 삭제 전 확인합니다
  if (!confirm('이 카드를 삭제할까요?')) {
    return;
  }

  try {
    var res = await fetch('/api/cards/' + id, {
      method: 'DELETE',
    });

    if (!res.ok) {
      alert('카드 삭제에 실패했습니다.');
      return;
    }

    // 삭제 성공 → 목록 새로고침
    await loadCards();
  } catch (error) {
    console.error('카드 삭제 실패:', error);
    alert('카드를 삭제하는데 문제가 생겼습니다. 다시 시도해주세요.');
  }
}

// ============================================
// 모달 열기/닫기
// ============================================

// 모달을 엽니다
function openModal() {
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('cardTitle').focus();
}

// 모달을 닫습니다
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.getElementById('cardForm').reset();
}

// ============================================
// 이벤트 연결
// ============================================

// 페이지가 로드되면 실행됩니다
document.addEventListener('DOMContentLoaded', function() {
  // 카드 목록을 처음 불러옵니다
  loadCards();

  // 5초마다 카드 목록을 자동으로 새로고침합니다 (폴링 방식)
  setInterval(loadCards, 5000);

  // "카드 추가" 버튼 클릭 → 모달 열기
  document.getElementById('openModalBtn').addEventListener('click', openModal);

  // 모달 닫기 버튼 클릭
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);

  // 모달 바깥 영역 클릭 → 모달 닫기
  document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // ESC 키 → 모달 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // 카드 추가 폼 제출
  document.getElementById('cardForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // 페이지 새로고침 방지

    // 폼에서 값을 가져옵니다
    var title = document.getElementById('cardTitle').value.trim();
    var content = document.getElementById('cardContent').value.trim();
    var color = document.querySelector('input[name="cardColor"]:checked').value;

    // 제목이 비어있으면 알려줍니다
    if (!title) {
      alert('카드 제목을 입력해주세요.');
      return;
    }

    // 버튼을 비활성화합니다 (중복 클릭 방지)
    var submitBtn = this.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '추가 중...';

    // 서버에 카드를 추가합니다
    await addCard({
      title: title,
      content: content,
      color: color,
      boardId: 'default',
    });

    // 모달을 닫고 폼을 초기화합니다
    closeModal();
    submitBtn.disabled = false;
    submitBtn.textContent = '카드 추가하기';
  });
});
