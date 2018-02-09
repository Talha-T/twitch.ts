import { expect } from "chai";
import * as express from "express";
import { Server } from "http";

import "mocha";

import { ApiRequester } from "../..";

const sTestGet = JSON.stringify({ r: true });

// start a webserver for testing connections

describe("ApiRequester", () => {
    const ftchP = ApiRequester.requestLib;

    let serverP: Promise<Server>;
    const testPort = 8044;

    before(() => {
        serverP = new Promise<Server>((resolve, reject) => {
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

            const server = app.listen(testPort, (err?: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(server);
                }
            });
        });

        return serverP;
    });

    after(async () => {
        (await serverP).close();
    });

    describe("#get()", () => {
        it("should receive a valid response from server", async () => {
            await serverP;
            const f = await ftchP;
            const r = await f.get(`http://localhost:${testPort}/get`, {});
            expect(r.status).to.equal(200, "response status code should equal 200");
            const j = await r.json();
            expect(JSON.stringify(j)).to.equal(sTestGet);
        });
        it("should not be treated as a POST", async () => {
            await serverP;
            const f = await ftchP;
            const r = await f.get(`http://localhost:${testPort}/post`, {});
            expect(r.status).to.not.equal(200, "response status code should not be equal 200");
        });
    });

    describe("#post()", () => {
        it("should receive a valid response from server", async () => {
            await serverP;
            const f = await ftchP;
            const r = await f.post(`http://localhost:${testPort}/post`, {});
            expect(r.status).to.equal(200, "response status code should equal 200");
            const j = await r.json();
            expect(j).to.haveOwnProperty("r");
            expect(j.r).to.equal(true);
        });
    });

    describe("#put()", () => {
        it("should receive a valid response from server", async () => {
            await serverP;
            const f = await ftchP;
            const r = await f.put(`http://localhost:${testPort}/put`, {});
            expect(r.status).to.equal(200, "response status code should equal 200");
            const j = await r.json();
            expect(JSON.stringify(j)).to.equal(sTestGet);
        });
    });

    describe("#delete()", () => {
        it("should receive a valid response from server", async () => {
            await serverP;
            const f = await ftchP;
            const r = await f.delete(`http://localhost:${testPort}/delete`, {});
            expect(r.status).to.equal(200, "response status code should equal 200");
            const j = await r.json();
            expect(JSON.stringify(j)).to.equal(sTestGet);
        });
    });
});

// TODO: add more tests
