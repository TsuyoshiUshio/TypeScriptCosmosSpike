import * as DB from "documentdb-typescript";


export async function run (context: any, req: any) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const client = new DB.Client(process.env["COSMOS_DB_HOST"], process.env["COSMOS_DB_KEY"]);
    client.enableConsoleLog = true;

    await client.openAsync();
    console.log(await client.getAccountInfoAsync());
    var dbs = await client.listDatabasesAsync();

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello! " + (req.query.name || req.body.name) + dbs.map(db => db.id)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};