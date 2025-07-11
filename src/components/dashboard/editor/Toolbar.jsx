import { Redo, Undo, Save } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redo, undo } from '../../../../features/portfolio/portfolioSlice'
import { toast } from 'react-hot-toast'
import { useParams } from 'next/navigation'

export default function Toolbar() {
  const params = useParams()
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)

  const handleSave = async () => {
    // Create a promise toast
    const savePromise = new Promise(async (resolve, reject) => {
      try {
        console.log('Saving Sections:', sections);
        const res = await fetch(`/api/saveSections/${params.project}`, {
          method: 'POST',
          body: JSON.stringify({ sections }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (data.success) {
          resolve('Saved Successfully!');
        } else {
          reject(data.error || 'Failed to Save');
        }
      } catch (error) {
        console.error('Save Error:', error);
        reject(error.message || 'Error Saving');
      }
    });

    // Show loading toast that will update based on the promise
    toast.promise(savePromise, {
      loading: 'Saving...',
      success: (message) => message,
      error: (err) => err,
    }, {
      // Optional: Toast styling options
      style: {
        minWidth: '200px',
      },
      success: {
        duration: 3000,
      },
      error: {
        duration: 4000,
      },
    });
  }

  return (
    <div className='h-10 flex bg-background -translate-x-1/2 z-15 justify-between items-center px-5 gap-8 border-3 border-muted rounded-md fixed top-18 left-1/2'>
      <Undo size={20} className='cursor-pointer' onClick={() => dispatch(undo())} />
      <Redo size={20} className='cursor-pointer' onClick={() => dispatch(redo())} />
      <Save size={20} className='cursor-pointer' onClick={handleSave} />
    </div>
  )
}