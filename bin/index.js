#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { vueRepo } = require('./variables');
const { version } = require('../package.json');
const { gitClone, initGit, updatePackageJson } = require('./commands');


const createVueProject = async (folder) => {
  // cloning the project
  await gitClone(vueRepo, folder)
  // update package.json information (name and version)
  await updatePackageJson(folder)
  // init git
  await initGit(folder)
}

const createVueExpressProject = () => {
  console.log('create vue express app')
}

const newProject = async (type, folder) => {
  console.log(`Cloning ${type} into ${folder}`);

  switch (type.toUpperCase()) {
    case 'VUE':
      await createVueProject(folder)
      break;
    case 'VUE_EXPRESS':
      await createVueExpressProject(folder)
    default:
      console.error(`${type} is not supported`);
      break;
  }
}

program
  .version(version)
  .command('new')
  .arguments('type', 'Type of project')
  .arguments('folder', 'path where to clone')
  .action(newProject);

program.parse(process.argv);



