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

    function getGiverDonations(uint userId) public view returns (uint[] ids) {
        require(givers.length > userId, "Giver not found");
        ids = userDonations[userId];
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

    function getGetterHelpRequests(uint userId) public view returns (uint[] ids) {
        require(getters.length > userId, "Getters not found");
        ids = userHelpRequests[userId];
    }

    function registerOrganization(string fullName, string sity, string hederaFileId, DonationType donationType) public {
        //todo requires, uniq
        require(roles[msg.sender] == UserRole.NONE, "You are already registred");
        uint orgId = organizations.push(OrganizationInfo(msg.sender, fullName, sity, hederaFileId, donationType)) - 1;
        organizationIds[msg.sender] = orgId;
        roles[msg.sender] = UserRole.ORGANISATION;
        emit UserCreated(orgId, fullName, sity, UserRole.ORGANISATION);
    }

    function getOrganizationInfo(uint id) public view returns (string name, string sity, string hederaFileId, DonationType donationType) {
        require(organizations.length > id, "Organization not found");

        hederaFileId = organizations[id].hederaFileId;
        donationType = organizations[id].donationType;
        name = organizations[id].fullName;
        sity = organizations[id].sity;
    }

    //Donationas
    //Donation[] donations;
    mapping(uint => uint[]) userDonations;
    Donation[] donations;
    mapping(uint => uint) donationsValue;

    struct Donation {
        uint value;
        uint userId;
        DonationType donationType;
    }

    event NewDonation(DonationType donationType, uint value, uint userId, string userName);

    function donate(DonationType donationType) public payable onlyGiver {
        uint userId = giversIds[msg.sender];
        uint donationId = donations.push(Donation(msg.value, userId, donationType)) - 1;
        userDonations[userId].push(donationId);
        donationsValue[uint(donationType)] += msg.value;
        emit NewDonation(donationType, msg.value, userId, givers[userId].fullName);
    }

    function getDonationInfo(uint donationId) view public returns (DonationType donationType, uint value, uint userId) {
        Donation memory donation = donations[donationId];
        require(donation.value != 0, "Donation not found");

        donationType = donation.donationType;
        value = donation.value;
        userId = donation.userId;
    }

    function getDonationCount() view public returns (uint count) {
        count = donations.length;
    }

    //HelpRequest
    HelpRequest[] helpRequests;
    // mapping (uint=> HelpRequest[]) helpRequests;
    mapping(uint => uint[]) userHelpRequests;

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
        CLOSING,
        COMPLETED
    }

    event NewHelpRequest(uint helpRequestId, DonationType donationType, uint value, uint userId, string userName);

    function askForHelp(DonationType donationType, uint value, string hederaFileId) public onlyGetter {
        require(donationsValue[uint(donationType)] >= value, "HelpOn has no enough money");
        uint userId = gettersIds[msg.sender];
        uint helpRequestId = helpRequests.push(HelpRequest(donationType, value, userId, hederaFileId, HelpRequestStatus.INIT)) - 1;
        userHelpRequests[userId].push(helpRequestId);

        emit NewHelpRequest(helpRequestId, donationType, value, userId, getters[userId].fullName);
    }

    function getHelpRequestInfo(uint requestId) view public returns (DonationType donationType, uint value, uint userId, string hederaFileId, HelpRequestStatus status) {
        HelpRequest memory request = helpRequests[requestId];
        require(helpRequests[requestId].status != HelpRequestStatus.NONE, "Help request not found");

        donationType = request.donationType;
        value = request.value;
        userId = request.userId;
        hederaFileId = request.hederaFileId;
        status = request.status;
    }

    function getHelpRequestsCount() view public returns (uint count) {
        count = helpRequests.length;
    }

    struct Voiting {
        uint appruved;
        uint total;
    }

    mapping(uint => Voiting) helpRequestVoiting;
    mapping(uint => mapping(address => uint)) voiters;

    event HelpRequestStatusChanged(uint helpRequestId, HelpRequestStatus status);


    function voitForHelpRequest(uint requestId, bool appruved) public onlyGiver {
        //todo check giver rights
        require(helpRequests.length > requestId, "Help request not found");
        require(helpRequests[requestId].status == HelpRequestStatus.INIT, "Invalid help request status");
        require(helpRequestVoiting[requestId].total <= 3, "Voiting is over");
        require(voiters[requestId][msg.sender] == 0, "You voited already");
        voiters[requestId][msg.sender] = 1;

        helpRequestVoiting[requestId].total += 1;
        if (appruved) {
            helpRequestVoiting[requestId].appruved += 1;
        }

        if (helpRequestVoiting[requestId].total == 3) {
            if (helpRequestVoiting[requestId].appruved == 3) {
                helpRequests[requestId].status = HelpRequestStatus.APPROVED;
                emit HelpRequestStatusChanged(requestId, HelpRequestStatus.APPROVED);
            } else {
                helpRequests[requestId].status = HelpRequestStatus.CANCELED;
                emit HelpRequestStatusChanged(requestId, HelpRequestStatus.CANCELED);
            }
        }
    }

    mapping(uint => CloseRequest) closeRequests;
    mapping(uint => uint[]) organizationsCloseRequests;

    struct CloseRequest {
        uint orgId;
        uint value;
        string description;
        string hederaFileId;
    }

    event NewCloseRequest(uint helpRequestId);


    function closeHelpRequest(uint requestId, uint value, string description, string hederaFileId) public onlyOrganization {
        uint userId = organizationIds[msg.sender];
        require(helpRequests.length > requestId, "Help request not found");
        require(helpRequests[requestId].status == HelpRequestStatus.APPROVED, "Invalid help request status");
        require(organizations[userId].donationType == helpRequests[requestId].donationType, "Organization dont support this donation type");

        closeRequests[requestId] = CloseRequest(userId, value, description, hederaFileId);
        organizationsCloseRequests[userId].push(requestId);
        helpRequests[requestId].status = HelpRequestStatus.CLOSING;

        emit HelpRequestStatusChanged(requestId, HelpRequestStatus.CLOSING);
        emit NewCloseRequest(requestId);
    }

    mapping(uint => Voiting) helpRequestClosingVoiting;
    mapping(uint => mapping(address => uint)) closingVoiters;

    function voitForCloseHelpRequest(uint requestId, bool appruved) public onlyGiver {
        //todo check giver rights
        require(helpRequests.length > requestId, "Help request not found");
        require(helpRequestVoiting[requestId].total <= 3, "Voiting is over");
        require(helpRequests[requestId].status == HelpRequestStatus.CLOSING, "Invalid help request status");
        require(closingVoiters[requestId][msg.sender] == 0, "You voited already");
        closingVoiters[requestId][msg.sender] = 1;

        helpRequestClosingVoiting[requestId].total += 1;
        if (appruved) {
            helpRequestClosingVoiting[requestId].appruved += 1;
        }

        if (helpRequestClosingVoiting[requestId].total == 3) {
            if (helpRequestClosingVoiting[requestId].appruved == 3) {
                helpRequests[requestId].status = HelpRequestStatus.COMPLETED;
                uint orgId = closeRequests[requestId].orgId;
                organizations[orgId].addr.transfer(helpRequests[requestId].value);
                //transfer money to organization
                donationsValue[uint(helpRequests[requestId].donationType)] -= helpRequests[requestId].value;
                emit HelpRequestStatusChanged(requestId, HelpRequestStatus.COMPLETED);
            } else {
                helpRequests[requestId].status = HelpRequestStatus.CANCELED;
                emit HelpRequestStatusChanged(requestId, HelpRequestStatus.CANCELED);
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
