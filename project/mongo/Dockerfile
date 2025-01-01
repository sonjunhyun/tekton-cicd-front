# MongoDB 4.0 이미지 기반
FROM mongo:4.0

# Node.js 16.x 설치 (권장 버전)
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# CSV 파일 및 스크립트 복사
COPY audio5.csv /data/audio5.csv
COPY import.js /data/import.js

# Node.js 의존성 설치
WORKDIR /data
RUN npm init -y && npm install mongodb

# MongoDB 및 Node.js 스크립트 실행
CMD ["bash", "-c", "mongod --fork --logpath /var/log/mongodb.log --bind_ip_all && node /data/import.js && tail -f /dev/null"]

