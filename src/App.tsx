import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import StatusIndicator from './components/StatusIndicator';
import ResultsDisplay from './components/ResultsDisplay';
import { uploadFile } from './services/api';

// Définition des types pour l'état
type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [responseData, setResponseData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadStatus('idle'); // Réinitialiser le statut si un nouveau fichier est sélectionné
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Veuillez d\'abord sélectionner un fichier.');
      setUploadStatus('error');
      return;
    }

    setUploadStatus('loading');
    setErrorMessage(null);
    setResponseData(null);

    try {
      const data = await uploadFile(selectedFile);
      setResponseData(data);
      setUploadStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Une erreur inattendue est survenue.');
      }
      setUploadStatus('error');
    }
  };

  return (
    <div className="container">
      <h1>Téléverser un fichier Excel vers n8n</h1>
      <FileUpload 
        onFileSelect={handleFileSelect} 
        onUpload={handleUpload} 
        disabled={uploadStatus === 'loading'}
      />
      <StatusIndicator 
        status={uploadStatus} 
        errorMessage={errorMessage}
      />
      <ResultsDisplay 
        status={uploadStatus}
        data={responseData}
      />
    </div>
  );
};

export default App;
