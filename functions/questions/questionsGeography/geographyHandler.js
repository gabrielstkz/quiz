const inquirer = require('inquirer');
const chalk = require('chalk');

// Array de perguntas de geografia
const questions = require('./geographyQuestions');

let points = 0;

// Função para fazer uma pergunta de geografia
async function askQuestion(questionObj, questionNumber) {
  const { response } = await inquirer.prompt([
    {
      type: 'list',
      name: 'response',
      message: `Questão número ${questionNumber}: ${questionObj.question}`,
      choices: Object.keys(questionObj.choices)
    }
  ]);

  // Verifica se a resposta do usuário está correta e atualiza a pontuação
  if (questionObj.choices[response]) {
    points += questionObj.points;
    console.log(chalk.green('Parabéns, resposta correta'));
  } else {
    console.log(chalk.red('Resposta incorreta'));
  }
}

// Função principal para o quiz de geografia
async function geography() {
  // Loop através de todas as perguntas de geografia
  for (let i = 0; i < questions.length; i++) {
    await askQuestion(questions[i], i + 1);
  }

  // Exibe a pontuação do usuário
  console.log(chalk.bgGreen.black(` Sua pontuação foi de ${points} pontos `));

  if (points === 70) {
    console.log(chalk.bgGreen.black(` Parabéns, você obteve a pontuação máxima! `));
  } else {
    console.log(chalk.bgGreen.black(` Parabén, sua pontuação foi de ${points} pontos `));
  }

  // Pergunta se o usuário deseja tentar novamente
  const { yorn } = await inquirer.prompt([
    {
      type: 'input',
      name: 'yorn',
      message: 'Deseja tentar de novo? [y/n]'
    }
  ]);

  // Reinicia o quiz se o usuário optar por tentar novamente
  if (yorn.toLowerCase() === 'y' || yorn.toLowerCase() === 's') {
    points = 0;
    console.clear();
    await geography();
  }
  console.clear()
}

module.exports = { geography };
