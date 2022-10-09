import { useDrag } from "react-dnd";

export default function DraggableBox({ name, schema, isDropped }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "BOX",
      item: { schema },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [name]
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
