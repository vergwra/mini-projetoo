import { AlunoModel } from "../alunos/alunoModel";
import { DisciplinaModel } from "../diciplina/diciplinaModel";
import { MatriculaModel } from "./matriculaModel";

class MatriculaController {
    private matriculas: MatriculaModel[] = [];

    public realizarMatricula(aluno: AlunoModel, disciplina: DisciplinaModel): void {
        const novaMatricula = new MatriculaModel(aluno, disciplina, this.matriculas);
        this.matriculas.push(novaMatricula);
        console.log(`Matrícula realizada: Aluno ${aluno.id}, Disciplina ${disciplina.id}`);
    }

    public cancelarMatricula(aluno: AlunoModel, disciplinaId: number): void {
        const matricula = this.matriculas.find(
            (m) => m.aluno.id === aluno.id && m.disciplina.id === disciplinaId && !m.canceladaEm
        );

        if (!matricula) {
            throw new Error("Matrícula não encontrada ou já foi cancelada.");
        }
        matricula.canceladaEm = new Date();
        console.log(`Matrícula cancelada: Aluno ${aluno.id}, Disciplina ${disciplinaId}`);
    }

    public verificarMatricula(alunoId: number, disciplinaId: number): boolean {
        return this.matriculas.some(
            (m) => m.aluno.id === alunoId && m.disciplina.id === disciplinaId && !m.canceladaEm
        );
    }
}
  
export default new MatriculaController();
  