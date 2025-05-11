"use client"

import { useState } from "react"
import { Save, FileOutputIcon as FileExport, Eye, Undo2, Redo2, Copy, Trash2, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComponentStore } from "@/lib/component-store"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { PreviewModal } from "@/components/preview-modal"
import { ExportModal } from "@/components/export-modal"

export function Toolbar() {
  const { toast } = useToast()
  const { setTheme, theme } = useTheme()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const {
    components,
    saveDesign,
    undo,
    redo,
    canUndo,
    canRedo,
    deleteSelectedComponent,
    duplicateSelectedComponent,
    selectedComponentId,
  } = useComponentStore()

  const handleSave = () => {
    saveDesign()
    toast({
      title: "Design saved",
      description: "Your design has been saved successfully.",
    })
  }

  return (
    <div className="border-b bg-background p-2 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-6">Component Builder</h1>
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" onClick={handleSave} title="Save design">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setExportOpen(true)} title="Export design">
            <FileExport className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setPreviewOpen(true)} title="Preview design">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex space-x-1">
        <Button variant="outline" size="icon" onClick={undo} disabled={!canUndo} title="Undo">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={redo} disabled={!canRedo} title="Redo">
          <Redo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={duplicateSelectedComponent}
          disabled={!selectedComponentId}
          title="Duplicate component"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={deleteSelectedComponent}
          disabled={!selectedComponentId}
          title="Delete component"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <PreviewModal open={previewOpen} onOpenChange={setPreviewOpen} />
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  )
}
