import React, { useState, useEffect } from 'react'; // 导入 React 和相关的 Hook
import { createRoot } from 'react-dom/client'; // 导入 createRoot 用于渲染组件
import { Layout } from './components/Layout'; // 导入 Layout 组件
import { Editor } from './components/Editor'; // 导入 Editor 组件
import { Preview } from './components/Preview'; // 导入 Preview 组件
import { useTemplate } from '../hooks/useTemplate'; // 导入自定义 Hook 用于模板管理
import { useHistory } from '../hooks/useHistory'; // 导入自定义 Hook 用于历史记录管理
import { useToast } from '../hooks/useToast'; // 导入自定义 Hook 用于显示提示信息
import { CardTemplate } from '../types/template'; // 导入 CardTemplate 类型

function Popup() { // 定义 Popup 组件
  const [texts, setTexts] = useState(['']); // 定义状态 texts，初始值为一个空字符串数组
  const { templates, currentTemplate, setCurrentTemplate } = useTemplate(); // 获取模板和当前模板
  const { history, addRecord, undo, redo, canUndo, canRedo } = useHistory(); // 获取历史记录相关的状态和函数
  const [loading, setLoading] = useState(false); // 定义加载状态
  const { showToast } = useToast(); // 获取显示提示信息的函数

  const handleTemplateUpdate = (updatedTemplate: CardTemplate) => { // 定义更新模板的函数
    console.log('Updating template:', updatedTemplate); // 调试点
    setCurrentTemplate(updatedTemplate); // 更新当前模板
    showToast('Template updated successfully', 'success'); // 显示成功提示
  };

  const handleExport = async () => { // 定义导出函数
    console.log('Exporting with settings:', { /* 这里可以添加导出设置 */ }); // 调试点
    // 导出逻辑
  };

  useEffect(() => { // 使用 useEffect Hook 处理副作用
    chrome.runtime.onMessage.addListener((request) => { // 监听来自 Chrome 扩展的消息
      console.log('Received message:', request); // 调试点
      if (request.type === 'SELECTED_TEXT') { // 如果消息类型为 SELECTED_TEXT
        console.log('Selected texts received:', request.texts); // 打印接收到的文本
        setTexts(request.texts.length > 0 ? request.texts : ['']); // 更新 texts 状态
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { // 查询当前活动的标签页
      console.log('Active tabs:', tabs); // 调试点
      if (tabs.length > 0 && tabs[0].id !== undefined) { // 如果找到活动标签页且 ID 不为 undefined
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_SELECTED_TEXT' }); // 发送消息请求选中的文本
      } else {
        console.error('No active tab found or tab ID is undefined'); // 打印错误信息
      }
    });
  }, []); // 依赖数组为空，表示只在组件挂载时执行一次

  return ( // 返回组件的 JSX
    <Layout> // 使用 Layout 组件包裹内容
      <Editor 
        texts={texts} // 传递 texts 状态
        onChange={setTexts} // 传递更新 texts 的函数
        templates={templates} // 传递模板列表
        currentTemplate={currentTemplate} // 传递当前模板
        onTemplateSelect={setCurrentTemplate} // 传递选择模板的函数
        onTemplateUpdate={handleTemplateUpdate} // 传递更新模板的函数
        canUndo={canUndo} // 传递是否可以撤销的状态
        canRedo={canRedo} // 传递是否可以重做的状态
        onUndo={undo} // 传递撤销函数
        onRedo={redo} // 传递重做函数
      />
      <Preview 
        texts={texts} // 传递 texts 状态
        template={currentTemplate} // 传递当前模板
        onExport={handleExport} // 传递导��函数
      />
    </Layout>
  );
}

// 确保root元素存在
const rootElement = document.getElementById('root'); // 获取 root 元素
if (!rootElement) { // 如果没有找到 root 元素
  throw new Error('Root element not found'); // 抛出错误
}

const root = createRoot(rootElement); // 创建根节点
root.render(<Popup />); // 渲染 Popup 组件