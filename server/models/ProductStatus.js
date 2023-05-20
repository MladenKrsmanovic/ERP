module.exports=(sequelize,DataTypes)=>{
    const ProductStatus=sequelize.define("ProductStatus",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
       
      

        
            
        
    })

    ProductStatus.associate=(models)=>{
        ProductStatus.hasMany(models.Product,{
            foreignKey: 'ProductStatusId',
        });
      };

    return ProductStatus
}