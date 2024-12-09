import { createServer, Factory, Model, Registry, Response } from "miragejs"
import { ModelDefinition } from "miragejs/-types"
import Schema from "miragejs/orm/schema"
import { User } from "./feature/users/userTypes"

const UserModel: ModelDefinition<User> = Model.extend({})

const models = {
    user: UserModel,
}


const userFactory = Factory.extend<User>({
    id(i) {
        return i
    },
    name() {
        return ""
    },
    email(){return ""},
    dob(){return new Date()},
    city(){return ""},
    createdOn(){return new Date()},
    mobile(){return ""},
    updatedOn(){return new Date()}
})

export const factories = {
    user: userFactory,
}
type AppRegistry = Registry<typeof models, typeof factories>
type AppSchema = Schema<AppRegistry>

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
       // environment,

        models,

        routes() {
            this.namespace = "api"

            this.get("/users", (schema:AppSchema) => {
                const allUsers = schema.all("user")
                return new Response(200, {}, allUsers)
                 
            })
        },
    })

    return server
}