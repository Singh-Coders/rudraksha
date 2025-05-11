"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface AddEnvironmentVariablesProps {
  onAdd: (key: string, value: string) => void
  contactNumber?: string
  contactName?: string
}

export function AddEnvironmentVariables({ 
  onAdd, 
  contactNumber = "9111040606", 
  contactName = "Rajveer Singh Rajput" 
}: AddEnvironmentVariablesProps) {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (key && value) {
      onAdd(key, value)
      setKey("")
      setValue("")
      setOpen(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Add Environment Variable
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Environment Variable</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="env-key">Key</Label>
                <Input
                  id="env-key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="GOOGLE_MAPS_API_KEY"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="env-value">Value</Label>
                <Input
                  id="env-value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="your-api-key-here"
                  required
                />
              </div>
              <div className="mt-2 text-sm text-gray-500">
                For assistance contact: {contactName} | {contactNumber}
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Add Variable</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
