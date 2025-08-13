'use client'

import { Button } from '@/components/ui/button';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../../../features/portfolio/portfolioSlice';

export default function ThemeVariant({ name, colors }) {
  const dispatch= useDispatch()
  return (
    <div className='w-[140px] bg-card border-2 shadow-md space-y-2 rounded-md p-2 flex justify-center items-center flex-col'>
        <div className='w-full h-25 rounded-md overflow-hidden'>
            <div className='w-full h-full grid grid-cols-2'>
              <div style={{ background: colors?.light?.primary || "#ccc" }} />
              <div style={{ background: colors?.light?.secondary || "#ccc" }} />
              <div style={{ background: colors?.light?.accent || "#ccc" }} />
              <div style={{ background: colors?.light?.background || "#ccc" }} />
            </div>
        </div>
        <div className='w-full items-start'>
            <p className='text-foreground font-semibold text-base truncate'>{name}</p>
        </div>
        <Button
        onClick={()=> dispatch(setTheme(colors))}
          className="w-full h-8 text-white bg-primary dark:bg-primary hover:bg-primary/50 dark:hover:bg-primary/50"
          variant="outline"
        >
          Apply
        </Button>
    </div>
  );
}
