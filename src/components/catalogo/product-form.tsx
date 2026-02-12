"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type { Produto } from "@/lib/types";
import { produtoFormSchema, type ProdutoFormValues } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  produto?: Produto | null;
  onSubmit: (values: ProdutoFormValues) => Promise<void>;
}

export function ProductForm({
  open,
  onOpenChange,
  mode,
  produto,
  onSubmit,
}: ProductFormProps) {
  // Form com validação Zod - valida tipos de dados e strings
  const form = useForm<ProdutoFormValues>({
    resolver: zodResolver(produtoFormSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      preco: 0,
      estoque: 0,
      categoria: "",
      imagemUrl: "",
      ativo: true,
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (open) {
      if (mode === "edit" && produto) {
        form.reset({
          nome: produto.nome,
          descricao: produto.descricao || "",
          preco: produto.preco,
          estoque: produto.estoque,
          categoria: produto.categoria,
          imagemUrl: produto.imagemUrl || "",
          ativo: produto.ativo,
        });
      } else {
        form.reset({
          nome: "",
          descricao: "",
          preco: 0,
          estoque: 0,
          categoria: "",
          imagemUrl: "",
          ativo: true,
        });
      }
    }
  }, [open, mode, produto, form]);

  async function handleFormSubmit(values: ProdutoFormValues) {
    await onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {mode === "create" ? "Novo Produto" : "Editar Produto"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os dados para cadastrar um novo produto."
              : "Altere os dados do produto."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descricao</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descricao do produto (opcional)"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preco (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0,00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? 0
                              : Number.parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estoque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? 0
                              : Number.parseInt(e.target.value, 10)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Eletronicos, Roupas..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imagemUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://exemplo.com/imagem.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "edit" && (
              <FormField
                control={form.control}
                name="ativo"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <FormLabel className="text-sm font-medium">
                        Produto Ativo
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Produtos inativos nao aparecem no catalogo publico.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="bg-transparent"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {mode === "create" ? "Cadastrar" : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
