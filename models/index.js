// import all models here
// <<<<<<< profile-routes

// const Clan = require("./clan");

// =======
const User = require("./user");
// const Clan = require("./clan");
const Post = require("./post");
// >>>>>>> main
// const Friends = require("./friends");
// const Feed = require("./feed");
// const Anime = require("./anime");
// const Items = require("./items");
// const { classToInvokable } = require("sequelize/types/utils");

// Reminder- create any additional associations here
//User Associations
User.hasMany(Post, { foreignKey: 'author_id' });
// User.hasMany(Friends, { foreignKey: 'user_id1' });
// User.hasMany(Friends, { foreignKey: 'user_id2' });
// User.hasOne(Clan, { foreignKey: 'clan_id'})
// User.hasMany(Item, { foreignKey: 'user_id' });

//friends association
// User.belongsToMany(User, { as: 'Friends', through: Friends, foreignKey: 'user_id1', otherKey: 'user_id2' });
// Friends.belongsTo(User, { as: 'User1', foreignKey: 'user_id1' });
// Friends.belongsTo(User, { as: 'User2', foreignKey: 'user_id2' });

//feed association
Post.belongsTo(User, { foreignKey: 'author_id' });


// clan association
// Clan.hasMany(User, { foreignKey: 'member_id' });
// Clan.hasMany(Post, { foreignKey: 'post_id' });


// anime content management association
// Anime.hasMany(Episode, { foreignKey: 'anime_id' });
// Anime.hasMany(Review, { foreignKey: 'anime_id' });
// Anime.hasMany(FanArt, { foreignKey: 'anime_id' });


// Marketlace Associations
// Items.belongsTo(User, { foreignKey: 'user_id' });


// export all models here
module.exports = { User, Post};
