// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShopRegistry {
    // Mapping to store shop names by address
    mapping(address => string) private shopNames;

    // Event to be emitted when a shop name is registered
    event ShopRegistered(address indexed shopOwner, string shopName);

    //save or update the shop name associated with the sender's address
    function registerShop(string memory _shopName) public {
        require(bytes(_shopName).length > 0, "Shop name cannot be empty");
        shopNames[msg.sender] = _shopName;
        emit ShopRegistered(msg.sender, _shopName);
    }

    function getShopName(
        address _shopOwner
    ) public view returns (string memory) {
        string memory shopName = shopNames[_shopOwner];
        require(
            bytes(shopName).length > 0,
            "Shop name not found for this address"
        );
        return shopName;
    }
}
