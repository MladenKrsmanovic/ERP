const express=require('express')
const router=express.Router()
const {Product,ProductStatus,ProductType,Manufacturer}=require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require('sequelize');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

router.get('/', async (req, res) => {
  const { keyword, page, limit } = req.query;
  const currentPage = parseInt(page) || DEFAULT_PAGE;
  const itemsPerPage = parseInt(limit) || DEFAULT_LIMIT;

  let whereCondition = {};

  if (keyword) {
    whereCondition = {
      name: {
        [Op.like]: `%${keyword}%`,
      },
    };
  }

  const totalCount = await Product.count({ where: whereCondition });
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  const listOfProducts = await Product.findAll({
    where: whereCondition,
    offset,
    limit: itemsPerPage,
    

  });

  res.json({
    products: listOfProducts,
    currentPage,
    totalPages,
    totalCount,
  });
});

router.get("/byId/:id",async(req,res)=>{
  const id=req.params.id;
  const product=await Product.findByPk(id,{
    include: [
      {
        model: ProductType,
        attributes: ['name'],
      },
      {
        model: ProductStatus,
        attributes: ['name'],
      },
      {
        model: Manufacturer,
        attributes: ['name'],
      },
    ],
  });
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