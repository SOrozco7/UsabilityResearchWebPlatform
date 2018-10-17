## Running a scheduled server build

Since our instances are running on Docker containers on an Ubuntu server hosted, we can create a cron job to do the work for us.

In order to do this, we have a script with the following information:

```bash
#!/bin/bash

# Change to project directory
cd ~/UsabilityResearchWebPlatform

# Update project to latest release
git checkout develop_fromTCrum
git pull

# Stop containers and delete images
sudo docker stop corpus-web_backend
sudo docker stop corpus-web_frontend
sudo docker rm corpus-web_backend
sudo docker rm corpus-web_frontend

# Build the images with the updated release
cd backend
sudo docker build -t corpus-web_backend .
cd ../frontend
sudo docker build -t corpus-web_frontend .

# Start the containers
sudo docker run --name corpus-web_backend -p 8000:8000 -d corpus-web_backend
sudo docker run --name corpus-web_frontend -p 4200:4200 -d corpus-web_frontend
```

Now we can schedule this to run, say, at 4:05 every day. This is achieved by editing the crontab and specifying to run the file above.

Run `crontab -e` and add the following to the end of the file:

```
SHELL=/bin/bash
5 4 * * * {system path to the shell script}
```

