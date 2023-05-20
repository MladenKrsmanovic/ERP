module.exports=(sequelize,DataTypes)=>{
    const PaymentType=sequelize.define("PaymentType",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
       
      

        
            
        
    });
    PaymentType.associate=(models)=>{
        PaymentType.hasOne(models.Cart,{
            foreignKey: 'PaymentTypeId',
        });
      };

    return PaymentType
}