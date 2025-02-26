"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Usuario {
  id: number
  nombre: string
  email: string
  cargo: string
  departamento: string
  fechaContratacion: string
  estado: string
}

export default function UsuarioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsuario = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      setUsuario({
        id: Number(params.id),
        nombre: "Ana García",
        email: "ana.garcia@empresa.com",
        cargo: "Desarrollador Senior",
        departamento: "Tecnología",
        fechaContratacion: "2022-03-15",
        estado: "Activo",
      })
      setIsLoading(false)
    }

    fetchUsuario()
  }, [params.id])

  if (isLoading) return <div>Cargando...</div>
  if (!usuario) return <div>Usuario no encontrado</div>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${usuario.nombre}`}
              alt={usuario.nombre}
            />
            <AvatarFallback>
              {usuario.nombre
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold">{usuario.nombre}</h1>
        </div>
        <div>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => router.push(`/dashboard/usuarios/${usuario.id}/editar`)}
          >
            Editar
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Usuario</CardTitle>
          <CardDescription>Información detallada sobre el usuario</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-gray-900">{usuario.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Cargo</dt>
              <dd className="mt-1 text-gray-900">{usuario.cargo}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Departamento</dt>
              <dd className="mt-1 text-gray-900">{usuario.departamento}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Fecha de Contratación</dt>
              <dd className="mt-1 text-gray-900">{usuario.fechaContratacion}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Estado</dt>
              <dd className="mt-1">
                <Badge variant={usuario.estado === "Activo" ? "default" : "secondary"}>{usuario.estado}</Badge>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

