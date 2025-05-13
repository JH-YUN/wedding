import { createSignal, For } from "solid-js";
import {
  selectedImageId,
  setSelectedImageId,
  selectedImageIndex,
  totalImages,
} from "../../store";
import weddingConfig from "../../data/wedding-config.json";
import Lightbox from "./Lightbox";
import "./Gallery.css";

export default function Gallery() {
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
        <For each={weddingConfig.galleryImages}>
          {(image) => (
            <div class="gallery-item" onClick={() => openLightbox(image.id)}>
              <div class="gallery-image-placeholder">
                <span>웨딩 사진</span>
              </div>
            </div>
          )}
        </For>
      </div>

      {selectedImageId() !== null && (
        <Lightbox
          images={weddingConfig.galleryImages}
          currentIndex={selectedImageIndex()}
          totalImages={totalImages()}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
