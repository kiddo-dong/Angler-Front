"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#0F172A] group-[.toaster]:border-[#E2E8F0] group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-[#64748B]',
          actionButton:
            'group-[.toast]:bg-[#2563EB] group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-[#F1F5F9] group-[.toast]:text-[#64748B]',
          error: 'group-[.toast]:bg-[#FEF2F2] group-[.toast]:border-[#EF4444] group-[.toast]:text-[#EF4444]',
          success: 'group-[.toast]:bg-[#F0FDF4] group-[.toast]:border-[#10B981] group-[.toast]:text-[#10B981]',
          warning: 'group-[.toast]:bg-[#FFFBEB] group-[.toast]:border-[#F59E0B] group-[.toast]:text-[#F59E0B]',
          info: 'group-[.toast]:bg-[#EFF6FF] group-[.toast]:border-[#2563EB] group-[.toast]:text-[#2563EB]',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
