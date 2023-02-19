
// This cpmonent is responsible for rendering the individual bird cards that display the name, image price and adopt button.  It takes bird datas as props and maps over the array of birds to display each bird card.  When adopt button is clicked it triggers the add to card function which is passed down as a prop from the App Component.  This function updates the cart state in App component by adding the selected bird to cart.

const BirdCards = ({ birds, addToCart }) => {
  return (
    <div className="bird-cards-container">
      {birds.map((bird) => (
        <div className="bird-card" key={bird.name} >
          {/* <li> */}
            <div className="name"><strong>{bird.name}</strong></div>
            <img className="img" src={bird.img} alt="birdimage" />
            <h7>Price: ${bird.amount}</h7>
            <button className="checkout-button" onClick={() => addToCart(bird)}>Adopt Me</button>
          {/* </li> */}
        </div>
      ))}
    </div>
  );
};

export default BirdCards;
