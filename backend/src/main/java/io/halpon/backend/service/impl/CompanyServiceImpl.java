package io.halpon.backend.service.impl;

import io.halpon.backend.domain.CompaniesType;
import io.halpon.backend.service.CompanyService;
import io.halpon.backend.service.ContractCaller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final ContractCaller contractCaller;

    @Autowired
    public CompanyServiceImpl(ContractCaller contractCaller) {
        this.contractCaller = contractCaller;
    }

    @Override
    public List<CompaniesType> getCompanyType() {

        return null;
    }
}
