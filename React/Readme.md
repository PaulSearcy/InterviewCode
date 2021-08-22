## Notes

Apparently, React 17 really, _really_, changed how importing CSS works. As such I'm just nixing trying to get CSS modules to work atm the moment and going old school plain CSS.

I've intentionally left many parts of this in rough shape. In that I can showcase my thought process in writing code, tests, and how I debug live!

### Tests

_mocha + jsdom + chai + testing-library_

``` npm run test ```

### Quick Start (Docker)

If you've got docker and compose already installed
`docker-compose up -d`

### Manual Start
* Requires being on linux distro 
* Requires node 15+ or whatever node version fully supports ESM modules ( I created this using node 16.6.2 )*

```bash
npm run build && node server.mjs
```

_For windows (using powershell < 7) just remove the && in the script above and run each part sequentially_