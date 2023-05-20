module.exports=(sequelize,DataTypes)=>{
    const Product=sequelize.define("Product",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
       
        description: {
            type:DataTypes.STRING,
            allowNull:true
        },
        price: {
            type:DataTypes.DOUBLE,
            allowNull:true
        },
        manufacturingDate: {
            type:DataTypes.DATE,
            allowNull:true
        },
        serialNumber: {
            type:DataTypes.STRING,
            allowNull:true
        },
        image: {
            type:DataTypes.STRING,
            allowNull:true
        },
        
            
        
    })

    Product.associate=(models)=>{
        Product.hasMany(models.CartItem,{
            foreignKey: 'ProductId',
            onDelete: "cascade",
        });
      

      
        Product.belongsTo(models.Manufacturer, {
          foreignKey: 'ManufacturerId',
          onDelete: 'CASCADE',
        });
      

      
        Product.belongsTo(models.ProductStatus, {
          foreignKey: 'ProductStatusId',
          onDelete: 'CASCADE',
        });
      

    
        Product.belongsTo(models.ProductType, {
          foreignKey: 'ProductTypeId',
          onDelete: 'CASCADE',
        });
      

      };

    return Product
}