import { useEffect, useState } from "react";
import { AlunoModel } from "./alunoModel";
import alunoController from "./alunoController";

export function useAluno(id: number) {
    const [aluno, setAluno] = useState<AlunoModel | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAluno = async () => {
        if (!id) {
            return;
        }

        try {
            const aluno = await alunoController.buscarPorId(Number(id));
            setAluno(aluno);
        } catch (error) {
            console.error("Erro ao carregar aluno:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchAluno();
    }, [id])

  return {
    aluno,
    loading
  }
}