import React from "react";

export default function CaptionDisplay({ caption, loading, error }) {
  if (loading) return <p>Generating caption...</p>;
  if (error) return <p className="text-red-600">{String(error)}</p>;
  if (!caption) return null;

  return (
    <div className="mt-4 p-3 border rounded">
      <p className="whitespace-pre-wrap">{caption}</p>
    </div>
  );
}

// Optional named export (lets you import { CaptionDisplay } if you want)
export { CaptionDisplay };