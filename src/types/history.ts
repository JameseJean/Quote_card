import { CardTemplate } from './template';

export interface HistoryRecord {
  id: string;
  timestamp: number;
  texts: string[];
  template: CardTemplate;
  imageUrl?: string; // 可选的预览图
}

export interface HistoryState {
  records: HistoryRecord[];
  currentIndex: number; // 用于撤销/重做
} 