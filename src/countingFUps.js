module.exports.checkCountMessedUp = function(reactOrig, user) {
    if (user.id != '510016054391734273') return;

    if (reactOrig._emoji.name == '❌') {
        reactOrig.message.pin();
    }
} 