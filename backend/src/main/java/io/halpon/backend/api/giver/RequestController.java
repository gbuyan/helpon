package io.halpon.backend.api.giver;

import io.halpon.backend.domain.RequestForHelp;
import io.halpon.backend.service.UserRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/giver/request")
public class RequestController {

    private final UserRequestService userRequestService;

    @Autowired
    public RequestController(UserRequestService userRequestService) {
        this.userRequestService = userRequestService;
    }

    @GetMapping
    public ResponseEntity<List<RequestForHelp>> getUserRequest() {
        return ResponseEntity.ok(userRequestService.getAllRequests());
    }

    @PostMapping
    public ResponseEntity<RequestForHelp> createUserRequest(@RequestBody RequestForHelp requestForHelp) {
        return ResponseEntity.ok(userRequestService.createRequest(requestForHelp));
    }


    @PostMapping("/{id}/vote/{isOk}")
    public ResponseEntity<RequestForHelp> voteForHelpRequest(@PathVariable("id") Long id,
                                                             @PathVariable("isOk") boolean isOk) {
        return ResponseEntity.ok(userRequestService.voidForHelpRequest(id, isOk));
    }

    @PostMapping("/close/{id}/vote/{isOk}")
    public ResponseEntity<RequestForHelp> voteForCloseHelpRequest(@PathVariable("id") Long id,
                                                                  @PathVariable("isOk") boolean isOk) {
        return ResponseEntity.ok(userRequestService.voidForCloseHelpRequest(id, isOk));
    }
}
