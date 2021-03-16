//Chứa các hàm cho Quản lý nhân viên
/**
 * B1: Tạo hàm lấy thông tin từ Form (Lấy sau khi click Button)
 * 
 * B2: Lưu thông tin vào đối tượng nhân viên
 * B3: Tạo lớp danh sách nhân viên để làm nơi lưu trữ nhiều nhân viên
 * 
 */

var dsnv = new DanhSachNhanVien();
var validation = new Validation();
getLocalStorage();


//Giúp viết gọn cú pháp getElementById
function getEle(id) {
    //Trả về đối tượng thẻ được tìm thấy
    return document.getElementById(id);
}


//Xử lý form khi thêm nhân viên mới
getEle("btnThem").addEventListener("click", function () {
    getEle("msnv").removeAttribute("disabled");

    //C1: Clear theo request của KH
    // getEle("msnv").value = "";

    // C2: Clear hết all ô trong form
    getEle("formNV").reset();

    //Xử lý button
    //Hiện nút thêm người dùng
    //Ẩn nút update vì chỉ thêm NV
    getEle("btnThemNV").style.display = 'block';
    getEle("btnCapNhat").style.display = 'none';

});

// Hàm lấy thông tin sinh viên từ form
function layThongTin() {
    var maNV = getEle("msnv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    // var email = getEle("email").value ;

    //Dùng để hiện thị info của các biến mình nhập vào, bắt buộc phải có thì mới làm tiếp dc
    console.log(maNV, hoTen, email, password, ngayLam, chucVu);


    //Xử lý kiểm tra info
    // debugger;
    var isValid = true;
    /**
     * &: Cộng dự liễu theo kiểu binary
     * &&: so sánh điều kiện and (cả 2 vế trước và sau đều phải đúng - true);
     */
    // Kiểm tra mã nhân viên: Nhân viên k được rỗng
    isValid &= validation.kiemTraRong(maNV, "tbMaNV", "Mã nhân viên k được để trống") && validation.kiemTraMaTrung(maNV, dsnv.mangNV, "tbMaNV", "Mã nhân viên không được trùng");

    //isValid mới = isValid cũ nối binary với thằng ktra rỗng
    //isValid(mới) = isValid(cũ) & validation.kiemTraRong
    isValid &= validation.kiemTraRong(hoTen, "tbTen", "Tên nhân viên k được để trống") && validation.kiemTraTen(hoTen, "tbTen", "Tên nhân viên k hợp lệ");

    isValid &= validation.kiemTraRong(email, "tbEmail", "Email k được để trống") && validation.kiemTraEmail(email, "tbEmail", "Email nhân viên k hợp lệ");

    isValid &= validation.kiemTraRong(password, "tbMatKhau", "Password k được để trống") && validation.kiemTraDoDai(password, "tbMatKhau", "Password k hợp lệ, phải từ 6 đến 12 kí tự", 6, 12);

    isValid &= validation.kiemTraRong(ngayLam, "tbNgay", "Ngày làm k được để trống");


    //Kiểm tra chức vụ: Chọn chức vụ phải chọn các option từ vị trí thứ 2 trở đi (index:1 trở đi)
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Chưa chọn chức vụ");

    //All info Nhân viên đều hợp lệ
    if (isValid == true) {
        var nv = new NhanVien(maNV, hoTen, email, password, ngayLam, chucVu);
        console.log(nv);

        //Tạo biến dsnv là biến toàn cục
        dsnv.themNhanVien(nv);
        console.log(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }


    //Thể hiện (instance) của đối tượng nhân viên
    // var nv = new NhanVien(maNV, hoTen, email, password, ngayLam, chucVu);
    // console.log(nv);

    //Tạo biến dsnv là biến toàn cục
    // dsnv.themNhanVien(nv);
    // console.log(dsnv.mangNV);

    // setLocalStorage(dsnv.mangNV);
}


//
//Gọi hàm layThongTin
getEle("btnThemNV").addEventListener("click", function () {
    layThongTin();
    hienThiDanhSach();
});

function hienThiDanhSach(mangNV) {
    // i: Vị trí của phần tử trong mảng
    //i luôn bắt đầu bằng 0
    //Điều kiện để tiếp tục duyệt mảng, thì i phải nhỏ hơn độ dài của mảng, nếu lớn hơn thì xuất ra luôn 
    var tbody = getEle("tableDanhSach");
    var content = "";
    for (var i = 0; i < mangNV.length; i++) {
        var nv = mangNV[i];
        //String template
        //contetn = contentOld + contentNew
        //Đây là dấu huyền
        content += `
         <tr>
            <td>${nv.maNV}</td>
            <td>${nv.hoTenNV}</td>
            <td>${nv.emailNV}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVuNV}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNV}')">Xóa</button>
                <button class="btn btn-success" onclick="suaNhanVien('${nv.maNV}')" data-toggle="modal"
                data-target="#myModal" >Sửa</button>
            </td>
         </tr>       
         `;

    }
    console.log(content);
    tbody.innerHTML = content;
}

//Lưu danh sách xuống localStorage
function setLocalStorage(mangNV) {
    //DSNV: tên cái danh sách muốn lưu trữ
    //mangNV: tên mảng lưu trữ vào trong LocalStorage
    //JSON: kiểu data truyền qa lại giữa FE vs BE (link API)
    // Chuyển từ mảng về JSON để lưu xuống LocalStorage
    localStorage.setItem("DSNV", JSON.stringify(mangNV));
}


//Lấy danh sách nhân viên từ LocalStorage
function getLocalStorage() {
    // Chuyển từ  JSON về kiểu mảng để hiện lên trên web cho ng dùng
    //Nếu có DSNV trong localStorage thì mới lấy lên và lưu vào mảng
    if (localStorage.getItem("DSNV") != null) {
        var ds = JSON.parse(localStorage.getItem("DSNV"));
        //   console.log(ds);
        dsnv.mangNV = ds;
        hienThiDanhSach(dsnv.mangNV);
    }


}


//Hàm xóa nhân viên
function xoaNhanVien(ma) {
    dsnv.xoaNV(ma);
    hienThiDanhSach(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

//Hàm sửa nhân viên
function suaNhanVien(ma) {
    var nv = dsnv.layThongTinNV(ma);
    // console.log(nv);
    getEle("msnv").setAttribute('disabled', true);

    getEle("msnv").value = nv.maNV;
    getEle("name").value = nv.hoTenNV;
    getEle("email").value = nv.emailNV;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.ngayLam;
    getEle("chucvu").value = nv.chucVuNV;

    //Ẩn hiện nút thêm và cập nhật
    getEle("btnThemNV").style.display = 'none';
    getEle("btnCapNhat").style.display = 'block';

}

getEle("btnCapNhat").addEventListener('click', function () {
    var maNV = getEle("msnv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    // var email = getEle("email").value ;

    //Dùng để hiện thị info của các biến mình nhập vào, bắt buộc phải có thì mới làm tiếp dc
    console.log(maNV, hoTen, email, password, ngayLam, chucVu);

    //Thể hiện (instance) của đối tượng nhân viên
    var nv = new NhanVien(maNV, hoTen, email, password, ngayLam, chucVu);
    console.log(nv);

    dsnv.capNhatNV(nv);
    hienThiDanhSach(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
});

//Khai báo hàm tìm kiếm nhân viên theo tên
//Kiểu của var là kiểu String
// Version 1: search khi click button
getEle("btnTimNV").addEventListener("click", function () {
    //trim(): Xóa khoảng cách trước và sau của chuỗi
    // Nếu từ khóa có khảng cách ở giữa chuỗi thì dùng replace() để thay thế ký tự của dấu cách bằng ký tự rỗng ""
    var keyword = getEle("searchName").value.trim();
    console.log(keyword);
    var mangKQ = dsnv.timKiemNhanVien(keyword);
    console.log(mangKQ);
    hienThiDanhSach(mangKQ);
});

// Version 2: Người dùng gõ keyword search now


