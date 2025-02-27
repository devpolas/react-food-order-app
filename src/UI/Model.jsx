import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Model({ open, children, classes, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const modal = ref.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={ref} className={`modal ${classes}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
