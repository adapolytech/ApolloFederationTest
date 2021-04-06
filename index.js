const {ApolloServer} = require('apollo-server');
const {ApolloGateway} = require('@apollo/gateway');

const gateway = new ApolloGateway({
    serviceList: [
        {
            name: 'Event', url:'http://localhost:4000'
        },
        {
            name: 'Speaker', url: 'http://localhost:4001'
        }
    ]
});

(async ()=>{
    const {schema, executor } = await gateway.load();
    const server = new ApolloServer({ schema, executor });

    server.listen(4002).then(({ url }) => {
        console.log(`🎿 Snowtooth Gateway available at ${url}`);
    });
})();