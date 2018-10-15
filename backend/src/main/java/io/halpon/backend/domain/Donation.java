package io.halpon.backend.domain;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Donation {
    private Long id;
    private Long amount;
    private RequestType type;
}
