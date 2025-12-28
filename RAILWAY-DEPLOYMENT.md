# 🚂 Railway ile Tek Seferde Deployment

Railway ile hem backend hem frontend'i **tek platformda** deploy et.

## 📦 Gerekli Tek Şey

- **Railway hesabı** (GitHub ile giriş) - https://railway.app

## 🎯 Avantajlar

- ✅ Backend + Frontend tek yerde
- ✅ $5 ücretsiz kredi/ay (yeterli)
- ✅ GitHub ile otomatik deploy
- ✅ Cold start yok (her zaman aktif)
- ✅ Kolay setup (5 dakika)

---

## 🚀 Adım Adım Deployment

### 1️⃣ GitHub'a Kodu Yükle

```bash
cd /Users/cankatacarer/Desktop/ARK-Ark

# Git başlat
git init
git add .
git commit -m "Initial commit - ARK Protocol"

# GitHub'a push (kendi username'ini kullan)
git remote add origin https://github.com/SENIN-USERNAME/ARK-Protocol.git
git branch -M main
git push -u origin main
```

### 2️⃣ Railway'e Kaydol

1. https://railway.app adresine git
2. "Start a New Project" tıkla
3. GitHub ile giriş yap
4. Railway'e GitHub erişimi ver

### 3️⃣ Backend Deploy Et

1. Dashboard'da "New Project" tıkla
2. "Deploy from GitHub repo" seç
3. `ARK-Protocol` repo'nu seç
4. "Add variables" tıkla

**Environment Variables:**
```
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
PORT=8000
```

5. Settings → "Root Directory" → `backend` yaz
6. "Deploy" tıkla

Backend URL'ni kopyala: `https://ark-backend.up.railway.app`

### 4️⃣ Frontend Deploy Et

1. Aynı projede "New Service" tıkla
2. Aynı GitHub repo'yu seç
3. "Add variables" tıkla

**Environment Variables:**
```
REACT_APP_BACKEND_URL=https://ark-backend.up.railway.app
```

4. Settings → "Root Directory" → `frontend` yaz
5. Settings → "Build Command" → `yarn build` yaz
6. Settings → "Start Command" → `yarn start` yaz
7. "Deploy" tıkla

Frontend URL'ni al: `https://ark-frontend.up.railway.app`

### 5️⃣ CORS Ayarla

Backend'de frontend URL'ini CORS'a ekle.

Lokal olarak `backend/.env` dosyasını düzenle:
```bash
CORS_ORIGINS=https://ark-frontend.up.railway.app,http://localhost:3000
```

Railway'de de ekle:
1. Backend service → Variables
2. `CORS_ORIGINS` ekle: `https://ark-frontend.up.railway.app`

Commit ve push et:
```bash
git add backend/.env
git commit -m "Update CORS for Railway"
git push
```

Railway otomatik redeploy edecek.

---

## ✅ Test Et

Frontend URL'ini aç: `https://ark-frontend.up.railway.app`

Bir Solana adresi gir ve verify et. Çalışıyorsa tamamdır! 🎉

---

## 💰 Ücretsiz Limitler

- **$5 kredi/ay** (her ay yenilenir)
- **500 saat/ay** execution time
- **100 GB** bandwidth
- **1 GB** RAM per service

Bu limitler senin projen için **fazlasıyla yeterli**.

---

## 🔧 Sorun Giderme

### Deployment başarısız
- Logs'u kontrol et
- `requirements.txt` ve `package.json` dosyalarını kontrol et

### CORS hatası
- Backend environment variables'da `CORS_ORIGINS` kontrol et
- Frontend URL'ini ekle

### Kredi bitti
- Railway dashboard'da kullanımı kontrol et
- Gerekirse Fly.io'ya geç (tamamen ücretsiz)

---

## 🎯 Sonuç

Artık her şey tek platformda:
- **Backend:** `https://ark-backend.up.railway.app`
- **Frontend:** `https://ark-frontend.up.railway.app`
- **Maliyet:** $0 (aylık $5 kredi yeterli)

Tek platform, kolay yönetim, hızlı deployment! 🚀
