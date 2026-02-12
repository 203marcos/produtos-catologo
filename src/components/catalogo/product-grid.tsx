"use client";

import type { Produto } from "@/lib/types";
import { ProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  produtos: Produto[];
  loading: boolean;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-10" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  produtos,
  loading,
  onEdit,
  onDelete,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {produtos.map((produto) => (
        <ProductCard
          key={produto.id}
          produto={produto}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
