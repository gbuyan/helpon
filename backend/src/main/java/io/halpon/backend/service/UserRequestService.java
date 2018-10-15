package io.halpon.backend.service;

import io.halpon.backend.domain.RequestForHelp;

import java.util.List;

public interface UserRequestService {
    List<RequestForHelp> getUserRequests();

    RequestForHelp createRequest(RequestForHelp requestForHelp);


    List<RequestForHelp> getAllRequests();

    RequestForHelp voidForHelpRequest(Long id, boolean isOk);

    RequestForHelp voidForCloseHelpRequest(Long id, boolean isOk);
}
