import { CheckCircle, Close, CloseCircle, LoadingCircle, PaperClip } from '../_utils/components';
import Progress from '../progress';
import { UploadFile } from './types';

type UploadListProps = {
  prefixCls: string;
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
};

const UploadList = (props: UploadListProps): JSX.Element => {
  const { prefixCls, fileList, onRemove } = props;

  return (
    <ul className={`${prefixCls}__upload-list`}>
      {fileList.map((file) => {
        const { uid, name, status, percent } = file;
        return (
          <li key={uid} className={`${prefixCls}__upload-list-item`}>
            <div className={`${prefixCls}__upload-list-item-container`}>
              <PaperClip size={11} color="rgba(0, 0, 0, 0.45)" />
              <span className={`${prefixCls}__upload-list-item-name`}>{name}</span>
              <span className={`${prefixCls}__upload-list-item-status`}>
                {status === 'done' && <CheckCircle size={16} />}
                {status === 'error' && <CloseCircle size={16} />}
                {status === 'uploading' && (
                  <LoadingCircle
                    style={{ animation: 'ty-rotate 1s linear infinite' }}
                    color="#1890ff"
                    size={16}
                  />
                )}
              </span>
              <button
                type="button"
                className={`${prefixCls}__upload-list-item-delete`}
                onClick={(): void => onRemove && onRemove(file)}
                aria-label={`Remove ${name}`}>
                <Close size={12} />
              </button>
            </div>
            {status === 'uploading' && (
              <Progress.Bar
                strokeColor="blue"
                percent={percent}
                showInfo={false}
                style={{ marginTop: 5 }}
                strokeWidth={2}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

UploadList.displayName = 'UploadList';

export default UploadList;
