import { useDrag } from "react-dnd";

export default function DraggableBox({ name, item, isDropped, boxes }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "BOX",
      item: { item },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [name, boxes]
  );

  return (
    <div
      ref={drag}
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        opacity: isDragging ? 0.5 : 1,
        borderWidth: 1,
        borderColor: "#e5e7eb,",
        borderRadius: "5px",
        height: "3rem",
        marginBottom: ".4rem",
        fontWeight: 600,
        cursor: "move",
      }}
    >
      {isDropped ? <s>{name}</s> : name}
    </div>
  );
}
