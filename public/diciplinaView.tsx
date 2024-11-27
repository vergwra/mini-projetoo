import { useState, useEffect } from "react";
import { DisciplinaModel } from "../src/app/diciplina/diciplinaModel";
import { DisciplinaController } from "../src/app/diciplina/diciplinaController";
import { Input } from "@/components/ui/input";


const DisciplinaView = () => {
  const [disciplinas, setDisciplinas] = useState<DisciplinaModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [curso, setCurso] = useState("");

  useEffect(() => {
    const fetchDisciplinas = async () => {
      const controller = new DisciplinaController();
      try {
        const disciplinas = await controller.getAll();
        setDisciplinas(disciplinas);
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
    const controller = new DisciplinaController();
    try {
      const disciplinasCurso = await controller.buscarPorCurso(curso);
      setDisciplinas(disciplinasCurso);
    } catch (error) {
      console.error("Erro ao buscar disciplinas por curso:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Lista de Disciplinas</h1>
      <Input
        type="text"
        placeholder="Filtrar por curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      />
      <button onClick={handleBuscarPorCurso}>Buscar</button>
      <ul>
        {disciplinas.map((disciplina) => (
          <li key={disciplina.id}>
            {disciplina.nome} - {disciplina.curso}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplinaView;