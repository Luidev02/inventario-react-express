"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Department {
  id: number
  name: string
  code: string
  location: string
  status: string
  description: string
  employeeCount: number
}

export default function DepartmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [department, setDepartment] = useState<Department | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDepartment = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      setDepartment({
        id: Number(params.id),
        name: "Departamento de IT",
        code: "IT001",
        location: "Piso 3",
        status: "Activo",
        description: "Departamento encargado de la infraestructura tecnológica y soporte técnico.",
        employeeCount: 25,
      })
      setIsLoading(false)
    }

    fetchDepartment()
  }, [params.id])

  if (isLoading) return <div>Cargando...</div>
  if (!department) return <div>Departamento no encontrado</div>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{department.name}</h1>
        <div>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => router.push(`/dashboard/departamentos/${department.id}/editar`)}
          >
            Editar
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Departamento</CardTitle>
          <CardDescription>Información detallada sobre el departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-500">Código</dt>
              <dd className="mt-1 text-gray-900">{department.code}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Ubicación</dt>
              <dd className="mt-1 text-gray-900">{department.location}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Estado</dt>
              <dd className="mt-1">
                <Badge variant={department.status === "Activo" ? "default" : "secondary"}>{department.status}</Badge>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Número de Empleados</dt>
              <dd className="mt-1 text-gray-900">{department.employeeCount}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Descripción</dt>
              <dd className="mt-1 text-gray-900">{department.description}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

