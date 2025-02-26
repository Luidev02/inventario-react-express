"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const configSchema = z.object({
  companyName: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  darkMode: z.boolean().default(false),
  notifications: z.boolean().default(true),
})

type ConfigFormValues = z.infer<typeof configSchema>

export default function ConfiguracionPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      companyName: "",
      email: "",
      darkMode: false,
      notifications: true,
    },
  })

  function onSubmit(data: ConfigFormValues) {
    setIsLoading(true)
    // Aquí iría la lógica para guardar la configuración
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configuración actualizada",
        description: "Los cambios han sido guardados exitosamente.",
      })
    }, 1000)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Mi Empresa S.A." {...field} />
                </FormControl>
                <FormDescription>Este nombre aparecerá en los reportes y documentos generados.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico de Contacto</FormLabel>
                <FormControl>
                  <Input placeholder="contacto@miempresa.com" {...field} />
                </FormControl>
                <FormDescription>Este correo se usará para notificaciones importantes del sistema.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="darkMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Modo Oscuro</FormLabel>
                  <FormDescription>Activar el modo oscuro por defecto en la interfaz.</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Notificaciones</FormLabel>
                  <FormDescription>Recibir notificaciones por correo electrónico.</FormDescription>
                </div>
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

