import { useState, useEffect } from "react";

const EditingTimestampsRow = ({ value, onChange }) => {
  const [timestampPairs, setTimestampPairs] = useState(() => {
    if (!value) {
      return [{ time: "", line: "" }];
    }

    let obj = value;
    if (typeof value === "string") {
      try {
        obj = JSON.parse(value);
      } catch {
        return [{ time: "", line: "" }];
      }
    }

    const pairs = Object.entries(obj).map(([time, line]) => ({
      time,
      line: String(line),
    }));

    return pairs.length ? pairs : [{ time: "", line: "" }];
  });

  useEffect(() => {
    const timestampObject = timestampPairs.reduce((acc, pair) => {
      if (pair.time.trim()) {
        acc[pair.time] = pair.line;
      }
      return acc;
    }, {});

    if (typeof onChange === "function") {
      onChange(JSON.stringify(timestampObject));
    }
  }, [timestampPairs]);

  const addTimestampPair = () => {
    setTimestampPairs([...timestampPairs, { time: "", line: "" }]);
  };

  const removeTimestampPair = (index) => {
    if (timestampPairs.length > 1) {
      const updatedPairs = timestampPairs.filter((_, i) => i !== index);
      setTimestampPairs(updatedPairs);
    }
  };

  const handleTimestampChange = (index, field, value) => {
    const updatedPairs = [...timestampPairs];
    updatedPairs[index] = { ...updatedPairs[index], [field]: value };
    setTimestampPairs(updatedPairs);
  };

  return (
    <>
      {timestampPairs.map((pair, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Time (seconds only)"
            value={pair.time}
            onChange={(e) =>
              handleTimestampChange(index, "time", e.target.value)
            }
            className="p-2 border rounded w-1/3"
          />
          <input
            type="text"
            placeholder="Line"
            value={pair.line}
            onChange={(e) =>
              handleTimestampChange(index, "line", e.target.value)
            }
            className="p-2 border rounded w-2/3"
          />
          {timestampPairs.length > 1 && (
            <button
              type="button"
              onClick={() => removeTimestampPair(index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              −
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addTimestampPair}
        className="self-start p-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer"
      >
        + Add Timestamp
      </button>
    </>
  );
};

export default EditingTimestampsRow;
