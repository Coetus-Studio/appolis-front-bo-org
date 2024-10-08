// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// importamos interfaz ERC721
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// importamos contrato para darnos la seguridad al proyecto
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {

    // variable que recibe la tasa o pago de usuarios. immutable significa que nunca podra ser modificado
    address payable public immutable feeAccount;
    // variable para el porcentaje que se va a apagar de tasas a la hora de crear un nuevo nft
    uint public immutable feePercent;
    // variable que cuenta cuantos items estan creados en nuestro marketplace. Cantidad de token NFT creados
    uint public itemCount;

    // Estructura de datos
    struct Item {
        uint itemId;
        IERC721 nft;  // uso de interfaz heredada, le referenciamos token NFT creado previamente con smartcontract NFT.sl
        uint tokenId; // id Token
        uint price; // variable precio token
        address payable seller; // direccion del vendedor del NFT
        bool sold; // variable en caso de que el TOKEN fue vendido o no
    }

    // relacionamos cada item con su identificador
    // mapping relaciona cada identificador con la estructura pertinente, se define como items
    mapping(uint => Item) public items;

    // evento para la oferta de un nuevo token NFT
    event Offered (
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );



    // evento de compra
    // tiene el item que se ha comprado y la direccion indexada del token nft
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    // constructor que recibe por parametros el feePercent
    constructor (uint _feePercent) {
        // direccion de pago del owner. Cada token que se venta el owner recibe un % de la venta. msg.sender es quien despliega el smartcontract
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    // funcion que permita crear un nuevo token NFT en el marketplace
    // recibe como parametros: NFT que se creara, id del token, precio del usuario que le quiera dar
    // el _tokenId es el return tokenCount del smartContract NFT.sol
    // _nft tambien se recibe del return tokenCount
    // nonReentrant: parametro de seguridad de la herencia ReentrancyGuard
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        // requisitos
        require(_price > 0, "Price must be greater than zero");
        itemCount++; // cuenta cuantos token hay, se incrementa
        // transferFrom heredado de IERC721
        // msg.sender: persona que ofrece el token, a la direccion marketplace (address(this),
        // _tokenId: token del id
        _nft.transferFrom(msg.sender, address(this), _tokenId);

        // llamamos a mapping items y debemos pasarle los parametros del struct Item, porque relacionamos en items un id con una estructura de datos
        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender), // persona que cliquea sobre la funcion makeItem. es de pago porque puede recibir pagos
            false // en este caso false porque no se ha ofrecido...
        );

        // emitimos nuevo evento
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    // funcion que permite realizar la compra del NFT despues de ofertarlo
    // nonReentrant: funcion de seguridad heredada
    function purchaseItem(uint _itemId) external payable nonReentrant {
        // getTotalPrice: funcion publica.
        // _itemId: precio que tiene
        uint _totalPrice = getTotalPrice(_itemId);
        //
        Item storage item = items[_itemId];
        // filtro _item mayor 0, y _itemId menor o igual a item creadp
        require(_itemId > 0 && _itemId <= itemCount);
        // valor debe ser mayor o igual al precio total del item
        require(msg.value >= _totalPrice);
        // filtremos si el item esta a la venta con la variable sold
        require(!item.sold);
        // item.seller: vendedor del token NFT. Le enviamos el valor del token NFT (item.price)
        item.seller.transfer(item.price);
        // enviamos el % que recibo como owner por la venta del token
        feeAccount.transfer(_totalPrice - item.price);
        // cambiamos el estado a true
        item.sold = true;
        // transferencia del token NFT hacia el comprador
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // evento de compra
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller, // quien vende
            msg.sender // quien compra
        );
    }

    // funcion de ayuda para visualizar precio de
    function getTotalPrice(uint _itemId) view public returns(uint) {
        // los items se guardan en el maping items, se puede identificar con itemId
        // dentro del items tenemos propiedad price
        return ((items[_itemId].price*(100 + feePercent))/100); // porcentaje que me llevo como owner por la venta del token
    }


}
