import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controller/item.controller';

const router = express.Router();

router.get('/',  getAllItems);
router.get('/:id',  getItemById);
router.post('/',  createItem);
router.patch('/:id',  updateItem);
router.delete('/:id', deleteItem)

export default router;