import { faker } from "@faker-js/faker";
import { createServer, Model, Registry, Request, Response } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

import { User } from "./feature/users-list/userTypes";

const UserModel: ModelDefinition<User> = Model.extend({});

const models = {
  user: UserModel,
};

const createFakeUser = (): Omit<User, "id"> => {
  const gender = faker.person.sexType();
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);
  const updatedOn = faker.date.past();
  return {
    gender,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ lastName, firstName }),
    dob: faker.date.birthdate().toISOString().substring(0, 10),
    city: faker.helpers.arrayElement<string>([
      "California",
      "Singapore",
      "New Delhi",
      "Beijing",
      "Toronto",
    ]),
    createdOn: faker.date.past({ refDate: updatedOn }).toISOString(),
    updatedOn: updatedOn.toISOString(),
    mobile: faker.phone.number(),
  };
};

export const factories = {};
type AppRegistry = Registry<typeof models, typeof factories>;
type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = "test" } = {}) {
  const server = createServer({
    environment,
    models,
    factories,
    seeds(server) {
      Array.from({ length: 1000 }, () => {
        server.create("user", createFakeUser());
      });
    },
    routes() {
      this.namespace = "api";

      this.get("/users", (schema: AppSchema) => {
        const users = schema.all("user");
        return users;
      });

      this.get("users/:id", (schema: AppSchema, request: Request) => {
        const id = request.params.id;
        return schema.find("user", id);
      });

      this.post("/users", (schema: AppSchema, request: Request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("user", attrs);
      });

      this.patch("/users/:id", (schema: AppSchema, request: Request) => {
        const id = request.params?.id;
        try {
          const attrs = JSON.parse(request.requestBody);
          const user = schema.find("user", id);
          user?.update("id", attrs);
        } catch (e) {
          return new Response(400, {}, { errors: [e] });
        }
        return new Response(200, { "content-id": id }, { id });
      });

      this.delete("/users/:id", (schema, request) => {
        const id = request.params?.id;
        try {
          schema.find("user", id)?.destroy();
        } catch (e) {
          return new Response(400, {}, { errors: [e] });
        }
        return new Response(200, { "content-id": id }, { id });
      });
    },
  });

  return server;
}
