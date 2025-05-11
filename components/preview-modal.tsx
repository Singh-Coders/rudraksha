"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useComponentStore } from "@/lib/component-store"
import type { Component } from "@/lib/types"
import { MapComponent } from "@/components/map-component"

interface PreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PreviewModal({ open, onOpenChange }: PreviewModalProps) {
  const { components } = useComponentStore()

  const renderComponent = (component: Component) => {
    const { type, props } = component

    switch (type) {
      case "heading":
        return (
          <h2
            style={{
              fontSize: props.fontSize || "1.5rem",
              color: props.color || "inherit",
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
            }}
          >
            {props.text || "Heading"}
          </h2>
        )
      case "paragraph":
        return (
          <p
            style={{
              color: props.color || "inherit",
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
            }}
          >
            {props.text || "Paragraph text goes here"}
          </p>
        )
      case "button":
        return (
          <button
            className={`px-4 py-2 rounded-md ${
              props.variant === "outline"
                ? "border border-primary text-primary"
                : props.variant === "destructive"
                  ? "bg-destructive text-destructive-foreground"
                  : props.variant === "secondary"
                    ? "bg-secondary text-secondary-foreground"
                    : props.variant === "ghost"
                      ? "hover:bg-accent hover:text-accent-foreground"
                      : props.variant === "link"
                        ? "text-primary underline-offset-4 hover:underline"
                        : "bg-primary text-primary-foreground"
            } ${props.size === "sm" ? "text-xs" : props.size === "lg" ? "text-lg" : "text-sm"}`}
            style={{
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
            }}
          >
            {props.text || "Button"}
          </button>
        )
      case "input":
        return (
          <input
            type="text"
            placeholder={props.placeholder || "Input placeholder"}
            className="border rounded-md px-3 py-2"
            style={{
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
              width: props.width ? `${props.width}px` : "200px",
            }}
            readOnly
          />
        )
      case "image":
        return (
          <img
            src={props.src || "/placeholder.svg?height=200&width=300"}
            alt={props.alt || "Image"}
            style={{
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
              width: props.width ? `${props.width}px` : "300px",
              height: props.height ? `${props.height}px` : "200px",
              objectFit: "cover",
            }}
          />
        )
      case "container":
        return (
          <div
            style={{
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
              backgroundColor: props.backgroundColor || "transparent",
              width: props.width ? `${props.width}px` : "300px",
              height: props.height ? `${props.height}px` : "200px",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              padding: "1rem",
            }}
          >
            {props.text || "Container"}
          </div>
        )
      case "card":
        return (
          <div
            style={{
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
              width: props.width ? `${props.width}px` : "350px",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              backgroundColor: "white",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.5rem 1.5rem 0.75rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
                {props.title || "Card Title"}
              </h3>
              {props.description && <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{props.description}</p>}
            </div>
            <div style={{ padding: "0 1.5rem 1.5rem" }}>{props.content || "Card content goes here"}</div>
            {props.footer && (
              <div style={{ padding: "0.75rem 1.5rem", borderTop: "1px solid #e2e8f0" }}>{props.footer}</div>
            )}
          </div>
        )
      case "map":
        return (
          <div
            style={{
              position: "absolute",
              left: component.position.x,
              top: component.position.y,
            }}
          >
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
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-[60vh] border rounded-md bg-background">
          {components.map((component) => (
            <div key={component.id}>{renderComponent(component)}</div>
          ))}

          {components.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No components to preview
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
