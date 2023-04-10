module.exports=(sequelize,DataTypes)=>{
    const Cart=sequelize.define("Cart",{
        date: {
            type:DataTypes.DATE,
            allowNull:true
        },
        ammount: {
            type:DataTypes.DOUBLE,
            allowNull:true
        },
     

        
            
        
    });

    Cart.associate=(models)=>{
        Cart.hasOne(models.Deliverie,{
            
        });
      };

      Cart.associate=(models)=>{
        Cart.hasMany(models.CartItem,{
            onDelete: "cascade",
        });
      };

      Cart.associate=(models)=>{
        Cart.hasOne(models.Transaction,{
            
        });
      };

     
    return Cart;
}