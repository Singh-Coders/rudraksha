"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useComponentStore } from "@/lib/component-store"
import { Copy, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const { components } = useComponentStore()
  const { toast } = useToast()
  const [exportFormat, setExportFormat] = useState<"html" | "react" | "json">("html")

  const generateHtmlCode = () => {
    let html =
      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Exported Design</title>\n  <style>\n    body { margin: 0; font-family: sans-serif; }\n    .design-container { position: relative; width: 100%; height: 100vh; }\n  </style>\n'

    // Add Google Maps script if there are map components
    if (components.some((component) => component.type === "map")) {
      const mapComponent = components.find((component) => component.type === "map")
      const apiKey = mapComponent?.props.apiKey || "YOUR_API_KEY"
      html += `  <script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}"></script>\n`
      html += "  <script>\n    function initMaps() {\n"

      components
        .filter((component) => component.type === "map")
        .forEach((component, index) => {
          const { props, position } = component
          html += `      const map${index} = new google.maps.Map(document.getElementById("map-${index}"), {\n`
          html += `        center: { lat: ${props.lat || 40.7128}, lng: ${props.lng || -74.006} },\n`
          html += `        zoom: ${props.zoom || 12},\n`
          html += `        mapTypeId: "${props.mapTypeId || "roadmap"}"\n`
          html += "      });\n\n"

          if (props.markers && props.markers.length > 0) {
            props.markers.forEach((marker: any, markerIndex: number) => {
              html += `      new google.maps.Marker({\n`
              html += `        position: { lat: ${marker.lat}, lng: ${marker.lng} },\n`
              html += `        map: map${index},\n`
              html += `        title: "${marker.title || `Marker ${markerIndex + 1}`}"\n`
              html += "      });\n"
            })
          }
        })

      html += "    }\n  </script>\n"
    }

    html += "</head>\n<body"

    // Add onload for maps if needed
    if (components.some((component) => component.type === "map")) {
      html += ' onload="initMaps()"'
    }

    html += '>\n  <div class="design-container">\n'

    components.forEach((component) => {
      const { type, props, position } = component

      switch (type) {
        case "heading":
          html += `    <h2 style="position: absolute; left: ${position.x}px; top: ${position.y}px; font-size: ${props.fontSize || "1.5rem"}; color: ${props.color || "inherit"}">${props.text || "Heading"}</h2>\n`
          break
        case "paragraph":
          html += `    <p style="position: absolute; left: ${position.x}px; top: ${position.y}px; color: ${props.color || "inherit"}">${props.text || "Paragraph text goes here"}</p>\n`
          break
        case "button":
          html += `    <button style="position: absolute; left: ${position.x}px; top: ${position.y}px; padding: 0.5rem 1rem; border-radius: 0.375rem; ${props.variant === "outline" ? "border: 1px solid #3b82f6; color: #3b82f6; background: transparent;" : "background-color: #3b82f6; color: white; border: none;"}">${props.text || "Button"}</button>\n`
          break
        case "input":
          html += `    <input type="text" placeholder="${props.placeholder || "Input placeholder"}" style="position: absolute; left: ${position.x}px; top: ${position.y}px; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; width: ${props.width || 200}px;">\n`
          break
        case "image":
          html += `    <img src="${props.src || "/placeholder.svg"}" alt="${props.alt || "Image"}" style="position: absolute; left: ${position.x}px; top: ${position.y}px; width: ${props.width || 300}px; height: ${props.height || 200}px; object-fit: cover;">\n`
          break
        case "container":
          html += `    <div style="position: absolute; left: ${position.x}px; top: ${position.y}px; width: ${props.width || 300}px; height: ${props.height || 200}px; background-color: ${props.backgroundColor || "transparent"}; border: 1px solid #e2e8f0; border-radius: 0.375rem; padding: 1rem;">${props.text || "Container"}</div>\n`
          break
        case "card":
          html += `    <div style="position: absolute; left: ${position.x}px; top: ${position.y}px; width: ${props.width || 350}px; border: 1px solid #e2e8f0; border-radius: 0.375rem; background-color: white; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); overflow: hidden;">\n`
          html += `      <div style="padding: 1.5rem 1.5rem 0.75rem;">\n`
          html += `        <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.25rem;">${props.title || "Card Title"}</h3>\n`
          if (props.description) {
            html += `        <p style="color: #6b7280; font-size: 0.875rem;">${props.description}</p>\n`
          }
          html += `      </div>\n`
          html += `      <div style="padding: 0 1.5rem 1.5rem;">${props.content || "Card content goes here"}</div>\n`
          if (props.footer) {
            html += `      <div style="padding: 0.75rem 1.5rem; border-top: 1px solid #e2e8f0;">${props.footer}</div>\n`
          }
          html += `    </div>\n`
          break
        case "map":
          const mapIndex = components.filter((c) => c.type === "map").findIndex((c) => c.id === component.id)
          html += `    <div id="map-${mapIndex}" style="position: absolute; left: ${position.x}px; top: ${position.y}px; width: ${props.width || 400}px; height: ${props.height || 300}px; border-radius: 0.375rem; overflow: hidden;"></div>\n`
          break
      }
    })

    html += "  </div>\n</body>\n</html>"

    return html
  }

  const generateReactCode = () => {
    let react =
      "import React, { useEffect } from 'react';\nimport { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';\n\nexport default function ExportedDesign() {\n"

    // Add map configurations if needed
    if (components.some((component) => component.type === "map")) {
      const mapComponent = components.find((component) => component.type === "map")
      react += `  const apiKey = "${mapComponent?.props.apiKey || "YOUR_API_KEY"}";\n\n`

      components
        .filter((component) => component.type === "map")
        .forEach((component, index) => {
          react += `  const mapConfig${index} = {\n`
          react += `    center: { lat: ${component.props.lat || 40.7128}, lng: ${component.props.lng || -74.006} },\n`
          react += `    zoom: ${component.props.zoom || 12},\n`
          react += `    mapTypeId: "${component.props.mapTypeId || "roadmap"}"\n`
          react += `  };\n\n`
        })
    }

    react += '  return (\n    <div className="relative w-full h-screen">\n'

    components.forEach((component) => {
      const { type, props, position } = component

      switch (type) {
        case "heading":
          react += `      <h2 style={{ position: 'absolute', left: ${position.x}, top: ${position.y}, fontSize: '${props.fontSize || "1.5rem"}', color: '${props.color || "inherit"}' }}>\n        ${props.text || "Heading"}\n      </h2>\n`
          break
        case "paragraph":
          react += `      <p style={{ position: 'absolute', left: ${position.x}, top: ${position.y}, color: '${props.color || "inherit"}' }}>\n        ${props.text || "Paragraph text goes here"}\n      </p>\n`
          break
        case "button":
          react += `      <button\n        style={{ position: 'absolute', left: ${position.x}, top: ${position.y} }}\n        className={\`px-4 py-2 rounded-md ${props.variant === "outline" ? "border border-blue-500 text-blue-500" : "bg-blue-500 text-white"}\`}\n      >\n        ${props.text || "Button"}\n      </button>\n`
          break
        case "input":
          react += `      <input\n        type="text"\n        placeholder="${props.placeholder || "Input placeholder"}"\n        style={{ position: 'absolute', left: ${position.x}, top: ${position.y}, width: ${props.width || 200} }}\n        className="border rounded-md px-3 py-2"\n      />\n`
          break
        case "image":
          react += `      <img\n        src="${props.src || "/placeholder.svg"}"\n        alt="${props.alt || "Image"}"\n        style={{ position: 'absolute', left: ${position.x}, top: ${position.y}, width: ${props.width || 300}, height: ${props.height || 200}, objectFit: 'cover' }}\n      />\n`
          break
        case "container":
          react += `      <div\n        style={{ position: 'absolute', left: ${position.x}, top: ${position.y}, width: ${props.width || 300}, height: ${props.height || 200}, backgroundColor: '${props.backgroundColor || "transparent"}' }}\n        className="border rounded-md p-4"\n      >\n        ${props.text || "Container"}\n      </div>\n`
          break
        case "card":
          react += `      <div\n        style={{ position: 'absolute', left: ${position.x}, top: ${position.y}, width: ${props.width || 350} }}\n        className="border rounded-md shadow-sm bg-white overflow-hidden"\n      >\n`
          react += `        <div className="p-6 pb-3">\n`
          react += `          <h3 className="text-xl font-bold mb-1">${props.title || "Card Title"}</h3>\n`
          if (props.description) {
            react += `          <p className="text-gray-500 text-sm">${props.description}</p>\n`
          }
          react += `        </div>\n`
          react += `        <div className="px-6 pb-6">${props.content || "Card content goes here"}</div>\n`
          if (props.footer) {
            react += `        <div className="px-6 py-3 border-t">${props.footer}</div>\n`
          }
          react += `      </div>\n`
          break
        case "map":
          const mapIndex = components.filter((c) => c.type === "map").findIndex((c) => c.id === component.id)
          react += `      <div style={{ position: 'absolute', left: ${position.x}, top: ${position.y} }}>\n`
          react += `        <LoadScript googleMapsApiKey={apiKey}>\n`
          react += `          <GoogleMap\n`
          react += `            mapContainerStyle={{ width: ${props.width || 400}, height: ${props.height || 300} }}\n`
          react += `            center={mapConfig${mapIndex}.center}\n`
          react += `            zoom={mapConfig${mapIndex}.zoom}\n`
          react += `            mapTypeId="${props.mapTypeId || "roadmap"}"\n`
          react += `          >\n`

          if (props.markers && props.markers.length > 0) {
            props.markers.forEach((marker: any, markerIndex: number) => {
              react += `            <Marker\n`
              react += `              position={{ lat: ${marker.lat}, lng: ${marker.lng} }}\n`
              react += `              title="${marker.title || `Marker ${markerIndex + 1}`}"\n`
              react += `            />\n`
            })
          }

          react += `          </GoogleMap>\n`
          react += `        </LoadScript>\n`
          react += `      </div>\n`
          break
      }
    })

    react += "    </div>\n  );\n}\n"

    return react
  }

  const generateJsonCode = () => {
    return JSON.stringify(components, null, 2)
  }

  const getExportCode = () => {
    switch (exportFormat) {
      case "html":
        return generateHtmlCode()
      case "react":
        return generateReactCode()
      case "json":
        return generateJsonCode()
      default:
        return ""
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode())
    toast({
      title: "Copied to clipboard",
      description: `${exportFormat.toUpperCase()} code has been copied to your clipboard.`,
    })
  }

  const handleDownloadCode = () => {
    const code = getExportCode()
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")

    let filename = ""
    switch (exportFormat) {
      case "html":
        filename = "exported-design.html"
        break
      case "react":
        filename = "ExportedDesign.jsx"
        break
      case "json":
        filename = "exported-design.json"
        break
    }

    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded successfully",
      description: `${filename} has been downloaded.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Export Design</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="html" value={exportFormat} onValueChange={(value) => setExportFormat(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          <div className="mt-4 relative">
            <div className="absolute top-2 right-2 flex space-x-2 z-10">
              <Button variant="outline" size="icon" onClick={handleCopyCode} title="Copy code">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownloadCode} title="Download code">
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <pre className="p-4 rounded-md bg-muted overflow-auto max-h-[50vh] text-sm">
              <code>{getExportCode()}</code>
            </pre>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
