import { useRef, useEffect } from "react";
import EditingTimestampsRow from "./EditingTimestampsRow";

const EditingRow = ({ label, name, value, onChange, type = "text" }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex items-center gap-2">
      <label
        className="text-lg font-semibold mr-2 w-34 text-right"
        style={name === "timestamps" ? { marginLeft: "1.1rem" } : {}}
      >
        {label}:
      </label>
      {type === "checkbox" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="p-2 border rounded flex-1"
          />
        </div>
      ) : type === "textarea" ? (
        <textarea
          ref={textAreaRef}
          name={name}
          value={Array.isArray(value) ? value.join("\n") : value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 border rounded flex-1 overflow-hidden resize-none"
        />
      ) : type === "date" ? (
        <input
          type="date"
          name={name}
          value={new Date(value).toISOString().split("T")[0]}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 border rounded flex-1"
        />
      ) : name === "timestamps" ? (
        <div className="flex flex-col gap-2 w-full">
          <EditingTimestampsRow value={value} onChange={onChange} />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 border rounded flex-1"
        />
      )}
    </div>
  );
};

export default EditingRow;
