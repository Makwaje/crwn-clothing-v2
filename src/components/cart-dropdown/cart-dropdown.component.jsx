import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

const CardDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <Button> go to checkout</Button>
      </div>
    </div>
  );
};

export default CardDropdown;
