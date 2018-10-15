package io.halpon.backend.service;

import io.halpon.backend.domain.RequestForHelp;

import java.util.List;

public interface UserRequestService {
    List<RequestForHelp> getRequests();

    RequestForHelp createRequest(RequestForHelp requestForHelp);
}
