// voice recorder component
import { useEffect } from "react";

interface VoiceRecorderProps {
  recording: MediaRecorder | null;
  setRecording: (recording: MediaRecorder) => void;
  audioURL: string | null;
  setAudioURL: (audioURL: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  recording,
  setRecording,
  audioURL,
  setAudioURL,
}) => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setRecording(mediaRecorder);
    });
  }, []);

  const handleStartRecording = () => {
    recording?.start();
  };

  const handleStopRecording = () => {
    recording?.stop();
  };

  const handleDataAvailable = (event: BlobEvent) => {
    const audioURL = URL.createObjectURL(event.data);
    setAudioURL(audioURL);
  };

  useEffect(() => {
    recording?.addEventListener("dataavailable", handleDataAvailable);

    return () => {
      recording?.removeEventListener("dataavailable", handleDataAvailable);
    };
  }, [recording]);

  return (
    <div className="flex flex-col gap-y-3">
      <button
        onClick={handleStartRecording}
        className="p-2 bg-green-700 font-semibold text-white rounded-md">
        Start recording
      </button>
      <button
        onClick={handleStopRecording}
        className="p-2 bg-red-700 font-semibold text-white rounded-md">
        Stop recording
      </button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/wav" />
        </audio>
      )}
    </div>
  );
};

export default VoiceRecorder;
