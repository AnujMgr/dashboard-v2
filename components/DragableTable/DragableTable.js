import Nestable from "react-nestable";
import React, { useState, useEffect } from "react";

export default function DragableTable({ dataItems, handleChange }) {
  const [items, setItems] = useState(dataItems);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setItems(dataItems), [dataItems]);

  if (!mounted) return null;

  const renderItem = ({ item, index }) => (
    <div className="">
      <span className="mr-4 ">{index + 1}.</span>
      <span className="mb-4 ">{item.name}</span>
    </div>
  );

  return (
    <Nestable
      items={items}
      renderItem={renderItem}
      onChange={(items) => {
        setItems(items.items);
        handleChange(items.items);
      }}
      maxDepth={2}
    />
  );
}
