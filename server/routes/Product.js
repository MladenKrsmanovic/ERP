const express=require('express')
const router=express.Router()
const {Product}=require('../models');

router.get("/", async (req, res) => {
    const listOfProducts = await Product.findAll();
    res.json(listOfProducts);
 
});

router.get("/byId/:id",async(req,res)=>{
    const id=req.params.id;
    const product=await Product.findByPk(id);
    res.json(product);
})

router.post("/",async(req,res)=>{

  const product=req.body
  await Product.create(product);
  res.json(product);

});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    const updatedProduct = await product.update(req.body);
    res.json(updatedProduct);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  }
});

module.exports=router