import "./TogetherTime.css";

function calculateElapsedYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  // 일(day) 자리 차감(빌림)
  if (days < 0) {
    // 현재 달의 이전 달 총 일수
    const daysInPrevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += daysInPrevMonth;
    months -= 1;
  }

  // 월(month) 자리 차감(빌림)
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

export default function TogetherTime() {
  const startDate = new Date(2016, 3, 10, 0, 0, 0); // 2016-04-10 (월 0-index)
  const now = new Date();
  const { years, months, days } = calculateElapsedYMD(startDate, now);

  return (
    <section class="together-time-section">
      <h2 class="section-title">함께한 시간</h2>
      <p class="together-value">{years}년 {months}개월 {days}일</p>
      <div class="together-time-wrapper">
        <img src="./image/pic9.jpeg" alt="함께한 시간" />
      </div>
    </section>
  )
}

