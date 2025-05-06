'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { signInAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import React from "react";

export default function Login() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const supabase = createClient();

    const success = searchParams.get("success");
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                router.replace("/preview");
            } else {
                setLoading(false);
            }
        };

        checkUser();
    }, [supabase, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        await signInAction(formData);
    };

    if (loading) return null;

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-card border border-border"
            >
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="text-center space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Seja bem vindo
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acesse sua conta para continuar
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" placeholder="you@example.com" required />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Senha</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-muted-foreground hover:underline"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

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

                    <SubmitButton pendingText="Entrando...">Entrar</SubmitButton>

                    <p className="text-sm text-muted-foreground text-center">
                        Não tem uma conta?{" "}
                        <Link href="/sign-up" className="text-foreground underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </motion.div>
        </section>
    );
}
