# computer4all

Remote administration of Linux workstations using LTSP.

## Requirements

```bash
# Node.js 16+
sudo apt install nodejs
```

## Running

- Duplicate .env.dist as .env
- Run `npm start`

## Structure

- [labs.yml](labs.yml): configuration of the computer laboratories to be remotely managed. 
- [softwares.yml](softwares.yml): configuration of the softwares available for install on the remote workstations.