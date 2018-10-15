pragma solidity ^0.4.0;

import "./Owned.sol";

contract HelpOn is Owned {

    event UserCreated(uint id, string fullName, string sity, UserRole role);

    enum  UserRole {
        NONE, //0 - user has no role
        GETTER, //1 - user who want money for a life
        GIVER, //2 - user who want to share money with other
        ORGANISATION                                    //3 - tester finished test
    }

    enum  DonationType {
        NONE, //0 - type none
        FOOD, //
        MEDS, //
        CLOTHING, //
        HOUSE_HOLD, //
        OTHER                                           //
    }

    struct UserInfo {
        string fullName;
        string sity;
    }

    struct OrganizationInfo {
        string fullName;
        string sity;
        string hederaFileId;
        DonationType donationType;
    }

    mapping(address => UserRole) roles;

    mapping(address => uint) gettersIds;
    UserInfo [] public getters;

    mapping(address => uint) giversIds;
    UserInfo [] public givers;

    mapping(address => uint) organizationIds;
    OrganizationInfo [] public organizations;


    function getUserRole() public view returns (UserRole role) {
        role = roles[msg.sender];
    }

    function registerGiver(string fullName, string sity) public {
        //todo requires, uniq
        require(roles[msg.sender] == UserRole.NONE, "You are already registred");
        uint giverId = givers.push(UserInfo(fullName, sity)) - 1;
        giversIds[msg.sender] = giverId;
        roles[msg.sender] = UserRole.GIVER;
        emit UserCreated(giverId, fullName, sity, UserRole.GIVER);
    }

    function registerGetter(string fullName, string sity) public {
        //todo requires, uniq
        require(roles[msg.sender] == UserRole.NONE, "You are already registred");
        uint getterId = getters.push(UserInfo(fullName, sity)) - 1;
        gettersIds[msg.sender] = getterId;
        roles[msg.sender] = UserRole.GETTER;
        emit UserCreated(getterId, fullName, sity, UserRole.GETTER);
    }

    function registerOrganization(string fullName, string sity, string hederaFileId, DonationType donationType) public {
        //todo requires, uniq
        require(roles[msg.sender] == UserRole.NONE, "You are already registred");
        uint orgId = organizations.push(OrganizationInfo(fullName, sity, hederaFileId, donationType)) - 1;
        organizationIds[msg.sender] = orgId;
        roles[msg.sender] = UserRole.ORGANISATION;
        emit UserCreated(orgId, fullName, sity, UserRole.ORGANISATION);
    }

    //Donationas
    //Donation[] donations;
    mapping(uint => mapping(uint => uint[])) userDonations;
    mapping(uint => Donation[]) donations;
    mapping(uint => uint) donationsValue;

    struct Donation {
        DonationType donationType;
        uint value;
        uint userId;
    }

    event NewDonation(DonationType donationType, uint value, uint userId, string userName);

    function donate(DonationType donationType) public payable onlyGiver {
        uint userId = giversIds[msg.sender];
        uint donationId = donations[uint(donationType)].push(Donation(donationType, msg.value, userId)) - 1;
        userDonations[userId][uint(donationType)].push(donationId);
        donationsValue[uint(donationType)] += msg.value;
        emit NewDonation(donationType, msg.value, userId, givers[userId].fullName);
    }

    //HelpRequest

    mapping(uint => HelpRequest[]) helpRequests;
    mapping(uint => mapping(uint => uint[])) userHelpRequests;

    struct HelpRequest {
        DonationType donationType;
        uint value;
        uint userId;
        string hederaFileId;
        HelpRequestStatus status;
    }

    enum HelpRequestStatus {
        NONE,
        INIT,
        APPROVED,
        CANCELED,
        COMPLITED
    }

    event NewHelpRequest(uint helpRequestId, DonationType donationType, uint value, uint userId, string userName);

    function askForHelp(DonationType donationType, uint value, string hederaFileId) public onlyGetter {
        require(donationsValue[uint(donationType)] >= value, "HelpOn has no enough money");
        uint userId = gettersIds[msg.sender];
        uint helpRequestId = helpRequests[uint(donationType)].push(HelpRequest(donationType, value, userId, hederaFileId, HelpRequestStatus.INIT)) - 1;
        userHelpRequests[userId][uint(donationType)].push(helpRequestId);

        emit NewHelpRequest(helpRequestId, donationType, value, userId, getters[userId].fullName);
    }

    struct Voiting {
        uint appruved;
        uint total;
    }

    mapping(uint => mapping(uint => Voiting)) helpRequestVoiting;
    mapping(uint => mapping(uint => mapping(address => uint))) voiters;


    function voitForHelpRequest(uint requestId, DonationType donationType, bool appruved) public onlyGiver {
        //todo check giver rights
        require(helpRequests[uint(donationType)].length > requestId, "Help request not found");
        require(helpRequestVoiting[uint(donationType)][requestId].total <= 3, "Voiting is over");
        require(voiters[uint(donationType)][requestId][msg.sender] == 0, "You voited already");
        voiters[uint(donationType)][requestId][msg.sender] = 1;

        helpRequestVoiting[uint(donationType)][requestId].total += 1;
        if (appruved) {
            helpRequestVoiting[uint(donationType)][requestId].appruved += 1;
        }

        if (helpRequestVoiting[uint(donationType)][requestId].total == 3) {
            if (helpRequestVoiting[uint(donationType)][requestId].appruved == 3) {
                helpRequests[uint(donationType)][requestId].status = HelpRequestStatus.APPROVED;
                emit NewHelpRequestStatusChanged(requestId, donationType, HelpRequestStatus.APPROVED);
            } else {
                helpRequests[uint(donationType)][requestId].status = HelpRequestStatus.CANCELED;
                emit NewHelpRequestStatusChanged(requestId, donationType, HelpRequestStatus.CANCELED);
            }
        }
    }

    event NewHelpRequestStatusChanged(uint helpRequestId, DonationType donationType, HelpRequestStatus status);


    //Modifiers
    modifier onlyGiver {
        require(roles[msg.sender] == UserRole.GIVER, "You are not a giver!");
        _;
    }
    modifier onlyGetter {
        require(roles[msg.sender] == UserRole.GETTER, "You are not a getter!");
        _;
    }
    modifier onlyOrganization {
        require(roles[msg.sender] == UserRole.ORGANISATION, "You are not a organization!");
        _;
    }


}
