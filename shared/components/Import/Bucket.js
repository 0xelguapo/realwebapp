import { useState } from "react";
import { useDrop } from "react-dnd";
import { IoClose } from "react-icons/io5";

export default function Bucket({
  onDrop,
  isFilled,
  boxes,
  indexOf,
  handleUndrop,
  droppedBoxNames,
}) {
  console.log(droppedBoxNames[indexOf])
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "BOX",
      canDrop: () => !droppedBoxNames[indexOf],
      drop: (item, monitor) => {
        onDrop(item, monitor);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [boxes]
  );

  const unDrop = () => {
    handleUndrop(indexOf, droppedBoxNames[indexOf].item);
  };

  return (
    <div
      ref={drop}
      role="Bucket"
      style={{
        backgroundColor: canDrop ? "#ececec" : "#f7f7f7",
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        borderLeftWidth: 1,
        borderColor: "#e5e7eb",
        fontStyle: "italic",
        fontSize: ".9rem",
        color: "#6c6c6c",
      }}
    >
      {droppedBoxNames[indexOf] ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            color: "black",
            fontStyle: "normal",
            fontWeight: 700,
            height: "100%",
            alignItems: "center",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            background: 'white'
          }}
        >
          {droppedBoxNames[indexOf].item.name}
          <button onClick={unDrop}>
            <IoClose size={20} color="#454545" />
          </button>
        </div>
      ) : canDrop ? (
        <div style={{paddingLeft: '1rem'}}>Release here to drop</div>
      ) : (
        <div style={{paddingLeft: '1rem'}}>Drag a box here</div>
      )}
    </div>
  );
}
