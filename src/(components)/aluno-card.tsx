import { AlunoModel } from "@/app/alunos/alunoModel";
import { useAluno } from "@/app/alunos/use-aluno";
import { Card } from "@/components/ui/card";

export function CardAluno({ aluno }: { aluno: AlunoModel }){
    return(
        <Card className="p-4">
            <div className="flex flex-col">
                <p className="text-xl font-bold">Olá {aluno?.nome}</p>
                <p>Curso: {aluno?.curso}</p>
                <p>Modalidade: {aluno?.modalidade}</p>
                <p>Status: {aluno?.status}</p>
            </div>
        </Card>
    )
}