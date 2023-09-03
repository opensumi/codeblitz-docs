const path = require('path');
const cp = require('child_process');
const fse = require('fs-extra');

try {
  const workspaceDir = path.join(__dirname, '..');
  // const runBuild = cp.execSync('cd packages/site && yarn run build', { cwd: __dirname });

  const sourcePath = path.join(workspaceDir, 'packages/site/public');
  const targetPath = path.join(workspaceDir, 'dist');

  cp.execSync(`cp -r ${sourcePath}/. ${targetPath}`);
} catch (err) {
  console.error('编译失败', err);
  throw err;
}
