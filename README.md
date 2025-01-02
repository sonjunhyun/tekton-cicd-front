# Patch Note (10.6 / 3.1)

## Front
-다크 모드 토글 추가



## 실행 명령어들
- ./run.sh
- ./delete.sh
- 
- docker run -d --name=mongodb -p 17017:27017 --restart=always --network=devapp-net sushijin/mongodb:3.1
- docker run -d --name=backend --network=devapp-net --restart=always -e PORT=8000 -e GUESTBOOK_DB_ADDR=mongodb:27017 sushijin/backend:10.6
- docker run -d --name=frontend -p 3000:8000 --network=devapp-net --restart=always -e PORT=8000 -e GUESTBOOK_API_ADDR=backend:8000 sushijin/frontend:10.6
- 
- docker cp frontend:/frontend ~/LABs/project/
- docker cp backend:/backend ~/LABs/project/
- 
- docker build -t sushijin/backend:10.6 .
- docker tag sushijin/backend:10.6 sushijin/backend:10.6
- docker push sushijin/backend:10.6
- 
- docker build -t sushijin/frontend:10.6 .
- docker tag sushijin/frontend:10.6 sushijin/frontend:10.6
- docker push sushijin/frontend:10.6

# Patch Note (10.4 /3.1)

## Front
- Back에서 데이터 리스트 잘 받아와지는지 확인 후 개선
- 데이터 컬럼 추가

## Back
- DB → Backend에서 데이터 받는 조건을 완화 시킴
- `index.js` 데이터 컬럼 추가

## DB
- DB 구조에 `tracknum`, `views` 컬럼 추가:
  ```json
  {
    "_id": {
      "$oid": "677559f78ff1878a393986dc"
    },
    "mp3": "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/559/aktiv-1698886854-uBxD5BMO42.mp3",
    "title": "AKTIV",
    "artist": "4URA & VinDon",
    "slength": "2:37",
    "image": "https://i1.sndcdn.com/artworks-MAta6tCqg2nfn428-xBYydQ-t500x500.jpg",
    "tracknum": 10,
    "views": 1
  }

- 1. 데이터는 잘 들어갔으나  Back에서 데이터를 받아들이지 못하는 오류 발생
        a. 원인: backend/index.js에서 새로 추가된 두 컬럼의 타입을 Number로 명시하였으나 데이터 삽입 중 import.js로 인해 string 타입으로 기입됨
            (타입 에러) --> import.js에 데이터 변환 로직 추가
    
- 2. 데이터 타입 변경후에도 데이터 받지 못함
        b. 원인: views(조회 수)의 기본값으로 전부 0 으로 설정하였다 --> 0을 false로 인식해서 데이터를 못받아들임
            (해결) --> 기본 값 0을 1로 수정


## 실행 명령어들
- ./run.sh
- ./delete.sh
- 
- docker run -d --name=mongodb -p 17017:27017 --restart=always --network=devapp-net sushijin/mongodb:3.1
- docker run -d --name=backend --network=devapp-net --restart=always -e PORT=8000 -e GUESTBOOK_DB_ADDR=mongodb:27017 sushijin/backend:10.4
- docker run -d --name=frontend -p 3000:8000 --network=devapp-net --restart=always -e PORT=8000 -e GUESTBOOK_API_ADDR=backend:8000 sushijin/frontend:10.4
- 
- docker cp frontend:/frontend ~/LABs/project/
- docker cp backend:/backend ~/LABs/project/
- 
- docker build -t sushijin/backend:10.4 .
- docker tag sushijin/backend:10.4 sushijin/backend:10.4
- docker push sushijin/backend:10.4
- 
- docker build -t sushijin/frontend:10.4 .
- docker tag sushijin/frontend:10.4 sushijin/frontend:10.4
- docker push sushijin/frontend:10.4