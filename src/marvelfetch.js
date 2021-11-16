/* eslint-disable react/jsx-filename-extension, react/no-array-index-key */
import React, { useState } from 'react';

function MarvelFetch({ searchText, coOrChar, eOrSw }) {
  fetch('/marvelLookup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: searchText, co_or_cha: coOrChar, e_or_sw: eOrSw }),
  })
    .then((response) => response.json())
    .then((dataPostSave) => {
    // console.log(dataPostSave);
    setSuccessAdd(dataPostSave.successAddServer);
    setSuccessDel(dataPostSave.successDelServer);
    setFailureAdd(dataPostSave.failureAddServer);
    setFavArtists(dataPostSave.favArtistsServer);
    });
}
