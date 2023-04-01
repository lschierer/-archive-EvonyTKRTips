import { SSTConfig } from "sst";
import { API } from "./stacks/Api";
import { Web } from "./stacks/Web";

export default {
  config(_input) {
    return {
      name: "EvonyTKRTips",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app
    .stack(API)
    .stack(Web);
  }
} satisfies SSTConfig;
