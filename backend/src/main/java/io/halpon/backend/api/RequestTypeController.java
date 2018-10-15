package io.halpon.backend.api;

import io.halpon.backend.domain.RequestType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/request_type")
public class RequestTypeController {

    @GetMapping("/type")
    public ResponseEntity<List<RequestType>> getCompaniesTypes() {
        return ResponseEntity.ok(Arrays.asList(RequestType.values()));
    }
}
