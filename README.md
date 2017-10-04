# TypeScriptCosmosSpike

Azure Functions Sample with TypeScript and Cosmos DB as a spike solution. 
I try to write Azure Functions with TypeScript with CosmosDB connection. 

# Usage

## create an Cosmos DB 

Create an Cosmos DB and Collection for sample.

## create a local.settings.json

You just clone this repo. Then create `local.settings.json` on your root of this repo. 

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "COSMOS_DB_HOST": "YOUR_COSMOS_DB_HOST",
    "COSMOS_DB_KEY": "YOUR_COSMOS_DB_KEY"
  }
}
```
## compile typescript

You need to install typescript, if you don't have. You can refer "Start from Zero" section.

```
cd HttpTriggerJS
tsc -p . 
cd ..
```

`tsc -p .` compiles your ts code into javascript. Also `tsc -p . -w` will automatically compile a ts file into the js file.

## start Azure Functions locally

Then execute it 

```
func host start
```

You can try via browser, you can see if it is connected with your db. You can see your collection name on the browser.

# Start from Zero

If you want to start to write your own typescript code, you can follow this instruction.
Get the Azure Function CLI (for any platform. I use Mac)

[Develop Azure Functions on any platform](https://blogs.msdn.microsoft.com/appserviceteam/2017/09/25/develop-azure-functions-on-any-platform/)

## Create a function App

You can create an function App. It can have a several functions. It will create several files. 

```
$ func init
Writing .gitignore
Writing host.json
Writing local.settings.json
Created launch.json

Initialized empty Git repository in /Users/ushio/Codes/AzureFunctions/some/.git/
```

## Create a function

This command craete a template for Azure Functions. 

```
$ func new
Select a language: 
1. C#
2. JavaScript
Choose option: 2
JavaScript
Select a template: 
1. BlobTrigger
2. HttpTrigger
3. QueueTrigger
4. TimerTrigger
Choose option: 2
HttpTrigger
Function name: [HttpTriggerJS] 
Writing /Users/ushio/Codes/AzureFunctions/some/HttpTriggerJS/index.js
Writing /Users/ushio/Codes/AzureFunctions/some/HttpTriggerJS/sample.dat
Writing /Users/ushio/Codes/AzureFunctions/some/HttpTriggerJS/function.json
```

## Create an environment

initalize npm and typescript.

```
cd HttpTriggerJS
npm init
tsc --init
cp index.js index.ts
```

## Enabling TypeScript

Change the index.ts function definition as


```ts
export async function run (context: any, req: any) {
```

Also, you need to change `typeconfig.json` to add lib and change the target version. If the typescript version is old, you can't compile this function with async keyword.


```
{
  "compilerOptions": {
    /* Basic Options */                       
    "target": "ES2015",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    "lib": [ "es2015"],   
```

## can't find `process` error

If you find the following error

```
index.ts(7,34): error TS2304: Cannot find name 'process'.
index.ts(7,65): error TS2304: Cannot find name 'process'.
```

You can fix by this

```
npm install --save-dev @types/node
```

You can refer this discussion.

* [TypeScript: read arguments from command line - error TS2304: Cannot find name 'process'](https://stackoverflow.com/questions/35551185/typescript-read-arguments-from-command-line-error-ts2304-cannot-find-name-p)

Also the following error, is fixed by `typeconfig.json` setting which I worte before.

```
error TS2705: An async function or method in ES5/ES3 requires the 'Promise' constructor.  Make sure you have a declaration for the 'Promise' constructor or include 'ES2015' in your `--lib` option.
```

# TODO

I comment out `client.getAccountInfoAsync()` method. It might be a bug. I submitt an issue to the github.

[TypeError: Cannot read property 'getDatabaseAccount' of undefined](https://github.com/jcormont/documentdb-typescript/issues/14)
