"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Building2, Briefcase, Package, Wrench, LifeBuoy, BarChart3 } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/departamentos", label: "Departamentos", icon: Building2 },
  { href: "/dashboard/cargos", label: "Cargos", icon: Briefcase },
  { href: "/dashboard/usuarios", label: "Usuarios", icon: Users },
  { href: "/dashboard/inventario", label: "Inventario", icon: Package },
  { href: "/dashboard/mantenimientos", label: "Mantenimientos", icon: Wrench },
  { href: "/dashboard/soporte", label: "Soporte", icon: LifeBuoy },
  { href: "/dashboard/reportes", label: "Reportes", icon: BarChart3 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-card text-card-foreground w-64 min-h-screen p-4 border-r">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  )
}

