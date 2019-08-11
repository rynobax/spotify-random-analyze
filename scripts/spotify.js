const fetch = require('node-fetch');
const _ = require('lodash');
const { token } = require('./secret');

const wait = ms => new Promise(r => setTimeout(() => r(), ms));

const REQUEST_PER_MINUTE_LIMIT = 60;
const WAIT_PER_REQ = (60 / REQUEST_PER_MINUTE_LIMIT) * 1000;

let lastReqTime = 0;

const spotify = async endpoint => {
  const diff = Date.now() - lastReqTime;
  const waitTime = WAIT_PER_REQ - diff;
  if (waitTime > 0) {
    await wait(waitTime);
  }
  lastReqTime = Date.now();

  return fetch(`https://api.spotify.com/v1/${endpoint}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    if (!res.ok) {
      console.error(res);
      throw Error(res.statusText);
    }
    return res.json();
  });
};

const getTracks = async ids => {
  const chunked = _.chunk(ids, 50);
  let i = 0;
  const returnTracks = [];
  for (const trackIds of chunked) {
    console.log(i++ + ' of ' + chunked.length);
    const { tracks } = await spotify(`tracks?ids=${trackIds.join(',')}`);
    returnTracks.push(...tracks);
  }
  return returnTracks;
};
module.exports.getTracks = getTracks;

const getArtists = async ids => {
  const chunked = _.chunk(ids, 50);
  let i = 0;
  const returnArtists = [];
  for (const artistIds of chunked) {
    console.log(i++ + ' of ' + chunked.length);
    const { artists } = await spotify(`artists?ids=${artistIds.join(',')}`);
    returnArtists.push(...artists);
  }
  return returnArtists;
};
module.exports.getArtists = getArtists;
