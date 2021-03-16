function Validation() {
    //Kiểm tra rỗng
    this.kiemTraRong = function (value, spanID, message) {
        if (value == "") {
            //Nếu giá trị bị rỗng
            getEle(spanID).innerHTML = message;
            getEle(spanID).style.display = "block";
            return false;
        }
        //Giá trị không bị rỗng
        getEle(spanID).innerHTML = "";
        getEle(spanID).style.display = "none";
        return true;
    }
    this.kiemTraMaTrung = function (value, mangNV, spanID, message) {
        var isExist = false;

        mangNV.map(function (item, index) {
            /**
                 * = là gán giá tri
                 * == so sánh giá trị của biến
                 * === so sánh cả giá trị và kiểu data của biến
                 *  *///Mã  bị trùng
            if (item.maNV === value) {
                //Mã bị trùng
                //gán lại giá trị của isExist thành true (đã tồn tại mã nhân viên)
                isExist = true;

            }
        });

        //Map không dừng được vòng lặp của function nên chạy xuống khúc dưới

        //Mã bị trùng
        if (isExist == true) {
            //Thông báo k hợp lệ
            getEle(spanID).innerHTML = message;
            getEle(spanID).style.display = "block";
            return false;

        } else {
            //Thông báo hợp lệ
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }

    }
    this.kiemTraTen = function (value, spanID, message) {
        // Khai báo 1 thể hiện của biểu thức Regular expression
        var pattern = new RegExp(
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );
        if (pattern.test(value)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        } else {
            getEle(spanID).innerHTML = message;
            getEle(spanID).style.display = "block";
            return false;
        }
    }
    this.kiemTraEmail = function (value, spanID, message) {
        //biểu thức của Regular expression
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(mailFormat)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        //Nếu email k hợp lệ
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }

    this.kiemTraDoDai = function (value, spanID, message, min, max) {
        if (value.length >= min && value.length <= max) {
            //Nếu password hợp lệ
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        //Nếu password k hợp lệ
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    this.kiemTraChucVu = function (selectID, spanID, message) {
        // selectedIndex
        // Nếu lựa chọn khác vị trí đầu tiên
        if (getEle(selectID).selectedIndex != 0) {
            // Nếu hợp lệ
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        //Nếu k hợp lệ chức vụ
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
}