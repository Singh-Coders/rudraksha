"use client"

import type React from "react"
import { useDrag } from "react-dnd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Type,
  ImageIcon,
  Square,
  Layout,
  BoxIcon as ButtonIcon,
  FormInput,
  AlignLeft,
  CreditCard,
  Columns,
  Rows,
  ListOrdered,
  Map,
} from "lucide-react"
import { type ComponentType, ItemTypes } from "@/lib/types"

interface ComponentItemProps {
  type: ComponentType
  name: string
  icon: React.ReactNode
}

function ComponentItem({ type, name, icon }: ComponentItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`flex items-center p-2 rounded-md cursor-move border hover:bg-accent ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mr-2">{icon}</div>
      <span>{name}</span>
    </div>
  )
}

export function ComponentLibrary() {
  return (
    <div className="w-64 border-r bg-background p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>

      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-2 mt-2">
          <ComponentItem type="heading" name="Heading" icon={<Type className="h-4 w-4" />} />
          <ComponentItem type="paragraph" name="Paragraph" icon={<AlignLeft className="h-4 w-4" />} />
          <ComponentItem type="button" name="Button" icon={<ButtonIcon className="h-4 w-4" />} />
          <ComponentItem type="input" name="Input" icon={<FormInput className="h-4 w-4" />} />
          <ComponentItem type="image" name="Image" icon={<ImageIcon className="h-4 w-4" />} />
          <ComponentItem type="map" name="Map" icon={<Map className="h-4 w-4" />} />
        </TabsContent>

        <TabsContent value="layout" className="space-y-2 mt-2">
          <ComponentItem type="container" name="Container" icon={<Square className="h-4 w-4" />} />
          <ComponentItem type="row" name="Row" icon={<Rows className="h-4 w-4" />} />
          <ComponentItem type="column" name="Column" icon={<Columns className="h-4 w-4" />} />
          <ComponentItem type="card" name="Card" icon={<CreditCard className="h-4 w-4" />} />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-2 mt-2">
          <ComponentItem type="form" name="Form" icon={<Layout className="h-4 w-4" />} />
          <ComponentItem type="list" name="List" icon={<ListOrdered className="h-4 w-4" />} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
