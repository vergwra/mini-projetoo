import { AlunoModel } from "../alunos/alunoModel";
import { DisciplinaModel } from "../diciplina/diciplinaModel";

export class MatriculaModel {
    id: string;
    aluno: AlunoModel;
    disciplina: DisciplinaModel;
    realizadaEm: Date | undefined;
    canceladaEm?: Date | undefined;

    constructor(aluno: AlunoModel, disciplina: DisciplinaModel, matriculasExistentes: MatriculaModel[]) {
        if (aluno.status !== "Ativo") {
            throw new Error("Somente alunos ativos podem se matricular.");
        }

        if (aluno.curso !== disciplina.curso) {
            throw new Error("Você só pode se matricular em disciplinas do seu curso.");
        }

        if (aluno.modalidade === "EAD") {
            throw new Error("Alunos na modalidade EAD não podem se matricular em disciplinas presenciais.");
        }

        const matriculaExistente = matriculasExistentes.find(
            (m) => m.aluno.id === aluno.id && m.disciplina.id === disciplina.id && !m.canceladaEm
        );

        if (matriculaExistente) {
            throw new Error("Você já está matriculado nesta disciplina.");
        }

        this.id = `${aluno.id}-${disciplina.id}-${Date.now()}`;
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.realizadaEm = new Date();
        this.canceladaEm = undefined;
    }
}