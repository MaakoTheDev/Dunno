const { Schema, model } = require('mongoose');

const Info = new Schema({

    GuildID: { type: String },
    ChannelID: { type: String },
    Description: { type: String },
    Invitation: { type: String }

});

module.exports = model("Info", Info, "Info"); 