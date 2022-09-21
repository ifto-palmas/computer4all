# computer4everyone [![nodejs-ci](https://github.com/iftopalmas/computer4everyone/actions/workflows/nodejs.yml/badge.svg)](https://github.com/iftopalmas/computer4everyone/actions/workflows/nodejs.yml)

Remote administration of Linux workstations using [LTSP](https://ltsp.org).

## Requirements

```bash
# Node.js 16+
sudo apt install nodejs
```

## Running on dev mode

```bash
npm run dev
```

## Structure

- [labs.yml](config/labs.yml): configuration of the computer laboratories to be remotely managed. 
- [softwares.yml](config/softwares.yml): configuration of the softwares available for install on the remote workstations.
