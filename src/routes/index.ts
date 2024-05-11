import { Router } from "express";
import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/usuarios', ApiController.createUsuario);
router.get('/usuarios', ApiController.listUsuarios);
router.get('/usuarios/:id', ApiController.listUsuario);
router.put('/usuarios/:id', ApiController.updateUsuario);
router.delete('/usuarios/:id', ApiController.deleteUsuario);

export default router;