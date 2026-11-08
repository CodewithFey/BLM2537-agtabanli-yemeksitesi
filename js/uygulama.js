// Tarif Ekle formunun kontrolü

const form = document.getElementById("tarifFormu");
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
        mesaj.textContent = "Bilgiler doğru. Tarifi kaydetme özelliği bir sonraki hafta eklenecek.";
        mesaj.classList.add("basarili");
    }

    mesaj.classList.remove("gizli");
});
