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

const mantenimientoSchema = z.object({
  activo: z.string().min(2, {
    message: "El activo debe tener al menos 2 caracteres.",
  }),
  tipoMantenimiento: z.string().min(2, {
    message: "El tipo de mantenimiento debe tener al menos 2 caracteres.",
  }),
  fechaInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe tener el formato YYYY-MM-DD.",
  }),
  fechaFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe tener el formato YYYY-MM-DD.",
  }),
  responsable: z.string().min(2, {
    message: "El responsable debe tener al menos 2 caracteres.",
  }),
  descripcion: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  estado: z.enum(["Pendiente", "En progreso", "Completado"]),
})

type MantenimientoFormValues = z.infer<typeof mantenimientoSchema>

export default function EditMantenimientoPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const form = useForm<MantenimientoFormValues>({
    resolver: zodResolver(mantenimientoSchema),
    defaultValues: {
      activo: "",
      tipoMantenimiento: "",
      fechaInicio: "",
      fechaFin: "",
      responsable: "",
      descripcion: "",
      estado: "Pendiente",
    },
  })

  useEffect(() => {
    const fetchMantenimiento = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      form.reset({
        activo: "Laptop Dell XPS",
        tipoMantenimiento: "Preventivo",
        fechaInicio: "2023-06-01",
        fechaFin: "2023-06-03",
        responsable: "Juan Pérez",
        descripcion: "Limpieza y actualización de software",
        estado: "Completado",
      })
      setIsLoading(false)
    }

    fetchMantenimiento()
  }, [form])

  async function onSubmit(data: MantenimientoFormValues) {
    setIsLoading(true)
    // Aquí iría la lógica para actualizar el mantenimiento
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una actualización
    setIsLoading(false)
    toast({
      title: "Mantenimiento actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    })
    router.push(`/dashboard/mantenimientos/${params.id}`)
  }

  if (isLoading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Mantenimiento</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipoMantenimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Mantenimiento</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaInicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Inicio</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Fin</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
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
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
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

