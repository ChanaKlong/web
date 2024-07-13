import ReactAudioPlayer from "react-audio-player";

interface SoundPlayerProps {
  sounds: File[];
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ sounds }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {sounds.map((sound, index) => (
        <div className="flex flex-row items-center gap-x-3" key={index}>
          <p>{sound.name}</p>
          <ReactAudioPlayer src={URL.createObjectURL(sound)} controls />
        </div>
      ))}
    </div>
  );
};

export default SoundPlayer;
