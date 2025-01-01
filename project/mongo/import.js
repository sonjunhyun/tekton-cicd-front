const fs = require('fs');
const { MongoClient } = require('mongodb');
const path = require('path');

// MongoDB 연결 설정
const uri = "mongodb://localhost:27017";
const dbName = "guestbook";
const collectionName = "messages";

// CSV 파일 읽기 및 변환
const csvFilePath = path.join('/data', 'audio5.csv');

async function importCSV() {
    const client = new MongoClient(uri);

    try {
        // MongoDB 연결
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // CSV 파일 읽기
        const csvData = fs.readFileSync(csvFilePath, 'utf-8');
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');

        // 데이터 변환
        const records = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',');
            return headers.reduce((acc, header, index) => {
                const key = header.trim();
                let value = values[index].trim();

                // tracknum과 views를 숫자로 변환
                if (key === 'tracknum' || key === 'views') {
                    value = parseInt(value, 10); // 정수로 변환
                }

                acc[key] = value;
                return acc;
            }, {});
        });

        // 기존 컬렉션 비우기 (옵션)
        await collection.deleteMany({});
        console.log("Cleared existing collection");

        // 데이터 삽입
        await collection.insertMany(records);
        console.log("Inserted CSV data into MongoDB");
    } catch (error) {
        console.error("Error importing CSV:", error);
    } finally {
        // MongoDB 연결 종료
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// CSV 데이터 삽입 실행
importCSV();

