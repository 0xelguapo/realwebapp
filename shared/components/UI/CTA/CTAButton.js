import Link from "next/link";

export default function Button({ children }) {
  return (
      <a href="https://apps.apple.com/us/app/coagent/id6444050295" target="_blank" rel="noreferrer">
        <button className="text-neutral-50 bg-ctablue rounded-md px-10 h-8 font-bold cursor-pointer z-10 hover:bg-hoverctablue">
          {children}
        </button>
      </a>
  );
}
