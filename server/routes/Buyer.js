const express=require('express')
const router=express.Router()
const {Buyer}=require('../models');
const bcrypt = require("bcrypt");


  router.get("/", async (req, res) => {
    const listOfBuyers = await Buyer.findAll();
    res.json(listOfBuyers);
 
});

router.get("/byId/:id",async(req,res)=>{
    const id=req.params.id;
    const buyer=await Buyer.findByPk(id);
    res.json(buyer);
})

/*

router.post("/",async(req,res)=>{

  const buyer=req.body
  await Buyer.create(buyer);
  res.json(buyer);

});

*/

router.post("/auth", async (req, res) => {
  const { name, surname,jmbg,email,address,password,is_admin } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Buyer.create({
      name: name,
      surname:surname,
      jmbg:jmbg,
      email:email,
      address:address,
      password: hash,
      is_admin:is_admin
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const buyer = await Buyer.findOne({ where: { email: email } });

  if (!buyer) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, buyer.password).then((match) => {
    if (!match) res.json({ error: "Wrong email And Password Combination" });

    res.json("YOU LOGGED IN!!!");
  });
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const buyer = await Buyer.findByPk(id);
  if (!buyer) {
    res.status(404).json({ message: 'Buyer not found' });
  } else {
    const updatedBuyer = await buyer.update(req.body);
    res.json(updatedBuyer);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const buyer = await Buyer.findByPk(id);
  if (!buyer) {
    res.status(404).json({ message: 'Buyer not found' });
  } else {
    await buyer.destroy();
    res.json({ message: 'Buyer deleted successfully' });
  }
});

module.exports=router