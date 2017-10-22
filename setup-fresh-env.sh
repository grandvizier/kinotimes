
# install docker
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common git
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# check https://github.com/docker/compose/releases/ for version
curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
curl -L https://raw.githubusercontent.com/docker/compose/1.16.1/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose
chmod +x /usr/local/bin/docker-compose
apt-get update
apt-get install -y docker-ce
apt-cache madison docker-ce
apt-get install docker-ce=17.06.2~ce-0~ubuntu

# install node/npm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
command -v nvm
nvm install node

# install app
npm install -g create-react-app
git clone https://github.com/grandvizier/kinotimes.git app
cd app

# setup cron
crontab -e
touch /var/log/cron.log

# deploy
export BUILD=39
docker-compose up -d

