import { useState } from "react";
import { useDrop } from "react-dnd";

export default function Bucket({
  onDrop,
  isFilled,
  boxes,
  indexOf,
  handleUndrop,
}) {
  const [itemName, setItemName] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "BOX",
      canDrop: () => !itemName,
      drop: (item, monitor) => {
        onDrop(item, monitor);
        setItemName(item.item.name);
        setCurrentItem(item);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [boxes]
  );

  const unDrop = () => {
    handleUndrop(indexOf, currentItem);
    setItemName("");
  };

  return (
    <div
      ref={drop}
      role="Bucket"
      style={{
        backgroundColor: canDrop ? "#f9f9f9" : "white",
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        paddingLeft: "1rem",
        borderLeftWidth: 1,
        borderColor: "#e5e7eb",
        fontStyle: "italic",
        fontSize: ".9rem",
        color: "#6c6c6c",
      }}
    >
      {itemName ? (
        <div>
          {itemName} <button onClick={unDrop}>Undrop</button>
        </div>
      ) : canDrop ? (
        "Release here to drop"
      ) : (
        "Drag a box here"
      )}
    </div>
  );
}
