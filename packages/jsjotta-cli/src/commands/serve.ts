import path from 'path';
import { Command } from 'commander';
import { serve } from '@jsjotta/jsjotta-api';

const isProduction = process.env.NODE_ENV === 'production';

interface NodeError extends Error {
  code?: string;
}

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(
    async (filename = 'jsjotta-intro.json', options: { port: string }) => {
      try {
        const dir = path.join(process.cwd(), path.dirname(filename));

        await serve({
          dir,
          filename,
          isDev: !isProduction,
          port: parseInt(options.port),
        });

        console.log(
          `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
        );
      } catch (error) {
        const err = error as NodeError;

        if (err.code === 'EADDRINUSE') {
          console.error(
            `😢 ERROR: Port ${options.port} is in use - try running on a different port using 'j-scribe serve -p <your-port-here>'`
          );
        } else {
          console.log('Heres the problem', err.message);
        }
        process.exit(1);
      }
    }
  );
