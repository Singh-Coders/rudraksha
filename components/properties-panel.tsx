"use client"

import { useState, useEffect } from "react"
import { X, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useComponentStore } from "@/lib/component-store"
import type { Component } from "@/lib/types"
import { ColorPicker } from "@/components/color-picker"
import { MapControls } from "@/components/map-component"

interface PropertiesPanelProps {
  selectedComponent: Component | null
  onDeselectComponent: () => void
}

export function PropertiesPanel({ selectedComponent, onDeselectComponent }: PropertiesPanelProps) {
  const { updateComponentProps } = useComponentStore()
  const [localProps, setLocalProps] = useState<any>({})
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false)

  useEffect(() => {
    if (selectedComponent) {
      setLocalProps(selectedComponent.props || {})

      // Check if we need to show API key prompt for map component
      if (selectedComponent.type === "map" && !selectedComponent.props.apiKey) {
        setShowApiKeyPrompt(true)
      } else {
        setShowApiKeyPrompt(false)
      }
    }
  }, [selectedComponent])

  if (!selectedComponent) {
    return (
      <div className="w-72 border-l bg-background p-4">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p className="text-muted-foreground">Select a component to edit its properties</p>
      </div>
    )
  }

  const handleChange = (key: string, value: any) => {
    const updatedProps = { ...localProps, [key]: value }
    setLocalProps(updatedProps)
    updateComponentProps(selectedComponent.id, updatedProps)
  }

  const renderPropertiesForType = () => {
    const { type } = selectedComponent

    const commonProperties = (
      <>
        <div className="space-y-1">
          <Label htmlFor="position-x">Position X</Label>
          <Input
            id="position-x"
            type="number"
            value={selectedComponent.position.x}
            onChange={(e) => {
              const x = Number.parseInt(e.target.value) || 0
              updateComponentProps(selectedComponent.id, localProps, { x, y: selectedComponent.position.y })
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="position-y">Position Y</Label>
          <Input
            id="position-y"
            type="number"
            value={selectedComponent.position.y}
            onChange={(e) => {
              const y = Number.parseInt(e.target.value) || 0
              updateComponentProps(selectedComponent.id, localProps, { x: selectedComponent.position.x, y })
            }}
          />
        </div>
      </>
    )

    switch (type) {
      case "heading":
        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="text">Text</Label>
              <Input id="text" value={localProps.text || ""} onChange={(e) => handleChange("text", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fontSize">Font Size</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="fontSize"
                  min={12}
                  max={72}
                  step={1}
                  value={[Number.parseInt(localProps.fontSize) || 24]}
                  onValueChange={(value) => handleChange("fontSize", `${value[0]}px`)}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.fontSize) || 24}px</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="color">Text Color</Label>
              <ColorPicker color={localProps.color || "#000000"} onChange={(color) => handleChange("color", color)} />
            </div>
          </>
        )

      case "paragraph":
        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                value={localProps.text || ""}
                onChange={(e) => handleChange("text", e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="color">Text Color</Label>
              <ColorPicker color={localProps.color || "#000000"} onChange={(color) => handleChange("color", color)} />
            </div>
          </>
        )

      case "button":
        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="text">Text</Label>
              <Input id="text" value={localProps.text || ""} onChange={(e) => handleChange("text", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="variant">Variant</Label>
              <Select value={localProps.variant || "default"} onValueChange={(value) => handleChange("variant", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="size">Size</Label>
              <Select value={localProps.size || "default"} onValueChange={(value) => handleChange("size", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )

      case "input":
        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={localProps.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="width">Width</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="width"
                  min={100}
                  max={500}
                  step={10}
                  value={[Number.parseInt(localProps.width) || 200]}
                  onValueChange={(value) => handleChange("width", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.width) || 200}px</span>
              </div>
            </div>
          </>
        )

      case "image":
        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={localProps.src || ""}
                onChange={(e) => handleChange("src", e.target.value)}
                placeholder="/placeholder.svg?height=200&width=300"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="alt">Alt Text</Label>
              <Input id="alt" value={localProps.alt || ""} onChange={(e) => handleChange("alt", e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="width">Width</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="width"
                  min={50}
                  max={800}
                  step={10}
                  value={[Number.parseInt(localProps.width) || 300]}
                  onValueChange={(value) => handleChange("width", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.width) || 300}px</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="height">Height</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="height"
                  min={50}
                  max={800}
                  step={10}
                  value={[Number.parseInt(localProps.height) || 200]}
                  onValueChange={(value) => handleChange("height", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.height) || 200}px</span>
              </div>
            </div>
          </>
        )

      case "container":
        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <ColorPicker
                color={localProps.backgroundColor || "#ffffff"}
                onChange={(color) => handleChange("backgroundColor", color)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="width">Width</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="width"
                  min={100}
                  max={1000}
                  step={10}
                  value={[Number.parseInt(localProps.width) || 300]}
                  onValueChange={(value) => handleChange("width", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.width) || 300}px</span>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="height">Height</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="height"
                  min={50}
                  max={800}
                  step={10}
                  value={[Number.parseInt(localProps.height) || 200]}
                  onValueChange={(value) => handleChange("height", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.height) || 200}px</span>
              </div>
            </div>
          </>
        )

      case "card":
        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={localProps.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={localProps.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={localProps.content || ""}
                onChange={(e) => handleChange("content", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="width">Width</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="width"
                  min={200}
                  max={800}
                  step={10}
                  value={[Number.parseInt(localProps.width) || 350]}
                  onValueChange={(value) => handleChange("width", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.width) || 350}px</span>
              </div>
            </div>
          </>
        )

      case "map":
        if (showApiKeyPrompt) {
          return (
            <>
              {commonProperties}
              <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800 mb-4">
                <p className="text-sm mb-2">
                  A Google Maps API key is required to use the map component. Please add your API key below.
                </p>
                <div className="space-y-1">
                  <Label htmlFor="apiKey">Google Maps API Key</Label>
                  <Input
                    id="apiKey"
                    value={localProps.apiKey || ""}
                    onChange={(e) => {
                      handleChange("apiKey", e.target.value)
                      if (e.target.value) {
                        setShowApiKeyPrompt(false)
                      }
                    }}
                    placeholder="Enter your Google Maps API key"
                  />
                </div>
              </div>
            </>
          )
        }

        return (
          <>
            {commonProperties}
            <div className="space-y-1">
              <Label htmlFor="apiKey">Google Maps API Key</Label>
              <Input
                id="apiKey"
                value={localProps.apiKey || ""}
                onChange={(e) => handleChange("apiKey", e.target.value)}
                placeholder="Enter your Google Maps API key"
              />
            </div>

            <MapControls
              center={{ lat: localProps.lat || 40.7128, lng: localProps.lng || -74.006 }}
              zoom={localProps.zoom || 12}
              mapTypeId={localProps.mapTypeId || "roadmap"}
              onCenterChange={(lat, lng) => {
                handleChange("lat", lat)
                handleChange("lng", lng)
              }}
              onZoomChange={(zoom) => handleChange("zoom", zoom)}
              onMapTypeChange={(mapTypeId) => handleChange("mapTypeId", mapTypeId)}
            />

            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <Label>Markers</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const markers = [...(localProps.markers || [])]
                    markers.push({
                      lat: localProps.lat || 40.7128,
                      lng: localProps.lng || -74.006,
                      title: "New Marker",
                    })
                    handleChange("markers", markers)
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Marker
                </Button>
              </div>

              {(localProps.markers || []).map((marker: any, index: number) => (
                <div key={index} className="p-2 border rounded-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Marker {index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const markers = [...(localProps.markers || [])]
                        markers.splice(index, 1)
                        handleChange("markers", markers)
                      }}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`marker-${index}-title`}>Title</Label>
                    <Input
                      id={`marker-${index}-title`}
                      value={marker.title || ""}
                      onChange={(e) => {
                        const markers = [...(localProps.markers || [])]
                        markers[index] = { ...markers[index], title: e.target.value }
                        handleChange("markers", markers)
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`marker-${index}-lat`}>Latitude</Label>
                    <Input
                      id={`marker-${index}-lat`}
                      type="number"
                      step="0.000001"
                      value={marker.lat}
                      onChange={(e) => {
                        const markers = [...(localProps.markers || [])]
                        markers[index] = { ...markers[index], lat: Number.parseFloat(e.target.value) }
                        handleChange("markers", markers)
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`marker-${index}-lng`}>Longitude</Label>
                    <Input
                      id={`marker-${index}-lng`}
                      type="number"
                      step="0.000001"
                      value={marker.lng}
                      onChange={(e) => {
                        const markers = [...(localProps.markers || [])]
                        markers[index] = { ...markers[index], lng: Number.parseFloat(e.target.value) }
                        handleChange("markers", markers)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1 mt-4">
              <Label htmlFor="width">Width</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="width"
                  min={200}
                  max={1000}
                  step={10}
                  value={[Number.parseInt(localProps.width) || 400]}
                  onValueChange={(value) => handleChange("width", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.width) || 400}px</span>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="height">Height</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  id="height"
                  min={100}
                  max={800}
                  step={10}
                  value={[Number.parseInt(localProps.height) || 300]}
                  onValueChange={(value) => handleChange("height", value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Number.parseInt(localProps.height) || 300}px</span>
              </div>
            </div>
          </>
        )

      default:
        return commonProperties
    }
  }

  return (
    <div className="w-72 border-l bg-background p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Properties</h2>
        <Button variant="ghost" size="icon" onClick={onDeselectComponent}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
      </div>

      <div className="space-y-4">{renderPropertiesForType()}</div>
    </div>
  )
}
