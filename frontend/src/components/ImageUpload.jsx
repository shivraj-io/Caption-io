import { useState } from "react";
import API from "../api";

export default function ImageUpload({ setCaption }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await API.post("/caption", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCaption(res.data.caption);
    } catch (err) {
      console.error(err);
      alert("Error generating caption! (Maybe not logged in)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="p-2 border rounded w-full"
      />
      <button 
        onClick={handleUpload}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Upload & Get Caption"}
      </button>
    </div>
  );
}
