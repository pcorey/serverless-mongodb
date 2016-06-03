import qs from "qs";

function parseEvent(event) {
    return qs.parse(event);
}

let Processor = function(repository) {

    function process(event, callback) {
        let parsed = parseEvent(event);
        repository.save(parsed, callback);
    }

    return {
        process
    };
}

export { Processor, parseEvent };
