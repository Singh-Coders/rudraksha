"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { Input } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Declare the google variable
declare global {
  interface Window {
    google: any
  }
}

interface MapComponentProps {
  apiKey: string
  lat?: number
  lng?: number
  zoom?: number
  mapTypeId?: google.maps.MapTypeId
  width?: number | string
  height?: number | string
  markers?: Array<{ lat: number; lng: number; title?: string }>
  onMapChange?: (mapConfig: MapConfig) => void
  className?: string
}

export interface MapConfig {
  center: { lat: number; lng: number }
  zoom: number
  mapTypeId: google.maps.MapTypeId
  markers: Array<{ lat: number; lng: number; title?: string }>
}

export function MapComponent({
  apiKey,
  lat = 40.7128,
  lng = -74.006,
  zoom = 12,
  mapTypeId = "roadmap" as google.maps.MapTypeId,
  width = "100%",
  height = 400,
  markers = [],
  onMapChange,
  className,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load Google Maps API
  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is required")
      return
    }

    const loader = new Loader({
      apiKey,
      version: "weekly",
    })

    loader
      .load()
      .then(() => {
        setIsLoaded(true)
      })
      .catch((err) => {
        console.error("Error loading Google Maps API:", err)
        setError("Failed to load Google Maps")
      })
  }, [apiKey])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return

    try {
      const mapOptions: google.maps.MapOptions = {
        center: { lat, lng },
        zoom,
        mapTypeId: mapTypeId as google.maps.MapTypeId,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
      }

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
      setMap(newMap)

      // Notify parent of map configuration
      if (onMapChange) {
        onMapChange({
          center: { lat, lng },
          zoom,
          mapTypeId: mapTypeId as google.maps.MapTypeId,
          markers,
        })
      }

      // Add event listeners
      newMap.addListener("center_changed", () => {
        const center = newMap.getCenter()
        if (center && onMapChange) {
          onMapChange({
            center: { lat: center.lat(), lng: center.lng() },
            zoom: newMap.getZoom() || zoom,
            mapTypeId: newMap.getMapTypeId() as google.maps.MapTypeId,
            markers,
          })
        }
      })

      newMap.addListener("zoom_changed", () => {
        if (onMapChange) {
          const center = newMap.getCenter()
          onMapChange({
            center: center ? { lat: center.lat(), lng: center.lng() } : { lat, lng },
            zoom: newMap.getZoom() || zoom,
            mapTypeId: newMap.getMapTypeId() as google.maps.MapTypeId,
            markers,
          })
        }
      })

      newMap.addListener("maptypeid_changed", () => {
        if (onMapChange) {
          const center = newMap.getCenter()
          onMapChange({
            center: center ? { lat: center.lat(), lng: center.lng() } : { lat, lng },
            zoom: newMap.getZoom() || zoom,
            mapTypeId: newMap.getMapTypeId() as google.maps.MapTypeId,
            markers,
          })
        }
      })
    } catch (err) {
      console.error("Error initializing Google Maps:", err)
      setError("Failed to initialize Google Maps")
    }
  }, [isLoaded, lat, lng, zoom, mapTypeId, markers, onMapChange])

  // Update markers when they change
  useEffect(() => {
    if (!map) return

    // Clear existing markers
    mapMarkers.forEach((marker) => marker.setMap(null))

    // Add new markers
    const newMarkers = markers.map(
      (markerData) =>
        new window.google.maps.Marker({
          position: { lat: markerData.lat, lng: markerData.lng },
          map,
          title: markerData.title,
        }),
    )

    setMapMarkers(newMarkers)
  }, [map, markers, mapMarkers])

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 border border-red-200 text-red-700 p-4 rounded-md ${className}`}
        style={{ width, height }}
      >
        <p>{error}</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border border-gray-200 p-4 rounded-md ${className}`}
        style={{ width, height }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div
      ref={mapRef}
      className={`rounded-md overflow-hidden ${className}`}
      style={{ width, height }}
      aria-label="Google Map"
    ></div>
  )
}

export function MapControls({
  center,
  zoom,
  mapTypeId,
  onCenterChange,
  onZoomChange,
  onMapTypeChange,
}: {
  center: { lat: number; lng: number }
  zoom: number
  mapTypeId: google.maps.MapTypeId
  onCenterChange: (lat: number, lng: number) => void
  onZoomChange: (zoom: number) => void
  onMapTypeChange: (mapTypeId: google.maps.MapTypeId) => void
}) {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <div className="space-y-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          type="number"
          step="0.000001"
          value={center.lat}
          onChange={(e) => onCenterChange(Number.parseFloat(e.target.value), center.lng)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          type="number"
          step="0.000001"
          value={center.lng}
          onChange={(e) => onCenterChange(center.lat, Number.parseFloat(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zoom">Zoom Level: {zoom}</Label>
        <Slider id="zoom" min={1} max={20} step={1} value={[zoom]} onValueChange={(value) => onZoomChange(value[0])} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mapType">Map Type</Label>
        <Select value={mapTypeId} onValueChange={(value) => onMapTypeChange(value as google.maps.MapTypeId)}>
          <SelectTrigger>
            <SelectValue placeholder="Select map type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="roadmap">Roadmap</SelectItem>
            <SelectItem value="satellite">Satellite</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="terrain">Terrain</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
