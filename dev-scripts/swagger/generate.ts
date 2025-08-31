/* eslint-disable no-console */
import chalk from "chalk";
import cp from "child_process";
import dotenv from "dotenv";
import path from "path";
import "tsconfig-paths/register";
import { exitCode, findRootPath } from "../../src/utils";
import { ApiService, services } from "./services";

run();

export async function run() {
  const rootPath = findRootPath();

  dotenv.config({ path: path.join(rootPath, ".dev.env") });

  await Promise.all(
    services.map((service) => generateService(service, rootPath))
  );
}

async function generateService(service: ApiService, rootPath: string) {
  const swaggerFolderPath = path.join(rootPath, "src/api/services", service);
  console.log(
    chalk.yellow(`Generating client for service ${chalk.green(service)}.`)
  );

  const codegenPath = path.join(swaggerFolderPath, "codegen");

  const code = await exitCode(
    cp.spawn(
      `rm -r ${codegenPath}; mkdir -p ${codegenPath} && openapi-generator-cli generate -i ${path.join(
        swaggerFolderPath,
        "swagger.json"
      )} -o ${codegenPath} -g typescript-axios -a BearerToken && prettier "${codegenPath}/**/*.ts|tsx|js|css|json" --write`,
      { shell: "bash", stdio: "inherit" }
    )
  );

  if (code !== 0) throw new Error(`Swagger download failed with code ${code}.`);
}
