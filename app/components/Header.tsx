import { Fish } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/70 backdrop-blur-lg border-b border-border/50 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
              <Fish className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Angler</h1>
            <p className="text-xs text-muted-foreground">피싱 감지 서비스</p>
          </div>
        </div>
      </div>
    </header>
  );
}
