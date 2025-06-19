import { useKakaoShare } from "../../hooks/useKakaoShare";
import "./FloatingShareButton.css";

export default function FloatingShareButton() {
  const { shareToKakao } = useKakaoShare();

  const handleShare = () => {
    shareToKakao();
  };

  return (
    <div class="floating-button-wrapper">
      <button 
        class="floating-share-button"
        onClick={handleShare}
        aria-label="카카오톡으로 공유하기"
      >
        <img 
          src="./kakaotalk.jpeg" 
          alt="카카오톡" 
          class="kakao-icon"
        />
      </button>
    </div>
  );
} 