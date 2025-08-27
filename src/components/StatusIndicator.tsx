import React from 'react';

type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

interface StatusIndicatorProps {
  status: UploadStatus;
  errorMessage: string | null;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, errorMessage }) => {
  
  const getStatusStyle = () => {
    switch (status) {
      case 'success':
        return { color: 'green' };
      case 'error':
        return { color: 'red' };
      default:
        return { color: 'black' };
    }
  };

  return (
    <div className="status" style={getStatusStyle()}>
      {status === 'loading' && <p>Téléversement en cours...</p>}
      {status === 'success' && <p>Fichier traité avec succès !</p>}
      {status === 'error' && <p>Erreur: {errorMessage}</p>}
    </div>
  );
};

export default StatusIndicator;