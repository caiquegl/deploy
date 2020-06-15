
window.Mercadopago.setPublishableKey("TEST-f630a334-a485-4232-a7e6-4e0f2f111472");
window.Mercadopago.getIdentificationTypes();

document.getElementById('cardNumber').addEventListener('keyup', guessPaymentMethod);
document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);

function guessPaymentMethod(event) {
    let cardnumber = document.getElementById("cardNumber").value;

    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0,6);
        window.Mercadopago.getPaymentMethod({
            "bin": bin
        }, setPaymentMethod);
    }
};

function setPaymentMethod(status, response) {
    if (status == 200) {
        let paymentMethodId = response[0].id;
        let element = document.getElementById('payment_method_id');
        element.value = paymentMethodId;
        getInstallments();
    } else {
        alert(`payment method info error: ${response}`);
    }
}

function getInstallments(){
    window.Mercadopago.getInstallments({
        "payment_method_id": document.getElementById('payment_method_id').value,
        "amount": parseFloat(document.getElementById('transaction_amount').value)

    }, function (status, response) {
        if (status == 200) {
            document.getElementById('installments').options.length = 0;
            response[0].payer_costs.forEach( installment => {
                let opt = document.createElement('option');
                opt.text = installment.recommended_message;
                opt.value = installment.installments;
                document.getElementById('installments').appendChild(opt);
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
    });
}

doSubmit = false;
document.querySelector('#pay').addEventListener('submit', doPay);

function doPay(event){
    event.preventDefault();
    if(!doSubmit){
        var $form = document.querySelector('#pay');

        window.Mercadopago.createToken($form, sdkResponseHandler);

        return false;
    }
};

function sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        alert("verify filled data");
    }else{
        var form = document.querySelector('#pay');
        var card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);
        doSubmit=true;
        form.submit();
    }
};

var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken("ENV_ACCESS_TOKEN");

var payment_data = {
  transaction_amount: 191,
  token: 'ff8080814c11e237014c1ff593b57b4d',
  description: 'Fantastic Copper Coat',
  installments: 1,
  payment_method_id: 'visa',
  payer: {
    email: 'test@test.com'
  }
};


console.log("testando mercado");