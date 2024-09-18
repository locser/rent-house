// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HouseRental {

    struct RentalContract {
        string contractId;
        string requestId;
        string houseId;
        string lessorId; // nguoi cho thue
        string lesseeId; // nguoi thue
        uint256 rentalStartTime;
        uint256 rentalEndTime;
        uint256 depositAmount;
        bool lesseeApproved;
    }

    mapping(string => RentalContract) public rentalContracts;
    mapping(string => bool) public contractStatus;

    event ContractCreated(string contracctId, string requestId, string houseId, string lessorId, string lesseeId);
    event LesseeApproved(string contractId);

    function createContract(
        string memory _contractId,
        string memory _requestId,
        string memory _houseId,
        string memory _lessorId,
        string memory _lesseeId,
        uint256 _rentalStartTime,
        uint256 _rentalEndTime,
        uint256 _depositAmount
    ) external {
        require(!contractStatus[_contractId], "Contract already exists");

        rentalContracts[_contractId] = RentalContract({
            contractId: _contractId,
            requestId: _requestId,
            houseId: _houseId,
            lessorId: _lessorId,
            lesseeId: _lesseeId,
            rentalStartTime: _rentalStartTime,
            rentalEndTime: _rentalEndTime,
            depositAmount: _depositAmount,
            lesseeApproved: false
        });
        
        contractStatus[_contractId] = true;

        emit ContractCreated(_contractId, _requestId, _houseId, _lessorId, _lesseeId);
    }

    function approveContract(string memory _contractId) external {
        RentalContract storage rentalContract = rentalContracts[_contractId];

        require(contractStatus[_contractId], "Contract does not exist");
        require(!rentalContract.lesseeApproved, "Contract already approved by lessee");
        rentalContract.lesseeApproved = true;

        emit LesseeApproved(_contractId);
    }

    function getContractsByIds(string[] memory _contractIds) 
        external 
        view 
        returns (RentalContract[] memory) 
    {
        uint256 length = _contractIds.length;
        RentalContract[] memory contracts = new RentalContract[](length);

        for (uint256 i = 0; i < length; i++) {
            contracts[i] = rentalContracts[_contractIds[i]];
        }

        return contracts;
    }
}