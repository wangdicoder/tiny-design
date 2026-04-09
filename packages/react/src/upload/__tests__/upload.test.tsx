import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Upload from '../index';
import type { UploadFile } from '../types';

describe('<Upload />', () => {
  const createFile = (name = 'demo.txt') => new File(['hello'], name, { type: 'text/plain' });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Upload action="/upload" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Upload action="/upload" />);
    expect(container.firstChild).toHaveClass('ty-upload');
  });

  it('should render file input', () => {
    const { container } = render(<Upload action="/upload" />);
    expect(container.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('should render disabled', () => {
    const { container } = render(<Upload action="/upload" disabled />);
    expect(container.firstChild).toHaveClass('ty-upload_disabled');
  });

  it('should append an uploading file and emit onChange with the latest file list', async () => {
    const onChange = jest.fn();
    const httpRequest = jest.fn();
    const { container } = render(
      <Upload action="/upload" onChange={onChange} httpRequest={httpRequest} />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile()] } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    const [file, fileList] = onChange.mock.calls[0];
    expect(file.name).toBe('demo.txt');
    expect(file.status).toBe('ready');
    expect(fileList).toHaveLength(1);
    expect(fileList[0].name).toBe('demo.txt');
    expect(httpRequest).toHaveBeenCalledTimes(1);
  });

  it('should respect controlled fileList updates from the parent', () => {
    const ControlledUpload = () => {
      const [fileList, setFileList] = React.useState<UploadFile[]>([]);
      return (
        <>
          <Upload
            action="/upload"
            fileList={fileList}
            onChange={(file) => {
              setFileList((prev) => [...prev, file]);
            }}
            httpRequest={jest.fn()}
          />
          <button
            onClick={() =>
              setFileList([
                {
                  uid: 'external',
                  name: 'server.pdf',
                  status: 'done',
                },
              ])
            }
          >
            sync
          </button>
        </>
      );
    };

    const { container } = render(<ControlledUpload />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [createFile()] } });
    expect(screen.getByText('demo.txt')).toBeInTheDocument();

    fireEvent.click(screen.getByText('sync'));
    expect(screen.queryByText('demo.txt')).not.toBeInTheDocument();
    expect(screen.getByText('server.pdf')).toBeInTheDocument();
  });

  it('should remove files and emit the next file list', () => {
    const onChange = jest.fn();
    const onRemove = jest.fn();
    render(
      <Upload
        action="/upload"
        defaultFileList={[
          { uid: '1', name: 'a.png', status: 'done' },
          { uid: '2', name: 'b.png', status: 'done' },
        ]}
        onChange={onChange}
        onRemove={onRemove}
      />
    );

    fireEvent.click(screen.getByLabelText('Remove a.png'));

    expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ uid: '1', name: 'a.png' }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ uid: '1', name: 'a.png' }),
      [expect.objectContaining({ uid: '2', name: 'b.png' })]
    );
  });

  it('should not upload when beforeUpload returns false', () => {
    const httpRequest = jest.fn();
    const { container } = render(
      <Upload
        action="/upload"
        beforeUpload={() => false}
        httpRequest={httpRequest}
      />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile()] } });

    expect(httpRequest).not.toHaveBeenCalled();
  });
});
