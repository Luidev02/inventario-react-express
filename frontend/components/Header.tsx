"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import axios from "axios"
import { useRouter } from "next/navigation"
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
  const router = useRouter()

const logout = async() =>{
  const token = localStorage.getItem('Chococrispy');
  await axios.get(`${URL_API}/api/auth/logout?token=${token}`).then(response => {
    localStorage.removeItem('User');
    localStorage.removeItem('Chococrispy');
    router.push('/login');
  }).catch(error => {
    localStorage.removeItem('User');
    localStorage.removeItem('Chococrispy');
    router.push('/login');
  })
}

  return (
    <header className="bg-background border-b">
      <div className="flex justify-between items-center h-16 px-4">
        <Link href="/dashboard" className="text-xl font-bold">
          Sistema de Inventario
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@usuario" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Usuario</p>
                  <p className="text-xs leading-none text-muted-foreground">usuario@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button onClick={()=>logout()}>Cerrar sesión</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

