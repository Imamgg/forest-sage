import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = el.querySelectorAll(".scroll-reveal");
    children.forEach((child) => observer.observe(child));
    if (el.classList.contains("scroll-reveal")) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
