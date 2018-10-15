package io.halpon.backend.service.impl;

import io.halpon.backend.domain.RequestForHelp;
import io.halpon.backend.domain.RequestStatus;
import io.halpon.backend.service.UserRequestService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserRequestServiceImpl implements UserRequestService {
    private final List<RequestForHelp> requestForHelps = new ArrayList<>();

    @Override
    public List<RequestForHelp> getRequests() {
        //TODO contract call
        return requestForHelps;
    }

    @Override
    public RequestForHelp createRequest(RequestForHelp requestForHelp) {
        //TODO contract call
        requestForHelp.setId((long) requestForHelps.size());
        requestForHelp.setStatus(RequestStatus.INIT);
        requestForHelps.add(requestForHelp);
        return requestForHelp;
    }
}
