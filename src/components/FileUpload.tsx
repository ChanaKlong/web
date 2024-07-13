interface FileUploadProps {
  setFile: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return <input type="file" onChange={onFileChange} accept=".wav" />;
};

export default FileUpload;
