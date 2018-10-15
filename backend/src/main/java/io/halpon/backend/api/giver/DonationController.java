package io.halpon.backend.api.giver;

import io.halpon.backend.domain.Donation;
import io.halpon.backend.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/giver/request")
public class DonationController {

    private final DonationService donationService;

    @Autowired
    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping
    public ResponseEntity<List<Donation>> getDonations() {
        return ResponseEntity.ok(donationService.getUserDonations());
    }

    @PostMapping
    public ResponseEntity<Donation> createUserRequest(@RequestBody Donation donation) {
        return ResponseEntity.ok(donationService.donate(donation));
    }
}
