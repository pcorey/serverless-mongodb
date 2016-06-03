'use strict';

import _ from "lodash";
import qs from "qs";
import { MongoClient } from "mongodb";

export default (event, context) => {

    let parsed = _.extend(qs.parse(event), {
        createdAt: new Date()
    });

    MongoClient.connect(process.env.MONGODB, (err, db) => {
        if (err) { throw err; }
        db.collection("events").insert(parsed);
        db.close();
        context.done();
    });

};
