import { DisciplinaModel } from "../diciplina/diciplinaModel";

class DisciplinaController {
    private static apiUrl = "/api/disciplinas";
    private disciplinasCache: DisciplinaModel[] | null = null;
  
    public async getAllDisciplinas(): Promise<DisciplinaModel[]> {
      if (this.disciplinasCache) {
        console.log("Retornando disciplinas do cache");
        return this.disciplinasCache;
      }
  
      const response = await fetch(DisciplinaController.apiUrl);
      if (!response.ok) {
        throw new Error("Erro ao buscar disciplinas");
      }
  
      const disciplinas: DisciplinaModel[] = await response.json();
      this.disciplinasCache = disciplinas;
      console.log("Disciplinas carregadas do microsserviço e armazenadas no cache");
      return disciplinas;
    }
  
    public async getDisciplinasPorCurso(curso: string): Promise<DisciplinaModel[]> {
      const disciplinas = await this.getAllDisciplinas();
      const resultados = disciplinas.filter((a) =>
        a.curso.toLowerCase().startsWith(curso.toLowerCase())
    );
      return resultados;
    }
  
    public async getDisciplinaPorId(id: number): Promise<DisciplinaModel | undefined> {
      const disciplinas = await this.getAllDisciplinas();
      return disciplinas.find((d) => d.id === id);
    }
  }
  
export default new DisciplinaController();
