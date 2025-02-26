"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Usuario {
  id: number
  nombre: string
  email: string
  cargo: string
  estado: string
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Aquí iría la llamada real a la API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
        setUsuarios([
          { id: 1, nombre: "Juan Pérez", email: "juan@example.com", cargo: "Gerente", estado: "Activo" },
          { id: 2, nombre: "Ana García", email: "ana@example.com", cargo: "Analista", estado: "Activo" },
          { id: 3, nombre: "Carlos López", email: "carlos@example.com", cargo: "Asistente", estado: "Inactivo" },
        ])
      } catch (err) {
        console.error("Error fetching usuarios:", err)
        setError("Error al cargar los usuarios. Por favor, inténtelo de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <Link
          href="/dashboard/usuarios/nuevo"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Usuario
        </Link>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Cargo</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{usuario.nombre}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{usuario.email}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{usuario.cargo}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      usuario.estado === "Activo" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                    }`}
                  >
                    {usuario.estado}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <Link href={`/dashboard/usuarios/${usuario.id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Ver
                  </Link>
                  <Link
                    href={`/dashboard/usuarios/${usuario.id}/edit`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

