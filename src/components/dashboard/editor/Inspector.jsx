import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import PropertiesEditor from './PropertiesEditor'
import TemplateEditor from './TemplateEditor'

export default function Inspector() {
  return (
    <div className='flex flex-col bg-background px-3 w-60 border-l-2 border-muted fixed top-14 right-0 h-[calc(100vh-56px)] py-3 overflow-y-auto overflow-x-hidden'>
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
  )
}
