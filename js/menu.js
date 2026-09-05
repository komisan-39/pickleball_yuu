const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('header-nav');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); // ← ☰ → ×
  headerNav.classList.toggle('open');
  overlay.classList.toggle('active');

  // スクロールロック
  document.body.style.overflow = headerNav.classList.contains('open')
    ? 'hidden'
    : 'auto';
});

// オーバーレイを押したら閉じる
overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  headerNav.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// メニュー内のリンクを押したら閉じる
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active'); // × → ☰ に戻す
    headerNav.classList.remove('open'); // メニューを閉じる
    overlay.classList.remove('active'); // 下のぼかしも消す
    document.body.style.overflow = 'auto'; // スクロールロック解除
  });
});

// メニュー内リンクのスクロール補正
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // デフォルトのジャンプを止める

    const targetId = link.getAttribute('href'); // #about など
    const target = document.querySelector(targetId);

    // メニューを閉じる
    hamburger.classList.remove('active');
    headerNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';

    // ヘッダー高さぶん補正してスクロール
    const headerHeight = document.querySelector('.header').offsetHeight;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = targetPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });
});

// ロゴを押したら TOP へ補正スクロール
document.querySelector('.header-logo a').addEventListener('click', (e) => {
  e.preventDefault();

  const target = document.querySelector('#top');

  // メニューが開いていたら閉じる
  hamburger.classList.remove('active');
  headerNav.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';

  // ヘッダー高さ
  const headerHeight = document.querySelector('.header').offsetHeight;

  // TOPだけ補正量を増やす
  const extraOffset = 40; // ← 40〜60px が最適

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = targetPosition - headerHeight - extraOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
});

// ★ NEWS：最新5件だけ表示する処理
document.addEventListener('DOMContentLoaded', () => {
  const newsItems = document.querySelectorAll('.news-item');

  // 6件目以降を非表示にする
  newsItems.forEach((item, index) => {
    if (index >= 5) {
      item.style.display = 'none';
    }
  });
});

// NEWS アコーディオン（スライド＋＋/−）
document.querySelectorAll('.news-title').forEach((title) => {
  title.addEventListener('click', () => {
    const item = title.parentElement;
    const detail = title.nextElementSibling;
    const icon = title.querySelector('.news-icon');

    const isOpen = item.classList.contains('open');

    // 全て閉じる
    document.querySelectorAll('.news-item').forEach((i) => {
      i.classList.remove('open');
      const d = i.querySelector('.news-detail');
      const ic = i.querySelector('.news-icon');
      d.style.maxHeight = null;
      d.style.padding = '0';
      ic.textContent = '＋';
    });

    // クリックした項目だけ開く
    if (!isOpen) {
      item.classList.add('open');

      // ★ padding 分（30px）を足すのがポイント
      const padding = 30;
      detail.style.maxHeight = detail.scrollHeight + padding + 'px';

      detail.style.padding = '10px 0 20px';
      icon.textContent = '－';
    }
  });
});

// ルール アコーディオン
document.querySelectorAll('.rule-title').forEach((title) => {
  title.addEventListener('click', () => {
    const item = title.parentElement;
    const detail = title.nextElementSibling;
    const icon = title.querySelector('.rule-icon');

    const isOpen = item.classList.contains('open');

    // 全て閉じる
    document.querySelectorAll('.rule-item').forEach((i) => {
      i.classList.remove('open');
      const d = i.querySelector('.rule-detail');
      const ic = i.querySelector('.rule-icon');
      d.style.maxHeight = null;
      d.style.padding = '0';
      ic.textContent = '＋';
    });

    // クリックした項目だけ開く
    if (!isOpen) {
      item.classList.add('open');

      const padding = 30;
      detail.style.maxHeight = detail.scrollHeight + padding + 'px';
      detail.style.padding = '10px 0 20px';
      icon.textContent = '－';
    }
  });
});
