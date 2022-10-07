import { useDrop } from "react-dnd";

export default function Bucket() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      role="Bucket"
      style={{
        backgroundColor: isOver ? "#f9f9f9" : "white",
        display: 'flex',
        height: "100%",
        width: "100%",
        alignItems: 'center',
        paddingLeft: '1rem',
        borderLeftWidth: 1,
        borderColor: '#e5e7eb',
        fontStyle: 'italic',
        fontSize: '.9rem',
        color: '#6c6c6c'
      }}
    >
      {canDrop ? "Release here to drop" : "Drag a box here"}
    </div>
  );
}
