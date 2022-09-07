#!/usr/bin/env pwsh
# Date Created: 08/12/2022
# Date Last Modified: 8/12/2022
# Description: Devops Commands template powershell - will be use to develop pipelines later but just a WIP for now
# Usage: ./start_script.ps1

docker build . -t nginx-dst-selector:latest
docker run -p 3000:80 nginx-dst-selector:latest
<<<<<<< HEAD
Start-Process http://localhost:3000
=======
Start-Process http://localhost:3000
>>>>>>> main
