import Link from "next/link"

export default function Reportes() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Reportes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/dashboard/reportes/inventario"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Reporte de Inventario</h2>
          <p className="text-gray-600">Ver detalles del inventario actual y su estado.</p>
        </Link>
        <Link
          href="/dashboard/reportes/usuarios"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Reporte de Usuarios</h2>
          <p className="text-gray-600">Analizar métricas y estadísticas de usuarios.</p>
        </Link>
        <Link
          href="/dashboard/reportes/mantenimientos"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Reporte de Mantenimientos</h2>
          <p className="text-gray-600">Ver estadísticas de mantenimientos realizados.</p>
        </Link>
      </div>
    </div>
  )
}

