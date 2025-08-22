import { onMount, Show } from "solid-js";
import { introCompleted, selectedImageId, setSelectedImageId, allImages, selectedImageIndex, totalImages } from "./store";
import Intro from "./components/intro/Intro";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import Gallery from "./components/gallery/Gallery";
import Calendar from "./components/calendar/Calendar";
import Direction from "./components/direction/Direction";
import Account from "./components/account/Account";
import TogetherTime from "./components/TogetherTime/TogetherTime";
import FloatingShareButton from "./components/shared/FloatingShareButton";
import MetaTags from "./components/MetaTags";
import Lightbox from "./components/lightbox/Lightbox";

import "./styles/global.css";
import "./App.css";


declare global {
  interface Window {
    Kakao: any;
  }
}


function App() {
  onMount(() => {
    try {
      window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
    } catch (error) {
      console.error("Kakao SDK 초기화 실패:", error);
    }
  });

  const closeLightbox = () => {
    setSelectedImageId(null);
  };
  return (
    <>
      <MetaTags ogImageUrl="/og-image.jpg" />

      {/* 인트로 화면 항상 표시 */}
      <Intro />

      {/* 인트로 완료 후 메인 콘텐츠 표시 */}
      <Show when={introCompleted()}>
        <div class="wedding-app">
          <Main />
          <Profile />
          <Gallery />
          <Calendar />
          <Direction />
          <Account />
          <TogetherTime />
        </div>
      </Show>

      <Show when={selectedImageId() !== null}>
        <Lightbox
          images={allImages()}
          currentIndex={selectedImageIndex()}
          totalImages={totalImages()}
          onClose={closeLightbox}
        />
      </Show>
      {/* 플로팅 공유 버튼 */}
      <FloatingShareButton />
    </>
  );
}

export default App;
