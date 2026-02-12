import type { Produto, CreateProdutoDto, UpdateProdutoDto } from "./types";

const BASE_URL = "http://localhost:5091/api/Produto";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || `Erro ${response.status}: ${response.statusText}`
    );
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return undefined as T;
}

export async function getProdutos(categoria?: string): Promise<Produto[]> {
  const url = new URL(BASE_URL);
  if (categoria) {
    url.searchParams.set("categoria", categoria);
  }
  const response = await fetch(url.toString());
  return handleResponse<Produto[]>(response);
}

export async function getProdutoById(id: string): Promise<Produto> {
  const response = await fetch(`${BASE_URL}/${id}`);
  return handleResponse<Produto>(response);
}

export async function createProduto(data: CreateProdutoDto): Promise<Produto> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Produto>(response);
}

export async function updateProduto(
  id: string,
  data: UpdateProdutoDto
): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<void>(response);
}

export async function deleteProduto(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}

export async function getCategorias(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/categorias`);
  return handleResponse<string[]>(response);
}
