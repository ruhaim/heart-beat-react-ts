import { faker } from "@faker-js/faker";
import { createServer, Model, Registry, Request } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

import { User } from "./feature/users/userTypes";

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
    dob: faker.date.birthdate().toDateString(),
    city: faker.helpers.arrayElement<string>([
      "California",
      "Singapore",
      "New Delhi",
      "Beijing",
      "Toronto",
    ]),
    createdOn: faker.date.past({ refDate: updatedOn }).toDateString(),
    updatedOn: updatedOn.toDateString(),
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

      this.post("/users", (schema: AppSchema, request: Request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("user", attrs);
      });
    },
  });

  return server;
}
