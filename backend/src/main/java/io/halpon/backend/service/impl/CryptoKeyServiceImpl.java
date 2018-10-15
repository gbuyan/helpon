package io.halpon.backend.service.impl;

import com.hedera.sdk.keygen.HederaCryptoKeyPair;
import io.halpon.backend.domain.CryptoKey;
import io.halpon.backend.service.CryptoKeyService;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class CryptoKeyServiceImpl implements CryptoKeyService {
    @Override
    public CryptoKey generateKey() {
        HederaCryptoKeyPair keyPair = new HederaCryptoKeyPair();

        return CryptoKey.builder()
                .publicKey(keyPair.getPublicKeyEncodedHex())
                .securityKey(keyPair.getSecretKeyHex())
                .recoveryWords(keyPair.recoveryWordsList()).build();
    }

    @Override
    public CryptoKey restoreKet(List<String> restoreWorlds) {
        try {
            HederaCryptoKeyPair keyPair = new HederaCryptoKeyPair(restoreWorlds);

            return CryptoKey.builder()
                    .publicKey(keyPair.getPublicKeyEncodedHex())
                    .securityKey(keyPair.getSecretKeyHex())
                    .recoveryWords(keyPair.recoveryWordsList()).build();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
