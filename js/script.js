createAdmin();

function currency(num) {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VND';
}

function showMenu() {
    var menuList = ['ADIDAS', 'NIKE', 'VANS', 'BALENCIAGA'];
    var ul = document.getElementById('navmenu');
    var li = '<li><a href="index.html">TRANG CHỦ</a></li>';
    for (var i = 0; i < menuList.length; i++) {
        li += '<li><a href="index.html?' + menuList[i].toLowerCase() + '&0">' + menuList[i] + '</a></li>';
        ul.innerHTML = li;
    }
}

function showMenu2() {
    var menuList = ['ADIDAS', 'NIKE', 'VANS', 'BALENCIAGA'];
    var ul = document.getElementById('navmenu');
    var li = '<li><a href="../index.html">TRANG CHỦ</a></li>';
    for (var i = 0; i < menuList.length; i++) {
        li += '<li><a href="../index.html?' + menuList[i].toLowerCase() + '&0">' + menuList[i] + '</a></li>';
        ul.innerHTML = li;
    }
}

function showMenuMobile() {
    var btn = document.getElementById('btnmenu');
    if (btn.className == "") {
        document.getElementById('btnmenu').classList.add('show');
        document.getElementById('btnmenu').innerHTML = '<i class="ti-close"></i>';
        document.getElementById('navmenu').classList.add('active');

    } else {
        document.getElementById('btnmenu').classList.remove('show');
        document.getElementById('btnmenu').innerHTML = '<i class="ti-align-justify"></i>';
        document.getElementById('navmenu').classList.remove('active');
    }

}
/*USER*/
function createAdmin() {
    if (localStorage.getItem('user') === null) {
        var userArray = [];
        var user = { username: 'admin', password: 'admin', fullname: 'Trần Phương Vy', address: '273 An Dương Vương, P3, Quận 5, TPHCM', phone: '0934829316', datesignup: '17/11/2021' };
        userArray.push(user);
        localStorage.setItem('user', JSON.stringify(userArray));
    }
}

function showform() {
    var userform = document.getElementById('user');
    userform.style.display = 'block';
}

function closeform() {
    var userform = document.getElementById('user');
    userform.style.display = 'none';
}

function showSignUp() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}
document.getElementById('signupform').addEventListener('submit', createUser);
document.getElementById('loginform').addEventListener('submit', login);

function createUser(e) {
    e.preventDefault();
    var fullname = document.getElementById('fullname');
    var address = document.getElementById('address');
    var phone = document.getElementById('phone');
    var username = document.getElementById('usernameSignUp');
    var password = document.getElementById('passwordSignUp');
    var password2 = document.getElementById('passwordSignUp2');
    var flag = true;
    if (!fullname.value) {
        document.getElementById('fullnameerror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('fullnameerror').style.display = 'none';
    }
    if (!address.value) {
        document.getElementById('addresserror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('addresserror').style.display = 'none';
    }
    if (!phone.value) {
        document.getElementById('phoneerror').style.display = 'block';
        flag = false;
    } else {
        if (isNaN(Number(phone.value))) {
            document.getElementById('phoneerror').style.display = 'block';
            document.getElementById('phoneerror').innerHTML = 'Số điện thoại không hợp lệ';
            flag = false;
        } else {
            if (Number(phone.value) < 100000000 || Number(phone.value) > 999999999) {
                document.getElementById('phoneerror').style.display = 'block';
                document.getElementById('phoneerror').innerHTML = 'Số điện thoại không đúng';
                flag = false;
            } else {
                document.getElementById('phoneerror').style.display = 'none';
            }
        }
    }
    if (!username.value) {
        document.getElementById('usererror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('usererror').style.display = 'none';
    }
    if (!password.value) {
        document.getElementById('passworderror').style.display = 'block';
        flag = false;
    } else {
        if (password.value.length < 8) {
            document.getElementById('passworderror').style.display = 'block';
            document.getElementById('passworderror').innerHTML = 'Mật khẩu phải trên 8 ký tự';
            flag = false;
        } else {
            document.getElementById('passworderror').style.display = 'none';
        }
    }
    if (password2.value != password.value) {
        document.getElementById('password2error').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('password2error').style.display = 'none';
    }
    if (flag == false) {
        return false;
    }
    var d = new Date();
    var datesignup = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var user = { username: username.value, password: password.value, fullname: fullname.value, address: address.value, phone: phone.value, datesignup: datesignup };
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (user.username == userArray[i].username) {
            document.getElementById('usererror').style.display = 'block';
            document.getElementById('usererror').innerHTML = 'Tên đăng nhập đã có người sử dụng';
            username.focus();
            return false;
        }
    }
    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
    alert('Bạn đã đăng ký thành công!', 'success');
    showLogin();
}

function login(e) {
    e.preventDefault();
    var username = document.getElementById('usernameLogin').value;
    var password = document.getElementById('passwordLogin').value;
    var flag = true;
    if (!username) {
        document.getElementById('usernameerror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('usernameerror').style.display = 'none';
    }
    if (!password) {
        document.getElementById('passwordloginerror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('passwordloginerror').style.display = 'none';
    }
    if (flag == false) {
        return false;
    }
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username) {
            if (password == userArray[i].password) {
                closeform();
                localStorage.setItem('userlogin', JSON.stringify(userArray[i]));
                window.location.reload(true);
                return true;
            }
        }
    }
    document.getElementById('passwordloginerror').style.display = 'block';
    document.getElementById('passwordloginerror').innerHTML = 'Sai thông tin đăng nhập';
    return false;
}

function logout(url) {
    localStorage.removeItem('userlogin');
    localStorage.removeItem('cart');
    location.href = url;
}

function checklogin() {
    if (localStorage.getItem('userlogin')) {
        var user = JSON.parse(localStorage.getItem('userlogin'));
        var s = '';
        if (user.username == 'admin') {
            s = '<li><button onClick="window.location.href=\'file/QLSP.html\'"><i class="ti-settings"></i></button></li>' +
                '<li><button>' + user.fullname + '</button><button id="btnlogout" onClick="logout(\'index.html\')">LOGOUT</button></li>' +
                '<li><button onClick="location.href=\'file/cart.html\'"><i class="ti-shopping-cart-full"></i></button></li>' +
                '<li><button onClick="showSearch()"><i class="ti-search"></i></button></li>';
        } else {
            s = '<li><button>' + user.fullname + '</button><button id="btnlogout" onClick="logout(\'index.html\')">LOGOUT</button></li>' +
                '<li><button onClick="location.href=\'file/cart.html\'"><i class="ti-shopping-cart-full"></i></button></li>' +
                '<li><button onClick="showSearch()"><i class="ti-search"></i></button></li>';
        }
        document.querySelector('#nav .topnav ul.right').innerHTML = s;
    }
}

function checklogin2() {
    if (localStorage.getItem('userlogin')) {
        var user = JSON.parse(localStorage.getItem('userlogin'));
        var s = '';
        if (user.username == 'admin') {
            s = '<li><button onClick="window.location.href=\'../file/QLSP.html\'"><i class="ti-settings"></i></button></li>' +
                '<li><button>' + user.fullname + '</button><button id="btnlogout" onClick="logout(\'../index.html\')">LOGOUT</button></li>' +
                '<li><button onClick="location.href=\'file/cart.html\'"><i class="ti-shopping-cart-full"></i></button></li>';
        } else {
            s = '<li><button>' + user.fullname + '</button><button id="btnlogout" onClick="logout(\'../index.html\')">LOGOUT</button></li>' +
                '<li><button onClick="location.href=\'file/cart.html\'"><i class="ti-shopping-cart-full"></i></button></li>';
        }
        document.querySelector('#nav .topnav ul.right').innerHTML = s;
    }
}

//bannerbegin
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slideShow");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}
/*productinfo*/
function showProductInfo(productid) {
    document.getElementById('productInfo').style.display = 'block';
    var productArray = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArray.length; i++) {
        if (productArray[i].productId == productid) {
            document.getElementById('productname').innerHTML = productArray[i].name;
            document.getElementById('productprice').innerHTML = 'Giá: ' + currency(productArray[i].price);
            document.getElementById('imgbig').src = productArray[i].img;
            document.getElementById('size').value = 36;
            document.getElementById('quantity').value = 1;
            document.querySelector('#info .right button.addtocart').setAttribute('onClick', 'addToCart(' + productid + ')');
        }
    }
}

function closeProductInfo() {

    document.getElementById('productInfo').style.display = 'none';
}
//Cart//
function addToCart(productid1) {
    var size = document.getElementById('size').value;
    var quantity = document.getElementById('quantity').value;
    var productArray = JSON.parse(localStorage.getItem('product'));
    var producttemp;
    for (var i = 0; i < productArray.length; i++) {
        if (productArray[i].productId === productid1) {
            producttemp = productArray[i];
        }
    }

    if (localStorage.getItem('cart') === null) {
        var cartArray = [];
        producttemp.quantity = quantity;
        producttemp.size = size;
        productArray.totalprice = quantity * producttemp.price;
        cartArray.unshift(producttemp);
        localStorage.setItem('cart', JSON.stringify(cartArray));

    } else {
        var cartArray = JSON.parse(localStorage.getItem('cart'));
        producttemp.quantity = quantity;
        producttemp.size = size;
        producttemp.totalprice = quantity * producttemp.price;
        cartArray.unshift(producttemp);
        localStorage.setItem('cart', JSON.stringify(cartArray));
    }
    document.getElementById('chitiet').style.display = 'none';
}

function showCartTable() {
    if (localStorage.getItem('cart') === null || localStorage.getItem('cart') == '[]') {
        var s = '<tr><th>Không có sản phẩm nào trong giỏ hàng</th></tr>';
        document.getElementById('carttable').innerHTML = s;
        document.getElementById('totalprice').innerHTML = 0;
    } else {
        var cartArray = JSON.parse(localStorage.getItem('cart'));
        var s = '<tr><th></th><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Tổng</th><th></th></tr>';
        var totalprice = 0;
        for (var i = 0; i < cartArray.length; i++) {
            s += '<tr>' +
                '<td><img src="../' + cartArray[i].img + '"></td>' +
                '<td>' +
                '<div>' + cartArray[i].name + '</div>' +
                '<div>Size: ' + cartArray[i].size + '</div>' +
                '</td>' +
                '<td>' + currency(cartArray[i].price) + '</td>' +
                '<td>' +
                '<button onClick="quantitydown2(' + cartArray[i].productId + ')">-</button>' +
                '<input id="quantity" type="text" disabled value="' + cartArray[i].quantity + '" onchange="updateCart(this.value,' + cartArray[i].productId + ')">' +
                '<button onClick="quantityup2(' + cartArray[i].productId + ')">+</button>' +
                '</td>' +
                '<td>' + currency(cartArray[i].price * cartArray[i].quantity) + '</td>' +
                '<td><button onClick="deletecartitem(' + cartArray[i].productId + ')">&times;</buttom></td>' +
                '</tr>';
            totalprice += cartArray[i].price * cartArray[i].quantity;
        }
        document.getElementById('carttable').innerHTML = s;
        document.getElementById('totalprice').innerHTML = currency(totalprice);
    }
}

function deletecartitem(id) {
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productId == id) {
            cartArray.splice(i, 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    showCartTable();
}

function deletecart() {
    localStorage.removeItem('cart');
    showCartTable();
}

function updateCart(quantity, id) {
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productId == id) {
            cartArray[i].quantity = quantity;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    showCartTable();
}

function quantitydown() {
    if (document.getElementById('quantity').value > 1) {
        document.getElementById('quantity').value--;
    }
}

function quantityup() {

    document.getElementById('quantity').value++;
}

function quantitydown2(id) {
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productId === id) {
            if (cartArray[i].quantity > 1) cartArray[i].quantity--;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    showCartTable();
}

function quantityup2(id) {
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productId === id) {
            cartArray[i].quantity++;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    showCartTable();
}

function buy() {
    if (localStorage.getItem('userlogin') === null) {
        alert('Bạn phải đăng nhập để mua sản phẩm', 'warning');
        return false;
    }
    var info = '';
    var totalprice = 0;
    if (localStorage.getItem('cart') === null || localStorage.getItem('cart') == '[]') {
        return false;
    }
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cartArray.length; i++) {
        info += cartArray[i].quantity + ' x ' + cartArray[i].name + ' size ' + cartArray[i].size + '; ';
        totalprice += cartArray[i].quantity * cartArray[i].price;
    }
    var customer = JSON.parse(localStorage.getItem('userlogin'));
    var date = new Date();
    var d = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    if (localStorage.getItem('bill') === null) {
        var billArray = [];
        var bill = { id: billArray.length, info: info, totalprice: totalprice, customer: customer, date: d, status: 'Chưa xử lý' };
        billArray.unshift(bill);
        localStorage.setItem('bill', JSON.stringify(billArray));
    } else {
        var billArray = JSON.parse(localStorage.getItem('bill'));
        var bill = { id: billArray.length, info: info, totalprice: totalprice, customer: customer, date: d, status: 'Chưa xử lý' };
        billArray.unshift(bill);
        localStorage.setItem('bill', JSON.stringify(billArray));
    }
    localStorage.removeItem('cart');
    showCartTable();
    showbill();
}

function showbill() {
    if (localStorage.getItem('bill') === null) {
        document.getElementById('bill').style.display = 'none';
    } else {
        var user = JSON.parse(localStorage.getItem('userlogin'))
        var billArray = JSON.parse(localStorage.getItem('bill'));
        var s = '<h2>Đơn hàng đã đặt</h2>';
        for (var i = 0; i < billArray.length; i++) {
            if (user.username == billArray[i].customer.username) {
                document.getElementById('bill').style.display = 'block';
                s += '<div class="billcontent">' +
                    '<div>' + billArray[i].info + '</div>' +
                    '<div>' + currency(billArray[i].totalprice) + '</div>' +
                    '<div>' + billArray[i].date + '</div>' +
                    '<div>' + billArray[i].status + '</div>' +
                    '</div>';
            }
        }
        document.getElementById('bill').innerHTML = s;
    }
}


/*END CART*/
//PRODUCT

function createproduct() {
    if (localStorage.getItem('product') === null) {
        var productArr = [
            { productId: 10001, brand: 'adidas', img: 'img/ADD1.jpeg', name: 'GIÀY ADIDAS STAN SMITH', price: '1890000' },
            { productId: 10002, brand: 'adidas', img: 'img/ADD2.jpeg', name: 'GIÀY ADIDAS ADVANTAGE COURT BLD', price: '1690000' },
            { productId: 10003, brand: 'adidas', img: 'img/ADD3.jpeg', name: 'GIÀY ADIDAS SL20 M', price: '1890000' },
            { productId: 10004, brand: 'adidas', img: 'img/ADD4.png', name: 'GIÀY ADIDAS RUNFALCON 2.0 XANH', price: '1500000' },
            { productId: 10005, brand: 'adidas', img: 'img/ADD5.jpg', name: 'GIÀY ADIDAS RUNFALCON 2.0 ĐEN', price: '1500000' },
            { productId: 10006, brand: 'adidas', img: 'img/ADD6.jpg', name: 'GIÀY ADIDAS RUNFALCON 2.0 ĐEN-CAM', price: '1500000' },
            { productId: 10007, brand: 'adidas', img: 'img/ADD7.jpeg', name: 'GIÀY ADIDAS ADIZERO BOSTON 9 M', price: '2390000' },
            { productId: 10008, brand: 'adidas', img: 'img/ADD8.jpeg', name: 'GIÀY ADIDAS SST SLIPON', price: '1890000' },
            { productId: 10009, brand: 'adidas', img: 'img/ADD9.jpeg', name: 'GIÀY ADIDAS SUPERSTAR', price: '1990000' },
            { productId: 10010, brand: 'nike', img: 'img/NIK1.jpeg', name: 'GIÀY NIKE ZOOM FLY 3', price: '3690000' },
            { productId: 10011, brand: 'nike', img: 'img/NIK2.jpeg', name: 'GIÀY NIKE REVOLUTION 5', price: '1790000' },
            { productId: 10012, brand: 'nike', img: 'img/NIK3.jpeg', name: 'GIÀY NIKE AIR ZOOM STRUCTURE 24', price: '3390000' },
            { productId: 10013, brand: 'nike', img: 'img/NIK4.jpeg', name: 'GIÀY NIKE AIR ZOOM PEGASUS 38 ĐEN', price: '3390000' },
            { productId: 10014, brand: 'nike', img: 'img/NIK5.jpeg', name: 'GIÀY NIKE AIR MAX SC', price: '2190000' },
            { productId: 10015, brand: 'nike', img: 'img/NIK6.jpeg', name: 'GIÀY NIKE AIR ZOOM PEGASUS 37', price: '2790000' },
            { productId: 10016, brand: 'nike', img: 'img/NIK7.jpeg', name: 'GIÀY NIKE COURT LEGACY CANVAS', price: '1390000' },
            { productId: 10017, brand: 'nike', img: 'img/NIK8.jpeg', name: 'GIÀY NIKE AIR ZOOM PEGASUS 38 HỒNG', price: '3390000' },
            { productId: 10018, brand: 'balenciaga', img: 'img/BL1.jpeg', name: 'GIÀY BALENCIAGA TRACK 3.0 ĐEN', price: '1450000' },
            { productId: 10019, brand: 'balenciaga', img: 'img/BL2.jpeg', name: 'GIÀY BALENCIAGA TRACK 3.0 TRẮNG CAM', price: '1450000' },
            { productId: 10020, brand: 'balenciaga', img: 'img/BL3.jpeg', name: 'GIÀY BALENCIAGA SPEED TRAINER TRẮNG', price: '898000' },
            { productId: 10021, brand: 'balenciaga', img: 'img/BL4.jpeg', name: 'GIÀY BALENCIAGA SPEED TRAINER ĐẾ ĐEN', price: '898000' },
            { productId: 10022, brand: 'balenciaga', img: 'img/BL5.jpeg', name: 'GIÀY BALENCIAGA TRIPLE S ĐEN ĐỎ', price: '1390000' },
            { productId: 10023, brand: 'balenciaga', img: 'img/BL6.jpeg', name: 'GIÀY BALENCIAGA TRIPLE S VÀNG HỒNG', price: '1390000' },
            { productId: 10024, brand: 'balenciaga', img: 'img/BL7.jpeg', name: 'GIÀY BALENCIAGA TRIPLE S FULL ĐEN', price: '1390000' },
            { productId: 10025, brand: 'vans', img: 'img/VAN1.jpeg', name: 'GIÀY VANS VAULT OLD SKOOL ĐEN', price: '598000' },
            { productId: 10026, brand: 'vans', img: 'img/VAN2.jpeg', name: 'GIÀY VANS OLD SKOOL TRẮNG SỌC XANH', price: '648000' },
            { productId: 10027, brand: 'vans', img: 'img/VAN3.jpeg', name: 'GIÀY VANS OLD SKOOL VÀNG', price: '648000' },
            { productId: 10028, brand: 'vans', img: 'img/VAN4.jpeg', name: 'GIÀY VANS X BAPE OLD SKOOL ĐEN', price: '648000' },
            { productId: 10029, brand: 'vans', img: 'img/VAN5.jpeg', name: 'GIÀY VANS OLD SKOOL 36 DX', price: '648000' },
            { productId: 10030, brand: 'vans', img: 'img/VAN6.jpeg', name: 'GIÀY VANS OLD SKOOL HỌA TIẾT LỬA', price: '648000' },
            { productId: 10031, brand: 'vans', img: 'img/VAN7.jpeg', name: 'GIÀY VANS OLD SKOOL DRIZZLE XÁM', price: '648000' },
            { productId: 10032, brand: 'vans', img: 'img/VAN8.jpeg', name: 'GIÀY VANS OLD SKOOL TRẮNG', price: '648000' },
            { productId: 10033, brand: 'vans', img: 'img/VAN9.jpeg', name: 'GIÀY VANS OLD SKOOL ĐEN SỌC CARO', price: '498000' },
            { productId: 10034, brand: 'adidas', img: 'img/ADD10.jpeg', name: 'GIÀY ADIDAS NMD R1', price: '2290000' },
            { productId: 10035, brand: 'adidas', img: 'img/ADD11.jpeg', name: 'GIÀY ADIDAS ULTRA BOOST 20', price: '3290000' },
            { productId: 10036, brand: 'adidas', img: 'img/ADD12.jpeg', name: 'GIÀY ADIDAS SLEEK SUPER', price: '1590000' },
            { productId: 10037, brand: 'adidas', img: 'img/ADD13.jpeg', name: 'GIÀY ADIDAS 3MC', price: '1690000' },
            { productId: 10038, brand: 'adidas', img: 'img/ADD14.jpeg', name: 'GIÀY ADIDAS SUPER COURT', price: '1890000' },
            { productId: 10039, brand: 'adidas', img: 'img/ADD15.jpeg', name: 'GIÀY ADIDAS ADIDAS ADIZERO JAPAN 5', price: '2190000' },
            { productId: 10040, brand: 'nike', img: 'img/NIK9.jpeg', name: 'GIÀY NIKE AIR MAX ALPHA TRAINER 3', price: '2690000' },
            { productId: 10041, brand: 'nike', img: 'img/NIK10.jpeg', name: 'GIÀY NIKE RENEW RIDE 2', price: '1990000' },
            { productId: 10042, brand: 'nike', img: 'img/NIK11.jpeg', name: 'GIÀY NIKE REACT INFINITY RUN FLYKNIT', price: '3490000' }
        ];
        localStorage.setItem('product', JSON.stringify(productArr));
    }
}

var tam = new Array();

function sort() {
    productArr = JSON.parse(localStorage.getItem('product'));
    tam = new Array();
    var n = window.location.href;
    var id2 = n.split('public_html/');
    var y = id2[1];
    var id = y.split('?');
    var x = id[1];
    console.log(id);
    var j = 0;
    for (i = 0; i < productArr.length; i++) {
        if (productArr[i].brand === x) {
            tam[j] = productArr[i];
            console.log(tam[j]);
            console.log("Type product :");
            console.log(typeof(tam[j]));
            j++;
        }
    }
    if (y === "index.html") tam = productArr;
    return tam;

}
var x;

function showproduct() {
    var n = window.location.href;
    var id = n.split('#');
    x = id[1];
    x = parseInt(x) - 1;
    var s = '';
    var begin = 0 + x * 8;
    var end = 8 + x * 8;
    if (end > tam.length) end = tam.length;
    for (i = begin; i < end; i++) {
        s += '<div class="product" onclick="chitietInfo(' + tam[i].productId + ');">' +
            '<img src="' + tam[i].img + '" alt="alt"/>' +
            '<button class="card-button">Xem chi tiết</button>' +
            '<h5>' + tam[i].name + '</h5>' +
            '<h4>' + currency(tam[i].price) + '</h4></div>';
    }
    document.getElementById('productshow').innerHTML = s;
}

function showmenu() {
    var menuList = ['ADIDAS', 'NIKE', 'VANS', 'BALENCIAGA'];
    var ul = document.getElementById('navmenu');
    var li = '<li><a href="index.html">TRANG CHỦ</a></li>';
    for (var i = 0; i < menuList.length; i++) {
        li += '<a href="index.html?' + menuList[i].toLowerCase() + '"><li >' + menuList[i] + '</li></a>';
        ul.innerHTML = li;
    }
}
var sosanpham = 8;

function pagenumber() {
    var page = Math.ceil(tam.length / sosanpham);
    var s = '';
    for (i = 0; i < page; i++) {
        s += '<a href="#' + (i + 1) + '"><li id="' + (i + 1) + '" >' + (i + 1) + '</li></a>';
    }
    s = '<ul>' + s + '</ul>';
    document.getElementById('pagenum').innerHTML = s;
}

function valueup() {
    var s = parseInt(document.getElementById('quantity').value);
    s = s + 1;
    document.getElementById('quantity').value = s;
}

function valuedown() {
    var s = parseInt(document.getElementById('quantity').value);
    if (s > 1) s = s - 1;
    document.getElementById('quantity').value = s;
}

function chitietInfo(productID) {
    document.getElementById('chitiet').style.display = 'block';
    var productArr = JSON.parse(localStorage.getItem('product'));
    for (i = 0; i < productArr.length; i++) {
        if (productArr[i].productId === productID) {
            document.getElementById('name').innerHTML = productArr[i].name;
            document.getElementById('price').innerHTML = currency(productArr[i].price);
            document.getElementById('imgproduct').src = productArr[i].img;
            document.getElementById('size').value = 40;
            document.getElementById('quantity').value = 1;
            document.getElementById('cart').setAttribute('onclick', 'addToCart(' + productID + ')');
        };
    }
}

function closeChitiet() {
    document.getElementById('chitiet').style.display = 'none';
}

//ENDPRODUCT
var bien = 0;

function showSearch() {
    bien++;
    if (bien % 2 === 1) {
        document.getElementById('searchBar').style.display = 'block';
        document.getElementById('searchBox').style.display = 'block';

    }
    if (bien % 2 === 0) {
        document.getElementById('searchBar').style.display = 'none';
        document.getElementById('searchBox').style.display = 'none';


    }
}

function searchProduct() {
    var search = document.getElementById('searchBar').value.toUpperCase();
    var s = '';
    var productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].name.includes(search)) {
            s += '<div class="searchInfo" onclick="chitietInfo(' + productArr[i].productId + ');">\n\
                 <div><img src="' + productArr[i].img + '" + alt="alt"></div>\n\
                 <div class="searchNP"><div class="name"><strong>' + productArr[i].name + '</strong></div>\n\
                 <div class="price"><strong>' + currency(productArr[i].price) + '</strong></div></div></div>';
        }
    }
    if (search === '') s = '';
    document.getElementById('searchBox').innerHTML = s;
}