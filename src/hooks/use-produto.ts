"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Produto, CreateProdutoDto, UpdateProdutoDto } from "@/lib/types";
import type { ProdutoFormValues } from "@/lib/schemas";
import type { SortOption, StatusFilter } from "@/components/catalogo/product-filters";
import * as api from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todas");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [sortBy, setSortBy] = useState<SortOption>("recentes");

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProdutos();
      setProdutos(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar produtos";
      setError(message);
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategorias = useCallback(async () => {
    try {
      const data = await api.getCategorias();
      setCategorias(data);
    } catch {
      // Silently fail - categories are a convenience feature
    }
  }, []);

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, [fetchProdutos, fetchCategorias]);

  const handleCreate = useCallback(
    async (values: ProdutoFormValues) => {
      const dto: CreateProdutoDto = {
        nome: values.nome,
        descricao: values.descricao || undefined,
        preco: values.preco,
        estoque: values.estoque,
        categoria: values.categoria,
        imagemUrl: values.imagemUrl || undefined,
      };
      await api.createProduto(dto);
      toast({ title: "Produto cadastrado com sucesso!" });
      await fetchProdutos();
      await fetchCategorias();
    },
    [fetchProdutos, fetchCategorias]
  );

  const handleUpdate = useCallback(
    async (id: string, values: ProdutoFormValues) => {
      const dto: UpdateProdutoDto = {
        nome: values.nome,
        descricao: values.descricao || undefined,
        preco: values.preco,
        estoque: values.estoque,
        categoria: values.categoria,
        imagemUrl: values.imagemUrl || undefined,
        ativo: values.ativo,
      };
      await api.updateProduto(id, dto);
      toast({ title: "Produto atualizado com sucesso!" });
      await fetchProdutos();
      await fetchCategorias();
    },
    [fetchProdutos, fetchCategorias]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await api.deleteProduto(id);
      toast({ title: "Produto excluido com sucesso!" });
      await fetchProdutos();
      await fetchCategorias();
    },
    [fetchProdutos, fetchCategorias]
  );

  const hasActiveFilters =
    searchTerm !== "" ||
    categoriaFilter !== "todas" ||
    statusFilter !== "todos" ||
    sortBy !== "recentes";

  const filteredProdutos = useMemo(() => {
    let result = [...produtos];

    // Busca por nome
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.nome.toLowerCase().includes(term));
    }

    // Filtro por categoria
    if (categoriaFilter !== "todas") {
      result = result.filter((p) => p.categoria === categoriaFilter);
    }

    // Filtro por status
    if (statusFilter === "ativos") {
      result = result.filter((p) => p.ativo);
    } else if (statusFilter === "inativos") {
      result = result.filter((p) => !p.ativo);
    }

    // Ordenacao
    switch (sortBy) {
      case "nome-asc":
        result.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
        break;
      case "nome-desc":
        result.sort((a, b) => b.nome.localeCompare(a.nome, "pt-BR"));
        break;
      case "preco-asc":
        result.sort((a, b) => a.preco - b.preco);
        break;
      case "preco-desc":
        result.sort((a, b) => b.preco - a.preco);
        break;
      case "recentes":
      default:
        result.sort(
          (a, b) =>
            new Date(b.dataCadastro).getTime() -
            new Date(a.dataCadastro).getTime()
        );
        break;
    }

    return result;
  }, [produtos, searchTerm, categoriaFilter, statusFilter, sortBy]);

  return {
    produtos: filteredProdutos,
    totalProdutos: produtos.length,
    categorias,
    loading,
    error,
    hasActiveFilters,
    searchTerm,
    setSearchTerm,
    categoriaFilter,
    setCategoriaFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    handleCreate,
    handleUpdate,
    handleDelete,
    refetch: fetchProdutos,
  };
}
