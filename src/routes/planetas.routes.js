import { Router } from "express";

const planetasRoutes = Router();

// Array com planetas pré-cadastrados
let planetas = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Dev",
    temperatura: 13.3,
    agua: false, // Indicação de existência de água
    atm: ["JS", "NODE", "VS", "Code"],
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
