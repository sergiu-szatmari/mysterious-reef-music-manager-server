# Music Manager API

### [baseURL] = [host]/api

## Artists

- Find all: 
    - GET @ _**[baseURL]/artists**_
    
- Find one:
    - GET @ _**[baseURL]/artists/:id**_
    
- Insert artist:
    - POST @ _**[baseURL]/artists**_
    - Body: _**{ name: "Some name", birthDate: "2020-01-01", originCountry?: "Origin country" }**_
    
- Update artist:
    - PUT @ _**[baseURL]/artists/:id**_
    - Body: _**{ name: "New name", birthDate: "2020-01-01", originCountry: "New orig. country" }**_

- Remove artist:
    - DELETE @ _**[baseURL]/artists/:id**_
    
---

## Songs

- Find all:
    - GET @ _**[baseURL]/songs**_
    
- Find one:
    - GET @ _**[baseURL]/songs/:id**_
    
- Insert new song:
    - POST @ _**[baseURL]/songs**_
    - Body: _**{ name: "Song name", duration: 120, genre: [ "genre1", "genre2" ], bpm: 90, artistID: "123asd", dateAdded: "2020-01-01" }**_
    
- Update song:
    - PUT @ _**[baseURL]/songs/:id**_
    - Body: _**{ name: "New name", duration: 120, genre: [ "old genre 1", "new genre 2" ], bpm: 90, artistID: "123asd", dateAdded: "2020-01-01" }**_
    
- Remove song:
    - DELETE @ _**[baseURL]/songs/:id**_
    
---

## Playlists

---

## Libraries

---
