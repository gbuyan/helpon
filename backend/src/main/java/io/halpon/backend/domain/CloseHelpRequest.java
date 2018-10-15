package io.halpon.backend.domain;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CloseHelpRequest {
    private Long amount;
    private String description;

}
