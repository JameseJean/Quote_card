import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

export const Preview: React.FC<{ texts: string[]; template: any; onExport: (dataUrl: string) => void; }> = ({ texts, template, onExport }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current);
    const dataUrl = canvas.toDataURL('image/png');
    onExport(dataUrl);
  };

  return (
    <div ref={previewRef}>
      {texts.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
      <button onClick={handleExport}>导出</button>
    </div>
  );
}; 