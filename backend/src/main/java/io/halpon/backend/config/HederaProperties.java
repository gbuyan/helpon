package io.halpon.backend.config;

import com.hedera.sdk.common.*;
import com.hedera.sdk.contract.HederaContract;
import com.hedera.sdk.cryptography.HederaCryptoKeyPair;
import com.hedera.sdk.node.HederaNode;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import java.security.spec.InvalidKeySpecException;


@ConfigurationProperties(prefix = "hedera")
@Data
@Service
public class HederaProperties {

    private Node node;
    private Paying paying;
    private Account contract;

    public HederaContract getHederaContract() {
        HederaFileID hederaFileID = new HederaFileID(contract.getShard(), contract.getRealm(), contract.getNum());
        HederaContract contract = new HederaContract();
        contract.txQueryDefaults = getTxQueryDefaults();
        contract.fileID = hederaFileID;
        return contract;
    }


    @Setter
    @Getter
    public static class Account {
        private Long shard;
        private Long realm;
        private Long num;
        private Key key;
    }

    @Setter
    @Getter
    public static class Key {
        private String pri;
        private String pub;
    }

    @Setter
    @Getter
    public static class Node {
        private String host;
        private Integer port;
        private Long num;
        private Account account;
    }

    @Setter
    @Getter
    public static class Paying {
        private Account account;
    }

    public HederaTransactionAndQueryDefaults getTxQueryDefaults() {

        try {
            // setup node account ID
            HederaAccountID nodeAccountID = new HederaAccountID(this.node.getAccount().getShard(), this.node.getAccount().getRealm(), this.node.getAccount().getNum());
            // setup node
            HederaNode node = new HederaNode(this.node.host, this.node.port, nodeAccountID);

            // setup paying account
            HederaAccountID payingAccountID = new HederaAccountID(this.paying.getAccount().getShard(), this.paying.getAccount().getRealm(), this.paying.getAccount().getNum());

            // setup paying keypair
            HederaCryptoKeyPair payingKeyPair = new HederaCryptoKeyPair(HederaKey.KeyType.ED25519, this.paying.getAccount().getKey().getPub(), this.paying.getAccount().getKey().getPri());

            // setup a set of defaults for query and transactions
            HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();

            txQueryDefaults.memo = "Demo memo";
            txQueryDefaults.node = node;
            txQueryDefaults.payingAccountID = payingAccountID;
            txQueryDefaults.payingKeyPair = payingKeyPair;
            txQueryDefaults.transactionValidDuration = new HederaDuration(120, 0);

            return txQueryDefaults;
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }

    }
}
