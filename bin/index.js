#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { vueRepo, expressRepo, VUE, EXPRESS, EXPRESS_VUE } = require('./variables');
const { version } = require('../package.json');
const { gitClone, initGit, updatePackageJson, npmInstall, mkdir } = require('./commands');


const createProject = async (repo, folder) => {
  // cloning the project
  await gitClone(repo, folder)
  // update package.json information (name and version)
  await updatePackageJson(folder)
  // init git
  await initGit(folder)
  // npm install
  await npmInstall(folder)
}

const newProject = async (type, folder) => {
  switch (type.toUpperCase()) {
    case VUE:
      await createProject(vueRepo, folder);
      break;

    case EXPRESS:
      await createProject(expressRepo, folder);
      break;

    case EXPRESS_VUE:
      await mkdir(folder);
      await createProject(expressRepo, `${folder}/server`);
      await createProject(vueRepo, `${folder}/client`);
      break;
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



