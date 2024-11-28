"use client"
import { useState, useEffect } from "react";
import { DisciplinaModel } from "./diciplinaModel";
import DisciplinaController from "./diciplinaController";
import { Input } from "@/components/ui/input";
import { Header } from "@/(components)/header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import MatriculaView from "../matricula/matriculaView";
import { useSearchParams } from "next/navigation";
import { useAluno } from "../alunos/use-aluno";
import { CardAluno } from "@/(components)/aluno-card";


const DisciplinaView = () => {
    const searchParams = useSearchParams();
    const { aluno, loading: alunoLoading } = useAluno(Number(searchParams.get("id")));
    const [disciplinas, setDisciplinas] = useState<DisciplinaModel[]>([]);
    const [disciplina, setDisciplina] = useState<DisciplinaModel | undefined>();
    const [loading, setLoading] = useState(true);
    const [curso, setCurso] = useState("");

    useEffect(() => {
        const fetchDisciplinas = async () => {
        try {
            const data = await DisciplinaController.getAllDisciplinas();
            setDisciplinas(data);
        } catch (error) {
            console.error("Erro ao carregar disciplinas:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchDisciplinas();
    }, []);

    const handleBuscarPorCurso = async () => {
        setLoading(true);
        try {
            const data = await DisciplinaController.getDisciplinasPorCurso(curso);
            setDisciplinas(data);
        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!aluno) {
        return <p>Aluno não encontrado.</p>;
    }


  return (
    <div className="flex w-full flex-col">
        <Header id={aluno.id}/>
        {loading ? (
            <p>Carregando...</p>
        ) : (
            <div className="flex flex-col gap-4 px-20 p-4">
            <CardAluno aluno={aluno}/>
             <div> 
                <Search className="absolute ml-1 mt-1 text-muted-foreground w-7"/>
                <div className="w-full flex gap-4">
                    <Input 
                        className="pl-9"
                        placeholder="Buscar por Curso"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                    />
                    <Button className="bg-blue-600 hover:bg-blue-800" onClick={handleBuscarPorCurso} >Buscar</Button>
                </div>
            </div>
            <Table>
                <TableHeader className="bg-blue-100">
                    <TableRow>
                        <TableHead >Curso</TableHead>
                        <TableHead>Disciplina</TableHead>
                        <TableHead>Ação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {disciplinas.map((d) => (
                    <TableRow key={d.id}>
                        <TableCell className="font-medium">{d.curso}</TableCell>
                        <TableCell>{d.nome}</TableCell>
                        <TableCell><MatriculaView disciplina={d} aluno={aluno} /></TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      )}
    </div>
  );
};

export default DisciplinaView;
