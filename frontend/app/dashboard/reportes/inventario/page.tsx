"use client"

import { useState, useEffect } from "react"
import jsPDF from "jspdf"
import * as XLSX from "xlsx"

interface InventoryItem {
  id: number
  name: string
  quantity: number
  department: string
  lastUpdated: string
}

export default function InventoryReport() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    // Fetch inventory items from API
    // This is a mock implementation
    setInventoryItems([
      { id: 1, name: "Laptop", quantity: 50, department: "IT", lastUpdated: "2023-06-01" },
      { id: 2, name: "Desk", quantity: 100, department: "Office", lastUpdated: "2023-05-15" },
      { id: 3, name: "Chair", quantity: 150, department: "Office", lastUpdated: "2023-05-20" },
    ])
  }, [])
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 20, 10);
  
    const columns = ["Name", "Quantity", "Department", "Last Updated"];
    const data = inventoryItems.map((item) => [
      item.name,
      item.quantity.toString(),
      item.department,
      item.lastUpdated,
    ]);
  
    let startY = 20; // Posición inicial de la tabla
    const lineHeight = 10; // Espaciado entre filas
  
    // Dibujar encabezados
    columns.forEach((col, index) => {
      doc.text(col, 20 + index * 40, startY);
    });
  
    startY += lineHeight; // Mover hacia abajo
  
    // Dibujar filas de datos
    data.forEach((row) => {
      row.forEach((text, index) => {
        doc.text(text, 20 + index * 40, startY);
      });
      startY += lineHeight;
    });
  
    doc.save("inventory-report.pdf");
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventoryItems)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory")
    XLSX.writeFile(workbook, "inventory-report.xlsx")
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Inventory Report</h1>
      <div className="mb-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Download PDF
        </button>
        <button
          onClick={generateExcel}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Excel
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.quantity}</td>
              <td className="py-2 px-4 border-b">{item.department}</td>
              <td className="py-2 px-4 border-b">{item.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

