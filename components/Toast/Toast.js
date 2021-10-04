import React, { useEffect, useState } from "react";

export default function Toast({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 10000);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-0 right-0 mx-auto max-w-xs w-full bg-green-900 p-2 rounded-md shadow-md">
      <h1>{message}</h1>
    </div>
  );
}
