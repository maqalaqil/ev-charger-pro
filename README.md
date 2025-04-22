

```md
# ⚡ EV Charger Tracker Pro

A fullstack, production-ready Electric Vehicle (EV) charging tracker system — built to track, visualize, and intelligently forecast your EV charging sessions.

## 🔧 Technologies

- **Frontend**: React + Vite + Chart.js
- **Backend**: NestJS + TypeORM + MySQL
- **AI Service (Optional)**: FastAPI + Python (Uvicorn)
- **Deployment**: PM2, EC2-ready
- **Data Visuals**: `<canvas>` charts with real-time trend updates

---

## 📦 Features

- ✅ Add new charging records (Reading Before/After, kWh Price, Date)
- ✏️ Edit existing records inline
- 📈 Real-time chart with `Chart.js` inside `<canvas>`
- 📊 Monthly summaries & charging trends
- 📅 Filter records by date range (From/To)
- 🌙 Dark mode toggle
- 🌐 Multi-language support (i18n ready)
- 📤 Export to CSV
- 🧠 Optional Smart Insights & Forecasting with Python AI service
- 🚀 PM2-based process management

---

## 📁 Project Structure

```
ev-charger-pro/
│
├── backend/          NestJS + TypeORM (MySQL)
├── frontend/         React + Vite + Chart.js
├── ai/               FastAPI (Uvicorn-based forecasting)
└── pm2.config.json   Unified PM2 process manager
```

---

## 🚀 Quick Start

### 🔹 1. Clone the project

```bash
git clone https://github.com/yourname/ev-charger-pro.git
cd ev-charger-pro
```

---

### 🔹 2. Backend Setup (NestJS)

```bash
cd backend
npm install
npm run build
npm run start:prod
```

> ⚙️ Set up your DB credentials in `.env` or `ormconfig.ts`.

---

### 🔹 3. Frontend Setup (React + Vite)

```bash
cd ../frontend
npm install
npm run build
npm start  # uses "serve -s dist -l 3070"
```

---

### 🔹 4. Python AI Forecast Service (Optional)

```bash
cd ../ai
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn ai_forecast_service:app --host 0.0.0.0 --port 8000
```

---

### 🔹 5. Run with PM2

```bash
npm install -g pm2 serve

# Start all apps
pm2 start pm2.config.json
pm2 save
pm2 startup
```

---

## 🔧 PM2 Configuration (pm2.config.json)

```json
{
  "apps": [
    {
      "name": "nest-backend :3001",
      "cwd": "./backend",
      "script": "npm",
      "args": "start",
      "env": {
        "NODE_ENV": "production"
      }
    },
    {
      "name": "react-frontend :3070",
      "cwd": "./frontend",
      "script": "npm",
      "args": "start",
      "env": {
        "NODE_ENV": "production"
      }
    },
    {
      "name": "ai-forecast :8000",
      "cwd": "./ai",
      "script": "venv/bin/python",
      "args": "-m uvicorn ai_forecast_service:app --host 0.0.0.0 --port 8000",
      "interpreter": "none"
    }
  ]
}
```

---

## 📊 API Reference

### POST `/charging-records`

```json
{
  "readingAfter": 100,
  "kwhPrice": 3.75,
  "date": "2025-04-11"
}
```

### PATCH `/charging-records/:id`

```json
{
  "readingAfter": 110,
  "kwhPrice": 3.50,
  "date": "2025-04-12"
}
```

---

## 🖼 Frontend Components

### ✅ Canvas Chart with Chart.js

```tsx
<canvas ref={canvasRef} />
```

Chart auto-updates on record changes using `Chart.js`.

### ✅ Editing Records Inline

Inline form shows up in table rows. Fields: `readingAfter`, `kWhPrice`, `date`.

---

## 🛠 Troubleshooting

| Problem | Solution |
|--------|----------|
| `IsNumber` or `IsOptional` not found | `npm install class-validator class-transformer` |
| Venv error in Python | `sudo apt install python3-venv` |
| Port blocked | Open security group on AWS or `sudo ufw allow <port>` |
| PM2 shows `-l` error | Use args array: `"args": ["-s", "dist", "-l", "3070"]` |
| PATCH request doesn't save | Ensure `repo.save(record)` is used in service |
| GitHub auth failed | Use [Personal Access Token](https://github.com/settings/tokens) or SSH |
| Disk full | Run `sudo apt clean && pm2 flush && pm2 delete all` |

---

## ⚙️ Recommended Packages

### Backend:

```bash
npm install class-validator class-transformer @nestjs/typeorm typeorm mysql
```

### Frontend:

```bash
npm install axios chart.js react-i18next i18next serve
```

### Python AI:

```bash
pip install fastapi uvicorn pandas scikit-learn numpy
```

---

## 🔐 Optional Enhancements

- [ ] JWT-based login with role-based dashboards
- [ ] Admin-only edit/delete permissions
- [ ] Smart anomaly detection in charging patterns
- [ ] Scheduled AI forecast via CRON
- [ ] Mobile-optimized dashboard view
- [ ] PDF export per month

---

## 📜 License

MIT License. Built with ❤️ by Maher alaqil & ChatGPT.


---
