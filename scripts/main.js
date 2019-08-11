const fs = require('fs');
const _ = require('lodash');

const spotify = require('./spotify');

const data = require('../results_200.json');
const playlist = require('../playlist.json');
const tracks = require('../data/tracks.json');

const flatData = data.reduce((p, c) => [...p, ...c], []);
const counts = {};
flatData
  .map(e => e.split('/')[4])
  .forEach(s => {
    if (!counts[s]) counts[s] = 1;
    counts[s]++;
  });

const getTracks = async () => {
  const songIds = playlist.map(e => e.split('/')[4]);
  const tracks = await spotify.getTracks(songIds);
  fs.writeFileSync('./data/tracks.json', JSON.stringify(tracks));
};

const getArtists = async () => {
  console.log(tracks.length)
  // const artistsIds = _.flatten(tracks.map(track => track.arists.map(artist => artist.id)));
  // console.log(artistsIds)
  // console.log(artistsIds.length)
  // const songIds = playlist.map(e => e.split('/')[4]);
  // const tracks = await spotify.getTracks(songIds);
  // fs.writeFileSync('./data/tracks.json', JSON.stringify(tracks));
};

function main() {
  return getArtists();
}

main()
  .then(() => console.log('done'))
  .catch(console.error);
