class Product {
    constructor(name, price)
    {
        this.name = name;
        this.price = price;
    }
}

function findBestDiscount(products, productQuantity) {
    const cartTotal = (productQuantity[0] * products[0].price) + (productQuantity[1] * products[1].price) + (productQuantity[2] * products[2].price)

    const qtyTotal = productQuantity.reduce((acc, curr) => acc + curr, 0);

    let bestDisc = 0;
    let currDisc = 0;
    let appliedDiscount = "";

    // If cart total exceeds $200, apply a flat $10 discount on the cart total.
    if(cartTotal >= 200)
    {
        currDisc = 10;
        if(currDisc > bestDisc){
            bestDisc = currDisc;
            appliedDiscount = "flat_10_discount";
        }
    }

  //If the quantity of any single product exceeds 10 units, apply a 5% discount on that item's total price.
    for(let i = 0; i < 3; i++)
    {
        if(productQuantity[i] > 10)
        {
            currDisc = ((productQuantity[i] * products[i].price) / 100) * 5;

            if(currDisc > bestDisc){
                bestDisc = currDisc;
                appliedDiscount = "bulk_5_discount";
            }
        }
    }

    //  If total quantity exceeds 20 units, apply a 10% discount on the cart total.
    if(qtyTotal > 20)
    {
        currDisc = (cartTotal / 100) * 10;

        if(currDisc > bestDisc){
            bestDisc = currDisc;
            appliedDiscount = "bulk_10_discount";
        }
    }

    // If total quantity exceeds 30 units & any single product quantity greater than 15, then apply a 50% discount on products which are above  15 quantity. The first 15 quantities have the original price and units above 15 will get a 50% discount
    currDisc = 0;
    if(qtyTotal > 30)
    {
        for(let i = 0; i < 3; i++)
        {
            if (productQuantity[i] > 15) {
                currDisc = ((productQuantity[i] - 15) * products[i].price) / 2;
            }

            if(currDisc > bestDisc){
                bestDisc = currDisc;
                appliedDiscount = "tiered_50_discount";
            }
        }
    }

    return {cartTotal, qtyTotal, bestDisc, appliedDiscount};
}

function CalculateCart()
{
    const products = [
        new Product("Product A", 20),
        new Product("Product B", 40),
        new Product("Product C", 50)
    ]

    const productQuantity = products.map(product => parseInt(prompt(`Enter quantity for ${product.name}: `)));

    const productGiftWraps = products.map(product => prompt(`Is ${product.name} wrapped as a gift? (yes/no): `).toLowerCase() === "yes");

    const {cartTotal, qtyTotal, bestDisc, appliedDiscount} = findBestDiscount(products, productQuantity);

    // calculating the shipping charge
    let shippingFee = 0;
    if (qtyTotal % 10 == 0) {
        shippingFee = Math.floor(qtyTotal / 10) * 5;
    }else{
        shippingFee = (Math.floor(qtyTotal / 10) * 5) + 5;
    }

    const giftWrapFee = productQuantity.reduce((fee, qty, index) => fee + (productGiftWraps[index] ? qty : 0), 0);

    const total = (cartTotal + shippingFee + giftWrapFee) - bestDisc;

    console.log(`\n\nProduct Details:`);
    products.forEach((product, index) => console.log(`${product.name}: ${productQuantity[index]} units - $${productQuantity[index] * product.price}`));
    console.log(`\nSubtotal:, $${total}`);
    console.log(`Discount Applied:, ${appliedDiscount} - Discount Amount: $${bestDisc}`);
    console.log(`Shipping Fee:, $${shippingFee}`);
    console.log(`Gift Wrap Fee:, $${giftWrapFee}`);
    console.log(`\nTotal: $${total}`);
}

CalculateCart();
