'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
      <section className="w-full py-24 md:py-32 lg:py-40 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Gestão de condomínios de forma simples e moderna
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Controle financeiro e reservas de ambientes em um só lugar. Tenha mais organização, menos dor de cabeça.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">
                Comece gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
  )
}
