FROM ubuntu:16.04
MAINTAINER Ye Jinshou <329365307@qq.com>
WORKDIR /blockchain-explorer
RUN apt-get update && apt-get install locate -y
ENV PATH /opt/node-v8.11.3-linux-x64/bin:$PATH
ADD node-v8.11.3-linux-x64.tar.xz /opt/
ADD docker-entrypoint.sh start_explorer.sh /opt/
COPY files /blockchain-explorer
CMD ["/opt/docker-entrypoint.sh"]
