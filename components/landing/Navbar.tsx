'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export default function Navbar() {
  return (
    <header className="w-full border-b px-6 py-4 flex justify-between items-center bg-background">
      <Link href="/" className="text-xl font-bold">Gestão Condomínio</Link>

      <div className="flex items-center gap-4">
        <Button variant="outline">
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>
      </div>
    </header>
  )
}
