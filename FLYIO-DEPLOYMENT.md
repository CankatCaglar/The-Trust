# ✈️ Fly.io ile Tamamen Ücretsiz Deployment

Fly.io ile hem backend hem frontend'i **tek platformda** ve **tamamen ücretsiz** deploy et.

## 🎯 Avantajlar

- ✅ **%100 Ücretsiz** (kredi kartı bile gerekmez)
- ✅ 3 VM ücretsiz (2 backend, 1 frontend)
- ✅ 160 GB bandwidth/ay
- ✅ Cold start yok
- ✅ Global CDN

---

## 🚀 Hızlı Deployment

### 1️⃣ Fly CLI Kur

```bash
# macOS
brew install flyctl

# Giriş yap
flyctl auth login
```

### 2️⃣ Backend Deploy Et

```bash
cd /Users/cankatacarer/Desktop/ARK-Ark/backend

# Fly.io app oluştur
flyctl launch --name ark-backend --region fra

# Environment variables ekle
flyctl secrets set SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Deploy
flyctl deploy
```

Backend URL: `https://ark-backend.fly.dev`

### 3️⃣ Frontend Deploy Et

Önce backend URL'ini güncelle:

```bash
cd /Users/cankatacarer/Desktop/ARK-Ark/frontend

# .env dosyasını güncelle
echo "REACT_APP_BACKEND_URL=https://ark-backend.fly.dev" > .env

# Fly.io app oluştur
flyctl launch --name ark-frontend --region fra

# Deploy
flyctl deploy
```

Frontend URL: `https://ark-frontend.fly.dev`

### 4️⃣ CORS Ayarla

```bash
cd /Users/cankatacarer/Desktop/ARK-Ark/backend

# Backend'de CORS ekle
flyctl secrets set CORS_ORIGINS=https://ark-frontend.fly.dev
```

---

## ✅ Test Et

`https://ark-frontend.fly.dev` adresini aç ve test et!

---

## 💰 Ücretsiz Limitler

- **3 VM** (shared-cpu-1x)
- **256 MB RAM** per VM
- **160 GB** bandwidth/ay
- **3 GB** storage

Senin projen için **fazlasıyla yeterli**.

---

## 🎯 Sonuç

- **Backend:** `https://ark-backend.fly.dev`
- **Frontend:** `https://ark-frontend.fly.dev`
- **Maliyet:** ₺0 / $0 / €0

Tamamen ücretsiz, kredi kartı bile gerekmiyor! 🚀
