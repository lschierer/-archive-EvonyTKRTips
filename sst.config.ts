import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { Database } from "./stacks/Database";

export default {
  config(_input) {
    return {
      name: "EvonyTKRTips",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app
      .stack(Database)
      .stack(API);
  }
} satisfies SSTConfig;
