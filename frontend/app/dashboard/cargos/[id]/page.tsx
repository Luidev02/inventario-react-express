"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Cargo {
  id: number
  nombre: string
  codigo: string
  descripcion: string
  departamento: string
  salarioBase: number
  estado: string
}

export default function CargoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [cargo, setCargo] = useState<Cargo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCargo = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      setCargo({
        id: Number(params.id),
        nombre: "Desarrollador Senior",
        codigo: "DEV001",
        descripcion: "Responsable del desarrollo y mantenimiento de aplicaciones críticas.",
        departamento: "Tecnología",
        salarioBase: 75000,
        estado: "Activo",
      })
      setIsLoading(false)
    }

    fetchCargo()
  }, [params.id])

  if (isLoading) return <div>Cargando...</div>
  if (!cargo) return <div>Cargo no encontrado</div>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{cargo.nombre}</h1>
        <div>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => router.push(`/dashboard/cargos/${cargo.id}/editar`)}
          >
            Editar
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Cargo</CardTitle>
          <CardDescription>Información detallada sobre el cargo</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-500">Código</dt>
              <dd className="mt-1 text-gray-900">{cargo.codigo}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Departamento</dt>
              <dd className="mt-1 text-gray-900">{cargo.departamento}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Salario Base</dt>
              <dd className="mt-1 text-gray-900">${cargo.salarioBase.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Estado</dt>
              <dd className="mt-1">
                <Badge variant={cargo.estado === "Activo" ? "default" : "secondary"}>{cargo.estado}</Badge>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Descripción</dt>
              <dd className="mt-1 text-gray-900">{cargo.descripcion}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

