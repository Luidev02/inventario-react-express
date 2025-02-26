import { NextResponse } from "next/server"

const departments = [
  { id: 1, name: "IT", code: "IT001", location: "Floor 1", status: "Active" },
  { id: 2, name: "HR", code: "HR001", location: "Floor 2", status: "Active" },
  { id: 3, name: "Finance", code: "FIN001", location: "Floor 3", status: "Inactive" },
]

export async function GET() {
  return NextResponse.json(departments)
}

export async function POST(request: Request) {
  const newDepartment = await request.json()
  newDepartment.id = departments.length + 1
  departments.push(newDepartment)
  return NextResponse.json(newDepartment, { status: 201 })
}

