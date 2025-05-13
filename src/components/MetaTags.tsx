import { onMount } from "solid-js";
import weddingConfig from "../data/wedding-config.json";

interface MetaTagsProps {
  ogImageUrl?: string;
}

export default function MetaTags(props: MetaTagsProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  onMount(() => {
    // Update dynamic meta tags
    const titleElement = document.querySelector("title");
    if (titleElement) {
      titleElement.textContent = `${weddingConfig.weddingInfo.groomFullName} ♥ ${weddingConfig.weddingInfo.brideFullName} 결혼식에 초대합니다`;
    }

    // Update OpenGraph meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    };

    const weddingDate = formatDate(weddingConfig.weddingInfo.date);
    updateMetaTag(
      "og:title",
      `${weddingConfig.weddingInfo.groomFullName} ♥ ${weddingConfig.weddingInfo.brideFullName} 결혼식`
    );
    updateMetaTag(
      "og:description",
      `${weddingDate}에 ${weddingConfig.weddingInfo.location}에서 열리는 결혼식에 초대합니다.`
    );

    if (props.ogImageUrl) {
      updateMetaTag("og:image", props.ogImageUrl);
    }
  });

  return null; // This component doesn't render anything
}
