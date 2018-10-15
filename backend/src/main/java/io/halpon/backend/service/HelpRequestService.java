package io.halpon.backend.service;

import io.halpon.backend.domain.CloseHelpRequest;
import io.halpon.backend.domain.RequestForHelp;

import java.util.List;

public interface HelpRequestService {
    List<RequestForHelp> getUserRequests();

    RequestForHelp createRequest(RequestForHelp requestForHelp);

    List<RequestForHelp> getAllRequests();

    RequestForHelp voidForHelpRequest(Long id, boolean isOk);

    RequestForHelp voidForCloseHelpRequest(Long id, boolean isOk);

    void closeHelpRequest(Long id, CloseHelpRequest closeHelpRequest);

    List<RequestForHelp> getCompanyHelpRequests();
}
