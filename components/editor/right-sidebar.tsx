"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsPanel } from "@/components/editor/settings-panel"
import { VariablesPanel } from "@/components/editor/variables-panel"
import type { Template } from "@/app/page"

import { Layers } from "@craftjs/layers"

interface RightSidebarProps {
    template: Template
    onTemplateUpdate: (updates: Partial<Template>) => void
}

export function RightSidebar({ template, onTemplateUpdate }: RightSidebarProps) {
    return (
        <div className="w-80 bg-card border-l border-border h-full flex flex-col">
            <Tabs defaultValue="properties" className="flex-1 flex flex-col h-full">
                <div className="p-2 border-b">
                    <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="properties">Propiedades</TabsTrigger>
                        <TabsTrigger value="variables">Variables</TabsTrigger>
                        <TabsTrigger value="layers">Capas</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="properties" className="flex-1 overflow-hidden data-[state=inactive]:hidden mt-0 h-full">
                    <SettingsPanel template={template} onTemplateUpdate={onTemplateUpdate} />
                </TabsContent>

                <TabsContent value="variables" className="flex-1 overflow-hidden data-[state=inactive]:hidden mt-0 h-full">
                    <VariablesPanel />
                </TabsContent>

                <TabsContent value="layers" className="flex-1 overflow-y-auto data-[state=inactive]:hidden mt-0 h-full p-2">
                    <Layers expandRootOnLoad={true} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
