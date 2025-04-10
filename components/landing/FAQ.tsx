'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqSection() {
    return (
        <section className="w-full py-24 bg-background text-foreground">
            <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">Dúvidas frequentes</h2>
                <Accordion type="single" collapsible className="text-left space-y-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Preciso instalar algo para usar a plataforma?</AccordionTrigger>
                        <AccordionContent>
                            Não! Nossa plataforma é 100% online. Basta acessar pelo navegador.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Posso usar grátis?</AccordionTrigger>
                        <AccordionContent>
                            Sim, oferecemos um plano gratuito para você experimentar todas as funcionalidades básicas.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>O sistema é seguro?</AccordionTrigger>
                        <AccordionContent>
                            Totalmente. Utilizamos criptografia de ponta e boas práticas de segurança em todos os dados.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}
