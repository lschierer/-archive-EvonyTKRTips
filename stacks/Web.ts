import { use, StackContext, StaticSite } from "sst/constructs";
import { Storage } from "./Storage";

export function Web({ stack, app }) {

  const bucket = use(Storage);

  const site = new StaticSite(stack, "site", {
    bind: [bucket],
    path: ".",
    buildCommand: "npm run build:hugo",
    buildOutput: "public",
    environment: {
	    VITE_APP_API_URL: app.url,
	    REACT_APP_REGION: stack.region,
	    REACT_APP_BUCKET: bucket.bucketName,
    },
  });

  stack.addOutputs({
    SITE: site.url || "https://localhost:3000",
  });
}
