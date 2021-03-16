//Chứa lớp đối tượng danh sách nhân viên, giúp quản lý nhiều nhân viên
function DanhSachNhanVien() {
    //thuộc tính
    this.mangNV = [];
    // Phương thức
    this.themNhanVien = function (nv) {
        //thêm phần tử mới vào mảng
        this.mangNV.push(nv);
    }
    //Tìm vị trí của nhân viên trong mảng dựa vào maNV(Mã nhân viên)
    this.timViTri = function (ma) {
        //local var
        var viTri = -1;
        //Map dùng để duyệt mảng của JS
        this.mangNV.map(function (item, index) {
            //item là 1 nhân viên trong mảng
            //ma: mã nhân viên cần tìm
            //index: vị trí của phần tử trong mảng
            if (item.maNV == ma) {
                //Tìm thấy nhân viên thì gán vị trí của nhân viên vào biến vị trí
                viTri = index;


            }
        });
        return viTri;
    };
    this.xoaNV = function (ma) {
        var viTri = this.timViTri(ma);
        if (viTri > -1) {
            //Xóa nhân viên
            this.mangNV.splice(viTri, 1);
        }
    }
    //Lấy thông tin của 1 NV
    this.layThongTinNV = function (ma) {
        var viTri = this.timViTri(ma);
        var nhanVien;
        if (viTri > -1) {
            //Gán nhân viên tìm được trong mảng vào biến nhanVien
            nhanVien = this.mangNV[viTri];
        }
        return nhanVien;
    }
    this.capNhatNV = function (nv) {
        var viTri = this.timViTri(nv.maNV);
        if (viTri > -1) {
            //Đem thông tin mới ghi đè lên thông tin cũ

            this.mangNV[viTri] = nv;
        }

    }
}

//prototype: Chứa toàn bộ thuộc tính và phương thức của đối tượng

DanhSachNhanVien.prototype.timKiemNhanVien = function (keyword) {
    //Mảng kết quả tìm kiếm
    var mangKQ = [];

    //Chuyển từ khóa sang kiểu chữ thường đi so sánh
    keyword = keyword.toLowerCase();
    console.log(keyword);
    this.mangNV.map(function (item, index) {
        //Chuyển tên NV sang kiểu chữ thường
        var tenChuThuong = item.hoTenNV.toLowerCase();

        //indexOf: tìm vị trí của keyword trong tên chữ thường
        //nếu tìm thấy thì sẽ trả về vị trí của keyword
        if (tenChuThuong.indexOf(keyword) > -1) {
            //Tìm thấy từ khóa là keyword trong (tenChuThuong)
            //Thêm nhân viên tìm thấy vào mảng KQ
            mangKQ.push(item);
        }
    });

    return mangKQ;
}