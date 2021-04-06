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
let d = {id: '2'}
const result = data.filter((_speaker)=>_speaker.events.includes(parseInt(d.id)));
console.log(result);

