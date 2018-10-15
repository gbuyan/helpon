package io.halpon.backend.service.impl;

import com.hedera.sdk.common.HederaPrecheckResult;
import com.hedera.sdk.common.HederaTransactionReceipt;
import com.hedera.sdk.common.HederaTransactionStatus;
import com.hedera.sdk.common.Utilities;
import com.hedera.sdk.contract.HederaContractFunctionResult;
import com.hedera.sdk.transaction.HederaTransactionResult;
import io.halpon.backend.config.HederaProperties;
import io.halpon.backend.service.ContractCaller;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class ContractCallerImpl implements ContractCaller {

    private final HederaProperties properties;

    public ContractCallerImpl(HederaProperties properties) {
        this.properties = properties;
    }

    @Override
    public HederaTransactionResult call(long gas, long amount, byte[] payload) {
        try {
            HederaTransactionResult callResult = properties.getHederaContract().call(gas, amount, payload);
            // was it successful ?
            if (callResult.getPrecheckResult() == HederaPrecheckResult.OK) {
                // yes, get a receipt for the transaction
                HederaTransactionReceipt receipt = Utilities.getReceipt(properties.getHederaContract().hederaTransactionID,
                        properties.getHederaContract().txQueryDefaults.node);
                // was that successful ?
                if (receipt.transactionStatus == HederaTransactionStatus.SUCCESS) {
                    // and print it out
                    log.info("===>Smart Contract call success");
                    return callResult;
                } else {
                    throw new RuntimeException("Failed with transactionStatus: " + receipt.transactionStatus.toString());
                }
            } else {
                throw new RuntimeException("Failed to call contract method");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public HederaContractFunctionResult callLocal(long gas, long maxResultSize, byte[] payload) {
        try {
            HederaContractFunctionResult functionResult = new HederaContractFunctionResult();

            functionResult = properties.getHederaContract().callLocal(gas, payload, maxResultSize);

            if (functionResult != null) {
                // it was successful, print it
                log.info("===>Got functionResult= {}", functionResult.contractCallResult());
                log.info("===>Got error message= {}", functionResult.errorMessage());
                log.info("===>Got gas used= {}", functionResult.gasUsed());
                log.info("===>Got bloom= {}", functionResult.bloom());
                log.info("===>Got contract num= {}", functionResult.contractID().contractNum);
            } else {
                // an error occurred
                log.info("===>Running local function - precheck ERROR  {}", properties.getHederaContract().getPrecheckResult());
                return null;
            }
            return functionResult;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
