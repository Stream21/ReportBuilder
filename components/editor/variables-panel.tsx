import { useEditor, Element } from "@craftjs/core"
import { Text } from "@/components/editor/components/text"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Braces, Calendar, Hash, Type, Image, Phone, Mail, FileText, ChevronDown, ChevronRight } from "lucide-react"
import { APP_VARIABLES, getVariableIcon } from "@/lib/constants/variables"

export function VariablesPanel() {
  const { connectors } = useEditor()
  const [search, setSearch] = useState("")
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const filteredVariables = APP_VARIABLES
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((category) => category.items.length > 0)

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-background z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar variables..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              if (e.target.value) {
                // Auto-expand all if searching
                setOpenCategories(APP_VARIABLES.map(c => c.category))
              } else {
                setOpenCategories([])
              }
            }}
            className="pl-9 h-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {filteredVariables.map((category) => {
            const isOpen = openCategories.includes(category.category) || search.length > 0

            return (
              <div key={category.category} className="space-y-2">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full flex items-center justify-between group cursor-pointer"
                >
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 group-hover:text-primary transition-colors">
                    <span className={`w-1 h-1 rounded-full ${isOpen ? "bg-primary" : "bg-muted-foreground/50"}`} />
                    {category.category}
                  </h4>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  )}
                </button>

                {isOpen && (
                  <div className="grid grid-cols-2 gap-2 pl-2 border-l-2 border-muted/30 ml-1">
                    {category.items.map((variable) => {
                      const Icon = getVariableIcon(variable)
                      return (
                        <div
                          key={variable}
                          ref={(ref: HTMLDivElement | null) => {
                            if (ref) {
                              connectors.create(
                                ref,
                                <Element is={Text} text={`{{ ${variable} }}`} />
                              )
                            }
                          }}
                          className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:bg-accent/50 cursor-grab active:cursor-grabbing transition-all duration-200 group relative overflow-hidden"
                          title={`{{ ${variable} }}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
                            <Icon className="w-4 h-4" />
                          </div>
                          <code className="text-[10px] font-mono text-foreground/80 w-full text-center truncate select-all px-1">
                            {variable.split('.').pop()}
                          </code>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
