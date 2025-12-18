"use client"

import { useState } from "react"
import { Editor } from "@craftjs/core"
import type { Template } from "@/app/page"
import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { ComponentPanel } from "@/components/editor/component-panel"
import { LayersPanel } from "@/components/editor/layers-panel"
import { EditorCanvas } from "@/components/editor/editor-canvas"

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

import { DragProvider } from "@/components/editor/drag-context"


interface TemplateEditorProps {
  template: Template
  onTemplateUpdate: (updates: Partial<Template>) => void
}

export function TemplateEditor({ template, onTemplateUpdate }: TemplateEditorProps) {
  const [zoom, setZoom] = useState(100)
  const [showComponents, setShowComponents] = useState(true)

  console.log("TemplateEditor resolving:", { Container, Page, Text })

  return (
    <DragProvider>
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
        indicator={{
          success: "#3b82f6", // Primary blue for visibility
          thickness: 3
        }}
      >
        <div className="h-full flex flex-col bg-background craftjs-renderer no-print-wrapper">
          <EditorToolbar
            className="no-print"
            template={template}
            zoom={zoom}
            onZoomChange={setZoom}
            onToggleVariables={() => { }} // Ya no se usa individualmente
            onToggleComponents={() => setShowComponents(!showComponents)}

            showComponents={showComponents}
          />

          <div className="flex-1 flex overflow-hidden">
            {showComponents && (
              <ComponentPanel template={template} onTemplateUpdate={onTemplateUpdate} />
            )}

            <div className="flex-1 flex flex-col min-w-0">
              <EditorCanvas template={template} zoom={zoom} />
            </div>


          </div>
        </div>

      </Editor>
    </DragProvider>
  )
}
