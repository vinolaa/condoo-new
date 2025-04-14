'use client'

import { useSearchParams } from "next/navigation";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUp() {
    const searchParams = useSearchParams();

    const success = searchParams.get("success");
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-card border border-border"
            >
                <form className="flex flex-col gap-6" action="/api/signup">
                    <div className="text-center space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Crie sua conta
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Crie sua conta para começar
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" placeholder="you@example.com" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="confirm-password">Confirmar Senha</Label>
                            <Input
                                type="password"
                                name="confirm-password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Mensagens inline */}
                    {(success || error || message) && (
                        <div className="flex flex-col gap-2 text-sm">
                            {success && (
                                <div className="text-foreground border-l-2 border-foreground px-4 py-2 rounded bg-green-100/10">
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="text-destructive-foreground border-l-2 border-destructive px-4 py-2 rounded bg-red-100/10">
                                    {error}
                                </div>
                            )}
                            {message && (
                                <div className="text-foreground border-l-2 border-muted px-4 py-2 rounded bg-muted/10">
                                    {message}
                                </div>
                            )}
                        </div>
                    )}

                    <SubmitButton pendingText="Criando...">Cadastrar</SubmitButton>

                    <p className="text-sm text-muted-foreground text-center">
                        Já tem uma conta?{" "}
                        <Link href="/sign-in" className="text-foreground underline">
                            Faça login
                        </Link>
                    </p>
                </form>
            </motion.div>
        </section>
    );
}
