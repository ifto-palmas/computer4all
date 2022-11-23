# computer4everyone [![nodejs-ci](https://github.com/iftopalmas/computer4everyone/actions/workflows/nodejs.yml/badge.svg)](https://github.com/iftopalmas/computer4everyone/actions/workflows/nodejs.yml)

Remote administration of Linux workstations using [LTSP](https://ltsp.org).

## Requirements

```bash
# Node.js 16+
sudo apt update
sudo apt install nodejs
```

## Running on dev mode

```bash
npm run dev
```

## Accessing the web application

Open a browser at http://localhost:8080

## Project Structure

- [labs.yml](config/labs.yml): configuration of the computer laboratories to be remotely managed. 
- [softwares.yml](config/softwares.yml): configuration of the softwares available for install on the remote workstations.
