// inputların yakalanması
const harcamaInput = document.querySelector('#harcama');
const fiyatIpnut = document.querySelector('#fiyat');
// ekle butonunun yakalanması
const ekleButon = document.querySelector('.ekle-btn');
const liste = document.querySelector('.liste');
const toplamBilgi = document.querySelector('#toplam-bilgi');
const odendiCheck = document.querySelector('#odendi');
const selectFilter = document.querySelector('#filter-select');

// 

// butonun tıklanılma olayının izlenmesi


ekleButon.addEventListener('click', addExpense);
// listenin izlenmesi
liste.addEventListener('click', handleClick);
// selectin değişme olayının izlenmesi
selectFilter.addEventListener("change", handleFilter);

// toplam state'i 
let toplam = 0;
function updateToplam(fiyat) {
    // inputtan gelen string değerlerin numbera dönüştürülmesi



    toplam = toplam + parseInt(fiyat);
    //! console.log(typeof parseInt(fiyat));
    //! console.log(toplam);
    toplamBilgi.innerText = toplam;
}

// harcama oluşturma ve sayfa yenileme özelliğini kaldırma
function addExpense(e) {
    e.preventDefault();
    // inputlardan bir tanesi bile boş olursa ekle butonunun çalışmaması için
    if (harcamaInput.value == "" || fiyatIpnut.value == "") {
        alert("Formlar boş olamaz!");
        // fonskiyonu durdurma
        return;
    }
    // inputtaki değerleri yakalamak
    //    ?console.log(harcamaInput.value , fiyatIpnut.value);
    //    div oluşturmak bu divin aynısı
    // <div class="harcama">
    //         <h2>Telefon</h2>
    //         <h2>3500</h2>
    //         <div class="buttons">
    //             <img src="./images/pay.png" >
    //             <img src="./images/delete.png" >
    //         </div>
    //     </div>
    const harcamaDiv = document.createElement('div');
    // class ekleme
    harcamaDiv.classList.add('harcama');
    // eğer odendi checkbox in içindeki check değeri true ise
    if (odendiCheck.checked == true) {
        harcamaDiv.classList.add('odendi');
    }
    // içeriğini ayarlama
    harcamaDiv.innerHTML = `
    <h2>${harcamaInput.value}</h2>
    <h2 id="value">${fiyatIpnut.value}</h2>
    <div class="buttons">
        <img id="payment" src="./images/pay.png"/ >
        <img id="remove" src="./images/delete.png"/ >
    </div>`
        ;

    // oluşturulan harcamayı hmtl de listeye ekleme
    liste.appendChild(harcamaDiv);

    // toplamı güncelleme fonskiyonun çağırılması
    updateToplam(fiyatIpnut.value);
    // formu temizleme
    harcamaInput.value = '';
    fiyatIpnut.value = '';




}
// listede herhangibir elemana tıklandığında çalıacak fonk. handleClick
// listeye tıklanma olayını ele alma yönetme
function handleClick(e) {
    //! console.log(e.target);
    const element = e.target;
    //    eger tıklanılan elemanın id'si remove ise
    if (element.id == 'remove') {
        //! alert('Silme işlemi başlatıldı');


        // harcama kapsayıcısına  erişmek ve onu remove metodu ile silmek
        const wrapperElement = element.parentElement.parentElement;
        // silinen elementin fiyatını alma 
        const silinecekFiyat = wrapperElement.querySelector('#value').innerText;



        // silinen fiyatın stringden numbera çevirilip toplamdan çıkarılması
        updateToplam(-Number(silinecekFiyat));
        wrapperElement.remove();

    }
}


// filtreleme fonksiyonunun oluşturulkması
function handleFilter(e) {
    // optionların value'suna erişilmesi
    //! console.log(e.target.value);
    // listenin içindeki çocuklara erişilmesi
    //! console.log(liste.childNodes);
    const items = liste.childNodes;
    console.dir(items);
    console.log(items);
    // tüm elemanlarda gezinmek
    items.forEach((item) => {
        switch (e.target.value) {
          case 'all':
            item.style.display = 'flex';
            break;
    
          case 'paid':
            if (!item.classList.contains("paid")) {
              item.style.display = 'none';
            } else {
              item.style.display = 'flex';
            }
    
            break;
    
          case 'not-paid':
            if (item.classList.contains("paid")) {
              item.style.display = 'none';
            } else {
              item.style.display = 'flex';
            }
            break;
        }
      });
    }
    
