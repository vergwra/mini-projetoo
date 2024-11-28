"use client"
import { useEffect, useState } from "react";
import { LivroModel } from "./livroModel";
import  LivroController  from "./livrosController";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/(components)/header";
import { useAluno } from "../alunos/use-aluno";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BibliotecaView from "../biblioteca/bibliotecaView";
import { CardAluno } from "@/(components)/aluno-card";

const LivrosView: React.FC = () => {
    const searchParams = useSearchParams();
    const { aluno, loading: alunoLoading } = useAluno(Number(searchParams.get("id")));
    const [livros, setLivros] = useState<LivroModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [titulo, setTitulo] = useState("");


    useEffect(() => {
        const fetchLivros = async () => {
        try {
            const data = await LivroController.getAllLivros();
            setLivros(data);
        } catch (error) {
            console.error("Erro ao carregar Livros:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchLivros();
    }, []);

  
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    const handleBuscarPorTitulo = async () => {
        setLoading(true);
        try {
            const data = await LivroController.getLivrosPorTitulo(titulo);
            setLivros(data);
        } catch (error) {
            console.error("Erro ao buscar livros", error);
        } finally {
            setLoading(false);
        }
    };

    if (!aluno) {
        return <p>Aluno não encontrado.</p>;
    }

  
    return (
      <div className="flex flex-col gap-4">
        <Header id={aluno?.id}/>

        <div className="flex flex-col gap-4 px-20">
        <CardAluno aluno={aluno}/>
            <div>
                <Search className="absolute ml-1 mt-1 text-muted-foreground w-7"/>
                <div className="w-full flex gap-4">
                    <Input 
                        className="pl-9"
                        placeholder="Buscar por Titulo"
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <Button className="bg-blue-600 hover:bg-blue-800" onClick={handleBuscarPorTitulo}>Buscar</Button>
                </div>
            </div>
            <Table>
                <TableHeader className="bg-blue-100">
                    <TableRow>
                        <TableHead>Titulo</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Ano</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {livros.map((l) => (
                    <TableRow key={l.id}>
                        <TableCell className="font-medium">{l.titulo}</TableCell>
                        <TableCell>{l.autor}</TableCell>
                        <TableCell>{l.ano}</TableCell>
                        <TableCell><BibliotecaView aluno={aluno} livro={l}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      </div>
    );
  };
  
  export default LivrosView;