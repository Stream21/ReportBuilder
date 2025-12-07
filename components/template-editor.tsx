"use client"

import { useState } from "react"
import { Editor } from "@craftjs/core"
import type { Template } from "@/app/page"
import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { ComponentPanel } from "@/components/editor/component-panel"
import { LayersPanel } from "@/components/editor/layers-panel"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { RightSidebar } from "@/components/editor/right-sidebar"
import {
  Container,
  Text,
  Image,
  Table,
  Logo,
  Header,
  Footer,
  Page,
  Divider,
  GioComponent
} from "@/components/editor/components"
import { RenderNode } from "@/components/editor/render-node" // New


interface TemplateEditorProps {
  template: Template
  onTemplateUpdate: (updates: Partial<Template>) => void
}

export function TemplateEditor({ template, onTemplateUpdate }: TemplateEditorProps) {
  const [zoom, setZoom] = useState(100)
  const [showComponents, setShowComponents] = useState(true)
  const [showLayers, setShowLayers] = useState(false)

  return (
    <Editor
      resolver={{
        Container,
        Text,
        Image,
        Divider,
        Table,
        GioComponent,
        Logo,
        Header,
        Footer,
        Page,
      }}
      onRender={RenderNode} // New
    >
      <div className="h-full flex flex-col bg-background craftjs-renderer">
        <EditorToolbar
          template={template}
          zoom={zoom}
          onZoomChange={setZoom}
          onToggleVariables={() => { }} // Ya no se usa individualmente
          onToggleComponents={() => setShowComponents(!showComponents)}
          onToggleLayers={() => setShowLayers(!showLayers)}
          showVariables={true} // Siempre visible en el sidebar
          showComponents={showComponents}
          showLayers={showLayers}
        />

        <div className="flex-1 flex overflow-hidden">
          {showComponents && (
            <ComponentPanel template={template} onTemplateUpdate={onTemplateUpdate} />
          )}
          {showLayers && <LayersPanel />}

          <div className="flex-1 flex flex-col">
            <EditorCanvas template={template} zoom={zoom} />
          </div>

          <RightSidebar template={template} onTemplateUpdate={onTemplateUpdate} />
        </div>
      </div>
    </Editor>
  )
}
