"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const cargoSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  codigo: z.string().min(2, {
    message: "El código debe tener al menos 2 caracteres.",
  }),
  descripcion: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  departamento: z.string().min(2, {
    message: "El departamento debe tener al menos 2 caracteres.",
  }),
  salarioBase: z.number().min(0, {
    message: "El salario base no puede ser negativo.",
  }),
  estado: z.enum(["Activo", "Inactivo"]),
})

type CargoFormValues = z.infer<typeof cargoSchema>

export default function EditCargoPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const form = useForm<CargoFormValues>({
    resolver: zodResolver(cargoSchema),
    defaultValues: {
      nombre: "",
      codigo: "",
      descripcion: "",
      departamento: "",
      salarioBase: 0,
      estado: "Activo",
    },
  })

  useEffect(() => {
    const fetchCargo = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      form.reset({
        nombre: "Desarrollador Senior",
        codigo: "DEV001",
        descripcion: "Responsable del desarrollo y mantenimiento de aplicaciones críticas.",
        departamento: "Tecnología",
        salarioBase: 75000,
        estado: "Activo",
      })
      setIsLoading(false)
    }

    fetchCargo()
  }, [form])

  async function onSubmit(data: CargoFormValues) {
    setIsLoading(true)
    // Aquí iría la lógica para actualizar el cargo
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una actualización
    setIsLoading(false)
    toast({
      title: "Cargo actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    })
    router.push(`/dashboard/cargos/${params.id}`)
  }

  if (isLoading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Cargo</h1>
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
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea {...field} />
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
            name="salarioBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salario Base</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
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

