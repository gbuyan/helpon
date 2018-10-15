pragma solidity ^0.4.0;

library StringUtils {
    function uint2str(uint i) internal pure returns (string) {
        if (i == 0) return "0";
        uint j = i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (i != 0) {
            bstr[k--] = byte(48 + i % 10);
            i /= 10;
        }
        return string(bstr);
    }

    function strConcat(string _a, string _b, string _c) internal pure returns (string) {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        string memory abc;
        uint k = 0;
        uint i;
        bytes memory babc;
        if (_ba.length == 0)
        {
            abc = new string(_bc.length);
            babc = bytes(abc);
        }
        else
        {
            abc = new string(_ba.length + _bb.length + _bc.length);
            babc = bytes(abc);
            for (i = 0; i < _ba.length; i++) babc[k++] = _ba[i];
            for (i = 0; i < _bb.length; i++) babc[k++] = _bb[i];
        }
        for (i = 0; i < _bc.length; i++) babc[k++] = _bc[i];
        return string(babc);
    }
}
