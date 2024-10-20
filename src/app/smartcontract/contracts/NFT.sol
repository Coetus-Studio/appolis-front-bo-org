// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// con esta importacion almacenamos la URI en la blockchain
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {

    // creo variable para contar cuantos tokens se han emitido y tengo en la blockchain
    uint public tokenCount;

    // se requiere constructor cuando heredamos ERC721URIStorage. Requiere nombre y simbolo
    constructor() ERC721("DAPP NFT", "DAPP") {}

    // vamos a crear la funcion mint para crear nuevos token NFT
    // tokenURI: es la direccion que nos permite relacionar token NFT con los recursos como la imagen en este caso
    function mint(string memory _tokenURI) external returns (uint) {
        // incrementramos el token count 1 unidad
        tokenCount++;

        // minteamos nuevo token para la persona que cliquea esta funcion
        _safeMint(msg.sender,tokenCount);
        // relacionamos token NFT con su imagen a traves del metodo interno heredado de ERC721URIStorage
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
}
