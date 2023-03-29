import { ulid } from "ulid";
import { Entity, EntityItem } from "electrodb";
import { Dynamo } from "./dynamo";

export * as General from "./article";

export const GeneralEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "General",
      service: "statistics",
    },
    attributes: {
      uuid: {
        type: "string",
        required: true,
        readOnly: true,
      },
      isa: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: false,
      },
      leadership: {
        type: "string",
        required: false,
      },
      attack: {
        type: "string",
        required: false,
      },
      defense: {
        type: "string",
        required: false,
      },
      politics: {
        type: "string",
        required: false,
      }
      strength: {
        type: [ "mounted", "ranged", "ground", "sieged", "wall", "mayor" ]
        requried: false,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "uuid",
          composite: [],
        },
        sk: {
          field: "isa",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type GeneralEntityType = EntityItem<typeof GeneralEntity>;

export async function create(title: string, url: string) {
  const result = await GeneralEntity.create({
    articleID: ulid(),
    title,
    url,
  }).go();

  return result.data;
}

export async function get(articleID: string) {
  const result = await GeneralEntity.get({ articleID }).go();

  return result.data;
}

export async function list() {
  const result = await GeneralEntity.query.primary({}).go();

  return result.data;
}
