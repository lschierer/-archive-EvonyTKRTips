import { use, StackContext, StaticSite } from "sst/constructs";
import { API } from "./Api";

import { RemovalPolicy } from "aws-cdk-lib";
import {
  ViewerProtocolPolicy,
  AllowedMethods,
} from "aws-cdk-lib/aws-cloudfront";


export function Web({ stack }: StackContext) {
  const ApiUrl = use (API);
  const site = new StaticSite(stack, "Site", {
    path: "packages/web/",
    cdk: {
      bucket: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      distribution: {
        defaultBehavior: {
          viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
          allowedMethods: AllowedMethods.ALLOW_ALL,
        },
      },
    },
    environment: {
      VITE_APP_API_URL: ApiUrl,
    },
    vite: {
      types: "types/my-env.d.ts",
    },
    customDomain: {
      domainName:
        stack.stage === "prod" ? "evonytkrtips.net" : undefined,
      domainAlias: stack.stage === "prod" ? "www.evonytkrtips.net" : undefined,
    },
   });
}
