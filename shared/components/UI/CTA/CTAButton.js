export default function Button({ children }) {
  return (
    <button className="text-neutral-50 bg-ctablue rounded-md px-10 h-8 font-bold cursor-pointer z-10 hover:bg-hoverctablue ">
      {children}
    </button>
  );
}
