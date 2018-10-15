package io.halpon.backend.domain;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Builder
@ToString
public class CryptoKey {
    private String publicKey;
    private String securityKey;
    private List<String> recoveryWords;
}
