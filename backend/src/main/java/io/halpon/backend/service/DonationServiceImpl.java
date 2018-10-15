package io.halpon.backend.service;

import io.halpon.backend.domain.Donation;
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
