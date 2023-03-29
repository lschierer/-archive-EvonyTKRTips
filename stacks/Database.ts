import { StackContext, Table } from "sst/constructs";

export function Database({ stack }: StackContext) {
  const table = new Table(stack, "db", {
    fields: {
      uuid: "string",
    },
    primaryIndex: {
      partitionKey: "uuid",
    },
  });

  return table;
}
