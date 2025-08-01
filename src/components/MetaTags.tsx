import { onMount } from "solid-js";

interface MetaTagsProps {
  ogImageUrl?: string;
}

export default function MetaTags(props: MetaTagsProps) {
  // 빌드 시 메타 태그가 이미 생성되므로, 
  // 개발 환경에서만 동적으로 업데이트
  onMount(() => {
    if (import.meta.env.DEV && props.ogImageUrl) {
      // 개발 환경에서만 동적 이미지 URL 업데이트
      const updateMetaTag = (property: string, content: string) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.setAttribute("property", property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute("content", content);
      };

      updateMetaTag("og:image", props.ogImageUrl);
    }
  });

  return null; // This component doesn't render anything
}
