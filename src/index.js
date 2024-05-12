const { readdir, rm, stat } = require('node:fs/promises')
const { cwd } = require('node:process')
const { join } = require('node:path')

async function deleteNodeModules(path) {
  const files = await readdir(path)
  for (const file of files) {
    const pathFile = join(path, file)
    let stats
    try {
      stats = await stat(pathFile)
    } catch {
      continue
    }

    if (!stats.isDirectory()) {
      continue
    }

    if (file === 'node_modules') {
      console.log(`Delete node_modules in: ${pathFile}`)
      await rm(pathFile, { recursive: true })
    } else {
      await deleteNodeModules(pathFile)
    }
  }
}

const currentPath = cwd()
console.log(`Current path: ${currentPath}`)
deleteNodeModules(currentPath)
