/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import agent from 'superagent';
function expand(uri) {
    console.log("/explorer" + uri)
    return "/explorer" + uri
}
export const post = (uri, payload) =>
    new Promise((resolve, reject) => {
        uri = expand(uri)
        agent.post(uri)
            .send(payload)
            .set('Accept', 'application/json')
            .end(withPromiseCallback(resolve, reject))
    });
export const get = (uri) =>
    new Promise((resolve, reject) => {
        uri = expand(uri)
        agent.get(uri)
            .set("Accept", "application/json")
            .end(withPromiseCallback(resolve, reject))
    });
export const put = (uri, payload) =>
    new Promise((resolve, reject) => {
        uri = expand(uri)
        agent.put(uri)
            .send(payload)
            .set('Accept', 'application/json')
            .end(withPromiseCallback(resolve, reject))
    });
export const deleteRequest = (uri, payload) =>
    new Promise((resolve, reject) => {
        uri = expand(uri)
        agent.delete(uri)
            .send(payload)
            .set('Accept', 'application/json')
            .end(withPromiseCallback(resolve, reject))
    });
export const withPromiseCallback = (resolve, reject) => (error, response) => {
    if (error) {
        console.error(error);
        reject({ error });
    } else {
        resolve(response.body);
    }
};