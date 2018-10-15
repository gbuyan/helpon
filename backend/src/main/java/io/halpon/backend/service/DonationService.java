package io.halpon.backend.service;

import io.halpon.backend.domain.Donation;

import java.util.List;

public interface DonationService {
    List<Donation> getUserDonations();

    Donation donate(Donation donation);
}
