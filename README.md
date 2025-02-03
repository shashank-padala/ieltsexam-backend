# 🎯 IELTS Exam Backend - Developer Onboarding Guide

## 🚀 Overview
Welcome to the **IELTS Exam Backend**! This is a private internal project designed to **help users practice IELTS exams** with:
- **Exam Management (Listening, Reading, Writing, Speaking)**
- **User & Authentication**
- **AI-based Writing & Speaking Evaluations**
- **Scoring System with Band Calculation**
- **API Documentation via Swagger**

---
## 🛠️ Tech Stack
- **Backend:** NestJS (TypeScript)
- **Database:** PostgreSQL (Prisma ORM)
- **Hosting:** Render (for API) & Neon (for Database)
- **Authentication:** Clerk (Optional)
- **AI Evaluation:** OpenAI API (for Writing & Speaking)
- **API Documentation:** Swagger (OpenAPI)

---
## 📌 **1. Access & Permissions**
Before you start, ensure you have:
✅ **Access to the private GitHub repository**  
✅ **Database Credentials (`DATABASE_URL`)** (from the team lead)  
✅ **Render API Hosting Access** (if deploying)  
✅ **OpenAI API Key** (for Writing/Speaking evaluation)

---
## 📌 **2. Setting Up the Project Locally**
Follow these steps to **set up the backend on your local machine**.

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/shashank-padala/ieltsexam-backend.git
cd ieltsexam-backend

