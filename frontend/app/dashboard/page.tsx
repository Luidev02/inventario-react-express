import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, Wrench } from "lucide-react"

function DashboardCard({ title, value, icon: Icon, link }: { title: string; value: string; icon: any; link: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <Link href={link}>Ver detalles</Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Total Usuarios" value="1,234" icon={Users} link="/dashboard/usuarios" />
        <DashboardCard title="Total Activos" value="5,678" icon={Package} link="/dashboard/inventario" />
        <DashboardCard title="Mantenimientos Pendientes" value="42" icon={Wrench} link="/dashboard/mantenimientos" />
      </div>
    </div>
  )
}

