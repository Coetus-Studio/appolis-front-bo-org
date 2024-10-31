// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// smart contract para recompenza a quien haga staking

// ejemplos de usuarios de la aplicacion
// Persona 1: (Owner: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)
// Persona 2: (Receptor: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
// Persona 3: (Operador: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db)


contract StellartToken {

    // Declaraciones
    // variables
    string public name = "Appolis Token";
    string public symbol = "Appolis";
    // cantidad de token a asignar corresponde a 1 millon de tokens, esto considerando la cantidad de decimales que se definan a continuacion
    uint public totalSupply = 1000000000000000000000000;
    // aqui establecemos cuantos decimales pueden tener nuestro token, definimos variable decimal
    uint8 public decimals = 18;

    // Evento para la transferencia de tokens de un usuario
    // aqui indexamos una direccion con indexed, nos sirve para buscar registros mas adelante
    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // evento para la aprobacion de un operador
    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 value
    );

    // Estructuras de datos
    // mapping para obtener el balance de una persona. balanceOf es una funcion
    mapping(address => uint256) public balanceOf;
    // otro mapping para realizar el address hacia el mapping del addres uint
    // allowance es la cantidad permitida a un spender para que gestione sobre nuestro token.
    // el primer address es el _owner. despues el address del spender y luego la cantidad permitida para gestionar
    mapping(address => mapping(address => uint)) public allowance;

    // Constructor
    // cuando despleguemos este smart contract se asignara el balance total del smartcontract al msg.sender. Se asignan al owner del smartcontract
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    // Transferencia de tokens de un usuario
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // aqui comprobamos que la persona que cliquee esta funcion tenga tanto tokens como los que quiere enviar
        require(balanceOf[msg.sender] >= _value);
        // Aqui decrementamos la cuenta al que envia la transfer
        balanceOf[msg.sender] -= _value;
        // aqui aumentamos los token en la cuenta del que recibe tokens
        balanceOf[_to] += _value;
        // aqui emitimos un evento
        emit Transfer(msg.sender, _to, _value);

        // aqui devolvemos el booleano de la transferencia
        return true;


    }

    // funcion de aprobacion de una cantidad para ser gastada por un operador
    function approve(address _spender, uint256 _value) public returns (bool success) {
        // vamos al mapping de asignacion allowance. Aqui el owner le da persmios al spender, puede ser true o false ese valor
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }


    // transferencia de tokens especificando el emisor
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // ponemos unos filtros. El valor es menor o igual al balance de al persona que envia la transfencia
        require(_value <= balanceOf[_from]);
        // otro filtro para comprobar si podemos enviar los token que estan asignados al operador o no
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        // allowance debe decrementarse
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

}
