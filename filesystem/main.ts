import * as fileSystem from 'https://deno.land/std/fs/mod.ts';

fileSystem.ensureFileSync('./main.ts');
fileSystem.copySync('./main.ts', './main2.ts');