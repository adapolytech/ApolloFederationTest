const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const data = [
    {
        id:1,
        name: 'Sebastien Stormack',
        job: 'Cloud Solution Architect',
        events: [1,2]
    },
    {
        id: 2,
        name: 'Jason Lengserf',
        job: 'Software engineer',
        events: [2]
    }
]
const schema = gql`
type Speaker @key(fields:"id"){
    id: ID!
    name: String!
    job: String!
    events: [Int]!
}
type Query{
    getSpeaker(id: ID!): Speaker
    getSpeakers: [Speaker]!
}
type SpeakerList @key(fields: "eventId"){
    eventId: ID!
    speakers: [Speaker]
}
`

const Resolver = {
    Query: {
        getSpeaker(_, {id}){
            return data.find((ev)=>ev.id==id);
        },
        getSpeakers: ()=>{
            return data;
        }
    },
    SpeakerList: {
        __resolveReference(speaker){
            // console.log(speaker)
            let result = data.filter((_speaker)=>_speaker.events.includes(parseInt(speaker.eventId)));
            // console.log(result);
            const ret = {eventId: speaker.eventId, speakers: result};
            console.log(ret);
            return ret
        }
    }
    
}

const server = new ApolloServer({
    schema: buildFederatedSchema([{
        typeDefs: schema,
        resolvers: Resolver 
    }])
});

server.listen(4001).then(({url})=>{
    console.log('Server running at '+url)
    }
)