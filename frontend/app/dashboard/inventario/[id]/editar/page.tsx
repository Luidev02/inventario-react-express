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

const inventarioItemSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  codigo: z.string().min(2, {
    message: "El código debe tener al menos 2 caracteres.",
  }),
  categoria: z.string().min(2, {
    message: "La categoría debe tener al menos 2 caracteres.",
  }),
  ubicacion: z.string().min(2, {
    message: "La ubicación debe tener al menos 2 caracteres.",
  }),
  cantidad: z.number().int().positive(),
  valorUnitario: z.number().positive(),
  fechaAdquisicion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe tener el formato YYYY-MM-DD.",
  }),
  estado: z.enum(["Activo", "Inactivo", "En mantenimiento"]),
})

type InventarioItemFormValues = z.infer<typeof inventarioItemSchema>

export default function EditInventarioItemPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const form = useForm<InventarioItemFormValues>({
    resolver: zodResolver(inventarioItemSchema),
    defaultValues: {
      nombre: "",
      codigo: "",
      categoria: "",
      ubicacion: "",
      cantidad: 0,
      valorUnitario: 0,
      fechaAdquisicion: "",
      estado: "Activo",
    },
  })

  useEffect(() => {
    const fetchInventarioItem = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      form.reset({
        nombre: "Laptop Dell XPS",
        codigo: "LAP001",
        categoria: "Equipos de Cómputo",
        ubicacion: "Oficina Principal",
        cantidad: 5,
        valorUnitario: 1200,
        fechaAdquisicion: "2023-01-15",
        estado: "Activo",
      })
      setIsLoading(false)
    }

    fetchInventarioItem()
  }, [form])

  async function onSubmit(data: InventarioItemFormValues) {
    setIsLoading(true)
    // Aquí iría la lógica para actualizar el item de inventario
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una actualización
    setIsLoading(false)
    toast({
      title: "Item de inventario actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    })
    router.push(`/dashboard/inventario/${params.id}`)
  }

  if (isLoading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Item de Inventario</h1>
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
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ubicacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cantidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="valorUnitario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Unitario</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaAdquisicion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Adquisición</FormLabel>
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
                    <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
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

