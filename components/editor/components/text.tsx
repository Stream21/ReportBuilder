"use client"

import { useNode, useEditor } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ContentEditable from "react-contenteditable"
import React, { useEffect, useState } from "react"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { APP_VARIABLES } from "@/lib/constants/variables"
import { Separator } from "@/components/ui/separator"
import { MOCK_DATA } from "@/lib/mock-data"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface TextProps {
  // ...
  text?: string
  fontSize?: number
  fontWeight?: string
  color?: string
  textAlign?: "left" | "center" | "right" | "justify"
  fontStyle?: "normal" | "italic"
  textDecoration?: "none" | "underline" | "line-through"
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

export function Text({
  text = "Texto de ejemplo",
  fontSize = 14,
  fontWeight = "normal",
  color = "#000000",
  textAlign = "left",
  fontStyle = "normal",
  textDecoration = "none",
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}: TextProps) {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    isActive,
    isHovered
  } = useNode((node) => ({
    isActive: node.events.selected,
    isHovered: node.events.hovered
  }))

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setEditable(false)
    }
  }, [isActive])

  // Interpolate text for Preview Mode
  const getInterpolatedText = () => {
    if (enabled) return text

    return text.replace(/\{\{\s*([\w_.]+)\s*\}\}/g, (match, key) => {
      // Intenta encontrar la clave exacta, o busca una aproximada si es necesario
      const val = MOCK_DATA[key] || MOCK_DATA[key.replace('.', '_')]
      return val || match
    })
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (enabled) {
      setEditable(true)
    }
  }

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className="relative min-w-[50px] min-h-[1em]"
      style={{
        width: "100%",
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
      }}
      onDoubleClick={handleDoubleClick}
      onDrop={(e) => {
        e.preventDefault()
        const variable = e.dataTransfer.getData("variable")
        if (variable) {
          setProp((props: TextProps) => {
            props.text = `${props.text} {{ ${variable} }}`
          })
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <ContentEditable
        disabled={!enabled || !editable}
        html={getInterpolatedText()}
        onChange={(e) => {
          setProp((props: TextProps) => (props.text = e.target.value), 500)
        }}
        tagName="div"
        style={{
          fontSize: `${fontSize}px`,
          fontWeight,
          fontStyle,
          textDecoration,
          textAlign,
          color,
          cursor: enabled ? "text" : "default",
          whiteSpace: "pre-wrap",
          outline: "none",
          lineHeight: 1.5,
        }}
        className={`${!editable ? "pointer-events-none" : ""}`}
      />
    </div>
  )
}

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    fontWeight,
    color,
    text,
    textAlign,
    fontStyle,
    textDecoration,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
    color: node.data.props.color,
    textAlign: node.data.props.textAlign,
    fontStyle: node.data.props.fontStyle,
    textDecoration: node.data.props.textDecoration,
    marginTop: node.data.props.marginTop,
    marginBottom: node.data.props.marginBottom,
    marginLeft: node.data.props.marginLeft,
    marginRight: node.data.props.marginRight
  }))



  // ... (previous imports)

  const [open, setOpen] = useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Function to handle variable insertion
  const handleVariableSelect = (variable: string) => {
    setProp((props: TextProps) => {
      const currentText = props.text || ""
      // If triggered by @, replace the @ with the variable
      if (currentText.endsWith("@")) {
        props.text = currentText.slice(0, -1) + `{{ ${variable} }}`
      } else {
        // Just append if selected manually (though we prioritize @ trigger)
        props.text = currentText + `{{ ${variable} }}`
      }
    })
    setOpen(false)
    // Restore focus to input to continue typing
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Texto</Label>
        <div className="space-y-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={text || ""}
                  onChange={(e) => {
                    const newVal = e.target.value
                    setProp((props: TextProps) => (props.text = newVal))

                    // Trigger autocomplete on '@'
                    if (newVal.endsWith("@")) {
                      setOpen(true)
                    }
                  }}
                  className="pr-8"
                  placeholder="Escribe @ para variables..."
                />
                <button
                  onClick={() => setOpen(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  title="Insertar variable"
                >
                  <span className="text-xs font-bold">@</span>
                </button>
              </div>
            </PopoverAnchor>
            <PopoverContent className="p-0 w-[250px]" align="start">
              <Command>
                <CommandInput placeholder="Buscar variable..." />
                <CommandList>
                  <CommandEmpty>No se encontraron variables.</CommandEmpty>
                  {APP_VARIABLES.map((category) => (
                    <CommandGroup key={category.category} heading={category.category}>
                      {category.items.map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={() => handleVariableSelect(item)}
                          className="text-xs cursor-pointer"
                        >
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-[10px] text-muted-foreground">Tip: Escribe <b>@</b> para insertar variables.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Alineación</Label>
        <ToggleGroup
          type="single"
          value={textAlign || "left"}
          onValueChange={(value) => value && setProp((props: TextProps) => (props.textAlign = value as any))}
          className="justify-start border p-1 rounded-md"
        >
          <ToggleGroupItem value="left" size="sm"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="center" size="sm"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="right" size="sm"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="justify" size="sm"><AlignJustify className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Fuente (px)</Label>
          <Input
            type="number"
            min={1}
            value={fontSize || 14}
            onChange={(e) => setProp((props: TextProps) => (props.fontSize = Number(e.target.value)))}
          />
        </div>
        <div className="space-y-2">
          <Label>Peso</Label>
          <Select
            value={fontWeight || "normal"}
            onValueChange={(value) => setProp((props: TextProps) => (props.fontWeight = value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="bold">Negrita</SelectItem>
              <SelectItem value="300">Ligero</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Estilo y Decoración</Label>
        <div className="flex gap-2">
          <ToggleGroup
            type="multiple"
            className="justify-start border p-1 rounded-md"
          >
            <ToggleGroupItem
              value="bold"
              size="sm"
              data-state={fontWeight === "bold" ? "on" : "off"}
              onClick={() => setProp((props: TextProps) => (props.fontWeight = props.fontWeight === "bold" ? "normal" : "bold"))}
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              size="sm"
              data-state={fontStyle === "italic" ? "on" : "off"}
              onClick={() => setProp((props: TextProps) => (props.fontStyle = props.fontStyle === "italic" ? "normal" : "italic"))}
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              size="sm"
              data-state={textDecoration === "underline" ? "on" : "off"}
              onClick={() => setProp((props: TextProps) => (props.textDecoration = props.textDecoration === "underline" ? "none" : "underline"))}
            >
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Color de Texto</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            className="w-12 p-1"
            value={color || "#000000"}
            onChange={(e) => setProp((props: TextProps) => (props.color = e.target.value))}
          />
          <Input
            type="text"
            value={color || "#000000"}
            onChange={(e) => setProp((props: TextProps) => (props.color = e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t">
        <Label className="text-xs font-semibold">Márgenes (px)</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Arriba</Label>
            <Input
              type="number"
              className="h-8 text-xs"
              value={marginTop || 0}
              onChange={(e) => setProp((props: TextProps) => (props.marginTop = Number(e.target.value)))}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Abajo</Label>
            <Input
              type="number"
              className="h-8 text-xs"
              value={marginBottom || 0}
              onChange={(e) => setProp((props: TextProps) => (props.marginBottom = Number(e.target.value)))}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Izquierda</Label>
            <Input
              type="number"
              className="h-8 text-xs"
              value={marginLeft || 0}
              onChange={(e) => setProp((props: TextProps) => (props.marginLeft = Number(e.target.value)))}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Derecha</Label>
            <Input
              type="number"
              className="h-8 text-xs"
              value={marginRight || 0}
              onChange={(e) => setProp((props: TextProps) => (props.marginRight = Number(e.target.value)))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Text.craft = {
  displayName: "Text",
  props: {
    text: "Texto de ejemplo",
    fontSize: 14,
    fontWeight: "normal",
    color: "#000000",
    textAlign: "left",
    fontStyle: "normal",
    textDecoration: "none",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  related: {
    settings: TextSettings,
  },
}
