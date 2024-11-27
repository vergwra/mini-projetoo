import { AlunoModel } from "./alunoModel";

class AlunoController {
    private static apiUrl = "/api/alunos";
    private alunosCache: AlunoModel[] | null = null;

    public async getAllAlunos(): Promise<AlunoModel[]> {
        if (this.alunosCache) {
            console.log("Retornando alunos do cache");
            return this.alunosCache;
        }

        const response = await fetch(AlunoController.apiUrl);
        if (!response.ok) {
            throw new Error("Erro ao buscar alunos");
        }

        const alunos: AlunoModel[] = await response.json();
        this.alunosCache = alunos;
        console.log("Alunos carregados do microsserviço e armazenados no cache");
        return alunos;
    }

    public async buscarPorNome(nome: string): Promise<AlunoModel[]> {
        const response = await this.getAllAlunos();
        const resultados = response.filter((a) =>
            a.nome.toLowerCase().startsWith(nome.toLowerCase())
        );
        return resultados;
    }

    public async buscarPorId(id: number): Promise<AlunoModel | undefined> {
        const alunos = await this.getAllAlunos();
        return alunos.find(a => a.id == id);
    }
}

export default new AlunoController();