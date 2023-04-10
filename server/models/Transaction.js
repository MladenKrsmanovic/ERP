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

    return Transaction
}