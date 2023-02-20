
import { useState } from "react";


    
    const Checkout = ({setCart, setBonus, setTotal}) => {
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [zipCode, setZipCode] = useState("");
    
     function userEntry(event) {
        event.preventDefault();
        if (!firstName || !lastName || !email || !zipCode) {
          alert("Please complete the form");
        } else {
          alert("You have adopted birds. Thank you!");
          setCart([]);
          setEmail("");
          setFirstName("");
          setLastName("");
          setZipCode("");
          setBonus([])
          setTotal(0)
        }
      };
    
      
      return (
        <div className="checkout-container">
          {/* <section> */}
            <h1 className="title2">Checkout</h1>
            <form 
            onSubmit={userEntry}>
              <label>
                First Name
                <br></br>
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  id="first-name"
                  name="name"
                  type="text"
                  placeholder="Your first name..."
                />
              </label>
              <label>
                Last Name
                <br></br>
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  id="last-name"
                  name="lastname"
                  type="text"
                  placeholder="Your last name..."
                />
              </label>
              <label>
                Email
                <br></br>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Your email..."
                />
              </label>
              <label>
                Zip Code
                <br></br>
                <input
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                  id="zip"
                  name="zip"
                  type="number"
                  placeholder="Your zip code..."
                />
              </label>
              <br></br>
              <input style={{color: 'white', backgroundColor: 'black', fontWeight: 'bold'}} className="input-button" type="submit" text="Submit" />
            </form>
          {/* </section> */}
        </div>
      );
    };
    
    export default Checkout;
