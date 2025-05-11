"use client"

import { useDrop } from "react-dnd"
import { useComponentStore } from "@/lib/component-store"
import { ItemTypes, type ComponentType } from "@/lib/types"
import { CanvasComponent } from "@/components/canvas-component"

interface DesignCanvasProps {
  selectedComponentId: string | null
  onSelectComponent: (id: string) => void
}

export function DesignCanvas({ selectedComponentId, onSelectComponent }: DesignCanvasProps) {
  const { components, addComponent, moveComponent } = useComponentStore()

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: { type: ComponentType }, monitor) => {
      const offset = monitor.getClientOffset()
      if (offset) {
        // Get canvas element position
        const canvasElement = document.getElementById("design-canvas")
        if (canvasElement) {
          const canvasRect = canvasElement.getBoundingClientRect()
          const x = offset.x - canvasRect.left
          const y = offset.y - canvasRect.top

          addComponent(item.type, { x, y })
        }
      }
      return undefined
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div className="flex-1 bg-muted/20 overflow-auto relative p-4">
      <div
        id="design-canvas"
        ref={drop}
        className={`w-full h-full min-h-[calc(100vh-8rem)] border-2 rounded-md ${
          isOver ? "border-primary border-dashed" : "border-muted"
        }`}
      >
        {components.map((component) => (
          <CanvasComponent
            key={component.id}
            component={component}
            isSelected={component.id === selectedComponentId}
            onSelect={() => onSelectComponent(component.id)}
            onMove={(x, y) => moveComponent(component.id, x, y)}
          />
        ))}

        {components.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Drag and drop components here to start building
          </div>
        )}
      </div>
    </div>
  )
}
