import { AlunoModel } from "../alunos/alunoModel";
import { LivroModel } from "../livros/livroModel";
import { EmprestimoModel } from "./bibliotecaModel";
import LivroController from "../livros/livrosController"

class BibliotecaController {
    private emprestimos: EmprestimoModel[] = [];
  
    public async realizarEmprestimo(aluno: AlunoModel, livroId: string): Promise<void> {
        const livro = await LivroController.getLivroPorId(livroId);

        const novoEmprestimo = new EmprestimoModel(livro, aluno);

        this.emprestimos.push(novoEmprestimo);
        await LivroController.alterarStatusLivro(livroId, "emprestado");

        console.log(`Empréstimo realizado: Aluno ${aluno.id}, Livro ${livroId}`);
    }
  
    public async devolverLivro(aluno: AlunoModel, livroId: string): Promise<void> {
        const emprestimo = this.emprestimos.find(
            (e) => e.aluno.id === aluno.id && e.livro.id === livroId && !e.devolvidoEm
        );
    
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado ou já devolvido.");
        }
    
        emprestimo.devolvidoEm = new Date();
        await LivroController.alterarStatusLivro(livroId, "disponível");
    
        console.log(`Livro devolvido: Aluno ${aluno.id}, Livro ${livroId}`);
    }
  
    public async verificarEmprestimo(alunoId: number, livroId: string): Promise<boolean> {
        return this.emprestimos.some(
            (e) => e.aluno.id === alunoId && e.livro.id === livroId && !e.devolvidoEm
        );
    }
  
    public async listarTodosEmprestimos(): Promise<EmprestimoModel[]> {
        return this.emprestimos;
    }
}
  
export default new BibliotecaController();