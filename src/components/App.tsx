import { useState } from "react";

import FileUpload from "./FileUpload";
import SoundPlayer from "./SoundPlayer";

const App = () => {
  const [sound, setSound] = useState<File | null>(null);
  const [convertedSound, setConvertedSound] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!sound) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("sound", sound);

    const data = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const response = await data.json();

    if (response.message === "Sound uploaded!") {
      alert(`Sound uploaded! ID: ${response.id}`);
    }

    const convertedData = await fetch(`/api/download?id=${response.id}`);

    const convertedFile = await convertedData.blob();
    setConvertedSound(new File([convertedFile], "converted.wav"));
  };

  return (
    <main className="flex justify-center min-h-screen items-center flex-col gap-y-3">
      <div className="shadow-md text-center flex flex-col gap-y-3 rounded-md p-4">
        <h1 className="text-xl font-bold">อะไรวะ</h1>
        <FileUpload setFile={setSound} />
        <button
          onClick={handleUpload}
          className="p-2 bg-blue-700 font-semibold text-white rounded-md">
          Upload?
        </button>
      </div>
      {convertedSound && <SoundPlayer sound={convertedSound} />}
    </main>
  );
};

export default App;
