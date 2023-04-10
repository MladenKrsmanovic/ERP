const express=require('express')
const router=express.Router()
const {Manufacturer}=require('../models');

router.get("/", async (req, res) => {
    const listOfManus = await Manufacturer.findAll();
    res.json(listOfManus);
 
});

router.get("/byId/:id",async(req,res)=>{
    const id=req.params.id;
    const manufacturer=await Manufacturer.findByPk(id);
    res.json(manufacturer);
})

router.post("/",async(req,res)=>{

  const manufacturer=req.body
  await Manufacturer.create(manufacturer);
  res.json(manufacturer);

});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const manufacturer = await Manufacturer.findByPk(id);
  if (!manufacturer) {
    res.status(404).json({ message: 'Manufacture not found' });
  } else {
    const updatedManufacturer = await manufacturer.update(req.body);
    res.json(updatedManufacturer);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const manufacturer = await Manufacturer.findByPk(id);
  if (!manufacturer) {
    res.status(404).json({ message: 'Manufacturer not found' });
  } else {
    await manufacturer.destroy();
    res.json({ message: 'Manufacturer deleted successfully' });
  }
});

module.exports=router