"use client"

import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import type { Component, ComponentType } from "@/lib/types"

interface ComponentState {
  components: Component[]
  selectedComponentId: string | null
  history: Component[][]
  currentHistoryIndex: number

  // Actions
  addComponent: (type: ComponentType, position: { x: number; y: number }) => void
  updateComponentProps: (id: string, props: Record<string, any>, position?: { x: number; y: number }) => void
  moveComponent: (id: string, x: number, y: number) => void
  deleteComponent: (id: string) => void
  deleteSelectedComponent: () => void
  duplicateComponent: (id: string) => void
  duplicateSelectedComponent: () => void
  selectComponent: (id: string | null) => void
  saveDesign: () => void
  loadDesign: (design: Component[]) => void
  undo: () => void
  redo: () => void

  // Computed
  canUndo: boolean
  canRedo: boolean
}

export const useComponentStore = create<ComponentState>((set, get) => ({
  components: [],
  selectedComponentId: null,
  history: [[]],
  currentHistoryIndex: 0,

  addComponent: (type, position) => {
    const newComponent: Component = {
      id: uuidv4(),
      type,
      position,
      props: {},
    }

    set((state) => {
      const newComponents = [...state.components, newComponent]
      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)

      return {
        components: newComponents,
        selectedComponentId: newComponent.id,
        history: [...newHistory, newComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      }
    })
  },

  updateComponentProps: (id, props, position) => {
    set((state) => {
      const newComponents = state.components.map((component) => {
        if (component.id === id) {
          return {
            ...component,
            props: { ...component.props, ...props },
            position: position ? { ...component.position, ...position } : component.position,
          }
        }
        return component
      })

      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)

      return {
        components: newComponents,
        history: [...newHistory, newComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      }
    })
  },

  moveComponent: (id, x, y) => {
    set((state) => {
      const newComponents = state.components.map((component) => {
        if (component.id === id) {
          return {
            ...component,
            position: { x, y },
          }
        }
        return component
      })

      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)

      return {
        components: newComponents,
        history: [...newHistory, newComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      }
    })
  },

  deleteComponent: (id) => {
    set((state) => {
      const newComponents = state.components.filter((component) => component.id !== id)
      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)

      return {
        components: newComponents,
        selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
        history: [...newHistory, newComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      }
    })
  },

  deleteSelectedComponent: () => {
    const { selectedComponentId, deleteComponent } = get()
    if (selectedComponentId) {
      deleteComponent(selectedComponentId)
    }
  },

  duplicateComponent: (id) => {
    set((state) => {
      const componentToDuplicate = state.components.find((component) => component.id === id)

      if (!componentToDuplicate) return state

      const newComponent: Component = {
        ...componentToDuplicate,
        id: uuidv4(),
        position: {
          x: componentToDuplicate.position.x + 20,
          y: componentToDuplicate.position.y + 20,
        },
      }

      const newComponents = [...state.components, newComponent]
      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)

      return {
        components: newComponents,
        selectedComponentId: newComponent.id,
        history: [...newHistory, newComponents],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      }
    })
  },

  duplicateSelectedComponent: () => {
    const { selectedComponentId, duplicateComponent } = get()
    if (selectedComponentId) {
      duplicateComponent(selectedComponentId)
    }
  },

  selectComponent: (id) => {
    set({ selectedComponentId: id })
  },

  saveDesign: () => {
    const { components } = get()
    localStorage.setItem("savedDesign", JSON.stringify(components))
  },

  loadDesign: (design) => {
    set((state) => {
      const newHistory = state.history.slice(0, state.currentHistoryIndex + 1)

      return {
        components: design,
        history: [...newHistory, design],
        currentHistoryIndex: state.currentHistoryIndex + 1,
      }
    })
  },

  undo: () => {
    set((state) => {
      if (state.currentHistoryIndex <= 0) return state

      const newIndex = state.currentHistoryIndex - 1
      return {
        components: state.history[newIndex],
        currentHistoryIndex: newIndex,
      }
    })
  },

  redo: () => {
    set((state) => {
      if (state.currentHistoryIndex >= state.history.length - 1) return state

      const newIndex = state.currentHistoryIndex + 1
      return {
        components: state.history[newIndex],
        currentHistoryIndex: newIndex,
      }
    })
  },

  get canUndo() {
    return get().currentHistoryIndex > 0
  },

  get canRedo() {
    return get().currentHistoryIndex < get().history.length - 1
  },
}))
