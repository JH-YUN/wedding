export function useKakaoShare() {
  const shareToKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    window.Kakao.Share.sendCustom({
      templateId: Number(import.meta.env.VITE_KAKAO_SHARE_TEMPLATE_ID)
    });
  };
  
  const isKakaoReady = () => {
    return window.Kakao && window.Kakao.isInitialized();
  };

  return {
    shareToKakao,
    isKakaoReady
  };
} 