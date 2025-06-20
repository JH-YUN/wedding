import { onMount } from "solid-js";
import weddingConfig from "../../data/wedding-config.json";
import "./Direction.css";

declare global {
  interface Window {
    naver: any;
  }
}

export default function Direction() {
  let mapElement: HTMLDivElement | undefined;

  // 지도 관련 URL들
  const mapUrls = {
    naver: `https://map.naver.com/p/search/${encodeURIComponent(
      weddingConfig.weddingInfo.address
    )}`,
    kakao: `https://map.kakao.com/link/search/${encodeURIComponent(
      weddingConfig.weddingInfo.address
    )}`,
    kakaonavi: `https://kakaonavi.kakao.com/launch/index.do?coord_type=WGS84&coord=${126.9477},${37.3956}&dest_name=${encodeURIComponent(
      weddingConfig.weddingInfo.location
    )}`,
    tmap: `https://apis.openapi.sk.com/tmap/app/routes?appKey=${import.meta.env.VITE_TMAP_APP_KEY}&name=${encodeURIComponent(
      weddingConfig.weddingInfo.location
    )}&lon=126.9477&lat=37.3956`,
  };

  onMount(() => {
    // 네이버 지도 API 스크립트 로드
    const loadNaverMaps = () => {
      if (window.naver && window.naver.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${import.meta.env.VITE_NAVER_CLIENT_ID}`;
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!window.naver || !window.naver.maps || !mapElement) return;

      // 파티오벨라 좌표 (안양시 동안구)
      const location = new window.naver.maps.LatLng(37.3956, 126.9477);

      const mapOptions = {
        center: location,
        zoom: 17,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.BUTTON,
          position: window.naver.maps.Position.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.LARGE,
          position: window.naver.maps.Position.TOP_RIGHT
        }
      };

      const map = new window.naver.maps.Map(mapElement, mapOptions);

      // 마커 추가
      const marker = new window.naver.maps.Marker({
        position: location,
        map: map,
        title: weddingConfig.weddingInfo.location,
        icon: {
          content: '<div style="background: #ff6b6b; color: white; padding: 8px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; white-space: nowrap;">💒 ' + weddingConfig.weddingInfo.location + '</div>',
          size: new window.naver.maps.Size(150, 36),
          anchor: new window.naver.maps.Point(75, 18)
        }
      });

      // 정보창 추가
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="width:200px;text-align:center;padding:10px;">
            <h4 style="margin:0 0 5px 0;">${weddingConfig.weddingInfo.location}</h4>
            <p style="margin:0;font-size:12px;color:#666;">${weddingConfig.weddingInfo.address}</p>
          </div>
        `
      });

      // 마커 클릭시 정보창 표시
      window.naver.maps.Event.addListener(marker, 'click', function() {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
    };

    loadNaverMaps();
  });

  return (
    <section class="direction-section">
      <h2 class="section-title">오시는 길</h2>

      <div class="venue-info">
        <h3>{weddingConfig.weddingInfo.location}</h3>
        <p>{weddingConfig.weddingInfo.address}</p>
      </div>

      <div class="map-container">
        {/* 네이버 지도 */}
        <div 
          ref={mapElement} 
          style={{
            width: '100%',
            height: '300px',
            border: '1px solid #ddd',
            'border-radius': '8px'
          }}
        />
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
            <img src="./navermap.png" alt="네이버지도" />
            네이버 지도
          </a>
          <a
            href={mapUrls.tmap}
            target="_blank"
            rel="noopener noreferrer"
            class="map-button tmap"
          >
            <img src="./tmap.png" alt="티맵" />
            T맵
          </a>
          <a
            href={mapUrls.kakao}
            target="_blank"
            rel="noopener noreferrer"
            class="map-button kakao"
          >
            <img src="./kakaomap.png" alt="카카오지도" />
            카카오 지도
          </a>
          <a
            href={mapUrls.kakaonavi}
            target="_blank"
            rel="noopener noreferrer"
            class="map-button kakaonavi"
          >
            <img src="./kakaonavi.png" alt="카카오내비" />
            카카오 내비
          </a>
        </div>
      </div>
    </section>
  );
}
