import { AlunoModel } from "../alunos/alunoModel";
import { LivroModel } from "../livros/livroModel";

export class EmprestimoModel {
    id: string;
    livro: LivroModel;
    aluno: AlunoModel;
    emprestadoEm: Date;
    devolvidoEm?: Date;
  
    constructor(livro: LivroModel, aluno: AlunoModel) {
      if (!livro) {
        throw new Error("Livro não encontrado.");
      }
  
      if (livro.status !== "disponível" && livro.status !== "null") {
        throw new Error("O livro não está disponível para empréstimo.");
      }
  
      if (aluno.status !== "Ativo") {
        throw new Error("Apenas alunos ativos podem realizar empréstimos.");
      }
  
      this.id = `${aluno.id}-${livro.id}-${Date.now()}`;
      this.livro = livro;
      this.aluno = aluno;
      this.emprestadoEm = new Date();
    }
  }