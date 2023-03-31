import { StackContext, Bucket } from "sst/constructs";
import * as cdk from "aws-cdk-lib";

export function Storage({ stack, app }) {
  const bucket = new Bucket(stack, "EvonyTKRSite", {
    autoDeleteObjects: true,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "HEAD"],
      },
    ],
  });

  return bucket;
}
