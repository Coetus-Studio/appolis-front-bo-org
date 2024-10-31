// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// contrato principal que controla toda la gestion de estos 2 token (JamToken, StellarToken)
// Importante: Si cambiamos la version de pragma solidity en 1 archivo, se deben cambiar en los 3.

// ejemplos de usuarios de la aplicacion
// Persona 1: (Owner: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)
// Persona 2: (Receptor: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
// Persona 3: (Operador: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db)

import "./JamToken.sol";
import "./StellartToken.sol";


// aqui no podemos heredar las funciones de los smartcontract Jam y Stellar ya que tienen funciones con el mismo nombre
// esto causa conflicto en el smartcontract. Por eso no lo heredamos con el is JamToken, StellartToken en el contract
contract TokenFarm {

    // Declaraciones iniciales
    string public name = "Stellart Token Farm";
    address public owner;

    // aqui instanciamos e importamos los archivos que no podemos heredar
    // JamToken lo asignamos a jamToken
    // StellartToken lo asignamos a stellartToken
    JamToken public jamToken;
    StellartToken public stellartToken;

    // Estructura de datos
    // un array con la direccion de las personas que hacen staking
    address [] public stakers;
    // mapping guarda el balance de una persona
    mapping(address => uint) public stakingBalance;
    // mapping que relaciona una direccion con un booleano, sabemos si una persona a hecho staking en algun momento
    mapping(address => bool) public hasStaked;
    // mapping para saber si una persona esta haciendo staking en ese preciso momento
    mapping(address => bool) public isStaking;

    // Constructor
    constructor(StellartToken _stellartToken, JamToken _jamToken) {
        // establemos estas variables
        stellartToken = _stellartToken;
        jamToken = _jamToken;
        // el propietario que cliquea el despliegue del smart contract
        owner = msg.sender;
    }

    // Stake de tokens
    function stakeTokens(uint _amount) public {
        // filtro: se requiere una cantidad superior a 0
        require(_amount > 0, "La cantidad no puede ser menor a 0");
        // Transferir unos tokens JAM al SmartContract principal
        jamToken.transferFrom(msg.sender, address(this), _amount);
        // actualizar el saldo del staking
        stakingBalance[msg.sender] += _amount;
        // guardamos el usuario
        // comprobamos si la persona a hecho staking. Se usa la expresion! para indicar si es falso.
        // Si es falso lo guardamos
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Actualizar el estado del staking
        // hace staking este msg.sender?
        isStaking[msg.sender] = true;
        // a hecho staking alguna vez?
        hasStaked[msg.sender] = true;
    }

    // Quitar el staking de los tokens
    function unstakeTokens() public {
        // aqui obtenemos el saldo del staking de un usuario
        uint balance = stakingBalance[msg.sender];
        // se requiere una cantidad superior a 0
        require(balance > 0, "El balance del staking es 0");
        // Transferencia de los tokens al usuario. Le devolvemos todo el balance, no por cantidad de entrada. Se puede recibir tambien por parametro la cantidad
        jamToken.transfer(msg.sender, balance);
        // Reseta el balance de staking del usuario
        stakingBalance[msg.sender] = 0;
        // actualizar estado del staking
        isStaking[msg.sender] = false;
    }

    // Emision de tokens, emision de las recompenzas
    function issueTokens() public {
        // unicamente ejecutable por el owner
        require(msg.sender == owner, "No eres el owner");
        // Emitir tokens a todos los stakers cuando el owner le de clic a esta funcion
        for (uint i=0; i < stakers.length; i++) {
            // creamos una direccion receptor,
            address recipient = stakers[i];
            // obtenemos el balance
            uint balance = stakingBalance[recipient];
            // si a hecho staking va a recibir una recompensa
            if(balance > 0) {
                // aqui transferir al recipíent el balance correspondiente
                // cuanto mas balance tengamos haciendo staking mas recompensa vamos a recibir
                stellartToken.transfer(recipient, balance);
            }
        }
    }

}
