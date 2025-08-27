import React from 'react';

type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

interface ResultsDisplayProps {
  status: UploadStatus;
  data: any;
}

// Fonction utilitaire pour créer la table, inspirée du script original
const createTableFromJSON = (operationsData: any[]) => {
  if (!Array.isArray(operationsData) || operationsData.length === 0) {
    return <p>Aucune opération à afficher.</p>;
  }

  const headers = Object.keys(operationsData[0]);

  return (
    <table className="response-table">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {operationsData.map((row, index) => (
          <tr key={index}>
            {headers.map(header => (
              <td key={header}>{row[header] === null ? '' : row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ status, data }) => {
  if (status !== 'success' || !data) {
    return null; // N'affiche rien si pas de succès ou pas de données
  }

  const isJson = typeof data === 'object' && data !== null;

  return (
    <div className="response-container">
      <h2>Données Extraites</h2>
      <div className="response-content">
        {isJson ? (
          <>
            {data.solde && <p><strong>Solde :</strong> {data.solde}</p>}
            {data.operations && createTableFromJSON(data.operations)}
          </>
        ) : (
          <pre>{data}</pre> // Fallback pour du texte brut
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;