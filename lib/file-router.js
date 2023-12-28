import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

export const router = new Map();

const prefix = '/routes';
const separator = '/';
const controllerFileName = 'index.js';

const basePath = path.join(process.cwd() + prefix);

async function loadRoutes() {
  const catalogue = await fsp.readdir(basePath, {
    recursive: true,
    withFileTypes: true,
  });

  const fileList = catalogue.filter((dirent) => dirent.isFile() && dirent.name === controllerFileName);

  fileList.forEach(async (file) => {
    const offset = process.cwd().length;
    const relativePath = file.path.substring(offset);
    const parsedPath = relativePath.substring(prefix.length).replaceAll(path.sep, separator);
    const resolvedPath = parsedPath === '' ? separator : parsedPath;
    const modulePath = pathToFileURL(file.path + path.sep + controllerFileName);
    const module = await import(modulePath);
    router.set(resolvedPath, module);
  });
}

loadRoutes();
