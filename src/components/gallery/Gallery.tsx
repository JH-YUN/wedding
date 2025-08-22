import { For, createMemo, createSignal } from "solid-js";
import {
  allImages,
  setSelectedImageId,
  preloadAdjacentImages,
} from "../../store";
import "./Gallery.css";

export default function Gallery() {
  // 현재 보여줄 이미지 개수 상태
  const [visibleCount, setVisibleCount] = createSignal(10);
  const LOAD_INCREMENT = 10; // 한 번에 로드할 이미지 개수

  // 현재 보여줄 이미지들만 필터링
  const visibleImages = createMemo(() => {
    return allImages().slice(0, visibleCount());
  });

  console.log(visibleImages())

  // 더보기 버튼 표시 여부
  const hasMoreImages = createMemo(() => {
    return visibleCount() < allImages().length;
  });

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + LOAD_INCREMENT, allImages().length));
  };

  const openLightbox = (id: number) => {
    setSelectedImageId(id);
    
    // 선택된 이미지의 인덱스를 찾아서 preloading 시작
    const imageIndex = allImages().findIndex(img => img.id === id);
    if (imageIndex >= 0) {
      preloadAdjacentImages(imageIndex);
    }
  };

  return (
    <section class="gallery-section">
      <h2 class="section-title">갤러리</h2>

      <div class="gallery-grid">
        <For each={visibleImages()}>
          {(image) => (
            <div class="gallery-item" onClick={() => openLightbox(image.id)}>
              <div class="gallery-image-placeholder">
                <img src={image.src} alt={image.alt} loading="lazy"/>
              </div>
            </div>
          )}
        </For>
      </div>

      {/* 더보기 버튼 */}
      {hasMoreImages() && (
        <div class="load-more-container">
          <button class="load-more-button" onClick={loadMoreImages}>
            더보기 ({allImages().length - visibleCount()}장 남음)
          </button>
        </div>
      )}

    </section>
  );
}
