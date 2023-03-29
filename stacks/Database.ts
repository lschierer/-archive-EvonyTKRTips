import { StackContext, Table } from "sst/constructs";

export function Database({ stack }: StackContext) {
  const table = new Table(stack, "db", {
    fields: {
    	name: "string",
    },
    primaryIndex: {
    	partitionKey: "name",
    },
  });

  return table;
}
