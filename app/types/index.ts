// 백엔드에서 완성된 텍스트 메시지만 전달
export interface AnalysisResult {
  message: string;
}

export interface UploadData {
  image: File;
}

export type Stage = 'upload' | 'loading' | 'result';
