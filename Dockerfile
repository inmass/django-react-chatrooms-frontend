FROM node:18.12.1
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json package-lock.json /frontend/
RUN npm install
COPY . /frontend/