import httpClient from '../../api/httpClient';
import {API_URLS} from '../../api/urls';

export const uploadFile = async (file: any): Promise<string> => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.mime,
  });

  const response = await httpClient.post(
    API_URLS.UPLOAD.SINGLE_FILE,
    formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );

  return response.data?.key;
};
export const uploadMultipleDocuments = async (documents: {
  [key: string]: {
    uri: string;
    name: string;
    type: string;
  } | null;
}): Promise<{[key: string]: string}> => {
  const formData = new FormData();

  Object.entries(documents).forEach(([key, file]) => {
    if (file) {
      formData.append(key, {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    }
  });

  const response = await httpClient.post(
    API_URLS.UPLOAD.MULTIPLE_FILES,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data?.result;
};
