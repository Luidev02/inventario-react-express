"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Mantenimiento {
  id: number
  activo: string
  fechaInicio: string
  fechaFin: string
  estado: string
}

export default function Mantenimientos() {
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMantenimientos = async () => {
      try {
        // Aquí iría la llamada real a la API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
        setMantenimientos([
          { id: 1, activo: "Laptop Dell XPS", fechaInicio: "2023-06-01", fechaFin: "2023-06-03", estado: "Completado" },
          { id: 2, activo: "Impresora HP", fechaInicio: "2023-06-05", fechaFin: "2023-06-07", estado: "En progreso" },
          { id: 3, activo: "Proyector Epson", fechaInicio: "2023-06-10", fechaFin: "2023-06-12", estado: "Pendiente" },
        ])
      } catch (err) {
        console.error("Error fetching mantenimientos:", err)
        setError("Error al cargar los mantenimientos. Por favor, inténtelo de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMantenimientos()
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Mantenimientos</h1>
        <Link
          href="/dashboard/mantenimientos/nuevo"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrar Mantenimiento
        </Link>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Activo</th>
              <th className="py-3 px-6 text-left">Fecha Inicio</th>
              <th className="py-3 px-6 text-left">Fecha Fin</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {mantenimientos.map((mantenimiento) => (
              <tr key={mantenimiento.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{mantenimiento.activo}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{mantenimiento.fechaInicio}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{mantenimiento.fechaFin}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      mantenimiento.estado === "Completado"
                        ? "bg-green-200 text-green-600"
                        : mantenimiento.estado === "En progreso"
                          ? "bg-yellow-200 text-yellow-600"
                          : "bg-red-200 text-red-600"
                    }`}
                  >
                    {mantenimiento.estado}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <Link
                    href={`/dashboard/mantenimientos/${mantenimiento.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Ver
                  </Link>
                  <Link
                    href={`/dashboard/mantenimientos/${mantenimiento.id}/edit`}
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

