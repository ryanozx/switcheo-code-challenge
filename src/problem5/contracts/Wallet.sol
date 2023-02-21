// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Wallet {
    struct TokenBalance {
        address token;
        uint256 balance;
    }

    function getBalances(address walletAddr, address[] calldata tokenAddr) external view returns(TokenBalance[] memory) {
        TokenBalance[] memory output = new TokenBalance[](tokenAddr.length);
        for (uint i = 0; i < tokenAddr.length; i++) {
            output[i] = TokenBalance({
                token: tokenAddr[i],
                balance: IERC20(tokenAddr[i]).balanceOf(walletAddr)
            });
        }
        return output;
    }
}