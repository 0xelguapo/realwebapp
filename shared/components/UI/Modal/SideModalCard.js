function CardContainer({ children }) {
  return (
    <div className="flex flex-col items-center w-full pt-1">{children}</div>
  );
}

CardContainer.Card = function Card({ children }) {
  return (
    <div className="flex flex-col bg-white w-11/12 border-neutral-200 border rounded-sm px-4 mt-2 py-3">
      {children}
    </div>
  );
};

export default CardContainer;
