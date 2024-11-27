"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlunoModel } from "./alunoModel";
import alunoController from "./alunoController";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogoName } from "@/(components)/logo-name";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Search } from "lucide-react";
import { Header } from "@/(components)/header";
import { useAluno } from "./use-aluno";
import { CardAluno } from "@/(components)/aluno-card";

const AlunoView = () => {
    const searchParams = useSearchParams();
    const { aluno, loading: alunoLoading } = useAluno(Number(searchParams.get("id")));
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [alunos, setAlunos] = useState<AlunoModel[]>([]);
    const [nome, setNome] = useState("");


    useEffect(() => {
        const fetchAlunos = async () => {
        try {
            const alunos = await alunoController.getAllAlunos();
            setAlunos(alunos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchAlunos();
    }, []);

    if (!aluno) {
        return <p>Aluno não encontrado.</p>;
    }

    const handleBuscarPorNome = async () => {
        setLoading(true);
        const controller = alunoController;
        try {
            const aluno = await controller.buscarPorNome(nome);
            setAlunos(aluno);
        } catch (error) {
            console.error("Erro ao buscar alunos", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Header id={aluno.id}/>
            <div className="w-full flex flex-col px-20 gap-4 py-4">
                <CardAluno aluno={aluno}/>
                <div className="pb-4 flex flex-col gap-4">
                    <div>
                        <Search className="absolute ml-1 mt-1 text-muted-foreground w-7"/>
                        <div className="w-full flex gap-4">
                            <Input 
                                className="pl-9"
                                placeholder="Buscar por Aluno"
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Button className="bg-blue-600 hover:bg-blue-800" onClick={handleBuscarPorNome} >Buscar</Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader className="bg-blue-100">
                            <TableRow>
                                <TableHead >Nome</TableHead>
                                <TableHead>Curso</TableHead>
                                <TableHead>Modalidade</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {alunos.map((aluno) => (
                            <TableRow key={aluno.id}>
                                <TableCell className="font-medium">{aluno.nome}</TableCell>
                                <TableCell>{aluno.curso}</TableCell>
                                <TableCell>{aluno.modalidade}</TableCell>
                                <TableCell className="text-right">{aluno.status}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AlunoView;
