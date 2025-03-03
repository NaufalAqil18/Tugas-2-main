const fs = require('fs');
const readline = require('readline-sync');

const DB_FILE = 'database.json';

// Fungsi untuk membaca database JSON
function readDatabase() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Fungsi untuk menulis ke database JSON
function writeDatabase(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Menampilkan semua item
function lihatSemuaItem() {
    const items = readDatabase();
    console.log("\n=== Daftar Produk Minimarket ===");
    items.forEach(item => {
        console.log(`${item.id}. ${item.nama} - Rp${item.harga} (Stok: ${item.stok})`);
    });
}

// Menampilkan detail satu item
function lihatSatuItem() {
    const items = readDatabase();
    const id = readline.questionInt("Masukkan ID produk: ");
    const item = items.find(i => i.id === id);
    
    if (item) {
        console.log(`\n=== Detail Produk ===\nID: ${item.id}\nNama: ${item.nama}\nHarga: Rp${item.harga}\nStok: ${item.stok}`);
    } else {
        console.log("Produk tidak ditemukan.");
    }
}

// Menambahkan item baru
function tambahItem() {
    const items = readDatabase();
    
    const nama = readline.question("Masukkan nama produk: ");
    const harga = readline.questionInt("Masukkan harga produk: ");
    const stok = readline.questionInt("Masukkan jumlah stok: ");
    
    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        nama,
        harga,
        stok
    };

    items.push(newItem);
    writeDatabase(items);
    console.log("Produk berhasil ditambahkan!");
}

// Mengupdate item
function updateItem() {
    const items = readDatabase();
    const id = readline.questionInt("Masukkan ID produk yang ingin diperbarui: ");
    const index = items.findIndex(i => i.id === id);
    
    if (index !== -1) {
        const nama = readline.question(`Nama baru (${items[index].nama}): `) || items[index].nama;
        const harga = readline.questionInt(`Harga baru (${items[index].harga}): `) || items[index].harga;
        const stok = readline.questionInt(`Stok baru (${items[index].stok}): `) || items[index].stok;

        items[index] = { id, nama, harga, stok };
        writeDatabase(items);
        console.log("Produk berhasil diperbarui!");
    } else {
        console.log("Produk tidak ditemukan.");
    }
}

// Menghapus item
function hapusItem() {
    const items = readDatabase();
    const id = readline.questionInt("Masukkan ID produk yang ingin dihapus: ");
    const newItems = items.filter(i => i.id !== id);
    
    if (newItems.length !== items.length) {
        writeDatabase(newItems);
        console.log("Produk berhasil dihapus!");
    } else {
        console.log("Produk tidak ditemukan.");
    }
}

// Menampilkan menu
function mainMenu() {
    while (true) {
        console.log("\n=== Minimarket CLI ===");
        console.log("1. Lihat semua produk");
        console.log("2. Lihat satu produk");
        console.log("3. Tambah produk");
        console.log("4. Perbarui produk");
        console.log("5. Hapus produk");
        console.log("6. Keluar");

        const pilihan = readline.questionInt("Masukkan nomor pilihan: ");
        if (pilihan === 1) lihatSemuaItem();
        else if (pilihan === 2) lihatSatuItem();
        else if (pilihan === 3) tambahItem();
        else if (pilihan === 4) updateItem();
        else if (pilihan === 5) hapusItem();
        else if (pilihan === 6) {
            console.log("Terima kasih telah menggunakan Minimarket CLI!");
            break;
        } else {
            console.log("Pilihan tidak valid, coba lagi.");
        }
    }
}

// Menjalankan program
mainMenu();
