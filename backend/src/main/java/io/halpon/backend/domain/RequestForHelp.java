package io.halpon.backend.domain;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class RequestForHelp {
    private Long id;
    private String description;
    @NotNull
    @Size(min = 1)
    private Long amount;
    private RequestType requestType;
    private RequestStatus status;

}
