'use client'

import { motion } from "framer-motion"
import { Banknote, CalendarCheck2, Settings } from "lucide-react"

const features = [
    {
        icon: <Banknote className="w-6 h-6 text-primary" />,
        title: "Gestão Financeira",
        description: "Acompanhe receitas, despesas e inadimplências com total controle e transparência."
    },
    {
        icon: <CalendarCheck2 className="w-6 h-6 text-primary" />,
        title: "Reserva de Ambientes",
        description: "Moradores reservam áreas comuns com poucos cliques, sem confusão no cronograma."
    },
    {
        icon: <Settings className="w-6 h-6 text-primary" />,
        title: "Fácil de Usar",
        description: "Interface intuitiva para síndicos e moradores. Nada de sistemas complicados."
    }
]

export default function FeaturesSection() {
    return (
        <section className="w-full py-24 bg-muted/50">
            <div className="container px-4 md:px-6 text-center space-y-10">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-foreground"
                >
                    Soluções pensadas para síndicos e moradores
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-background p-6 rounded-2xl shadow-md border"
                        >
                            <div className="flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
