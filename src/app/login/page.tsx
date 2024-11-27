"use client"
import { useState } from "react";
import { LoginController } from "./loginController";
import { LogoName } from "@/(components)/logo-name";
import { Logo } from "@/(components)/logo";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginView = () => {
    const [matricula, setMatricula] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const router = useRouter();
  
    const handleLogin = async () => {
        try {
          const aluno = await LoginController.login(matricula, senha);
    
          if (!aluno) {
            setErro("Matrícula ou senha inválida.");
            return;
          }
    
          router.push(`/alunos?id=${aluno.id}`);
        } catch (error) {
          console.error(error);
          setErro("Erro ao tentar realizar o login.");
        }
    }
  
    return (
        <div className="flex flex-col bg-login bg-cover w-full h-screen items-center justify-center">
            <div className="flex w-[50%] mx-auto rounded-2xl shadow-2xl">
                <div className="bg-white h-[412.67px] w-full flex flex-col gap-1 items-center p-8 rounded-l-2xl my-auto  justify-center">
                    <img className="w-14" src="/image.png"/>
                    <p className="font-bold text-lg">Acesso ao Unifor Online</p>
                    <p className="text-center text-sm">Aqui você encontra os serviços digitais da Universidade de Fortaleza.</p>
                    <a href={"www.unifor.br"}>Retornar ao Portal Unifor</a>
                    <div className="w-full flex flex-col gap-4">
                        <Input 
                            placeholder="Matrícula" 
                            className="rounded-full px-4 py-1"
                            type="text"
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
                        />
                        <Input 
                            placeholder="Senha" 
                            type="password" 
                            className="rounded-full px-4 py-1"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <p className="text-right w-full text-xs text-blue-500 font-extrabold m-0 ">Esqueceu sua senha?</p>
                    </div>
                    <Button 
                        onClick={handleLogin} 
                        className="w-full bg-blue-700 text-white rounded-full text-lg font-bold py-1 hover:bg-blue-900">
                            Acessar
                    </Button>
                    {erro && <p style={{ color: "red" }}>{erro}</p>}
                    <p className="font-semibold text-blue-600 text-sm">Retornar ao portal Unifor</p>
                </div>
                <div className="flex flex-col w-full">
                    <div className="bg-blue-500/20 h-[410px] w-[410px] fixed bg-cover rounded-r-2xl justify-end items-end flex">
                        <div className="z-10">
                        <LogoName/>

                        </div>
                    </div>
                    <video autoPlay={true} muted={true} controls preload="none" className="w-full bg-cover rounded-r-2xl">
                        <source src="/unifor50anos.mp4" type="video/mp4" className="w-[435px] h-[480px]"/>
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                    </video>
                </div>
            </div>
        </div>
    );
  };
  
  export default LoginView