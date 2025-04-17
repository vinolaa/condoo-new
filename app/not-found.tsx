export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center">
            <div className="max-w-md space-y-4">
                <h1 className="text-4xl font-bold">Página não encontrada</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    A página que você está procurando não existe ou foi removida.
                </p>
                <a
                    href="/"
                    className="inline-block mt-4 px-6 py-2 text-white bg-primary rounded-full hover:bg-primary/90 transition"
                >
                    Voltar para o início
                </a>
            </div>
        </div>
    );
}
