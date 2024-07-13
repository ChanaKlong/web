interface SoundPlayerProps {
  sounds: File[];
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ sounds }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {sounds.map((sound: File, index: number) => (
        <div className="flex flex-row items-center gap-x-3">
          <p>{sound.name}</p>
          <audio key={index} controls>
            <source src={URL.createObjectURL(sound)} />
          </audio>
        </div>
      ))}
    </div>
  );
};

export default SoundPlayer;
