import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import weddingConfig from "../../data/wedding-config.json";
import "./Calendar.css";

export default function Calendar() {
  const weddingDate = () => new Date(weddingConfig.weddingInfo.date);
  const [countdown, setCountdown] = createSignal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = createSignal(false);
  const [secondChanged, setSecondChanged] = createSignal(false);

  // 카운트다운 계산 함수
  const calculateCountdown = () => {
    const now = new Date();
    const wDate = weddingDate();
    const diff = wDate.getTime() - now.getTime();

    // 결혼 날짜가 지났는지 확인
    if (diff <= 0) {
      setIsPast(true);
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    // 날짜, 시간, 분, 초 계산
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 초가 변경될 때마다 애니메이션 트리거
    setSecondChanged((prev) => !prev);

    setCountdown({ days, hours, minutes, seconds });
  };

  // 타이머 설정
  onMount(() => {
    // 초기 카운트다운 계산
    calculateCountdown();

    // 1초마다 카운트다운 업데이트
    const intervalId = setInterval(calculateCountdown, 1000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  const getMonthData = createMemo(() => {
    const date = weddingDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // Get the number of days in the month
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Calculate previous and next month days that appear in the calendar
    const prevMonthDays = firstDay;
    const totalCells = Math.ceil((prevMonthDays + lastDate) / 7) * 7;

    return {
      year,
      month,
      firstDay,
      lastDate,
      totalCells,
    };
  });

  const monthName = createMemo(() => {
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    return months[getMonthData().month];
  });

  const days = createMemo(() => {
    const { firstDay, lastDate, totalCells } = getMonthData();
    const weddingDay = weddingDate().getDate();
    const result = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      result.push({ day: "", isThisMonth: false, isWeddingDay: false });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      result.push({
        day: i,
        isThisMonth: true,
        isWeddingDay: i === weddingDay,
      });
    }

    // Next month days
    for (let i = result.length; i < totalCells; i++) {
      result.push({ day: "", isThisMonth: false, isWeddingDay: false });
    }

    return result;
  });

  // 두 자리 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <section class="calendar-section">
      <h2 class="section-title">웨딩 캘린더</h2>

      <div class="calendar-container">
        <div class="calendar-header">
          <h3>
            {getMonthData().year}년 {monthName()}
          </h3>
        </div>

        <div class="calendar-grid">
          <div class="calendar-weekday">일</div>
          <div class="calendar-weekday">월</div>
          <div class="calendar-weekday">화</div>
          <div class="calendar-weekday">수</div>
          <div class="calendar-weekday">목</div>
          <div class="calendar-weekday">금</div>
          <div class="calendar-weekday">토</div>

          {days().map((day) => (
            <div
              class={`calendar-day ${!day.isThisMonth ? "other-month" : ""} ${
                day.isWeddingDay ? "wedding-day" : ""
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>

      <div class="d-day-status">
        <div class="d-day-label">
          {isPast()
            ? "결혼을 축하합니다!"
            : `${weddingConfig.weddingInfo.groomFirstName}, ${weddingConfig.weddingInfo.brideFirstName}의 결혼식까지`}
        </div>

        {!isPast() && (
          <div class="countdown-timer">
            <div class="countdown-item">
              <div class={`countdown-number ${secondChanged() ? "flip" : ""}`}>
                {countdown().days}
              </div>
              <div class="countdown-label">일</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
              <div class={`countdown-number ${secondChanged() ? "flip" : ""}`}>
                {formatNumber(countdown().hours)}
              </div>
              <div class="countdown-label">시간</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
              <div class={`countdown-number ${secondChanged() ? "flip" : ""}`}>
                {formatNumber(countdown().minutes)}
              </div>
              <div class="countdown-label">분</div>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
              <div class={`countdown-number ${secondChanged() ? "flip" : ""}`}>
                {formatNumber(countdown().seconds)}
              </div>
              <div class="countdown-label">초</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
