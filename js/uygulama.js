// Tarif Defterim - JavaScript dosyası

// localStorage'daki tarifleri dizi olarak getirir, hiç kayıt yoksa boş dizi döner
function kayitliTarifleriGetir() {
    const kayit = localStorage.getItem("tarifler");
    if (kayit === null) {
        return [];
    }
    return JSON.parse(kayit);
}

// Verilen etiketle yeni bir eleman oluşturup içine yazıyı koyar
function elemanOlustur(etiket, yazi) {
    const eleman = document.createElement(etiket);
    eleman.textContent = yazi;
    return eleman;
}

// Textarea'daki her satırı bir liste maddesi yapar (ul veya ol)
function listeOlustur(etiket, metin) {
    const liste = document.createElement(etiket);
    const satirlar = metin.split("\n");
    for (let i = 0; i < satirlar.length; i++) {
        if (satirlar[i].trim() !== "") {
            liste.appendChild(elemanOlustur("li", satirlar[i].trim()));
        }
    }
    return liste;
}


// ---------- Tarif Ekle sayfası: formun kontrolü ve kaydı ----------

const form = document.getElementById("tarifFormu");

if (form) {
    const mesaj = document.getElementById("mesaj");

    form.addEventListener("submit", function (olay) {
        // Sayfanın yenilenmesini engelle
        olay.preventDefault();

        const tarifAdi = document.getElementById("tarifAdi");
        const sure = document.getElementById("sure");
        const kisi = document.getElementById("kisi");
        const malzemeler = document.getElementById("malzemeler");
        const hazirlanis = document.getElementById("hazirlanis");

        let hataVar = false;

        // Önceki denemeden kalan kırmızı işaretleri temizle
        tarifAdi.classList.remove("hata");
        sure.classList.remove("hata");
        kisi.classList.remove("hata");
        malzemeler.classList.remove("hata");
        hazirlanis.classList.remove("hata");

        if (tarifAdi.value.trim() === "") {
            tarifAdi.classList.add("hata");
            hataVar = true;
        }

        if (sure.value === "" || Number(sure.value) <= 0) {
            sure.classList.add("hata");
            hataVar = true;
        }

        if (kisi.value === "" || Number(kisi.value) <= 0) {
            kisi.classList.add("hata");
            hataVar = true;
        }

        if (malzemeler.value.trim() === "") {
            malzemeler.classList.add("hata");
            hataVar = true;
        }

        if (hazirlanis.value.trim() === "") {
            hazirlanis.classList.add("hata");
            hataVar = true;
        }

        if (hataVar) {
            mesaj.textContent = "Kırmızı alanları kontrol et. Süre ve kişi sayısı 0'dan büyük olmalı.";
            mesaj.classList.remove("basarili");
        } else {
            const kategori = document.getElementById("kategori");
            const zorluk = document.querySelector('input[name="zorluk"]:checked');
            const vejetaryen = document.getElementById("vejetaryen");

            // Formdaki bilgilerle bir tarif nesnesi oluştur
            const tarif = {
                ad: tarifAdi.value.trim(),
                kategori: kategori.options[kategori.selectedIndex].text,
                sure: Number(sure.value),
                kisi: Number(kisi.value),
                zorluk: zorluk.value,
                vejetaryen: vejetaryen.checked,
                malzemeler: malzemeler.value.trim(),
                hazirlanis: hazirlanis.value.trim()
            };

            // Eski tariflerin sonuna ekleyip tekrar kaydet
            const tarifler = kayitliTarifleriGetir();
            tarifler.push(tarif);
            localStorage.setItem("tarifler", JSON.stringify(tarifler));

            form.reset();
            mesaj.textContent = tarif.ad + " kaydedildi. Tarifler sayfasında görebilirsin.";
            mesaj.classList.add("basarili");
        }

        mesaj.classList.remove("gizli");
    });
}


// ---------- Tarifler sayfası: kayıtlı tarifleri listeleme ----------

const tarifListesi = document.getElementById("tarifListesi");

if (tarifListesi) {
    const eklenenTarifler = document.getElementById("eklenenTarifler");
    const tarifler = kayitliTarifleriGetir();

    for (let i = 0; i < tarifler.length; i++) {
        const tarif = tarifler[i];
        const bolumId = "eklenen" + i;

        // Tabloya yeni satır ekle
        const satir = document.createElement("tr");
        const adHucresi = document.createElement("td");
        const baglanti = elemanOlustur("a", tarif.ad);
        baglanti.href = "#" + bolumId;
        adHucresi.appendChild(baglanti);
        satir.appendChild(adHucresi);
        satir.appendChild(elemanOlustur("td", tarif.kategori));
        satir.appendChild(elemanOlustur("td", tarif.sure + " dakika"));
        satir.appendChild(elemanOlustur("td", tarif.kisi));
        tarifListesi.appendChild(satir);

        // Tablonun altına tarifin ayrıntılarını ekle
        let bilgi = "Zorluk: " + tarif.zorluk;
        if (tarif.vejetaryen) {
            bilgi = bilgi + ", vejetaryen tarif";
        }

        const bolum = document.createElement("section");
        bolum.id = bolumId;
        bolum.appendChild(elemanOlustur("h2", tarif.ad));
        bolum.appendChild(elemanOlustur("p", bilgi));
        bolum.appendChild(elemanOlustur("h3", "Malzemeler"));
        bolum.appendChild(listeOlustur("ul", tarif.malzemeler));
        bolum.appendChild(elemanOlustur("h3", "Hazırlanışı"));
        bolum.appendChild(listeOlustur("ol", tarif.hazirlanis));
        eklenenTarifler.appendChild(bolum);
    }
}
