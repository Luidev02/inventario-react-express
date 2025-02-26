"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Ticket {
  id: number
  titulo: string
  activo: string
  fechaCreacion: string
  estado: string
}

export default function Soporte() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Aquí iría la llamada real a la API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
        setTickets([
          {
            id: 1,
            titulo: "Problema con laptop",
            activo: "Laptop Dell XPS",
            fechaCreacion: "2023-06-01",
            estado: "Abierto",
          },
          {
            id: 2,
            titulo: "Impresora no funciona",
            activo: "Impresora HP",
            fechaCreacion: "2023-06-05",
            estado: "En progreso",
          },
          {
            id: 3,
            titulo: "Actualización de software",
            activo: "Proyector Epson",
            fechaCreacion: "2023-06-10",
            estado: "Cerrado",
          },
        ])
      } catch (err) {
        console.error("Error fetching tickets:", err)
        setError("Error al cargar los tickets de soporte. Por favor, inténtelo de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Tickets de Soporte</h1>
        <Link
          href="/dashboard/soporte/nuevo"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Ticket
        </Link>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Título</th>
              <th className="py-3 px-6 text-left">Activo</th>
              <th className="py-3 px-6 text-left">Fecha de Creación</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{ticket.titulo}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{ticket.activo}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span>{ticket.fechaCreacion}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      ticket.estado === "Abierto"
                        ? "bg-red-200 text-red-600"
                        : ticket.estado === "En progreso"
                          ? "bg-yellow-200 text-yellow-600"
                          : "bg-green-200 text-green-600"
                    }`}
                  >
                    {ticket.estado}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <Link href={`/dashboard/soporte/${ticket.id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Ver
                  </Link>
                  <Link href={`/dashboard/soporte/${ticket.id}/edit`} className="text-yellow-500 hover:text-yellow-700">
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

