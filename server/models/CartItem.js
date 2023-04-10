module.exports=(sequelize,DataTypes)=>{
    const CartItem=sequelize.define("CartItem",{
        amount: {
            type:DataTypes.INTEGER,
            allowNull:true
        },
       
      
        
            
        
    })

    return CartItem
}