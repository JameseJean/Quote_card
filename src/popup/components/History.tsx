import React from 'react';
import { HistoryRecord } from '../../types/history';

interface HistoryProps {
  records: HistoryRecord[];
  currentIndex: number;
  onRecordSelect: (record: HistoryRecord) => void;
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({
  records,
  currentIndex,
  onRecordSelect,
  onClear,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">历史记录</h3>
        <button
          onClick={onClear}
          className="text-sm text-red-500 hover:text-red-700"
        >
          清除历史
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {records.map((record, index) => (
          <div
            key={record.id}
            className={`
              p-2 border rounded cursor-pointer
              ${index === currentIndex ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}
            `}
            onClick={() => onRecordSelect(record)}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm truncate">
                {record.texts[0]?.slice(0, 20)}...
              </span>
              <span className="text-xs text-gray-500">
                {new Date(record.timestamp).toLocaleString()}
              </span>
            </div>
            {record.imageUrl && (
              <img
                src={record.imageUrl}
                alt="预览"
                className="mt-2 w-full h-20 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 