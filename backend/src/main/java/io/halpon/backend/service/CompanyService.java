package io.halpon.backend.service;

import io.halpon.backend.domain.CompaniesType;

import java.util.List;

public interface CompanyService {
    List<CompaniesType> getCompanyType();
}
