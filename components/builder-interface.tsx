"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ComponentLibrary } from "@/components/component-library"
import { DesignCanvas } from "@/components/design-canvas"
import { PropertiesPanel } from "@/components/properties-panel"
import { Toolbar } from "@/components/toolbar"
import { useComponentStore } from "@/lib/component-store"
import { AnimatedBackground } from "@/components/animated-background"

export function BuilderInterface() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)
  const { components } = useComponentStore()

  const selectedComponent = selectedComponentId ? components.find((c) => c.id === selectedComponentId) || null : null

  return (
    <AnimatedBackground>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-screen">
          <Toolbar />
          <div className="flex flex-1 overflow-hidden">
            <ComponentLibrary />
            <DesignCanvas selectedComponentId={selectedComponentId} onSelectComponent={setSelectedComponentId} />
            <PropertiesPanel
              selectedComponent={selectedComponent}
              onDeselectComponent={() => setSelectedComponentId(null)}
            />
          </div>
        </div>
      </DndProvider>
    </AnimatedBackground>
  )
}
