interface SoundPlayerProps {
  sound: File;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ sound }) => {
  return (
    <audio controls>
      <source src={URL.createObjectURL(sound)} type="audio/wav" />
    </audio>
  );
};

export default SoundPlayer;
