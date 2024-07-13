import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

import FileUpload from "./FileUpload";
import SoundPlayer from "./SoundPlayer";

const App = () => {
  const [sound, setSound] = useState<File | null>(null);
  const [convertedSound, setConvertedSound] = useState<File[]>([]);

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
    } else {
      alert("An error occurred while uploading the sound");
      return;
    }

    const convertedData = await fetch(`/api/download?id=${response.id}`);

    const convertedFile = await convertedData.blob();
    setConvertedSound((soundArr) => [
      new File([convertedFile], `${response.id}.wav`),
      ...soundArr,
    ]);
  };

  const sendRecord = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("sound", blob, "record.webm");

    const data = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const response = await data.json();

    if (response.message === "Sound uploaded!") {
      alert(`Sound uploaded! ID: ${response.id}`);
    } else {
      alert("An error occurred while uploading the sound");
      return;
    }

    const convertedData = await fetch(`/api/download?id=${response.id}`);
    const convertedFile = await convertedData.blob();

    setConvertedSound((soundArr) => [
      new File([convertedFile], `${response.id}.wav`),
      ...soundArr,
    ]);
  };

  return (
    <main className="flex justify-center min-h-screen items-center flex-col gap-">
      <div className="shadow-md text-center flex flex-col gap-y-3 rounded-md p-4">
        <h1 className="text-xl font-bold">อะไรวะ</h1>
        <FileUpload setFile={setSound} />
        <button
          onClick={handleUpload}
          className="p-2 bg-blue-700 font-semibold text-white rounded-md">
          Upload
        </button>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold">อัดเสียง (ทันที)</h2>
          <AudioRecorder
            onRecordingComplete={sendRecord}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadFileExtension="wav"
          />
        </div>
      </div>
      {convertedSound.length !== 0 && <SoundPlayer sounds={convertedSound} />}
    </main>
  );
};

export default App;
