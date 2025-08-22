import { createSignal, onMount, onCleanup, createEffect, createMemo, Show } from "solid-js";
import { GalleryImage } from "../../types";
import { preloadAdjacentImages, loadingImages, loadedImages } from "../../store";
import "./Lightbox.css";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
}

export default function Lightbox(props: LightboxProps) {
  const [currentIndex, setCurrentIndex] = createSignal(props.currentIndex);
  let startX = 0;
  let isDragging = false;

  // 현재 이미지의 로딩 상태 확인
  const currentImageSrc = createMemo(() => props.images[currentIndex()]?.src);
  const isCurrentImageLoading = createMemo(() => {
    const src = currentImageSrc();
    return src ? loadingImages().has(src) : false;
  });
  const isCurrentImageLoaded = createMemo(() => {
    const src = currentImageSrc();
    return src ? loadedImages().has(src) : false;
  });

  const handlePrev = () => {
    // 로딩 중일 때는 네비게이션 방지
    if (isCurrentImageLoading()) return;
    
    setCurrentIndex((prev) => {
      if (prev <= 0) return props.images.length - 1;
      return prev - 1;
    });
  };

  const handleNext = () => {
    // 로딩 중일 때는 네비게이션 방지
    if (isCurrentImageLoading()) return;
    
    setCurrentIndex((prev) => {
      if (prev >= props.images.length - 1) return 0;
      return prev + 1;
    });
  };

  // Touch swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    // 로딩 중일 때는 터치 이벤트 무시
    if (isCurrentImageLoading()) return;
    
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || isCurrentImageLoading()) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // 향상된 스와이프 감지 - 최소 거리와 속도 고려
    if (Math.abs(diff) > 80) {  // 감도를 높여서 우발적 스와이프 방지
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      isDragging = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  // 이미지 preloading 효과
  createEffect(() => {
    const index = currentIndex();
    if (index >= 0 && props.images[index]) {
      preloadAdjacentImages(index);
    }
  });

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // 초기 이미지 preload
    if (props.currentIndex >= 0) {
      preloadAdjacentImages(props.currentIndex);
    }

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    });
  });

  return (
    <div class="lightbox-overlay" onClick={props.onClose}>
      <div
        class="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button class="lightbox-close" onClick={props.onClose}>
          ×
        </button>

        <div class="lightbox-image-container">
          <div class="lightbox-image-wrapper">
            {/* 로딩 스피너 */}
            <Show when={isCurrentImageLoading()}>
              <div class="lightbox-loading-spinner">
                <div class="spinner"></div>
                <span>로딩 중...</span>
              </div>
            </Show>
            
            {/* 실제 이미지 */}
            <img 
              src={props.images[currentIndex()]?.src} 
              alt={props.images[currentIndex()]?.alt}
              class="lightbox-image"
              style={{
                opacity: isCurrentImageLoaded() ? "1" : "0",
                transition: "opacity 0.3s ease"
              }}
            />
            
            {/* 왼쪽 네비게이션 버튼 - 이미지 위에 오버레이 */}
            <button class="lightbox-nav lightbox-prev" onClick={handlePrev}>
              ‹
            </button>
            
            {/* 오른쪽 네비게이션 버튼 - 이미지 위에 오버레이 */}
            <button class="lightbox-nav lightbox-next" onClick={handleNext}>
              ›
            </button>
          </div>
        </div>

        {/* 카운터를 별도 영역으로 분리 */}
        <div class="lightbox-counter-container">
          <div class="lightbox-counter">
            {currentIndex() + 1} / {props.totalImages}
          </div>
        </div>
      </div>
    </div>
  );
}
