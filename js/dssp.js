function currency(num) {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND';
}

function showProductList() {
    var productArr = [];
    if (localStorage.getItem('product') == null) {
        return false;
    }
    productArr = JSON.parse(localStorage.getItem('product'));
    var tr = '<tr><th>STT</th><th>Id</th><th>Hãng</th><th>Hình ảnh</th><th>Tên sản phẩm</th><th>Giá</th><th>Xóa</th><th>Sửa</th></tr>';
    for (var i = 0; i < productArr.length; i++) {
        tr += '<tr><td>' + (i + 1) + '</td><td>' + productArr[i].productId + '</td><td>' + productArr[i].brand + '</td><td><img src = "./../' + productArr[i].img + '" alt = "alt" style = "width: 100px; height: 100px"/></td><td>' + productArr[i].name + '</td><td>' + productArr[i].price + '</td><td><button class="" onClick="deletesp(\'' + productArr[i].productId + '\')">&times;</button></td><td><button id ="" onClick="showchangeproductbox(' + productArr[i].productId + ');">Sửa</button></td></tr>';

    }
    document.getElementById('productlist').innerHTML = tr;

}


function deletesp(productdelete) {
    var productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {

        if (productArr[i].productId == productdelete) {
            if (confirm('Bạn có muốn xóa sản phẩm này?')) {
                productArr.splice(i, 1);
            }
        }
    }
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList();
}

function addProduct() {
    var productArr = JSON.parse(localStorage.getItem('product'));
    var productId = document.getElementById('productid');
    var productname = document.getElementById('productname');
    var brand = document.getElementById('brand');
    var price = document.getElementById('productprice');
    if (!productId.value || !brand.value || !productname.value || !price.value) {
        alert('Bạn chưa nhập đủ thông tin sản phẩm', 'warning');
        return false;
    }
    if (isNaN(Number(productId.value))) {
        alert('Id không hợp lệ', 'warning');
        return false;
    }
    if (isNaN(Number(price.value))) {
        alert('Giá không hợp lệ', 'warning');
        return false;
    }
    var img = document.getElementById('files').files[0].name;
    var producttemp = { productId: productId.value, brand: brand.value, img: 'img/' + img, name: productname.value, price: price.value };
    productArr.push(producttemp);
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList(0);
    alert('Thêm sản phẩm thành công', 'success');
}

function edit(key) {

    var productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].productId == key) {
            document.getElementById('index').value = key;
            document.getElementById('productadd').style.display = 'none';
            document.getElementById('change').style.display = 'inline-block';
        }
    }
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList(0);
}


function editProduct(id) {
    document.getElementById('change').style.display = 'none';
    var productArr = JSON.parse(localStorage.getItem('product'));
    var vitri;

    for (var i = 0; i < productArr.length; i++) {

        if (productArr[i].productId == id) {
            productArr[i].brand = document.getElementById('brand').value;
            productArr[i].name = document.getElementById('productname').value;
            productArr[i].price = document.getElementById('productprice').value;
        }
    }
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList(vitri);

}
var changeproductimage = null;

function changeimage() {
    changeproductimage = document.getElementById('changeImg').files[0].name;
    document.getElementById('changeimg').src = './../img/' + changeproductimage;
}

function showchangeproductbox(id) {

    document.getElementById('changebox').style.display = 'block';
    var tempProduct;
    productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].productId === id) alert(id);
        if (productArr[i].productId === id) {
            tempProduct = productArr[i];
        }
    }
    document.getElementById('c-productid').placeholder = 'ID cũ: ' + tempProduct.productId;
    document.getElementById('c-productid').value = tempProduct.productId;
    document.getElementById('c-productbrand').placeholder = 'Hãng cũ:' + tempProduct.brand;
    document.getElementById('c-productbrand').value = tempProduct.brand;
    document.getElementById('c-productname').placeholder = 'Tên cũ: ' + tempProduct.name;
    document.getElementById('c-productname').value = tempProduct.name;
    document.getElementById('c-productprice').placeholder = 'Giá cũ: ' + currency(tempProduct.price);
    document.getElementById('c-productprice').value = tempProduct.price;
    document.getElementById('changeimg').src = './../' + tempProduct.img;
    document.getElementById('changebutton').setAttribute('onclick', 'changeproduct(' + id + ')');

}

function closechange() {
    document.getElementById('changebox').style.display = 'none';
}

function changeproduct(id) {
    var product;
    productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].productId === id) var tempproduct = productArr[i];
    }
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].productId === id) {
            productArr[i].productId = document.getElementById('c-productid').value;
            productArr[i].brand = document.getElementById('c-productbrand').value;
            productArr[i].name = document.getElementById('c-productname').value;
            productArr[i].price = document.getElementById('c-productprice').value;
            if (changeproductimage === null) productArr[i].img = tempproduct.img;
            else productArr[i].img = 'img/' + changeproductimage;
        };
    }
    localStorage.setItem('product', JSON.stringify(productArr));
    document.getElementById('changebox').style.display = 'none';
    location.reload();
}
document.getElementById("files").onchange = function() {
    var reader = new FileReader();

    reader.onload = function(e) {
        // nhận dữ liệu đã tải và hiển thị hình thu nhỏ
        document.getElementById("image").src = e.target.result;
    };

    // đọc tệp hình ảnh dưới dạng dữ liệu URL .
    reader.readAsDataURL(this.files[0]);
};

function showUserList() {
    if (localStorage.getItem('user') === null) {
        return false;
    }
    var userArray = JSON.parse(localStorage.getItem('user'));
    var tr = '<tr><th>STT</th><th>HỌ TÊN KH</th><th>TÊN ĐĂNG NHẬP</th><th>NGÀY ĐĂNG KÝ</th><th>Xóa</th></tr>';
    for (var i = 1; i < userArray.length; i++) {
        tr += '<tr><td>' + i + '</td><td>' + userArray[i].fullname + '</td><td>' + userArray[i].username + '</td><td>' + userArray[i].datesignup + '</td><td><button class="delete" onClick="deleteuser(\'' + userArray[i].username + '\')">&times;</button></td></tr>';
    }
    document.getElementById('userlist').innerHTML = tr;
}

function deleteuser(usernamedelete) {
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].username == usernamedelete) {
            if (confirm('Bạn có muốn xóa tài khoản này?')) {
                userArray.splice(i, 1);
            }
        }
    }
    localStorage.setItem('user', JSON.stringify(userArray));
    showUserList();
}