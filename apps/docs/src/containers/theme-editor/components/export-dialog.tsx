import React, { useState } from 'react';
import { Button, Modal, Tabs } from '@tiny-design/react';
import { generateCSS, generateSCSS } from '../utils/export-theme';

interface ExportDialogProps {
  visible: boolean;
  onClose: () => void;
  seeds: Record<string, string>;
  appliedTokens: Record<string, string>;
}

export const ExportDialog = ({
  visible,
  onClose,
  seeds,
  appliedTokens,
}: ExportDialogProps): React.ReactElement => {
  const [copied, setCopied] = useState(false);

  const cssCode = generateCSS(appliedTokens);
  const scssCode = generateSCSS(seeds);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Modal
      visible={visible}
      title="Export Theme"
      onClose={onClose}
      width={640}
      footer={null}
    >
      <Tabs defaultActiveKey="css">
        <Tabs.Panel tab="CSS Variables" tabKey="css">
          <div className="theme-editor__export-block">
            <pre className="theme-editor__export-code">{cssCode}</pre>
            <Button
              size="sm"
              btnType="primary"
              onClick={() => handleCopy(cssCode)}
              className="theme-editor__export-copy"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </Tabs.Panel>
        <Tabs.Panel tab="SCSS Variables" tabKey="scss">
          <div className="theme-editor__export-block">
            <pre className="theme-editor__export-code">{scssCode}</pre>
            <Button
              size="sm"
              btnType="primary"
              onClick={() => handleCopy(scssCode)}
              className="theme-editor__export-copy"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
