# webm-duration

> Get duration (in seconds) of .webm file.

## Install

```sh
npm install webm-duration
```
or

```sh
yarn add webm-duration
```

## Usage

```js
import webmDuration from 'webm-duration';

const fixture = fs.readFileSync('sample.webm');
webmDuration(fixture);
//=> 13.35
```

## API

### webmDuration(input, options?)

#### input

Type: `ArrayBuffer | ArrayBufferView | Array`

File data.

Fin.
