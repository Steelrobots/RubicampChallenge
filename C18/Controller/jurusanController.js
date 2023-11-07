import { line } from "../C18.js";
import Jurusan from "../Models/jurusan.js";
import { findResult, option, tabel } from "../Views/jurusanView.js";
import { rl } from "../connect.js";



export default class JurusanController {

    static option() {
        option()
        rl.question("Masukkan salah satu nomor dari opsi di atas: ", (index) => {
            switch (index) {
                case '1':
                    JurusanController.listAll();
                    break;
                case '2':
                    JurusanController.find();
                    break;
                case '3':
                    JurusanController.add();
                    break;
                case '4':
                    JurusanController.delete();
                    break;
                case '5':
                    JurusanController.home();
                    break;
                default:
                    console.log('Nomor yang anda masukkan tidak sesuai, silahkan coba lagi');
                    JurusanController.option();
                    break;



            }

        })
    }

    static listAll() {
        Jurusan.list(function (data) {
            tabel(data);
            JurusanController.option()
        })
    }
    static find() {
        rl.question('Masukkan Kode Jurusan: ', async (kode) => {
            const search = await Jurusan.find(kode);
            if (search) {
               findResult(search);
                JurusanController.option()
            } else {
                console.log(`Jurusan dengan kode ${kode}, tidak terdaftar`);
                JurusanController.option()
            }
        })

    }
    static async add() {
        console.log('Lengkapi data di bawah ini:');
        
            rl.question('Kode Jurusan : ', async (kode) => {
                rl.question('Nama Jurusan : ', async (nama) => {
                    if (await Jurusan.find(kode)) {
                        console.log('Gagal menambahkan Jurusan karena sudah ada di database');
                        JurusanController.option()
                    } else {
                        Jurusan.add(kode, nama);
                        console.log('jurusan telah ditambahkan');
                        JurusanController.option()
                    }
                })
            })
        }
    
    static delete(){
        rl.question('Masukkan Kode Jurusan: ', async (kode) =>{
            const jurusan = await Jurusan.find(kode)
            if(jurusan)
            console.log(`Data Jurusan ${kode}, telah dihapus`)
         Jurusan.delete(kode),
        JurusanController.option()
        })
    }


}
