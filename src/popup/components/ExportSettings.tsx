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

  const handleChange = (
    key: keyof ExportSettings,
    value: string | number
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">导出格式</label>
        <select
          className="w-full p-2 border rounded"
          value={settings.format}
          onChange={(e) => handleChange('format', e.target.value)}
        >
          <option value="png">PNG (无损)</option>
          <option value="jpg">JPG (有损)</option>
          <option value="webp">WebP (推荐)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          图片质量 ({Math.round(settings.quality * 100)}%)
        </label>
        <input
          type="range"
          min="0.5"
          max="1"
          step="0.01"
          value={settings.quality}
          onChange={(e) => handleChange('quality', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          缩放比例 ({settings.scale}x)
        </label>
        <input
          type="range"
          min="1"
          max="4"
          step="0.5"
          value={settings.scale}
          onChange={(e) => handleChange('scale', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={() => onExport(settings)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        导出图片
      </button>
    </div>
  );
}; 