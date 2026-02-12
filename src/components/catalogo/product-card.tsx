"use client";

import { Package, Pencil, Trash2 } from "lucide-react";
import type { Produto } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Formata preço pra real (R$ 10,00)
const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

function StockIndicator({ estoque }: { estoque: number; }) {
  if (estoque === 0) {
    return (
      <span className="text-xs font-medium text-red-600 dark:text-red-400">
        Sem estoque
      </span>
    );
  }
  if (estoque < 10) {
    return (
      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
        {estoque} em estoque
      </span>
    );
  }
  return (
    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
      {estoque} em estoque
    </span>
  );
}

interface ProductCardProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

export function ProductCard({ produto, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-200 hover:shadow-lg border-border/60",
        !produto.ativo && "opacity-60"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {produto.imagemUrl ? (
          <img
            src={produto.imagemUrl || "/placeholder.svg"}
            alt={produto.nome}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
        {!produto.ativo && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
          >
            Inativo
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-sm"
        >
          {produto.categoria}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground leading-tight line-clamp-1 text-balance">
            {produto.nome}
          </h3>
          {produto.descricao && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {produto.descricao}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(produto.preco)}
          </span>
          <StockIndicator estoque={produto.estoque} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={() => onEdit(produto)}
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50 bg-transparent"
            onClick={() => onDelete(produto)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
