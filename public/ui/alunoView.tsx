import { useState, useEffect } from "react";
import { AlunoModel } from "../../src/app/alunos/alunoModel";
import AlunoController from "../../src/app/alunos/alunoController";


const AlunoView = () => {
  const [alunos, setAlunos] = useState<AlunoModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      const controller = AlunoController;
      try {
        const alunos = await controller.getAllAlunos();
        setAlunos(alunos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Lista de Alunos</h1>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            {aluno.nome} - {aluno.curso} ({aluno.modalidade})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlunoView;