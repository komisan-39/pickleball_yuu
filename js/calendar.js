// ------------------------------
// 日本の祝日を自動取得する
// ------------------------------
async function fetchHolidays(year) {
  const url = `https://holidays-jp.github.io/api/v1/${year}/date.json`;
  const res = await fetch(url);
  const data = await res.json();
  return Object.keys(data);
}

// ------------------------------
// 月間スケジュール表を生成する（2列/3列 自動切替版）
// ------------------------------
function generateSchedule(year, month, holidays) {
  const scheduleTable = document.getElementById('schedule-table');
  scheduleTable.innerHTML = '';

  const lastDay = new Date(year, month, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    const row = document.createElement('div');
    row.className = 'schedule-row';

    // ▼ 日付＋曜日
    const date = document.createElement('div');
    date.className = 'schedule-date';

    const d = new Date(year, month - 1, day);
    const youbi = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
    const youbiDisplay = `(${youbi})`;

    const mmDisplay = String(month).padStart(2, '0');
    const ddDisplay = String(day).padStart(2, '0');
    date.textContent = `${mmDisplay}月${ddDisplay}日${youbiDisplay}`;

    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const key = `${year}-${mm}-${dd}`;

    if (youbi === '土') {
      date.classList.add('sat');
    } else if (youbi === '日' || holidays.includes(key)) {
      date.classList.add('sun');
    }

    // ▼ row に日付を追加
    row.appendChild(date);

    // ▼ 時間・場所（2列/3列 自動切替）
    if (practice[key]) {
      const timeDiv = document.createElement('div');
      timeDiv.className = 'time';
      timeDiv.textContent = practice[key].time;

      const placeDiv = document.createElement('div');
      placeDiv.className = 'place';
      placeDiv.textContent = practice[key].place;

      // ▼ place が空欄なら 2列、空欄でなければ 3列
      if (practice[key].place === '' || practice[key].place.trim() === '') {
        row.classList.add('two-columns');
      } else {
        row.classList.add('three-columns');
      }

      row.appendChild(timeDiv);
      row.appendChild(placeDiv);
    } else {
      const emptyTime = document.createElement('div');
      emptyTime.className = 'time';
      emptyTime.textContent = '—';

      const emptyPlace = document.createElement('div');
      emptyPlace.className = 'place';
      emptyPlace.textContent = '';

      row.classList.add('two-columns');

      row.appendChild(emptyTime);
      row.appendChild(emptyPlace);
    }

    scheduleTable.appendChild(row);
  }
}

const practice = {
  // ==============================
  // ▼ここから2027年01月の予定
  // ==============================

  // ==============================
  // ▼ ここから2026年11月、12月の予定
  // ==============================

  '2026-11-07': { time: '09:00～12:00 古城小', place: '' },
  '2026-11-14': { time: '13:00～17:00 古城小', place: '' },
  '2026-11-21': { time: '13:00～17:00 桃栄小', place: '' },
  '2026-11-23': {
    time: `09:00〜12:00 古城小
           13:00〜17:00 古城小`,
    place: '',
  },
  '2026-11-28': { time: '13:00～17:00 桃栄小', place: '' },
  '2026-12-05': { time: '09:00～12:30 春日BG', place: '' },
  '2026-12-06': { time: '13:00～15:30 南陽', place: '' },
  '2026-12-12': {
    time: `09:00〜12:30 春日BG
13:00～15:30 南陽
           17:30～12:00 春日BG`,
    place: '',
  },
  '2026-12-13': { time: '09:00～12:30 春日BG', place: '' },
  '2026-12-26': { time: '13:00～16:30 春日BG', place: '' },
  '2026-12-27': { time: '09:00～12:30 春日BG', place: '' },

  '2026-09-16': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-17': { time: '15:00～17:30 土古(半)', place: '' },
  '2026-09-18': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-20': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-22': { time: '12:30～15:00 土古(半)', place: '' },
  '2026-09-23': { time: '15:00～17:30 土古(全)', place: '' },
  '2026-09-24': { time: '12:30～15:00 土古(半)', place: '' },

  // ==============================
  // ▼ここから2026年09月の予定
  // ==============================
  '2026-09-01': { time: '15:00～17:30 土古(半)', place: '' },
  '2026-09-02': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-03': { time: '15:00～17:30 土古(全)', place: '' },
  '2026-09-04': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-06': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-08': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-09': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-10': { time: '15:00～17:30 土古(全)', place: '' },
  '2026-09-11': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-13': {
    time: `10:00〜12:30 土古(全)
           15:00〜17:30 土古(全)`,
    place: '',
  },
  '2026-09-15': { time: '15:00～17:30 土古(半)', place: '' },
  '2026-09-16': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-17': { time: '15:00～17:30 土古(半)', place: '' },
  '2026-09-18': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-20': { time: '15:30～18:00 南陽', place: '' },
  '2026-09-22': { time: '12:30～15:00 土古(半)', place: '' },
  '2026-09-23': { time: '15:00～17:30 土古(全)', place: '' },
  '2026-09-24': { time: '12:30～15:00 土古(半)', place: '' },
};

// ------------------------------
// 初期表示
// ------------------------------
loadSchedule();

// 月切り替え機能
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;

function updateMonthDisplay() {
  document.querySelector('.current-month').textContent =
    `${currentYear}年${String(currentMonth).padStart(2, '0')}月`;
}

async function loadSchedule() {
  const holidays = await fetchHolidays(currentYear);
  generateSchedule(currentYear, currentMonth, holidays);
  updateMonthDisplay();
}

document.querySelector('.prev-month').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth === 0) {
    currentMonth = 12;
    currentYear--;
  }
  loadSchedule();
});

document.querySelector('.next-month').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth === 13) {
    currentMonth = 1;
    currentYear++;
  }
  loadSchedule();
});

// ★ 初期表示（最後に置く）
loadSchedule();
