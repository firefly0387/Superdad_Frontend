export const preloadImage = (src?: string) => {
  return new Promise<void>((resolve) => {
    if (!src) return resolve();

    const img = new Image();

    img.onload = () => resolve();
    img.onerror = () => resolve(); // never block

    img.src = src;
  });
};