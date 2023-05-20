module.exports=(sequelize,DataTypes)=>{
    const Deliverie=sequelize.define("Deliverie",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
       
        deliveryDate: {
            type:DataTypes.DATE,
            allowNull:true
        },
        price: {
            type:DataTypes.DOUBLE,
            allowNull:true
        },
        
        
            
        
    })

    Deliverie.associate = (models) => {
        Deliverie.belongsTo(models.Cart, {
          foreignKey: 'CartId'
          
        });
      };

    return Deliverie
}