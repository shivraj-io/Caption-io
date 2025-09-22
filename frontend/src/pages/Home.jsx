import { useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import CaptionDisplay from "../components/CaptionDisplay.jsx";
import { useNavigate } from "react-router-dom";

export default function Home({ isLoggedIn }) {
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then((r) => r.json())
      .then((d) => setStatus(d.message || "OK"))
      .catch((e) => setStatus("Error: " + e.message));
  }, []);

  return (
    <div className="flex flex-col items-center pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📷 Image Caption Generator
      </h1>
      <ImageUpload setCaption={setCaption} />
      <CaptionDisplay caption={caption} />
      <div className="mt-20 p-4">Backend status: {status}</div>
    </div>
  );
}
