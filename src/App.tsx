import { Show } from "solid-js";
import { introCompleted } from "./store";
import Intro from "./components/intro/Intro";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import Gallery from "./components/gallery/Gallery";
import Calendar from "./components/calendar/Calendar";
import Direction from "./components/direction/Direction";
import Account from "./components/account/Account";
import MetaTags from "./components/MetaTags";
import "./styles/global.css";
import "./App.css";

function App() {
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
        </div>
      </Show>
    </>
  );
}

export default App;
