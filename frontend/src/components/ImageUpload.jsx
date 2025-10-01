// OLD CODE (commented out for reference):
// import { useState } from "react";
// import axios from "axios";
// export default function ImageUpload({ onUpload }) {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };
//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('image', file);
//     try {
//       const response = await axios.post('http://localhost:5000/api/caption', formData);
//       onUpload(response.data.caption);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (/* JSX */);
// }

// NEW CODE (production-level with service layer):
import { useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      // Automatically trigger upload when file is selected
      onUpload(selectedFile);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-input"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {fileName && (
        <div className="text-sm text-gray-600 text-center">
          Selected: <span className="font-medium">{fileName}</span>
        </div>
      )}
    </div>
  );
}