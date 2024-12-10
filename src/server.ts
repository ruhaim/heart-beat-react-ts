import { createServer, Factory, Model, Registry, Request, Response } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";
import { User } from "./feature/users/userTypes";

const UserModel: ModelDefinition<User> = Model.extend({});

const models = {
    user: UserModel,
};

const userFactory = Factory.extend<User>({
    id(i) {
        return i;
    },
    name(i) {
        return `Name ${i}`;
    },
    email(i) {
        return `mail${i}@email.com`;
    },
    dob() {
        return new Date();
    },
    city() {
        return "";
    },
    createdOn() {
        return new Date();
    },
    mobile() {
        return "";
    },
    updatedOn() {
        return new Date();
    },
    gender() {
        return Math.round(Math.random()) === 1 ? 'M' : 'F'
    }
});

export const factories = {
    user: userFactory,
};
type AppRegistry = Registry<typeof models, typeof factories>;
type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        // environment,
        models,
        factories,
        seeds(server) {
            server.createList("user", 1000);
        },
        routes() {
            this.namespace = "api";

            this.get("/users", (schema: AppSchema) => {
                const users = schema.all("user");
                return users;
            });

            this.post("/users", (schema: AppSchema, request: Request) => {
                let attrs = JSON.parse(request.requestBody)
                return schema.create("user", attrs)

            });
        },
    });

    return server;
}
