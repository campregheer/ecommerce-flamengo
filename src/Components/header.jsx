import { ShoppingCartIcon } from "lucide-react";

function Header (){
    return(
        <div>
            <img src="https://imagepng.org/crf-do-flamengo/crf-flamengo-2-2/" alt="mengo" />

            <a href="#">Camisas</a>
            <a href="#">Agasalhos</a>

            <ShoppingCartIcon />

        </div>

    );
}

export default Header;