import { useState, useEffect } from "react";
import { TbArrowAutofitRight } from "react-icons/tb";

export default function SideModalProperties({
  previewIsOpen,
  setPreviewIsOpen,
  previewId,
}) {
  console.log(previewId)
  return (
    <>
      <button
        className="absolute -left-8 px-2 py-2 bg-slate-50 w-fit rounded hover:bg-slate-100"
        onClick={() => setPreviewIsOpen(false)}
      >
        <TbArrowAutofitRight size={20} color="#6c6c6c" />
      </button>
      <div className="overflow-auto pb-[8rem]"></div>
    </>
  );
}
