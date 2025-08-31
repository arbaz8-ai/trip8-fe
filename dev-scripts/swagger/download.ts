import chalk from "chalk";
import cp from "child_process";
import dotenv from "dotenv";
import path from "path";
import { match } from "ts-pattern";
import "tsconfig-paths/register";
import { exitCode, findRootPath } from "../../src/utils";
import { ApiService, services } from "./services";

run();

export async function run() {
  const rootPath = findRootPath();

  const dotenvFileName = process.argv.some((x) => x === "--staging")
    ? ".dev.env"
    : ".local.env";

  dotenv.config({ path: path.join(rootPath, dotenvFileName) });

  await Promise.all(
    services.map((service) => downloadService(service, rootPath))
  );
}

async function downloadService(service: ApiService, rootPath: string) {
  console.log(
    chalk.yellow(`Downloading swagger for service ${chalk.green(service)}.`)
  );
  const apiDocsUrl = match(service)
    .with("trip8", () => process.env.NEXT_PUBLIC_API_URL + "/api-docs/json")
    .exhaustive();

  const swaggerFolderPath = path.join(rootPath, "src/api/services", service);

  let timeoutWarningCount = 0;
  const timeout = setInterval(() => {
    console.log(
      chalk.red(
        `Downloading swagger for service ${chalk.green(
          service
        )} takes longer than ${10 + 10 * timeoutWarningCount}s.`
      )
    );
    timeoutWarningCount += 1;
  }, 10000);

  console.log(`curl '${apiDocsUrl}' | jq --sort-keys | prettier --parser=json > ${swaggerFolderPath}/original.swagger.json 
    `);
  const code = await exitCode(
    cp.spawn(
      `curl '${apiDocsUrl}' | jq --sort-keys | prettier --parser=json > ${swaggerFolderPath}/original.swagger.json 
    `,
      { shell: "bash", stdio: "inherit" }
    )
  );

  clearInterval(timeout);

  if (code !== 0) throw new Error(`Swagger download failed with code ${code}.`);
}
