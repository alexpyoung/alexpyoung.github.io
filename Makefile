IMAGE=jekyll/jekyll:stable
NAME=alexpyoung.github.io
SRC=`pwd`
HOST_PORT=4000

DEST=/srv/jekyll
CONTAINER_PORT=4000
DOCKERD=/Applications/Docker.app

serve: clean bootstrap
	docker run --rm -ti --name=${NAME} --publish=${HOST_PORT}:${CONTAINER_PORT} --volume=${SRC}:${DEST} ${IMAGE} jekyll serve

restart: bootstrap
	docker restart `docker ps --quiet --filter "ancestor=${IMAGE}"`

build: clean bootstrap
	docker run --rm -ti --volume=${SRC}:${DEST} ${IMAGE} jekyll build

clean: bootstrap
	docker run --rm -ti --volume=${SRC}:${DEST} ${IMAGE} jekyll clean

bootstrap: install-docker
	[[ `ps aux | grep "${DOCKERD}" | grep -v grep | wc -l` -gt 0 ]] || (open ${DOCKERD} && echo 'Waiting for the Docker daemon to start' && sleep 30)

install-docker: install-homebrew
	docker -v || brew cask install docker

install-homebrew:
	brew -v || /usr/bin/ruby -e `curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install`
