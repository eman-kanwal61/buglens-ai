# 🔍 BugLens AI

### AI-Powered Bug Analysis & Debugging Assistant

BugLens AI is an AI-powered software debugging assistant that transforms unclear bug reports into structured, actionable debugging intelligence.

Instead of manually going through a vague bug report, developers can provide a bug title, description, and environment. BugLens AI analyzes the report and generates:

- 📌 Bug Summary
- 🚨 Severity Level
- 🏷️ Bug Category
- 🔎 Probable Cause
- 🛠️ Debugging Steps
- 💡 Recommended Action
- 🎯 AI Confidence

---

## ✨ Features

### 🤖 AI-Powered Bug Analysis

BugLens analyzes the context of a bug report and identifies the most likely cause and appropriate debugging direction.

### 🚨 Severity Detection

The system classifies bugs into:

- Low
- Medium
- High
- Critical

### 🏷️ Automatic Bug Categorization

BugLens can categorize issues into:

- Frontend
- Backend
- Database
- API
- Authentication
- Infrastructure
- Other

### 🛠️ Actionable Debugging Steps

Instead of only explaining the problem, BugLens provides practical steps developers can follow to investigate the issue.

### 📊 Structured JSON Output

The backend converts the AI response into structured JSON, making the system suitable for integration with other applications and automation workflows.

### ⚡ Fast AI Processing

The backend uses Groq's API to process bug reports and generate analysis quickly.

### 🎨 Modern Web Interface

The frontend provides a clean and interactive interface where users can submit and analyze software bugs.

---

# 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │   BugLens Frontend  │
                 │   React + Vite      │
                 └──────────┬──────────┘
                            │
                            │ HTTP POST
                            ▼
                 ┌─────────────────────┐
                 │   Express Backend   │
                 │      Node.js        │
                 └──────────┬──────────┘
                            │
                            │ API Request
                            ▼
                 ┌─────────────────────┐
                 │      Groq API       │
                 │    AI Processing    │
                 └──────────┬──────────┘
                            │
                            │ AI Response
                            ▼
                 ┌─────────────────────┐
                 │ Structured JSON     │
                 │ Bug Analysis        │
                 └─────────────────────┘
