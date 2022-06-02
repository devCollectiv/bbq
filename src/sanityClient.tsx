import sanityClient from "@sanity/client";

console.log("NODE.ENV", process.env)
export default sanityClient({
    projectId: "k52jb8ak", // find this at manage.sanity.io or in your sanity.json
    dataset: "development", // this is from those question during 'sanity init'
    apiVersion: '2021-03-25',
    token:"skaSWjcY9DQrd6WDIv5rhdcHAkXn2OHu2tCvWLQaIgUaSKznLQbvGzyQgzksgAnOEDqHNCBp4GiDVdycfncqnNAsS11FYSwZRN0DpG4Z83HxWAs9dbxvyoSi2HPMEzhwh96pTqtV9HsbLA3wZTWUPytk2YYGu2OeT7e0yXB6XOHNh7N8RD7C",
    useCdn: true,
});