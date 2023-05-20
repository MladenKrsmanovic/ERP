module.exports=(sequelize,DataTypes)=>{
    const ProductType=sequelize.define("ProductType",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
       
      

        
            
        
    })

    ProductType.associate=(models)=>{
        ProductType.hasMany(models.Product,{
            foreignKey: 'ProductTypeId',
            onDelete: "cascade",
        });
      };

    return ProductType
}