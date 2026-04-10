import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import ajax from './ajax';
import UploadList from './upload-list';
import DraggerCover from './dragger-cover';
import { UploadFile, UploadProps } from './types';

const Upload = React.forwardRef<HTMLDivElement, UploadProps>((props, ref) => {
  const {
    defaultFileList = [],
    httpRequest = ajax,
    disabled = false,
    method = 'post',
    headers,
    withCredentials,
    accept,
    action,
    multiple,
    name,
    data,
    drag,
    beforeUpload,
    limit,
    onExceed,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    tip,
    className,
    style,
    children,
    prefixCls: customisedCls,
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('upload', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_disabled`]: disabled,
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const fileListRef = useRef<UploadFile[]>([]);
  const isControlled = Array.isArray(props.fileList);
  const [fileList, setFileList] = useState<UploadFile[]>(
    isControlled ? props.fileList ?? [] : defaultFileList
  );
  const mergedFileList = useMemo(
    () => (isControlled ? props.fileList ?? [] : fileList),
    [fileList, isControlled, props.fileList]
  );

  useEffect(() => {
    fileListRef.current = mergedFileList;
  }, [mergedFileList]);

  useEffect(() => {
    if (isControlled) {
      setFileList(props.fileList ?? []);
    }
  }, [isControlled, props.fileList]);

  const setMergedFileList = (
    nextFileListOrUpdater: UploadFile[] | ((currentFileList: UploadFile[]) => UploadFile[])
  ): UploadFile[] => {
    const nextFileList =
      typeof nextFileListOrUpdater === 'function'
        ? nextFileListOrUpdater(fileListRef.current)
        : nextFileListOrUpdater;
    fileListRef.current = nextFileList;
    if (!isControlled) {
      setFileList(nextFileList);
    }
    return nextFileList;
  };

  const updateFileList = (updateFile: UploadFile, targetObj: Partial<UploadFile>): UploadFile[] => {
    const nextFileList = fileListRef.current.map((file: UploadFile) => {
      if (file.uid === updateFile.uid) {
        return { ...file, ...targetObj };
      }
      return file;
    });
    return setMergedFileList(nextFileList);
  };

  const xhrOnProgress = (percent: number, uploadFile: UploadFile): void => {
    const updateObj: Partial<UploadFile> = { percent, status: 'uploading' };
    const nextFileList = updateFileList(uploadFile, updateObj);
    onProgress && onProgress(percent, { ...uploadFile, ...updateObj }, nextFileList);
  };

  const xhrOnComplete = (e: ProgressEvent, uploadFile: UploadFile): void => {
    const updateObj: Partial<UploadFile> = { status: 'done' };
    const nextFileList = updateFileList(uploadFile, updateObj);
    const updatedUploadFile = { ...uploadFile, ...updateObj };
    onSuccess && onSuccess(e, updatedUploadFile, nextFileList);
    onChange && onChange(updatedUploadFile, nextFileList);
  };

  const xhrOnError = (e: ProgressEvent, uploadFile: UploadFile): void => {
    const updateObj: Partial<UploadFile> = { status: 'error' };
    const nextFileList = updateFileList(uploadFile, updateObj);
    const updatedUploadFile = { ...uploadFile, ...updateObj };
    onError && onError(e, updatedUploadFile, nextFileList);
    onChange && onChange(updatedUploadFile, nextFileList);
  };

  const postRequest = (file: File): void => {
    // Create a upload file instance
    const uploadFile: UploadFile = {
      uid: 'file-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
      name: file.name,
      status: 'ready',
      percent: 0,
    };
    const nextFileList = setMergedFileList((currentFileList) => [uploadFile, ...currentFileList]);
    onChange && onChange(uploadFile, nextFileList);

    httpRequest({
      headers,
      withCredentials,
      file,
      data,
      filename: name || 'file',
      method,
      action,
      onProgress: (percent: number) => xhrOnProgress(percent, uploadFile),
      onSuccess: (e: ProgressEvent) => xhrOnComplete(e, uploadFile),
      onError: (e: ProgressEvent) => xhrOnError(e, uploadFile),
    });
  };

  const uploadFiles = (files: FileList): void => {
    if (limit && mergedFileList.length + files.length > limit) {
      onExceed && onExceed(files, mergedFileList);
      return;
    }

    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        postRequest(file);
      } else {
        const res = beforeUpload(file);
        if (res && res instanceof Promise) {
          res
            .then((processedFile: File | boolean) => {
              if (processedFile === false) return;
              postRequest(processedFile instanceof File ? processedFile : file);
            })
            .catch(() => undefined);
        } else if (res !== false) {
          postRequest(file);
        }
      }
    });
  };

  const handleTriggerOnClick = (): void => {
    if (!disabled) {
      if (fileRef.current) {
        (fileRef.current as HTMLInputElement).click();
      }
    }
  };

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.currentTarget.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileRef.current) {
      (fileRef.current as HTMLInputElement).value = '';
    }
  };

  const handleOnRemove = (uploadFile: UploadFile): void => {
    const nextFileList = setMergedFileList(
      fileListRef.current.filter((file) => file.uid !== uploadFile.uid)
    );
    onRemove && onRemove(uploadFile);
    onChange && onChange(uploadFile, nextFileList);
  };

  return (
    <>
      <div ref={ref} className={cls} style={style} onClick={handleTriggerOnClick}>
        {drag ? (
          <DraggerCover prefixCls={prefixCls} onFile={uploadFiles} disabled={disabled}>
            {children}
          </DraggerCover>
        ) : (
          children
        )}
        {tip && <div className={`${prefixCls}__tip`}>{tip}</div>}
        <input
          ref={fileRef}
          accept={accept}
          multiple={multiple}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileOnChange}
        />
      </div>
      <UploadList prefixCls={prefixCls} fileList={mergedFileList} onRemove={handleOnRemove} />
    </>
  );
});

Upload.displayName = 'Upload';

export default Upload;
