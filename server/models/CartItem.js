module.exports=(sequelize,DataTypes)=>{
    const CartItem=sequelize.define("CartItem",{
        amount: {
            type:DataTypes.INTEGER,
            allowNull:true
        },
       
      
        
            
        
    })

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Product, {
          foreignKey: 'ProductId',
          onDelete: 'CASCADE',
        });
      

      
        CartItem.belongsTo(models.Cart, {
          foreignKey: 'CartId',
          onDelete: 'CASCADE',
        });
      };

    return CartItem
}