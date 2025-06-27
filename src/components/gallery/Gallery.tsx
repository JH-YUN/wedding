import { For, createMemo, createSignal } from "solid-js";
import {
  selectedImageId,
  setSelectedImageId,
  selectedImageIndex,
} from "../../store";
import Lightbox from "./Lightbox";
import "./Gallery.css";

export default function Gallery() {
  // 현재 보여줄 이미지 개수 상태
  const [visibleCount, setVisibleCount] = createSignal(10);
  const LOAD_INCREMENT = 10; // 한 번에 로드할 이미지 개수

  // 특정 폴더의 모든 이미지를 자동으로 불러오기
  const imageModules = import.meta.glob('/public/image/pic*.{png,jpg,jpeg,webp}', { 
    eager: true, 
    as: 'url' 
  });

  // 전체 이미지 배열 생성 및 정렬
  const allImages = createMemo(() => {
    const images = Object.entries(imageModules).map(([path, url], index) => {
      // 파일명에서 숫자 추출하여 정렬에 사용
      const fileName = path.split('/').pop() || '';
      const match = fileName.match(/pic(\d+)/);
      const sortOrder = match ? parseInt(match[1]) : index + 1;
      
      return {
        id: index + 1,
        src: url as string,
        alt: `웨딩 사진 ${sortOrder}`,
        sortOrder
      };
    });
    
    // 숫자 순서대로 정렬
    return images.sort((a, b) => a.sortOrder - b.sortOrder);
  });

  // 현재 보여줄 이미지들만 필터링
  const visibleImages = createMemo(() => {
    return allImages().slice(0, visibleCount());
  });

  // 더보기 버튼 표시 여부
  const hasMoreImages = createMemo(() => {
    return visibleCount() < allImages().length;
  });

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + LOAD_INCREMENT, allImages().length));
  };

  const openLightbox = (id: number) => {
    setSelectedImageId(id);
  };

  const closeLightbox = () => {
    setSelectedImageId(null);
  };

  return (
    <section class="gallery-section">
      <h2 class="section-title">갤러리</h2>

      <div class="gallery-grid">
        <For each={visibleImages()}>
          {(image) => (
            <div class="gallery-item" onClick={() => openLightbox(image.id)}>
              <div class="gallery-image-placeholder">
                <img src={image.src} alt={image.alt} />
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

      {selectedImageId() !== null && (
        <Lightbox
          images={allImages()}
          currentIndex={selectedImageIndex()}
          totalImages={allImages().length}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
