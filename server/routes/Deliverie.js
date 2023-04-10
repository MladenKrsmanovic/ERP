const express=require('express')
const router=express.Router()
const {Deliverie}=require('../models');

router.get("/", async (req, res) => {
    const listOfDeliveries = await Deliverie.findAll();
    res.json(listOfDeliveries);
 
});

router.get("/byId/:id",async(req,res)=>{
    const id=req.params.id;
    const deliverie=await Deliverie.findByPk(id);
    res.json(deliverie);
})

router.post("/",async(req,res)=>{

  const deliverie=req.body
  await Deliverie.create(deliverie);
  res.json(deliverie);

});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const deliverie = await Deliverie.findByPk(id);
  if (!deliverie) {
    res.status(404).json({ message: 'Deliverie not found' });
  } else {
    const updatedDeliverie = await deliverie.update(req.body);
    res.json(updatedDeliverie);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deliverie = await Deliverie.findByPk(id);
  if (!deliverie) {
    res.status(404).json({ message: 'Deliverie not found' });
  } else {
    await deliverie.destroy();
    res.json({ message: 'Deliverie deleted successfully' });
  }
});

module.exports=router