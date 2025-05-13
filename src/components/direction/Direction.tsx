import weddingConfig from "../../data/wedding-config.json";
import "./Direction.css";

export default function Direction() {
  // 지도 관련 URL들
  const mapUrls = {
    naver: `https://map.naver.com/p/search/${encodeURIComponent(
      weddingConfig.weddingInfo.address
    )}`,
    kakao: `https://map.kakao.com/link/search/${encodeURIComponent(
      weddingConfig.weddingInfo.address
    )}`,
    google: `https://maps.google.com/?q=${encodeURIComponent(
      weddingConfig.weddingInfo.address
    )}`,
  };

  return (
    <section class="direction-section">
      <h2 class="section-title">오시는 길</h2>

      <div class="venue-info">
        <h3>{weddingConfig.weddingInfo.location}</h3>
        <p>{weddingConfig.weddingInfo.address}</p>
      </div>

      <div class="map-container">
        {/* Google Maps iframe - 실제 좌표로 업데이트 필요 */}
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.4328759429354!2d126.95030677677792!3d37.47588897205639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI4JzMzLjIiTiAxMjbCsDU3JzE1LjAiRQ!5e0!3m2!1sko!2skr!4v1621234567890!5m2!1sko!2skr`}
          width="100%"
          height="300"
          style="border:0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div class="transportation-info">
        <h3>교통 안내</h3>
        <div class="transport-section">
          <div class="transport-header">
            <div class="transport-icon subway-icon">🚇</div>
            <h4>지하철</h4>
          </div>
          <div class="transport-content">
            <p>
              <strong>4호선 범계역</strong> 7번 출구, 도보 2분
            </p>
          </div>
        </div>

        <div class="transport-section">
          <div class="transport-header">
            <div class="transport-icon bus-icon">🚌</div>
            <h4>버스</h4>
          </div>
          <div class="transport-content">
            <p>
              <strong>동안경찰서 / 범계역 정류장 하차</strong>
            </p>
            <p>3030, 333, 3330, 8407, M5333</p>
            <p>
              <strong>롯데백화점 / 범계역 정류장 하차</strong>
            </p>
            <p>300, 301</p>
          </div>
        </div>

        <div class="transport-section">
          <div class="transport-header">
            <div class="transport-icon car-icon">🚗</div>
            <h4>자가용</h4>
          </div>
          <div class="transport-content">
            <p>
              <strong>내비게이션:</strong> "파티오벨라" 또는 "비산동 1104-1"
              검색
            </p>
            <p>
              <strong>주차:</strong> 건물 내 지상 &middot; 지하 주차장 이용
            </p>
          </div>
        </div>
      </div>

      <div class="map-links">
        <h4>지도 서비스</h4>
        <div class="map-buttons">
          <a
            href={mapUrls.naver}
            target="_blank"
            rel="noopener noreferrer"
            class="map-button naver"
          >
            네이버 지도
          </a>
          <a
            href={mapUrls.kakao}
            target="_blank"
            rel="noopener noreferrer"
            class="map-button kakao"
          >
            카카오 지도
          </a>
          <a
            href={mapUrls.google}
            target="_blank"
            rel="noopener noreferrer"
            class="map-button google"
          >
            구글 지도
          </a>
        </div>
      </div>
    </section>
  );
}
