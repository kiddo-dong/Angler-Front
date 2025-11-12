const MAX_FILE_SIZE =
  Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB

const ALLOWED_FILE_TYPES =
  process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES?.split(',') || [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/heic', // iPhone HEIC 포맷 지원
    'image/heif',
  ];

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * 파일 크기를 검증합니다.
 */
export function validateFileSize(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError(
      `파일 크기는 ${formatFileSize(MAX_FILE_SIZE)} 이하여야 합니다.`
    );
  }
}

/**
 * 파일 타입을 검증합니다.
 */
export function validateFileType(file: File): void {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new ValidationError(
      '지원하지 않는 파일 형식입니다. PNG, JPG, GIF, HEIC 파일만 업로드 가능합니다.'
    );
  }
}

/**
 * 이미지 파일을 전체적으로 검증합니다.
 */
export function validateImageFile(file: File): void {
  validateFileType(file);
  validateFileSize(file);
}

/**
 * 파일 크기를 사람이 읽기 쉬운 형식으로 변환합니다.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 신뢰도 점수에 따라 색상을 반환합니다.
 */
export function getScoreColor(score: number): string {
  if (score >= 70) return '#10B981'; // Green - Safe
  if (score >= 40) return '#F59E0B'; // Yellow - Caution
  return '#EF4444'; // Red - Danger
}

/**
 * 신뢰도 점수에 따라 상태 텍스트를 반환합니다.
 */
export function getScoreStatus(score: number): '안전' | '주의' | '위험' {
  if (score >= 70) return '안전';
  if (score >= 40) return '주의';
  return '위험';
}
