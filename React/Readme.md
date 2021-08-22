## Notes

Apparently, React 17 really, _really_, changed how importing CSS works. As such I'm just nixing trying to get CSS modules to work atm the moment and going old school plain CSS.

I've intentionally left many parts of this in rough shape. In that I can showcase my thought process in writing code, tests, and how I debug live!

### Start up
```bash
./node_modules/.bin/webpack --watch
node server.mjs
```

Going to create a Dockerfile to simplify this