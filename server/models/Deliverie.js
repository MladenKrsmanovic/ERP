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

    return Deliverie
}