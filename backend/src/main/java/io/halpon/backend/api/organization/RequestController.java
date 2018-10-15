package io.halpon.backend.api.organization;

import io.halpon.backend.domain.CloseHelpRequest;
import io.halpon.backend.domain.RequestForHelp;
import io.halpon.backend.service.HelpRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/organization/request")
public class RequestController {

    private final HelpRequestService helpRequestService;

    @Autowired
    public RequestController(HelpRequestService helpRequestService) {
        this.helpRequestService = helpRequestService;
    }

    @PostMapping("/{id}/close")
    public ResponseEntity<RequestForHelp> voteForHelpRequest(@PathVariable("id") Long id,
                                                             @RequestBody CloseHelpRequest closeHelpRequest) {
        helpRequestService.closeHelpRequest(id, closeHelpRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping
    public ResponseEntity<List<RequestForHelp>> getCompanyRequest() {
        return ResponseEntity.ok(helpRequestService.getCompanyHelpRequests());
    }

}
