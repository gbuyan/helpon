package io.halpon.backend.service.impl;

import io.halpon.backend.domain.Donation;
import io.halpon.backend.service.DonationService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DonationServiceImpl implements DonationService {
    private final List<Donation> donations = new ArrayList<>();

    @Override
    public List<Donation> getUserDonations() {
        //todo contract call
        return donations;
    }

    @Override
    public Donation donate(Donation donation) {
        //todo contract call
        donation.setId((long) donations.size());
        donations.add(donation);
        return donation;
    }
}
