import { serve } from 'https://deno.land/std/http/server.ts';

const webServer = serve({port: 8000});
console.log('The server started on http://localhost:8000');

for await(const req of webServer){
  req.respond({body: "Hello World"});
}