'use client';

import Image from 'next/image';

interface BrandProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function DevestersBrand({ className = '', size = 'md' }: BrandProps) {
  const iconSize = size === 'xs' ? 16 : size === 'sm' ? 20 : size === 'lg' ? 28 : 22;
  const textSize = size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';

  return (
    <span className={`inline-flex items-center gap-0.5 align-middle ${className}`} dir="ltr">
      <Image
        src="/devesters_icon.png"
        alt="Devesters Logo"
        width={iconSize}
        height={iconSize}
        className="object-contain inline-block shrink-0"
      />
      <span className={`font-heading font-bold tracking-tight text-white ${textSize} -ml-0.5`}>
        EVesters
      </span>
    </span>
  );
}

export function PosatBrand({ className = '', size = 'md' }: BrandProps) {
  const iconSize = size === 'xs' ? 16 : size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
  const textSize = size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl sm:text-2xl' : 'text-base';

  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`} dir="ltr">
      <div className="relative inline-block shrink-0" style={{ width: iconSize, height: iconSize }}>
        <Image
          src="/posat-symbol-transparent.png"
          alt="Posat AI Logo"
          fill
          sizes={`${iconSize}px`}
          className="object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]"
        />
      </div>
      <span className={`font-bold text-white tracking-wide ${textSize}`}>
        Posat <span className="bg-gradient-to-r from-[#FF2A55] to-[#00F0FF] bg-clip-text text-transparent">AI</span>
      </span>
    </span>
  );
}
