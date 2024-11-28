import { AlunoModel } from "../alunos/alunoModel";
import { LivroModel } from "../livros/livroModel";
import { EmprestimoModel } from "./bibliotecaModel";
import LivroController from "../livros/livrosController"

class BibliotecaController {
    private emprestimos: EmprestimoModel[] = [];
  
    public async realizarEmprestimo(aluno: AlunoModel, livro: LivroModel): Promise<void> {
        const livroId = await LivroController.getLivroPorId(livro.id);

        const novoEmprestimo = new EmprestimoModel(livro, aluno);

        this.emprestimos.push(novoEmprestimo);
        await LivroController.alterarStatusLivro(livro.id, "emprestado");

        console.log(`Empréstimo realizado: Aluno ${aluno.id}, Livro ${livroId}`);
    }
  
    public async devolverLivro(aluno: AlunoModel, livro: LivroModel): Promise<void> {
        const emprestimo = this.emprestimos.find(
            (e) => e.aluno.id === aluno.id && e.livro.id === livro.id && !e.devolvidoEm
        );
    
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado ou já devolvido.");
        }
    
        emprestimo.devolvidoEm = new Date();
        await LivroController.alterarStatusLivro(livro.id, "disponível");
    
        console.log(`Livro devolvido: Aluno ${aluno.nome}, Livro ${livro.id}`);
    }
  
    public async verificarEmprestimo(aluno: AlunoModel, livro: LivroModel): Promise<boolean> {
        return this.emprestimos.some(
            (e) => e.aluno.id === aluno.id && e.livro.id === livro.id && !e.devolvidoEm
        );
    }
  

}
  
export default new BibliotecaController();