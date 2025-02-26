"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileSchema = z
  .object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
      message: "Por favor ingrese un correo electrónico válido.",
    }),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
      })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    },
  )

type ProfileFormValues = z.infer<typeof profileSchema>

export default function PerfilPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Juan Pérez",
      email: "juan@ejemplo.com",
    },
  })

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    // Aquí iría la lógica para actualizar el perfil
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil actualizado",
        description: "Los cambios han sido guardados exitosamente.",
      })
    }, 1000)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/avatars/01.png" alt="@usuario" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">Juan Pérez</h2>
          <p className="text-muted-foreground">Administrador</p>
        </div>
      </div>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>Deje en blanco si no desea cambiar la contraseña.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
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

