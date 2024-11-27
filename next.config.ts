/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
      return [
        {
          source: "/api/alunos",
          destination: "https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno",
        },
        {
          source: "/api/disciplinas",
          destination: "https://sswfuybfs8.execute-api.us-east-2.amazonaws.com/disciplinaServico/msDisciplina",
        },
        {
          source: "/api/livros",
          destination: "https://qiiw8bgxka.execute-api.us-east-2.amazonaws.com/acervo/biblioteca",
        },
      ];
    },
};

export default nextConfig;
