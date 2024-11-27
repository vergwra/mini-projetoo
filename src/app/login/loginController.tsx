import alunoController from "../alunos/alunoController";
import { LoginModel } from "./loginModel";

export class LoginController {
    private static loginData: LoginModel[] = Array.from({ length: 93 }, (_, i) => ({
        idAluno: i + 1,
        senha: `senha${i + 1}`,
        matricula: `2310${String(i + 1).padStart(3, "0")}`,
    }));
  
    public static autenticar(matricula: string, senha: string): LoginModel | null {
        return this.loginData.find((login) => login.matricula === matricula && login.senha === senha) || null;
    }

    public static async login(matricula: string, senha: string) {
        const loginInfo = this.loginData.find(
            (login) => login.matricula === matricula && login.senha === senha
        );
        if (!loginInfo) {
            return null; 
        }
        const aluno = await alunoController.buscarPorId(loginInfo.idAluno);
        if (!aluno) {
            throw new Error("Aluno não encontrado.");
        }
        return aluno;
      }
}