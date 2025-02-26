"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface InventarioItem {
  id: number
  nombre: string
  codigo: string
  departamento: string
  estado: string
}

export default function Inventario() {
  const [inventario, setInventario] = useState<InventarioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInventario = async () => {
      try {
        // Aquí iría la llamada real a la API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
        setInventario([
          { id: 1, nombre: "Laptop Dell XPS", codigo: "LAP001", departamento: "IT", estado: "Activo" },
          { id: 2, nombre: "Impresora HP", codigo: "IMP001", departamento: "Administración", estado: "Activo" },
          { id: 3, nombre: "Proyector Epson", codigo: "PRO001", departamento: "Ventas", estado: "En mantenimiento" },
        ])
      } catch (err) {
        console.error("Error fetching inventario:", err)
        setError("Error al cargar el inventario. Por favor, inténtelo de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInventario()
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Inventario</h1>
        <Link
          href="/dashboard/inventario/nuevo"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Activo
        </Link>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Código</th>
              <th className="py-3 px-6 text-left">Departamento</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {inventario.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{item.nombre}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{item.codigo}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{item.departamento}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      item.estado === "Activo" ? "bg-green-200 text-green-600" : "bg-yellow-200 text-yellow-600"
                    }`}
                  >
                    {item.estado}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <Link href={`/dashboard/inventario/${item.id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Ver
                  </Link>
                  <Link
                    href={`/dashboard/inventario/${item.id}/edit`}
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

