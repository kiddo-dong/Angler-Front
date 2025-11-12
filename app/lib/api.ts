import type { AnalysisResult } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 이미지 파일을 서버에 업로드하고 피싱 분석 결과를 받습니다.
 * @param image - 분석할 이미지 파일
 * @returns 백엔드에서 완성된 분석 메시지
 * @throws {ApiError} API 요청 실패 시
 */
export async function analyzePhishingImage(
  image: File
): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(`${API_URL}/angler/fishing`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError(
        '분석 요청에 실패했습니다.',
        response.status
      );
    }

    // 백엔드에서 완성된 텍스트 메시지를 그대로 받음
    const message = await response.text();

    return { message };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new ApiError('네트워크 연결을 확인해주세요.');
    }

    throw new ApiError('알 수 없는 오류가 발생했습니다.');
  }
}

/**
 * Mock API - 개발 환경에서 테스트용
 */
export async function mockAnalyzePhishingImage(
  _image: File
): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const messages = [
    '⚠️ 피싱 문자로 의심됩니다!\n\n의심스러운 URL 패턴이 발견되었으며, 긴급성을 강조하는 문구가 사용되었습니다. 개인정보를 요구하는 내용이 포함되어 있어 주의가 필요합니다.',
    '✅ 안전한 메시지로 판단됩니다.\n\n공식 발신번호가 확인되었으며, 정상적인 URL 패턴을 사용하고 있습니다. 안전한 내용으로 판단됩니다.',
    '⚠️ 주의가 필요한 메시지입니다.\n\n일부 의심스러운 요소가 발견되었습니다. 발신자를 확인하고 개인정보 입력에 주의하세요.',
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return {
    message: randomMessage,
  };
}
