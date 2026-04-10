import { UploadRequestOption } from './types';

export default function ajax(option: UploadRequestOption): XMLHttpRequest {
  const { action, file, filename, method, onProgress, onSuccess, onError, headers, withCredentials, data } = option;
  const xhr = new XMLHttpRequest();
  xhr.open(method, action, true);
  xhr.onerror = onError;
  xhr.onload = onSuccess;
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e: ProgressEvent): void {
      if (e.total > 0) {
        const percent = (e.loaded / e.total) * 100;
        onProgress(percent);
      }
    };
  }

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const formData = new FormData();
  formData.append(filename, file);
  // Add extra data
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }

  if (headers) {
    for (const item in headers) {
      if (headers[item]) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }
  }

  xhr.send(formData);
  return xhr;
}
