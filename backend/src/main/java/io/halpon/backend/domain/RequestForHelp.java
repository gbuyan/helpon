package io.halpon.backend.domain;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class RequestForHelp {
    private Long id;
    private String description;
    private Long amount;
    private RequestType requestType;
    private RequestStatus status;

}
