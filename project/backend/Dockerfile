FROM python:3.8

RUN mkdir /WORKDIR
WORKDIR /WORKDIR

RUN apt update && \
    apt install -y postgresql-client

COPY app/scripts/secret-env.sh /WORKDIR

RUN /WORKDIR/secret-env.sh

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .