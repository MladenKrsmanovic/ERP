module.exports=(sequelize,DataTypes)=>{
    const Transaction=sequelize.define("Transaction",{
        transactionDate: {
            type:DataTypes.DATE,
            allowNull:true
        },
       
        paymentProcessor: {
            type:DataTypes.STRING,
            allowNull:true
        },
        currency: {
            type:DataTypes.STRING,
            allowNull:true
        },
        
        
            
        
    })

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.TransactionStatus, {
          foreignKey: 'TransactionStatusId',
          onDelete: 'CASCADE',
        });
      

     
        Transaction.belongsTo(models.Cart, {
          foreignKey: 'CartId'
          
        });
      };

    return Transaction
}