import { z } from "zod";

export const produtoFormSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome e obrigatorio")
    .max(100, "Nome deve ter no maximo 100 caracteres"),
  descricao: z
    .string()
    .max(500, "Descricao deve ter no maximo 500 caracteres")
    .optional()
    .or(z.literal("")),
  preco: z
    .number({ invalid_type_error: "Preco deve ser um numero" })
    .min(0.01, "Preco deve ser maior que zero"),
  estoque: z
    .number({ invalid_type_error: "Estoque deve ser um numero" })
    .int("Estoque deve ser um numero inteiro")
    .min(0, "Estoque nao pode ser negativo"),
  categoria: z.string().min(1, "Categoria e obrigatoria"),
  imagemUrl: z
    .string()
    .url("URL da imagem invalida")
    .optional()
    .or(z.literal("")),
  ativo: z.boolean().default(true),
});

export type ProdutoFormValues = z.infer<typeof produtoFormSchema>;
