window.onload = function() 
{
    document.getElementById("brandName").classList.add("active");

    const form = document.getElementById('paymentForm');
    const cardDetails = document.getElementById('cardDetails');
    const qrDetails = document.getElementById('qrDetails');
    const bankDetails = document.getElementById('bankDetails');
    
    
    const cardNum = document.getElementById('cardNumber');
    const cardExp = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCVV');

    
    document.querySelectorAll('input[name="pay"]').forEach(radio => 
    {
        radio.addEventListener('change', function() 
        {
            cardDetails.style.display = (this.id === 'radioCard') ? 'block' : 'none';
            bankDetails.style.display = (this.id === 'radioBank') ? 'block' : 'none';
            qrDetails.style.display = (this.id === 'radioQR') ? 'block' : 'none';
            
            
            if (this.id === 'radioCard') 
            {
                cardNum.required = true;
                cardExp.required = true;
                cardCvv.required = true;
            } else 
            {
                cardNum.required = false;
                cardExp.required = false;
                cardCvv.required = false;
            }
        });
    });

    
    const cardInput = document.getElementById('cardNumber');
    const cardDisplay = document.getElementById('cardType');
    if (cardInput) 
    {
        cardInput.addEventListener('input', function() 
        {
            let val = this.value;
            if (val.startsWith('4')) cardDisplay.innerText = "VISA";
            else if (val.startsWith('5')) cardDisplay.innerText = "MASTERCARD";
            else cardDisplay.innerText = "";
        });
    }

    
    form.onsubmit = function(e) 
    {
        e.preventDefault(); 

        if (document.getElementById('radioBank').checked) 
        {
            let bankUrl = document.getElementById('bankSelect').value;
            if (!bankUrl) 
            { 
                alert("Please select a bank!"); return; 
            }
            
            window.open(bankUrl, '_blank');
            window.location.href = "feedback.html";
        } 
        else if (document.getElementById('radioQR').checked) 
        {
            const receipt = document.getElementById('receiptUpload');
            if (!receipt.files || !receipt.files.length) 
            { 
                alert("Please upload your receipt!"); return; 
            }

            window.location.href = "feedback.html";
        } 
        else if (document.getElementById('radioCard').checked) 
        {
            window.location.href = "feedback.html";
        }
    };
};