import { App } from "@octokit/app";

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!.replace(/\\n/g, "\n"),
});

export async function getOctokit() {
  const installationId = parseInt(process.env.GITHUB_INSTALLATION_ID!);
  return await app.getInstallationOctokit(installationId);
}
