import React from 'react';

export const Editor = ({ texts = [], onChange }) => {
  const handleTextChange = (index, value) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    onChange(newTexts);
  };

  const handleAddText = () => {
    onChange([...texts, '']);
  };

  const handleRemoveText = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    onChange(newTexts);
  };

  return (
    <div className="w-1/2 p-4 border-r overflow-y-auto">
      {texts.map((text, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              文字内容 {texts.length > 1 ? `#${index + 1}` : ''}
            </label>
            {texts.length > 1 && (
              <button
                onClick={() => handleRemoveText(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                删除
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            className="w-full h-32 p-2 border rounded resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="在这里输入或粘贴文字..."
          />
        </div>
      ))}
      
      <button
        onClick={handleAddText}
        className="w-full p-2 border-2 border-dashed rounded text-gray-500 hover:text-gray-700 hover:border-gray-400"
      >
        + 添加文字
      </button>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          模板选择
        </label>
        <select className="w-full p-2 border rounded">
          <option value="default">默认模板</option>
          <option value="simple">简约风格</option>
          <option value="classic">经典风格</option>
        </select>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>快捷键:</p>
        <ul className="mt-1 space-y-1">
          <li>Alt + S: 选择文字</li>
          <li>Alt + C: 清除选择</li>
          <li>Shift + 选择: 多段选择</li>
        </ul>
      </div>
    </div>
  );
}; 