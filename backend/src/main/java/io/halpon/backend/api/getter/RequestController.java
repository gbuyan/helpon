package io.halpon.backend.api.getter;

import io.halpon.backend.domain.RequestForHelp;
import io.halpon.backend.service.UserRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/getter/request")
public class RequestController {

    private final UserRequestService userRequestService;

    @Autowired
    public RequestController(UserRequestService userRequestService) {
        this.userRequestService = userRequestService;
    }

    @GetMapping
    public ResponseEntity<List<RequestForHelp>> getUserRequest() {
        return ResponseEntity.ok(userRequestService.getRequests());
    }

    @PostMapping
    public ResponseEntity<RequestForHelp> createUserRequest(@RequestBody RequestForHelp requestForHelp) {
        return ResponseEntity.ok(userRequestService.createRequest(requestForHelp));
    }
}
