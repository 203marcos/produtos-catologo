// ProdutoDto - resposta da API
export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagemUrl?: string;
  ativo: boolean;
  dataCadastro: string;
}

// CreateProdutoDto - criar produto (sem campo ativo)
export interface CreateProdutoDto {
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagemUrl?: string;
}

// UpdateProdutoDto - atualizar produto (com campo ativo)
export interface UpdateProdutoDto {
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagemUrl?: string;
  ativo: boolean;
}
