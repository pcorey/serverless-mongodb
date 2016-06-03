'use strict';

import { Processor } from "./lib/processor";
import { MongoRepository } from "./lib/mongoRepository";

let repository = MongoRepository("TODO: changeme");

module.exports.handler = function(event, context, cb) {

    let processor = Processor(repository);
    processor.process(event, () => cb(null, {message: "Ok!"}));

};
