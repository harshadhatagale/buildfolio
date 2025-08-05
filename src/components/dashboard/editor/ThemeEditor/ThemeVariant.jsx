import { Button } from '@/components/ui/button';
import React from 'react';

export default function ThemeVariant({ name, colors }) {
  return (
    <div className='w-[150px] bg-card border-2 shadow-md space-y-2 rounded-md p-2 flex justify-center items-center flex-col'>
        <div className='w-full h-30 rounded-md overflow-hidden'>
            <div className='w-full h-full grid grid-cols-2'>
              <div style={{ background: colors?.light?.primary || "#ccc" }} />
              <div style={{ background: colors?.light?.secondary || "#ccc" }} />
              <div style={{ background: colors?.light?.accent || "#ccc" }} />
              <div style={{ background: colors?.light?.background || "#ccc" }} />
            </div>
        </div>
        <div className='w-full items-start'>
            <p className='text-foreground font-semibold text-lg truncate'>{name}</p>
        </div>
        <Button
          className="w-full h-8 text-white bg-primary dark:bg-primary hover:bg-primary/50 dark:hover:bg-primary/50"
          variant="outline"
        >
          Apply
        </Button>
    </div>
  );
}
