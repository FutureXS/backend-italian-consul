import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('.well-known/pki-validation')
export class WellKnownController {
  @Get(':filename')
  serveFile(@Res() res: Response, filename: string) {
    try {
      const fileContent = fs.readFileSync(`./${filename}`);
      res.contentType('text/plain'); // You can change the content type as needed
      res.send(fileContent);
    } catch (error) {
      res.status(404).send('File not found');
    }
  }
}
