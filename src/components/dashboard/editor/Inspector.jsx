import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import PropertiesEditor from './PropertiesEditor'
import TemplateEditor from './TemplateEditor'
import TogglePreviewDevice from './TogglePreviewDevice'

export default function Inspector() {
  return (
    <div className='fixed top-14 right-0 bg-background z-15 px-3 w-[25%] border-l-2 border-muted  h-[calc(100vh-56px)] max-h-[calc(100vh-56px)]'>
      <div className='absolute top-0 left-0 flex flex-col bg-background z-15 px-3 w-full border-l-2 border-muted h-full py-3 overflow-y-auto overflow-x-hidden'>
        <Tabs>
        <Tabs defaultValue="properties">
          <TabsList className={"w-full mb-2"}>
            <TabsTrigger className={"cursor-pointer"} value="properties">Properties</TabsTrigger>
            <TabsTrigger className={"cursor-pointer"} value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="properties">
            <PropertiesEditor />
          </TabsContent>
          <TabsContent value="templates">
            <TemplateEditor />
          </TabsContent>
        </Tabs>
      </Tabs>
      </div>
      <div className='absolute z-15 top-0 -left-10 h-full'>
        <TogglePreviewDevice />
      </div>
    </div>
  )
}
