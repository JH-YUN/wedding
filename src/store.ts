import { createSignal, createMemo } from 'solid-js';
import { GalleryImage } from './types';

// Only keeping the dynamic state that needs to be reactive
export const [introCompleted, setIntroCompleted] = createSignal(false);
export const [selectedImageId, setSelectedImageId] = createSignal<number | null>(null);

// 이미지 캐싱 시스템
export const [loadedImages, setLoadedImages] = createSignal(new Set<string>());
export const [loadingImages, setLoadingImages] = createSignal(new Set<string>());
export const [imageLoadErrors, setImageLoadErrors] = createSignal(new Set<string>());

// 전역 이미지 데이터 관리
export const allImages = createMemo(() => {
  // 특정 폴더의 모든 이미지를 자동으로 불러오기
  const imageModules = import.meta.glob('/public/image/pic*.{png,jpg,jpeg,webp}', { 
    eager: true, 
    as: 'url' 
  });

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

// Computed value for the selected image index
export const selectedImageIndex = createMemo(() => {
  const id = selectedImageId();
  if (id === null) return -1;
  
  return allImages().findIndex((img: GalleryImage) => img.id === id);
});

export const totalImages = createMemo(() => {
  return allImages().length;
});

// 이미지 preloading 함수
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 로드된 이미지는 스킵
    if (loadedImages().has(src)) {
      resolve();
      return;
    }

    // 이미 로딩 중인 이미지는 스킵
    if (loadingImages().has(src)) {
      resolve();
      return;
    }

    // 로딩 상태 추가
    setLoadingImages(prev => new Set([...prev, src]));

    const img = new Image();
    
    img.onload = () => {
      // 로딩 완료 시 상태 업데이트
      setLoadedImages(prev => new Set([...prev, src]));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
      resolve();
    };

    img.onerror = () => {
      // 에러 시 상태 업데이트
      setImageLoadErrors(prev => new Set([...prev, src]));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });
};

// 현재 이미지와 앞뒤 이미지 preload
export const preloadAdjacentImages = (currentIndex: number) => {
  const images = allImages();
  const preloadPromises: Promise<void>[] = [];

  // 현재 이미지
  if (images[currentIndex]) {
    preloadPromises.push(preloadImage(images[currentIndex].src));
  }

  // 다음 이미지 (순환)
  const nextIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
  if (images[nextIndex]) {
    preloadPromises.push(preloadImage(images[nextIndex].src));
  }

  // 이전 이미지 (순환)
  const prevIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
  if (images[prevIndex]) {
    preloadPromises.push(preloadImage(images[prevIndex].src));
  }

  // 다다음과 전전 이미지도 preload (낮은 우선순위)
  const nextNext = nextIndex >= images.length - 1 ? 0 : nextIndex + 1;
  const prevPrev = prevIndex <= 0 ? images.length - 1 : prevIndex - 1;
  
  if (images[nextNext]) {
    preloadPromises.push(preloadImage(images[nextNext].src));
  }
  if (images[prevPrev]) {
    preloadPromises.push(preloadImage(images[prevPrev].src));
  }

  return Promise.allSettled(preloadPromises);
}; 