"use client"

import { useDrag } from "react-dnd"
import { type Component, ItemTypes } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { MapComponent } from "@/components/map-component"

interface CanvasComponentProps {
  component: Component
  isSelected: boolean
  onSelect: () => void
  onMove: (x: number, y: number) => void
}

export function CanvasComponent({ component, isSelected, onSelect, onMove }: CanvasComponentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLACED_COMPONENT,
    item: { id: component.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const renderComponent = () => {
    const { type, props } = component

    switch (type) {
      case "heading":
        return <h2 style={{ fontSize: props.fontSize || "1.5rem" }}>{props.text || "Heading"}</h2>
      case "paragraph":
        return <p>{props.text || "Paragraph text goes here"}</p>
      case "button":
        return (
          <Button variant={props.variant || "default"} size={props.size || "default"}>
            {props.text || "Button"}
          </Button>
        )
      case "input":
        return <Input placeholder={props.placeholder || "Input placeholder"} className={props.className || ""} />
      case "image":
        return (
          <Image
            src={props.src || "/placeholder.svg?height=200&width=300"}
            alt={props.alt || "Image"}
            width={props.width || 300}
            height={props.height || 200}
            className="object-cover"
          />
        )
      case "container":
        return (
          <div
            className={`p-4 border rounded-md ${props.className || ""}`}
            style={{
              backgroundColor: props.backgroundColor || "transparent",
              width: props.width || "100%",
              height: props.height || "auto",
            }}
          >
            {props.text || "Container"}
          </div>
        )
      case "card":
        return (
          <Card className={props.className || ""}>
            <CardHeader>
              <CardTitle>{props.title || "Card Title"}</CardTitle>
              {props.description && <CardDescription>{props.description}</CardDescription>}
            </CardHeader>
            <CardContent>{props.content || "Card content goes here"}</CardContent>
            {props.footer && <CardFooter>{props.footer}</CardFooter>}
          </Card>
        )
      case "map":
        return (
          <MapComponent
            apiKey={props.apiKey || ""}
            lat={props.lat || 40.7128}
            lng={props.lng || -74.006}
            zoom={props.zoom || 12}
            mapTypeId={props.mapTypeId || "roadmap"}
            width={props.width || 400}
            height={props.height || 300}
            markers={props.markers || []}
          />
        )
      default:
        return <div>Unknown component type</div>
    }
  }

  return (
    <div
      ref={drag}
      className={`absolute cursor-move ${isSelected ? "ring-2 ring-primary" : ""}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
    >
      {renderComponent()}
    </div>
  )
}
