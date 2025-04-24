"use client"

import { Input } from "@/components/ui/input"

type SearchBarProps = {
    onSearchAction: (searchTerm: string) => void;
}

export function AmbienteSearchBar({ onSearchAction }: SearchBarProps) {
    return (
        <div className="w-full">
            <Input
                placeholder="Pesquisar por nome do ambiente..."
                onChange={(e) => onSearchAction(e.target.value)}
                className="w-full"
            />
        </div>
    )
}
