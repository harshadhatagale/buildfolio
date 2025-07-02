import { Redo, Undo, Save } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redo, undo } from '../../../../features/portfolio/portfolioSlice'
import { toast } from 'sonner'
export default function Toolbar(projectId) {
  const dispatch= useDispatch()
  const sections= useSelector((state)=> state.portfolio.present)
  const handleClick=async()=>{
    try {
    const res = await fetch(`/api/saveSections`, {
      method: 'POST',
      body: JSON.stringify({
        projectId:projectId,
        sections: sections,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (data.success) {
      console.log('Sections Saved:', data);
      toast.success('Saved Successfully!');
    } else {
      toast.error('Failed to Save');
    }
  } catch (error) {
    console.error('Save Error:', error);
    toast.error('Error Saving');
  }
  }
  return (
    <div className='h-10 flex bg-background -translate-x-1/2 z-15 justify-between items-center px-5 gap-8 border-3 border-muted rounded-md fixed top-18 left-1/2'>
      <Undo size={20} className='cursor-pointer' onClick={()=> dispatch(undo())}/>
      <Redo size={20} className='cursor-pointer' onClick={()=> dispatch(redo())}/>
      <Save size={20} className='cursor-pointer' onClick={handleClick}/>
    </div>
  )
}
