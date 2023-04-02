import { Bucket, use, StackContext, StaticSite } from "sst/constructs";
import * as cdk from "aws-cdk-lib";

import { RemovalPolicy } from "aws-cdk-lib";
import {
  ViewerProtocolPolicy,
  AllowedMethods,
} from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";


export function Web({ stack }: StackContext) {
  const site = new StaticSite(stack, "Site", {
    path: "packages/web/dist/",
    indexPage: "index.html",
    cdk: {
      bucket: {
        cors: [
          {
            allowedMethods: ["GET", "HEAD"],
            allowedOrigins: [
              "https://www.evonytkrtips.net",
              "https://evonytkrtips.net",
            ],
          },
        ],
        autoDeleteObjects: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      },
      distribution: {
        defaultBehavior: {
          viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
        },
      },
    },
    customDomain: {
      domainName: "evonytkrtips.net",
      domainAlias: "www.evonytkrtips.net",
    },
  });

}
