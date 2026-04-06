import React, { useState } from 'react';
import type { ThemeDocument } from '@tiny-design/react';
import { Button, Modal, Tabs } from '@tiny-design/react';
import { generateCSS, generateJSON } from '../utils/export-theme';

interface ExportDialogProps {
  visible: boolean;
  onClose: () => void;
  appliedTokens: Record<string, string>;
  themeDocument: ThemeDocument;
}

function downloadFile(content: string, filename: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const ExportDialog = ({
  visible,
  onClose,
  appliedTokens,
  themeDocument,
}: ExportDialogProps): React.ReactElement => {
  const [copied, setCopied] = useState(false);

  const cssCode = generateCSS(appliedTokens);
  const jsonCode = generateJSON(themeDocument);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderBlock = (code: string, filename: string, mime: string) => (
    <div className="theme-editor__export-block">
      <pre className="theme-editor__export-code">{code}</pre>
      <div className="theme-editor__export-actions">
        <Button
          size="sm"
          btnType="primary"
          onClick={() => handleCopy(code)}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          size="sm"
          onClick={() => downloadFile(code, filename, mime)}
        >
          Download
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      header="Export Theme"
      onClose={onClose}
      width={640}
      footer={null}
    >
      <Tabs defaultActiveKey="css">
        <Tabs.Panel tab="CSS Variables" tabKey="css">
          {renderBlock(cssCode, 'tiny-theme.css', 'text/css')}
        </Tabs.Panel>
        <Tabs.Panel tab="Theme Document" tabKey="json">
          {renderBlock(jsonCode, 'tiny-theme.document.json', 'application/json')}
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
