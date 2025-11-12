import { useState, useRef } from 'react';
import { Upload, Image } from 'lucide-react';
import { Button } from './ui/button';
import type { UploadData } from '../types';
import { validateImageFile, ValidationError } from '../lib/utils';

interface UploadAreaProps {
  onAnalyze: (data: UploadData) => void;
}

export function UploadArea({ onAnalyze }: UploadAreaProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError('');
    
    try {
      validateImageFile(file);
      
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.message);
      } else {
        setError('파일을 읽는 중 오류가 발생했습니다.');
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    if (image) {
      onAnalyze({ image });
    }
  };

  const isAnalyzeDisabled = !image;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-border p-8 hover:shadow-glow transition-all duration-300">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Image className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">문자 이미지 업로드</h3>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border-l-4 border-destructive rounded-lg">
          <p className="text-destructive text-sm font-medium">{error}</p>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/heic"
          capture="environment"
          onChange={handleFileInput}
          className="hidden"
        />

        {imagePreview ? (
          <div className="space-y-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <Button
              variant="outline"
              onClick={() => {
                setImage(null);
                setImagePreview('');
                setError('');
              }}
            >
              이미지 변경
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-semibold mb-2 text-lg">
                이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-muted-foreground text-sm">
                PNG, JPG, GIF, HEIC (최대 10MB)
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                📱 모바일: 카메라 또는 갤러리에서 선택
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-white transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              파일 선택
            </Button>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <Button
          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow text-white font-semibold"
          size="lg"
          onClick={handleAnalyzeClick}
          disabled={isAnalyzeDisabled}
        >
          <span className="mr-2">🔍</span>
          AI 분석 시작하기
        </Button>
      </div>
    </div>
  );
}