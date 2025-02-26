import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Documentación API | Sistema de Gestión de Inventario",
  description: "Documentación completa de la API del Sistema de Gestión de Inventario",
}

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Documentación de la API</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Bienvenido a la documentación de la API del Sistema de Gestión de Inventario. Aquí encontrará toda la
        información necesaria para integrar y utilizar nuestra API.
      </p>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visión General</TabsTrigger>
          <TabsTrigger value="authentication">Autenticación</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Ejemplos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Visión General de la API</CardTitle>
              <CardDescription>
                Nuestra API RESTful permite acceder y manipular datos del sistema de inventario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Características principales:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Autenticación basada en tokens JWT</li>
                <li>Endpoints para todas las entidades principales (departamentos, usuarios, inventario, etc.)</li>
                <li>Soporte para operaciones CRUD en todos los recursos</li>
                <li>Respuestas en formato JSON</li>
                <li>Manejo de errores consistente</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle>Autenticación</CardTitle>
              <CardDescription>
                Todas las solicitudes a la API deben ser autenticadas usando un token JWT.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Para obtener un token, haga una solicitud POST al endpoint de login:</p>
              <pre className="bg-muted p-4 rounded-md">
                <code>
                  POST /api/auth/login Content-Type: application/json
                  {`{
                    "email": "usuario@ejemplo.com",
                    "password": "contraseña_segura"
                  }`}
                </code>
              </pre>
              <p className="mt-4">
                Incluya el token en el encabezado Authorization de todas las solicitudes subsiguientes:
              </p>
              <pre className="bg-muted p-4 rounded-md">
                <code>Authorization: Bearer &lt;su_token_jwt&gt;</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>Endpoints Principales</CardTitle>
              <CardDescription>Lista de los endpoints más utilizados en la API.</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Departamentos</h3>
              <ul className="list-disc list-inside mb-4">
                <li>GET /api/departments</li>
                <li>POST /api/departments</li>
                <li>GET /api/departments/{"{id}"}</li>
                <li>PUT /api/departments/{"{id}"}</li>
                <li>DELETE /api/departments/{"{id}"}</li>
              </ul>
              <h3 className="text-lg font-semibold mb-2">Usuarios</h3>
              <ul className="list-disc list-inside mb-4">
                <li>GET /api/users</li>
                <li>POST /api/users</li>
                <li>GET /api/users/{"{id}"}</li>
                <li>PUT /api/users/{"{id}"}</li>
                <li>DELETE /api/users/{"{id}"}</li>
              </ul>
              <h3 className="text-lg font-semibold mb-2">Inventario</h3>
              <ul className="list-disc list-inside">
                <li>GET /api/inventory</li>
                <li>POST /api/inventory</li>
                <li>GET /api/inventory/{"{id}"}</li>
                <li>PUT /api/inventory/{"{id}"}</li>
                <li>DELETE /api/inventory/{"{id}"}</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Ejemplos de Uso</CardTitle>
              <CardDescription>Ejemplos prácticos de cómo utilizar la API.</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Obtener todos los departamentos</h3>
              <pre className="bg-muted p-4 rounded-md mb-4">
                <code>GET /api/departments Authorization: Bearer &lt;su_token_jwt&gt;</code>
              </pre>
              <h3 className="text-lg font-semibold mb-2">Crear un nuevo usuario</h3>
              <pre className="bg-muted p-4 rounded-md">
                <code>
                  POST /api/users Authorization: Bearer &lt;su_token_jwt&gt; Content-Type: application/json
                  {`{
                    "name": "Ana García",
                    "email": "ana@ejemplo.com",
                    "role": "User",
                    "department_id": 2
                  }`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">¿Necesita más ayuda?</h2>
        <p className="mb-4">
          Si necesita información adicional o tiene preguntas específicas, no dude en contactar a nuestro equipo de
          soporte.
        </p>
        <Button asChild>
          <Link href="/contact">Contactar Soporte</Link>
        </Button>
      </div>
    </div>
  )
}

