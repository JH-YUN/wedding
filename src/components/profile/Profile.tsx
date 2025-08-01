import weddingConfig from "../../data/wedding-config.json";
import "./Profile.css";

export default function Profile() {
  return (
    <section class="profile-section">
      <h2 class="section-title">결혼합니다</h2>

      <div class="couple-info">
        <div class="profile-card">
          <div class="profile-image-placeholder">
            <span>신랑 사진</span>
          </div>
          <div class="profile-info">
            <h3>{weddingConfig.weddingInfo.groomFullName}</h3>
            <p>
              {weddingConfig.weddingInfo.groomFatherName}&middot;
              {weddingConfig.weddingInfo.groomMotherName}의 아들
            </p>
          </div>
        </div>

        <div class="profile-divider">
          <span>♥</span>
        </div>

        <div class="profile-card">
          <div class="profile-image-placeholder">
            <span>신부 사진</span>
          </div>
          <div class="profile-info">
            <h3>{weddingConfig.weddingInfo.brideFullName}</h3>
            <p>
              {weddingConfig.weddingInfo.brideFatherName}&middot;
              {weddingConfig.weddingInfo.brideMotherName}의 딸
            </p>
          </div>
        </div>
      </div>

      <p class="invitation-message">
        9년을 함께 걸어온 저희
        <br />
        3500일째 되는 날 평생을 함께하고자 합니다.
        <br />
        귀한 걸음 하시어 축복해 주시면
        <br />
        더없는 기쁨으로 간직하겠습니다. 
      </p>
    </section>
  );
}
