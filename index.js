const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const data = [
    {
        id:1,
        name: 'Let\' sLearn Typescript',
        date: '01-04-2021'
    },
    {
        id: 2,
        name: 'Amazon Amplify Onboard',
        date: '02-14-2021:14:00:00'
    }
]
const schema = gql`
type Event @key(fields: "id"){
    id: ID!
    name: String!
    date: String!
    speakers: [SpeakerList]
}
extend type SpeakerList @key(fields: "eventId"){
    eventId: ID! @external
}
type Query{
    getEvent(id: ID!): Event
    getEvents: [Event]!
}
`

const Resolver = {
    Query: {
        getEvent(_, {id}){
            return data.find((ev)=>ev.id==id);
        },
        getEvents: ()=>{
            return data;
        }
    },
    Event: {
        speakers(_root){
            // console.log(_root)
            return [{__typename: "SpeakerList", eventId: _root.id}]
        }
    }
    
}

const server = new ApolloServer({
    schema: buildFederatedSchema([{
        typeDefs: schema,
        resolvers: Resolver 
    }])
});

server.listen(4000).then(({url})=>{
    console.log('Server running at '+url)
    }
)