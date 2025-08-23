import weddingConfig from "../../data/wedding-config.json";
import "./Main.css";
import Handwrite from "./Handwrite";

export default function Main() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일 ${hours}시 ${minutes ? minutes + "분" : ""
      }`;
  };

  return (
    <section class="main-section">
      <div class="main-container">
        <div class="main-image-container">
          <img src="./image/main.jpg" alt="메인 이미지" />
        </div>

        <div class="main-svg-wrapper">
          <Handwrite />
        </div>

      </div>
      <div class="wedding-info">
        <div class="wedding-date">
          {formatDate(weddingConfig.weddingInfo.date)}
        </div>

        <div class="wedding-location">
          <h3>{weddingConfig.weddingInfo.location} 마리에가든홀</h3>
          <p>{weddingConfig.weddingInfo.address}</p>
        </div>
      </div>
    </section>
  );
}
