module.exports=(sequelize,DataTypes)=>{
    const Buyer=sequelize.define("Buyer",{
        name: {
            type:DataTypes.STRING,
            allowNull:true
        },
        surname: {
            type:DataTypes.STRING,
            allowNull:true
        },
        jmbg: {
            type:DataTypes.STRING,
            allowNull:true
        },
        email: {
            type:DataTypes.STRING,
            allowNull:true
        },
        address: {
            type:DataTypes.STRING,
            allowNull:true
        },
        password: {
            type:DataTypes.STRING,
            allowNull:true
        },
        is_admin: {
            type:DataTypes.INTEGER,
            allowNull:true
        },

        
            
        
    });
    Buyer.associate=(models)=>{
        Buyer.hasOne(models.Cart,{
            foreignKey: 'BuyerId', 
        });
      };

    return Buyer;
};