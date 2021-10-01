const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.gitClone = async (url, folder) => {
  console.log('> git clone')
  const { stdout, stderr } = await exec(`git clone ${url} ${folder}`);

  if (stderr) {
    console.error(stderr);
    return false;
  }

  return true;
}

exports.updatePackageJson = async (folder) => {
  console.log('> update package.json')

  let { stdout, stderr } = await exec(`
      cd ${folder} &&
      node -e "let pkg=require('./package.json');
      pkg.name = '${folder}';
      pkg.version='1.0.0';
      require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));"
    `);

  if (stderr) {
    console.error(stderr)
    return
  }
}

exports.initGit = async (folder) => {
  console.log('> init git')
  let { stdout, stderr } = await exec(`cd ${folder} && rm -rf .git && git init`);

  if (stderr) {
    console.error(stderr)
    return
  }
}

exports.npmInstall = async (folder) => {
  console.log('> npm install')

  let { stdout, stderr } = await exec(`cd ${folder} && npm install`);

  if (stderr) {
    console.error(stderr)
    return
  }
}