// import all models here
const User = require("./user");
const Friends = require("./friends");
const Post = require("./feed");
const Clan = require("./clan");
const Anime = require("./anime");
const Comment = require("./comment");
const { classToInvokable } = require("sequelize/types/utils");

// Reminder- create any additional associations here
//User Associations
User.hasMany(Post, { foreignKey: 'user_id' });
User.hasMany(Friends, { foreignKey: 'user_id1' });
User.hasMany(Friends, { foreignKey: 'user_id2' });
User.hasMany(FanArt, { foreignKey: 'user_id' });
Feed.hasMany(Users, { foreignKey: 'user_id' });
User.hasOne(Clan, { foreignKey: 'clan_id'})

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


// export all models here
module.exports = { User, Friends, Post, Clan, Anime };
