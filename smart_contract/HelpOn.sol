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
        address addr;
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

    function getGiverInfo(uint id) public view returns (string fullName, string sity) {
        require(givers.length > id, "Giver not found");

        fullName = givers[id].fullName;
        sity = givers[id].sity;
    }

    function getGiverDonations(uint userId, DonationType donationType) public view returns (uint[] ids) {
        require(givers.length > userId, "Giver not found");
        ids = userDonations[userId][uint(donationType)];
    }

    function registerGetter(string fullName, string sity) public {
        //todo requires, uniq
        require(roles[msg.sender] == UserRole.NONE, "You are already registred");
        uint getterId = getters.push(UserInfo(fullName, sity)) - 1;
        gettersIds[msg.sender] = getterId;
        roles[msg.sender] = UserRole.GETTER;
        emit UserCreated(getterId, fullName, sity, UserRole.GETTER);
    }

    function getGetterInfo(uint id) public view returns (string fullName, string sity) {
        require(getters.length > id, "Getters not found");

        fullName = getters[id].fullName;
        sity = getters[id].sity;
    }

    function getGetterHelpRequests(uint userId, DonationType donationType) public view returns (uint[] ids) {
        require(getters.length > userId, "Getters not found");
        ids = userHelpRequests[userId][uint(donationType)];
    }

    function registerOrganization(string fullName, string sity, string hederaFileId, DonationType donationType) public {
        //todo requires, uniq
        require(roles[msg.sender] == UserRole.NONE, "You are already registred");
        uint orgId = organizations.push(OrganizationInfo(msg.sender, fullName, sity, hederaFileId, donationType)) - 1;
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
        uint value;
        uint userId;
    }

    event NewDonation(DonationType donationType, uint value, uint userId, string userName);

    function donate(DonationType donationType) public payable onlyGiver {
        uint userId = giversIds[msg.sender];
        uint donationId = donations[uint(donationType)].push(Donation(msg.value, userId)) - 1;
        userDonations[userId][uint(donationType)].push(donationId);
        donationsValue[uint(donationType)] += msg.value;
        emit NewDonation(donationType, msg.value, userId, givers[userId].fullName);
    }

    function getDonationInfo(uint donationId, DonationType donType) view public returns (DonationType donationType, uint value, uint userId) {
        Donation memory donation = donations[uint(donType)][donationId];
        require(donation.value != 0, "Donation not found");

        donationType = donType;
        value = donation.value;
        userId = donation.userId;
    }

    //HelpRequest

    mapping(uint => HelpRequest[]) helpRequests;
    mapping(uint => mapping(uint => uint[])) userHelpRequests;

    struct HelpRequest {
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
        CLOSING,
        COMPLITED
    }

    event NewHelpRequest(uint helpRequestId, DonationType donationType, uint value, uint userId, string userName);

    function askForHelp(DonationType donationType, uint value, string hederaFileId) public onlyGetter {
        require(donationsValue[uint(donationType)] >= value, "HelpOn has no enough money");
        uint userId = gettersIds[msg.sender];
        uint helpRequestId = helpRequests[uint(donationType)].push(HelpRequest(value, userId, hederaFileId, HelpRequestStatus.INIT)) - 1;
        userHelpRequests[userId][uint(donationType)].push(helpRequestId);

        emit NewHelpRequest(helpRequestId, donationType, value, userId, getters[userId].fullName);
    }

    function getHelpRequestInfo(uint requestId, DonationType donationType) view public returns (DonationType requestType, uint value, uint userId, string hederaFileId, HelpRequestStatus status) {
        HelpRequest memory request = helpRequests[uint(donationType)][requestId];
        require(helpRequests[uint(donationType)][requestId].status != HelpRequestStatus.NONE, "Help request not found");

        requestType = donationType;
        value = request.value;
        userId = request.userId;
        hederaFileId = request.hederaFileId;
        status = request.status;
    }

    struct Voiting {
        uint appruved;
        uint total;
    }

    mapping(uint => mapping(uint => Voiting)) helpRequestVoiting;
    mapping(uint => mapping(uint => mapping(address => uint))) voiters;

    event HelpRequestStatusChanged(uint helpRequestId, DonationType donationType, HelpRequestStatus status);


    function voitForHelpRequest(uint requestId, DonationType donationType, bool appruved) public onlyGiver {
        //todo check giver rights
        require(helpRequests[uint(donationType)].length > requestId, "Help request not found");
        require(helpRequests[uint(donationType)][requestId].status == HelpRequestStatus.INIT, "Invalid help request status");
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
                emit HelpRequestStatusChanged(requestId, donationType, HelpRequestStatus.APPROVED);
            } else {
                helpRequests[uint(donationType)][requestId].status = HelpRequestStatus.CANCELED;
                emit HelpRequestStatusChanged(requestId, donationType, HelpRequestStatus.CANCELED);
            }
        }
    }

    mapping(uint => CloseRequest[]) closeRequests;
    mapping(uint => mapping(uint => uint[])) organizationsCloseRequests;
    mapping(uint => mapping(uint => uint)) helpRequestCloseRequest;

    struct CloseRequest {
        uint orgId;
        uint value;
        string description;
        string hederaFileId;
    }

    event NewCloseRequest(uint helpRequestId, DonationType donationType, uint closeRequestId);


    function closeHelpRequest(uint requestId, DonationType donationType, uint value, string description, string hederaFileId) public onlyOrganization {
        uint userId = organizationIds[msg.sender];
        require(helpRequests[uint(donationType)].length > requestId, "Help request not found");
        require(helpRequests[uint(donationType)][requestId].status == HelpRequestStatus.APPROVED, "Invalid help request status");
        require(organizations[userId].donationType == donationType, "Organization dont support this donation type");

        uint closeRequestId = closeRequests[uint(donationType)].push(CloseRequest(userId, value, description, hederaFileId)) - 1;
        organizationsCloseRequests[userId][uint(donationType)].push(closeRequestId);
        helpRequestCloseRequest[uint(donationType)][requestId] = closeRequestId;
        helpRequests[uint(donationType)][requestId].status = HelpRequestStatus.CLOSING;

        emit HelpRequestStatusChanged(requestId, donationType, HelpRequestStatus.CLOSING);
        emit NewCloseRequest(requestId, donationType, closeRequestId);
    }

    mapping(uint => mapping(uint => Voiting)) helpRequestClosingVoiting;
    mapping(uint => mapping(uint => mapping(address => uint))) closingVoiters;

    function voitForCloseHelpRequest(uint requestId, DonationType donationType, bool appruved) public onlyGiver {
        //todo check giver rights
        require(helpRequests[uint(donationType)].length > requestId, "Help request not found");
        require(helpRequestVoiting[uint(donationType)][requestId].total <= 3, "Voiting is over");
        require(helpRequests[uint(donationType)][requestId].status == HelpRequestStatus.CLOSING, "Invalid help request status");
        require(closingVoiters[uint(donationType)][requestId][msg.sender] == 0, "You voited already");
        closingVoiters[uint(donationType)][requestId][msg.sender] = 1;

        helpRequestClosingVoiting[uint(donationType)][requestId].total += 1;
        if (appruved) {
            helpRequestClosingVoiting[uint(donationType)][requestId].appruved += 1;
        }

        if (helpRequestClosingVoiting[uint(donationType)][requestId].total == 3) {
            if (helpRequestClosingVoiting[uint(donationType)][requestId].appruved == 3) {
                helpRequests[uint(donationType)][requestId].status = HelpRequestStatus.COMPLITED;
                uint orgId = closeRequests[uint(donationType)][helpRequestCloseRequest[uint(donationType)][requestId]].orgId;
                organizations[orgId].addr.transfer(helpRequests[uint(donationType)][requestId].value);
                //transfer money to organization
                donationsValue[uint(donationType)] -= helpRequests[uint(donationType)][requestId].value;
                emit HelpRequestStatusChanged(requestId, donationType, HelpRequestStatus.COMPLITED);
            } else {
                helpRequests[uint(donationType)][requestId].status = HelpRequestStatus.CANCELED;
                emit HelpRequestStatusChanged(requestId, donationType, HelpRequestStatus.CANCELED);
            }
        }
    }


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
