"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Mantenimiento {
  id: number
  activo: string
  tipoMantenimiento: string
  fechaInicio: string
  fechaFin: string
  responsable: string
  descripcion: string
  estado: string
}

export default function MantenimientoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [mantenimiento, setMantenimiento] = useState<Mantenimiento | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMantenimiento = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      setMantenimiento({
        id: Number(params.id),
        activo: "Laptop Dell XPS",
        tipoMantenimiento: "Preventivo",
        fechaInicio: "2023-06-01",
        fechaFin: "2023-06-03",
        responsable: "Juan Pérez",
        descripcion: "Limpieza y actualización de software",
        estado: "Completado",
      })
      setIsLoading(false)
    }

    fetchMantenimiento()
  }, [params.id])

  if (isLoading) return <div>Cargando...</div>
  if (!mantenimiento) return <div>Mantenimiento no encontrado</div>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mantenimiento de {mantenimiento.activo}</h1>
        <div>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => router.push(`/dashboard/mantenimientos/${mantenimiento.id}/editar`)}
          >
            Editar
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Mantenimiento</CardTitle>
          <CardDescription>Información detallada sobre el mantenimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-500">Activo</dt>
              <dd className="mt-1 text-gray-900">{mantenimiento.activo}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Tipo de Mantenimiento</dt>
              <dd className="mt-1 text-gray-900">{mantenimiento.tipoMantenimiento}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Fecha de Inicio</dt>
              <dd className="mt-1 text-gray-900">{mantenimiento.fechaInicio}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Fecha de Fin</dt>
              <dd className="mt-1 text-gray-900">{mantenimiento.fechaFin}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Responsable</dt>
              <dd className="mt-1 text-gray-900">{mantenimiento.responsable}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Estado</dt>
              <dd className="mt-1">
                <Badge variant={mantenimiento.estado === "Completado" ? "default" : "secondary"}>
                  {mantenimiento.estado}
                </Badge>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Descripción</dt>
              <dd className="mt-1 text-gray-900">{mantenimiento.descripcion}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

