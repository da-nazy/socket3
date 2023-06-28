import { Router } from "express";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router=Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/cubs', (req, res) => {
    res.sendFile(join(__dirname, 'static/cubs.html'));
  });
  
  router.get('/bears', (req, res) => {
    res.sendFile(join(__dirname, 'static/bears.html'));
  });
  
export default router;