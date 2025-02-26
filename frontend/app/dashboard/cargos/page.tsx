"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Cargo {
  id: number
  nombre: string
  codigo: string
  estado: string
}

export default function Cargos() {
  const [cargos, setCargos] = useState<Cargo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        // Aquí iría la llamada real a la API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
        setCargos([
          { id: 1, nombre: "Gerente", codigo: "GER001", estado: "Activo" },
          { id: 2, nombre: "Analista", codigo: "ANA001", estado: "Activo" },
          { id: 3, nombre: "Asistente", codigo: "ASI001", estado: "Inactivo" },
        ])
      } catch (err) {
        console.error("Error fetching cargos:", err)
        setError("Error al cargar los cargos. Por favor, inténtelo de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCargos()
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Cargos</h1>
        <Link
          href="/dashboard/cargos/nuevo"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Cargo
        </Link>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Código</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {cargos.map((cargo) => (
              <tr key={cargo.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{cargo.nombre}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{cargo.codigo}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      cargo.estado === "Activo" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                    }`}
                  >
                    {cargo.estado}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <Link href={`/dashboard/cargos/${cargo.id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Ver
                  </Link>
                  <Link href={`/dashboard/cargos/${cargo.id}/edit`} className="text-yellow-500 hover:text-yellow-700">
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

