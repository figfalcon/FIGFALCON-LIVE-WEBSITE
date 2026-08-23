import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// The base pixel snippet in index.html already fires the first PageView on load.
// This only fires on subsequent client-side route changes (SPA navigations).
const MetaPixelPageView = () => {
  const { pathname } = useLocation();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
};

export default MetaPixelPageView;
