const express=require('express')
const router=express.Router()
const {Buyer}=require('../models');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

  router.get("/",validateToken ,async (req, res) => {
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

    const accessToken = sign(
      { email: buyer.email, id: buyer.id },
      "importantsecret"
    );

    res.json(accessToken);
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

router.get("/auth", validateToken, (req, res) => {
  res.json(req.buyer);
});

router.patch("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Buyer.findOne({ where: { email: req.buyer.email } });

  bcrypt.compare(oldPassword, buyer.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Buyer.update(
        { password: hash },
        { where: { email: req.buyer.email } }
      );
      res.json("SUCCESS");
    });
  });
});

module.exports=router