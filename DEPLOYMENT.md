# 🚀 Ücretsiz Deployment Rehberi

Bu rehber, ARK Protocol'ü **tamamen ücretsiz** olarak internete nasıl yayınlayacağını gösterir.

## 📦 Gerekli Hesaplar (Hepsi Ücretsiz)

1. **GitHub** hesabı (kodları yüklemek için)
2. **Vercel** hesabı (frontend için) - https://vercel.com
3. **Render** hesabı (backend için) - https://render.com

## 🎯 Deployment Planı

```
Frontend (React) → Vercel → ark-protocol.vercel.app
Backend (FastAPI) → Render → ark-backend.onrender.com
```

---

## 1️⃣ GitHub'a Kodu Yükle

### Adım 1: GitHub'da Yeni Repo Oluştur
1. https://github.com/new adresine git
2. Repository name: `ARK-Protocol`
3. Public seç
4. "Create repository" tıkla

### Adım 2: Kodu GitHub'a Push Et

Terminal'de:

```bash
cd /Users/cankatacarer/Desktop/ARK-Ark

# Git başlat
git init
git add .
git commit -m "Initial commit - ARK Protocol"

# GitHub'a bağlan (kendi username'ini kullan)
git remote add origin https://github.com/SENIN-USERNAME/ARK-Protocol.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Backend'i Render'a Deploy Et

### Adım 1: Render'a Kaydol
1. https://render.com adresine git
2. "Get Started for Free" tıkla
3. GitHub ile giriş yap

### Adım 2: Backend Servisi Oluştur
1. Dashboard'da "New +" → "Web Service" tıkla
2. GitHub repo'nu seç: `ARK-Protocol`
3. Ayarları yap:

```
Name: ark-backend
Region: Frankfurt (veya en yakın)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
Instance Type: Free
```

### Adım 3: Environment Variables Ekle
"Environment" sekmesinde:

```
SOLANA_RPC_URL = https://api.mainnet-beta.solana.com
CORS_ORIGINS = *
```

### Adım 4: Deploy Et
- "Create Web Service" tıkla
- 5-10 dakika bekle
- URL'ni kopyala: `https://ark-backend.onrender.com`

⚠️ **ÖNEMLİ:** Render free tier 15 dakika inaktiviteden sonra uyur. İlk istek 30-60 saniye sürebilir.

---

## 3️⃣ Frontend'i Vercel'e Deploy Et

### Adım 1: Vercel'e Kaydol
1. https://vercel.com adresine git
2. "Start Deploying" tıkla
3. GitHub ile giriş yap

### Adım 2: Frontend Environment Variable Ayarla

Önce `.env` dosyasını güncelle:

```bash
cd /Users/cankatacarer/Desktop/ARK-Ark/frontend
```

`.env` dosyasını aç ve backend URL'ini güncelle:
```
REACT_APP_BACKEND_URL=https://ark-backend.onrender.com
```

Değişikliği commit et:
```bash
git add .env
git commit -m "Update backend URL for production"
git push
```

### Adım 3: Vercel'de Deploy Et
1. Vercel dashboard'da "Add New..." → "Project" tıkla
2. GitHub repo'nu seç: `ARK-Protocol`
3. Ayarları yap:

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: yarn build
Output Directory: build
Install Command: yarn install
```

### Adım 4: Environment Variables Ekle
"Environment Variables" bölümünde:

```
REACT_APP_BACKEND_URL = https://ark-backend.onrender.com
```

### Adım 5: Deploy Et
- "Deploy" tıkla
- 2-3 dakika bekle
- URL'ni al: `https://ark-protocol.vercel.app`

---

## 4️⃣ CORS Ayarlarını Güncelle

Backend'de CORS'u frontend URL'ine izin verecek şekilde güncelle:

`backend/.env` dosyasını düzenle:
```bash
CORS_ORIGINS=https://ark-protocol.vercel.app,http://localhost:3000
```

Değişikliği push et:
```bash
cd /Users/cankatacarer/Desktop/ARK-Ark
git add backend/.env
git commit -m "Update CORS for production"
git push
```

Render otomatik olarak yeniden deploy edecek.

---

## ✅ Test Et

1. Frontend URL'ini aç: `https://ark-protocol.vercel.app`
2. Bir Solana adresi gir ve verify et
3. Çalışıyorsa tamamdır! 🎉

---

## 🎁 Bonus: Özel Domain (Opsiyonel ve Ücretsiz)

### Freenom'dan Ücretsiz Domain Al
1. https://www.freenom.com adresine git
2. Ücretsiz domain ara (.tk, .ml, .ga, .cf, .gq)
3. Domain'i al (örnek: `arkprotocol.tk`)

### Vercel'e Domain Ekle
1. Vercel dashboard → Settings → Domains
2. Domain'i ekle: `arkprotocol.tk`
3. Freenom'da DNS ayarlarını Vercel'in verdiği değerlerle güncelle

---

## 📊 Ücretsiz Limitler

### Vercel (Frontend)
- ✅ Sınırsız bandwidth
- ✅ Sınırsız deploy
- ✅ Otomatik SSL
- ✅ Global CDN

### Render (Backend)
- ✅ 750 saat/ay (1 servis için yeterli)
- ✅ 512 MB RAM
- ✅ Otomatik SSL
- ⚠️ 15 dakika inaktiviteden sonra uyur

---

## 🔧 Sorun Giderme

### Backend çok yavaş
- İlk istek 30-60 saniye sürebilir (cold start)
- Çözüm: Ücretsiz uptime monitoring kullan (UptimeRobot)

### CORS hatası
- Backend `.env` dosyasında `CORS_ORIGINS` kontrol et
- Frontend URL'ini ekle

### Build hatası
- `requirements.txt` ve `package.json` dosyalarını kontrol et
- Log'ları oku ve hatayı düzelt

---

## 🎯 Sonuç

Artık siteniz canlı:
- **Frontend:** `https://ark-protocol.vercel.app`
- **Backend:** `https://ark-backend.onrender.com`
- **Maliyet:** ₺0 / $0 / €0

Tamamen ücretsiz, SSL sertifikalı, global CDN ile hızlı! 🚀
