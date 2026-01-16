import React, { useState } from "react"
import { useNode } from "@craftjs/core"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"
import { APP_VARIABLES } from "@/lib/constants/variables"
import {
    Popover,
    PopoverContent,
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

export const TextSettings = () => {
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

    const [open, setOpen] = useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Function to handle variable insertion
    const handleVariableSelect = (variable: string) => {
        setProp((props: any) => {
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
                                        setProp((props: any) => (props.text = newVal))

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
                    onValueChange={(value) => value && setProp((props: any) => (props.textAlign = value as any))}
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
                        onChange={(e) => setProp((props: any) => (props.fontSize = Number(e.target.value)))}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Peso</Label>
                    <Select
                        value={fontWeight || "normal"}
                        onValueChange={(value) => setProp((props: any) => (props.fontWeight = value))}
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
                            onClick={() => setProp((props: any) => (props.fontWeight = props.fontWeight === "bold" ? "normal" : "bold"))}
                        >
                            <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="italic"
                            size="sm"
                            data-state={fontStyle === "italic" ? "on" : "off"}
                            onClick={() => setProp((props: any) => (props.fontStyle = props.fontStyle === "italic" ? "normal" : "italic"))}
                        >
                            <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="underline"
                            size="sm"
                            data-state={textDecoration === "underline" ? "on" : "off"}
                            onClick={() => setProp((props: any) => (props.textDecoration = props.textDecoration === "underline" ? "none" : "underline"))}
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
                        onChange={(e) => setProp((props: any) => (props.color = e.target.value))}
                    />
                    <Input
                        type="text"
                        value={color || "#000000"}
                        onChange={(e) => setProp((props: any) => (props.color = e.target.value))}
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
                            onChange={(e) => setProp((props: any) => (props.marginTop = Number(e.target.value)))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Abajo</Label>
                        <Input
                            type="number"
                            className="h-8 text-xs"
                            value={marginBottom || 0}
                            onChange={(e) => setProp((props: any) => (props.marginBottom = Number(e.target.value)))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Izquierda</Label>
                        <Input
                            type="number"
                            className="h-8 text-xs"
                            value={marginLeft || 0}
                            onChange={(e) => setProp((props: any) => (props.marginLeft = Number(e.target.value)))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Derecha</Label>
                        <Input
                            type="number"
                            className="h-8 text-xs"
                            value={marginRight || 0}
                            onChange={(e) => setProp((props: any) => (props.marginRight = Number(e.target.value)))}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
