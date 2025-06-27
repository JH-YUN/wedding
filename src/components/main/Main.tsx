import weddingConfig from "../../data/wedding-config.json";
import "./Main.css";

export default function Main() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일 ${hours}시 ${
      minutes ? minutes + "분" : ""
    }`;
  };

  return (
    <section class="main-section">
      <div class="main-image-container">
        {/* Placeholder for the full-width image */}
        <div class="main-image-placeholder">
          <img src="./image/pic3.jpeg" alt="메인 이미지" />
        </div>
      </div>

      <div class="main-info">
        <div class="wedding-date">
          {formatDate(weddingConfig.weddingInfo.date)}
        </div>

        <div class="wedding-location">
          <h3>{weddingConfig.weddingInfo.location}</h3>
          <p>{weddingConfig.weddingInfo.address}</p>
        </div>
      </div>
    </section>
  );
}
