const express=require('express')
const router=express.Router()
const {Cart}=require('../models');


router.get("/", async (req, res) => {
    const listOfCarts = await Cart.findAll();
    res.json(listOfCarts);
 
});

router.get("/byId/:id",async(req,res)=>{
    const id=req.params.id;
    const cart=await Cart.findByPk(id);
    res.json(cart);
})

router.post("/",async(req,res)=>{

  const cart=req.body
  await Cart.create(cart);
  res.json(cart);

});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const cart = await Cart.findByPk(id);
  if (!cart) {
    res.status(404).json({ message: 'Cart not found' });
  } else {
    const updatedCart = await cart.update(req.body);
    res.json(updatedCart);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const cart = await Cart.findByPk(id);
  if (!cart) {
    res.status(404).json({ message: 'Cart not found' });
  } else {
    await cart.destroy();
    res.json({ message: 'Cart deleted successfully' });
  }
});

router.get("/byBuyerId/:BuyerId", async (req, res) => {
  const buyerId = req.params.BuyerId;

  try {
    const cart = await Cart.findOne({ where: { BuyerId: buyerId } });
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart by buyer ID:", error);
    res.status(500).json({ error: "Failed to fetch cart by buyer ID" });
  }
});

module.exports=router