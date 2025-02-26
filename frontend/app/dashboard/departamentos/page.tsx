"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Department {
  id: number
  name: string
  code: string
  location: string
  status: string
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Aquí iría la llamada real a la API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
        setDepartments([
          { id: 1, name: "IT", code: "IT001", location: "Floor 1", status: "Active" },
          { id: 2, name: "HR", code: "HR001", location: "Floor 2", status: "Active" },
          { id: 3, name: "Finance", code: "FIN001", location: "Floor 3", status: "Inactive" },
        ])
      } catch (err) {
        console.error("Error fetching departments:", err)
        setError("Error al cargar los departamentos. Por favor, inténtelo de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div className="text-destructive">{error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Departamentos</h1>
        <Button asChild>
          <Link href="/dashboard/departamentos/nuevo">Agregar Departamento</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell className="font-medium">{dept.name}</TableCell>
              <TableCell>{dept.code}</TableCell>
              <TableCell>{dept.location}</TableCell>
              <TableCell>
                <Badge variant={dept.status === "Active" ? "default" : "secondary"}>{dept.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" asChild className="mr-2">
                  <Link href={`/dashboard/departamentos/${dept.id}`}>Ver</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href={`/dashboard/departamentos/${dept.id}/edit`}>Editar</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

