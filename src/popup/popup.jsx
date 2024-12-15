import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';

function Popup() {
  const [texts, setTexts] = useState(['']);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'SELECTED_TEXT') {
        setTexts(request.texts.length > 0 ? request.texts : ['']);
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_SELECTED_TEXT' });
    });
  }, []);

  return (
    <Layout>
      <Editor texts={texts} onChange={setTexts} />
      <Preview texts={texts} />
    </Layout>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Popup />); 