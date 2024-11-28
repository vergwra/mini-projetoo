import { useEffect, useState } from "react";
import { AlunoModel } from "../alunos/alunoModel";
import BibliotecaController from "../biblioteca/bibliotecaController"
import { LivroModel } from "../livros/livroModel";
import livrosController from "../livros/livrosController";
import { Button } from "@/components/ui/button";

interface BibliotecaViewProps {
    aluno: AlunoModel;
    livro: LivroModel
  }
  
function BibliotecaView({ aluno, livro }: BibliotecaViewProps) {
    const [emprestado, setEmprestado] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    // pegar todos os emprestimos do aluno
    // Verificar se um desses emprestimos eh do livro que to querendo ver
  
    useEffect(() => {
        const verificarEmprestimo = async () => {
            try {
                const estaEmprestado = await BibliotecaController.verificarEmprestimo(aluno, livro);
                setEmprestado(estaEmprestado);
            } catch (error) {
                console.error("Erro ao verificar empréstimo:", error);
            } finally {
                setLoading(false);
            }
        };

        verificarEmprestimo();
    }, [aluno.id, livro.id]);
  
    const handleEmprestar = async () => {
        try {
            setLoading(true);
            if (emprestado) {
                await BibliotecaController.devolverLivro(aluno, livro);
                alert("Livro devolvido com sucesso.");
            } else {
                await BibliotecaController.realizarEmprestimo(aluno, livro);
                alert("Empréstimo realizado com sucesso.");
            }
            setEmprestado(!emprestado);
        } catch (error: any) {
            alert(error.message || "Erro ao realizar a operação.");
        } finally {
            setLoading(false);
        }
    };
  
    if (loading) {
      return <p>Carregando...</p>;
    }

    console.log(livro)

    if (!livrosController.estaDisponivel(livro) && !emprestado){
        return(
            <p>Livro já emprestado para outro aluno</p>
        )
    }
  
    return (
        <Button
            onClick={handleEmprestar}
            className={`px-4 py-2 rounded ${emprestado ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
            disabled={loading}
        >
            {emprestado ? "Devolver Livro" : "Emprestar Livro"}
        </Button>
    );
};
export default BibliotecaView;