import { useRef, forwardRef, useEffect } from "react";

const IndeterminateCheckbox = ({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef(null);
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [indeterminate, resolvedRef]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
};

const InputCheckbox = forwardRef(IndeterminateCheckbox);
export default InputCheckbox;
