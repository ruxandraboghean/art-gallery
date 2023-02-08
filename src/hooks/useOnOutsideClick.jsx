import React, { useRef, useEffect } from "react";

export const useOnOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleSelect = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleSelect);

    return () => {
      document.removeEventListener("click", handleSelect);
    };
  }, [ref]);

  return ref;
};
