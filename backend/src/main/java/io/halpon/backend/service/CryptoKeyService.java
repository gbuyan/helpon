package io.halpon.backend.service;

import io.halpon.backend.domain.CryptoKey;

import java.util.List;

public interface CryptoKeyService {
    CryptoKey generateKey();

    CryptoKey restoreKet(List<String> restoreWorlds);
}
