// External/Internal modules
const inquirer = require('inquirer');
const chalk = require('chalk');

// My modules
const { technology } = require('./functions/questions/questionsTechnology/technologyHandler');
const { geography } = require('./functions/questions/questionsGeography/geographyHandler');
const { football } = require('./functions/questions/questionsFootball/footbalHandler');

// User Choices
const choices = {
  'Tecnologia': technology,
  'Geografia': geography,
  'Futebol': football,
  'Sair': leftProgram,
}

// Main function
async function startQuiz() {
  try {
    // Pergunta ao usuário qual quiz ele deseja jogar
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Qual tema do quiz você deseja jogar?',
        choices: Object.keys(choices), // Mostra as opções disponíveis
      }
    ]);

    // Executa a função correspondente à escolha do usuário
    await choices[action]();

    // Reinicia o quiz após terminar uma rodada
    startQuiz();
  } catch (err) {
    handleError(err);
  }
}

// Função para sair do programa
function leftProgram() {
  console.log(chalk.bgBlueBright.black(' Obrigado por jogar nosso quiz :) '));
  process.exit(); // Encerra o programa
}

// Função para lidar com erros
function handleError(err) {
  console.error(chalk.red(err.message));
}

// Executa a função principal do quiz
startQuiz().catch(handleError);
