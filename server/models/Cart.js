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
          foreignKey: 'CartId'
        });
      

      
        Cart.hasMany(models.CartItem,{
          foreignKey: 'CartId',
            onDelete: "cascade",
        });
      

     
        Cart.hasOne(models.Transaction,{
          foreignKey: 'CartId'
        });
      

     
        Cart.belongsTo(models.PaymentType, {
          foreignKey: 'PaymentTypeId',
          onDelete: 'CASCADE',
        });
      

     
        Cart.belongsTo(models.Buyer, {
          foreignKey: 'BuyerId'
          
        });
      };

     
    return Cart;
}