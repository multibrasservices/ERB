import React from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onUpload: () => void;
  disabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, onUpload, disabled }) => {
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        className="file-input" 
        accept=".xlsx, .xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        onChange={handleFileChange} 
        disabled={disabled} 
      />
      <button onClick={onUpload} disabled={disabled}>
        {disabled ? 'Téléversement en cours...' : 'Téléverser'}
      </button>
    </div>
  );
};

export default FileUpload;