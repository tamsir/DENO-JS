import * as dateLib from 'https://deno.land/std/datetime/mod.ts';
import { Server } from 'https://deno.land/std/http/server.ts';

console.log(dateLib.weekOfYear(new Date));