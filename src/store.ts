import { createSignal, createMemo } from 'solid-js';
import { GalleryImage } from './types';
import weddingConfig from './data/wedding-config.json';

// Only keeping the dynamic state that needs to be reactive
export const [introCompleted, setIntroCompleted] = createSignal(false);
export const [selectedImageId, setSelectedImageId] = createSignal<number | null>(null);

// Computed value for the selected image index
export const selectedImageIndex = createMemo(() => {
  const id = selectedImageId();
  if (id === null) return -1;
  
  return weddingConfig.galleryImages.findIndex((img: GalleryImage) => img.id === id);
});

export const totalImages = createMemo(() => {
  return weddingConfig.galleryImages.length;
}); 