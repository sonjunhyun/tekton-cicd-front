#!/bin/bash

echo "Stopping and removing containers: frontend, backend, mongodb..."

# 컨테이너 삭제
docker rm -f frontend backend mongodb 2>/dev/null

echo "Containers removed successfully!"

