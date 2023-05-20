const express=require('express')
const router=express.Router()
const {Transaction}=require('../models');
const { requireAdmin } = require("../middlewares/AuthorMiddleware");

router.get("/", async (req, res) => {
    const listOfTransactions = await Transaction.findAll();
    res.json(listOfTransactions);
 
});

router.get("/byId/:id",async(req,res)=>{
    const id=req.params.id;
    const transaction=await Transaction.findByPk(id);
    res.json(transaction);
})

router.post("/",async(req,res)=>{

  const transaction=req.body
  await Transaction.create(transaction);
  res.json(transaction);

});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findByPk(id);
  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
  } else {
    const updatedTransaction = await transaction.update(req.body);
    res.json(updatedTransaction);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findByPk(id);
  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
  } else {
    await transaction.destroy();
    res.json({ message: 'Transaction deleted successfully' });
  }
});

module.exports=router