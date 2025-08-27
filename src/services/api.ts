export const uploadFile = async (file: File) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("L'URL du webhook n'est pas configurée dans les variables d'environnement (VITE_N8N_WEBHOOK_URL).");
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(webhookUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur serveur: ${response.status} ${response.statusText}. Réponse: ${errorText}`);
  }

  // Tente de parser la réponse en JSON, sinon la retourne en texte brut.
  const responseBodyText = await response.text();
  try {
    return JSON.parse(responseBodyText);
  } catch (e) {
    return responseBodyText;
  }
};
