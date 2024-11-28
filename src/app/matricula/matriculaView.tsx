"use client"

import { useEffect, useState } from "react";
import { AlunoModel } from "../alunos/alunoModel";
import { useAluno } from "../alunos/use-aluno";
import { DisciplinaModel } from "../diciplina/diciplinaModel";
import MatriculaController from "./matriculaController";
import { Button } from "@/components/ui/button";

interface MatriculaViewProps {
    disciplina: DisciplinaModel;
    aluno: AlunoModel;
  }
  
const MatriculaView: React.FC<MatriculaViewProps> = ({ aluno, disciplina }) => {
    const [matriculado, setMatriculado] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    // pegar todos as matriculas do aluno
    // Verificar se um dessas matriculas eh da disciplina que to querendo ver
  

    useEffect(() => {
    const verificarMatricula = async () => {
        try {
            const estaMatriculado = MatriculaController.verificarMatricula(aluno.id, disciplina.id);
            setMatriculado(estaMatriculado);
        } catch (error) {
            console.error("Erro ao verificar matrícula:", error);
        } finally {
            setLoading(false);
        }
    };

    verificarMatricula();
    }, [aluno.id, disciplina.id]);

    const handleMatricular = async () => {
    try {
        setLoading(true);
        if (matriculado) {
            MatriculaController.cancelarMatricula(aluno, disciplina.id);
            alert(`Matrícula cancelada na disciplina: ${disciplina.nome}`);
        } else {
            MatriculaController.realizarMatricula(aluno, disciplina);
            alert(`Matrícula realizada na disciplina: ${disciplina.nome}`);
        }
        setMatriculado(!matriculado);
    } catch (error: any) {
        alert(error.message || "Erro ao realizar a operação.");
    } finally {
        setLoading(false);
    }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <Button
            onClick={handleMatricular}
            className={`px-4 py-2 rounded ${
            matriculado ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
            disabled={loading}
        >
            {matriculado ? "Cancelar Matrícula" : "Matricular"}
        </Button>
    );
};
  
  export default MatriculaView;