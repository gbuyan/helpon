package io.halpon.backend.api.getter;

import io.halpon.backend.domain.RequestForHelp;
import io.halpon.backend.service.HelpRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("getterRequestController")
@RequestMapping("/api/v1/getter/request")
public class RequestController {

    private final HelpRequestService helpRequestService;

    @Autowired
    public RequestController(HelpRequestService helpRequestService) {
        this.helpRequestService = helpRequestService;
    }

    @GetMapping
    public ResponseEntity<List<RequestForHelp>> getUserRequest() {
        return ResponseEntity.ok(helpRequestService.getUserRequests());
    }

    @PostMapping
    public ResponseEntity<RequestForHelp> createUserRequest(@RequestBody RequestForHelp requestForHelp) {
        return ResponseEntity.ok(helpRequestService.createRequest(requestForHelp));
    }
}
