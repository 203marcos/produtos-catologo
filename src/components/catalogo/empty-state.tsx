"use client";

import { PackageOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  hasFilters: boolean;
  onAddProduct: () => void;
}

export function EmptyState({ hasFilters, onAddProduct }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <PackageOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {hasFilters
          ? "Nenhum produto encontrado"
          : "Nenhum produto cadastrado"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center max-w-sm">
        {hasFilters
          ? "Tente ajustar os filtros ou termos de busca para encontrar o que procura."
          : "Comece adicionando seu primeiro produto ao catalogo."}
      </p>
      {!hasFilters && (
        <Button className="mt-6" onClick={onAddProduct}>
          <Plus className="mr-1.5 h-4 w-4" />
          Adicionar Produto
        </Button>
      )}
    </div>
  );
}
