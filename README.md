# Sistema de Cadastro de Planetas para Habitação Humana em Caso de Apocalipse

## **Situação Problema:**

### **Contexto:**

O planeta Terra está à beira de um colapso devido às queimadas e ao aquecimento global. Em uma tentativa desesperada de garantir a sobrevivência da humanidade, cientistas ao redor do mundo começaram a pesquisar planetas em outras galáxias que possam sustentar a vida humana. Sua missão é desenvolver um sistema de cadastro desses planetas planetas à habitação. O sistema permitirá que novos planetas sejam cadastrados, listados, atualizados e excluídos. Cada planeta deverá ser avaliado com base em fatores como temperatura média, presença de água, e composição atmosférica.

### **Requisitos do Sistema:**

O sistema deve atender aos seguintes requisitos:

1. **Cadastrar Planetas:**
   - Os planetas devem ser cadastrados com as seguintes informações: nome, temperatura média, presença de água (true/false) e composição atmosférica.
   - Validação: Nome do planeta e temperatura são campos obrigatórios e a presença de água deve ser indicada como "sim" ou "não".
2. **Listar Planetas:**
   - Deve ser possível listar todos os planetas já cadastrados no sistema.
3. **Buscar Planeta Específico:**
   - Deve ser possível buscar um planeta específico pelo seu ID.
4. **Atualizar Planeta:**
   - O sistema deve permitir atualizar as informações de um planeta específico, exceto o ID.
   - Validação: Mesmas regras de cadastro (nome e temperatura obrigatórios e presença de água como "sim" ou "não").
5. **Excluir Planeta:**
   - Deve ser possível excluir um planeta específico do sistema, buscando-o pelo ID.

## **Passos para Desenvolvimento:**

### **Inicialização do Projeto:**

1. **Crie um Projeto Node.js:**
   - Inicie um projeto Node.js com o comando `npm init`.
2. **Crie o arquivo** `.gitignore` **com o seguinte conteúdo:**
   ```
   node_modules
   .env
   ```
3. **Vincule o Projeto a um Repositório no GitHub:**

4. **Instale as dependências** `express`, `nodemon` **e** `dotenv` **com o comando:**
   ```
   npm install express nodemon dotenv
   ```
5. **Crie o arquivo** `.env` **com a seguinte variável de ambiente:**
   ```
   PORT=4000
   ```
6. **Crie a Estrutura de Pastas do Projeto:**
   ```
   projeto
   ├── node_modules
   ├── src
   │   ├── routes
   │   │   └── index.routes.js
   │   └── server.js
   ├── .env
   ├── .gitignore
   ├── package-lock.json
   ├── README.md
   └── package.json
   ```
7. **Atualize o arquivo** `package.json` **com o seguinte script:**
   ```json
   "type": "module",
   "scripts": {
     "dev": "nodemon src/server.js"
   }
   ```
8. **Crie o Servidor Express no arquivo** `server.js`:

   ```javascript
   import express from "express";
   import { config } from "dotenv";

   config();

   const serverPort = process.env.PORT || 3000;

   const app = express();
   app.use(express.json());

   app.listen(serverPort, () => {
     console.log(`⚡ Server started on http://localhost:${serverPort}`);
   });
   ```

9. **Faça o Teste do Servidor:**
   ```
   npm run dev
   ```

### **Desenvolvimento das Rotas:**

1. **Crie o Arquivo de Rotas** `index.routes.js` **na pasta** `routes`:

   ```javascript
   import { Router } from "express";

   const routes = Router();

   // Rota raiz para teste
   routes.get("/", (req, res) => {
     return res.status(200).json({ message: "Vai Corinthians!" });
   });

   export default routes;
   ```

2. **Atualize o Arquivo** `server.js` **para utilizar as rotas:**

   ```javascript
   import express from "express";
   import { config } from "dotenv";

   import routes from "./routes/index.routes.js";

   config();

   const serverPort = process.env.PORT || 3000;

   const app = express();
   app.use(express.json());
   app.use(routes);

   app.listen(serverPort, () => {
     console.log(`⚡ Server started on http://localhost:${serverPort}`);
   });
   ```

3. **Crie o arquivo** `planetas.routes.js` **na pasta** `routes` **com as rotas para planetas:**

   ```javascript
   import { Router } from "express";

   const planetasRoutes = Router();

   // Array com planetas pré-cadastrados
   let planetas = [
     {
       id: Math.floor(Math.random() * 1000000),
       nome: "Krypton",
       temperatura: -30.0,
       agua: false,
       atm: ["Kriptonita", "Oxigênio", "Nitrogênio"],
     },
     {
       id: Math.floor(Math.random() * 1000000),
       nome: "Xandar",
       temperatura: 25.0,
       agua: true,
       atm: ["Nitrogênio", "Oxigênio", "Hidrogênio"],
     },
     {
       id: Math.floor(Math.random() * 1000000),
       nome: "Asgard",
       temperatura: 5.0,
       agua: false,
       atm: ["Magia", "Energia Cósmica", "Oxigênio"],
     },
     {
       id: Math.floor(Math.random() * 1000000),
       nome: "Apokolips",
       temperatura: 50.0,
       agua: false,
       atm: ["Fumaça", "Dióxido de Enxofre", "Monóxido de Carbono"],
     },
     {
       id: Math.floor(Math.random() * 1000000),
       nome: "Knowhere",
       temperatura: -10.0,
       agua: true,
       atm: ["Hidrogênio", "Nitrogênio", "Partículas Cósmicas"],
     },
   ];

   // Rota para listar todos os planetas
   planetasRoutes.get("/", (req, res) => {
     return res.status(200).json(planetas);
   });

   // Rota para cadastrar um novo planeta
   planetasRoutes.post("/", (req, res) => {
     const { nome, temperatura, agua, atm } = req.body;

     // Validação dos campos obrigatórios
     if (!nome || !temperatura || !agua) {
       return res.status(400).json({
         message: "Os campos nome, temperatura e água são obrigatórios!",
       });
     }

     // Validação de existência de água
     if (agua != "sim" && agua != "não") {
       return res.status(400).send({
         message: "Digite 'sim' ou 'não'!",
       });
     }

     // Criação de um novo planeta
     const novoPlaneta = {
       id: Math.floor(Math.random() * 1000000),
       nome,
       temperatura,
       agua,
       atm: atm || [], // Valor padrão caso atm não seja enviado
     };

     // Adiciona o novo planeta ao array de planetas
     planetas.push(novoPlaneta);

     return res.status(201).json({
       message: "Planeta cadastrado com sucesso!",
       novoPlaneta,
     });
   });

   // Rota para buscar um planeta pelo id
   planetasRoutes.get("/:id", (req, res) => {
     const { id } = req.params;

     // Busca um planeta pelo id no array de planetas
     const planeta = planetas.find((planet) => planet.id == id);

     // Verifica se o planeta foi encontrado
     if (!planeta) {
       return res
         .status(404)
         .json({ message: `Planeta com id ${id} não encontrado!` });
     }

     return res.status(200).json(planeta);
   });

   // Rota para atualizar um planeta pelo id
   planetasRoutes.put("/:id", (req, res) => {
     const { id } = req.params;
     const { nome, temperatura, agua, atm } = req.body;

     // Busca um planeta pelo id no array de planetas
     const planeta = planetas.find((p) => p.id == id);

     // Validação dos campos obrigatórios
     if (!nome || !temperatura || !agua) {
       return res.status(400).json({
         message: "Os campos nome, temperatura e água são obrigatórios!",
       });
     }

     // Validação de existência de água
     if (agua != "sim" && agua != "não") {
       return res.status(400).send({
         message: "Digite 'sim' ou 'não'!",
       });
     }

     planeta.nome = nome;
     planeta.temperatura = temperatura;
     planeta.agua = agua;
     planeta.atm = atm || [];

     return res.status(200).json({
       message: "Planeta atualizado com sucesso!",
       planeta,
     });
   });

   // Rota para deletar um planeta
   planetasRoutes.delete("/:id", (req, res) => {
     const { id } = req.params;

     // Busca um planeta pelo id no array de planetas
     const planeta = planetas.find((planet) => planet.id == id);

     // Verifica se o planeta foi encontrado
     if (!planeta) {
       return res
         .status(404)
         .json({ message: `Planeta com id ${id} não encontrado!` });
     }

     // Remove o planeta do array de planetas
     planetas = planetas.filter((planet) => planet.id != id);

     return res.status(200).json({
       message: "Planeta removido com sucesso!",
       planeta,
     });
   });

   export default planetasRoutes;
   ```

   4. **Atualize o arquivo** `index.routes.js` **para utilizar as rotas de planetas:**

   ```javascript
   import { Router } from "express";

   // Lista de importação das rotas do projeto
   import planetasRoutes from "./planetas.routes.js";

   const routes = Router();

   // Rota raiz para teste
   routes.get("/", (req, res) => {
     return res.status(200).json({ message: "Vai Corinthians!" });
   });

   // Lista de uso das rotas do projeto
   routes.use("/planetas", planetasRoutes);

   export default routes;
   ```
