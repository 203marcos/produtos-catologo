"use client";

import { useState } from "react";
import type { Produto } from "@/lib/types";
import type { ProdutoFormValues } from "@/lib/schemas";
import { useProdutos } from "@/hooks/use-produto";
import { CatalogHeader } from "@/components/catalogo/header";
import { ProductFilters } from "@/components/catalogo/product-filters";
import { ProductGrid } from "@/components/catalogo/product-grid";
import { ProductForm } from "@/components/catalogo/product-form";
import { DeleteDialog } from "@/components/catalogo/delete-dialog";
import { EmptyState } from "@/components/catalogo/empty-state";
import { toast } from "@/hooks/use-toast";

export default function Page() {
  const {
    produtos,
    totalProdutos,
    categorias,
    loading,
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
  } = useProdutos();

  // Form dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingProduto, setDeletingProduto] = useState<Produto | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function openCreateForm() {
    setFormMode("create");
    setEditingProduto(null);
    setFormOpen(true);
  }

  function openEditForm(produto: Produto) {
    setFormMode("edit");
    setEditingProduto(produto);
    setFormOpen(true);
  }

  function openDeleteDialog(produto: Produto) {
    setDeletingProduto(produto);
    setDeleteOpen(true);
  }

  async function onFormSubmit(values: ProdutoFormValues) {
    try {
      if (formMode === "create") {
        await handleCreate(values);
      } else if (editingProduto) {
        await handleUpdate(editingProduto.id, values);
      }
      setFormOpen(false);
    } catch (err) {
      toast({
        title: "Erro",
        description:
          err instanceof Error ? err.message : "Erro ao salvar produto",
        variant: "destructive",
      });
    }
  }

  async function onDeleteConfirm() {
    if (!deletingProduto) return;
    try {
      setDeleteLoading(true);
      await handleDelete(deletingProduto.id);
      setDeleteOpen(false);
      setDeletingProduto(null);
    } catch (err) {
      toast({
        title: "Erro",
        description:
          err instanceof Error ? err.message : "Erro ao excluir produto",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <CatalogHeader
            totalProdutos={totalProdutos}
            onNewProduct={openCreateForm}
          />

          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoriaFilter={categoriaFilter}
            onCategoriaChange={setCategoriaFilter}
            categorias={categorias}
            sortBy={sortBy}
            onSortChange={setSortBy}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          {!loading && produtos.length === 0 ? (
            <EmptyState
              hasFilters={hasActiveFilters}
              onAddProduct={openCreateForm}
            />
          ) : (
            <ProductGrid
              produtos={produtos}
              loading={loading}
              onEdit={openEditForm}
              onDelete={openDeleteDialog}
            />
          )}
        </div>
      </div>

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        produto={editingProduto}
        onSubmit={onFormSubmit}
      />

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        produto={deletingProduto}
        onConfirm={onDeleteConfirm}
        loading={deleteLoading}
      />
    </main>
  );
}
