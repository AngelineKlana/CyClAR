document.addEventListener('DOMContentLoaded', function() {
    let navi = document.querySelectorAll('.sidenav');
    // options variable does not exist, so it is useless.
    // Replace with {}
    // M.Sidenav.init(navi, options) <- invalid
    M.Sidenav.init(navi, {});

    // To make code shorter, slide is only used once. So you can
    // Can do the same as navi
    M.Slider.init(document.querySelectorAll('.slider'), {});

    M.FormSelect.init (document.querySelectorAll('select'), {});

    M.Datepicker.init(document.querySelectorAll('.datepicker'), {});

    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});

    M.Modal.init(document.querySelectorAll('.modal'), {dismissible:false});

    M.Tabs.init(document.querySelectorAll('.tabs'), {swipeable:true});

    M.Carousel.init(document.querySelectorAll('.carousel'), {fullWidth:true});

});

function RBCheck(Buttonname) {
    if (Buttonname == "cc") {
        changePayment('cc-input', 'ob-input','pp-input');
        updateSelectedButton('cc', 'ob', 'pp');
    }
    else if (Buttonname == "ob") {
        changePayment('ob-input', 'cc-input', 'pp-input');
        updateSelectedButton('ob', 'cc', 'pp');
    }
    else if (Buttonname == "pp") {
        changePayment('pp-input', 'cc-input', 'ob-input');
        updateSelectedButton('pp', 'ob', 'cc');
    }
}

function changePayment(selected_payment, p1, p2) {
    document.getElementById(selected_payment).style.display = 'block';
    document.getElementById(p1).style.display = 'none';
    document.getElementById(p2).style.display = 'none';
}

function updateSelectedButton(selected_btn, other_btn_one, other_btn_2) {
    let selected_class = ['red', 'accent-4','grey-text','text-lighten-5'];
    let unselected_class = ['grey', 'lighten-5', 'red-text','text-accent-4'];

    let btn_0 = document.getElementById(selected_btn);
    let btn_1 = document.getElementById(other_btn_one);
    let btn_2 = document.getElementById(other_btn_2);

    for (let i = 0; i < selected_class.length; i++) {
        btn_0.classList.remove(unselected_class[i]);
        btn_0.classList.add(selected_class[i]);

        btn_1.classList.remove(selected_class[i]);
        btn_1.classList.add(unselected_class[i]);

        btn_2.classList.remove(selected_class[i]);
        btn_2.classList.add(unselected_class[i]);
    }
}

function validateCard(e, threshold) {
    let pay = document.getElementById('btn_ccpay');

    if (e.value.length > threshold) {
        pay.classList.add('disabled');
        M.toast({ html: "Please check your input" });
    } else {
        pay.classList.remove('disabled');
    }
}

function makePayment() {
    if (document.getElementById('credit-card').value.length != 16) {
        M.toast({ html: "Credit card must have at least 16 number." });
    }
    else if (document.getElementById('month').value.length != 2) {
        M.toast({ html: "Month must have at least 2 number." });
    }
    else if (document.getElementById('year').value.length != 2) {
        M.toast({ html: "Year must have at least 2 number." });
    }
    else if (document.getElementById('cvv').value.length != 3) {
        M.toast({ html: "CVV must have at least 3 number." });
    }
    else {
        document.getElementById("overlay").style.display = "block";

        // Load home page after processing

        setTimeout(function () {
            LoadPage("home");
        }, 3000);
    }
}

function checkOB(OBid) {
    var webpage = "https://www.maybank2u.com.my/home/m2u/common/login.do";
    if (OBid == "Maybank") {
        webpage = "https://www.maybank2u.com.my/home/m2u/common/login.do";
    }
    else if (OBid == "CIMB") {
        webpage = "https://www.cimbclicks.com.my/clicks/#/";
    }
    else if (OBid == "Hong") {
        webpage = "https://s.hongleongconnect.my/rib/app/fo/login?mc=D";
    }
    else if (OBid == "RHB") {
        webpage = "https://logon.rhb.com.my/";
    }
    document.getElementById('btn_obpay').onclick = function() {
        window.open(webpage);
        document.getElementById('ob-input').style.display = 'none';
        document.getElementById('success').style.display = 'block';
    }
}

const TOTAL_REVIEW_PAGES = 3
function showReview(page_number) {
    for(let i = 0; i < TOTAL_REVIEW_PAGES; i++) {
    // review_0, review_1...
    // if the current review page is the page number we want to show
        if(i === page_number) {
        // then show it
        document.getElementById('review_' + i).style.display = 'block'
        document.getElementById('pageID' + i).className = 'active';
        } else {
            // else hide it
            document.getElementById('review_' + i).style.display = 'none'
            document.getElementById('pageID' + i).className = 'waves-effect';
        }
    }
}
