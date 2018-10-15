package io.halpon.backend.service;

import com.hedera.sdk.contract.HederaContractFunctionResult;
import com.hedera.sdk.transaction.HederaTransactionResult;

public interface ContractCaller {
    HederaTransactionResult call(long gas, long amount, byte[] payload);

    HederaContractFunctionResult callLocal(long gas, long maxResultSize, byte[] payload);
}
