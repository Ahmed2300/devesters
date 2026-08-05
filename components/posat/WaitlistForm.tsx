'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { DevestersBrand, PosatBrand } from './BrandLogos';

const schema = z.object({
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
});

type FormData = z.infer<typeof schema>;

export default function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitted(true);
          toast.success(result.message || 'تم انضمامك لقائمة الانتظار بنجاح!');
          reset();
        } else {
          toast.error(result.error || 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً');
        }
      } catch (err) {
        toast.error('حدث خطأ في الاتصال بالشبكة، يرجى المحاولة لاحقاً');
      }
    });
  };

  return (
    <div id="waitlist-form" className="w-full max-w-xl mx-auto" dir="rtl">
      {submitted ? (
        <div className="p-6 rounded-2xl bg-[#121212]/90 border border-[#E52E2E]/30 text-center space-y-3 backdrop-blur-2xl shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-[#E52E2E]/20 border border-[#E52E2E]/40 flex items-center justify-center text-[#FF4500] mx-auto text-sm font-bold">
            ✓
          </div>
          <h3 className="text-lg font-bold text-white">تم انضمامك لقائمة الانتظار بنجاح</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            شكراً لاهتمامك بـ <PosatBrand size="sm" /> <strong>(بساط)</strong> من تطوير <DevestersBrand size="sm" />. سنرسل لك دعوة فور إطلاق النسخة الأولى.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-gray-400 underline hover:text-white transition-colors cursor-pointer pt-2"
          >
            تسجيل بريد إلكتروني آخر
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Frosted Glass Input Wrapper Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full p-1.5 gap-2 sm:gap-0 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] focus-within:border-[#00F0FF]/60 transition-all duration-300" dir="rtl">
            <input
              {...register('email')}
              type="email"
              dir="ltr"
              placeholder="Your Email..."
              className="flex-1 bg-transparent border-none text-white placeholder:text-right placeholder:text-gray-500/80 text-right pr-4 sm:pr-6 pl-4 py-3 sm:py-3.5 focus:outline-none focus:ring-0 focus:text-left w-full text-sm sm:text-base font-mono"
              disabled={isPending}
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto bg-gradient-to-r from-[#FF2A55] to-[#E52E2E] text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-full shadow-[0_4px_20px_rgba(255,42,85,0.4)] hover:shadow-[0_6px_25px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center shrink-0 border border-white/10 text-xs sm:text-sm"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'انضم لقائمة الانتظار'
              )}
            </button>
          </div>

          {errors.email && (
            <p className="text-xs text-rose-400 text-center">
              {errors.email.message}
            </p>
          )}

          {/* Social Proof Avatars (Frosted Monochrome Glass with Negative Cutouts & RTL Cascade) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-center">
            <div className="flex items-center shrink-0" dir="rtl">
              <div className="z-30 relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.08] backdrop-blur-md border-2 border-[#0A0A0A] flex items-center justify-center text-[9px] sm:text-[10px] font-medium text-white/85 shadow-sm">
                A
              </div>
              <div className="z-20 relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.08] backdrop-blur-md border-2 border-[#0A0A0A] flex items-center justify-center text-[9px] sm:text-[10px] font-medium text-white/85 shadow-sm -mr-2 sm:-mr-2.5">
                M
              </div>
              <div className="z-10 relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.08] backdrop-blur-md border-2 border-[#0A0A0A] flex items-center justify-center text-[9px] sm:text-[10px] font-medium text-white/85 shadow-sm -mr-2 sm:-mr-2.5">
                S
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-white/50 font-medium leading-normal">
              انضم إلى أكثر من <strong className="text-white font-bold">+500</strong> صانع محتوى في القائمة الأولية
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
