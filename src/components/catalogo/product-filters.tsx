"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type SortOption =
  | "recentes"
  | "nome-asc"
  | "nome-desc"
  | "preco-asc"
  | "preco-desc";

export type StatusFilter = "todos" | "ativos" | "inativos";

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoriaFilter: string;
  onCategoriaChange: (value: string) => void;
  categorias: string[];
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  categoriaFilter,
  onCategoriaChange,
  categorias,
  sortBy,
  onSortChange,
  statusFilter,
  onStatusChange,
}: ProductFiltersProps) {
  // Verifica se algum filtro foi ativado
  const hasActiveFilters =
    searchTerm !== "" ||
    categoriaFilter !== "todas" ||
    statusFilter !== "todos" ||
    sortBy !== "recentes";

  // Limpa todos os filtros de uma vez
  function clearFilters() {
    onSearchChange("");
    onCategoriaChange("todas");
    onStatusChange("todos");
    onSortChange("recentes");
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={categoriaFilter} onValueChange={onCategoriaChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas as categorias</SelectItem>
          {categorias.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={statusFilter}
        onValueChange={(v) => onStatusChange(v as StatusFilter)}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="ativos">Ativos</SelectItem>
          <SelectItem value="inativos">Inativos</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(v) => onSortChange(v as SortOption)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recentes">Mais Recentes</SelectItem>
          <SelectItem value="nome-asc">Nome A-Z</SelectItem>
          <SelectItem value="nome-desc">Nome Z-A</SelectItem>
          <SelectItem value="preco-asc">Menor Preco</SelectItem>
          <SelectItem value="preco-desc">Maior Preco</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground"
        >
          <X className="mr-1 h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}
