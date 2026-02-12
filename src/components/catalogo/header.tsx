"use client";

import { useTheme } from "next-themes";
import { Moon, Plus, Sun, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CatalogHeaderProps {
  totalProdutos: number;
  onNewProduct: () => void;
}

export function CatalogHeader({
  totalProdutos,
  onNewProduct,
}: CatalogHeaderProps) {
  // Hook do next-themes - setTheme muda entre light/dark
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Package className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Catalogo de Produtos
          </h1>
          <p className="text-sm text-muted-foreground">
            {totalProdutos === 0
              ? "Nenhum produto cadastrado"
              : `${totalProdutos} produto${totalProdutos !== 1 ? "s" : ""} cadastrado${totalProdutos !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-transparent"
          aria-label="Alternar tema"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button onClick={onNewProduct}>
          <Plus className="mr-1.5 h-4 w-4" />
          Novo Produto
        </Button>
      </div>
    </header>
  );
}
