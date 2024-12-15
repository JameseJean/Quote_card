export interface CardTemplate {
  id: string;
  name: string;
  category: 'simple' | 'modern' | 'classic' | 'custom';
  styles: {
    container: {
      width: number;
      height: number;
      background: string;
      padding?: string;
      borderRadius?: string;
    };
    text: {
      fontSize: string;
      fontFamily: string;
      color: string;
      lineHeight: string;
      letterSpacing: string;
      textAlign: 'left' | 'center' | 'right';
    };
    effects?: {
      shadow?: string;
      border?: string;
      opacity?: number;
    };
  };
  // 支持自定义CSS
  customCSS?: string;
} 