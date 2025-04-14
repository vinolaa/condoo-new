import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/app/actions";

export default async function Navbar() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="w-full border-b px-6 py-4 flex justify-between items-center bg-background">
            <Link href="/" className="text-xl font-bold">
                Gestão Condomínio
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <form action={signOutAction}>
                        <Button variant="outline" type="submit">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sair
                        </Button>
                    </form>
                ) : (
                    <Link href="/sign-in">
                        <Button variant="outline">
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
}
