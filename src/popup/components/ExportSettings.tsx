import React, { useState } from 'react';

interface ExportSettings {
  format: 'png' | 'jpg' | 'webp';
  quality: number;
  scale: number;
}

interface ExportSettingsProps {
  onExport: (settings: ExportSettings) => void;
}

export const ExportSettings: React.FC<ExportSettingsProps> = ({ onExport }) => {
  const [settings, setSettings] = useState<ExportSettings>({
    format: 'png',
    quality: 0.92,
    scale: 2,
  });

  const handleChange = (key: keyof ExportSettings, value: number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <button onClick={() => onExport(settings)}>导出图片</button>
    </div>
  );
}; 