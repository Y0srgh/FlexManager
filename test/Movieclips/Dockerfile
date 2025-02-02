FROM python:3.10-slim



ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1



RUN apt update
RUN apt -y install \
wget \
build-essential \
libssl* \
libffi-dev \
libsqlite3-dev \
libespeak-dev \
zlib1g-dev \
libmupdf-dev \
libfreetype6-dev \
ffmpeg \
espeak \
imagemagick \
git



RUN wget https://www.python.org/ftp/python/3.10.14/Python-3.10.14.tgz
RUN tar -xzvf Python-3.10.14.tgz
RUN cd Python-3.10.14
WORKDIR /Python-3.10.14
RUN ./configure --enable-optimizations --with-system-ffi
RUN make -j 16
RUN make altinstall

COPY ./policy.xml /etc/ImageMagick-6/policy.xml

WORKDIR /app



COPY ./requirements.txt .
RUN pip3.10 install numpy==2.1.2
RUN pip3.10 install --no-cache-dir -r requirements.txt



COPY . .







CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000