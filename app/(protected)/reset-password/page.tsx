"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage("As senhas não coincidem.");
            return;
        }

        if (password.length < 6) {
            setMessage("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        setLoading(true);
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Senha redefinida com sucesso. Redirecionando...");
            setTimeout(() => {
                router.push("/sign-in");
            }, 2000);
        }

        setLoading(false);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleReset}
                className="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl border shadow-lg bg-background text-foreground"
            >
                <h1 className="text-2xl font-semibold">Redefinir Senha</h1>

                {message && (
                    <div className="text-sm text-center text-red-500">{message}</div>
                )}

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Nova Senha</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Sua nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme sua nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Redefinindo..." : "Redefinir Senha"}
                </Button>
            </form>
        </div>
    );
}
