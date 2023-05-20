module.exports=(sequelize,DataTypes)=>{
    const Manufacturer=sequelize.define("Manufacturer",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
       
        email: {
            type:DataTypes.STRING,
            allowNull:true
        },
        phone: {
            type:DataTypes.STRING,
            allowNull:true
        },

        
            
        
    })

    Manufacturer.associate=(models)=>{
        Manufacturer.hasMany(models.Product,{
            foreignKey: 'ManufacturerId',
            onDelete: "cascade",
        });
      };

    return Manufacturer
}