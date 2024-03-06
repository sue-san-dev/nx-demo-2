FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y ffmpeg
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*