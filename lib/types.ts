export type ComponentType =
  | "heading"
  | "paragraph"
  | "button"
  | "input"
  | "image"
  | "container"
  | "row"
  | "column"
  | "card"
  | "form"
  | "list"
  | "map"

export interface Component {
  id: string
  type: ComponentType
  position: {
    x: number
    y: number
  }
  props: Record<string, any>
}

export const ItemTypes = {
  COMPONENT: "component",
  PLACED_COMPONENT: "placed_component",
}
