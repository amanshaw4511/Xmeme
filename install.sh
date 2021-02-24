# update and upgrade
sudo apt update
sudo apt upgrade -y

# install java 11
sudo apt install openjdk-11-jre -y
sudo apt install maven -y

sudo apt install npm -y

### install postgres ############################
sudo apt install postgresql -y

# configure postgres
sudo service postgresql start

## create user test and password test12
sudo -u postgres bash -c "psql -c \"CREATE USER test WITH PASSWORD 'test12';\""

## create db testdb which owner is user test
sudo -u postgres createdb testdb -O test

sudo service postgresql restart

####################################################
# install docker
sudo apt install docker.io -y

sudo systemctl start docker

sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu  $(lsb_release -cs)  stable"

sudo apt-get update

sudo apt-get install docker-ce -y


