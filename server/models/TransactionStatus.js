module.exports=(sequelize,DataTypes)=>{
    const TransactionStatus=sequelize.define("TransactionStatus",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
       
      

        
            
        
    });

    TransactionStatus.associate=(models)=>{
        TransactionStatus.hasMany(models.Transaction,{
            foreignKey: 'TransactionStatusId',
        });
      };

    return TransactionStatus
}