const express=require('express')
const router=express.Router()
const {CartItem}=require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const {Product}=require('../models')

router.get("/", async (req, res) => {
    const listOfCartItems = await CartItem.findAll();
    res.json(listOfCartItems);
 
});

router.get("/byId/:id",async(req,res)=>{
    const id=req.params.id;
    const cartitem=await CartItem.findByPk(id);
    res.json(cartitem);
})

router.post("/",async(req,res)=>{

  const cartitem=req.body
  await CartItem.create(cartitem);
  res.json(cartitem);

});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const cartitem = await CartItem.findByPk(id);
  if (!cartitem) {
    res.status(404).json({ message: 'Cartitem not found' });
  } else {
    const updatedCartItem = await cartitem.update(req.body);
    res.json(updatedCartItem);
  }
});

router.delete('/:id',validateToken ,async (req, res) => {
  const id = req.params.id;
  const cartitem = await CartItem.findByPk(id);
  if (!cartitem) {
    res.status(404).json({ message: 'Cartitem not found' });
  } else {
    await cartitem.destroy();
    res.json({ message: 'Cartitem deleted successfully' });
  }
});

router.get("/byCartId/:CartId", async (req, res) => {
  const cartId = req.params.CartId;

  try {
    const cartItems = await CartItem.findAll({ where: { CartId: cartId } });
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items by Cart ID:", error);
    res.status(500).json({ error: "Failed to fetch cart items by Cart ID" });
  }
});

module.exports=router