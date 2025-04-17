'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="w-full py-24 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6 text-center space-y-6">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold"
                >
                    Pronto para transformar a gestão do seu condomínio?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto"
                >
                    Comece gratuitamente e veja como é fácil administrar com eficiência.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <Link href="/sign-up">
                        <Button size="lg" className="text-black bg-white hover:bg-white">
                            Criar conta agora
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
