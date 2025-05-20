import { onMount, createSignal } from "solid-js";
import { setIntroCompleted } from "../../store";
import "./Intro.css";

export default function Intro() {
  const [visible, setVisible] = createSignal(true);
  const [showIntro, setShowIntro] = createSignal(true);

  const introShowMs = 3000;
  onMount(() => {
    // 인트로 화면 정해진 시간동안 보여주기
    const timer = setTimeout(() => {
      setVisible(false); // fade-out 시작

      // 1초 (fade-out 시간) 후에 인트로 완료 상태로 설정
      setTimeout(() => {
        setIntroCompleted(true);
        setShowIntro(false); // 완전히 숨기기
      }, 1000);
    }, introShowMs); // 설정된 시간 사용

    return () => clearTimeout(timer);
  });

  // 인트로가 완전히 숨겨지면 DOM에서 제거
  if (!showIntro()) return null;

  return (
    <div class={`intro-container ${visible() ? "visible" : "fade-out"}`}>
      <div class="intro-content">
        <div class="typing-effect-wrapper">
          <p> 형빈 ♥ 진한 결혼식에 초대합니다.</p>
        </div>
      </div>
    </div>
  );
}
