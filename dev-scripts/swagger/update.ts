import chalk from "chalk";
import cp from "child_process";
import fs from "fs/promises";
import path from "path";
import { match } from "ts-pattern";
import "tsconfig-paths/register";
import { findRootPath } from "../../src/utils";
import { ApiService, services } from "./services";
import { applyLoopTrackUpdates } from "./updates/loop-track";

run();

export async function run() {
  const rootPath = findRootPath();

  await Promise.all(
    services.map((service) => updateService(service, rootPath))
  );
}

async function updateService(service: ApiService, rootPath: string) {
  console.log(
    chalk.yellow(`Updating swagger for service ${chalk.green(service)}.`)
  );

  const swaggerFolderPath = path.resolve(rootPath, "src/api/services", service);
  const swaggerJsonPath = path.resolve(swaggerFolderPath, "swagger.json");
  const originalSwaggerJsonPath = path.resolve(
    swaggerFolderPath,
    "original.swagger.json"
  );

  // load
  const swaggerJson = JSON.parse(
    await fs
      .readFile(originalSwaggerJsonPath)
      .then((buffer) => buffer.toString("utf-8"))
  );

  // update
  const updatedSwaggerJson = match(service)
    .with("trip8", () => applyLoopTrackUpdates(swaggerJson))
    .exhaustive();

  const keepDeprecatedOperationIds = new Set<string>([]);
  // @ts-expect-error
  const omitDeprecated = service !== "players";
  if (omitDeprecated) {
    for (const [_path, methods] of Object.entries(
      swaggerJson.paths as Record<any, any>
    )) {
      for (const [method, endpoint] of Object.entries(
        methods as Record<any, any>
      )) {
        if (
          endpoint.deprecated &&
          !keepDeprecatedOperationIds.has(endpoint.operationId)
        ) {
          delete methods[method];
        }
      }
    }
  }

  // save
  await fs.writeFile(
    swaggerJsonPath,
    JSON.stringify(updatedSwaggerJson, null, 3)
  );

  // format the same way to make it diffable
  cp.execSync(
    `cat ${swaggerJsonPath} | jq --sort-keys | prettier --parser=json | sponge ${swaggerJsonPath}`
  );
}
