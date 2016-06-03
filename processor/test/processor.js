import { Processor, parseEvent } from "../lib/processor";
import { expect } from "chai";
import td from "testdouble";

describe("Processor", function() {

    afterEach(function() {
        td.reset();
    });

    it ("parses events", function() {
        let events = [
            "name=Foo0&email=bar%40email.com&description=desc",
            "name=Foo1&email=bar%40email.com&description=desc",
            "name=Foo2&email=bar%40email.com&description=desc"
        ];


        events.forEach(function(event, index) {
            let parsed = parseEvent(event);
            expect(parsed).to.deep.equal({
                name: "Foo" + index,
                email: "bar@email.com",
                description: "desc"
            });
        });
    });

    it("processes events", function() {
        let repository = td.object(['save']);
        let processor = Processor(repository);
        let events = [
            "name=Foo0&email=bar%40email.com&description=desc",
            "name=Foo1&email=bar%40email.com&description=desc",
            "name=Foo2&email=bar%40email.com&description=desc"
        ];

        events.forEach(function(event, index) {
            processor.process(event);
            td.verify(repository.save({
                name: "Foo" + index,
                email: "bar@email.com",
                description: "desc"
            }));
        });
    });

});
