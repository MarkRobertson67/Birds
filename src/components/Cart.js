
// The cart receives the data from the parent component through props. The component is responsible 
// for rendering the birds that are in the cart, the total cost, the discount, and the bonus items.


const Cart = ({ cart, discount, total, bonus, setTotal }) => {

    function deleteBird(e, bird) {
        e.target.parentNode.remove()
        setTotal(total - bird.amount)
        console.log(bird)
         }
         

    console.log(bonus)
    return (
        <div className="cart-container">
            <h1 className="title">Cart</h1>
            <p><i>Discount: {discount}%</i></p>
            <h4><strong>Total: ${total}</strong></h4>
            <p></p>

        <ol>
        {cart.map((bird) => (
            <li>
            <l>{bird.name}  ${bird.amount}  </l>
            <button className="button" onClick={(event) => deleteBird(event, bird)}>Delete</button>
            </li>
        ))}
        </ol>
            <br></br>
        <h5>Your donations qualify you for the following items:</h5>
        <br></br>
        <ul>
            
             {bonus.map((item, index) => (
            <li key={index}>
                {item} 
            </li>
            ))}
  
            </ul>
        </div>
    )
}
export default Cart
