// NEW CODE (production-level):
import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import CaptionDisplay from "../components/CaptionDisplay";
import { postService } from "../services/post.service";

export default function Home({ isLoggedIn }) {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setLoading(true);
    setError("");
    setCaption("");

    try {
      const response = await postService.generateCaption(file);
      setCaption(response.caption || response.message);
    } catch (err) {
      setError(err.message || "Failed to generate caption");
      setImagePreview(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            AI Caption Generator
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload an image and get AI-generated captions instantly
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6">
          <ImageUpload onUpload={handleImageUpload} />
          
          {imagePreview && (
            <div className="mt-4">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-full h-auto rounded-lg mx-auto"
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          
          <CaptionDisplay caption={caption} loading={loading} />
        </div>
      </div>
    </div>
  );
}