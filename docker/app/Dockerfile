FROM ubuntu 

ENV DEBIAN_FRONTEND=noninteractive

#GUIアプリをインストール
RUN apt-get update \
    && apt-get install -y tzdata \
    libgtkextra-dev \
    libgconf2-dev \
    libnss3 \
    libasound2 \
    libxtst-dev \
    libxss1 \
    libgtk-3-0

RUN apt-get update \
    && apt-get install -y language-pack-ja-base language-pack-ja fonts-noto-cjk fcitx-mozc \
    && im-config -n fcitx

RUN GTK_IM_MODULE=xim \
    QT_IM_MODULE=fcitx \
    XMODIFIERS=@im=fcitx \
    DefalutIMModule=fcitx

#curlのインストール
RUN apt-get update \
    && apt-get install -y curl

#node.jsのインストール
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y node.js

#yarnのインストール
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn

RUN locale-gen ja_JP.UTF-8
ENV LANG=ja_JP.UTF-8 \
    LC_ALL=ja_JP.UTF-8

#ユーザの作成
ARG DOCKER_UID=1000
ARG DOCKER_USER=docker
ARG DOCKER_PASSWORD=docker
RUN useradd -m \
    --uid ${DOCKER_UID} --groups sudo ${DOCKER_USER} \ 
    && echo ${DOCKER_USER}:${DOCKER_PASSWORD} | chpasswd

#作成したユーザに切り替える
USER ${DOCKER_USER}

WORKDIR /home/${DOCKER_USER}/app