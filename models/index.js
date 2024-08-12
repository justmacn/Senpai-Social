// import all models here
const User = require("./user");
const Friends = require("./friends");
const Feed = require("./feed");
const Clan = require("./clan");
const Anime = require("./anime");
const Post = require("./post");
const Items = require("./items");
const { classToInvokable } = require("sequelize/types/utils");

// Reminder- create any additional associations here
//User Associations
User.hasMany(Post, { foreignKey: 'post_id' });
User.hasMany(Friends, { foreignKey: 'user_id1' });
User.hasMany(Friends, { foreignKey: 'user_id2' });
Feed.hasMany(Users, { foreignKey: 'user_id' });
User.hasOne(Clan, { foreignKey: 'clan_id'})
User.hasMany(Item, { foreignKey: 'user_id' });
User.hasMany(Transaction, { foreignKey: 'buyer_id', as: 'BuyerTransactions' });
User.hasMany(Transaction, { foreignKey: 'seller_id', as: 'SellerTransactions' });

//friends association
User.belongsToMany(User, { as: 'Friends', through: Friends, foreignKey: 'user_id1', otherKey: 'user_id2' });
Friends.belongsTo(User, { as: 'User1', foreignKey: 'user_id1' });
Friends.belongsTo(User, { as: 'User2', foreignKey: 'user_id2' });

//feed association
Post.belongsTo(User, { foreignKey: 'user_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });


//clan association
Clan.hasMany(Users, { foreignKey: 'user_id' });
Clan.hasMany(Post, { foreignKey: 'post_id' });


//anime content management association
Anime.hasMany(Episode, { foreignKey: 'anime_id' });
Anime.hasMany(Review, { foreignKey: 'anime_id' });
Anime.hasMany(FanArt, { foreignKey: 'anime_id' });


//Marketlace Associations
Items.belongsTo(User, { foreignKey: 'user_id' });
Items.hasMany(Transactions, { foreignKey: 'item_id' });
Orders.belongsTo(Items, { foreignKey: 'item_id' });
Transactions.belongsTo(Orders, { foreignKey: 'order_id' });
Transactions.belongsTo(User, { foreignKey: 'buyer_id', as: 'Buyer' });
Transactions.belongsTo(User, { foreignKey: 'seller_id', as: 'Seller' });

// export all models here
module.exports = { User, Friends, Post, Clan, Anime, Items, Orders, Transactions };
