import { useState, useEffect } from "react";

function useMediaQuery2(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQueryList.matches);

    // Додаємо слухача подій для відстеження змін медіа-запиту
    mediaQueryList.addEventListener("change", handleChange);

    // Відписуємося від слухача під час розмонтування компонента
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery2;
