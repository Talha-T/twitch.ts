"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const express = require("express");
require("mocha");
const __1 = require("../..");
const sTestGet = JSON.stringify({ r: true });
// start a webserver for testing connections
describe("ApiRequester", () => {
    const ftchP = __1.ApiRequester.requestLib;
    let serverP;
    const testPort = 8044;
    before(() => {
        serverP = new Promise((resolve, reject) => {
            const app = express();
            app.get("/get", (req, resp) => {
                resp.send(sTestGet);
            });
            app.post("/post", (req, resp) => {
                resp.send(JSON.stringify({ r: true, body: req.body }));
            });
            app.put("/put", (req, resp) => {
                resp.send(sTestGet);
            });
            app.delete("/delete", (req, resp) => {
                resp.send(sTestGet);
            });
            const server = app.listen(testPort, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(server);
                }
            });
        });
        return serverP;
    });
    after(() => __awaiter(this, void 0, void 0, function* () {
        (yield serverP).close();
    }));
    describe("#get()", () => {
        it("should receive a valid response from server", () => __awaiter(this, void 0, void 0, function* () {
            yield serverP;
            const f = yield ftchP;
            const r = yield f.get(`http://localhost:${testPort}/get`, {});
            chai_1.expect(r.status).to.equal(200, "response status code should equal 200");
            const j = yield r.json();
            chai_1.expect(JSON.stringify(j)).to.equal(sTestGet);
        }));
        it("should not be treated as a POST", () => __awaiter(this, void 0, void 0, function* () {
            yield serverP;
            const f = yield ftchP;
            const r = yield f.get(`http://localhost:${testPort}/post`, {});
            chai_1.expect(r.status).to.not.equal(200, "response status code should not be equal 200");
        }));
    });
    describe("#post()", () => {
        it("should receive a valid response from server", () => __awaiter(this, void 0, void 0, function* () {
            yield serverP;
            const f = yield ftchP;
            const r = yield f.post(`http://localhost:${testPort}/post`, {});
            chai_1.expect(r.status).to.equal(200, "response status code should equal 200");
            const j = yield r.json();
            chai_1.expect(j).to.haveOwnProperty("r");
            chai_1.expect(j.r).to.equal(true);
        }));
    });
    describe("#put()", () => {
        it("should receive a valid response from server", () => __awaiter(this, void 0, void 0, function* () {
            yield serverP;
            const f = yield ftchP;
            const r = yield f.put(`http://localhost:${testPort}/put`, {});
            chai_1.expect(r.status).to.equal(200, "response status code should equal 200");
            const j = yield r.json();
            chai_1.expect(JSON.stringify(j)).to.equal(sTestGet);
        }));
    });
    describe("#delete()", () => {
        it("should receive a valid response from server", () => __awaiter(this, void 0, void 0, function* () {
            yield serverP;
            const f = yield ftchP;
            const r = yield f.delete(`http://localhost:${testPort}/delete`, {});
            chai_1.expect(r.status).to.equal(200, "response status code should equal 200");
            const j = yield r.json();
            chai_1.expect(JSON.stringify(j)).to.equal(sTestGet);
        }));
    });
});
// TODO: add more tests
//# sourceMappingURL=test.js.map