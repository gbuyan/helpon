package io.halpon.backend.service.impl;

import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.common.HederaKey;
import com.hedera.sdk.common.HederaTransactionAndQueryDefaults;
import com.hedera.sdk.cryptography.HederaCryptoKeyPair;
import io.halpon.backend.config.HederaProperties;
import io.halpon.backend.domain.CryptoKey;
import io.halpon.backend.hedera.AccountCreate;
import io.halpon.backend.service.AccountService;
import io.halpon.backend.service.CryptoKeyService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class AccountServiceImpl implements AccountService {

    private final CryptoKeyService cryptoKeyService;
    private final HederaProperties properties;

    @Autowired
    public AccountServiceImpl(CryptoKeyService cryptoKeyService, HederaProperties properties) {
        this.cryptoKeyService = cryptoKeyService;
        this.properties = properties;
    }

    @Override
    public CryptoKey registerHederaAccount() {

        CryptoKey cryptoKey = cryptoKeyService.generateKey();
        log.info("New key generated: {}", cryptoKey);

        // setup a set of defaults for query and transactions
        HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();
        txQueryDefaults = properties.getTxQueryDefaults();

        // new account objects
        HederaAccount account = new HederaAccount();
        HederaAccount accountXferTo = new HederaAccount();

        // setup transaction/query defaults (durations, etc...)
        account.txQueryDefaults = txQueryDefaults;
        accountXferTo.txQueryDefaults = txQueryDefaults;


        account.txQueryDefaults.generateRecord = true;
        HederaCryptoKeyPair newAccountKey = new HederaCryptoKeyPair(HederaKey.KeyType.ED25519);

        account = AccountCreate.create(account, newAccountKey, 100000);
        if (account == null) {
            log.info("FIRST ACCOUNT CREATE FAILED");
            throw new RuntimeException("Account create failure");
        }

        //HederaTransactionID txID = account.hederaTransactionID;
        //HederaTransactionRecord txRecord = new HederaTransactionRecord(txID, 10, txQueryDefaults);

        account.txQueryDefaults.generateRecord = false;

        return cryptoKey;
    }
}
