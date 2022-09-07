#!/bin/bash# Author: Drew Karriker
# Date Created: 08/12/2022
# Date Last Modified: 8/12/2022
# Description: Devops Commands template - will be use to develop pipelines later but just a WIP for now
# Usage: ./start_script.sh

set -eoux pipefail 

docker build . -t nginx-dst-selector:latest
docker run -p 3000:80 nginx-dst-selector:latest & 
<<<<<<< HEAD
open http://localhost:3000
=======
open http://localhost:3000
>>>>>>> main
