package io.halpon.backend.api;

import io.halpon.backend.domain.CompaniesType;
import io.halpon.backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/type")
    public ResponseEntity<List<CompaniesType>> getCompaniesTypes() {
        return ResponseEntity.ok(companyService.getCompanyType());
    }
}
