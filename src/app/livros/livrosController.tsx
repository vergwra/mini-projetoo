import { LivroModel } from "./livroModel";

class LivroController {
    private static apiUrl = "/api/livros";
    private livrosCache: LivroModel[] | null = null;
  
    public async getAllLivros(): Promise<LivroModel[]> {
      if (this.livrosCache) {
        console.log("Retornando livros do cache");
        return this.livrosCache;
      }
  
      const response = await fetch(LivroController.apiUrl);
      if (!response.ok) {
        throw new Error("Erro ao buscar livros");
      }
  
      const livros: LivroModel[] = await response.json();
      this.livrosCache = livros;
      console.log("Livros carregados do microsserviço e armazenados no cache");
      return livros;
    }
  
    public async getLivroPorId(id: string): Promise<LivroModel | undefined> {
      const livros = await this.getAllLivros();
      return livros.find((l) => l.id === id);
    }

    public async getLivrosPorTitulo(titulo: string): Promise<LivroModel[]> {
        const livros = await this.getAllLivros();
        const resultados = livros.filter((a) =>
            a.titulo.toLowerCase().startsWith(titulo.toLowerCase())
        );
        return resultados;
    }
  
    public async alterarStatusLivro(id: string, novoStatus: string): Promise<void> {
      const livro = await this.getLivroPorId(id);
      if (!livro) {
        throw new Error("Livro não encontrado.");
      }
  
      livro.status = novoStatus;
      console.log(`Status do livro atualizado: ${livro.titulo} -> ${novoStatus}`);
    }

    estaDisponivel(livro: LivroModel) {
        return livro.status == "disponível" || livro.status == "null"
    }
  }
  
  export default new LivroController();