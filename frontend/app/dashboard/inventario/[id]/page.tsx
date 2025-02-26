"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InventarioItem {
  id: number
  nombre: string
  codigo: string
  categoria: string
  ubicacion: string
  cantidad: number
  valorUnitario: number
  fechaAdquisicion: string
  estado: string
}

export default function InventarioItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<InventarioItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInventarioItem = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      setItem({
        id: Number(params.id),
        nombre: "Laptop Dell XPS",
        codigo: "LAP001",
        categoria: "Equipos de Cómputo",
        ubicacion: "Oficina Principal",
        cantidad: 5,
        valorUnitario: 1200,
        fechaAdquisicion: "2023-01-15",
        estado: "Activo",
      })
      setIsLoading(false)
    }

    fetchInventarioItem()
  }, [params.id])

  if (isLoading) return <div>Cargando...</div>
  if (!item) return <div>Item de inventario no encontrado</div>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{item.nombre}</h1>
        <div>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => router.push(`/dashboard/inventario/${item.id}/editar`)}
          >
            Editar
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Item de Inventario</CardTitle>
          <CardDescription>Información detallada sobre el item de inventario</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-500">Código</dt>
              <dd className="mt-1 text-gray-900">{item.codigo}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Categoría</dt>
              <dd className="mt-1 text-gray-900">{item.categoria}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Ubicación</dt>
              <dd className="mt-1 text-gray-900">{item.ubicacion}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Cantidad</dt>
              <dd className="mt-1 text-gray-900">{item.cantidad}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Valor Unitario</dt>
              <dd className="mt-1 text-gray-900">${item.valorUnitario.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Fecha de Adquisición</dt>
              <dd className="mt-1 text-gray-900">{item.fechaAdquisicion}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Estado</dt>
              <dd className="mt-1">
                <Badge variant={item.estado === "Activo" ? "default" : "secondary"}>{item.estado}</Badge>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Valor Total</dt>
              <dd className="mt-1 text-gray-900">${(item.cantidad * item.valorUnitario).toFixed(2)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

