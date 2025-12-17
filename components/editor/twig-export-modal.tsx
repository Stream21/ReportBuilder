import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy } from "lucide-react"

interface TwigExportModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    code: string
}

export function TwigExportModal({ open, onOpenChange, code }: TwigExportModalProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        alert("Código copiado al portapapeles")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Exportar Plantilla (Twig)</DialogTitle>
                    <DialogDescription>
                        Copia este código HTML/Twig para usarlo en tu generador de facturas.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-[400px] border rounded-md relative group">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2 h-8 w-8 p-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleCopy}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Textarea
                        className="w-full h-full font-mono text-xs p-4 resize-none border-0 focus-visible:ring-0"
                        value={code}
                        readOnly
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
                    <Button onClick={handleCopy}>Copiar Código</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
