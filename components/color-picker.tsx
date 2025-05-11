"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [localColor, setLocalColor] = useState(color)

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value)
    onChange(e.target.value)
  }

  const presetColors = [
    "#000000",
    "#ffffff",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-full flex items-center justify-between px-3 py-2 border rounded-md"
          style={{ backgroundColor: localColor }}
        >
          <span className={`${Number.parseInt(localColor.slice(1), 16) > 0xffffff / 2 ? "text-black" : "text-white"}`}>
            {localColor}
          </span>
          <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: localColor }} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <div className="flex justify-center">
            <input type="color" value={localColor} onChange={handleColorChange} className="w-32 h-32 cursor-pointer" />
          </div>
          <div className="grid grid-cols-5 gap-1 mt-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="w-8 h-8 rounded-md border"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  setLocalColor(presetColor)
                  onChange(presetColor)
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
