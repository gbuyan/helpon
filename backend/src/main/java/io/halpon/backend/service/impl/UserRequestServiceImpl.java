package io.halpon.backend.service.impl;

import io.halpon.backend.domain.RequestForHelp;
import io.halpon.backend.domain.RequestStatus;
import io.halpon.backend.service.UserRequestService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserRequestServiceImpl implements UserRequestService {
    private final List<RequestForHelp> requestForHelps = new ArrayList<>();

    @Override
    public List<RequestForHelp> getUserRequests() {
        //TODO contract call
        return requestForHelps;
    }

    @Override
    public RequestForHelp createRequest(@RequestBody @Valid RequestForHelp requestForHelp) {
        //TODO contract call
        requestForHelp.setId((long) requestForHelps.size());
        requestForHelp.setStatus(RequestStatus.INIT);
        requestForHelps.add(requestForHelp);
        return requestForHelp;
    }

    @Override
    public List<RequestForHelp> getAllRequests() {
        //TODO contract call

        return requestForHelps;
    }

    @Override
    public RequestForHelp voidForHelpRequest(Long id, boolean isOk) {
        //TODO contract call

        return requestForHelps.stream().filter(requestForHelp -> requestForHelp.getId() == id).map(requestForHelp -> {
            requestForHelp.setStatus(RequestStatus.APPROVED);
            return requestForHelp;
        }).findFirst().orElse(null);
    }

    @Override
    public RequestForHelp voidForCloseHelpRequest(Long id, boolean isOk) {
        //TODO contract call

        return requestForHelps.stream().filter(requestForHelp -> requestForHelp.getId() == id).map(requestForHelp -> {
            requestForHelp.setStatus(RequestStatus.COMPLETED);
            return requestForHelp;
        }).findFirst().orElse(null);
    }
}
