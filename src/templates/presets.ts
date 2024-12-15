import { CardTemplate } from '../types/template';

export const presetTemplates: CardTemplate[] = [
  {
    id: 'simple-light',
    name: '简约白',
    category: 'simple',
    styles: {
      container: {
        width: 800,
        height: 400,
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '0.5rem',
      },
      text: {
        fontSize: '1.5rem',
        fontFamily: '"PingFang SC", sans-serif',
        color: '#2d3748',
        lineHeight: '1.8',
        letterSpacing: '0.05em',
        textAlign: 'center',
      },
      effects: {
        shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  {
    id: 'modern-gradient',
    name: '现代渐变',
    category: 'modern',
    styles: {
      container: {
        width: 800,
        height: 400,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2.5rem',
        borderRadius: '1rem',
      },
      text: {
        fontSize: '1.75rem',
        fontFamily: '"Source Han Sans CN", sans-serif',
        color: '#ffffff',
        lineHeight: '1.6',
        letterSpacing: '0.1em',
        textAlign: 'center',
      },
      effects: {
        shadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  {
    id: 'classic-paper',
    name: '复古纸张',
    category: 'classic',
    styles: {
      container: {
        width: 800,
        height: 400,
        background: '#f7f2e9',
        padding: '3rem',
        borderRadius: '0.25rem',
      },
      text: {
        fontSize: '1.5rem',
        fontFamily: '"Noto Serif SC", serif',
        color: '#2c1810',
        lineHeight: '2',
        letterSpacing: '0.08em',
        textAlign: 'center',
      },
      effects: {
        border: '1px solid #d3cdc4',
        shadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
]; 