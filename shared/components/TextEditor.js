import { useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import styles from '../../styles/TextEditor.module.css'

const Quill = typeof window === "object" ? require("quill") : () => false;

export default function TextEditor() {
  const options= {
    
  }

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow" });
  }, []);

  return <div id="quillContainer" ref={wrapperRef}></div>;
}
