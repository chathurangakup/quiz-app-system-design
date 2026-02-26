# quiz-app-system-design

A complete Quiz Reward Mobile Application where users can earn real money by completing short quizzes and brain-teaser puzzles directly from their mobile phones.

This system includes:

📱 Mobile App (Expo – React Native)

🌐 Admin Portal (Next.js)

⚙️ Backend API (Node.js + Express)

🗄 PostgreSQL Database

Users complete quizzes → earn rewards → request withdrawals → admin verifies & pays.

<img width="400" height="250" alt="ChatGPT Image Feb 26, 2026, 09_35_33 PM" src="https://github.com/user-attachments/assets/143be647-0fc8-4278-b5d4-4b8747e966e5" />

🚀 Main Features
📱 Mobile App

<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 29 27" src="https://github.com/user-attachments/assets/4915c375-916f-481a-b45d-3c5f2715f12e" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 30 49" src="https://github.com/user-attachments/assets/70d0fcc9-a997-426b-a7f1-fd09e12be474" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 24 09" src="https://github.com/user-attachments/assets/eadedf47-f6b5-46bc-a6bd-bc8868d54e37" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 27 25" src="https://github.com/user-attachments/assets/1b0a27d4-1873-478a-9e1e-c9e4e85671ad" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 27 32" src="https://github.com/user-attachments/assets/a5c7511a-6bcc-407c-ac8e-bb8f401506f3" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 27 39" src="https://github.com/user-attachments/assets/a5240f93-abbd-4e72-a0fd-d2703b5f76c2" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 27 44" src="https://github.com/user-attachments/assets/ca70719b-8ee8-44f6-badf-5ef3485f7c96" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 27 52" src="https://github.com/user-attachments/assets/b5cbe171-835b-4bea-b52b-6c45549eb255" />
<img width="150" height="300" alt="Simulator Screenshot - iPhone 16 Plus - 2026-02-23 at 22 28 16" src="https://github.com/user-attachments/assets/98b1e519-3522-4134-8622-d4d8caeceb32" />


1. User Registration & Login

2. KYC Verification

3. Quiz Participation

4. Real-time Quiz Validation

5. Wallet Balance Tracking

6. Withdrawal Requests

⚙️ Backend (Node.js)

1. JWT Authentication

2. Quiz Evaluation Engine

3. Wallet Ledger System

4. Withdrawal Workflow

5. Admin Role Management

6. Fraud Detection Flags

7. KYC Approval System

🌐 Admin Portal (Next.js)

<img width="512" height="350" alt="Screenshot 2026-02-26 at 21 57 28" src="https://github.com/user-attachments/assets/1c7bc5ea-2479-4b50-9a6f-d9beb0895f89" />
<img width="512" height="350" alt="Screenshot 2026-02-26 at 21 58 24" src="https://github.com/user-attachments/assets/910cd3fc-4356-4fcf-804f-80de54816e31" />
<img width="512" height="350" alt="Screenshot 2026-02-26 at 21 57 59" src="https://github.com/user-attachments/assets/eca9e0d5-0be1-401b-9cf6-a110f0ad2673" />
<img width="512" height="350" alt="Screenshot 2026-02-26 at 21 58 40" src="https://github.com/user-attachments/assets/f37425de-b96b-4ee2-aa03-6a9d88d5146a" />
<img width="512" height="350" alt="Screenshot 2026-02-26 at 21 58 52" src="https://github.com/user-attachments/assets/f1073019-ba55-420a-acbd-8b03dd84aa18" />
<img width="512" height="350" alt="Screenshot 2026-02-26 at 21 58 08" src="https://github.com/user-attachments/assets/88f16de4-d7d8-4c58-9606-e3b3304876d2" />

1. Create Quizzes

2. Review KYC Requests

3. Approve / Reject Withdrawals

4. Monitor Wallet Transactions

5. Detect Suspicious Activity


🧱 Tech Stack
Layer	Technology

Mobile App -	Expo (React Native)

Admin Portal -	Next.js

Backend - Node.js + Express.js

Database -	PostgreSQL

Authentication - JWT

ORM - Raw SQL (pg)



⚙️ Backend Setup (Local)
1️⃣ Clone Repo

git clone https://github.com/your-repo/quiz-app-backend.git
cd quiz-app-backend

2️⃣ Install Dependencies

npm install

3️⃣ Setup PostgreSQL

Create Database:

CREATE DATABASE quizapp;

Update .env

PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=quizapp
JWT_SECRET=yoursecret

4️⃣ Run Migrations

Run all SQL schema files from /database

5️⃣ Start Server

npm run dev

Backend runs on:

http://localhost:4000


