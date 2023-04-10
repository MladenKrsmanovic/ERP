const express=require('express');
const app=express();
const cors=require("cors");

app.use(express.json())
app.use(cors())

const db=require('./models');

// Routers
const buyerRouter=require('./routes/Buyer')
app.use("/buyers",buyerRouter)

const productRouter=require('./routes/Product')
app.use("/products",productRouter)

const manufacturerRouter=require('./routes/Manufacturer')
app.use("/manufacturers",manufacturerRouter)

const deliverieRouter=require('./routes/Deliverie')
app.use("/deliveries",deliverieRouter)

const cartRouter=require('./routes/Cart')
app.use("/carts",cartRouter)

const transactionRouter=require('./routes/Transaction')
app.use("/transactions",transactionRouter)

const cartitemRouter=require('./routes/CartItem')
app.use("/cartitems",cartitemRouter)


db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server running on port 3001");
    });
});
