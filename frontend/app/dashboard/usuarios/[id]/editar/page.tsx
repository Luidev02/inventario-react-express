"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const usuarioSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Debe ser un email válido.",
  }),
  cargo: z.string().min(2, {
    message: "El cargo debe tener al menos 2 caracteres.",
  }),
  departamento: z.string().min(2, {
    message: "El departamento debe tener al menos 2 caracteres.",
  }),
  fechaContratacion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe tener el formato YYYY-MM-DD.",
  }),
  estado: z.enum(["Activo", "Inactivo"]),
})

type UsuarioFormValues = z.infer<typeof usuarioSchema>

export default function EditUsuarioPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nombre: "",
      email: "",
      cargo: "",
      departamento: "",
      fechaContratacion: "",
      estado: "Activo",
    },
  })

  useEffect(() => {
    const fetchUsuario = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      form.reset({
        nombre: "Ana García",
        email: "ana.garcia@empresa.com",
        cargo: "Desarrollador Senior",
        departamento: "Tecnología",
        fechaContratacion: "2022-03-15",
        estado: "Activo",
      })
      setIsLoading(false)
    }

    fetchUsuario()
  }, [form])

  async function onSubmit(data: UsuarioFormValues) {
    setIsLoading(true)
    // Aquí iría la lógica para actualizar el usuario
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una actualización
    setIsLoading(false)
    toast({
      title: "Usuario actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    })
    router.push(`/dashboard/usuarios/${params.id}`)
  }

  if (isLoading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Usuario</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cargo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaContratacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Contratación</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

