import { createSignal, onMount, onCleanup } from "solid-js";
import { GalleryImage } from "../../types";
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

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return props.images.length - 1;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= props.images.length - 1) return 0;
      return prev + 1;
    });
  };

  // Touch swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Threshold for swipe
    if (Math.abs(diff) > 50) {
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

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scrolling

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
          <div class="lightbox-image-placeholder">
            <span>이미지 {currentIndex() + 1}</span>
          </div>
        </div>

        <div class="lightbox-controls">
          <button class="lightbox-nav lightbox-prev" onClick={handlePrev}>
            ‹
          </button>
          <div class="lightbox-counter">
            {currentIndex() + 1} / {props.totalImages}
          </div>
          <button class="lightbox-nav lightbox-next" onClick={handleNext}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
