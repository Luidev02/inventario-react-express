"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const departmentSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  code: z.string().min(2, {
    message: "El código debe tener al menos 2 caracteres.",
  }),
  location: z.string().min(2, {
    message: "La ubicación debe tener al menos 2 caracteres.",
  }),
  status: z.enum(["Activo", "Inactivo"]),
  description: z.string().optional(),
})

type DepartmentFormValues = z.infer<typeof departmentSchema>

export default function EditDepartmentPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      code: "",
      location: "",
      status: "Activo",
      description: "",
    },
  })

  useEffect(() => {
    const fetchDepartment = async () => {
      // Aquí iría la llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una carga
      form.reset({
        name: "Departamento de IT",
        code: "IT001",
        location: "Piso 3",
        status: "Activo",
        description: "Departamento encargado de la infraestructura tecnológica y soporte técnico.",
      })
      setIsLoading(false)
    }

    fetchDepartment()
  }, [form])

  async function onSubmit(data: DepartmentFormValues) {
    setIsLoading(true)
    // Aquí iría la lógica para actualizar el departamento
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulamos una actualización
    setIsLoading(false)
    toast({
      title: "Departamento actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    })
    router.push(`/dashboard/departamentos/${params.id}`)
  }

  if (isLoading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Departamento</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
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
            name="code"
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
            name="location"
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
            name="status"
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>Proporcione una breve descripción del departamento.</FormDescription>
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

