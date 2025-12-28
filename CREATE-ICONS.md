# 🎨 ARK Protocol Icon'larını Oluşturma

Yeşil ARK logo'yu favicon ve app icon olarak kullanmak için bu adımları takip et.

## 🖼️ Logo Dosyası

ARK logo'nun yeşil versiyonunu kullanacağız (3 katmanlı stack icon).

## 🛠️ İkon Oluşturma Yöntemleri

### Yöntem 1: Online Tool (En Kolay) ⭐

1. **Favicon.io** kullan: https://favicon.io/favicon-converter/
2. Yeşil ARK logo'nu yükle (verdiğin resim)
3. "Download" tıkla
4. İndirilen dosyaları `/Users/cankatacarer/Desktop/ARK-Ark/frontend/public/` klasörüne kopyala:
   - `favicon.ico`
   - `apple-touch-icon.png` → `logo192.png` olarak yeniden adlandır
   - `android-chrome-512x512.png` → `logo512.png` olarak yeniden adlandır

### Yöntem 2: Figma/Photoshop

1. Yeşil ARK logo'yu aç
2. Şu boyutlarda export et:
   - `favicon.ico` - 32x32px
   - `logo192.png` - 192x192px
   - `logo512.png` - 512x512px
3. Dosyaları `/Users/cankatacarer/Desktop/ARK-Ark/frontend/public/` klasörüne kaydet

### Yöntem 3: ImageMagick (Terminal)

```bash
cd /Users/cankatacarer/Desktop/ARK-Ark/frontend/public

# Yeşil ARK logo'nu buraya kopyala (ark-source.png olarak)

# Favicon oluştur
convert ark-source.png -resize 32x32 favicon.ico

# App icon'ları oluştur
convert ark-source.png -resize 192x192 logo192.png
convert ark-source.png -resize 512x512 logo512.png
```

## ✅ Dosyalar Hazır Olunca

Tarayıcıyı yenile (Cmd+Shift+R) ve şunları kontrol et:

1. **Browser Tab** - ARK logo ve "ARK Protocol" yazısı görünmeli
2. **Bookmark** - ARK icon görünmeli
3. **Mobile Add to Home Screen** - ARK icon ve isim görünmeli

## 🎯 Sonuç

Tüm icon'lar yeşil ARK logo ile güncellenecek ve her yerde "ARK Protocol" ismi görünecek! 🚀
