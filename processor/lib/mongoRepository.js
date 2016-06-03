let MongoClient = require("mongodb").MongoClient;

let MongoRepository = function(connectionString) {

    function save(questionnaire, callback) {
        MongoClient.connect(connectionString, (err, db) => {
            if (err) {throw err;}
            db.collection("questionnaires").insert(questionnaire);
            db.close();
            callback();
        });
    }

    return {
        save
    };
};

export {
    MongoRepository
};
